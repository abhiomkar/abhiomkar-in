import boto
from boto.s3.key import Key
import boto.s3.connection

import simplejson as json
import os

AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')

class S3:
    def __init__(self, bucket_name):
        region = "ap-south-1"
        connection = boto.s3.connect_to_region(region,
           aws_access_key_id = AWS_ACCESS_KEY_ID,
           aws_secret_access_key = AWS_SECRET_ACCESS_KEY,
           is_secure=True,
           calling_format = boto.s3.connection.OrdinaryCallingFormat())
        self.bucket = connection.get_bucket(bucket_name)
        self._base_url = "https://s3-%s.amazonaws.com/%s/" % (region, bucket_name)

    def allowed_types_(self):
        types = [".md", ".jpeg", ".jpg", ".png", ".gif", ".mp4", ".mp3", ".mov"]
        return types

    def list_dir(self, directory, recursive=True, types=[""], prefix_hostname=True, absolute_path=True):
        result = []
        for item in self.bucket.list(prefix=directory):
            if item.key.lower().endswith(tuple(types)):
                key = item.key if absolute_path else item.key.lstrip(directory).lstrip('/').rstrip('/')
                if key:
                    result.append((self._base_url if prefix_hostname else '') + key)
        return result

s3 = S3("abhiomkar.in-files-mumbai")
photography_folders = s3.list_dir("photography", recursive=False, types=["/"], prefix_hostname=False, absolute_path=False)

photography_gallery_list = []

for folder_name in photography_folders:
    photography_gallery = {}
    photography_gallery["name"] = folder_name
    photography_gallery["items"] = []
    for url in s3.list_dir("photography/" + folder_name, recursive=True, types=[".jpeg", ".jpg", ".png"]):
        photography_gallery["photo_urls"].append(url)

    photography_gallery_list.append(photography_gallery)

print json.dumps(photography_gallery_list)
