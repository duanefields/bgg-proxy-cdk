import * as cdk from "aws-cdk-lib"
import { Size } from "aws-cdk-lib"
import * as apigateway from "aws-cdk-lib/aws-apigateway"
import * as lambda from "aws-cdk-lib/aws-lambda"
import { Construct } from "constructs"

export class CdkHelloWorldStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // Define the Lambda function resource
    const helloWorldFunction = new lambda.Function(this, "HelloWorldFunction", {
      runtime: lambda.Runtime.NODEJS_20_X, // Choose any supported Node.js runtime
      code: lambda.Code.fromAsset("lambda"), // Points to the lambda directory
      handler: "hello.handler", // Points to the 'hello' file in the lambda directory
    })

    // Define the API Gateway resource
    const api = new apigateway.LambdaRestApi(this, "HelloWorldApi", {
      handler: helloWorldFunction,
      minCompressionSize: Size.bytes(0),
      proxy: false,
    })

    // Define the '/hello' resource with a GET method
    const helloResource = api.root.addResource("hello")
    helloResource.addMethod("GET")
  }
}
