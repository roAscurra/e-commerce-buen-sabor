
import IArticuloManufacturadoDetalle from "../ArticuloManufacturadoDetalle";
import ImagenArticulo from "../ImagenArticulo";
import IUnidadMedida from "../UnidadMedida";
import CategoriaShorDto from "./CategoriaShorDto";

export default class ArticuloDto {
  id: number = 0;
  eliminado: boolean = false;
  denominacion: string = "";
  precioVenta: number = 0;
  imagenes: ImagenArticulo[] = [];
  unidadMedida: IUnidadMedida;
  categoria: CategoriaShorDto;
  precioCompra: number = 0;
  stockActual: number = 0;
  stockMaximo: number = 0;
  stockMinimo: number = 0;
  esParaElaborar: boolean = false;
  descripcion: string = '';
  tiempoEstimadoMinutos: number = 0;
  preparacion: string = '';
  articuloManufacturadoDetalles: IArticuloManufacturadoDetalle[] | null;

  constructor() {
    this.unidadMedida = new IUnidadMedida();
    this.categoria = new CategoriaShorDto();
    this.articuloManufacturadoDetalles = null;
  }
}
