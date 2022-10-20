//This is where I define the classes used for the service. 

import { IModel, IReturnFields } from "../db/date-calculator"
import { IParamsDTO } from "../dto/create-date-calculator"

interface IDateCalculator {
    getByID(id:string): Promise<IModel> 
   // listByUser(userEmail:string): Promise<IReturnFields | IReturnFields[] | undefined>
    getByUser(toolID:string, userEmail:string): Promise<IReturnFields | IReturnFields[] | undefined>
    update(params: IParamsDTO['Put']): Promise<{message:string}>
    create(params: IParamsDTO['Post']): Promise<IModel>
}

export default IDateCalculator

