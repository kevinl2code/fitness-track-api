import { DynamoDB } from 'aws-sdk'
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda'
import { v4 } from 'uuid'
import { addCorsHeader } from '../Shared/Utils'
import { validateAsFitnessTrackCategory } from '../Shared/InputValidator'

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

  try {
    const item =
      typeof event.body == 'object' ? event.body : JSON.parse(event.body)
    console.log(item)
    // item.dailyEntryId = v4()
    // validateAsDailyEntry(item)
    if (item.type === 'CATEGORY') {
      validateAsFitnessTrackCategory(item)
      await dbClient
        .put({
          TableName: TABLE_NAME!,
          Item: item,
        })
        .promise()
      result.body = JSON.stringify(`created item`)
    }
    if (item.type === 'SUBCATEGORY') {
      // validateAsFitnessTrackCategory(item)
      await dbClient
        .put({
          TableName: TABLE_NAME!,
          Item: item,
        })
        .promise()
      result.body = JSON.stringify(`created item`)
    }
    if (item.type === 'FOOD') {
      // validateAsFitnessTrackCategory(item)
      await dbClient
        .put({
          TableName: TABLE_NAME!,
          Item: item,
        })
        .promise()
      result.body = JSON.stringify(`created item`)
    }
  } catch (error) {
    if (error instanceof Error) {
      result.body = error.message
    }
  }

  return result
}

export { handler }
