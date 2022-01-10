import { DynamoDB } from 'aws-sdk'
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda'
import { v4 } from 'uuid'
import { DailyEntry } from '../Shared/Model'
import { addCorsHeader } from '../Shared/Utils'

const TABLE_NAME = process.env.TABLE_NAME
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

  const item =
    typeof event.body == 'object' ? event.body : JSON.parse(event.body)
  item.dailyEntryId = v4()

  // const item: DailyEntry = {
  //   dailyEntryId: v4(),
  //   date: new Date(),
  //   weight: 200,
  //   meals: [],
  //   activityLevel: 'SEDENTARY',
  // }

  //NEED TO ADD VALIDATION THAT ITEM IS OF TYPE DAILYENTRY BEFORE WRITING IT TO DYNAMODB

  try {
    await dbClient
      .put({
        TableName: TABLE_NAME!,
        Item: item,
      })
      .promise()
  } catch (error) {
    if (error instanceof Error) {
      result.body = error.message
    }
  }
  result.body = JSON.stringify(`created item ${item.dailyEntryId}`)
  return result
}

export { handler }
