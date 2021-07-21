import React from "react";
import { Placemark } from 'react-yandex-maps';
import myIcon from '../../../data/office-building.png';

function SetPlacemarks_posts(props) {
    return(
            <div>
                {props.data.map(items => {
                    if (items.visible){
                        return(
                            <Placemark key = {items.id}
                            geometry={[items.latitude, items.longitude]} 
                            properties = {{
                                hintContent: items.propaddr,
                                balloonContent: items.title
                            }}
                            modules = {
                                ['geoObject.addon.balloon', 'geoObject.addon.hint']}
                            options={{
                                    iconLayout: 'default#image',
                                    iconImageHref: myIcon,
                                    iconImageSize: [36, 36],
                                    iconImageOffset: [-18, -18]
                                  }}
                            />
                        )
                    }
                    
                })}
            </div>
                
            
    )
}

export default SetPlacemarks_posts;