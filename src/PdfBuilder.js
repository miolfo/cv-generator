import jsPDF from 'jspdf';
import Util from './Util';

class PdfBuilder{
    constructor(settings){
        this.settings = settings;
        this.pdf = null;
    }

    createPdf(data){
        this.settings.currentYLeft = this.settings.basicInfoYCoordLeft;
        this.settings.currentYRight = this.settings.basicInfoYCoordRight;
        this.pdf = new jsPDF();
        this.pdf.setFontType('bold');
        this.pdf.setFontSize(this.settings.basicInfoFontSize);
        this.addBasicInfoItemRight("CV");
        this.addBasicInfoItemLeft(data.name);

        this.pdf.setFontType('normal');
        this.addBasicInfoItemRight(Util.getDateString());
        this.addBasicInfoItemLeft(data.address);
        this.addBasicInfoItemLeft(data.phone);
        this.addBasicInfoItemLeft(data.email);
        this.pdf.line(this.settings.basicInfoXCoordLeft-10, this.settings.currentYLeft, this.settings.basicInfoXCoordRight+30, this.settings.currentYLeft);

        const pdfStr = this.pdf.output('datauristring');
        return pdfStr;
    }

    /**
    * Add a text item to top left of the document
    * @param  {string} item
    */
    addBasicInfoItemLeft(item){
        this.pdf.text(item, this.settings.basicInfoXCoordLeft, this.settings.currentYLeft);
        this.settings.currentYLeft += this.settings.basicInfoLineGap;
    }
  
  
    /**
     * Add a text item to top right of the document
     * @param  {string} item
     */
    addBasicInfoItemRight(item){
        this.pdf.text(item, this.settings.basicInfoXCoordRight, this.settings.currentYRight);
        this.settings.currentYRight += this.settings.basicInfoLineGap;
    }
}

export default PdfBuilder;