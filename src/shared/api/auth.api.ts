import { apiServices, urlApiServices } from 'config/configuration';
import { createApiInstance } from 'shared/api';
import { LoginRequest } from '../../features/auth/types';

const ApiBaseService = createApiInstance(apiServices.REACT_APP_API as string);


export const requestLogin = (payload: LoginRequest): Promise<any> => {
  return ApiBaseService.post(`/jwt-auth/v1/token`, payload);
};


