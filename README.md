# Tennis
![vinz](./docs/vinz.png)
Vincent Fontaine, _Jan. 2023_

## Introduction

A _serverless_ demo,
![sls](./docs/serverless3.png)
To summarize, it has _No SQL_, _No Server_, **nevertheless** it is an _API_, in the _cloud_, _No More_.

## The tech stack

 - [X] writen in **Typescript**
![ts](./docs/ts.png)
 - no serious project shall be written in plain javascript...
 - it's more confortable in the IDE, it catches many errors
 - it's more powerful for modeling and more expressive

 - [X] with **NestJS** for the **API**
![NestJS](./docs/nestjs.png)
  _I loved NodeJS but it was a bit hacky, Nest makes it neat and quick_
  - SOLID
  - DDD friendly
  - Cross-cut concern decorators
  - Dependency Injection
  - Easy to Test, Scale and Maintain

 - [X] hosted on **AWS**
![AWS](./docs/aws.png)

- [X] instant **Swagger**
![swagger](./docs/swaggergateway.png)
![swagger](./docs/swagger.png)

 - [X] API calls are served by **lambda** functions
![lambda](./docs/awslambda.png)
  - **Serverless** computing executes apps on the cloud, allocating resources on-demand. Pay what you use. AWS is my lambda provider here.
  - the **Serverless Framework** is a third-party service dedicated to securing deployment and monitoring.

 - [X] the data comes from **NoSQL** as a service
![lambda](./docs/mongoatlas.png)
  - it's mongo, it's managed, it's secure, it replicates and is highly available, it can recover, and grow as you need

## Cloud services diagram

![cloud](./docs/cloud.png)

You can get this cloud architecture diagram with the **serverless-graph** plugin for Serverless Framework

```bash
sls graph -o ./docs/cloud.out
cat ./docs/cloud.out | dot -Tpng > ./docs/cloud.png
```

## API components dependency diagram

![dependencies](./docs/dependencies.png)

You can draw the dependency diagram with the package **dependency-cruiser**

```bash
yarn --silent depcruise src --include-only \"^src\" \
     --config --output-type dot \
 | dot -Tpng > ./docs/dependencies.png
```

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

Put the mongodb credentials into the **.env** file, in the root folder:

```text
APP_PORT=3000

#default local mongodb port
MONGODB_URL=mongodb://mongodb:27017/tennis

#Atlas (MondoDB as as Service)
MONGODB_URL=mongodb+srv://username:password@host/tennis?retryWrites=true&w=majority
```

Check your connection with **mongo shell**

```bash
show dbs
use tennis
show collections
db.players.find()
```

## Using the API

### Swagger
 - http://localhost:3000/api
 - I changed it to root /
 - _**open issue**: swagger endpoint not available in the cloud_ 

### Endpoints
 - http://localhost:3000/ranks
 - http://localhost:3000/stats
 - http://localhost:3000/details?N.DJO
 - http://localhost:3000/admin

## Docker

If no Atlas account yet, give a spin with either a local mongo or a container mongo

```bash
docker-compose up -d --build
```

## AWS + Serverless Framework

### serverless

if not available yet, install serverless globally

```
npm install -g serverless
```

**ready for prod?**
Make sure serverless has your AWS credentials by creating a profile
http://slss.io/aws-creds-setup

```
serverless config credentials \
  --provider aws \
  --key KKKKKKKKKKKKKKKKKKKK \
  --secret sssssssssssssssssssssssssssssssssssssssssss
```

First: spin your api as _offline_ AWS serverless

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

_when_ serverless.yaml hasn't this section
```yaml
custom:
  serverless-offline:
    noPrependStageInUrl: true
```
### Cloud deployment troubleshooting

#### publish

**case**
```
serverless deploy --org=yourorg
```
fails!!!

**solution**
troubleshoot
```
serverless deploy --org=yourorg --verbose --debug=*
```

increase S3 upload timeout to 5min = 300000ms
```
AWS_CLIENT_TIMEOUT=300000 serverless deploy --org=yourorg --aws-s3-accelerate
```

#### call

**case**
API gateway fails

**solution**
According to the logs, the lambda times out because the cold start is longer than allowed.
Increase lambda timeout to 30s

**case**
API gateway still fails

**solution**
The API is blocked on mongo atlas waiting...
Ensure you have appropriately whitelisted AWS in Atlas.

### Decommission the service
```
serverless remove
```

### deploy

In case the service is deployed successfully, you will see something like this:

> ✔ Service deployed to stack tennis-lambda-dev (350s)
>  
> dashboard: <https://app.serverless.com/viiinzzz/apps/tennis-lambda/tennis-lambda/dev/eu-west-3>
endpoints:
  GET - <https://xxxxxxxx.execute-api.eu-west-3.amazonaws.com/dev>
  GET - <https://xxxxxxxx.execute-api.eu-west-3.amazonaws.com/dev/ranks>
  GET - <https://xxxxxxxx.execute-api.eu-west-3.amazonaws.com/dev/details/{any+>}
  GET - <https://xxxxxxxx.execute-api.eu-west-3.amazonaws.com/dev/stats>
  ANY - <https://xxxxxxxx.execute-api.eu-west-3.amazonaws.com/dev/admin>

### Manual cleanup

Sometimes (it happened to me), the serverless framework fails decommissioning.

- AWS CLI
  > <https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html>
  Windows
  msiexec.exe /i <https://awscli.amazonaws.com/AWSCLIV2.msi>

```bash
aws --version

aws cloudformation list-stacks

aws cloudformation list-stacks --region eu-west-3

aws cloudformation delete-stack --stack-name=tennis-lambda-dev --region eu-west-3

check again: https://eu-west-3.console.aws.amazon.com/cloudformation/home?region=eu-west-3#/stacks
```

### Permissions

- review aws perms for group devops
  - AmazonS3FullAccess
  - AWSCloudFormationFullAccess
  - AWSLambda_FullAccess
  - ... what else?

**not enough.**
  
**solution:** make and use a 'simple_server_policy' policy

```json
  {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "cloudformation:*",
                "s3:*",
                "logs:*",
                "iam:*",
                "apigateway:*",
                "lambda:*",
                "ec2:DescribeSecurityGroups",
                "ec2:DescribeSubnets",
                "ec2:DescribeVpcs",
                "events:*"
            ],
            "Resource": [
                "*"
            ]
        }
    ]
}
```

There are more fine grained policy templates available also.

## Improvments/TODO

- use serverless secrets to pass mongodb connection string
- have an API key or an API gateway JWT
- find a way to whitelist narrowly AWS into Atlas
- write Unit tests
- write Integration tests (preconfigured framework is supertest - I also love PactumJS)
- try to implement [BDD-style testing](https://github.com/znckco/nestjs-bdd/tree/8aa3cba060b95b3ca974aef67a21b25857364b8f)
- ???swagger not available in serverless mode
- failed to use serverless: `useDocker: true`
  > *Warning:* "nodejs14.x" runtime is not supported with docker. See <https://github.com/lambci/docker-lambda>
  × Unsupported runtime
 ## Links
 - https://s3.console.aws.amazon.com/s3/buckets?region=eu-west-3>
 - https://sst.dev/chapters/customize-the-serverless-iam-policy.html>
 - https://www.npmjs.com/package/serverless-jetpack>
 - https://forum.serverless.com/t/silent-timeout-errors-during-deploy/13288>
 - https://medium.com/ovrsea/using-lambda-container-with-the-serverless-framework-374a86cb4429>
