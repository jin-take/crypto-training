import subprocess
import sys

def install_requirements():
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("All packages installed successfully.")
    except subprocess.CalledProcessError as e:
        print("An error occurred while installing packages.")
        print(e)

if __name__ == "__main__":
    install_requirements()
