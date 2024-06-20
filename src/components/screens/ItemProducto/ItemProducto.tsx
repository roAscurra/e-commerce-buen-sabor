import Imagen from "../../../types/Imagen";
import './ItemProducto.css';
import ArticuloDto from '../../../types/dto/ArticuloDto';
import IArticuloInsumo from "../../../types/ArticuloInsumoType";
import IArticuloManufacturado from "../../../types/ArticuloManufacturado";
import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import ArticuloManufacturadoDetalle from "../../../types/ArticuloManufacturadoDetalle";

type ProductoParams = {
  id: number;
  denominacion: string;
  precioVenta: number;
  imagenes: Imagen[];
  descripcion: string;
  tiempoEstimadoMinutos: number;
  productoObject: ArticuloDto;
  insumos: IArticuloInsumo[];
  productos: IArticuloManufacturado[];
}


function ItemProducto(args: ProductoParams) {

  const hasImages = args.imagenes.length > 0;
  const [showModal, setShowModal] = useState(false)
  const [ingredientes, setIngredientes] = useState<ArticuloManufacturadoDetalle[]>([]);

  const handleVerIngredientes = () => {
    const producto = args.productos.find((prod) => prod.id === args.productoObject.id);
    if (producto) {
      setIngredientes(producto.articuloManufacturadoDetalles);
      setShowModal(true);
    }
  };

  return (
    <div className="card tarjeta">
      {hasImages && (
        <>
          <div className="image-container p-1 rounded-image">
            <img
              src={args.imagenes[0]?.url}
              className="card-img-top img-thumbnail img-custom rounded-image"
              alt={args.imagenes[0]?.name}
            />
          </div>
        </>
      )}

      <div className="card-body altura-cuerpo">
        <h5 className="card-title text-truncate">{args.denominacion}</h5>
        <div className="precio-container">
          <p className="card-text h2">$ {args.precioVenta}</p>
        </div>
        <p className={`card-text text-truncate`}>{args.descripcion}</p>
        {args.tiempoEstimadoMinutos ? (
          <>
            <p className='card-text'>Preparación: {args.tiempoEstimadoMinutos} minutos</p>
            <button
              className="btn btn-primary"
              onClick={handleVerIngredientes}
            >
              Ver ingredientes
            </button>
            <Dialog open={showModal} onClose={() => setShowModal(false)}>
              <DialogTitle>Ingredientes de {args.denominacion}</DialogTitle>
              <DialogContent>
                {/* Contenido del modal: mostrar los ingredientes */}
                {ingredientes.map((detalle) => {
                  const { articuloInsumo, cantidad } = detalle;
                  const { denominacion } = articuloInsumo.unidadMedida;
                  const unidad = denominacion.toLowerCase() === "cantidades" ? "Unidades" : denominacion;

                  return (
                    <div key={detalle.id}>
                      {articuloInsumo.denominacion}: {cantidad} {unidad}
                    </div>
                  );
                })}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowModal(false)} color="secondary">
                  Cerrar
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ) : (
          <div style={{ lineHeight: "1.5rem", height: "1.5rem" }}></div>
        )}
      </div>
    </div>
  );

}

export default ItemProducto;


