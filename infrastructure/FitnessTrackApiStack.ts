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

  private fitnessTrackUsersTable = new GenericTable(this, {
    tableName: 'FitnessTrackUsersTable',
    primaryKey: 'userId',
    sortKey: 'sortKey',
    createLambdaPath: 'Create',
    readLambdaPath: 'Read',
    updateLambdaPath: 'Update',
    deleteLambdaPath: 'Delete',
    secondaryIndexes: [],
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
    const fitnessTrackUsersResource = this.api.root.addResource(
      'dailyentries',
      optionsWithCors
    )
    fitnessTrackUsersResource.addMethod(
      'POST',
      this.fitnessTrackUsersTable.createLambdaIntegration
      // optionsWithAuthorizer
    )
    fitnessTrackUsersResource.addMethod(
      'GET',
      this.fitnessTrackUsersTable.readLambdaIntegration
      // optionsWithAuthorizer
    )
    fitnessTrackUsersResource.addMethod(
      'PUT',
      this.fitnessTrackUsersTable.updateLambdaIntegration
      // optionsWithAuthorizer
    )
    fitnessTrackUsersResource.addMethod(
      'DELETE',
      this.fitnessTrackUsersTable.deleteLambdaIntegration
      // optionsWithAuthorizer
    )
  }
}
