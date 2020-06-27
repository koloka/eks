import React from 'react'
import Slide from '../components/Slide'
import Services from '../components/Services'
const axios = require('axios');

export default class Axios extends React.Component{
  state: {
    text: string
  }
  constructor(props:any){
    super(props)
    this.state = {
      text: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    
  }
  handleSubmit(){

    axios({
      method: 'post',
      url: '/api/add',
      data: {
        firstName: 'Fred',
        lastName: 'Flintstone'
      }
    });
    console.log(this.state.text)
  }

  render(){
    
    return(
      <div className="page-body">
        <div className="container">
          <input onChange={(e)=>this.setState({text: e.target.value})} type="text" className="form-control" value={this.state.text}/>
          <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    )
  }
}