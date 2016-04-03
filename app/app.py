import markdown
import simplejson as json

from flask import Flask, send_from_directory
from flask import render_template
from flask import Markup

import settings

app = Flask(__name__, template_folder="./")

@app.route("/")
def home():
    name = "home"
    content = Markup(markdown.markdown(open(settings.APP_PATH + "/home/home.md").read()))
    return render_template("home/home.html", **locals())

@app.route("/projects")
def projects():
    name = "projects"
    repoList = json.loads(open(settings.APP_PATH + "/projects/repos.json").read())
    
    return render_template("projects/projects.html", **locals())

# @app.route('/public/<path:path>')
# def serve_static(path):
#     return send_from_directory('../public', path)

if __name__ == "__main__":
    app.run(debug=True)
