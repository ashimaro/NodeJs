
import { Controller, Get, Request, Body } from '@nestjs/common';
import { CarService } from '../service/car.service';
import { GetCarListReqDto } from '../dto/get-car-list-req-dto';
import { Headers } from '@nestjs/common';

@Controller('api')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get('getcarlist')
  async getCarList(@Headers('Authorization') authorization: string, @Body() getCarListDto: GetCarListReqDto) {
    return this.carService.getCarList(authorization, getCarListDto);
  }
}
