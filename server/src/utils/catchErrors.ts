import { RequestHandler } from 'express';

export const catchErrors = (requestHandler: RequestHandler): RequestHandler => {
  return async (req, res, next) => {
    try {
      return await requestHandler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};