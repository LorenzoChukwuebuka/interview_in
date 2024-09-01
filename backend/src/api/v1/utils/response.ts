import { Request, Response } from "express";

export const success = (res: any, status: number, entity: any, msg: string) => res
    .status(status || 200)
    .json({
        success: true,
        message: msg || "Successful",
        payload: entity || undefined
    });

export const fail = (res: any, status: number, msg: string) => res
    .status(status || 500)
    .json({
        success: false,
        message: msg || "Failed",
        payload: [],
    });

// export const response = (res, status, entity, msg) => res
// .status(status || 200)
// .json({
//     success: true,
//     message: entity.msg || msg || "Successful",
//     metadata: {
//         total: entity.total || 0,
//         limit: entity.limit || 0,
//         count: entity.count || 0,
//         skip: entity.skip || 0,
//         page: (Math.floor((entity.skip + entity.limit) / entity.limit)) || 1,
//         sort: entity.sort || "createdAt",
//     },
//     payload: entity.payload || [],
// });
