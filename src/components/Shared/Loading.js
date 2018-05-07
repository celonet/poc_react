import React, { Component } from 'react';

export default class Loading extends Component {
    render() {
        const hideOrShow = {display: this.props.show? 'block' : 'none'};
        return (     
            <div className="data-loading">   
                <div className="preloader-wrapper big active" style={hideOrShow}>
                    <div className="spinner-layer spinner-blue-only">
                        <div className="circle-clipper left">
                        <div className="circle"></div>
                        </div><div className="gap-patch">
                        <div className="circle"></div>
                        </div><div className="circle-clipper right">
                        <div className="circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}