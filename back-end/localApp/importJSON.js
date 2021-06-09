const AWS = require('aws-sdk')
const quiz = require('./quiz')
AWS.config.update({ region: process.argv[2] })
const docClient = new AWS.DynamoDB.DocumentClient()

var tableName = process.argv[3]

const post_to_db = async () => {

  // Post to DynamoDB
  try {
    console.log(params)
    const result = await docClient.put(params).promise()
    console.log('Success: ', result)
  } catch (err) {
    console.error('Error: ', err)
  }
}

for (var i = 0; i < quiz['quiz'].length; i++){
  let quizQuestion = quiz['quiz'][i]
  var params = {
    'TableName': tableName,
    'Item': quizQuestion  
  }
  post_to_db(params)

}



