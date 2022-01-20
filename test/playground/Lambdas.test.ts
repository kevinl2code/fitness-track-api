import { APIGatewayProxyEvent } from 'aws-lambda'
import { handler } from '../../services/FitnessTrackUsersTable/Delete'

// const event: APIGatewayProxyEvent = {
//   body: {
//     date: new Date(),
//     weight: 250,
//     meals: [],
//     activityLevel: 'LIGHTLY_ACTIVE',
//   },
// } as any

// const event: APIGatewayProxyEvent = {
//   queryStringParameters: {
//     date: '01/31/2021',
//   },
// } as any

const event: APIGatewayProxyEvent = {
  queryStringParameters: {
    dailyEntryId: '7c51311b-839e-4b4d-b931-67878c630af0',
  },
} as any

// const event: APIGatewayProxyEvent = {
//   queryStringParameters: {
//     dailyEntryId: '42074cad-642f-411c-aee6-30691d08e6ef',
//   },
//   body: {
//     activityLevel: 'EXTRA_ACTIVE',
//   },
// } as any

const result = handler(event, {} as any).then((apiResult) => {
  console.log(apiResult.body)
  const items = JSON.parse(apiResult.body)
  console.log(123)
})
