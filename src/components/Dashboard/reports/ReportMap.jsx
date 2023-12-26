'use client'

import {FeatureGroup, MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import React from "react";
import {EditControl} from "react-leaflet-draw";
import osm from "@/helper/osm-providers";
import {useState} from "react";

export default function ReportMap(props) {
    const [center, setCenter] = useState({ lat: 35.7219, lng: 51.3347 });
    const ZOOM_LEVEL = 12;

    return(
        <>
            <div className="report-map">
                <MapContainer center={center} zoom={ZOOM_LEVEL} >
                    <TileLayer
                        url={osm.maptiler.url}
                        attribution={osm.maptiler.attribution}/>
                    <Marker position={center}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </>
    )
}