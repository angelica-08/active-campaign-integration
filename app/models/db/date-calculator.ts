import { IDateCalculatorFn } from "../classes/date-calculator-fn"

/**
 * This defines the shape of DateCalculator DB
 */

export interface IModel{
    toolID: string
    createdAt: number
    updatedAt: number
    userEmail: string
    apikey: Buffer | string
    acAccountName: string
    dateOperation: keyof IDateCalculatorFn
    acFields: IFieldOptions
    }


export type IFieldOptions = IDaysOptions | IDateOptions

export type IFields<T> = Extract<IFieldOptions, {option: T}>;

export interface IDaysOptions{
    option: 'Days'
    date1: string,
    days: number | string,
    date3: string
}

export interface IDateOptions {
    option: 'Date'
    date1: string,
    date2: string,
    date3: string
}

export type IReturnFields = Pick<IModel,'toolID'|'createdAt'| 'updatedAt'| 'dateOperation'|'acFields' >
export type IReturnlist = 'toolID, createdAt, updatedAt, dateOperation, acFields'
export type IkeySK = 'userEmail'
export type IkeyPK = 'toolID'