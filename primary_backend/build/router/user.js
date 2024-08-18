"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const middleware_1 = require("../middleware");
const types_1 = require("../types");
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const router = (0, express_1.Router)();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const body = req.body;
    const parseddata = types_1.SignupSchema.safeParse(body);
    if (!parseddata.success) {
        return res.status(411).json({
            message: "invalid inputs"
        });
    }
    const userexists = yield db_1.prismaclient.user.findFirst({
        where: {
            email: (_a = parseddata.data) === null || _a === void 0 ? void 0 : _a.username
        }
    });
    if (userexists) {
        return res.status(403).json({
            message: "user alrdey exists"
        });
    }
    yield db_1.prismaclient.user.create({
        data: {
            email: parseddata.data.username,
            //todo: dont do passwords in plain text
            password: parseddata.data.password,
            name: parseddata.data.name
        }
    });
    return res.json({
        messsage: "please verify your account by checking email"
    });
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const parseddata = types_1.SigninSchema.safeParse(body);
    if (parseddata.success == false) {
        return res.status(411).json({
            message: "invalid inputs",
        });
    }
    const user = yield db_1.prismaclient.user.findFirst({
        where: {
            email: parseddata.data.username,
            password: parseddata.data.password
        }
    });
    if (!user) {
        return res.status(403).json({
            message: "user not exist"
        });
    }
    //sign the jwt
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
    }, config_1.JWT_SECRET);
    res.json({
        token: token
    });
}));
router.get("/", middleware_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const id = req.id;
    const user = yield db_1.prismaclient.user.findFirst({
        where: {
            id: id
        },
        select: {
            name: true,
            email: true
        }
    });
    return res.json({
        user,
    });
}));
exports.userRouter = router;
