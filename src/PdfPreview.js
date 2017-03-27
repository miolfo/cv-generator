import React, { Component } from 'react';

/**
 * Class that handles viewing the generated PDF file
 */
class PdfPreview extends Component{
  render(){
    return(
    <div className='pdf-preview'>
      <iframe className='pdf-frame' src={this.props.pdf}width="" height="" border="0" />
    </div>
    );
  }
}

export default PdfPreview;