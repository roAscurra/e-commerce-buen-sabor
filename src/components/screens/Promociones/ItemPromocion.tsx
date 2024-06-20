import React, { useState } from 'react';
import Promocion from "../../../types/Promocion";
import PromocionModal from '../../ui/Modal/PromocionModal';

interface ItemPromocionProps {
  id: number;
  denominacion: string;
  descripcion: string;
  precioPromocional: number;
  imagenes: string[];
  promocionObject: Promocion;
}

const ItemPromocion: React.FC<ItemPromocionProps> = ({
  id,
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
    <div className="card">
      {imagenes.length > 0 && (
        <img src={imagenes[0]} className="card-img-top" alt={denominacion} />
      )}
      <div className="card-body">
        <h5 className="card-title">{denominacion}</h5>
        <p className="card-text">{descripcion}</p>
        <p className="card-text"><strong>${precioPromocional}</strong></p>
        <button className="btn btn-primary" onClick={handleViewDetail}>
          Ver detalle
        </button>
      </div>

      <PromocionModal show={showModal} handleClose={handleCloseModal} promocion={promocionObject} />
    </div>
  );
};

export default ItemPromocion;
