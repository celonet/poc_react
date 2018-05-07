import React, {Component} from 'react';
import { Link } from 'react-router-dom'

export default class Header extends Component {
    render(){
        return (
            <nav className="blue darken-1">
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo center">Poke React Training</Link>
                </div>
            </nav>
        )
    }
}