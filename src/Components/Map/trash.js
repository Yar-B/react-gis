import React, { Component } from 'react';
import { YMaps, Map, ZoomControl, Button } from 'react-yandex-maps';
import SetPlacemarks from './Placemark/setPlacemarks';
import SetPlacemarks_posts from './Placemark/setPlacemarks_posts';

const mapState = {
    center:  [42.3141419577, -83.1221815483],
    zoom: 10,
    controls: []
}

export default class CustomMap extends Component {
    componentDidMount () {
        const script = document.createElement("script");
    
        script.src = "https://yastatic.net/s3/mapsapi-jslibs/heatmap/0.0.1/heatmap.min.js";
        script.async = true;
    
        document.body.appendChild(script);
    }
    getHeatMap(ref){
      this.props.ymaps.modules.require(['Heatmap'], function (Heatmap) {
        console.log(this.props.parcels)
        var heatmap = new this.props.ymaps.Heatmap(this.props.parcels, {
            radius: 15,
            dissipating: false,
            opacity: 0.8,
            intensityOfMidpoint: 0.2,
            gradient: {
                0.1: 'rgba(128, 255, 0, 0.7)',
                0.2: 'rgba(255, 255, 0, 0.8)',
                0.7: 'rgba(234, 72, 58, 0.9)',
                1.0: 'rgba(162, 36, 25, 1)'
            }
        });
        heatmap.setMap(ref);
    });
    }
    render() {
        return(
            <>
              <YMaps query={{apikey: '413dad6e-973a-4e11-8762-9dc7c6a6fb64'}}>
                  <Map 
                    modules={["multiRouter.MultiRoute"]}
                    onLoad={ymaps => this.props.setYmaps(ymaps)}
                    state={mapState}
                    options = {{ minZoom: 10 }}
                    instanceRef={ref => this.props.setRef(ref)}
                    width = "100%" height='300px'
                  >
                  <Button onClick = {() => this.getHeatMap(this.props.ref)}/>
                  <Button onClick = {this.props.showModalDiagramm} 
                    options = {{selectOnClick: false}} 
                    data = {{image: "http://s1.iconbird.com/ico/0912/fugue/w16h161349012159chart.png",
                             title: "Диграмма распределения"}}
                  />
                    <SetPlacemarks_posts data={this.props.posts} />
                    <SetPlacemarks data={this.props.parcels} />
                    <ZoomControl options={{ float: 'right' }} />
                  </Map>
              </YMaps>
              </>
          )
    }
}
