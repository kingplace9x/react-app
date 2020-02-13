import React, { Component } from 'react';

class Item extends Component {
    state = {
        count: this.props.num
    }
    style = {margin:"5px"};

    onAdd = ()=>{
        if(this.state.count<9)
            this.setState({count: this.state.count+1});
    }

    onMinus = () => {
        if(this.state.count>0)
            this.setState({count: this.state.count-1});
    }
    render(){
        return (
            <div>
                <button className="btn btn-secondary" style={this.style}>{this.props.id}</button>
                <button className="btn btn-primary" style={this.style}>{this.state.count}</button>
                <button className="btn btn-success" style={this.style} onClick={this.onAdd}>add</button>
                <button className="btn btn-warning" style={this.style} onClick={this.onMinus}>minus</button>
                <button className="btn btn-danger" style={this.style} onClick={()=>this.props.onDelete(this.props.id)}>delete</button>
            </div>
        )
    }
}

export default Item;
