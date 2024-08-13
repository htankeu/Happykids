#!/bin/bash
echo "============================================================================="
prozess="$(docker ps -aq)"
echo $prozess

if [ -n "$prozess" ]; then
    echo "Begin to remove the containers"
    docker stop HappyDB HappyServer HappyUI Happymqtt5 HappyAdminer
    docker rm HappyDB HappyServer HappyUI Happymqtt5 HappyAdminer
    sudo rm -r ../docker-volumes
    echo "All Containers removed successfully!!"
    echo "############################################################################"
else
    echo "We have not containers to remove"
fi

echo "That is the end"
echo "============================================================================="
