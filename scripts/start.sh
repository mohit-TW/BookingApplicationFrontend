#!/bin/bash
set -e
set -v

echo "Running this as `whoami`"
echo "Currently running this in $PWD"


IFS='-' read -ra identifiers <<< $DEPLOYMENT_GROUP_NAME  # DEPLOYMENT_GROUP_NAME is of form neev-xx-team-xx-[backend|frontend]-deployment-[integration|staging|production]
export BATCH_ID=${identifiers[1]}
export TEAM_ID=${identifiers[3]}
export ENVIRONMENT=${identifiers[6]}
export PREFIX="/neev-$BATCH_ID/team-$TEAM_ID/$ENVIRONMENT"

cd /home/ec2-user/deployment/frontend
mkdir -p $ENVIRONMENT
mv outputs.sh $ENVIRONMENT/
cd $ENVIRONMENT
echo "Existing contents of the directory are"
ls

. ./outputs.sh # exports UI_IMAGE

export UI_PORT=`aws ssm get-parameters --name "$PREFIX/UI_PORT" | jq ".Parameters[0].Value" | tr -d \"`
export PUBLIC_HOSTNAME=`curl http://169.254.169.254/latest/meta-data/public-hostname` # hitting instance metadata service
export PUBLIC_HOSTNAME_AND_PORT=$PUBLIC_HOSTNAME:$UI_PORT
export IS_EC2=true

env > /home/ec2-user/environment_variables_of_frontend_for_$ENVIRONMENT

docker container run -p $UI_PORT:80 --rm --name frontend_${ENVIRONMENT} -d $UI_IMAGE