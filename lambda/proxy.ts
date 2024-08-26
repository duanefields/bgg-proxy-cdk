import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import X2JS from "x2js"

const x2js = new X2JS()

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // construct the bgg API URL
  const qs = new URLSearchParams(event.queryStringParameters as any)
  const command = event.pathParameters?.command
  const url = `https://www.boardgamegeek.com/xmlapi2/${command}?${qs.toString()}`

  // fetch the data from the bgg API
  const response = await fetch(url)
  const xml = await response.text()
  const json = x2js.xml2js(xml)

  let headers = {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
    "Content-Type": "application/json",
  }

  return {
    statusCode: response.status,
    headers,
    body: JSON.stringify(json),
  }
}
