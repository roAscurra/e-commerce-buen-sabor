import { useEffect, useState } from "react";
import ItemProducto from "../ItemProducto/ItemProducto";
import ArticuloDto from "../../../types/dto/ArticuloDto";
import Categoria from "../../../types/Categoria";
import "./Producto.css";
import { BaseNavBar } from "../../ui/common/BaseNavBar";
import CategoriaService from "../../../services/CategoriaService";
import ArticuloDtoService from "../../../services/ArticuloDtoService";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpShortWide } from "@fortawesome/free-solid-svg-icons";

const categoriaService = new CategoriaService();
const articuloService = new ArticuloDtoService();

const Producto = () => {
  const [productos, setProductos] = useState<ArticuloDto[]>([]);
  const [todosLosProductos, setTodosLosProductos] = useState<ArticuloDto[]>([]);
  const url = import.meta.env.VITE_API_URL;
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const productData = await articuloService.getAll(url + 'ecommerce');
      setProductos(productData);
      setTodosLosProductos(productData); // Guardamos todos los productos aquí

      const categories = await categoriaService.getAll(url + "categoria");
      setCategorias(categories);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      if (selectedCategory !== null) {
        const page = 0;
        const size = 10;
        const result = await articuloService.getArticulosByCategoria(url + 'ecommerce', selectedCategory, page, size);

        const allProducts = result.content.reduce((acc, page) => acc.concat(page), []);

        if (allProducts.length === 0) {
          setProductos(todosLosProductos);  // Si no hay productos en la categoría, mostramos todos los productos
        } else {
          setProductos(allProducts);
        }
      } else {
        setProductos(todosLosProductos);  // Si la categoría es "Todas las categorías", mostramos todos los productos
      }
    };

    fetchFilteredProducts();
  }, [selectedCategory]);

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
        <div className="d-flex align-items-center mt-3 mb-3 justify-content-center">
          <select
            className="form-control custom-select filtro-categoria"
            onChange={handleCategoryFilter}
          >
            <option value="">Todas las categorías</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.denominacion}
              </option>
            ))}
          </select>
          <Button
            className="ordenar-btn ms-3"
            onClick={handleSortByPrice}
          >
            <FontAwesomeIcon icon={faArrowUpShortWide} className="me-2" />
            Ordenar por menor precio
          </Button>
        </div>
        <div className="row">
          {productos.map((producto, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3" key={index}>
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
