# Import necessary libraries
import RPi.GPIO as GPIO
import time
import paho.mqtt.client as mqtt

# Disable GPIO warnings
GPIO.setwarnings(False)

# Set up GPIO using BCM numbering
GPIO.setmode(GPIO.BCM)

# Define pin numbers
sig_pin = 17  # Example, use the pin you connected to the motor's SIG pin

# Set up pin modes
GPIO.setup(sig_pin, GPIO.OUT)

# Create PWM instance
pwm = GPIO.PWM(sig_pin, 100)  # 100 Hz frequency

# Variable to track if vibration is active
vibration_active = False


def on_connect(client, userdata, flags, rc):
    """
    Callback function for when the client receives a CONNACK response from the server.
    """
    print(f"Connected with result code {rc}")
    client.subscribe("home/sound_signal")
    print("Subscribed to topic 'home/sound_signal'")


def on_message(client, userdata, msg):
    """
    Callback function for when a PUBLISH message is received from the server.
    """
    global vibration_active
    global pwm
    
    print(f"Message received on topic: {msg.topic}")
    message = msg.payload.decode()
    print(f"Message content: {message}")
    
    if message == "play_sound" and not vibration_active:
        try:
            print("Starting vibration...")
            pwm.start(50)  # Start PWM with duty cycle 50%
            vibration_active = True  # Set vibration active flag
            time.sleep(1)  # Run the vibration for 1 second
        except Exception as e:
            print(f"An error occurred: {e}")
        finally:
            pwm.stop()  # Stop PWM
            vibration_active = False  # Reset vibration active flag


# Create MQTT client instance with WebSocket transport
client = mqtt.Client(transport="websockets")

# Assign callback functions
client.on_connect = on_connect
client.on_message = on_message

# Define MQTT broker address and port
MQTT_BROKER = "iot.it.hs-worms.de"  # Change to your MQTT broker's IP address
MQTT_PORT = 9007

# Connect to the MQTT broker
client.connect(MQTT_BROKER, MQTT_PORT, 60)

# Start MQTT client loop to listen for messages
client.loop_forever()

# Clean up GPIO at the end of the program
GPIO.cleanup()
