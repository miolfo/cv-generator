import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import jsPDF from 'jspdf';
import Util from './Util';

class App extends Component {
  constructor(){
    super();
    this.state = {
      pdf: "",
      name: "",
      address: "", 
      phone: "",
      email: "",
    }

    this.settings = {
      basicInfoFontSize: 10,
      basicInfoLineGap: 4,
      basicInfoXCoordLeft: 25,
      basicInfoXCoordRight: 165,
      basicInfoYCoordLeft: 40,
      basicInfoYCoordRight: 40,
      currentYLeft: 40,
      currentYRight: 40
    }


    this.pdf = null;

    this.userInfoChanged = this.userInfoChanged.bind(this);
    this.refreshPdf = this.refreshPdf.bind(this);
  }

  render() {

    return (
      <div className='app'>
        <div className="left">
        <PdfForm userInfoChanged={this.userInfoChanged} name={this.state.name} address={this.state.address} phone={this.state.phone} email={this.state.email}
        refreshPdf={this.refreshPdf}/>
        </div>
        <PdfPreview pdf={this.state.pdf}/>
      </div>
    );
  }

  refreshPdf(){
    this.settings.currentYLeft = this.settings.basicInfoYCoordLeft;
    this.settings.currentYRight = this.settings.basicInfoYCoordRight;
    this.pdf = new jsPDF();
    this.pdf.setFontType('bold');
    this.pdf.setFontSize(this.settings.basicInfoFontSize);
    this.addBasicInfoItemRight("CV");
    this.addBasicInfoItemLeft(this.state.name);

    this.pdf.setFontType('normal');
    this.addBasicInfoItemRight(Util.getDateString());
    this.addBasicInfoItemLeft(this.state.address);
    this.addBasicInfoItemLeft(this.state.phone);
    this.addBasicInfoItemLeft(this.state.email);
    this.pdf.line(this.settings.basicInfoXCoordLeft-10, this.settings.currentYLeft, this.settings.basicInfoXCoordRight+30, this.settings.currentYLeft);

    const pdfStr = this.pdf.output('datauristring');
    this.setState({
      pdf: pdfStr
    });
  }

  addBasicInfoItemLeft(item){
    this.pdf.text(item, this.settings.basicInfoXCoordLeft, this.settings.currentYLeft);
    this.settings.currentYLeft += this.settings.basicInfoLineGap;
  }
  
  addBasicInfoItemRight(item){
    this.pdf.text(item, this.settings.basicInfoXCoordRight, this.settings.currentYRight);
    this.settings.currentYRight += this.settings.basicInfoLineGap;
  }



  userInfoChanged(event){
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    })
  }
}

class PdfForm extends Component{

  render(){
    return(
      <div>
        <UserInfoForm userInfoChanged={this.props.userInfoChanged} name={this.props.name} address={this.props.address} phone={this.props.phone} email={this.props.email}/>
        <button type="button" onClick={this.props.refreshPdf}>Refresh PDF</button>
      </div>
    )
  }
}

class UserInfoForm extends Component{
  constructor(){
    super();
    this.state = {
      name: "",
      address: "",
      phone: "",
      email: ""
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  render(){
    return (
      <form className="user-info-form">
        <label>
          Name: 
          <input type="text" name="name" className="default-text-input" value={this.props.name} onChange={this.props.userInfoChanged}/>
        </label>
        <label>
          Address: 
          <input type="text" name="address" className="default-text-input" value={this.props.address} onChange={this.props.userInfoChanged}/>
        </label>
        <label>
          Phone: 
          <input type="text" name="phone" className="default-text-input" value={this.props.phone} onChange={this.props.userInfoChanged}/>
        </label>
        <label>
          Email: 
          <input type="email" name="email" className="default-text-input" value={this.props.email} onChange={this.props.userInfoChanged}/>
        </label>
      </form>
    );
    //return (<div>asd</div>)
  }

  handleInputChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }
}

class PdfPreview extends Component{
  render(){
    return(
    <div className='pdf-preview'>
      <iframe className='pdf-frame' src={this.props.pdf} />
    </div>
    );
  }
}

export default App;