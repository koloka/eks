export function getUser() {
    let userinfo = {}
    const userlocal = localStorage.getItem('user');
    if (typeof userlocal === 'string') {
      userinfo = JSON.parse(userlocal);
    }else{
      userinfo = {}
    }
    return userinfo
}
