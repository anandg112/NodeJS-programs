const AWS = require('aws-sdk');

const s3 = new AWS.S3();

//Bucket names must be unique across all S3 users

CreateBucket = (myBucket, myKey) => {
    s3.createBucket({
        Bucket: myBucket
    }, (err, data) => {
        if(err) {
            console.log(err);
        } else {
            params = { Bucket: myBucket, Key: myKey, Body: 'Hello World!' };
            s3.putObject(params, (err, data) => {
                if(err)
                    console.log(err);
                else
                    console.log("Succesfully uploaded data to myBucket/myKeyß")
            });
        }
    });
}

const bucketName = 'anand-g-bucket';
const keyName = 'anandBucketKey';

CreateBucket(bucketName, keyName);