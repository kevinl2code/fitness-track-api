import { CfnOutput } from 'aws-cdk-lib'
import { CognitoUserPoolsAuthorizer, RestApi } from 'aws-cdk-lib/aws-apigateway'
import {
  AccountRecovery,
  NumberAttribute,
  UserPool,
  UserPoolClient,
} from 'aws-cdk-lib/aws-cognito'
import { Construct } from 'constructs'

export class AuthorizerWrapper {
  private scope: Construct
  private api: RestApi

  private userPool: UserPool
  private userPoolClient: UserPoolClient
  public authorizer: CognitoUserPoolsAuthorizer

  constructor(scope: Construct, api: RestApi) {
    this.scope = scope
    this.api = api
    this.initialize()
  }

  private initialize() {
    this.createUserPool()
    this.addUserPoolClient()
    this.createAuthorizer()
  }

  private createUserPool() {
    this.userPool = new UserPool(this.scope, 'FitnessTrackUserPool', {
      userPoolName: 'FitnessTrackUserPool',
      selfSignUpEnabled: true,
      signInAliases: {
        username: true,
        email: true,
      },
      accountRecovery: AccountRecovery.EMAIL_ONLY,
      standardAttributes: {
        givenName: {
          required: true,
          mutable: true,
        },
        familyName: {
          required: true,
          mutable: true,
        },
        birthdate: {
          required: true,
          mutable: false,
        },
        gender: {
          required: true,
          mutable: false,
        },
        email: {
          required: true,
          mutable: true,
        },
      },
      customAttributes: {
        height: new NumberAttribute({ min: 36, max: 96, mutable: true }),
      },
    })
    new CfnOutput(this.scope, 'UserPoolId', {
      value: this.userPool.userPoolId,
    })
  }

  private addUserPoolClient() {
    this.userPoolClient = this.userPool.addClient(
      'FitnessTrackUserPool-client',
      {
        userPoolClientName: 'FitnessTrackUserPool-client',
        authFlows: {
          adminUserPassword: true,
          custom: true,
          userPassword: true,
          userSrp: true,
        },
        generateSecret: false,
      }
    )
    new CfnOutput(this.scope, 'UserPoolClientId', {
      value: this.userPoolClient.userPoolClientId,
    })
  }

  private createAuthorizer() {
    this.authorizer = new CognitoUserPoolsAuthorizer(
      this.scope,
      'FitnessTrackUserAuthorizer',
      {
        cognitoUserPools: [this.userPool],
        authorizerName: 'FitnessTrackUserAuthorizer',
        identitySource: 'method.request.header.Authorization',
      }
    )
    this.authorizer._attachToApi(this.api)
  }
}
