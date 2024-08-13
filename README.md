# happykids



# The List of our leased equipments
---
- [ ] Raspberry pi 4
- [ ] Raspberry pi AC Adaptor (Model:KSAS-15E-051300HE)
- [ ] 7´´LCD Display Touch screen
- [ ] SanDisk Ultra microSDHC UHS-I card 32 GB
- [ ] raspberry Pi Active Cooler
- [ ] B32-432 (11)(WS R13-112 DAAA)
- [ ] C18-550 (15) DEBO THUMB JOY2
- [ ] 2x li-ion Rechargeable battery(2600mAh) 
- [ ] K03-152 (4) T 113A SW
- [ ] Breadboard
- [ ] 18650 baterry shield
- [ ] 2 ARD COLOR censor
- [ ] Loudspeaker (1)
- [ ] Vibrationsmotor (1)


---

# Materialen, die wir vor zu haben

- [ x ] ARD COLOR SENSOR(5) `https://www.reichelt.de/arduino-farbsensor-tcs3200-ard-color-sensor-p192148.html?&trstct=pos_0&nbc=1`
- [ x ] Vibrationsmotor(3) `https://www.reichelt.de/arduino-vibrationsmotor-grv-vibration-p191165.html?&trstct=pos_0&nbc=1`
- [ x ] Loudspeaker(2) `https://www.reichelt.de/odroid-speaker-kit-fuer-den-m1s-5w-odro-m1s-sp-kit-p367433.html?&trstct=pos_3&nbc=1`
- [ ] Universel 4-pin Kabeln(5) `https://www.berrybase.de/seeed-grove-universal-4-pin-kabel-fixierend-20cm-5er-pack`
- [ ] Sound Amplifier(2) `https://www.berrybase.de/hifiberry-dac-mit-3-5mm-klinken-ausgang`
- [ ] Buttons(4) `https://www.berrybase.de/arcade-button-44mm-beleuchtet-led-12v-dc`
- [ ] usb hub `https://www.reichelt.de/usb-2-0-4-port-hub-4x-a-equip-128955-p311104.html?&trstct=pol_2&nbc=1`
- [ ] Pressure censor (4) `https://www.berrybase.de/sparkfun-altitude/pressure-sensor-breakout-mpl3115a2`

---
# Install Happykids on a Server and Documentation

## Table of Contents
[[_TOC_]]

## Preriquisites
- Linux system (preferably Debian 12 or similar)
- Docker installed (we used: version 25.0.4, build 1a576c5)
- Docker Compose installed (we used: version v2.24.7)
- Node.js installed (we used: 21.7.1)
- npm installed (we used: 10.5.0)
- system specs should be evaluated by an administrator, depending on how much traffic and stored data is expected

## Installation for production
This project is split into a Backend application and Web application. The main application is the current one Connected application with a micro-service architecture into a Docker, which will be build with only one command on the terminal.

## Cloning
1. Clone the projects:
    - `git clone https://gitlab.rlp.net/507iot/happykids.git` or
    - `git clone git@gitlab.rlp.net:507iot/happykids.git`

## Configuration
Both applications have a `.env.dist` file, that serves as a template for configuration. After cloning, come into the happykids file and : 
    - `cp .env.dist .env` than
    - `cd happy-UI`, than copy the .env.dist like `cp .env.dist .env`

1. Description for the Server's configuration file:
    - PORT : This is the port on which the server must be running in order to be reached.
    - DB_HOST : You have to leave it on `Happydb` because it is the service's name for the database.
    - DB_USER : That is the user's credential for login in the database's system. You musht leave it on `happyKids` because it is so configured on the docker-file by the database's service.
    - DB_PASSWORD : That is the password for the user's credential for login in the database's system. You must leave it at this value because it's the same value into the configuration in the Docker.
    - DB_DATABASE : That ist the database's name. If you want to change it, you have also to change it into the `compose.yaml` file on the `Happydb` service.
    - DB_PORT : This is the port on which the database must be runnning. You have to leave it on `5432`
    - ACCESS_SECRET_TOKEN : This is the injected secret_token after Login on the system.
    - ACCESS_REFRESH_TOKEN : This is the refresh_token by using the system.
    - OPENAI_KEY : This is your key that you will use for using the OpenAI-API.
    - OPENAI_MODEL : This is the used Model for the API.
    - ORIGIN_ACCES : That is the possible application, which could be access to the system. You can add much value for that for using multiples Origin_access

2. Description for the web-app's configuration file:
    - VITE_SERVER_URL : This is the URL on which our backend or server runs. That could be `http://localhost:3000`, if your server runs local on port 3000 or others depending where your server runs.
    - VITE_MQTT_HOST : This is the host for our MQTT-Server.
    - VITE_MQTT_PORT : This is the port on which our MQTT-Server must be running for sending the information to our Application.
    - VITE_OPENAI_KEY : This is your key that you will use for using the OpenAI-API.
    - VITE_OPENAI_MODEL : This is the used Model for the API.

## Starting the compilation
For starting the compilation of the Server and the Web-Application, you have to the directory `tools` than for generating all:
- `./up.sh`
In the script `up.sh`, we have wrote all necessary commands for building and making up all our necessaries services.
For shuting down:
- `./down.sh`
In the script `down.sh`, we have wrote all necessaries commands for shuting down all Services of both applications and deleting the caches.

## Game engine
After generating and building for the server and web-app, all Roles and Levels for the game are directly saved into the database.
To Checking use : `<Server_adress>:9080`.

    ```
        A. Role informations:
            - USER
            - ADMIN

        B. Level informations:
            1. Kid
            2. Anfänger
            3. Intermediate
            4. Advanced
            5. Vorgeschritten
            6. Boss
        
        C. Login
            After enter the credentials by register. When man login, we have to use the syntax : `Happy<username>` or using your e-mail adress

    ```

# Authors and Acknowledgment
- Joel Yvan Heda Tankeu
- Joresse Zekeng Dadjo
