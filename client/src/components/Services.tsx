import React from 'react'
import striped_bar from '../asset/accessory/striped_bar.jpg'
import c1 from '../asset/svg/clock.svg'
import c3 from '../asset/accessory/quality.png'
import c2 from '../asset/accessory/trust.png'
import '../css/services.css'
import {getUser} from './auth/getUser'
import axios from 'axios'

export default class Slide extends React.Component{
  state:{
    products: Array<any>,
    loading: boolean
  }
  constructor(props: any){
    super(props)
    this.state = {
      products: [],
      loading: false
    }
  }
  componentDidMount() {
    const servicesBar = (document.getElementById('services-bar-bg') as HTMLDivElement)
    servicesBar.style.backgroundImage = "url('"+striped_bar+"')";
  
    let self = this
    let cat = "mechanic"

    this.setState({ loading: true }, () => {
      axios.get('/api/category/'+cat)
        .then(result => this.setState({
          loading: false,
          products: result.data
        }));
    });
  }

  
  

  render(){
    const user:any = getUser()
    const products = this.state.products.map((p:any, key) =>{
      const pUrl = "/product/showdetail/"+p._id
      let imgStyle = {
        backgroundImage: "url(" + p.img_url[0] + ")",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }
      return (
        
        <div className="col col-sm-12 col-md-12 col-lg-6 product-block" key={p._id}>
          <div className="product-wrapper">
            <a href={pUrl} className="nostyle">
              <div className="pimg" style={imgStyle}>
                {/* <img src={p.img_url[0]} alt=""/> */}
              </div>
            </a>
            <div className="pdes">
              <h1>{p.name}</h1>
              <p>{p.description}</p>
              <p className="pprice">{p.price}</p>
            </div>
          </div>
        </div>
      )
    });

    return(
      <div className="services" id="services">
        <div id="services-bar-bg">
          <div className="row">
            <div className="col-4">
              <h1>សេវាកម្មរហ័ស</h1>
            </div>
            <div className="col-4">
              <h1>ទំនុកចិត្ត</h1>
            </div>
            <div className="col-4">
              <h1>គុណភាព</h1>
            </div>
          </div>
        </div>
        <hr/>
        <div id="services-detail">
          <div className="row">
            <div className="col-12 col-sm-4">
              <img src={c1} alt=""/>
              <p>ជាមួយនឹងសេវាកម្មរហ័សទាន់ចិត្ត</p>
            </div>
            <div className="col-12 col-sm-4">
              <img src={c2} alt=""/>
              <p>ពួកយើងជាហាងលក់ទំនិញដែលលោកអ្នកអាចទុកចិត្តបាន</p>
            </div>
            <div className="col-12 col-sm-4">
            <img src={c3} alt=""/>
              <p>ផលិតផលគុណភាពល្អ</p>
            </div>
          </div>
        </div>
        <hr/>
        <br/>
        <div className="row">
          {products}
        </div>
      </div>
    )
  }
}