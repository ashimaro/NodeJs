// car.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { GetCarListReqDto } from '../dto/get-car-list-req-dto'; 
import { Car,  CarDocument } from '../entity/car.model';
import { User, UserModel } from '../entity/user.model';
@Injectable()
export class CarService {
  constructor(@InjectModel(CarDocument.name) private readonly carModel: Model<Car>,
  @InjectModel(UserModel.name) private readonly userModel: Model<User>) {}
  async getCarList(authorization: string, carListDto: GetCarListReqDto) {
    try {
     // Extract the token from the Authorization header
    const token = this.extractTokenFromAuthorizationHeader(authorization);

    // Verify and decode the token
    const decodedToken = jwt.verify(token, 'your-secret-key') as { sub: string };

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
    } catch (error) {
      console.error('Error fetching car list:', error);
      throw new UnauthorizedException('Invalid token or error fetching car list');
    }
  }

  private verifyToken(token: string): { sub: string } {
    try {
      // Verify and decode the token
      return jwt.verify(token, 'your-secret-key') as { sub: string };
    } catch (error) {
      console.error('Error verifying token:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }

  private async insertSampleData() {
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
    } catch (error) {
      console.error('Error inserting sample data:', error);
      throw new UnauthorizedException('Error inserting sample data');
    }
  }

  private extractTokenFromAuthorizationHeader(authorization: string): string | null {
    const [, token] = authorization.split(' ');

    return token || null;
  }
}