import { Route, Routes } from 'react-router-dom';
import Inicio from "../components/screens/Inicio/Inicio.tsx";
import Producto from '../components/screens/CarritoProducto/Producto.tsx';
import Promociones from '../components/screens/Promociones/Promociones.tsx';
// import {AuthenticationGuard} from "../auth0/AuthenticationGuard.tsx";


const AppRouter = () => {
  return (
    
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/productos" element={<Producto />} />
      <Route path="/promociones" element={<Promociones/>} ></Route>
    </Routes>
  );
};
export default AppRouter;