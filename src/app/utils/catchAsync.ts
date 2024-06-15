import { NextFunction, Request, RequestHandler, Response } from 'express';

// created a common catch function to handle try catch
const catchAsync = (func: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch((err) => next(err));
  };
};

export default catchAsync;
