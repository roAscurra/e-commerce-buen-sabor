import './ItemProducto.css';
import ArticuloDto from '../../../types/dto/ArticuloDto';
import { useState } from "react";
import { Button } from "@mui/material";
import ArticuloManufacturadoDetalle from "../../../types/ArticuloManufacturadoDetalle";
import IngredientesModal from '../../ui/Modal/ModalIngredientes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

type ProductoParams = {
  id: number;
  denominacion: string;
  precioVenta: number;
  productoObject: ArticuloDto;
}
const ItemProducto = (args: ProductoParams) => {
  const [showModal, setShowModal] = useState(false);
  const [ingredientes, setIngredientes] = useState<ArticuloManufacturadoDetalle[]>([]);

  const handleVerIngredientes = () => {
    if (args.productoObject.articuloManufacturadoDetalles) {
      setIngredientes(args.productoObject.articuloManufacturadoDetalles);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="card tarjeta">
      {args.productoObject.imagenes && args.productoObject.imagenes.length > 0 && (
        <img src={args.productoObject.imagenes[0].url} className="card-img-top" alt={args.denominacion} />
      )}

      <div className="card-body altura-cuerpo">
        <h5 className="card-title text-truncate">{args.denominacion}</h5>
        <div className="precio-container">
          <p className="card-text h2">$ {args.precioVenta}</p>
        </div>

        {args.productoObject.tiempoEstimadoMinutos > 0 && (
          <>
            <p className="card-text">Tiempo de preparación: {args.productoObject.tiempoEstimadoMinutos} minutos</p>
            <button className='btn-ingredientes'  onClick={handleVerIngredientes}>
          <FontAwesomeIcon icon={faEye} />  Ver detalle
        </button>

          </>
        )}
        <IngredientesModal 
        open={showModal}
        onClose={handleCloseModal}
        ingredientes={ingredientes}
        product={args.productoObject}
        />
      </div>
    </div>
  );
};

export default ItemProducto;