import { DocumentClient } from "aws-sdk/clients/dynamodb";
import createDynamoDBClient, { updateSuccessResponse } from "../../common/db";
import { encryptData } from "../../common/encyptor";
import IDateCalculator from "../models/classes/date-calculator";
import { IModel, IReturnFields, IReturnlist } from "../models/db/date-calculator";
import { DBParamsDef } from "../models/db/db-params";
import { IParamsDTO } from "../models/dto/create-date-calculator";


export class DateCalculatorDBService extends DBParamsDef implements IDateCalculator{

    private readonly tableName = process.env.DYNAMODB_TABLE || ''
    private readonly docClient: DocumentClient = createDynamoDBClient()
    private readonly returnFields: IReturnlist = 'toolID, createdAt, updatedAt, dateOperation, acFields'

    constructor(){
        super()
        this.tableDB = this.tableName
    }

    async getByUser(tooldID:string, userEmail:string) {
        const params = this._list(tooldID, 'toolID', userEmail, 'userEmail', this.returnFields)
        const result = await this.docClient.query(params).promise();
        return result.Items as unknown as IReturnFields | IReturnFields[] | IReturnFields
      }

      async getByID(toolID: string) {
        const params = this._getByID(toolID, 'toolID')
        const result = await this.docClient.get(params).promise()
        return result.Item as IModel
      }

      async create(dcItem: IParamsDTO['Post']) {        
        const apiKey = dcItem.apikey as string
        dcItem.apikey= await encryptData(dcItem.userEmail, apiKey)
        console.log(dcItem)
        const params = this._create(dcItem, 'toolID')
        await this.docClient.put(params).promise()
        return params.Item
      }

      async update(dcItem: IParamsDTO['Put']){
        const params = this._update(dcItem, 'toolID')
        await this.docClient.update(params).promise()
        return updateSuccessResponse
      }
}