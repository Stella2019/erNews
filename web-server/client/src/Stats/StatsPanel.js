import React from 'react';
import Auth from '../Auth/Auth';
import ReactHighcharts from 'react-highcharts';
import {Preloader} from 'react-materialize';

class StatsPanel extends React.Component{
    constructor() {
        super();
        this.state = { newsDistribution: null };
    }

    componentDidMount(){
        this.getNewsDistribution();
    }

    getNewsDistribution(){
        let url = 'http://localhost:3000/news/distribution';
        fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + Auth.getToken()
            }),
            cache: 'no-cache'
        }).then((res) => { 
            return res.json();
        }).then((res) => {
            // console.log(res);
            this.setState({
                newsDistribution: res.newsDistribution
            });
        });
    }

    render(){
        if (this.state.newsDistribution){
            return (
                <div>
                    <ReactHighcharts config={this.state.newsDistribution}></ReactHighcharts>
                </div>
            );
        } else {
            return (<div>Loading</div>);
        }
    }
}

export default StatsPanel;