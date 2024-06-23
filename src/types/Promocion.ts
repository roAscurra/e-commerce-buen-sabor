import DataModel from "./DataModel";
import Imagen from "./Imagen";
import PromocionDetalle from "./PromocionDetalle";

interface Promocion extends DataModel<Promocion>{
  denominacion: string,
  fechaDesde: Date,
  fechaHasta: Date,
  horaDesde: string,
  horaHasta: string,
  descripcionDescuento: string,
  precioPromocional: number,
  tipoPromocion: string,
  imagenes: Imagen[],
  promocionDetalle: PromocionDetalle[]
}
export default Promocion;
