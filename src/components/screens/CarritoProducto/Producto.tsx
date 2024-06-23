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
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [noProductsMessage, setNoProductsMessage] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const productosPerPage: number = 4;
    const [searchTerm, setSearchTerm] = useState<string>("");
    const url: string = import.meta.env.VITE_API_URL || ""; // Reemplazar con tu URL de API

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productData = await articuloService.getAll(url + "ecommerce");
                setProductos(productData);
                setTodosLosProductos(productData);

                const categories = await categoriaService.getAll(url + "categoria");
                setCategorias(categories);
            } catch (error) {
                console.error("Error fetching data:", error);
                setNoProductsMessage("Error al cargar los productos.");
            }
        };

        fetchData();
    }, [url]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Resetear a la primera página al buscar
    };

    useEffect(() => {
        const fetchFilteredProducts = async () => {
            try {
                if (selectedCategory !== null) {
                    const page = 0; // Página inicial para la paginación
                    const size = 10; // Tamaño de la página
                    const result = await articuloService.getArticulosByCategoria(
                        url + "ecommerce",
                        selectedCategory,
                        page,
                        size
                    );

                    const allProducts = result.content.reduce((acc, page) => acc.concat(page), []);

                    if (allProducts.length === 0) {
                        setProductos(todosLosProductos);
                        setNoProductsMessage("No hay productos para esta categoría.");
                    } else {
                        setNoProductsMessage("");
                        setProductos(allProducts);
                    }
                } else {
                    setNoProductsMessage("");
                    setProductos(todosLosProductos);
                }
            } catch (error) {
                console.error("Error fetching filtered products:", error);
                setNoProductsMessage("Error al filtrar los productos.");
            }
        };

        fetchFilteredProducts();
    }, [selectedCategory, todosLosProductos, url]);

    const handleCategoryFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setSelectedCategory(selectedValue ? parseInt(selectedValue) : null);
        setCurrentPage(1); // Resetear a la primera página al cambiar de categoría
    };

    const fetchProductSort = async () => {
        try {
            const page = 0; // Página inicial para la paginación
            const size = 10; // Tamaño de la página
            const productSorted = await articuloService.getArticulosSortedByPrecio(
                url + "ecommerce",
                page,
                size
            );

            const allSorted = productSorted.content.reduce((acc, page) => acc.concat(page), []);
            setProductos(allSorted);
        } catch (error) {
            console.error("Error sorting products by price:", error);
            setNoProductsMessage("Error al ordenar los productos por precio.");
        }
    };

    const handleSortByPrice = () => {
        fetchProductSort();
    };

    // Filtrar productos según la categoría y el término de búsqueda
    const filteredProductos = productos.filter((producto) =>
        producto.denominacion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calcular los índices para la paginación
    const indexOfLastProducto = currentPage * productosPerPage;
    const indexOfFirstProducto = indexOfLastProducto - productosPerPage;
    const currentProductos = filteredProductos.slice(indexOfFirstProducto, indexOfLastProducto);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (productos.length === 0 && noProductsMessage) {
        return (
            <>
                <BaseNavBar />
                <div
                    style={{ height: "calc(100vh - 56px)" }}
                    className="d-flex flex-column justify-content-center align-items-center w-100"
                >
                    <div>{noProductsMessage}</div>
                </div>
            </>
        );
    }

    return (
        <>
            <BaseNavBar />
            <div className="container-fluid producto-container">
                <div className="filtros-container">
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
                    <input
                        type="text"
                        placeholder="Buscar producto..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="form-control search-input"
                    />
                    <Button className="ordenar-btn" onClick={handleSortByPrice}>
                        <FontAwesomeIcon icon={faArrowUpShortWide} className="me-2" />
                        Ordenar por menor precio
                    </Button>
                </div>
                {noProductsMessage && (
                    <div className="alert alert-warning" role="alert">
                        {noProductsMessage}
                    </div>
                )}
                <div className="row">
                    {currentProductos.map((producto, index) => (
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
                <nav>
                    <ul className="pagination justify-content-center">
                        {[...Array(Math.ceil(filteredProductos.length / productosPerPage))].map(
                            (_, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${
                                        index + 1 === currentPage ? "active" : ""
                                    }`}
                                >
                                    <button
                                        onClick={() => paginate(index + 1)}
                                        className="page-link"
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            )
                        )}
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Producto;
