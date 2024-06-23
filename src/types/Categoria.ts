import DataModel from "./DataModel";
import CategoriaShorDto from "./dto/CategoriaShorDto";

interface Categoria extends DataModel<Categoria>{
    denominacion: string,
    esInsumo: false,
    subCategorias: CategoriaShorDto[],
}

export default Categoria;