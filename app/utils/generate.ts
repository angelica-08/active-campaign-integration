import { IModel } from "../models/db";
import { Put } from "../models/dto";

export function generateExpressionAttributes<T extends IModel>(params:Partial<T>, keyPK: keyof T)
{
    let expression : {[key: string]:any} = {}
    let updateExpression = 'SET '
    const timestamp = new Date().getTime();
    params['updatedAt'] = timestamp
    delete params[keyPK];

    for(const key in params) {
        const attributeKey = ':'+key
        expression[attributeKey] = params[key]
        updateExpression = updateExpression + key +  ' = ' + attributeKey + ','
    }

    updateExpression = updateExpression.slice(0, -1); 
    return {
        expression: expression as T,
        updateExpression: updateExpression
    }
}

export function generateDBItem<T>(params:T){
    let item : {[key: string]:any} = {}
    for(const key in params){
        item[key] = params[key]
    }
    return item as T
}
 