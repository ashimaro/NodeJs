import { IsString, IsNumber, IsDateString } from 'class-validator';

export class GetCarListReqDto {

  carname: string;

  @IsNumber()
  pageindex: number;

  @IsNumber()
  pagesize: number;

  timestamp: string;
}
