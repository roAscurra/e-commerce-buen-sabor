import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Promocion from "../../../types/Promocion";

interface PromocionModalProps {
  show: boolean;
  handleClose: () => void;
  promocion: Promocion | null;
}

const PromocionModal: React.FC<PromocionModalProps> = ({ show, handleClose, promocion }) => {
  if (!promocion) return null;

  const fechaDesde = new Date(promocion.fechaDesde);
  const fechaHasta = new Date(promocion.fechaHasta);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{promocion.denominacion}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{promocion.descripcionDescuento}</p>
        <p>Precio Promocional: ${promocion.precioPromocional}</p>
        <p>Fecha Desde: {fechaDesde.toDateString()}</p>
        <p>Fecha Hasta: {fechaHasta.toDateString()}</p>
        <p>Hora Desde: {promocion.horaDesde}</p>
        <p>Hora Hasta: {promocion.horaHasta}</p>
        <p>Tipo de Promoción: {promocion.tipoPromocion}</p>
        {promocion.imagenes.length > 0 && (
          <img src={promocion.imagenes[0].url} className="img-fluid" alt={promocion.denominacion} />
        )}

        {/* Mostrar detalles de promocionDetalle si existen */}
        {promocion.promocionDetalle.length > 0 && (
          <div>
            <h5>Promoción Detalle:</h5>
            <ul>
              {promocion.promocionDetalle.map(detalle => (
                <li key={detalle.id}>
                  <p>Cantidad: {detalle.cantidad}</p>
                  <p>Artículo Manufacturado: {detalle.articuloManufacturado.denominacion}</p>
                  {/* Ajusta según la estructura de ArticuloManufacturadoShorDto */}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PromocionModal;
