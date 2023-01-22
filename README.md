# IAM PassRole Explained

This is a companion repo for the Youtube video (https://youtu.be/hzJB1W0PAAA) where I talk about IAM PassRole

## Commands Used in this video

### CDK Deploy

```
cdk deploy --all --require-approval never --progress events
```

### Decode Authorization Failure Message

```
aws sts decode-authorization-message --encoded-message <encoded-message>
```
