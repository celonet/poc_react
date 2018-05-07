import React, {Component} from 'react';
import PubSub from 'pubsub-js';

export default class Info extends Component{
    constructor(){
        super();
        this.state = { types: [] }
    }

    componentDidMount() {
        PubSub.subscribe('detail-data', (topic, list) =>  this.setState({types: list.types}));
    }
    
    componentWillUnmount(){
        PubSub.unsubscribe('detail-data');
    }

    getType(){
        return this.state.types;
    }

    render(){
        return (                      
            <div>
                {this.getType().map(type => <div className="chip" key={type.type.name}>{type.type.name}</div>)}
            </div>
        )
    }
}