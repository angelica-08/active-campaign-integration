import { APIGatewayProxyResult } from "aws-lambda";
const headers =  {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Origin': '*',
}

export class Response{

    static success(data: Object): APIGatewayProxyResult{
      const response = {
        statusCode: 200,
        body: JSON.stringify(data),
        headers:headers
        }
        return response
    }

    static 500(err:unknown){
        const response = {
            statusCode: 500,
            body:JSON.stringify(err),
            headers:headers
        }
        return response
    }
}