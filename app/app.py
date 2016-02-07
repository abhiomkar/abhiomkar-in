from flask import Flask, send_from_directory
from flask import render_template

import settings

app = Flask(__name__, template_folder="./")

@app.route("/")
def home():
    return render_template("home/home.html", name="home")

# @app.route('/public/<path:path>')
# def serve_static(path):
#     return send_from_directory('../public', path)

if __name__ == "__main__":
    app.run(debug=True)
