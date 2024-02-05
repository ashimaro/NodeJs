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
exports.CarController = void 0;
const common_1 = require("@nestjs/common");
const car_service_1 = require("../service/car.service");
const get_car_list_req_dto_1 = require("../dto/get-car-list-req-dto");
const common_2 = require("@nestjs/common");
let CarController = class CarController {
    constructor(carService) {
        this.carService = carService;
    }
    async getCarList(authorization, getCarListDto) {
        return this.carService.getCarList(authorization, getCarListDto);
    }
};
exports.CarController = CarController;
__decorate([
    (0, common_1.Get)('getcarlist'),
    __param(0, (0, common_2.Headers)('Authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, get_car_list_req_dto_1.GetCarListReqDto]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "getCarList", null);
exports.CarController = CarController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [car_service_1.CarService])
], CarController);
