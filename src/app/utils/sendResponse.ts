import { Response } from 'express';

type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};
// response stracture types
type TResponse<T> = {
  success: boolean;
  statusCode: number;
  token?: string;
  message?: string;
  meta?: TMeta;
  data: T;
};

// common response func
const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    token: data.token,
    meta: data.meta,
    data: data.data,
  });
};

export default sendResponse;
