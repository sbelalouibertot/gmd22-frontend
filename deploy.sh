export "$(grep -vE "^(#.*|\s*)$" .env)"

npm run build
scp -rp .next package.json package-lock.json Dockerfile $REMOTE_USER@$REMOTE_IP:/home/pi/Documents/gmd-22/$TARGET_REPOSITORY_NAME

ssh $REMOTE_USER@$REMOTE_IP '
TARGET_NAME=gmd22-frontend
PORT=3000

cd /home/pi/Documents/gmd-22/$TARGET_NAME
ls -ltr
sudo docker ps
PREVIOUS_CONTAINER_ID=$(sudo docker ps -q  --filter ancestor=$TARGET_NAME)
sudo docker rm $(sudo docker stop $PREVIOUS_CONTAINER_ID)
sudo docker build -t $TARGET_NAME .
sudo docker run -d --restart=always -p $PORT:$PORT $TARGET_NAME:latest
'
curl -X POST https://alertzy.app/send -H "Content-Type: application/x-www-form-urlencoded" -d "accountKey=$NOTIFICATION_ACCOUNT_KEY&title=GMD22 (Front-end)&message=C'est déployé chef 🚀&group=GMD22"



# Logs : 
#sudo docker logs --tail 50 --follow --timestamps $(sudo docker ps -q  --filter ancestor=gmd22-frontend)

# If crashed : 
#sudo docker stop $(sudo docker ps -q  --filter ancestor=gmd22-frontend)