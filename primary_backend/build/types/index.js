"use strict";
//defigning all the zod typres
// inputs 
/*
user-->
signup-->
username, password
signin-->

username , possword


*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZapCreateSchema = exports.SigninSchema = exports.SignupSchema = void 0;
const zod_1 = require("zod");
exports.SignupSchema = zod_1.z.object({
    username: zod_1.z.string().min(5),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string()
});
exports.SigninSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string()
});
exports.ZapCreateSchema = zod_1.z.object({
    availabletriggerId: zod_1.z.string(),
    triggerMetadata: zod_1.z.any().optional(),
    actions: zod_1.z.array(zod_1.z.object({
        availableactionId: zod_1.z.string(),
        actionMetadata: zod_1.z.any().optional()
    }))
});
