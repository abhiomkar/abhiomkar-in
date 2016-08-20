#!/bin/bash
NODE_ENV="production" gulp build && gcloud app deploy app.yaml
