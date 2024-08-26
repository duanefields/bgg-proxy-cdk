# BGG Proxy

This is a simple proxy server for talking to the BGG XML API at
<https://www.boardgamegeek.com/xmlapi2>. It adds CORS support and converts the response from XML to
(somewhat ugly) JSON. It is built using Amazon Cloud Development Kit (CDK).

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `npx cdk deploy` deploy this stack to your default AWS account/region
- `npx cdk diff` compare deployed stack with current state
- `npx cdk synth` emits the synthesized CloudFormation template

## Installing dependencies

- `npm install -g aws-cdk`
- `npm install`
- `cd lambda; npm install`

## Deploying production resources

- `cdk deploy`

CDKStack.ProxyApiEndpoint2177970D = <https://yislvgv5t8.execute-api.us-east-1.amazonaws.com/prod/>

## Running and testing locally

Install AWS SAM:
<https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html#install-sam-cli-instructions>

- `sam local start-api -t ./cdk.out/CDKStack.template.json`

<http://127.0.0.1:3000/bgg/collection?username=dkf2112>
