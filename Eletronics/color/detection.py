import RPi.GPIO as GPIO
import time
import paho.mqtt.client as mqtt

# Define sensor pins
s0 = 15
s1 = 18
s2 = 23
s3 = 24
signal = 25

# GPIO setup
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(signal, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(s0, GPIO.OUT)
GPIO.setup(s1, GPIO.OUT)
GPIO.setup(s2, GPIO.OUT)
GPIO.setup(s3, GPIO.OUT)

# Initialize LEDs in the off position
GPIO.output(s0, GPIO.LOW)
GPIO.output(s1, GPIO.LOW)

# MQTT configuration
MQTT_BROKER = "iot.it.hs-worms.de"  # Change to your MQTT broker's IP address
MQTT_PORT = 9007
MQTT_TOPIC_RESULT = "home/color_detected"

client = mqtt.Client(transport="websockets")
client.connect(MQTT_BROKER, MQTT_PORT, 60)


def read_color():
    """
    Reads the color values from the sensor.
    The function measures the frequency for red, green, and blue light,
    which corresponds to the intensity of each color.
    """
    # Turn on the LEDs
    GPIO.output(s0, GPIO.HIGH)
    GPIO.output(s1, GPIO.LOW)
    
    # Read the red frequency
    GPIO.output(s2, GPIO.LOW)
    GPIO.output(s3, GPIO.LOW)
    time.sleep(0.1)
    red = read_frequency()
    
    # Read the green frequency
    GPIO.output(s2, GPIO.HIGH)
    GPIO.output(s3, GPIO.HIGH)
    time.sleep(0.1)
    green = read_frequency()
    
    # Read the blue frequency
    GPIO.output(s2, GPIO.LOW)
    GPIO.output(s3, GPIO.HIGH)
    time.sleep(0.1)
    blue = read_frequency()
    
    # Turn off the LEDs
    GPIO.output(s0, GPIO.LOW)
    GPIO.output(s1, GPIO.LOW)
    
    return red, green, blue


def read_frequency():
    """
    Measures the frequency of the signal from the sensor.
    This function counts the number of pulses from the sensor within a fixed duration.
    """
    start = time.time()
    count = 0
    duration = 0.1  # Measurement duration in seconds

    while time.time() - start < duration:
        if GPIO.input(signal) == GPIO.LOW:
            while GPIO.input(signal) == GPIO.LOW:
                # Wait for the signal to go high
                pass
            count += 1
    
    frequency = count / duration
    return frequency


def detect_color(red, green, blue):
    """
    Determines the dominant color based on the measured frequencies.
    The color with the lowest frequency is the most intense and thus the dominant color.
    """
    if red > green and red > blue:
        return "RED"
    elif green > red and green > blue:
        return "GREEN"
    elif blue > red and blue > green:
        return "BLUE"
    else:
        return "Unknown"


def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))
    client.subscribe("home/button2")  # Subscribe to the topic where the button message will be published


def on_message(client, userdata, msg):
    if msg.payload.decode() == "released__2":  # Check if the received message is "released__1"
        print("Color detection started...")
        red, green, blue = read_color()
        color = detect_color(red, green, blue)
        print(f"Detected color: {color} - Red: {red}, Green: {green}, Blue: {blue}")
        client.publish(MQTT_TOPIC_RESULT, color)


# MQTT configuration
# MQTT_BROKER = "localhost"  # Change to your MQTT broker's IP address
# MQTT_PORT = 1884
# client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.connect(MQTT_BROKER, MQTT_PORT, 60)

client.loop_forever()
