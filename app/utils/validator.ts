import { BadRequest } from "../exceptions/request";
import {Post} from '../models/dto'

export function validate<T extends Post>(requestParams: T, requiredParams: T): T {
    const finalParams: T = requiredParams
    const keys = Object.keys(requiredParams);
    console.log(requestParams)
    console.log(requiredParams)
    return checkParameters(requestParams, requiredParams, finalParams); //Recursive function
}

export function checkParameters<T>(event: T, validObject: T, finalParams:T) {
  for (const key in validObject) {
    console.log(event[key])
    console.log(key)
    // Throws Error for Undefined Parameters
    if (!event[key]) {
      throw new BadRequest()
    }

    if (typeof validObject[key] == "object") {
      checkParameters(event[key], validObject[key], finalParams[key]);
    }
    finalParams[key] = event[key]
  }
    return finalParams
}


export function messageUtil(event: any, context: any) {
  console.log("Event", event);
  console.log("Event", context.functionName);
}