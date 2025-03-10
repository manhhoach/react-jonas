import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { useCities } from '../contexts/CitiesContext'
import { useGeolocation } from '../hooks/useGeolocation'
import Button from './Button'
import { useUrlPosition } from '../hooks/useUrlPosition'



export default function Map() {

   const [mapPosition, setMapPosition] = useState([40, 0])
   const { cities } = useCities()
   const { isLoading: isLoadingGeo, position: positionGeo, getPosition } = useGeolocation()
   const [mapLat, mapLng] = useUrlPosition()

   useEffect(function () {
      if (mapLat && mapLng) {
         setMapPosition([mapLat, mapLng])
      }
   }, [mapLat, mapLng])


   useEffect(function () {
      if (positionGeo) {
         setMapPosition([positionGeo.lat, positionGeo.lng])
      }
   }, [positionGeo])

   return <div className={styles.mapContainer}>
      <Button type='position' onClick={getPosition}>
         {isLoadingGeo ? 'Loading...' : 'Use your position'}
      </Button>
      <MapContainer className={styles.map} center={[mapLat || 40, mapLng || 0]} zoom={13} scrollWheelZoom={true}>
         <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
         />
         {
            cities.map(citi =>
               <Marker key={citi.id} position={[citi.position.lat, citi.position.lng]}>
                  <Popup>
                  </Popup>
               </Marker>)
         }
         <ChangeCenter position={mapPosition} />
         <DetectClick />
      </MapContainer>
   </div>
}

function ChangeCenter({ position }) {
   const map = useMap()
   map.setView(position)
   return null
}

function DetectClick() {
   const navigate = useNavigate()
   useMapEvents({
      click: e => {
         navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
      }
   })
}