import { type } from "os"
import { BadRequest } from "../../exceptions/request"
import { validate } from "../../utils/validator"
import { IModel } from "../db/date-calculator"

export type IParamsDTO =  {
    name: 'DateCalculatorDTO'
    Post:Pick<IModel, 'acFields' | 'dateOperation' | 'userEmail' | 'acAccountName' | 'apikey'>
    Put: Pick<IModel, 'acFields' | 'dateOperation' | 'toolID'| 'apikey' | 'userEmail' | 'acAccountName'>
    Get: Pick<IModel,'toolID' | 'userEmail'>
    List: Pick<IModel,'userEmail'>
}

type IOption = 'Days' | 'Dates'

export class ValidateParamsDTO {
    private _requestEvent: IParamsDTO['Post']
    constructor(requestEvent:IParamsDTO['Post'], option: IOption){
        this._requestEvent = requestEvent
        this.validate(option)
    }

    readonly createParamsDate : IParamsDTO['Post']= {
        //this is just a test value and validation is key only
        dateOperation: 'addDays',
        apikey: '',
        userEmail: '',
        acAccountName: '',
        acFields: {
            option: 'Days',
            date1: '',
            days: '',
            date3: ''
        }
    }

    readonly createParamsDays: IParamsDTO['Post']= {
        dateOperation: 'diffDates',
        apikey: '',
        userEmail: '',
        acAccountName: '',
        acFields: {
            option: 'Date',
            date1: '',
            date2: '',
            date3: ''
        }
    }

    getParams: Readonly<{id:string}> =  {id: ''}

    validate(option: IOption) {
        if(option === 'Days') {
            validate(this._requestEvent, this.createParamsDays)
        }
        else if(option === 'Dates') {
            validate(this._requestEvent, this.createParamsDate)
        }
        else{
            throw new BadRequest()
        }
    }
}

export class ValidatePostRequestDTO extends ValidateParamsDTO{

    constructor(requestEvent:IParamsDTO['Post']){

        let option:IOption
        if(requestEvent.dateOperation.includes('Days')) {
            option = 'Days'
        }else if(requestEvent.dateOperation.includes('Dates')){
            option = 'Dates'
        } else{
            throw new BadRequest()
        }
        super(requestEvent, option)
    }
}

/**
 * TO DO: Improve Put Validator
 */
export class ValidatePutRequestDto{
    constructor(requestEvent:IParamsDTO['Put']){
        if(!requestEvent.toolID || !requestEvent.userEmail) {
            throw new BadRequest()
        }
        return 
    }
}