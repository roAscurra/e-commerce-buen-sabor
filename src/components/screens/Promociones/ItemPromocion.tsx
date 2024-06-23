import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Promocion from "../../../types/Promocion";
import PromocionModal from '../../ui/Modal/PromocionModal';
import './ItemPromocion.css'; // Archivo CSS para estilos personalizados
import { Carousel } from 'react-bootstrap';

interface ItemPromocionProps {
  denominacion: string;
  precioPromocional: number;
  imagenes: any[];
  promocionObject: Promocion;
}

const ItemPromocion: React.FC<ItemPromocionProps> = ({
  denominacion,
  precioPromocional,
  imagenes,
  promocionObject
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleViewDetail = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="productos-container">
      <div className="card tarjeta">
        <div className="img-container">
          {imagenes.length > 0 && (
            <Carousel>
              {imagenes.map((imagen, index) => (
                <Carousel.Item key={index}>
                  <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
                    <img
                      src={imagen.url}
                      alt={`Slide ${index}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </div>
        <div className="card-body altura-cuerpo">
          <h5 className="card-title text-truncate" title={denominacion}>{denominacion}</h5>
          <p className="card-text h4">$ {precioPromocional}</p>
          <button className="btn btn-principal" onClick={handleViewDetail}>
            <FontAwesomeIcon icon={faEye} /> Ver detalle
          </button>
        </div>
      </div>

      <PromocionModal show={showModal} handleClose={handleCloseModal} promocion={promocionObject} />
    </div>
  );
};

export default ItemPromocion;
