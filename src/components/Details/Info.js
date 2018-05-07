import React, {Component} from 'react';
import PubSub from 'pubsub-js';

export default class Info extends Component{
    constructor(){
        super();
        this.state = { info: [] }
    }

    componentDidMount() {
        PubSub.subscribe('detail-data', (topic, list) => this.setState({info: list}))
    }

    componentWillUnmount(){
        PubSub.unsubscribe('detail-data');
    }

    getInfo(){
        return this.state.info;
    }

    render(){  
        return (          
             <ul className="collection with-header">
              <li className="collection-item">
                  <span>Id: { this.getInfo().id }</span>
                  </li>
                  <li className="collection-item">
                  <span>Name: { this.getInfo().name }</span>
                  </li>
                  <li className="collection-item">
                  <span>Height: { this.getInfo().height }</span>
                  </li>
                  <li className="collection-item">
                  <span>Weight: { this.getInfo().weight }</span>
                  </li>
                  <li className="collection-item">
                  <span>Base Experience: { this.getInfo().base_experience }</span>
              </li>
            </ul>
        )
    }
}