import React, {Component} from 'react';
import PubSub from 'pubsub-js';

export default class Game extends Component {

    constructor(){
        super();
        this.state = { games: [] }
    }

    componentDidMount() {
        PubSub.subscribe('detail-data', (topic, list) => this.setState({games: list.game_indices}));
    }

    componentWillUnmount(){
        PubSub.unsubscribe('detail-data');
    }

    getGames(){
        return this.state.games;
    }

    render(){
        return (        
              <ul>
                { this.getGames().map((game, index) => <li key={ index }>{ game.version.name }</li>) }
              </ul>
        );
    }
}