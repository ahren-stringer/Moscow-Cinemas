import React from 'react';
import { YMaps, Map, Placemark, ZoomControl } from 'react-yandex-maps';
import s from './Info.module.css'

const InfoMap = (props) => {

    return (
        <div>
            <YMaps>
                <div className={s.map}>
                    <Map
                        state={{
                            zoom: 15,
                            center: [props.infoData[0].coordinates[1], props.infoData[0].coordinates[0]],
                        }}
                        width="100%"
                    >
                        <ZoomControl />
                        <Placemark geometry={[props.infoData[0].coordinates[1], props.infoData[0].coordinates[0]]} />
                    </Map>
                </div>
            </YMaps>
        </div>
    );

}

export default InfoMap