
class Weather {
  
    constructor(city, countryCode) {
      this.apiKey = '9b3f9ad62969d17e1180532cfa594f79';
      this.city = city;
      this.countryCode = countryCode;
      //console.log(this.city)
      //console.log(this.countryCode)
    }
  
    async getWeather() {
      const URI = `https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.countryCode}&units=metric&lang=sp&appid=${this.apiKey}`;

      /*https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=439d4b804bc8187953eb36d2a8c26a02
       /*Me registré con el nombre davidCutreCoder, sanfelipillo 765 */
      const response = await fetch(URI);
      const data = await response.json();
      //console.log (data)
      return data;
    }
  
    changeLocation(city, countryCode) {
      this.city = city;
      this.countryCode = countryCode;
    }
  
  }// class Weather
  
  class UI
  {
    constructor ()
        {
          this.titCiudadPais=document.getElementById("ciudad-pais")
          this.titNubosidad = document.getElementById ("nubosidad")
          this.titTemperatura = document.getElementById("temperatura")
          this.liHumedad = document.getElementById("humedad")
          this.liViento = document.getElementById("viento")
        }

    render (clima)
        {
          console.log (clima)
          this.titCiudadPais.textContent = clima.name +' / ' + clima.sys.country
          this.titNubosidad.textContent = clima.weather[0]['description']
          this.titTemperatura.textContent = 'Temperatura: ' + clima.main.temp + ' °C'
          this.liHumedad.textContent = 'Humedad: ' + clima.main.humidity + ' %'
          this.liViento.textContent = 'Vientos: ' + clima.wind.speed+ ' m/s'
        }
  }

  class Store
  {
      constructor()
        {
          this.city
          this.countryCode
        }

      getLocationData()
        {
          if (localStorage.getItem ('city') === null)
            {
              this.city = 'Mexico City'
            }
          else
            {
              this.city= localStorage.getItem ('city')
            }

          if (localStorage.getItem ('countryCode') === null)
            {
              this.countryCode = 'MX'
            }
          else
            {
              this.countryCode= localStorage.getItem ('countryCode')
            }

          return {
            city: this.city,
            countryCode: this.countryCode
          }
        } //getLocationData() 

        setLocationData (city, countryCode)
          {
            localStorage.setItem ('city', city)
            localStorage.setItem ('countryCode', countryCode)
          }
  }// class Storage
  
  let storage = new Store ()
  const {city, countryCode} = storage.getLocationData()
  const clima = new Weather (city, countryCode)
  let ui = new UI()

  async function obtenerClima ()
      {
        let datosClima = await clima.getWeather()
        console.log('dentro de obtenerClima()')
        console.log (datosClima)
        //Pasamos los datos del clima al render de ui
        ui.render (datosClima)
      }

  document.getElementById ('boton').addEventListener ('click',(e)=>{
    e.preventDefault()
    const city = document.getElementById("city").value
    console.log (city)
    const countryCode = document.getElementById('country-code').value
    console.log (countryCode)
    //let clima = new Weather (city, countryCode)
    clima.changeLocation (city, countryCode)
    //console.log (clima)
    storage.setLocationData (city, countryCode)
    obtenerClima() 
  })    
  
  document.addEventListener('DOMContentLoaded', obtenerClima)