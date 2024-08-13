import RPi.GPIO as GPIO
import time

BUTTON1_PIN = 16
BUTTON2_PIN = 19
GPIO.setmode(GPIO.BCM)

GPIO.setup(BUTTON1_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(BUTTON2_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)

try:
  while True:
    time.sleep(0.1)
    if GPIO.input(BUTTON1_PIN) == GPIO.LOW:
      print("Button__1 is pressed")
    elif GPIO.input(BUTTON2_PIN) == GPIO.LOW:
      print("Button__2 is pressed")
    else:
      print("Button is not pressed")
except KeyboardInterrupt:
  GPIO.cleanup()
