#!/bin/bash
screen -S web -X quit # Kill the screen 
echo "Screen web killed"
sleep 3
# Démarrer le screen "web"
screen -dmS web # Création du screen pour la session
echo "Screen created"
# Démarrer votre site web Node.js sur le port 80
screen -S web -X stuff "cd /root/web\n" # On va dans le fichier qui contient les fichiers du site web
screen -S web -X stuff "node app.js\n" # Démarrage de l'application nodejs
sleep 3
echo "Server running" 