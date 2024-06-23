import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Promocion from "../../../types/Promocion";
import PromocionModal from '../../ui/Modal/PromocionModal';
import './ItemPromocion.css'; // Archivo CSS para estilos personalizados

interface ItemPromocionProps {
  id: number;
  denominacion: string;
  descripcion: string;
  precioPromocional: number;
  imagenes: string[];
  promocionObject: Promocion;
}

const ItemPromocion: React.FC<ItemPromocionProps> = ({
  denominacion,
  descripcion,
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
    
    <div className="card custom-card">
      {imagenes.length > 0 && (
        <img src={imagenes[0]} className="card-img-top" alt={denominacion} />
      )}
      <div className="card-body">
        <h5 className="card-title">{denominacion}</h5>
        <p className="card-text">{descripcion}</p>
        <p className="card-text"><strong>${precioPromocional}</strong></p>
        <button className="btn btn-primary" onClick={handleViewDetail}>
          <FontAwesomeIcon icon={faEye} /> Ver detalle
        </button>
      </div>

      <PromocionModal show={showModal} handleClose={handleCloseModal} promocion={promocionObject} />
    </div>
  );
};

export default ItemPromocion;
