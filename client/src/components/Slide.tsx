import React from 'react'
import '../css/slide.css'
import axios from 'axios'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


export default class Slide extends React.Component{
  state:{
    slides: Array<any>,
  }
  constructor(props: any) {
    super(props)
    this.state = {
      slides: [
        {_id: "5e5a03fd210f733e2cde78b0", url: "https://coastal-law.com/wp-content/uploads/2019/03/my-mechanic-ripped-me-off.jpg"},
        {_id: "5e5a03fd210f733e2cde78b1", url: "https://www.bigapplewarehouseservices.com/wp-content/uploads/2018/10/Warehouse.jpg"},
        {_id: "5e5a03fd210f733e2cde78b2", url: "https://certification-experts.com/wp-content/uploads/2018/08/19842384_ml.jpg"},

      ]
    };
  }
  
  

  render(){
    // const objs = [{id:0, url:"aaaa"},{id:1, url:"hhjhj"},{id:2, url:"okjasd"},]
    console.log(this.state.slides)
    const objs = this.state.slides
    let kk = []
    kk = objs.map((o,key)=>{
      return <img src={o.url} />
    })
    
    return(
      <OwlCarousel
        className="owl-theme"
        loop
        margin={10}
        nav
      >
        {kk}
      </OwlCarousel>
    )
  }
}