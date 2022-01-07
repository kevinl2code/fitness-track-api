import { Stack, StackProps } from 'aws-cdk-lib'
import { RestApi } from 'aws-cdk-lib/aws-apigateway'
import { Construct } from 'constructs'
import { GenericTable } from './GenericTable'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class FitnessTrackApiStack extends Stack {
  // private api = new RestApi(this, 'FitnessTrackApi')
  private dailyEntriesTable = new GenericTable(this, {
    tableName: 'DailyEntriesTable',
    primaryKey: 'dailyEntryId',
  })

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'FitnessTrackApiQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
