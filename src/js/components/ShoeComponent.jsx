var React = require('react');

var ShoeComponent = React.createClass({
    getDefaultProps() {
        return {
            name: "Nike Free",
            price: 100,
            brand: "Nike",
            img: "http://5.kicksonfire.net/wp-content/uploads/2016/04/NIKE-FREE-RN-FLYKNIT-2.jpg"
        };
    },
    render: function() {
        return (
            <div className='shoe'>
                <img className='shoeImage' src={this.props.img}/>
                <div>{this.props.name}</div>  
                <div>{'$'+this.props.price}</div>           
            </div>            
        );
    }
});

module.exports = ShoeComponent