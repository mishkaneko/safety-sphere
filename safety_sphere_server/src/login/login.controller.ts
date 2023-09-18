import { VerifyEmailExistDto, CreateVerificationCodeDto, RegisterDto } from './login.dto'
import { LoginService } from './login.service'
import { Body, Controller, Post } from '@nestjs/common';
import * as crypto from 'crypto'

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post('create-verification-code')
  getVerificationCode(@Body() createVerificationCodeDto: CreateVerificationCodeDto) {
    const verificationCode = this.loginService.sendVerificationCode(createVerificationCodeDto.email)
    console.log('Mail verificationCode')
    return { verificationCode }
  }

  // @Post('/')
  // async login(@Body() loginDto: LoginDto) {
  //   // return { doesLoginSucceed: true }
  //   const { exist } =  await this.loginService.findUser({ loginDto })
  //   return { doesLoginSucceed: exist }
  // }

  @Post('/verifyEmailExist')
  async verifyEmailExist(@Body() verifyEmailExistDto: VerifyEmailExistDto) {
    const { exist, result } =  await this.loginService.findUser({ verifyEmailExistDto })
    return exist ? { doesEmailExist: true, userUuid: result.user_uuid } : { doesEmailExist: false }
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    const userUuid = crypto.randomBytes(20).toString('hex')
    await this.loginService.createUser({ registerDto, userUuid })
    return { userUuid }
  }
}
