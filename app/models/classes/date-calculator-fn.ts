import { IDateOptions, IDaysOptions, IFields, IModel} from "../db/date-calculator"
import { IParamsDTO } from "../dto/create-date-calculator"

export interface IDateCalculatorFn {
    addDays(params: IDays): void 
    subDays(params: IDays): void
    diffDates(paras: IDates): void
    execute(params: string): IModel
}

type IDays = Pick<IModel, 'acAccountName'|'apikey' | 'dateOperation'> & {acFields: IDaysOptions}
type IDates = Pick<IModel, 'acAccountName'|'apikey' | 'dateOperation'> & {acFields: IDateOptions}





