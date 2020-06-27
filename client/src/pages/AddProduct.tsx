import React, { useState, useEffect } from 'react';
import axios from 'axios'
import '../css/addProduct.css'
import {getAuthHead} from '../config/getAuthHead'
import {getUser} from '../components/auth/getUser'
export default class AddProduct extends React.Component{
  state:{
    tags: Array<any>,
    selectedTags: Array<any>,
    name: string,
    price: string,
    des: string,
    category: string,
    img_url: Array<any>,
    cur_url: string,
    categories: Array<any>,
    added: boolean,
    newTag: boolean,
    newTagInput: string,
    loading: boolean
  }
  constructor(props: any){
    super(props)
    this.state = {
      loading:false,
      added: false,
      tags: [],
      selectedTags: [],
      name: '',
      price: '',
      category: '',
      des: '',
      img_url: [],
      cur_url: '',
      categories: [],
      newTag: false,
      newTagInput: ''
    }
    this.handleAddUrl = this.handleAddUrl.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleCategory = this.handleCategory.bind(this)
    this.handleCheckTag = this.handleCheckTag.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleShowAddNewTag = this.handleShowAddNewTag.bind(this)
    this.handleAddTag = this.handleAddTag.bind(this)
  }
  componentDidMount(){
    
    this.setState({ loading: true }, () => {
      axios.get('/api/getcategories', getAuthHead)
        .then(result => {
          this.setState({
            loading: false,
            categories: result.data
          })}
        )
        .catch(err => console.log(err))
    })

    this.setState({ loading: true }, () => {
      axios.get('/api/gettags', getAuthHead)
        .then(result => {
          this.setState({
            loading: false,
            tags: result.data
          });  console.log("ok")}
        );
    });
  }

  handleAddUrl(){
    if(this.state.cur_url == ''){
      return
    }
    this.setState({img_url: this.state.img_url.concat([this.state.cur_url])})
    this.setState({cur_url: ''})
  }
  handleRemove(e:any){
    // console.log(e.target.id)
    const updatedUrl = this.state.img_url
    updatedUrl.splice(e.target.id, 1)
    this.setState({img_url: updatedUrl})
  }
  handleCategory(e:any){
    this.setState({category: e.target.value})
  }
  handleCheckTag(e:any){
    console.log(e.target.checked)
    console.log(this.state.selectedTags)
    if(e.target.checked){
      //insert to selectedTag
      let selectedTagsPrev = this.state.selectedTags
      this.setState({selectedTags: selectedTagsPrev.concat([e.target.value])})
    }else{
      let selectedTagsPrev = this.state.selectedTags
      let removeIndex = selectedTagsPrev.indexOf(e.target.value)
      selectedTagsPrev.splice(removeIndex,1)
      this.setState({selectedTags: selectedTagsPrev})
    }
  }
  handleShowAddNewTag(){
    this.setState({newTag: true})
    console.log("ok")
  }
  handleAddTag(){
    // axios to update tags list in mongo
    axios.post('/api/addtag',{ 
      newTag : this.state.newTagInput
    }, getAuthHead)
    .then(res =>{
      console.log(res)
    })
    .catch(err => console.log(err))

    this.setState({ loading: true , newTag: false, newTagInput:''}, () => {
      axios.get('/api/gettags', getAuthHead)
        .then(result => {
          this.setState({
            loading: false,
            tags: result.data
          });  console.log(result)}
        );
    });
    
  }
  handleSubmit(){
    axios.post('/api/add',{
        name: this.state.name,
        price: this.state.price,
        des: this.state.des,
        category: this.state.category,
        img_url: this.state.img_url,
        tags: this.state.selectedTags
      },getAuthHead)
      .then(res =>{
        this.setState({
          selectedTags: [],
          name: '',
          price: '',
          category: '',
          des: '',
          img_url: [],
          cur_url: '',
          added: true
        })
      })
      .catch(err => console.log(err))

      this.setState({ loading: true }, () => {
        axios.get('/api/gettags', getAuthHead)
          .then(result => {
            this.setState({
              loading: false,
              tags: result.data
            });  console.log("ok")}
          );
      });
  }
  render(){
    const addedAlert = (this.state.added)? <h1>Added</h1>:<h1></h1>
    const newTagForm = (this.state.newTag)? <input onChange={(e)=>this.setState({newTagInput: e.target.value})} className="form-control" type="text" value={this.state.newTagInput} />: null
    const newTagOrAddTag = (this.state.newTag)? <button onClick={this.handleAddTag} className="btn btn-primary addtagmargin">Add Tag</button>:
    <button onClick={this.handleShowAddNewTag} className="btn btn-primary addtagmargin">Add New Tag</button>
    const tagsList = (this.state.loading)? <h1>Loading...</h1> : this.state.tags.map((tag:any, key)=>{
      return(
        <div className="form-check col-4" key={key}>
          <input value={tag.name} onChange={(e)=>this.handleCheckTag(e)} type="checkbox" className="form-check-input" id={tag._id}/>
          <label className="form-check-label" htmlFor={tag._id}>{tag.name}</label>
        </div>
      )
    })
    const urlList = this.state.img_url.map((url:any, key)=> {
      return(
        <div key={key} className="url-row">
          <div className="row">
            <div className="col-9">
              <p className="url-ptag">{url}</p>
            </div>
            <div className="col-3">
              <button className="btn btn-danger" id={key.toString()} onClick={(e)=>this.handleRemove(e)}>X</button>
            </div>
          </div>
        </div>
      )
    })
    const catList = this.state.categories.map((cat:any, key)=>{
      return (
      <option value={cat._id} key={key}>{cat.name}</option>
      )
    })
    return(
      <div className="page-body">
        <div className="container">
          <h1>បញ្ចូលផលិតផល</h1>
          {addedAlert}
          <div className="row addproductcontainer">
            <div className="col-12 col-sm-12 col-md-6">
            <input onChange={(e)=>this.setState({name: e.target.value, added: false})} type="text" value={this.state.name} className="form-control" placeholder="Product Name"/>
            <input onChange={(e)=>this.setState({price: e.target.value})} type="text" value={this.state.price} className="form-control" placeholder="Price"/>
            <textarea onChange={(e)=>this.setState({des: e.target.value})} value={this.state.des} className="form-control" placeholder="Description"/>
            <label>Select Product Category</label>
            <select className="form-control" onChange={this.handleCategory} value={this.state.category}>
              <option>ជ្រើសប្រភេទ</option>
              {catList}
            </select>
            <label>Image URL</label>
            <div>
              <div className="url-list">
                {urlList}
              </div>
              <div className="row">
                <div className="col-9">
                  <input onChange={(e)=>this.setState({cur_url: e.target.value})} value={this.state.cur_url} type="text" className="form-control" placeholder="Image Url"/>
                </div>
                <div className="col-3">
                  <button className="btn btn-primary" onClick={this.handleAddUrl}>Add Url</button>
                </div>
              </div>
            </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6">
              <div className="row">
                {tagsList}
              </div>
              <div className="row">
                {newTagForm}
                {newTagOrAddTag}
              </div>
            </div>
          </div>
          <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    )
  }
}