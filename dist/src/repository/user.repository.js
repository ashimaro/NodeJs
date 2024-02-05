// // user.repository.ts
// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { SignUpReqDto } from '../dto/sign-up-req-dto';
// import { User } from '../entity/user.model';
// @Injectable()
// export class UserRepository {
//   constructor(@InjectModel('user') private readonly userModel: Model<User>) {}
//   async save(user: SignUpReqDto): Promise<User> {
//     const createdUser = new this.userModel(user);
//     return createdUser.save();
//   }
// }
