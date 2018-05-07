import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PokeApi from '../../api/Pokemon';
import Stats from './Stats';
import Moves from './Move';
import Game from './Game';
import Info from './Info';
import Images from './Images';
import Types from './Types';
import Loading from '../Shared/Loading';
import M from "materialize-css/dist/js/materialize.min.js";
import PubSub from 'pubsub-js';

export default class DetailBox extends Component {
    constructor() {
        super();
        this.state = { loading: true };
        this.pokeApi = new PokeApi();
    }

    startCollapse(){
        var elem = document.querySelector('.collapsible.expandable');
        M.Collapsible.init(elem, {
            accordion: false
        });
    }

    getData(){
        let id = parseInt(this.props.match.params.number,10);
        this.pokeApi.get(id)
            .then(pokeInfo => {
                PubSub.publish('detail-data', pokeInfo)
                this.setState({ loading: false });
            })
            .catch(error => console.log);    
    }

    componentDidMount(){
        this.startCollapse();
    }

    componentWillMount(){
        this.getData();      
    }

    getInfo(){
      return this.state.pokeInfo;
    }
    
    render() {      
        return (
            <div className="container">
                <div className="row">
                    <div className="col s3">
                        <Images />              
                    </div>
                    <div className="col s9">
                        <Info />
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <ul className="collapsible expandable">
                            <li>
                                <div className="collapsible-header"><i className="material-icons">merge_type</i>Types</div>
                                <div className="collapsible-body">
                                    <Types />          
                                </div>
                            </li>
                            <li>
                                <div className="collapsible-header"><i className="material-icons">videogame_asset</i>Games</div>
                                <div className="collapsible-body">
                                    <Game />          
                                </div>
                            </li>
                            <li>
                                <div className="collapsible-header"><i className="material-icons">list</i>Moves</div>
                                <div className="collapsible-body">
                                    <Moves />
                                </div>
                            </li>
                            <li>
                                <div className="collapsible-header"><i className="material-icons">trending_up</i>Stats</div>
                                <div className="collapsible-body">
                                    <Stats />
                                </div>
                            </li>
                        </ul>   
                    </div>
                </div>
                <Loading show={this.state.loading} />
                <Link to="/">Voltar</Link>
            </div>
        )
    }
}