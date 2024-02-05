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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarSchema = exports.CarDocument = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CarDocument = class CarDocument extends mongoose_2.Document {
};
exports.CarDocument = CarDocument;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], CarDocument.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CarDocument.prototype, "carname", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CarDocument.prototype, "brand", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CarDocument.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ id: Number, name: String, price: String }] }),
    __metadata("design:type", Array)
], CarDocument.prototype, "variance", void 0);
exports.CarDocument = CarDocument = __decorate([
    (0, mongoose_1.Schema)()
], CarDocument);
exports.CarSchema = mongoose_1.SchemaFactory.createForClass(CarDocument);
