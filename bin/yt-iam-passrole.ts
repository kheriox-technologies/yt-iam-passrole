#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { YtIamPassroleStack } from '../lib/yt-iam-passrole-stack';

const app = new cdk.App();
new YtIamPassroleStack(app, 'YtIamPassroleStack', {
  env: {
    region: 'ap-southeast-2',
    account: 'your-account-number-here',
  },
});
