import React, { useEffect, useState } from "react";
import PromocionService from "../../../services/PromocionService";
import ItemPromocion from "./ItemPromocion";
import Promocion from "../../../types/Promocion";
import { BaseNavBar } from "../../ui/common/BaseNavBar";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpShortWide } from "@fortawesome/free-solid-svg-icons";
import './Promociones.css';

const Promociones = () => {
  const [promociones, setPromociones] = useState<Promocion[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [promocionesPerPage] = useState(3); // Número de tarjetas por página
  const [searchTerm, setSearchTerm] = useState("");
  const promocionService = new PromocionService();
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
        const promocionData = await promocionService.getAll(url + "promocion");
        const formattedData = promocionData.map((promocion: Promocion) => ({
          ...promocion,
          fechaDesde: new Date(promocion.fechaDesde),
          fechaHasta: new Date(promocion.fechaHasta),
        }));
        setPromociones(formattedData);
    };
    fetchData();
  }, []);

  const fetchProductSort = async () => {
    const page = 0;
    const size = 10;
    const promSorted = await promocionService.getPromocionesSortedByPrecio(url + 'ecommerce', page, size);

    const allSorted = promSorted.content.reduce((acc, page) => acc.concat(page), []);

    setPromociones(allSorted);
  };

  const handleSortByPrice = () => {
    fetchProductSort();
  };

  const indexOfLastPromocion = currentPage * promocionesPerPage;
  const indexOfFirstPromocion = indexOfLastPromocion - promocionesPerPage;
  
  // Filtrar promociones según el término de búsqueda
  const filteredPromociones = promociones.filter((promocion) =>
    promocion.denominacion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentPromociones = filteredPromociones.slice(indexOfFirstPromocion, indexOfLastPromocion);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Resetear a la primera página al buscar
  };
  

  if (promociones.length === 0) {
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
          <div>Cargando las promociones</div>
        </div>
      </>
    );
  }

  return (
    <>
      <BaseNavBar />
      <div className="container-fluid promocion-container">
        <div className="d-flex align-items-center mt-3 mb-3 justify-content-center">
          <input
            type="text"
            placeholder="Buscar promoción..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="form-control search-input me-3"
          />
          <Button className="ordenar-btn" onClick={handleSortByPrice}>
            <FontAwesomeIcon icon={faArrowUpShortWide} className="me-2" />
            Ordenar por menor precio
          </Button>
        </div>
        <div className="row">
          {currentPromociones.map((promocion, index) => (
            <div className="col-sm-4 mb-3" key={index}>
              <div className="promocion-card">
                <ItemPromocion
                  id={promocion.id}
                  denominacion={promocion.denominacion}
                  descripcion={promocion.descripcionDescuento}
                  precioPromocional={promocion.precioPromocional}
                  promocionObject={promocion}
                  imagenes={promocion.imagenes.map((imagen) => imagen.url)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <nav>
        <ul className="pagination justify-content-center">
          {[
            ...Array(
              Math.ceil(filteredPromociones.length / promocionesPerPage)
            ),
          ].map((_, index) => (
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
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Promociones;
