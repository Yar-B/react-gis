import React from "react";
import { YMaps, Map, ZoomControl, Button } from 'react-yandex-maps';
import SetPlacemarks from './Placemark/setPlacemarks';
import SetPlacemarks_posts from './Placemark/setPlacemarks_posts';

const mapState = {
    center:  [42.3141419577, -83.1221815483],
    zoom: 10,
    controls: []
}

function CustomMap (props){

    return(
      <>
        <YMaps query={{apikey: '413dad6e-973a-4e11-8762-9dc7c6a6fb64'}}>
            <Map 
              modules={["multiRouter.MultiRoute"]}
              onLoad={ymaps => props.setYmaps(ymaps)}
              state={mapState}
              options = {{ minZoom: 10 }}
              instanceRef={ref => props.setRef(ref)}
              width = "100%" height='300px'
            >
            <Button onClick = {props.showModalDiagramm} 
              options = {{selectOnClick: false}} 
              data = {{image: "http://s1.iconbird.com/ico/0912/fugue/w16h161349012159chart.png",
                      title: "Диграмма распределения"}}
            />
              <SetPlacemarks_posts data={props.posts} />
              <SetPlacemarks data={props.parcels} />
              <ZoomControl options={{ float: 'right' }} />
            </Map>
        </YMaps>
        </>
    )
}

export default CustomMap;