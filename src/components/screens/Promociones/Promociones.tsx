import { useEffect, useState } from "react";
import PromocionService from "../../../services/PromocionService";
import ItemPromocion from "./ItemPromocion";
import Promocion from "../../../types/Promocion";
import { BaseNavBar } from "../../ui/common/BaseNavBar";
import { useParams } from "react-router-dom";

const Promociones = () => {
  const [promociones, setPromociones] = useState<Promocion[]>([]);
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
          {promociones.map((promocion: Promocion, index) => (
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
    </>
  );
};

export default Promociones;
