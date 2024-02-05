"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const sign_up_req_dto_1 = require("../dto/sign-up-req-dto");
const user_service_1 = require("../service/user.service");
const sign_in_req_dto_1 = require("../dto/sign-in-req-dto");
const logout_req_dto_1 = require("../dto/logout-req-dto");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@nestjs/common");
const getProfile_req_dto_1 = require("../dto/getProfile-req-dto");
const updateMyProfile_req_dto_1 = require("../dto/updateMyProfile-req-dto");
let UserController = class UserController {
    constructor(service) {
        this.service = service;
    }
    async signUp(user) {
        const response = await this.service.signUp(user);
        return response;
    }
    async signIn(user) {
        const response = await this.service.signIn(user);
        return response;
    }
    async logout(authorization, logoutDto) {
        const response = await this.service.logout(authorization, logoutDto);
        return response;
    }
    async getProfile(authorization, getProfileReqDtoDto) {
        const response = await this.service.getProfile(authorization, getProfileReqDtoDto);
        return response;
    }
    async updateMyProfile(authorization, updateMyProfileReqDtoDto) {
        await this.service.updateMyProfile(authorization, updateMyProfileReqDtoDto);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('sign-up'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_req_dto_1.SignUpReqDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('session/signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_req_dto_1.SignInReqDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('session/logout'),
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    __param(0, (0, common_2.Headers)('Authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, logout_req_dto_1.LogoutReqDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('getprofile'),
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    __param(0, (0, common_2.Headers)('Authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, getProfile_req_dto_1.GetProfileReqDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('updatemyprofile'),
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    __param(0, (0, common_2.Headers)('Authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateMyProfile_req_dto_1.UpdateMyProfileReqDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateMyProfile", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
