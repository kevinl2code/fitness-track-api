import { Fn, Stack, StackProps } from 'aws-cdk-lib'
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
import { WebAppDeployment } from './WebAppDeployment'

export class FitnessTrackApiStack extends Stack {
  private api = new RestApi(this, 'FitnessTrackApi')
  private authorizer: AuthorizerWrapper
  private suffix: string

  private fitnessTrackUsersTable = new GenericTable(this, {
    tableName: 'FitnessTrackUsersTable',
    primaryKey: 'PK',
    sortKey: 'SK',
    createLambdaPath: 'Create',
    readLambdaPath: 'Read',
    updateLambdaPath: 'Update',
    deleteLambdaPath: 'Delete',
    secondaryIndexes: [
      {
        pk: 'GSI1PK',
        sk: 'GSI1SK',
      },
      {
        pk: 'GSI2PK',
        sk: 'GSI2SK',
      },
    ],
  })

  private fitnessTrackFoodsTable = new GenericTable(this, {
    tableName: 'FitnessTrackFoodsTable',
    primaryKey: 'PK',
    sortKey: 'SK',
    createLambdaPath: 'Create',
    readLambdaPath: 'Read',
    updateLambdaPath: 'Update',
    deleteLambdaPath: 'Delete',
    secondaryIndexes: [
      {
        pk: 'GSI1PK',
        sk: 'GSI1SK',
      },
      {
        pk: 'GSI2PK',
        sk: 'GSI2SK',
      },
    ],
  })

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    this.authorizer = new AuthorizerWrapper(this, this.api)
    this.initializeSuffix()

    new WebAppDeployment(this, this.suffix)

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

    //Users API integrations
    const fitnessTrackUsersResource = this.api.root.addResource(
      'user',
      optionsWithCors
    )
    fitnessTrackUsersResource.addMethod(
      'POST',
      this.fitnessTrackUsersTable.createLambdaIntegration,
      optionsWithAuthorizer
    )
    fitnessTrackUsersResource.addMethod(
      'GET',
      this.fitnessTrackUsersTable.readLambdaIntegration,
      optionsWithAuthorizer
    )
    fitnessTrackUsersResource.addMethod(
      'PUT',
      this.fitnessTrackUsersTable.updateLambdaIntegration,
      optionsWithAuthorizer
    )
    fitnessTrackUsersResource.addMethod(
      'DELETE',
      this.fitnessTrackUsersTable.deleteLambdaIntegration,
      optionsWithAuthorizer
    )

    // const fitnessTrackUsersCyclesResource = this.api.root.addResource(
    //   'user/cycles',
    //   optionsWithCors
    // )

    //Foods API integrations
    const fitnessTrackFoodsResource = this.api.root.addResource(
      'foods',
      optionsWithCors
    )
    fitnessTrackFoodsResource.addMethod(
      'POST',
      this.fitnessTrackFoodsTable.createLambdaIntegration,
      optionsWithAuthorizer
    )
    fitnessTrackFoodsResource.addMethod(
      'GET',
      this.fitnessTrackFoodsTable.readLambdaIntegration,
      optionsWithAuthorizer
    )
    fitnessTrackFoodsResource.addMethod(
      'PUT',
      this.fitnessTrackFoodsTable.updateLambdaIntegration,
      optionsWithAuthorizer
    )
    fitnessTrackFoodsResource.addMethod(
      'DELETE',
      this.fitnessTrackFoodsTable.deleteLambdaIntegration,
      optionsWithAuthorizer
    )
  }

  private initializeSuffix() {
    const shortStackId = Fn.select(2, Fn.split('/', this.stackId))
    const Suffix = Fn.select(4, Fn.split('-', shortStackId))
    this.suffix = Suffix
  }
}
