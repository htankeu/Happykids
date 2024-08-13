import multiprocessing
import subprocess
import os

# Define the paths to the scripts
scripts = [
    "Pressure/button.py",
    "vibration/vibration_motor.py",
    "speaker/speaker.py",
    "color/detection.py"
]


def run_script(script_path):
    """
    Function to run a script using subprocess.
    
    :param script_path: Path to the script to be executed.
    """
    subprocess.run(["python3", script_path], check=True)


if __name__ == "__main__":
    # Get the directory of the current script
    base_dir = os.path.dirname(os.path.abspath(__file__))

    # Create processes for each script
    processes = []
    for script in scripts:
        # Create the full path to the script
        script_path = os.path.join(base_dir, script)
        
        # Create a new process that runs the script
        process = multiprocessing.Process(target=run_script, args=(script_path,))
        
        # Add the process to the list of processes
        processes.append(process)

    # Start all processes
    for process in processes:
        process.start()

    # Wait for all processes to complete
    for process in processes:
        process.join()

    print("All scripts have finished execution.")
