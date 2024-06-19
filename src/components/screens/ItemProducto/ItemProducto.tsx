import Imagen from "../../../types/Imagen";
import './ItemProducto.css';
import ArticuloDto from '../../../types/dto/ArticuloDto';
import IArticuloInsumo from "../../../types/ArticuloInsumoType";
import IArticuloManufacturado from "../../../types/ArticuloManufacturado";

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
        {args.tiempoEstimadoMinutos
            ? <p className='card-text'>Preparación: {args.tiempoEstimadoMinutos} minutos</p>
            : <div style={{lineHeight: "1.5rem", height: "1.5rem"}}></div>
        }
      </div>
    </div>
  );
}

export default ItemProducto;
