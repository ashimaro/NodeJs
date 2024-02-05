"use strict";
// car.service.ts
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
exports.CarService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt = require("jsonwebtoken");
const car_model_1 = require("../entity/car.model");
const user_model_1 = require("../entity/user.model");
let CarService = class CarService {
    constructor(carModel, userModel) {
        this.carModel = carModel;
        this.userModel = userModel;
    }
    async getCarList(authorization, carListDto) {
        try {
            // Extract the token from the Authorization header
            const token = this.extractTokenFromAuthorizationHeader(authorization);
            // Verify and decode the token
            const decodedToken = jwt.verify(token, 'your-secret-key');
            // Find the user by ID
            const user = await this.userModel.findById(decodedToken.sub);
            // Your logic to fetch cars from the database
            const { carname, pageindex, pagesize } = carListDto;
            let cars = await this.carModel
                .find({ carname: new RegExp(carname, 'i') }) // Case-insensitive search for carname
                .skip((pageindex - 1) * pagesize)
                .limit(pagesize);
            // Check if the car list is empty and add sample data
            if (cars.length === 0) {
                // Insert sample data into MongoDB
                await this.insertSampleData();
                // Fetch cars again after inserting sample data
                cars = await this.carModel
                    .find({ carname: new RegExp(carname, 'i') })
                    .skip((pageindex - 1) * pagesize)
                    .limit(pagesize);
            }
            // Your logic to format the response
            const formattedCars = cars.map((car) => ({
                id: car.id,
                carname: car.carname,
                brand: car.brand,
                description: car.description,
                variance: car.variance.map((variance) => ({
                    id: variance.id,
                    name: variance.name,
                    price: variance.price,
                })),
            }));
            const totalCount = await this.carModel.countDocuments({ carname: new RegExp(carname, 'i') });
            return { list: formattedCars, totalcount: totalCount };
        }
        catch (error) {
            console.error('Error fetching car list:', error);
            throw new common_1.UnauthorizedException('Invalid token or error fetching car list');
        }
    }
    verifyToken(token) {
        try {
            // Verify and decode the token
            return jwt.verify(token, 'your-secret-key');
        }
        catch (error) {
            console.error('Error verifying token:', error);
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
    async insertSampleData() {
        try {
            // Sample data
            const sampleData = [
                {
                    carname: '3 MPS',
                    brand: 'Mazda',
                    description: 'Blab la bla',
                    variance: [
                        { id: 1, name: 'Full Spec', price: '175000' },
                        { id: 2, name: 'Manual Spec', price: '105000' },
                    ],
                },
                {
                    carname: 'RS 250 Cup',
                    brand: 'Renault',
                    description: 'Blab la bla',
                    variance: [
                        { id: 2, name: 'Full Spec', price: '1375000' },
                        { id: 3, name: 'Manual Spec', price: '1105000' },
                    ],
                },
            ];
            // Insert sample data into MongoDB
            await this.carModel.insertMany(sampleData);
            console.log('Sample data inserted successfully.');
        }
        catch (error) {
            console.error('Error inserting sample data:', error);
            throw new common_1.UnauthorizedException('Error inserting sample data');
        }
    }
    extractTokenFromAuthorizationHeader(authorization) {
        const [, token] = authorization.split(' ');
        return token || null;
    }
};
exports.CarService = CarService;
exports.CarService = CarService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(car_model_1.CarDocument.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_model_1.UserModel.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CarService);
