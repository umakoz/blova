# Blova

Blova makes Blockly and Clova friends.


## Get started

```
$ heroku login
$ heroku create
$ heroku config:set APPLICATION_ID="Clova Extension ID"
$ heroku config:set AWS_ACCESS_KEY_ID="xxx" AWS_SECRET_ACCESS_KEY="yyy"
$ heroku config:set S3_BUCKET="xxx"
$ heroku config:set S3_BUCKET_REGION="xxx"
$ git push heroku master
```

## If you modify blockly, you should do...

```
$ gulp blockly_compress
$ gulp build
```
