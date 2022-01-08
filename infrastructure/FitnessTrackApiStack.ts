import { Stack, StackProps } from 'aws-cdk-lib'
import { RestApi } from 'aws-cdk-lib/aws-apigateway'
import { Construct } from 'constructs'
import { GenericTable } from './GenericTable'

export class FitnessTrackApiStack extends Stack {
  private api = new RestApi(this, 'FitnessTrackApi')
  private dailyEntriesTable = new GenericTable(this, {
    tableName: 'DailyEntriesTable',
    primaryKey: 'dailyEntryId',
    createLambdaPath: 'Create',
    readLambdaPath: 'Read',
    secondaryIndexes: ['date'],
  })

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    //DailyEntries API integrations
    const dailyEntryResource = this.api.root.addResource('dailyentries')
    dailyEntryResource.addMethod(
      'POST',
      this.dailyEntriesTable.createLambdaIntegration
    )
    dailyEntryResource.addMethod(
      'GET',
      this.dailyEntriesTable.readLambdaIntegration
    )
  }
}
