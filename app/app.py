import markdown
import simplejson as json

from operator import itemgetter

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
    LIMIT = 5

    name = "projects"
    repo_list = json.loads(open(settings.APP_PATH + "/projects/projects.json").read())
    owner_url = repo_list[0]['owner']['html_url']

    popular_list = sorted(repo_list, key=itemgetter('stargazers_count'), reverse=True)[:LIMIT]
    recent_list = sorted(repo_list, key=itemgetter('created_at'), reverse=True)[:LIMIT]

    return render_template("projects/projects.html", **locals())

# @app.route('/public/<path:path>')
# def serve_static(path):
#     return send_from_directory('../public', path)

if __name__ == "__main__":
    app.run(debug=True)
