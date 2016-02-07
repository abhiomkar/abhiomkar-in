import os

if str(os.getenv("DEBUG")).lower() in ["on", "1", "true"]:
    DEBUG = True
else:
    DEBUG = False
