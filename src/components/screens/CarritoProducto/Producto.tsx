import { useEffect, useState } from "react";
import ArticuloManufacturadoService from "../../../services/ArticuloManufacturadoService";
import ItemProducto from "../ItemProducto/ItemProducto";
import ArticuloDto from "../../../types/dto/ArticuloDto";
import ArticuloInsumoService from "../../../services/ArticuloInsumoService";
import Categoria from "../../../types/Categoria";
import "./Producto.css";
import { BaseNavBar } from "../../ui/common/BaseNavBar";
import IArticuloInsumo from "../../../types/ArticuloInsumoType";
import IArticuloManufacturado from "../../../types/ArticuloManufacturado";
import { useParams } from "react-router-dom";
import CategoriaService from "../../../services/CategoriaService";

const Producto = () => {
  const [productos, setProductos] = useState<ArticuloDto[]>([]);
  const productoService = new ArticuloManufacturadoService();
  const articuloInsumoService = new ArticuloInsumoService();
  const {sucursalId} = useParams();
  const url = import.meta.env.VITE_API_URL;
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [articuloInsumo, setArticuloInsumo] = useState<IArticuloInsumo[]>([]);
  const [articuloManufacturado, setArticuloManufacturado] = useState<
    IArticuloManufacturado[]
  >([]);
  const categoriaService = new CategoriaService();

  useEffect(() => {
    const fetchData = async () => {
      if(sucursalId){
        const sucursalIdNumber = parseInt(sucursalId); // Convertir sucursalId a número si es una cadena

        const productData = await productoService.manufacturados(
          url, sucursalIdNumber
        );
        const insumData = await articuloInsumoService.insumos(
          url, sucursalIdNumber
        );
  
        // Filtrar los productos manufacturados y los insumos
        const insumos = insumData.filter((insumo) => !insumo.esParaElaborar);
        setArticuloManufacturado(productData);
        setArticuloInsumo(insumos);
        // Combinar los productos manufacturados y los insumos en un solo array
  
        const combinedData = [...productData, ...insumos];

        const categories = await categoriaService.categoriaSucursal(url, sucursalIdNumber);
        setCategorias(categories)

        const mergedProducts = combinedData.map((value) => ({
          id: value.id,
          categoria: value.categoria,
          denominacion: value.denominacion,
          precioVenta: value.precioVenta,
          eliminado: value.eliminado,
          imagen: value.imagenes[0] || undefined,
          precioCompra: 0,
          stockActual: 0,
          stockMaximo: 0,
          tiempoEstimadoMinutos: value.tiempoEstimadoMinutos || 0,
          unidadMedida: value.unidadMedida,
        }));
  
        setProductos(mergedProducts);
      }
    };
    fetchData();
  }, []);

  const handleCategoryFilter = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(event)
    const selectedValue = event.target.value;
    console.log(selectedValue)
    setSelectedCategory(selectedValue ? parseInt(selectedValue) : null);
  };

  const filteredProducts = selectedCategory
    ? productos.filter((producto) => producto.categoria.id === selectedCategory)
    : productos;
  {
    filteredProducts.map((_producto: ArticuloDto, index) => (
      <div className="col-sm-3 mb-3" key={index}>
        {/* Contenido del producto */}
      </div>
    ));
  }
  if (productos.length === 0) {
    return (
      <>
        <BaseNavBar />
        <div
          style={{ height: "calc(100vh - 56px)" }}
          className={
            "d-flex flex-column justify-content-center align-items-center w-100"
          }
        >
          <div className="spinner-border" role="status"></div>
          <div>Cargando los productos</div>
        </div>
      </>
    );
  }

  return (
    <>
      <BaseNavBar />
      <div className="container-fluid producto-container">
              <select
                className="w-100 form-control custom-select mt-3"
                onChange={handleCategoryFilter}
              >
                <option value="">Todas las categorías</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.denominacion}
                  </option>
                ))}
              </select>
              <div className="row">
                {filteredProducts.map((producto: ArticuloDto, index) => (
                  <div className="col-sm-4 mb-3" key={index}>
                    <div className="producto-card">
                      <ItemProducto
                        id={producto.id}
                        denominacion={producto.denominacion}
                        descripcion=""
                        precioVenta={producto.precioVenta}
                        imagenes={[producto.imagen]}
                        tiempoEstimadoMinutos={producto.tiempoEstimadoMinutos}
                        productoObject={producto}
                        insumos={articuloInsumo}
                        productos={articuloManufacturado}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
    </>
  );
};

export default Producto;
