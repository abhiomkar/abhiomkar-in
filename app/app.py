import markdown
import simplejson as json

from operator import itemgetter

from flask import Flask, send_from_directory
from flask import render_template
from flask import Markup
from flask import request
from flask import jsonify

from google.appengine.api import mail

import settings
import sys

reload(sys)
sys.setdefaultencoding('utf8')

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

@app.route("/photography")
def photography():
    name = "photography"
    gallery_photo_list = json.loads(open(settings.APP_PATH + "/photography/photography.json").read())
    return render_template("photography/photography.html", **locals())

@app.route("/about")
def about():
    name = "about"
    content = Markup(markdown.markdown(open(settings.APP_PATH + "/about/about.md").read()))
    return render_template("about/about.html", **locals())

@app.route("/contact")
def contact():
    name = "contact"
    content = Markup(markdown.markdown(open(settings.APP_PATH + "/contact/contact.md").read()))
    return render_template("contact/contact.html", **locals())

@app.route("/contact/sendmail", methods=['POST'])
def sendmail():
    sender_email = request.form['contact-sender-email']
    sender_mail_subject = request.form['contact-subject']
    sender_mail_body = request.form['contact-body']

    mail.send_mail(sender="abhiomkar@gmail.com", to="abhiomkar@gmail.com",
            subject=sender_mail_subject, body=sender_mail_body, reply_to=sender_email)

    return jsonify(results={'status': 'OK'})

# @app.route('/public/<path:path>')
# def serve_static(path):
#     return send_from_directory('../public', path)

if __name__ == "__main__":
    app.run(debug=True)
