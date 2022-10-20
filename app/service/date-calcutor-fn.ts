import {DateCalculatorDBService} from './date-calculator-db'

export class DateCalculatorFnService {
    private readonly dbDCService= new DateCalculatorDBService()

    async execute(id:string){
       const dcTool =  await this.dbDCService.getByID(id)
       console.log(dcTool)
       return
    }

}