import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/Header';
import Formulario  from './components/Formulario';
import Clima  from './components/Clima';
import Error  from './components/Error';

function App() {

  /**
     * State del principal para guardar la busqueda
     */
    const [busqueda,guardarBusqueda] = useState({
      ciudad: '',
      pais: ''
  });

  /**
   * State para saber cuando lanzar la consulta a la API
   */
  const [consultar,guardarConsultar] = useState(false)

  /**
   * State para guardar la respuesta de la api
   */

  const [resultado, guardarResultado] = useState({
  })

  /**
   * State para manejar errores en la api
   */
  const [error, guardarError] = useState(false);

  const {ciudad,pais} = busqueda;

  useEffect(() => {

   if(consultar) {
    const consultarApi = async() => {

      const appId = '';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
      
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarResultado(resultado);
      guardarConsultar(false);

      if(resultado.cod === "404") {
        guardarError(true);
      } else{
        guardarError(false);
      }
    }
    consultarApi();
   }
   //eslint-disable-next-line
  }, [consultar]);

  let componente; 
  if(error) {
    componente = <Error  mensaje= "No hay resultados" />;
  } else {
    componente = <Clima resultado={resultado} />
  }

  return (
    <Fragment>
      <Header titulo="Clima React App"/>
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario 
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
