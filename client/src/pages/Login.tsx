import React from 'react'
import axios from 'axios'
import {getAuthHead} from '../config/getAuthHead'
import auth from '../components/auth/auth'
import {getUser} from '../components/auth/getUser'
import { Redirect } from 'react-router-dom'
type Props = {
  klass: string,
  type: any,
  history:any
}

export default class Login extends React.Component<Props>{
  state:{
    count: number,
    name: string,
    pw: string
  }
  constructor(props: Props) {
    super(props);
    this.state = {
      count: 0,
      name: '',
      pw: ''
    };
    this.nameChange = this.nameChange.bind(this)
    this.pwChange = this.pwChange.bind(this)
    this.logout = this.logout.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }
  nameChange(e:any){
    this.setState({name:e.target.value})
  }
  pwChange(e:any){
    this.setState({pw:e.target.value})
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  }
  handleLogin(){
    const names = this.state.name
    const pws = this.state.pw
    axios.post('/api/login',{name: names, pw: pws})
    .then(res =>{
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      window.location.reload();
    })
    .catch(err => console.log(err))
  }
  render(){
    const user:any = getUser()
    let reD = null
    if(user.position == 'admin'){
      reD = <Redirect to='/'/>
    }
    return(
      <div className="container">
        {reD}
        <input onChange={(e)=>this.nameChange(e)} value={this.state.name} type="text" className="form-control" placeholder="username"/>
        <input onChange={(e)=>this.pwChange(e)} value={this.state.pw} type="text" className="form-control" placeholder="password"/>
        <button onClick={this.handleLogin} className="btn btn-primary">Login</button>
      </div>
    )
  }
}