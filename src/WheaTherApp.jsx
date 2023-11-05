import { useState } from "react"

export const WheaTherApp = () => {

  const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
  const API_KEY = '7545e76f784ef76ddd72d961ce3c2cc5'
  const difKelvin = 273.15

  const [ciudad, setCiudad] = useState(' ')
  const [dataClima, setDataClima] = useState(null)

  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (ciudad.length > 0) fetchClima()
  }

  const fetchClima = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
      const data = await response.json()
      setDataClima(data)
    } catch (error) {
      console.log("Ocurrio el sigueinte error ", error)
    }
  }


  return (
    <div className="container">
      <h1>Buscador de Clima</h1>

      <form onSubmit={handleSubmit} >
        <input type="text"
          value={ciudad}
          onChange={handleCambioCiudad}
        />
        <button type="submit">Buscar</button>
      </form>
      {
        dataClima && (
          <>
            <div className="conteiner">
              <div className="caja1">
                <h2>{dataClima.name}</h2>
                <h3>{parseInt(dataClima.main.temp - difKelvin)} °C</h3>
                <p>{dataClima.weather[0].description}</p>
              </div>

              <div className="caja2">
                <img className="imgIcon" src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} />
              </div>
            </div>

          </>

        )
      }
    </div>
  )
}

