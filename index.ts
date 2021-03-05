import { USEast1Region } from "@pulumi/aws";
import aws = require("@pulumi/aws");

import { GetLocalStackEndpoint } from "./local-helpers";

const stageName = "stage"
const REGION = USEast1Region // "us-east-1"
const NAME = "TESTAPP"

let localstackEndpoint = "http://localhost:4566"

let localProvider = new aws.Provider("localstack", {
    accessKey : "integration-testing",
    secretKey : "integration-testing",
    region : "us-east-1",
    endpoints:  [GetLocalStackEndpoint(localstackEndpoint)],
    skipCredentialsValidation: true,
    s3ForcePathStyle: true,
    skipMetadataApiCheck: true,
    skipRequestingAccountId: true,
    skipRegionValidation: true,
    skipGetEc2Platforms: true,

})


let lambdaNode = new aws.lambda.CallbackFunction("testlambda", {
    name: 'myTestLambda',
    timeout: 900,
    memorySize: 128 /*MB*/,    

    callback: async e => {
        // your code here ...
        return "Hi"
      }
}, {provider: localProvider})
const messageTopic = new aws.sns.Topic("messages", {}, {provider: localProvider});
messageTopic.onEvent("processTopicMsg", lambdaNode, {}, {provider: localProvider})
