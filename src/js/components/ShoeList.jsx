var React = require('react');
var ShoeComponent = require("./ShoeComponent.jsx");
var CheckboxGroup = require("./CheckboxGroup.jsx");

var initBrands = ['Adidas','Nike','New Balance','Brooks', 'Mizuno'];
var ShoeList = React.createClass({
    componentWillMount: function () {
        this.setState({shoes: this.state.initialShoes})
    },
    filterList        : function () {
        var newList = this.state.initialShoes;
        newList = newList.filter(this.shoeFilter);
        this.setState({shoes: newList}, function() {console.log('filtered!');});
    },
    shoeFilter: function(item) {
        //console.log(item);
        //console.log(this.state);
        return (item.price >= this.state.min && item.price <= this.state.max && this.state.brands.indexOf(item.brand) >=0);
    },
    changeBrand(label) {
        if (label.length) {
            this.setState({brands: label}, this.filterList);
        } else {
            this.setState({brands: initBrands}, this.filterList);
        }
    },
    changeMin(event) {
        console.log(event.target.value);
        this.setState({min: event.target.value}, function() {this.filterList();});
    },
    changeMax(event) {
        console.log(event.target.value);
        var newMax = event.target.value;
        if (!newMax) newMax = 180;
        this.setState({max: newMax}, function() {this.filterList();});
        this.filterList();
    },
    getInitialState   : function () {
        return {
            initialShoes: [
                {
                    brand: "Nike",
                    img  : "./src/img/nike-free.jpg",
                    name : "Nike Free",
                    price: 100
                }, {
                    brand: "Brooks",
                    img  : "./src/img/brooks-adrenaline.jpg",
                    name : "Brooks Adrenaline 16",
                    price: 130
                }, {
                    brand: "Adidas",
                    img  : "./src/img/adidas-ultra-boost.jpg",
                    name : "Adidas Ultra Boost",
                    price: 180
                }, {
                    brand: "Nike",
                    img  : "./src/img/nike-pegasus.jpg",
                    name : "Nike Pegasus",
                    price: 110
                }, {
                    brand: "Nike",
                    img  : "http://s3.amazonaws.com/nikeinc/assets/62380/Nike-News-Football-Kit-2016-_0002_HO16_RN_M_ZmStructure20_004_medial_02_native_1600.jpg?1474497855",
                    name : "Nike Zoom Structure",
                    price: 120
                }, {
                    brand: "Mizuno",
                    img  : "./src/img/wave-rider.png",
                    name : "Mizuno Wave Rider 20",
                    price: 120
                },
                {
                    brand: "Adidas",
                    img  : "./src/img/response-boost.jpg",
                    name : "Adidas Response Boost",
                    price: 90
                }, {
                    brand: "Brooks",
                    img  : "./src/img/brooks-ghost.jpg",
                    name : "Brooks Ghost 9",
                    price: 120
                }, {
                    brand: "Nike",
                    img  : "./src/img/nike-flyknit-racer.jpg",
                    name : "Nike Flyknit Racer",
                    price: 180
                }, {
                    brand: "Nike",
                    img  : "./src/img/nike-lunarepic.jpg",
                    name : "Nike Lunarepic Flyknit",
                    price: 180
                }, {
                    brand: "New Balance",
                    img  : "./src/img/vazee-pace.jpg",
                    name : "New Balance Vazee Pace",
                    price: 80
                }, {
                    brand: "Brooks",
                    img  : "./src/img/launch-3.jpg",
                    name : "Brooks Launch 3",
                    price: 75
                }
            ],
            min: 0,
            max: 180,
            brands: ['Adidas','Nike','New Balance','Brooks', 'Mizuno'],
            shoes       : []
        }
    },
    render            : function () {
        return (
            <div className='shoe-list'>
                <form className='form'>                    
                    <fieldset className='form'>
                        <legend>Price</legend>
                        Min: <input type='number' className='price-input' min='0' max='180' onChange={this.changeMin}/><br/>
                        Max: <input type='number' className='price-input' min='0' max='180' onChange={this.changeMax}/>
                    </fieldset>
                    <fieldset className='form'>
                        <legend>Brands</legend>
                        <CheckboxGroup labels={initBrands} update={this.changeBrand}/>
                    </fieldset>
                </form>
                <List className='list' shoes={this.state.shoes}/>
            </div>
        );
    }
});

var List = React.createClass({
  render: function(){
      if (this.props.shoes.length > 0) {
    return (
    <div>
      {
        this.props.shoes.map(function(item) {
          return <ShoeComponent key={item.name} name={item.name} price={item.price} img={item.img}/>;//<li key={item}>{item}</li>
        })
       }
        </div>
    );
      }
      else {
          return (<div className='no-shoes'>No shoes match your filter</div>);          
      }
  }
});

module.exports = ShoeList