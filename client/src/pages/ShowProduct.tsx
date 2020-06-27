import React from 'react'
import axios from 'axios'
import tagLabel from '../asset/svg/tag.svg'
import '../css/showProductDetail.css'
type Props = {
  match : any
}


export default class ShowProduct extends React.Component<Props>{
  state:{
    product: any,
    loading: boolean
  }
  constructor(props: any){
    super(props)
    this.state = {
      product: {
        name: '',
        price: '',
        description: '',
        img_url: [],
        tags: [],
        category_id: ''
      },
      loading: false
    }
  }

  // query take data by category
  componentDidMount(){
    let id = this.props.match.params.id

    this.setState({ loading: true }, () => {
      axios.get('/api/product/'+id)
        .then(result => this.setState({
          loading: false,
          product: result.data
        }));
    });

  }

  render(){
    const p = this.state.product
    const product = (this.state.loading)? 
    <h1>Loading .......</h1>
    :
    (
      <div id="show-product-detail">
        <div className="img-detail">
          <img src={p.img_url[0]} alt=""/>
        </div>
        <div className="des-detail">
          <h1>{p.name}</h1>
          <p>{p.description}</p>
          <p>រូបភាព</p>
          <div className="img-detail-show">
            {p.img_url.map((url:any, key:any)=><img src={url} key={key}/>)}
          </div>
          <div className="label-container-detail">
            <div className="label-tag-container">
              <img className="label-tag" src={tagLabel}/>
            </div>
            <div className="tag-list">
              {p.tags.map((tag:any, key:any)=><p key={key}>{tag}</p>)}
            </div>
          </div>

          <p className="price-detail">{p.price}</p>
        </div>
      </div>
    )
    
    return(
      <div className="page-body">
        <div className="container">
          {product}
        </div>
      </div>
    )
  }
}