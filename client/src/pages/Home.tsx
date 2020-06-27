import React from 'react'
import Slide from '../components/Slide'
import Services from '../components/Services'
const axios = require('axios');
export default class Home extends React.Component{
  
  componentDidMount() {
    
  }

  render(){
    return(
      <div className="page-body">
        <div className="container">
          <Slide />
          <Services />
        </div>
      </div>
    )
  }
}