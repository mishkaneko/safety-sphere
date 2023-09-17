import * as userService from './user.service'

export function canDisplayLoginButton(){
  return !userService.hasLogin()
}
