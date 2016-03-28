import os

APP_PATH = os.path.dirname(__file__)

if str(os.getenv("DEBUG")).lower() in ["on", "1", "true"]:
    DEBUG = True
else:
    DEBUG = False
