import RPi.GPIO as GPIO
import time
import paho.mqtt.client as mqtt

# GPIO Pin Definitions
BUTTON1_PIN = 16
BUTTON2_PIN = 19
BUTTON3_PIN = 13
GPIO.setmode(GPIO.BCM)
GPIO.setup(BUTTON1_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(BUTTON2_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(BUTTON3_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)

previous_button1_state = GPIO.input(BUTTON1_PIN)
previous_button2_state = GPIO.input(BUTTON2_PIN)
previous_button3_state = GPIO.input(BUTTON3_PIN)

# MQTT Configuration
MQTT_BROKER = "iot.it.hs-worms.de"
MQTT_PORT = 9007
MQTT_TOPIC_BUTTON1 = "home/button1"
MQTT_TOPIC_BUTTON2 = "home/button2"
MQTT_TOPIC_BUTTON3 = "home/button3"


def on_connect(client, userdata, flags, rc):
    print(f"Connected with result code {rc}")


# Create MQTT client and configure it for WebSockets
client = mqtt.Client(transport="websockets")
client.on_connect = on_connect
client.connect(MQTT_BROKER, MQTT_PORT, 60)
client.loop_start()

try:
    while True:
        time.sleep(0.01)
        button1_state = GPIO.input(BUTTON1_PIN)
        button2_state = GPIO.input(BUTTON2_PIN)
        button3_state = GPIO.input(BUTTON3_PIN)
        
        if button1_state != previous_button1_state:
            previous_button1_state = button1_state
            if button1_state == GPIO.HIGH:
                print("Button__1 has just been released")
                client.publish(MQTT_TOPIC_BUTTON1, "released__1")

        if button2_state != previous_button2_state:
            previous_button2_state = button2_state
            if button2_state == GPIO.HIGH:
                print("Button__2 has just been released")
                client.publish(MQTT_TOPIC_BUTTON2, "released__2")
        
        if button3_state != previous_button3_state:
            previous_button3_state = button3_state
            if button3_state == GPIO.HIGH:
                print("Button__3 has just been released")
                client.publish(MQTT_TOPIC_BUTTON3, "released__3")
                
except KeyboardInterrupt:
    GPIO.cleanup()
    client.loop_stop()
    client.disconnect()
