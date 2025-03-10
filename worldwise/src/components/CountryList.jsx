import CountryItem from './CountryItem'
import styles from './CountryList.module.css'
import Spinner from './Spinner'
import Message from './Message'
import { useCities } from '../contexts/CitiesContext'

export default function CountryList() {
   const { cities, isLoading } = useCities()
   if (isLoading) {
      return <Spinner></Spinner>
   }
   if (!cities.length) {
      return <Message message='Add your first city by clicking on a city on the map'></Message>
   }
   const countries = Array.from(
      new Map(cities.map(city => [`${city.country}-${city.emoji}`, { country: city.country, emoji: city.emoji }])).values()
   );
   return (
      <ul className={styles.countryList}>
         {countries.map(country => <CountryItem key={country.country} country={country} />)}
      </ul>
   )
}