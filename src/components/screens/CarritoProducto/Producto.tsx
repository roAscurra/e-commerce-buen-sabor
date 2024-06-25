import React, { useEffect, useState } from 'react';
import { BaseNavBar } from '../../ui/common/BaseNavBar';
import ItemProducto from '../ItemProducto/ItemProducto';
import ArticuloDtoService from '../../../services/ArticuloDtoService';
import CategoriaService from '../../../services/CategoriaService';
import FilterBar from '../../ui/FilterBar/Filterbar';
import Categoria from '../../../types/Categoria';
import ArticuloDto from '../../../types/dto/ArticuloDto';
import './Producto.css';

const categoriaService = new CategoriaService();
const articuloService = new ArticuloDtoService();

const Producto = () => {
  const [productos, setProductos] = useState<ArticuloDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [noProductsMessage, setNoProductsMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productosPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState('');
  const url = import.meta.env.VITE_API_URL;
  const [orderByPrecio, setOrderByPrecio] = useState(false);
  const [originalProductos, setOriginalProductos] = useState<ArticuloDto[]>([]);
  const fetchData = async () => {
    // Obtener todas las categorías disponibles
    const categories = await categoriaService.getAll(url + 'categoria');
    setCategorias(categories);

    // Obtener la categoría seleccionada almacenada en localStorage
    const categoriaSeleccionada = localStorage.getItem('categoriaSeleccionada');
    setSelectedCategory(categoriaSeleccionada ? parseInt(categoriaSeleccionada) : null);

    // Si hay una categoría seleccionada, obtener productos por esa categoría
    if (categoriaSeleccionada !== null) {
      const page = 0;
      const size = 10;
      const result = await articuloService.getArticulosByCategoria(url + 'ecommerce', parseInt(categoriaSeleccionada), page, size);

      const allProducts = result.content.reduce((acc, page) => acc.concat(page), []);

      if (allProducts.length === 0) {
        setProductos([]);
        setNoProductsMessage('No hay productos para esta categoría.');
      } else {
        setNoProductsMessage('');
        setProductos(allProducts);
        setOriginalProductos(allProducts);
      }
    } else {
      // Si no hay categoría seleccionada, cargar todos los productos
      const productData = await articuloService.getAll(url + 'ecommerce');
      setProductos(productData);
      setOriginalProductos(productData);
    }

    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      if (selectedCategory !== null) {
        const page = 0;
        const size = 10;
        const result = await articuloService.getArticulosByCategoria(url + 'ecommerce', selectedCategory, page, size);

        const allProducts = result.content.reduce((acc, page) => acc.concat(page), []);

        if (allProducts.length === 0) {
          setProductos([]);
          setNoProductsMessage('No hay productos para esta categoría.');
        } else {
          setNoProductsMessage('');
          setProductos(allProducts);
        }
      } else {
        setNoProductsMessage('');
        setProductos(originalProductos);
      }
    };

    fetchFilteredProducts();
  }, [selectedCategory, originalProductos]);

  const handleCategoryFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue ? parseInt(selectedValue) : null);
    setCurrentPage(1);
  };

  const fetchProductSort = async () => {
    const page = 0;
    const size = 10;
    const productSorted = await articuloService.getArticulosSortedByPrecio(url + 'ecommerce', page, size);

    const allSorted = productSorted.content.reduce((acc, page) => acc.concat(page), []);

    setProductos(allSorted);
  };

  const handleSortByPrice = () => {
    setOrderByPrecio(true);
    fetchProductSort();
  };

  const filteredProductos = productos.filter((producto) =>
    producto.denominacion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProducto = currentPage * productosPerPage;
  const indexOfFirstProducto = indexOfLastProducto - productosPerPage;
  const currentProductos = filteredProductos.slice(indexOfFirstProducto, indexOfLastProducto);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    scrollToTop();
  };

  if (loading) {
    return (
      <>
        <BaseNavBar />
        <div style={{ height: 'calc(100vh - 56px)' }} className={'d-flex flex-column justify-content-center align-items-center w-100'}>
          <div className="spinner-border" role="status"></div>
          <div>Cargando los productos</div>
        </div>
      </>
    );
  }
  const handleClearFilters = () => {
    localStorage.removeItem('categoriaSeleccionada');
    setSelectedCategory(null);
    setOrderByPrecio(false);
    setSearchTerm("");
    setProductos(originalProductos);
    fetchData();
  };

  return (
    <>
      <BaseNavBar />
      <div className="container-fluid producto-container">
        <FilterBar
            selectedOption={selectedCategory}
            handleOptionFilter={handleCategoryFilter}
            searchTerm={searchTerm}
            orderByPrecio={orderByPrecio}
            handleSearchChange={handleSearchChange}
            handleSortByPrice={handleSortByPrice}
            handleClearFilters={handleClearFilters}
            options={[
              { value: '', label: 'Todas las categorías' },
              ...categorias.map((categoria) => ({ value: categoria.id.toString(), label: categoria.denominacion }))
            ]}
          />
        {noProductsMessage && (
          <div className="alert alert-warning" role="alert">
            {noProductsMessage}
          </div>
        )}
        {filteredProductos.length === 0 && searchTerm && (
          <div className="alert alert-warning" role="alert">
            Sin resultados
          </div>
        )}
        <div className="row scroll">
          {currentProductos.map((producto, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
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
        <nav>
          <ul className="pagination justify-content-center m-3">
            {[...Array(Math.ceil(filteredProductos.length / productosPerPage))].map((_, index) => (
              <li
                key={index}
                className={`page-item ${index + 1 === currentPage ? 'principal-active' : 'principal-inactive'}`}
              >
                <button onClick={() => paginate(index + 1)} className="page-link">
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Producto;
