"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
// app.module.ts
require("reflect-metadata");
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./src/controller/user.controller");
const user_service_1 = require("./src/service/user.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_model_1 = require("./src/entity/user.model");
const user_schema_1 = require("./src/entity/user.schema");
const car_controller_1 = require("./src/controller/car.controller");
const car_service_1 = require("./src/service/car.service");
const car_model_1 = require("./src/entity/car.model");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb://localhost:27017/assessment'),
            mongoose_1.MongooseModule.forFeature([
                { name: user_model_1.UserModel.name, schema: user_schema_1.UserSchema },
                { name: car_model_1.CarDocument.name, schema: car_model_1.CarSchema },
            ])
        ],
        controllers: [user_controller_1.UserController, car_controller_1.CarController],
        providers: [user_service_1.UserService, car_service_1.CarService],
    })
], AppModule);
