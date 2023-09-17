import { Injectable } from '@nestjs/common';
import crypto from 'crypto'

@Injectable()
export class SessionService {
  _secretKey: string = ''
  get secretKey () {
    return this._secretKey
  }
  set secretKey (value) {
    this._secretKey = value
  }

  createSecretKey () {
    this.secretKey = crypto.randomBytes(20).toString('hex')
    console.log('this.secretKey')
    console.log(this.secretKey)
    return this.secretKey
  }
}
