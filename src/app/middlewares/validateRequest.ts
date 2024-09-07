import { NextFunction, Request, Response } from 'express';
import { AnyObject } from 'mongoose';
import catchAsync from '../utils/catchAsync';

const validateRequest = (schema: AnyObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // zod parse data
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });
    next();
  });
};

export default validateRequest;
