import React from 'react'
import striped_bar from '../asset/accessory/striped_bar.jpg'
import c1 from '../asset/svg/clock.svg'
import '../css/services.css'

export default class Slide extends React.Component{
  
  componentDidMount() {
    const servicesBar = (document.getElementById('services-bar-bg') as HTMLDivElement)
    servicesBar.style.backgroundImage = "url('"+striped_bar+"')";
  }
  
  

  render(){
    return(
      <div className="services" id="services">
        <div id="services-bar-bg">
          <div className="row">
            <div className="col-4">
              <h1>សេវាកម្ម</h1>
            </div>
            <div className="col-4">
              <h1>សេវាកម្ម</h1>
            </div>
            <div className="col-4">
              <h1>សេវាកម្ម</h1>
            </div>
          </div>
        </div>
        <hr/>
        <div id="services-detail">
          <div className="row">
            <div className="col-12 col-sm-4">
              <img src={c1} alt=""/>
              <p>សួស្តីអ្នកនាងកញ្ញា លោកលោកស្រីជាទីនឹករលឺក ថ្ងៃនេះខ្ញុំមានការសប្បាយចិត្តរីករាយជាខ្លាំង</p>
            </div>
            <div className="col-12 col-sm-4">
              <img src={c1} alt=""/>
              <p>និងវឌ្ឍន​វិជ្ជា ជា​គូ​ប្រជែង​ដ៏​ខ្លាំងក្លា សួស្តីអ្នកនាងកញ្ញា លោកលោកស្រីជាទីនឹករលឺក ក្រុម​​ប្រកួត​ជម្រុះពានរង្វាន់</p>
            </div>
            <div className="col-12 col-sm-4">
            <img src={c1} alt=""/>
              <p>សួស្តីអ្នកនាងកញ្ញា លោកលោកស្រីជាទីនឹករលឺក និងវឌ្ឍន​វិជ្ជា ជា​គូ​ប្រជែង​ដ៏​ខ្លាំងក្លា និង​ជក់​ចិត្ត​មែន​ៗពោល​គឺលេងរហូត​ដល់ទៅ​ ៥​ តង់ឯណោះ​</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}