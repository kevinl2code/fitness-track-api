import { DynamoDB } from 'aws-sdk'
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda'
import { addCorsHeader } from '../Shared/Utils'

const TABLE_NAME = process.env.TABLE_NAME as string
const PRIMARY_KEY = process.env.PRIMARY_KEY as string
const SORT_KEY = process.env.SORT_KEY
const dbClient = new DynamoDB.DocumentClient()

// async function handler(
//   event: APIGatewayProxyEvent,
//   context: Context
// ): Promise<APIGatewayProxyResult> {
//   const result: APIGatewayProxyResult = {
//     statusCode: 200,
//     body: 'Hello from dynamo',
//   }
//   addCorsHeader(result)

//   const dailyEntryId = event.queryStringParameters?.[PRIMARY_KEY]

//   if (dailyEntryId) {
//     const deleteResult = await dbClient
//       .delete({
//         TableName: TABLE_NAME,
//         Key: {
//           [PRIMARY_KEY]: dailyEntryId,
//         },
//       })
//       .promise()
//     result.body = JSON.stringify(deleteResult)
//   }

//   return result
// }

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  const result: APIGatewayProxyResult = {
    statusCode: 200,
    body: 'Hello from dynamo',
  }
  addCorsHeader(result)

  const PK = event.queryStringParameters?.[PRIMARY_KEY]
  const SK = event.queryStringParameters?.[SORT_KEY!]

  if (PK && SK) {
    const deleteResult = await dbClient
      .delete({
        TableName: TABLE_NAME,
        Key: {
          [PRIMARY_KEY]: PK,
          [SORT_KEY!]: SK,
        },
      })
      .promise()
    result.body = JSON.stringify(deleteResult)
  }

  return result
}

export { handler }
