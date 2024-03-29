rm -r .next
npm run build

npx envsub --env-file .env Dockerfile Dockerfile-out --syntax dollar-basic
scp -rp .next package.json package-lock.json next.config.js Dockerfile-out $REMOTE_USER@$PRODUCTION_HOST_IP:$TARGET_PROJECT_ROOT_PATH/$TARGET_REPOSITORY_NAME
rm ./Dockerfile-out

ssh $REMOTE_USER@$PRODUCTION_HOST_IP  << 'EOSSH'
sudo nohup sh -c '
echo "\n --- [start] $(date -u) ---"
cd $TARGET_PROJECT_ROOT_PATH/$TARGET_REPOSITORY_NAME
ls -ltr
sudo docker ps
sudo docker rm $(sudo docker stop $(sudo docker ps -q  --filter ancestor=$TARGET_DOCKER_IMAGE_NAME))
sudo docker build -t $TARGET_DOCKER_IMAGE_NAME -f ./Dockerfile-out .
sudo docker run -d --restart=always -p $PORT:$PORT $TARGET_DOCKER_IMAGE_NAME:latest
sudo rm -r .next next.config.js package.json package-lock.json
curl -X POST https://alertzy.app/send -H "Content-Type: application/x-www-form-urlencoded" -d "accountKey=$NOTIFICATION_ACCOUNT_KEY&title=GMD22 '\('Front-end'\)'&message=C'\''est déployé chef 🚀&group=GMD22"
echo "\n --- [end] $(date -u) ---"
' >> $TARGET_PROJECT_ROOT_PATH/$TARGET_REPOSITORY_NAME/logs/deployments.log 2>&1 &
EOSSH

# Logs : 
#sudo docker logs --tail 50 --follow --timestamps $(sudo docker ps -q  --filter ancestor=$TARGET_DOCKER_IMAGE_NAME)

# If crashed : 
#sudo docker stop $(sudo docker ps -q  --filter ancestor=$TARGET_DOCKER_IMAGE_NAME)

# Free up space : 
# sudo docker image prune -a
# sudo journalctl --vacuum-size=100M
# sudo rm -r /var/cache/*
# sudo rm -r /var/tmp/*