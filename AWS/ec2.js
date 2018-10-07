const AWS = require("aws-sdk");
const ec2 = new AWS.EC2({apiVersion: '2016-11-15', region: 'us-east-1'});

const sgName = 'anand-sg'; //The security group name
const keyName = 'anand-key';

let keyPairParams = {
    KeyName: keyName //The key for the KeyPair key
};
let sgParams = {
    Description: "EC2 security group",
    GroupName: sgName,
    VpcId: process.env.VPC_ID
};

let ec2Params = {
    BlockDeviceMappings: [
        {
            DeviceName: "/dev/sdh",
            Ebs: {
                VolumeSize: 100
            }
        }
    ],
    ImageId: "ami-0ff8a91507f77f867",
    InstanceType: "t2.micro",
    KeyName: keyName,
    MaxCount: 1,
    MinCount: 1,
    SecurityGroups: [
        sgName
    ],
};

const createKeyPair = (keyPairParams) => {
    return new Promise((resolve, reject) => {
        ec2.createKeyPair(keyPairParams, (err, data) => {
            if (err)
                reject(err);
            else
                resolve(data)
        })
    })
};

const createSecurityGroup = (sgParams) => {
    return new Promise((resolve, reject) => {
        ec2.createSecurityGroup(sgParams, (err, data) => {
            if(err)
                reject(err);
            else {
                    let paramsIngress = {
                        GroupId: data.GroupId,
                        IpPermissions: [
                            {
                                IpProtocol: "tcp",
                                FromPort: 22,
                                ToPort: 22,
                                IpRanges: [{ "CidrIp": "0.0.0.0/0" }]
                            }
                        ]
                    };
                    ec2.authorizeSecurityGroupIngress(paramsIngress, (err, data) => {
                        if (err)
                            reject(err);
                        else
                            resolve(data);
                    });
                }
        })
    })
};

const runInstances = (ec2Params) => {
    return new Promise((resolve, reject) => {
        ec2.runInstances(ec2Params, (err, data) => {
            if (err)
                reject(err);
            else
                resolve(data);
        })
    })
};

async function executeParallelAsyncTasks() {
    try {
        await Promise.all([createKeyPair(keyPairParams), createSecurityGroup(sgParams), runInstances(ec2Params)])
    } catch(err) {
        console.log(err);
    }   
};

executeParallelAsyncTasks();




