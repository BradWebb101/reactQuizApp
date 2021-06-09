'use strict'

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()
AWS.config.update({ region: process.argv[2] })
 
const handler = async (event, context) => {
  try {
    const params = {
    // how to link this up
      TableName:  process.env.DDB_TABLE_NAME 
    }
    const result = await docClient.scan(params).promise()

    return {
      'statusCode': 200,
      "isBase64Encoded": false,
      "headers": {
        "Access-Control-Allow-Origin": "*"
      },      
      'body': JSON.stringify({
          result
      })
    }
  } catch (err) {
      console.error(err)
      return err
  }
}

export default handler
