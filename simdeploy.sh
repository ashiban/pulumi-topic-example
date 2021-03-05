#!/bin/bash
pulumi login --local
export PULUMI_CONFIG_PASSPHRASE=""
export AWS_ACCESS_KEY_ID="test"
export AWS_DEFAULT_REGION="localstack"
export AWS_SECRET_ACCESS_KEY="test"
export CLOUDCC_MASTERKEY="testKey"

docker-compose down
rm -Rf /tmp/localstack
docker-compose up -d 
sleep 5

rm ~/.pulumi/stacks/dev.json 
pulumi stack init dev
pulumi up --yes --stack dev --skip-preview
