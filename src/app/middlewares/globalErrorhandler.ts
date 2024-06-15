import { ErrorRequestHandler } from 'express';
import { TErrorMessages } from '../interface/error';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppError';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // set  default values
  let statusCode = 500;
  let message = 'Something went wrong!';

  let errorMessages: TErrorMessages = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ];

  // check the error providers
  if (err instanceof ZodError) {
    const simplified = handleZodError(err);
    statusCode = simplified?.statusCode;
    message = simplified?.message;
    errorMessages = simplified?.errorMessages;
  } else if (err?.name === 'ValidationError') {
    const simplified = handleValidationError(err);
    statusCode = simplified?.statusCode;
    message = simplified?.message;
    errorMessages = simplified?.errorMessages;
  } else if (err?.name === 'CastError') {
    const simplified = handleCastError(err);
    statusCode = simplified?.statusCode;
    message = simplified?.message;
    errorMessages = simplified?.errorMessages;
  } else if (err?.code === 11000) {
    const simplified = handleDuplicateError(err);
    statusCode = simplified?.statusCode;
    message = simplified?.message;
    errorMessages = simplified?.errorMessages;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorMessages = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessages = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  // final return
  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
