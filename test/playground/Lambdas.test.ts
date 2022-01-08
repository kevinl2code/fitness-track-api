import { APIGatewayProxyEvent } from 'aws-lambda'
import { handler } from '../../services/DailyEntriesTable/Read'

// const event: APIGatewayProxyEvent = {
//   body: {
//     date: new Date(),
//     weight: 250,
//     meals: [],
//     activityLevel: 'LIGHTLY_ACTIVE',
//   },
// } as any

const event: APIGatewayProxyEvent = {
  queryStringParameters: {
    date: '01/31/2021',
  },
} as any

const result = handler(event, {} as any).then((apiResult) => {
  console.log(apiResult.body)
  const items = JSON.parse(apiResult.body)
  console.log(123)
})
