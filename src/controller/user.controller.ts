
import { Controller, Post, Body, Get } from '@nestjs/common';
import { SignUpReqDto } from "../dto/sign-up-req-dto";
import { UserService } from '../service/user.service';
import { SignInReqDto } from '../dto/sign-in-req-dto';
import { LogoutReqDto } from '../dto/logout-req-dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Headers } from '@nestjs/common';
import { GetProfileReqDto} from '../dto/getProfile-req-dto';
import { UpdateMyProfileReqDto } from '../dto/updateMyProfile-req-dto';
@Controller('api')
export class UserController{
    constructor(private readonly service: UserService) {}

@Post('sign-up')
async signUp(@Body() user: SignUpReqDto) {
    const response = await this.service.signUp(user);
    return response;
}

@Post('session/signin')
async signIn(@Body() user: SignInReqDto) {
   const response= await this.service.signIn(user);
    return response;
}
@Post('session/logout')
@ApiBearerAuth('Authorization')
async logout(@Headers('Authorization') authorization: string, @Body() logoutDto: LogoutReqDto): Promise<void> {
    const response = await this.service.logout(authorization, logoutDto);
    return response;
}

@Get('getprofile')
@ApiBearerAuth('Authorization')
async getProfile(@Headers('Authorization') authorization: string, @Body() getProfileReqDtoDto: GetProfileReqDto){
    const response = await this.service.getProfile(authorization, getProfileReqDtoDto);
    return response;
}

@Post('updatemyprofile')
@ApiBearerAuth('Authorization')
async updateMyProfile(@Headers('Authorization') authorization: string, @Body() updateMyProfileReqDtoDto: UpdateMyProfileReqDto): Promise<void>{
await this.service.updateMyProfile(authorization, updateMyProfileReqDtoDto);
  
}
}
