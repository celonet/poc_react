import React, {Component} from 'react';
import PubSub from 'pubsub-js';

class ImageHelper extends Component {
    render(){
        const image = this.props.url ? <img src={ this.props.url } alt={this.props.alt} /> : '';
        return (
            <div>{image}</div>
        );        
    }
}

export default class Images extends Component {

    constructor(){
        super();
        this.state = { sprites: [] }
    }

    componentDidMount() {
        PubSub.subscribe('detail-data', (topic, list) => this.setState({sprites: list.sprites}))
    }

    componentWillUnmount(){
        PubSub.unsubscribe('detail-data');
    }

    getImage(){
        return (this.state.sprites || {
            back_female: '',
            back_shiny_female: '',
            back_default: '',
            front_female: '',
            front_shiny_female: '',
            back_shiny: '',
            front_default: '',
            front_shiny: ''
        })
    }


    render(){
        return (            
                <div>
                    <ImageHelper url={this.getImage().back_female} alt='back_female' />
                    <ImageHelper url={this.getImage().back_shiny_female} alt='back_shiny_female' />
                    <ImageHelper url={this.getImage().back_default} alt='back_default' />
                    <ImageHelper url={this.getImage().front_female} alt='front_female' />
                    <ImageHelper url={this.getImage().front_shiny_female} alt='front_shiny_female' />
                    <ImageHelper url={this.getImage().back_shiny} alt='back_shiny' />
                    <ImageHelper url={this.getImage().front_default} alt='front_default' />
                    <ImageHelper url={this.getImage().front_shiny} alt='front_shiny' />
                </div>
        );
    }
}