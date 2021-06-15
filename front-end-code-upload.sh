##############front-end-deploy

#Load environment variables
if [ -f .env ] 

then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

# Create the code-commit repository
echo Project name - $PROJECT_NAME
aws codecommit create-repository --repository-name $PROJECT_NAME

#Setup git commands (Ask Flynn what this does)
git config --global credential.helper '!aws codecommit credential-helper $@'
git config --global credential.UseHttpPath true

# Push to CodeCommit
cd front-end
echo AWS Region - $AWS_REGION
echo Project Name = $PROJECT_NAME
git push --set-upstream https://git-codecommit.$AWS_REGION.amazonaws.com/v1/repos/$PROJECT_NAME master

## Now create Amplify Console App
read -p "-------------------------------------------------------------------------------------------------------"
read -p "Create a Amplify Console App manually from AWS Management Console, then run backend-ceate-and-deploy.sh"