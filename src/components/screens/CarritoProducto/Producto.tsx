import { useEffect, useState } from "react";
import ItemProducto from "../ItemProducto/ItemProducto";
import ArticuloDto from "../../../types/dto/ArticuloDto";
import Categoria from "../../../types/Categoria";
import "./Producto.css";
import { BaseNavBar } from "../../ui/common/BaseNavBar";
import { useParams } from "react-router-dom";
import CategoriaService from "../../../services/CategoriaService";
import ArticuloDtoService from "../../../services/ArticuloDtoService";
import { Button } from "@mui/material";

const categoriaService = new CategoriaService();
const articuloService = new ArticuloDtoService();

const Producto = () => {
  const [productos, setProductos] = useState<ArticuloDto[]>([]);
  const { sucursalId } = useParams();
  const url = import.meta.env.VITE_API_URL;
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (sucursalId) {
        const sucursalIdNumber = parseInt(sucursalId);

        const productData = await articuloService.getAll(
          url + 'ecommerce'
        );

        setProductos(productData);

        const categories = await categoriaService.categoriaSucursal(url, sucursalIdNumber);
        setCategorias(categories);
        console.log(productos);
      }
    };
    fetchData();
  }, [sucursalId]);

  const handleCategoryFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue ? parseInt(selectedValue) : null);
  };

  const fetchProductSort = async () => {
    const page = 0; 
    const size = 10; 
    const productSorted = await articuloService.getArticulosSortedByPrecio(url + 'ecommerce', page, size);

    const allSorted = productSorted.content.reduce((acc, page) => acc.concat(page), []);

    setProductos(allSorted);
  };

  const handleSortByPrice = () => {
    fetchProductSort();
  };

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      if (selectedCategory !== null) {
        const page = 0; 
        const size = 10;
        const result = await articuloService.getArticulosByCategoria(url + 'ecommerce', selectedCategory, page, size);

        const allProducts = result.content.reduce((acc, page) => acc.concat(page), []);

        setProductos(allProducts);
        console.log(allProducts);
      } else {
        setProductos(productos);
      }
    };

    fetchFilteredProducts();
  }, [selectedCategory]);


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
        <Button
          className="btn btn-primary mt-3"
          onClick={handleSortByPrice}
        >
          Ordenar por menor precio
        </Button>
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
          {productos.map((producto: ArticuloDto, index) => (
            <div className="col-sm-4 mb-3" key={index}>
              <div className="producto-card">
                <ItemProducto
                  id={producto.id}
                  denominacion={producto.denominacion}
                  precioVenta={producto.precioVenta}
                  productoObject={producto}
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
