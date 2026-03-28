import type { Response } from "express";

export const serverResponse = (res: Response, status_code: number, message: string, data?: any) => {
  return res.status(status_code).json({ status_code, message, data: data ?? null });
};
