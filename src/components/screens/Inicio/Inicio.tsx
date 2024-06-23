import './Inicio.css'; // Archivo CSS para estilos personalizados
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faTags } from '@fortawesome/free-solid-svg-icons'; // Importa los iconos específicos que necesitas
import { Link } from 'react-router-dom';

export const Inicio = () => {
  return (
    <>
      <div className="inicio-container">
        <div className="contenido">
          <div className="texto">
            <h1 className='texto-principal'>El Buen Sabor</h1>
          </div>
          <div className="tarjetas-container">
            <div className="tarjeta">
              <div className="icono">
                <FontAwesomeIcon icon={faUtensils} size="3x" />
              </div>
              <div className="contenido-tarjeta">
                <h3>Productos</h3>
                <p>Descubre nuestra variedad de productos</p>
                <a className='Boton' href="/carrito">
                  Ver productos aquí
                </a>
              </div>
            </div>
            <div className="tarjeta">
              <div className="icono">
                <FontAwesomeIcon icon={faTags} size="3x" />
              </div>
              <div className="contenido-tarjeta">
                <h3>Promociones</h3>
                <p>Conoce nuestras promociones especiales</p>
                <Link className='Boton' to="/promociones">
                  Ver promociones aquí
                </Link>
              </div>
            </div>
          </div>
          <div className="texto">
            <p className='text-center m-3'>
              El Buen Sabor es un restaurante ubicado en el corazón de la ciudad, conocido por su gastronomía auténtica y ambiente acogedor.
            </p>
            <p className='text-center m-3'>
              Especializados en una fusión de cocina tradicional y contemporánea, ofrecemos platos que van desde asados y mariscos frescos hasta opciones vegetarianas saludables.
            </p>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};

export default Inicio;
