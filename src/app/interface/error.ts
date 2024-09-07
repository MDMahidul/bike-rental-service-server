// create an array of object
export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export type TGenereicErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};

export type TNotFound = {
  statusCode: number;
  message: string;
  data: null;
};
