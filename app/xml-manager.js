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

const save = async (fileName, xml) => {
  let s3 = new aws.S3();
  let params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Body: xml
  };
  try {
    await s3.putObject(params).promise();
    return true;
  } catch(err) {
    console.log(err);
    return false;
  }
}

const load = async (fileName) => {
  let s3 = new aws.S3();
  let params = {
    Bucket: S3_BUCKET,
    Key: fileName,
  };
  try {
    let data = await s3.getObject(params).promise();
    return data.Body.toString();
  } catch(err) {
    console.log(err);
    return err;
  }
}

module.exports = {
  save: save,
  load: load
}
