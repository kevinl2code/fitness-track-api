import { Stack, StackProps } from 'aws-cdk-lib'
import {
  AuthorizationType,
  Cors,
  MethodOptions,
  ResourceOptions,
  RestApi,
} from 'aws-cdk-lib/aws-apigateway'
import { Construct } from 'constructs'
import { GenericTable } from './GenericTable'
import { AuthorizerWrapper } from './auth/AuthorizerWrapper'

export class FitnessTrackApiStack extends Stack {
  private api = new RestApi(this, 'FitnessTrackApi')
  private authorizer: AuthorizerWrapper

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

    this.authorizer = new AuthorizerWrapper(this, this.api)

    const optionsWithAuthorizer: MethodOptions = {
      authorizationType: AuthorizationType.COGNITO,
      authorizer: {
        authorizerId: this.authorizer.authorizer.authorizerId,
      },
    }

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
