import { existsSync, writeFileSync } from "fs"
import { join } from "path"
import { which, echo, exec, exit } from "shelljs"
import envfile from "envfile"

info(`Beginning server setup...`)
// if an .env file doesn't already exist, create one from the template
const env = join(__dirname, `.env`)
if (existsSync(env)) {
  info(`Environment settings already exist! Skipping...`)
} else {
  info(`Creating .env file from template...`)
  let defaults = envfile.parseFileSync(`.env.default`)
  writeFileSync(`.env`, envfile.stringifySync(defaults))
  info(`Successfully created .env file!`)
}
info(`Server setup finished! Run 'yarn start' to start the server!`)

const run = command => {
  echo(command)
  return exec(command, { silent: true })
}

const dieOnErr = (message, err) => {
  if (err) {
    echo(message, err)
    exit(1)
  }
}

const runOrDie = (status, command, onErr) => {
  echo(status)
  const result = command()
  dieOnErr(onErr, result.stderr)
  return result.stdout
}

if (!which(`aws`)) {
  echo(`AWS CLI needs to be installed before this script can be run!`)
  exit(1)
}

if (!which(`sls`)) {
  echo(`Severless CLI needs to be installed before this script can be run!`)
  exit(1)
}

echo(`Creating an IAM user...`)
let user
const userExists = run(`aws iam get-user --user-name serverless-admin`)

if (userExists.stderr) {
  user = JSON.parse(runOrDie(
    `Existing user serverless-admin not found, creating...`,
    () => run(`aws iam create-user --user-name serverless-admin`),
    `Failed to create user!`
  ))
} else {
  echo(`Existing user serverless-admin was found`)
  user = JSON.parse(userExists.stdout)
}
const { User: { UserName, Path, CreateDate, UserId, Arn } } = user

const { AccessKey: { AccessKeyId, SecretAccessKey } } = runOrDie(
  `Giving user serverless-admin programmatic access...`,
  () => run(`aws iam create-access-key \
    --user-name serverless-admin
  `),
  `Failed to give user serverless-admin programmatic access!`
)

echo(`Configuring Severless AWS Credentials...`)
run(`sls config credentials \
  --provider aws \
  --key ${AccessKeyId} \
  --secret ${SecretAccessKey}
`)

echo(`Attaching AWSLambdaRole Policy to user serverless-admin...`)
run(`aws iam attach-user-policy \
  --user-name serverless-admin \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaRole
`)

const engineConfig = {
  apiKey: ENGINE_API_KEY,
  origins: [{ lambda: { functionArn: LAMBDA_ARN, awsAccessKeyId: AWS_IAM_ID, awsSecretAccessKey: AWS_IAM_KEY } }],
  frontends: [{ host: `0.0.0.0`, port: 80, endpoints: [`/graphql`, `/staging/graphql`, `/production/graphql`] }]
}

`aws ecs create-cluster --cluster-name Apollo-Engine`

`aws rds create-db-instance \
  --db-instance-identifier ${DB_NAME} \
  --db-instance-class db.t2.micro \
  --engine mysql \
  --port ${DB_PORT} \
  --db-name ${DB_NAME} \
  --master-username ${DB_USERNAME} \
  --master-user-password ${DB_PASSWORD}`
