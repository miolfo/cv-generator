const Util = {
    getDateString: function(){
        const date = new Date();
        const dateStr = this.leftPadDateZero(date.getDate().toString()) + "." + this.leftPadDateZero((date.getMonth()+1).toString()) + "." + date.getFullYear();
        return dateStr; 
    },

    leftPadDateZero: function(item){
        if(item.length === 2) return item;
        else if(item.length === 1) return "0" + item;
        else throw "Invalid date for padding!";
    },

    loremIpsum: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget dapibus diam. Duis dictum, quam sed dictum aliquet, dolor felis ornare mauris, ut ultricies nulla velit eu tortor. Praesent fringilla consectetur laoreet. Sed pharetra massa ullamcorper nisi sollicitudin, at lobortis metus venenatis. Sed et urna volutpat, commodo purus sit amet, ullamcorper lectus. Etiam lacus tortor, consequat sed lectus et, elementum dictum odio. Nam tempor orci vel rhoncus ultricies."
}

export default Util;