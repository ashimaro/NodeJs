// user.service.ts

import { Injectable,UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpReqDto } from '../dto/sign-up-req-dto';
import { User, UserModel } from '../entity/user.model';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { SignInReqDto } from '../dto/sign-in-req-dto';
import { LogoutReqDto } from '../dto/logout-req-dto';

import { UpdateMyProfileReqDto } from '../dto/updateMyProfile-req-dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel.name) private readonly userModel: Model<User>) {}
  async signUp(userDto: SignUpReqDto): Promise<{ token: string, displayusername: string, userid: string }> {
    try {
      const { username, password, displayusername, timestamp } = userDto;

      //Check if the username is already taken
      const existingUser = await this.userModel.findOne({ username });
      if (existingUser) {
        throw new UnauthorizedException('Username is already taken');
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
    } catch (error) {
      // Log the error and re-throw it
      console.error('Error saving user:', error);
      throw error;
    }
  }

  async signIn(signInDto: SignInReqDto): Promise<{ token: string, displayusername: string, userid: string }> {
    const { username, password } = signInDto;
    const user = await this.userModel.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
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
} catch (error) {
// Log the error and re-throw it
console.error('Error signing in user:', error);
throw error;
}

async logout(authorization: string,logoutDto: LogoutReqDto): Promise<void> {
  try {
    
  // Extract the token from the Authorization header
  const token = this.extractTokenFromAuthorizationHeader(authorization);

    // Verify and decode the token
    const decodedToken = jwt.verify(token, 'your-secret-key') as { sub: string };

    // Find the user by ID and perform any necessary logout logic
    const user = await this.userModel.findById(decodedToken.sub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    console.log('User successfully logged out:', user.username);
  } catch (error) {
    console.error('Error during logout:', error);
    throw new UnauthorizedException('Invalid token');
  }
}
async getProfile(authorization: string,logoutDto: LogoutReqDto) {
  try {
    
  // Extract the token from the Authorization header
  const token = this.extractTokenFromAuthorizationHeader(authorization);

    // Verify and decode the token
    const decodedToken = jwt.verify(token, 'your-secret-key') as { sub: string };

    // Find the user by ID and perform any necessary logout logic
    const user = await this.userModel.findById(decodedToken.sub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    console.log('get user profile successfully', user.username);

    return {
      username: user.username,
      displayusername: user.displayusername,
      userid: user.id,
    };
   
  } catch (error) {
    console.error('Error during logout:', error);
    throw new UnauthorizedException('Invalid token');
  }
}

async updateMyProfile(authorization: string, updateProfileDto: UpdateMyProfileReqDto): Promise<void> {
  try {
    // Extract the token from the Authorization header
    const token = this.extractTokenFromAuthorizationHeader(authorization);

    // Verify and decode the token
    const decodedToken = jwt.verify(token, 'your-secret-key') as { sub: string };

    // Find the user by ID
    const user = await this.userModel.findById(decodedToken.sub);

    // Update user profile
    user.displayusername = updateProfileDto.displayusername;
    await user.save();

    console.log('User profile successfully updated:', user.username);
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw new UnauthorizedException('Invalid token or session expired');
  }
}


private extractTokenFromAuthorizationHeader(authorization: string): string | null {
  const [, token] = authorization.split(' ');

  return token || null;
}
}