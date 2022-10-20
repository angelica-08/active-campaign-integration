import { randomUUID } from 'crypto';
import { generateDBItem, generateExpressionAttributes } from "../../utils/generate"
import { IkeyPK, IkeySK, IModel, IReturnlist } from '.'
import { Post, Put } from '../dto';

/**
 * This class defines and create accepted params for DB Operation
 */

export class DBParamsDef {

    private _tableName: string = ''

    set tableDB(tableName: string){
        this._tableName = tableName
    }


    _getByID(id:string, idName: string){
      return {
            TableName: this._tableName,
            Key: {
             id: id
            }
        }
        }
        

    _list(pk: string, keyPK: IkeyPK, sk:string, keySK: IkeySK, returnFields: IReturnlist){
        const expressionAttributeValues = {
            ':pk':pk,
            ':sk':sk
        }
        const keyConditionExpresson = keyPK + ' = :pk '  + keySK + ' = :sk'
        return {
            TableName: this._tableName,
            ExpressionAttributeValues : expressionAttributeValues,
            KeyConditionExpression: keyConditionExpresson,
            ProjectionExpression: returnFields
        }
    }

    _create<T extends IModel>(param: Post, idName: string){      
        const timestamp = new Date().getTime();
        const item = {
            ...generateDBItem(param),
            [idName]:randomUUID(),
            createdAt: timestamp
        } 
        return {
            TableName: this._tableName,
            Item: item as T
        }
    }

    _update<T extends IModel>(param: Partial<T>, idName: keyof Put){       
        const id = param[idName]
        const result = generateExpressionAttributes<T>(param, idName)       
        return {
            TableName: this._tableName,
            Key: {
                toolID: id
            },
            ExpressionAttributeValues: {
                ...result.expression
              },
            UpdateExpression: result.updateExpression,
            ReturnValues: 'ALL_NEW'
        }
    }
}