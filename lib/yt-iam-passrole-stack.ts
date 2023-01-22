import * as cdk from 'aws-cdk-lib';
import { SecretValue } from 'aws-cdk-lib';
import { Effect, ManagedPolicy, Policy, PolicyStatement, User } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class YtIamPassroleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // EC2Admin User
    const ec2Admin = new User(this, 'ec2Admin', {
      userName: 'ec2admin',
      password: SecretValue.ssmSecure('/ytiampassrole/ec2AdminPassword'),
      passwordResetRequired: false,
    });

    // Add EC2 Full access managed policy
    ec2Admin.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AmazonEC2FullAccess'));

    // Attach inline policy
    ec2Admin.attachInlinePolicy(
      new Policy(this, 'ec2AdminPolicy', {
        statements: [
          new PolicyStatement({
            effect: Effect.ALLOW,
            actions: ['iam:ListInstanceProfiles'],
            resources: ['*'],
          }),
          new PolicyStatement({
            effect: Effect.ALLOW,
            actions: ['iam:PassRole'],
            resources: ['arn:aws:iam::612659717478:role/ec2-role'],
            conditions: {
              StringEquals: {
                'iam:PassedToService': ['ec2.amazonaws.com'],
              },
            },
          }),
        ],
      })
    );
  }
}
