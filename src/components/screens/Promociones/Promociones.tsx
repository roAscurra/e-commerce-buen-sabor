import React, { useEffect, useState } from "react";
import PromocionService from "../../../services/PromocionService";
import ItemPromocion from "./ItemPromocion";
import Promocion from "../../../types/Promocion";
import { BaseNavBar } from "../../ui/common/BaseNavBar";
import { useParams } from "react-router-dom";

const Promociones = () => {
  const [promociones, setPromociones] = useState<Promocion[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [promocionesPerPage] = useState(3); // Número de tarjetas por página
  const promocionService = new PromocionService();
  const { sucursalId } = useParams();
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      if (sucursalId) {
        const promocionData = await promocionService.getAll(url + "promocion");
        const formattedData = promocionData.map((promocion: Promocion) => ({
          ...promocion,
          fechaDesde: new Date(promocion.fechaDesde),
          fechaHasta: new Date(promocion.fechaHasta),
        }));
        setPromociones(formattedData);
      }
    };
    fetchData();
  }, [sucursalId]);

  // Calcula el índice del último elemento de la página actual
  const indexOfLastPromocion = currentPage * promocionesPerPage;
  // Calcula el índice del primer elemento de la página actual
  const indexOfFirstPromocion = indexOfLastPromocion - promocionesPerPage;
  // Obtiene las promociones de la página actual
  const currentPromociones = promociones.slice(indexOfFirstPromocion, indexOfLastPromocion);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
        <div className="row">
          {currentPromociones.map((promocion: Promocion, index) => (
            <div className="col-sm-4 mb-3" key={index}>
              <div className="promocion-card">
                <ItemPromocion
                  id={promocion.id}
                  denominacion={promocion.denominacion}
                  descripcion={promocion.descripcionDescuento}
                  precioPromocional={promocion.precioPromocional}
                  promocionObject={promocion}
                  imagenes={promocion.imagenes.map(imagen => imagen.url)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Paginación */}
      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(Math.ceil(promociones.length / promocionesPerPage))].map((_, index) => (
            <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
              <button onClick={() => paginate(index + 1)} className="page-link">
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
