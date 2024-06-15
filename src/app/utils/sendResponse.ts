import { Response } from 'express';

// response stracture types
type TResponse<T> = {
  success: boolean;
  statusCode: number;
  token?:string;
  message?: string;
  data: T;
};

// common response func
const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    token:data.token,
    data: data.data,
  });
};

export default sendResponse;
