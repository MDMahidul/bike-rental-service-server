/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenereicErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenereicErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is alreadt exist!`,
    },
  ];
  const statusCode = 400;

  return {
    statusCode,
    message: 'Duplicate data found!',
    errorSources,
  };
};

export default handleDuplicateError;
