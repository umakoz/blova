const aws = require('aws-sdk');

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
const S3_BUCKET = process.env.S3_BUCKET;
const S3_BUCKET_REGION = process.env.S3_BUCKET_REGION

aws.config.update({
	accessKeyId: AWS_ACCESS_KEY_ID,
	secretAccessKey: AWS_SECRET_ACCESS_KEY,
	region: S3_BUCKET_REGION
});

const save = (fileName, xml) => {
  const s3 = new aws.S3();
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Body: xml
  };
  s3.putObject(s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return false;
    }
    return true;
  });
}

module.exports = {
  save: save
}
