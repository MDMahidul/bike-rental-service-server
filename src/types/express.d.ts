import { TUser } from '../path/to/user.interface'; // Adjust the path to your user interface

declare module 'express-serve-static-core' {
  interface Request {
    user?: TUser; // Add optional user property
  }
}
