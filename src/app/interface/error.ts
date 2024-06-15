// create an array of object
export type TErrorMessages = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: TErrorMessages;
};

export type TNotFound = {
  statusCode: number;
  message: string;
  data: null;
};
