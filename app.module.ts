// app.module.ts
import 'reflect-metadata'
import { Module } from '@nestjs/common';
import { UserController } from './src/controller/user.controller';
import { UserService } from './src/service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel } from './src/entity/user.model';
import { UserSchema } from './src/entity/user.schema';
import { CarController } from './src/controller/car.controller';
import { CarService } from './src/service/car.service';
import { CarDocument, CarSchema } from './src/entity/car.model';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/assessment'),
    MongooseModule.forFeature([
      {name: UserModel.name, schema: UserSchema },
      { name: CarDocument.name, schema: CarSchema },
    
    ])

  ],
  
  controllers: [UserController, CarController], 
  providers: [UserService, CarService], 
})
export class AppModule {}
