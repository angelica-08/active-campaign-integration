import  {IParamsDTO  as DateCalculator} from './create-date-calculator' 

export type IParams = DateCalculator
export type Post = PostConfig<IParams>
export type Get = GetConfig<IParams>
export type Put = PutConfig<IParams>
export type List= ListConfig<IParams> 

type PostConfig<T extends IParams> = T['Post']
type GetConfig<T extends IParams> = T['Get']
type PutConfig<T extends IParams> = T['Put']
type ListConfig<T extends IParams> = T['List']

