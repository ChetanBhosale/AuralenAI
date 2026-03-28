import type { Request, Response, NextFunction } from 'express'

/**
 * Global Express error handler.
 * Catches any unhandled errors thrown in route handlers / middleware
 * and returns a consistent JSON response instead of crashing.
 */
export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('[Error]', err.stack || err.message)

    const statusCode = (err as any).statusCode || 500
    const message = statusCode === 500 ? 'Internal server error' : err.message

    res.status(statusCode).json({
        status_code: statusCode,
        message,
        data: null,
    })
}
