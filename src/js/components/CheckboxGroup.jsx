var React = require('react');

var CheckboxGroup = React.createClass({
    getInitialState: function() {
        var labelDict = {};
        for (label in this.props.labels) {
            labelDict[this.props.labels[label]] = 0;
        }
      return {
          dict: labelDict
      }  
    },
    toggleValue: function(label, value) {
        var newList = [];
        this.state.dict[label] = value;
        for (var label in this.state.dict) {
            if (this.state.dict[label]) {
                newList.push(label);
            }
        }
        if (!newList) {
            newList = this.props.labels;
        }
        this.props.update(newList);
    },
    makeCheckbox(b) {
        return (<Checkbox key={b} label={b} handleChange={this.toggleValue} className={this.props.className}/>);
    },
    render: function() {
        return (<div className={this.props.className} id='top'>
                {this.props.labels.map(this.makeCheckbox)}
            </div>);
    }
});

var Checkbox = React.createClass({
    getInitialState: function () {
        return {
            isChecked: false
        };
    },
    
    toggleCheckbox: function() {
        console.log('toggled '+ this.props.label);
        var isChecked = !this.state.isChecked;
        this.setState({
            isChecked: !this.state.isChecked
        });
        this.props.handleChange(this.props.label, isChecked);
    },
    render: function() {
        return (
        <div className="checkbox" className={this.props.className}>
            
                <input type="checkbox" 
                          value={this.props.label}
                    id={this.props.label}
                        key={this.props.label}
                          checked={this.state.isChecked} 
                          onChange={this.toggleCheckbox} />
                <label htmlFor={this.props.label}>

                {this.props.label}
            </label>
        </div>
        );
    }
});

module.exports = CheckboxGroup