type EnvironmentType = 'test' | 'production';
type TokenType = '' | 'Bearer' | 'Basic';

type ConfigurationValidator = {
  ENVIRONMENT: EnvironmentType;
  AUTHORIZATION_KEY: string;
  TYPE_TOKEN?: TokenType;
  API_TIMEOUT_REQUEST?: number;
};

export const configuration: ConfigurationValidator = {
  ENVIRONMENT: process.env.NODE_ENV as EnvironmentType,
  AUTHORIZATION_KEY: 'Authorization',
  TYPE_TOKEN: 'Bearer',
  API_TIMEOUT_REQUEST: 20000
};

export const apiServices = {
  REACT_APP_API: process.env.REACT_APP_API,

};

export const urlApiServices = {
  API_IAM: '/api/iam',
  API_PAYMENT: '/api/payments',
  API_MERCHANT: '/api/merchants',
  API_IDP: '/api/idp'
};
