## Installation

```bash
yarn
```

## Running the app

provided you have a local mongodb instance

```bash
# development
yarn start
# watch mode
yarn start:dev
# production mode
yarn start:prod
```

## Test

```bash
# unit tests
yarn test
# e2e tests
yarn test:e2e
# test coverage
yarn test:cov
```

## MongoDB configuration

Put the mongodb credentials into the '.env' file, in the root folder:

```text
APP_PORT=3000

#default local mongodb port
MONGODB_URL=mongodb://mongodb:27017/tennis

#Atlas (MondoDB as as Service)
MONGODB_URL=mongodb+srv://username:password@host/tennis?retryWrites=true&w=majority
```

Check your connection with *mongo shell*

```bash
show dbs
use tennis
show collections
db.players.find()
```

## Using the API

### Swagger
 - http://localhost:3000/api

### Endpoints
 - http://localhost:3000/ranks
 - http://localhost:3000/stats
 - http://localhost:3000/details?N.DJO


## Docker

if no Atlas account, give a spin with either a local mongo or a container mongo

```bash
docker-compose up -d --build
```

## AWS/Serverless Framework

### serverless

if not available yet, install serverless globally

```
npm install -g serverless
```

*ready for prod?*
make sure serverless has your AWS credentials by creating a profile
http://slss.io/aws-creds-setup

```
serverless config credentials \
  --provider aws \
  --key KKKKKKKKKKKKKKKKKKKK \
  --secret sssssssssssssssssssssssssssssssssssssssssss
```

spin your api as offline AWS serverless

```
yarn build
sls offline start
```

check
 - http://localhost:3000/ranks
 - http://localhost:3000/stats
 - http://localhost:3000/details?N.DJO

or
- <http://localhost:3000/dev/ranks>
- <http://localhost:3000/dev/stats>
- <http://localhost:3000/dev/details?N.DJO>
when serverless.yaml hasn't this section
custom:
  serverless-offline:
    noPrependStageInUrl: true

```
serverless deploy

serverless remove
```

## Improvment/TODO

- write Unit tests/Integration tests
- (BDD-style testing](https://github.com/znckco/nestjs-bdd/tree/8aa3cba060b95b3ca974aef67a21b25857364b8f)
- <https://www.serverless.com/plugins/serverless-offline#installation>
- ???swagger not available in serverless
- useDocker: true
  Warning: "nodejs14.x" runtime is not supported with docker. See <https://github.com/lambci/docker-lambda>
  × Unsupported runtime
- review aws perms for group devops
  - AmazonS3FullAccess
  - AWSCloudFormationFullAccess
  - AWSLambda_FullAccess

AWS CLI
<https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html>
Windows
msiexec.exe /i <https://awscli.amazonaws.com/AWSCLIV2.msi>
aws --version
aws cloudformation list-stacks
aws cloudformation list-stacks --region eu-west-3
aws cloudformation delete-stack --stack-name=tennis-lambda-dev --region eu-west-3
<https://eu-west-3.console.aws.amazon.com/cloudformation/home?region=eu-west-3#/stacks>

<https://s3.console.aws.amazon.com/s3/buckets?region=eu-west-3>
