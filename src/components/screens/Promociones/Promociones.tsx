import React, { useEffect, useState } from "react";
import PromocionService from "../../../services/PromocionService";
import ItemPromocion from "./ItemPromocion";
import Promocion from "../../../types/Promocion";
import { BaseNavBar } from "../../ui/common/BaseNavBar";
import "./Promociones.css";
import { TipoPromocion } from "../../../types/enums/TipoPromocion";
import FilterBar from "../../ui/FilterBar/Filterbar";

const Promociones = () => {
  const [promociones, setPromociones] = useState<Promocion[]>([]);
  const [allPromociones, setAllPromociones] = useState<Promocion[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [promocionesPerPage] = useState(4); // Número de tarjetas por página
  const [searchTerm, setSearchTerm] = useState("");
  const promocionService = new PromocionService();
  const [selectedPromotionType, setSelectedPromotionType] = useState<string>("");
  const [filteredPromocionesType, setFilteredPromocionesType] = useState<Promocion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderByPrecio, setOrderByPrecio] = useState(false);
  const [originalPromociones, setOriginalPromociones] = useState<Promocion[]>([]);

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
      console.log(promociones)
      setOriginalPromociones(formattedData); // Almacena una copia original sin cambios
      setAllPromociones(formattedData);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const fetchProductSort = async () => {
    try {
      const page = 0;
      const size = 10;
      const promSorted = await promocionService.getPromocionesSortedByPrecio(url + 'ecommerce', page, size);

      const allSorted = promSorted.content.reduce((acc, page) => acc.concat(page), []);
      setAllPromociones(allSorted);
      setPromociones(allSorted);
      setSelectedPromotionType("");
      setCurrentPage(1);
    } catch (error) {
      console.error("Error al obtener promociones ordenadas por precio:", error);
    }
  };

  const handleSortByPrice = async () => {
    setOrderByPrecio(true);
    await fetchProductSort();
  };

  const handlePromotionTypeFilter = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedPromotionType(selectedValue);
    setCurrentPage(1);

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
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Desplazamiento suave
    });
  };
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    scrollToTop(); 
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Resetear a la primera página al buscar
    setOrderByPrecio(false);
  };
  if(isLoading && currentPromociones.length === 0){
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
  const handleClearFilters = () => {
    setSelectedPromotionType("");
    setSearchTerm("");
    setOrderByPrecio(false);
    setAllPromociones(originalPromociones)
    setPromociones(originalPromociones)
  };
  
  return (
<>
  <BaseNavBar />
  <div className="container-fluid promocion-container">
    <FilterBar
      selectedOption={selectedPromotionType}
      handleOptionFilter={handlePromotionTypeFilter}
      searchTerm={searchTerm}
      orderByPrecio={orderByPrecio}
      handleSearchChange={handleSearchChange}
      handleSortByPrice={handleSortByPrice}
      handleClearFilters={handleClearFilters}
      options={[
        { value: "", label: "Todas las promociones" },
        { value: TipoPromocion.HAPPY_HOUR, label: "Happy Hour" },
        { value: TipoPromocion.PROMOCION, label: "Promoción" },
        // Puedes agregar más opciones aquí si lo necesitas
      ]}
    />
    {currentPromocionesFiltered.length === 0 && searchTerm && (
      <div className="alert alert-warning" role="alert">
        Sin resultados para "{searchTerm}"
      </div>
    )}
    {filteredPromocionesType.length === 0 && selectedPromotionType && (
      <div className="alert alert-warning" role="alert">
        Sin resultados para el tipo de promoción seleccionado
      </div>
    )}
    <div className="row">
      {currentPromociones.map((promocion, index) => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
          <div className="promocion-card">
            <ItemPromocion
              denominacion={promocion.denominacion}
              precioPromocional={promocion.precioPromocional}
              promocionObject={promocion}
              imagenes={promocion.imagenes}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
  <nav>
    <ul className="pagination justify-content-center m-3">
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
