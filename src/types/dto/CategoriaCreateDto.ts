import DataModel from "../DataModel";
import CategoriaShorDto from "./CategoriaShorDto";


interface CategoriaCreateDto extends DataModel<CategoriaCreateDto>{
    id: number;
    eliminado: false,
    denominacion: string,
    esInsumo: false,
    subCategoria: CategoriaShorDto[],
}

export default CategoriaCreateDto;
