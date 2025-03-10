// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import Spinner from "./Spinner";
import Message from './Message'
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = `https://api.bigdatacloud.net/data/reverse-geocode-client`

function Form() {
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState('')
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition()
  const [isLoadingGeo, setIsLoadingGeo] = useState(false)
  const [emoji, setEmoji] = useState("")
  const [getCodingError, setGeoCodingError] = useState()
  const { createCity, isLoading } = useCities()
  const navigate = useNavigate()
  useEffect(function () {
    if (!lat || !lng) {
      return;
    }
    async function fetchCityData() {
      try {
        setIsLoadingGeo(true)
        setGeoCodingError('')
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        const data = await res.json()

        if (!data.countryCode) {
          throw new Error('Click somewhere else')
        }
        setCityName(data.city || data.locality)
        setCountryName(data.countryName)
        setEmoji(convertToEmoji(data.countryCode))

      }
      catch (err) {
        setGeoCodingError(err.message)
      } finally {
        setIsLoadingGeo(false)
      }
    }
    fetchCityData()
  }, [lat, lng])

  if (isLoadingGeo) {
    return <Spinner />
  }
  if (!lat || !lng) {
    <Message message='Start by clicking somewhere on the map'></Message>
  }
  if (getCodingError) {
    return <Message message={getCodingError}></Message>
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) {
      return;
    }
    const newCity = {
      cityName,
      country: countryName,
      emoji,
      date,
      notes,
      position: {
        lat, lng
      }
    }
    await createCity(newCity)
    navigate('/app/cities')

  }

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ''}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker selected={date} onChange={(date) => setDate(date)} dateFormat='dd/MM/yyyy' />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={'primary'}>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
