import React from "react";
import { Component } from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import SetPlacemarks from './Placemark/setPlacemarks';
import SetPlacemarks_posts from './Placemark/setPlacemarks_posts';

const mapState = {
    center:  [42.3141419577, -83.1221815483],
    zoom: 10,
    controls: []
}

class CustomMap extends Component{
    constructor (props){
        super(props)
        this.map = null
        this.mapState = {
            center:  [42.3141419577, -83.1221815483],
            zoom: 10,
        }
    }

     onApiAvaliable(ymaps) {
        console.log(ymaps.Placemark)
        
    }
    

    render() {
        return(
            <YMaps >
                <Map onLoad={(ymaps) => this.onApiAvaliable(ymaps)} width = "100%" height='300px' state={this.mapState} instanceRef={(ref) => this.map = ref}>
                    <SetPlacemarks_posts data={this.props.posts}/>
                    <SetPlacemarks data={this.props.parcels}/>
                    {/* <button onClick={(ymaps) => this.onApiAvaliable(ymaps)}>Show route</button> */}
                </Map>
            </YMaps>
          )
        }
}



export default CustomMap;