TARGET_NAME=gmd22-frontend
REMOTE_IP=192.168.0.34
REMOTE_USER=pi

scp -rp .next package.json package-lock.json Dockerfile $REMOTE_USER@$REMOTE_IP:/home/pi/Documents/gmd-22/$TARGET_NAME

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
echo "Deployment done"
'

# Logs : 
#sudo docker logs --tail 50 --follow --timestamps $(sudo docker ps -q  --filter ancestor=$TARGET_NAME)

# If crashed : 
#sudo docker stop $(sudo docker ps -q  --filter ancestor=$TARGET_NAME)