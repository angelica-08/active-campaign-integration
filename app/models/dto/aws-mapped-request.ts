import * as IParams from './index'

export interface AWSMappedRequest {
    body : IParams.Post | IParams.Put
    path: IParams.Get,
    queryParams: IParams.List
    headers: {
        Authorization: string
        'X-Amz-Invocation-Type': 'RequestResponse' | 'Event'
    }

}



