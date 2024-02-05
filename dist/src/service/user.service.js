"use strict";
// user.service.ts
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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_model_1 = require("../entity/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async signUp(userDto) {
        try {
            const { username, password, displayusername, timestamp } = userDto;
            //Check if the username is already taken
            const existingUser = await this.userModel.findOne({ username });
            if (existingUser) {
                throw new common_1.UnauthorizedException('Username is already taken');
            }
            // Hash the password before saving it
            const hashedPassword = await bcrypt.hash(password, 10);
            // Create a new user
            const newUser = new this.userModel({
                username,
                password: hashedPassword,
                displayusername,
                timestamp,
            });
            // Save the user to the database
            await newUser.save();
            // Generate JWT token
            const token = jwt.sign({
                sub: newUser.id,
                username: newUser.username,
                displayusername: newUser.displayusername,
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + (60 * 60), // Token expiration time (1 hour)
            }, 'your-secret-key');
            // Log success and return the token, displayusername, and userid
            console.log('User successfully saved:', {
                token,
                username,
                displayusername,
                timestamp: newUser.timestamp,
                _id: newUser._id,
                __v: newUser.__v,
            });
            return { token, displayusername, userid: newUser._id };
        }
        catch (error) {
            // Log the error and re-throw it
            console.error('Error saving user:', error);
            throw error;
        }
    }
    async signIn(signInDto) {
        const { username, password } = signInDto;
        const user = await this.userModel.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        // Generate JWT token
        const token = jwt.sign({
            sub: user.id,
            username: user.username,
            displayusername: user.displayusername,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 3600, // Token expiration time (1 hour)
        }, 'your-secret-key');
        // Log success and return the token, displayusername, and userid
        console.log('User successfully signed in:', {
            token,
            displayusername: user.displayusername,
            userid: user.id,
        });
        return { token, displayusername: user.displayusername, userid: user.id };
    }
    catch(error) {
        // Log the error and re-throw it
        console.error('Error signing in user:', error);
        throw error;
    }
    async logout(authorization, logoutDto) {
        try {
            // Extract the token from the Authorization header
            const token = this.extractTokenFromAuthorizationHeader(authorization);
            // Verify and decode the token
            const decodedToken = jwt.verify(token, 'your-secret-key');
            // Find the user by ID and perform any necessary logout logic
            const user = await this.userModel.findById(decodedToken.sub);
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            console.log('User successfully logged out:', user.username);
        }
        catch (error) {
            console.error('Error during logout:', error);
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
    async getProfile(authorization, logoutDto) {
        try {
            // Extract the token from the Authorization header
            const token = this.extractTokenFromAuthorizationHeader(authorization);
            // Verify and decode the token
            const decodedToken = jwt.verify(token, 'your-secret-key');
            // Find the user by ID and perform any necessary logout logic
            const user = await this.userModel.findById(decodedToken.sub);
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            console.log('get user profile successfully', user.username);
            return {
                username: user.username,
                displayusername: user.displayusername,
                userid: user.id,
            };
        }
        catch (error) {
            console.error('Error during logout:', error);
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
    async updateMyProfile(authorization, updateProfileDto) {
        try {
            // Extract the token from the Authorization header
            const token = this.extractTokenFromAuthorizationHeader(authorization);
            // Verify and decode the token
            const decodedToken = jwt.verify(token, 'your-secret-key');
            // Find the user by ID
            const user = await this.userModel.findById(decodedToken.sub);
            // Update user profile
            user.displayusername = updateProfileDto.displayusername;
            await user.save();
            console.log('User profile successfully updated:', user.username);
        }
        catch (error) {
            console.error('Error updating user profile:', error);
            throw new common_1.UnauthorizedException('Invalid token or session expired');
        }
    }
    extractTokenFromAuthorizationHeader(authorization) {
        const [, token] = authorization.split(' ');
        return token || null;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_model_1.UserModel.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
