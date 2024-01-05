'use client'

import { MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import React, {useEffect} from "react";
import {EditControl} from "react-leaflet-draw";
import osm from "@/helper/osm-providers";
import {useState} from "react";
import {  iconCar  } from '../../../../helper/icon';


const RecenterAutomatically = ({lat,lng}) => {
    const map = useMap();
    useEffect(() => {
        map.setView([lat, lng]);
    }, [lat, lng]);
    return null;
}

export default function ReportMap(props) {

    const [center, setCenter] = useState([29.120738496597934,55.33779332882627]);

    const ZOOM_LEVEL = 15;

    return(
        <>
            <div className="report-map">
                <MapContainer center={center} zoom={ZOOM_LEVEL} >
                    <TileLayer
                        url={osm.maptiler.url}
                        attribution={osm.maptiler.attribution}/>
                    <Marker position={center} icon={ iconCar }>
                    </Marker>
                </MapContainer>
            </div>
        </>
    )
}

