import { DateCalculatorController } from "../app/controller/date-calculator"
import { AWSMappedRequest } from "../app/models/dto/aws-mapped-request"

export const dcController = (event:AWSMappedRequest) => new DateCalculatorController(event)
