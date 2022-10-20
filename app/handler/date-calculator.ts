import { Handler } from "aws-lambda";
import { dcController } from "../../common/controllers";
import { AWSMappedRequest } from "../models/dto/aws-mapped-request";

export const get: Handler = (event:AWSMappedRequest) => dcController(event).get()
//export const list: Handler = (event: AWSMappedRequest) => dcController(event).list()
export const create: Handler =  (event: AWSMappedRequest) => dcController(event).create()
export const update: Handler =  (event: AWSMappedRequest) => dcController(event).update()