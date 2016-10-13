Abhiomkar-in Website on App Engine
==================================

Install
-------

 - Install Gcloud
 - Install Pip
 - Install virtualenvwrapper
 - Install [pip-save](https://github.com/abhiomkar/pip-save)
 - Install Flask

Setup
-----

 - Clone this starter kit 

        git clone https://github.com/abhiomkar/abhiomkar-in.git

 - Login to Gcloud

        gcloud init

Development
-----------

 - Create Python virtual enviroment using pip-save tool & install all deps

        pip init
        pip install

 - Install javascript deps
        
        npm install
 
 - Run app locally

        dev_appserver.py app.yaml --port 5000

 - Run Webpack in watch mode
       
       webpack --watch

 - Go to localhost:3003

 - Hack! Hack!
  
Deploy
------

 - Build and deploy to production

        webpack && gcloud app deploy

 - You should see result at abhiomkar-in.appsot.com
