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
        var priceAndBrand = item.price >= this.state.min && item.price <= this.state.max && this.state.brands.indexOf(item.brand) >=0;
        if (this.state.sizes.length > 0) {
            return intersect_safe(this.state.sizes, item.sizes).length > 0 && priceAndBrand;
        } else {
            return priceAndBrand;
        }
    },
    changeSizes(sizes) {
        console.log(sizes);
        this.setState({sizes: sizes}, this.filterList);
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
                    sizes: [8, 9, 10],
                    price: 100
                }, {
                    brand: "Brooks",
                    img  : "./src/img/brooks-adrenaline.jpg",
                    name : "Brooks Adrenaline 16",
                    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5],
                    price: 130
                }, {
                    brand: "Adidas",
                    img  : "./src/img/adidas-ultra-boost.jpg",
                    name : "Adidas Ultra Boost",
                    sizes: [7, 7.5, 8, 8.5, 9, 11, 11.5, 12],
                    price: 180
                }, {
                    brand: "Nike",
                    img  : "./src/img/nike-pegasus.jpg",
                    name : "Nike Pegasus",
                    sizes: [7, 9.5, 10, 10.5, 11, 11.5, 12],
                    price: 110
                }, {
                    brand: "Nike",
                    img  : "http://s3.amazonaws.com/nikeinc/assets/62380/Nike-News-Football-Kit-2016-_0002_HO16_RN_M_ZmStructure20_004_medial_02_native_1600.jpg?1474497855",
                    name : "Nike Zoom Structure",
                    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
                    price: 120
                }, {
                    brand: "Mizuno",
                    img  : "./src/img/wave-rider.png",
                    name : "Mizuno Wave Rider 20",
                    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 11.5, 12],
                    price: 120
                },
                {
                    brand: "Adidas",
                    img  : "./src/img/response-boost.jpg",
                    name : "Adidas Response Boost",
                    sizes: [7, 7.5, 10, 10.5, 11, 11.5, 12],
                    price: 90
                }, {
                    brand: "Brooks",
                    img  : "./src/img/brooks-ghost.jpg",
                    name : "Brooks Ghost 9",
                    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
                    price: 120
                }, {
                    brand: "Nike",
                    img  : "./src/img/nike-flyknit-racer.jpg",
                    name : "Nike Flyknit Racer",
                    sizes: [8, 9, 9.5, 10],
                    price: 180
                }, {
                    brand: "Nike",
                    img  : "./src/img/nike-lunarepic.jpg",
                    name : "Nike Lunarepic Flyknit",
                    sizes: [7, 7.5, 8, 9, 10, 10.5, 11, 11.5, 12],
                    price: 180
                }, {
                    brand: "New Balance",
                    img  : "./src/img/vazee-pace.jpg",
                    name : "New Balance Vazee Pace",
                    sizes: [7.5, 8, 12],
                    price: 80
                }, {
                    brand: "Brooks",
                    img  : "./src/img/launch-3.jpg",
                    name : "Brooks Launch 3",
                    sizes: [8, 8.5, 9, 10.5, 11],
                    price: 75
                }
            ],
            min: 0,
            max: 180,
            brands: ['Adidas','Nike','New Balance','Brooks', 'Mizuno'],
            sizes       : [],
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
                    <fieldset className='form'>
                        <legend>Sizes</legend>
                        <CheckboxGroup labels={[7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12]} update={this.changeSizes} className='button'/>
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

function intersect_safe(a, b)
{
  var ai=0, bi=0;
  var result = [];

  while( ai < a.length && bi < b.length )
  {
     if      (parseInt(a[ai]) < parseInt(b[bi]) ){ ai++; }
     else if (parseInt(a[ai]) > parseInt(b[bi]) ){ bi++; }
     else /* they're equal */
     {
       result.push(a[ai]);
       ai++;
       bi++;
     }
  }

  return result;
}

module.exports = ShoeList