import * as cdk from "aws-cdk-lib"
import * as apigateway from "aws-cdk-lib/aws-apigateway"
import * as lambda from "aws-cdk-lib/aws-lambda"
import { Construct } from "constructs"

export class CDKStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // Define the Lambda function resource
    const proxyFunction = new lambda.Function(this, "ProxyFunction", {
      runtime: lambda.Runtime.NODEJS_20_X, // Choose any supported Node.js runtime
      code: lambda.Code.fromAsset("lambda"), // Points to the lambda directory
      handler: "proxy.handler", // Points to the 'proxy' file in the lambda directory
      timeout: cdk.Duration.seconds(29), // Set the timeout to 29 seconds
    })

    // Define the API Gateway resource
    const api = new apigateway.RestApi(this, "ProxyApi", { minCompressionSize: cdk.Size.bytes(0) })

    // Define the '/bgg/{command}' resource with a GET method
    const bggResource = api.root.addResource("bgg")
    const commandResource = bggResource.addResource("{command}")
    commandResource.addMethod("GET", new apigateway.LambdaIntegration(proxyFunction))
  }
}
