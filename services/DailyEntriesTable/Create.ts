import { DynamoDB } from 'aws-sdk'
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda'
import { v4 } from 'uuid'
import { DailyEntry } from '../Shared/Model'

const dbClient = new DynamoDB.DocumentClient()

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  const result: APIGatewayProxyResult = {
    statusCode: 200,
    body: 'Hello from dynamo',
  }

  const item: DailyEntry = {
    dailyEntryId: v4(),
    date: new Date(),
    weight: 200,
    meals: [],
    activityLevel: 'SEDENTARY',
  }

  try {
    await dbClient
      .put({
        TableName: 'DailyEntriesTable',
        Item: item,
      })
      .promise()
  } catch (error) {
    if (error instanceof Error) {
      result.body = error.message
    }
  }

  return result
}

export { handler }
