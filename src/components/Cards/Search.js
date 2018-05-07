import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Autocomplete from 'react-autocomplete';
import PokeRepository from '../../Repository/pokeRepository';
import PubSub from 'pubsub-js';

class Search extends Component
{
    constructor() {
        super();
        this.state = {
            values: [],
            value: ''
        }    
        this.pokeRepository = new PokeRepository();
        this.namesInBox = [];
        PubSub.subscribe('names', (topic, names) => this.namesInBox = names);
    }    

    componentDidMount(){
        let names = this.pokeRepository.getNames().map(name => { return {id: name, label: name} });
        this.setState({values: names})
    }

    componentWillUnmount(){
        PubSub.unsubscribe('names');
    }

    onChange(e){
        this.setState({ value: e.target.value })
        PubSub.publish('show', e.target.value);
    } 
    
    onSelect(value){
        if(this.namesInBox.indexOf(value) >= 0){
            PubSub.publish('show', value);
        } else {
            let pokemon = this.pokeRepository.getPokemonByName(value);
            this.props.history.push(`/pokemon/${pokemon.id}`)
        }
        this.setState({ value })
    }

    render(){
        const itemStyle = (item, highlighted) =>
        <div 
            key={item.id}
            style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}>
            {item.label}
        </div>;

        const menuStyle = {
            borderRadius: '3px',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '2px 0',
            fontSize: '90%',
            position: 'fixed',
            overflow: 'auto',
            maxHeight: '50%',
            zIndex: 9999,
        }

        const wrapperStyle = {
            display: 'inline-block',
            width: '100%'
        }

        return (
            <Autocomplete 
                menuStyle={menuStyle}
                wrapperStyle={wrapperStyle}
                items={this.state.values}
                shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                getItemValue={item => item.label}
                renderItem={itemStyle}           
                value={this.state.value}
                onChange={this.onChange.bind(this)}
                onSelect={this.onSelect.bind(this)} />   
        );
    }
}

export default withRouter(Search);