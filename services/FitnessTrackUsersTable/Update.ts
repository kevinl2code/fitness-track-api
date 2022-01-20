import { DynamoDB } from 'aws-sdk'
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda'
import { addCorsHeader, getEventBody } from '../Shared/Utils'

const TABLE_NAME = process.env.TABLE_NAME as string
const PRIMARY_KEY = process.env.PRIMARY_KEY as string
const SORT_KEY = process.env.SORT_KEY as string
const dbClient = new DynamoDB.DocumentClient()

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  const result: APIGatewayProxyResult = {
    statusCode: 200,
    body: 'Hello from dynamo',
  }
  addCorsHeader(result)

  const requestBody = getEventBody(event)
  const userId = event.queryStringParameters?.[PRIMARY_KEY]
  const sortKey = event.queryStringParameters?.[SORT_KEY]

  if (requestBody && userId && sortKey) {
    const requestBodyKey = Object.keys(requestBody)[0]
    const requestBodyValue = requestBody[requestBodyKey]

    const updateResult = await dbClient
      .update({
        TableName: TABLE_NAME,
        Key: {
          [PRIMARY_KEY]: userId,
          [SORT_KEY]: sortKey,
        },
        UpdateExpression: 'set #zzzNew = :new',
        ExpressionAttributeValues: {
          ':new': requestBodyValue,
        },
        ExpressionAttributeNames: {
          '#zzzNew': requestBodyKey,
        },
        ReturnValues: 'UPDATED_NEW',
      })
      .promise()
    result.body = JSON.stringify(updateResult)
  }

  return result
}

export { handler }