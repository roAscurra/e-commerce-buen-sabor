import ArticuloManufacturadoDetalle from "./ArticuloManufacturadoDetalle";
// import Categoria from "./Categoria";
import DataModel from "./DataModel";
import CategoriaShorDto from "./dto/CategoriaShorDto";
// import CategoriaShorDto from "./dto/CategoriaShorDto";

interface IArticuloManufacturado extends DataModel<IArticuloManufacturado> {
    denominacion: string;
    precioVenta: number;
    descripcion: string;
    tiempoEstimadoMinutos: number;
    preparacion: string;
    articuloManufacturadoDetalles: ArticuloManufacturadoDetalle[];
    categoria: CategoriaShorDto;
}

export default IArticuloManufacturado;