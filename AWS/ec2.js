const AWS = require("aws-sdk");
const ec2 = new AWS.EC2({apiVersion: '2016-11-15', region: 'us-east-1'});


let paramName = {
    KeyName: "anand-key"
};

CreateKeyPair = (params) => {
    ec2.createKeyPair(params, (err,data) => {
        if(err) 
            console.log(err);
        else
            console.log(data);
    });
}

let sgParams = {
    Description: "EC2 security group",
    GroupName: "ec2-anand-sg",
    VpcId: process.env.VPC_ID
}

CreateSecurityGroup = (params) => {
    ec2.createSecurityGroup(params, (err, data) => {
        if(err)
            console.log(err);
        else
            console.log(data);
    });
}

CreateKeyPair(paramName);
CreateSecurityGroup(sgParams);


// let ec2Params = {
//     BlockDeviceMappings: [
//         {
//             DeviceName: "/dev/sdh",
//             Ebs: {
//                 VolumeSize: 
//             }
//         }
//     ],
//     ImageId: "ami-0ff8a91507f77f867"
// }

