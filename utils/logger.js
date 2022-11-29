"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const bunyan_1 = __importDefault(require("bunyan"));
var logger = bunyan_1.default.createLogger({
    name: 'goodreads-api',
    stream: process.stdout,
    level: 'info'
});
module.exports = logger;
