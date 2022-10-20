import { DateCalculatorDBService } from "../service/date-calculator-db";
import {  IParamsDTO, ValidatePostRequestDTO, ValidatePutRequestDto } from '../models/dto/create-date-calculator';
import { Response } from "../models/vto/response";
import { AWSMappedRequest } from "../models/dto/aws-mapped-request";
import { BadRequest } from "../exceptions/request";
import {DateCalculatorFnService} from '../service/date-calcutor-fn'
const db = new DateCalculatorDBService()
const fn = new DateCalculatorFnService()

export class DateCalculatorController{
    private event: AWSMappedRequest

    constructor(event:AWSMappedRequest) {
        //For Cloudwatch Logs
        console.log(event)
        this.event = event
    }

    async get(){
        try {            
            const params = this.event.path as IParamsDTO['Get']
            if(!params.toolID){throw new BadRequest()}
            const result = await db.getByUser(params.userEmail, params.toolID)
            return Response.success(result)

        }catch(err){
            console.log(err)
        }
    }

    // async list(){
    //     const params = this.event.queryParams as IParamsDTO['List']
    //     console.log(params)
    //     if(!params.userEmail){throw new BadRequest()}
    //     const result = await db.list(params.userEmail)
    //     return Response.success(result)
    // }

    async create() {
        try{
            const params = this.event.body as IParamsDTO['Post']
            new ValidatePostRequestDTO(params)
            const result = await db.create(params)
            return Response.success(result)
        }catch(err){
            console.log(err)
            return Response[500](err)
        }
    }

    async update() {
        try{
            const params = this.event.body as IParamsDTO['Put']
            new ValidatePutRequestDto(params)
            const result = await db.update(params)
            return Response.success(result)
        }catch(err){
            console.log(err)
            return Response[500](err)
        }
    }

    async execute() {
        try{
            const params = this.event.path as IParamsDTO['Get']
            await fn.execute(params.toolID)
        }catch(err) {
            console.log(err)
            return Response[500](err)
        }
    }
    
}

