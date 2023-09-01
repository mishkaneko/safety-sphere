let token = ''

export function hasLogin() {
    return !!token
}

export function login(){
    token = 'xx'
}

export function logout(){
    token = ''
}