import { apiServices, urlApiServices } from 'config/configuration';
import { createApiInstance } from 'shared/api';
import { ResponseApi } from 'shared/api/types';

const ApiBaseService = createApiInstance(apiServices.REACT_APP_API as string);
const USER_URL = `${urlApiServices.API_IAM}/v1/user`;

export const requestGetUsers = (payload: object): Promise<ResponseApi<any>> => {
  return ApiBaseService.get(USER_URL, { params: payload });
};
