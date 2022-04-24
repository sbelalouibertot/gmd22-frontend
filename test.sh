ssh pi@77.192.114.110 "
cd /home/pi/Documents/gmd-22/gmd22-backend
sudo nohup sh -c '
pwd
var=OUI
echo bonjour
echo $var
' > /home/pi/Documents/gmd-22/gmd22-backend/logs/test.txt 2>&1 &
"