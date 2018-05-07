import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PubSub from 'pubsub-js';
import PokeRepository from '../../Repository/pokeRepository';

export default class Card extends Component {
    constructor() {
        super();
        this.state = {
            imgUrl: '',
            show: true
        }
        this.pokeRepository = new PokeRepository();
    }

    componentDidMount() {
        let url = this.pokeRepository.getSpriteByName(this.props.name);
        this.setState({ imgUrl: url });
        PubSub.subscribe('show', (topic, name) => {            
            if(name){
                this.setState({show: name === this.props.name})
            } else {
                this.setState({show: true})
            }
        });
    }

    componentWillUnmount(){
        PubSub.unsubscribe('show');
    }

    render() {
        let style = {
            display:  this.state.show ? 'block' : 'none'
        };
        return (
            <div className="card item" style={style}>
                <Link to={`/Pokemon/${this.props.index}`}>
                    <img src={ this.state.imgUrl } alt={ this.props.name } />
                    <br/>
                    <span>{ this.props.name }</span>
                </Link>
            </div>
        );
    }
}