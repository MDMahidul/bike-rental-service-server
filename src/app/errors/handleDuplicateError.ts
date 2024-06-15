import { TErrorMessages, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const errorMessages: TErrorMessages = [
    {
      path: '',
      message: `${extractedMessage} is already exist`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Duplicate Data found!',
    errorMessages,
  };
};

export default handleDuplicateError;
