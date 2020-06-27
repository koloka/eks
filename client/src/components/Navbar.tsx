import React from 'react'
import '../css/navbar.css'
import axios from 'axios'
import {getAuthHead} from '../config/getAuthHead'
import auth from './auth/auth'
import {getUser} from './auth/getUser'
export default class Navbar extends React.Component{
  state:{
    keyWord: string,
    loggedIn: boolean,
    username: string
  }
  constructor(props:any){
    super(props)
    this.state = {
      keyWord: '',
      loggedIn: false,
      username: ''
    }
    this.logout = this.logout.bind(this)
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  }
  render(){
    const user:any = getUser()
    const userText = (user.position == 'admin')? <p>Admin: {user.username}</p>:null
    const addProduct = (user.position == 'admin')? 
    <li className="nav-item">
      <a className="nav-link" href="/product/add">បញ្ចូលផលិតផល</a>
    </li>:null
    const logout = (user.position == 'admin')? 
    <li className="nav-item">
      <a onClick={this.logout} className="nav-link" href="/">Log Out</a>
    </li>:null
    return(
      <div id="navbar-section">
        <nav className="navbar navbar-expand-lg navbar-light bg-light container">
          <a className="navbar-brand" href="/">EKS</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/">ទំព័រដើម<span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">អំពីយើង</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/product/showall/construction">គ្រឿងសំណង់</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/product/showall/mechanic">គ្រឿងជាង</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/product/showall/housetools">គ្រឿងចាប់ហួយ</a>
              </li>
                {addProduct}
                {logout}
              <li className="nav-item">
                {userText}
              </li>
            </ul>
            <input value={this.state.keyWord} onChange={(e)=> this.setState({keyWord: e.target.value})} className="form-control search-navbar" type="search" placeholder="ស្វែងរង" />
            <button className="btn btn-outline-success my-2 my-sm-0"><a href={"/search/"+this.state.keyWord}>Search</a></button>
          </div>
        </nav>
      </div>
    )
  }
}