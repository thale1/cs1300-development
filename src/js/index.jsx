var React                   = require('react');
var ReactDOM                = require('react-dom');
var ColorComponent 		 	= require("./components/ColorComponent.jsx");
var ShoeComponent = require("./components/ShoeComponent.jsx");
var ShoeList = require("./components/ShoeList.jsx");

ReactDOM.render(<ShoeList/>, document.getElementById('container'));