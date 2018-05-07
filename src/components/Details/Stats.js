import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class Stats extends Component {
    constructor(){
        super();
        this.state = { stats: [] }
    }

    componentDidMount() {
        PubSub.subscribe('detail-data', (topic, list) => this.setState({stats: list.stats}))
    }
    
    componentWillUnmount(){
        PubSub.unsubscribe('detail-data');
    }

    getStats() {
        return (this.state.stats || []);
    }

    render() {
        return (
            <table className="striped centered responsive-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>effort</th>
                  <th>base_stat</th>
                </tr>
              </thead>
              <tbody>
                { this.getStats().map((stat, index) => {
                      return (
                          <tr key={ index }>
                            <td>{ stat.stat.name }</td>
                            <td>{ stat.effort }</td>
                            <td>{ stat.base_stat }</td>
                          </tr>
                      )
                  }) }
              </tbody>
            </table>
        )
    }
}