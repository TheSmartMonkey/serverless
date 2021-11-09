import 'source-map-support/register';
import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { DynamoDB } from 'aws-sdk';


const dynamoDb = new DynamoDB.DocumentClient()

const list: ValidatedEventAPIGatewayProxyEvent<void> = async () => {

  const params = {
    TableName: process.env.REPORTS_TABLE,
  };

  const data = await dynamoDb.scan(params).promise();

  return formatJSONResponse({
    data: data.Items,
  });
}

export const main = middyfy(list);
