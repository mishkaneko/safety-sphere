import { expect } from 'chai'
import * as settingPage from './settings.page'
import * as userService from './user.service'

it('should display login button to guest',()=>{
    let realHasLogin = userService.hasLogin
    userService.hasLogin = () => false
    expect(settingPage.canDisplayLoginButton()).to.be.true
    userService.hasLogin = realHasLogin
})

it('should not display login button to admin',()=>{
    let realHasLogin = userService.hasLogin
    userService.hasLogin = () => true
    expect(settingPage.canDisplayLoginButton()).to.be.false
    userService.hasLogin = realHasLogin
})
