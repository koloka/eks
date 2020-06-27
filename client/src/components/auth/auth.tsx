class Auth{
  // authenticated:boolean
  // constructor(){
  //   this.authenticated = true
  // }
  getUser(){
    let userinfo = {}
    const userlocal = localStorage.getItem('user');
    if (typeof userlocal === 'string') {
      userinfo = JSON.parse(userlocal);
    }else{
      userinfo = {}
    }
    return userinfo
  }
}


export default new Auth()