import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';

@Injectable()
export class LoginService {
  sendVerificationCode (userEmail: string) {
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
        <strong>Verification code: </<strong>>
        <p>bef60d83-de01-4bef-8b9f-03e21bd595f0</p>
      ` 
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}
