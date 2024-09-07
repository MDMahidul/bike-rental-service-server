import mongoose from 'mongoose';
import { TErrorSources, TGenereicErrorResponse } from '../interface/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenereicErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID!',
    errorSources,
  };
};
export default handleCastError;
