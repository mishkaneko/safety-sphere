import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { RegisterDto, LoginDto, VerifyEmailExistDto } from './login.dto'
import { knex } from '../knex';

@Injectable()
export class LoginService {
  sendVerificationCode (userEmail: string) {
    let verificationCode = ''
    const getRandomInt = (max: number) => Math.floor(Math.random() * max);
    for (let i = 0; i < 6; i++) {
      verificationCode += getRandomInt(10)
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'safetyspheretecky@gmail.com',
        pass: 'eiojdfmencnufsqn'
      }
    });

    const mailOptions = {
      from: 'safetyspheretecky@gmail.com',
      to: userEmail,
      subject: 'Verification code to login SafetySphere',
      html: `
        <strong>Verification code: </strong>
        <p>${verificationCode}</p>
      ` 
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
      } else {
      }
    });

    return verificationCode
  }

  async createUser (props: { registerDto: RegisterDto, userUuid: string }) {
    const { registerDto, userUuid } = props
    await knex('user').insert({ user_uuid: userUuid, email: registerDto.email })
  }

  async findUser (props: { loginDto?: LoginDto, verifyEmailExistDto?: VerifyEmailExistDto }) {
    const { loginDto, verifyEmailExistDto } = props
    const result = await knex('user')
      .select('user_uuid', 'email')
      .where('user_uuid', loginDto ? loginDto.userUuid : null)
      .orWhere('email', verifyEmailExistDto ? verifyEmailExistDto.email : null)
    return { exist: result.length > 0, result: result[0] }
  }
}
