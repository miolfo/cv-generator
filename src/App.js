import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import jsPDF from 'jspdf';
import Util from './Util';
import PdfBuilder from './PdfBuilder';
import PdfForm from './PdfForm';
import PdfPreview from './PdfPreview';

class App extends Component {
  constructor(){
    super();
    this.state = {
      pdf: "",
      name: "Joel Spectre",
      address: "Circusroad 37", 
      phone: "+358 123 4567",
      email: "joel@spectre.com",
      largeFields: [],
      mainHeaders: []
    }

    this.settings = {
      basicInfoFontSize: 10,
      basicInfoLineGap: 4,
      basicInfoXCoordLeft: 25,
      basicInfoXCoordRight: 165,
      basicInfoYCoordLeft: 40,
      basicInfoYCoordRight: 40,
      currentYLeft: 40,
      currentYRight: 40,

      maxLineLength: 160,
      headerGap: 10,
      largeFieldGap: 20
    }


    this.pdf = null;

    this.userInfoChanged = this.userInfoChanged.bind(this);
    this.refreshPdf = this.refreshPdf.bind(this);
    this.addLargeField = this.addLargeField.bind(this);
    this.addHeader = this.addHeader.bind(this);
    this.deleteLargeField = this.deleteLargeField.bind(this);
    this.largeFieldChanged = this.largeFieldChanged.bind(this);
  }

  render() {
    return (
      <div className='app'>
        <div className='header'>
        </div>
        <div className="left">
        <PdfForm 
          userInfoChanged={this.userInfoChanged} 
          refreshPdf={this.refreshPdf} 
          largeFields={this.state.largeFields} 
          addLargeField={this.addLargeField} 
          addHeader={this.addHeader}
          deleteLargeField={this.deleteLargeField}
          largeFieldChanged={this.largeFieldChanged}
          userName={this.state.name}
          userAddress={this.state.address}
          userPhone={this.state.phone}
          userEmail={this.state.email}/>
        </div>
        <PdfPreview pdf={this.state.pdf}/>
      </div>
    );
  }


  refreshPdf(){
    const pdfBuilder = new PdfBuilder(this.settings);
    const pdf = pdfBuilder.createPdf(this.state);
    this.setState({
      pdf: pdf
    });
  }

  addLargeField(){
    const largeFields = this.state.largeFields;
    largeFields.push({
      mainHeader: "too hard",
      header: "Sample header text",
      text: Util.loremIpsum
    });
    this.setState({
      largeFields: largeFields
    })
  }

  addHeader(){
    const headers = this.state.headers;
    headers.push("sampleheader");
  }

  deleteLargeField(index, event){
    event.preventDefault();
    const largeFields = this.state.largeFields;
    largeFields.splice(index, 1);
    this.setState({
      largeFields: largeFields
    });
  }

  /**
   * Called whenever one of the user info fields are changed
   * @param  {object} event event click
   */
  userInfoChanged(event){
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  largeFieldChanged(index, event){
    event.preventDefault();
    const newValue = event.target.value;
    const largeFields = this.state.largeFields.slice();
    if(event.target.name==="largeFieldHeader") largeFields[index].header = newValue;
    else largeFields[index].text = newValue;
    this.setState({
      largeFields: largeFields
    });
  }
}




export default App;
