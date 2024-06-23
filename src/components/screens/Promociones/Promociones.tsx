import React, { useEffect, useState } from "react";
import PromocionService from "../../../services/PromocionService";
import ItemPromocion from "./ItemPromocion";
import Promocion from "../../../types/Promocion";
import { BaseNavBar } from "../../ui/common/BaseNavBar";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpShortWide } from "@fortawesome/free-solid-svg-icons";
import "./Promociones.css";
import { TipoPromocion } from "../../../types/enums/TipoPromocion";

const Promociones = () => {
  const [promociones, setPromociones] = useState<Promocion[]>([]);
  const [allPromociones, setAllPromociones] = useState<Promocion[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [promocionesPerPage] = useState(3); // Número de tarjetas por página
  const [searchTerm, setSearchTerm] = useState("");
  const promocionService = new PromocionService();
  const [selectedPromotionType, setSelectedPromotionType] = useState<string>("");
  const [filteredPromocionesType, setFilteredPromocionesType] = useState<Promocion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const promocionData = await promocionService.getAll(url + "promocion");
      const formattedData = promocionData.map((promocion: Promocion) => ({
        ...promocion,
        fechaDesde: new Date(promocion.fechaDesde),
        fechaHasta: new Date(promocion.fechaHasta),
      }));
      setPromociones(formattedData);
      console.log(promociones);
      setAllPromociones(formattedData);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const fetchProductSort = async () => {
    try {
      setIsLoading(true);
      const page = 0;
      const size = 10;
      const promSorted = await promocionService.getPromocionesSortedByPrecio(url + 'ecommerce', page, size);

      const allSorted = promSorted.content.reduce((acc, page) => acc.concat(page), []);
      setAllPromociones(allSorted);
      setPromociones(allSorted);
      setSelectedPromotionType("");
      setCurrentPage(1);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error al obtener promociones ordenadas por precio:", error);
    }
  };

  const handleSortByPrice = async () => {
    await fetchProductSort();
  };

  const handlePromotionTypeFilter = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedPromotionType(selectedValue);
    setCurrentPage(1);
    setIsLoading(true);

    if (selectedValue) {
      try {
        const page = 0;
        const size = 10;
        const promocionesByTipo = await promocionService.getPromocionesByTipo(url + 'ecommerce', selectedValue, page, size);
        const allPromotions = promocionesByTipo.content.reduce((acc, page) => acc.concat(page), []);
        setFilteredPromocionesType(allPromotions);
      } catch (error) {
        console.error("Error al obtener promociones por tipo:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setFilteredPromocionesType([]); // Si no hay tipo seleccionado, vaciar las promociones filtradas
      setIsLoading(false);
    }
  };

  const currentPromocionesFiltered = selectedPromotionType
    ? filteredPromocionesType.filter((promocion) =>
        promocion.denominacion.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allPromociones.filter((promocion) =>
        promocion.denominacion.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const indexOfLastPromocion = currentPage * promocionesPerPage;
  const indexOfFirstPromocion = indexOfLastPromocion - promocionesPerPage;

  const currentPromociones = currentPromocionesFiltered.slice(indexOfFirstPromocion, indexOfLastPromocion);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Resetear a la primera página al buscar
  };
  if(isLoading){
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
        <div className="d-flex align-items-center mt-3 mb-3 justify-content-center filter-container">
          <select
            value={selectedPromotionType}
            onChange={handlePromotionTypeFilter}
            className="form-select filter-select"
          >
            <option value="">Todas las promociones</option>
            <option value={TipoPromocion.HAPPY_HOUR}>Happy Hour</option>
            <option value={TipoPromocion.PROMOCION}>Promoción</option>
          </select>
          <input
            type="text"
            placeholder="Buscar promoción..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="form-control search-input"
          />
          <Button className="ordenar-btn" onClick={handleSortByPrice}>
            <FontAwesomeIcon icon={faArrowUpShortWide} className="me-2" />
            Ordenar por menor precio
          </Button>
        </div>
        {currentPromocionesFiltered.length === 0 && searchTerm && (
          <div className="alert alert-warning" role="alert">
            Sin resultados para "{searchTerm}"
          </div>
        )}
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
          {[...Array(Math.ceil(currentPromocionesFiltered.length / promocionesPerPage))].map(
            (_, index) => (
              <li
                key={index}
                className={`page-item ${index + 1 === currentPage ? "principal-active" : "principal-inactive"}`}
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
    </>
  );
};

export default Promociones;
