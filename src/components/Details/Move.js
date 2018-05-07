import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class Stats extends Component {
    constructor(){
        super();
        this.state = { moves: [] }
    }

    componentDidMount() {
        PubSub.subscribe('detail-data', (topic, list) => this.setState({moves: list.moves}))
    }

    componentWillUnmount(){
        PubSub.unsubscribe('detail-data');
    }
    
    getMoves() {
        return (this.state.moves || []);
    }

    render() {
        return (
        <table className="striped highlight centered responsive-table">
            <thead>
                <tr>
                <th>Move</th>
                </tr>
            </thead>
            <tbody>
                { 
                    this.getMoves().map((move, index) => {
                        return (
                            <tr key={ index }>
                                <td>
                                { move.move.name }
                                </td>
                            </tr>
                        )
                    }) 
                }
            </tbody>
            </table>
        )
    }
}