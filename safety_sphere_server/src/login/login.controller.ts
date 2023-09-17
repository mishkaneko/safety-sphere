import { LoginDto } from './login.dto'
import { LoginService } from './login.service'
import { Body, Controller, Post } from '@nestjs/common';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post('/create-verification-code')
  sendVerificationCode(@Body() loginDto: LoginDto) {
    this.loginService.sendVerificationCode(loginDto.email)
    return true
  }
}
