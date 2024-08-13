import RPi.GPIO as GPIO
import time

BUTTON1_PIN = 16
BUTTON2_PIN = 19
GPIO.setmode(GPIO.BCM)

GPIO.setup(BUTTON1_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(BUTTON2_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)

previous_button1_state = GPIO.input(BUTTON1_PIN)
previous_button2_state = GPIO.input(BUTTON2_PIN)


try:
  while True:
    time.sleep(0.01)
    button1_state = GPIO.input(BUTTON1_PIN)
    button2_state = GPIO.input(BUTTON2_PIN)
    if button1_state != previous_button1_state:
      previous_button1_state = button1_state
      if button1_state == GPIO.HIGH:
        print("Button__1 has just been released")

    elif button2_state != previous_button2_state:
      previous_button2_state = button2_state
      if button2_state == GPIO.HIGH:
        print("Button__2 has just been released")
except KeyboardInterrupt:
  GPIO.cleanup()
