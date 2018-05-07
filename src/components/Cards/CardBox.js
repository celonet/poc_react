import React, {Component} from 'react';
import PokeApi from '../../api/Pokemon';
import Card from './Card';
import Loading from '../Shared/Loading';
import './Card.css';
import PubSub from 'pubsub-js';
import Search from './Search';

export default class CardBox extends Component {
    constructor() {
        super();
        this.state = {
            pokeInformation: {
                results: []
            },
            requestSent: false,
        }
        this.pokeApi = new PokeApi();
    }    

    componentDidMount() {
        let listContainer = document.querySelector('.list-container');
        listContainer.addEventListener('scroll', this.handleOnScroll.bind(this));
        this.getData();
    }

    componentWillUnmount() {
        let listContainer = document.querySelector('.list-container');
        listContainer.removeEventListener('scroll', this.handleOnScroll.bind(this));
    }

    fillState(url, response){
        let namesInBox = [];
        if (url) {
            let newList = this.getResults().concat(response.results);
            let newData = {
                pokeInformation: {
                    results: newList,
                    next: response.next
                },
                requestSent: false
            }
            this.setState(newData);
            namesInBox = newList.map(list => list.name);
        } else {
            this.setState({pokeInformation: response, requestSent: false });
            namesInBox = response.results.map(list => list.name);
        }
        PubSub.publish('names', namesInBox);
    }

    getData(url) {
        if(url === null && !this.state.pokeInformation.count)   {
            return;
        }
        
        this.pokeApi.list(url)
            .then(response => this.fillState(url,response))
            .catch(error => {
                this.setState({requestSent: false});
                console.log(error);
            });
    }

    handleOnScroll() {
        let listContainer = document.querySelector('.list-container');
        let scrollTop = (listContainer && listContainer.scrollTop);
        let scrollHeight = (listContainer && listContainer.scrollHeight);
        let clientHeight = listContainer.clientHeight || listContainer.innerHeight;
        let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

        if (scrolledToBottom) {
            this.querySearchResult();
        }
    }

    querySearchResult() {
        if (!this.state.requestSent && this.state.pokeInformation.next) {
            setTimeout(this.getData(this.state.pokeInformation.next), 2000);
            this.setState({requestSent: true});
        }
    }

    getResults() {
        return this.state.pokeInformation.results || [];
    }


    render() {
        return (
            <div className="cardBox container">        
                <div className="autoComplete">
                    <Search />
                </div> 
                <div className="list-container">
                    {
                        this.getResults().map((pokemon, index) => {
                                let pokeId = ++index;
                                return (<Card key={pokeId} index={pokeId} {...pokemon} />)
                            })
                    }
                </div>
                <Loading show={this.state.requestSent} />
            </div>
        );
    }
}