import './ItemProducto.css';
import ArticuloDto from '../../../types/dto/ArticuloDto';
import { useState } from "react";
import ArticuloManufacturadoDetalle from "../../../types/ArticuloManufacturadoDetalle";
import IngredientesModal from '../../ui/Modal/ModalIngredientes';
import { Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

type ProductoParams = {
  productoObject: ArticuloDto;
}

const ItemProducto = ({ productoObject }: ProductoParams) => {
  const [showModal, setShowModal] = useState(false);
  const [ingredientes, setIngredientes] = useState<ArticuloManufacturadoDetalle[]>([]);

  const handleVerIngredientes = () => {
    if (productoObject.articuloManufacturadoDetalles) {
      setIngredientes(productoObject.articuloManufacturadoDetalles);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  return (
    <div className="productos-container">
      <div className="card tarjeta text-center">
        <div className="img-container">
          {productoObject.imagenes && productoObject.imagenes.length > 0 ? (
            <Carousel>
              {productoObject.imagenes.map((imagen, index) => (
                <Carousel.Item key={index}>
                  <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
                    <img
                      src={imagen.url}
                      alt={`Slide ${index}`}
                      style={{ width: '100%', height: '80%', objectFit: 'cover' }}
                    />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <div className="no-image-placeholder">No hay imágenes disponibles</div>
          )}
        </div>

        <div className="card-body altura-cuerpo">
          <h5 className="card-title" title={productoObject.denominacion}>
            {productoObject.denominacion}
          </h5>
          <div className="precio-container mb-2">
            <p className="card-text h4">${productoObject.precioVenta}</p>
          </div>

          {productoObject.tiempoEstimadoMinutos ? (
            <div className="search-ingredientes-container">
              <button
                onClick={handleVerIngredientes}
                className='btn btn-principal'
              >
                <FontAwesomeIcon icon={faEye} /> Ver detalle
              </button>
            </div>
          ) : (
            <div className="search-ingredientes-container" style={{ visibility: "hidden" }}>
              <button
                className='btn btn-principal'
                disabled
              >
                Ver detalle
              </button>
            </div>
          )}
          <IngredientesModal
            open={showModal}
            onClose={handleCloseModal}
            ingredientes={ingredientes}
            product={productoObject}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemProducto;
