import RPi.GPIO as GPIO
import time
import paho.mqtt.client as mqtt

# Pin configuration for the speaker
SPEAKER_PIN = 18

# Frequencies for bass notes 1 to 7
BassTab = [1911, 1702, 1516, 1431, 1275, 1136, 1012]

# Set up GPIO using BCM numbering
GPIO.setmode(GPIO.BCM)
GPIO.setup(SPEAKER_PIN, GPIO.OUT)

# Initialize PWM for the speaker pin with a frequency of 1000 Hz
pwm = GPIO.PWM(SPEAKER_PIN, 1000)
pwm.start(0)  # Start with 0 duty cycle to avoid any sound until needed

# Flag to track if sound is currently playing
sound_active = False


def sound(note_index):
    """
    Play a sound at a given note index.
    
    :param note_index: Index of the note to be played from BassTab.
    """
    frequency = 1.0 / (2 * BassTab[note_index] * 1e-6)
    pwm.ChangeFrequency(frequency)
    time.sleep(0.5)  # Play note for 500 ms


def on_connect(client, userdata, flags, rc):
    """
    Callback for when the client receives a CONNACK response from the server.
    
    :param client: The client instance for this callback.
    :param userdata: The private user data as set in Client() or userdata_set().
    :param flags: Response flags sent by the broker.
    :param rc: The connection result.
    """
    print(f"Connected with result code {rc}")
    client.subscribe("home/sound_signal")
    print("Subscribed to topic 'home/sound_signal'")


def on_message(client, userdata, msg):
    """
    Callback for when a PUBLISH message is received from the server.
    
    :param client: The client instance for this callback.
    :param userdata: The private user data as set in Client() or userdata_set().
    :param msg: An instance of MQTTMessage.
    """
    global sound_active
    
    print(f"Message received on topic: {msg.topic}")
    message = msg.payload.decode()
    print(f"Message content: {message}")
    
    if message == "play_sound" and not sound_active:
        try:
            print("Playing sound...")
            sound_active = True  # Set sound active flag
            pwm.start(50)  # Start PWM with duty cycle 50%
            for note_index in range(7):
                if not sound_active:
                    break  # Exit loop if sound is no longer active
                sound(note_index)
                time.sleep(0.5)  # Adjust sleep if needed
        except Exception as e:
            print(f"An error occurred: {e}")
        finally:
            print("Sound playback stopped.")
            pwm.start(0)  # Stop PWM by setting duty cycle to 0
            sound_active = False  # Reset sound active flag


# Create an MQTT client instance
client = mqtt.Client(transport="websockets")
client.on_connect = on_connect
client.on_message = on_message

# MQTT broker configuration
MQTT_BROKER = "192.168.2.169"  # Change to your MQTT broker's IP address
MQTT_PORT = 9001

# Connect to the MQTT broker and start the client loop
client.connect(MQTT_BROKER, MQTT_PORT, 60)
client.loop_forever()

# Clean up GPIO at the end of the program
pwm.stop()
GPIO.cleanup()
