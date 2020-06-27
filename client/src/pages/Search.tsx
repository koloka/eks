import React from 'react'
import axios from 'axios'
import '../css/showProductDetail.css'
type Props = {
  match : any
}
export default class Search extends React.Component<Props>{
  state:{
    products: Array<any>,
    loading: boolean
  }
  constructor(props:any){
    super(props)
    this.state = {
      products: [],
      loading: false
    }
  }
  componentDidMount(){
    //request data
    let keyWord = this.props.match.params.keyword
    this.setState({ loading: true }, () => {
      axios.get('/api/search/'+keyWord)
        .then(result => this.setState({
          loading: false,
          products: result.data
        }));
    });
  }
  render(){
    let loadingSign = <h1>Loading....</h1>
    if(this.state.loading){
      loadingSign = <h1>Loading....</h1>
    }else{
      loadingSign = <h1></h1>
    }
    const products = this.state.products.map((p, key) =>{
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
      <div className="page-body">
        <div className="container">
          <h1>ស្វែងរកពាក្យ: {this.props.match.params.keyword}</h1>
          {loadingSign}
          <div className="row">
            {products}
          </div>
        </div>
      </div>
    )
  }
}