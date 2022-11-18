import { API_STATUS } from 'config/api-status';
import { toastConfig } from 'config/notify';
import { toast } from 'react-toastify';
import { CliCookieService, CLI_COOKIE_KEYS } from 'shared/services/cli-cookie';
import { handleLogout } from 'shared/utils/functionHelper';

type ErrorApiResponse = {
  response: {
    config: { url: string };
    data: {
      code: number;
      message: string;
    };
  };
} & Error;

const URL_REFRESH_TOKEN = '/api/iam/v1/auth/refresh-token';

export async function handleResponseError(error: ErrorApiResponse) {
  const { data, config } = error.response;

  if (
    (data && data.code === API_STATUS.NOTFOUND) ||
    data.code === API_STATUS.FORBIDDEN ||
    data.code === API_STATUS.SERVER
  ) {
    toast.error(data.message, toastConfig);
  }
  return Promise.reject(error);
}
