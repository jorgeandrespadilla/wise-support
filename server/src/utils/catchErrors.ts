import { RequestHandler } from 'express';

export function catchErrors(requestHandler: RequestHandler): RequestHandler {
  return async (req, res, next): Promise<any> => {
    try {
      return requestHandler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};