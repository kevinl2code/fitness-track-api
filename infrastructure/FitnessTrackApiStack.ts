import { Stack, StackProps } from 'aws-cdk-lib'
import { Cors, ResourceOptions, RestApi } from 'aws-cdk-lib/aws-apigateway'
import { Construct } from 'constructs'
import { GenericTable } from './GenericTable'

export class FitnessTrackApiStack extends Stack {
  private api = new RestApi(this, 'FitnessTrackApi')
  private dailyEntriesTable = new GenericTable(this, {
    tableName: 'DailyEntriesTable',
    primaryKey: 'dailyEntryId',
    createLambdaPath: 'Create',
    readLambdaPath: 'Read',
    updateLambdaPath: 'Update',
    deleteLambdaPath: 'Delete',
    secondaryIndexes: ['date'],
  })

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const optionsWithCors: ResourceOptions = {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
      },
    }

    //DailyEntries API integrations
    const dailyEntryResource = this.api.root.addResource(
      'dailyentries',
      optionsWithCors
    )
    dailyEntryResource.addMethod(
      'POST',
      this.dailyEntriesTable.createLambdaIntegration
    )
    dailyEntryResource.addMethod(
      'GET',
      this.dailyEntriesTable.readLambdaIntegration
    )
    dailyEntryResource.addMethod(
      'PUT',
      this.dailyEntriesTable.updateLambdaIntegration
    )
    dailyEntryResource.addMethod(
      'DELETE',
      this.dailyEntriesTable.deleteLambdaIntegration
    )
  }
}
