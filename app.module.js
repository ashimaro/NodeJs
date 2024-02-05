"use strict";
// app.module.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var user_repository_1 = require("./repository/user.repository");
var user_service_1 = require("./service/user.service");
var user_controller_1 = require("./controller/user.controller");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                // Import other modules or libraries your app depends on
                typeorm_1.TypeOrmModule.forRoot({
                // TypeORM configuration for database connection
                // ...
                }),
                typeorm_1.TypeOrmModule.forFeature([user_repository_1.UserRepository]), // Import repositories
            ],
            controllers: [user_controller_1.UserController], // Declare controllers
            providers: [user_service_1.UserService], // Declare services
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
