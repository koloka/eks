import React from 'react'
import axios from 'axios'
import '../css/showProductByCat.css'
import {getAuthHead} from '../config/getAuthHead'
import auth from '../components/auth/auth'
import {getUser} from '../components/auth/getUser'
type Props = {
  match : any
}


export default class ShowByCat extends React.Component<Props>{
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
    this.deletePro = this.deletePro.bind(this)
  }

  // query take data by category
  componentDidMount(){
    let self = this
    let cat = this.props.match.params.cat

    this.setState({ loading: true }, () => {
      axios.get('/api/category/'+cat)
        .then(result => this.setState({
          loading: false,
          products: result.data
        }));
    });
  }

  deletePro(e:any){
    console.log(e.target.id)
    axios.delete('/api/delete/product/'+e.target.id, getAuthHead)
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err) )
    window.location.reload()
  }

  render(){
    const category  = this.props.match.params.cat;
    const user:any = getUser()
    let loadingSign = <h1>Loading....</h1>
    if(this.state.loading){
      loadingSign = <h1>Loading....</h1>
    }else{
      loadingSign = <h1></h1>
    }
    const products = this.state.products.map((p:any, key) =>{
      const pUrl = "/product/showdetail/"+p._id
      const adminDelete = (user.position == 'admin')? <p id={p._id} onClick={(e)=>this.deletePro(e)} className="admin-delete">Delete</p>: null
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
              {adminDelete}
              <h1>{p.name}</h1>
              <p>{p.description}</p>
              <p className="pprice">{p.price}</p>
            </div>
          </div>
        </div>
      )
    });
    return(
      <div className="page-body">
        <div className="container">
          <h1>{category}</h1>
          {loadingSign}
          <div className="row">
            {products}
          </div>
        </div>
      </div>
    )
  }
}