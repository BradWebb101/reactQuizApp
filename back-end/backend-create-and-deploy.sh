##############Module 1b-app-deploy

#Load environment variables
if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

#Deploy the backend infrastructure
echo $PROJECT_NAME
aws s3 mb s3://$PROJECT_NAME

#Deploying backend with SAM
sam build 
sam package --output-template-file packaged.yaml --s3-bucket $PROJECT_NAME
STACK_NAME=$PROJECT_NAME-backend
echo $STACK_NAME
sam deploy --template-file packaged.yaml --stack-name $STACK_NAME --capabilities CAPABILITY_IAM
DDB_TABLE=$(aws cloudformation describe-stack-resource --stack-name $PROJECT_NAME-backend --logical-resource-id DynamoDBTable --query "StackResourceDetail.PhysicalResourceId" --output text)
#Fix this one, need to read documentation on how to get api gateway endpoint
API_ENDPOINT=$(aws cloudformation describe-stack-resource --stack-name $PROJECT_NAME-backend --logical-resource-id DynamoDBTable --query "StackResourceDetail.PhysicalResourceId" --output text)


#Add data to Dynamo DB table for quiz 
cd ~/environment/$STACK_NAME/same-app/localApp
npm install 
node ./importJSON.js $AWS_REGION $DDB_TABLE
aws dynamodb scan --table-name $DDB_TABLE


