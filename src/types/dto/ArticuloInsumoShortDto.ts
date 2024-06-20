import DataModel from "../DataModel";
import CategoriaShorDto from "./CategoriaShorDto";


interface IArticuloInsumoShortDto extends DataModel<IArticuloInsumoShortDto>{
    id: number;
    denominacion: string;
    eliminado: boolean;
    precioVenta: number;
    precioCompra: number;
    stockActual: number;
    stockMaximo: number;
    stockMinimo: number;
    esParaElaborar: boolean;
    categoria: CategoriaShorDto;
}

export default IArticuloInsumoShortDto;