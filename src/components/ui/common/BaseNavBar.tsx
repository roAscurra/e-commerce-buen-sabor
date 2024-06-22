import './BaseNavBar.css'; // Importa tu archivo CSS personalizado
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTags } from '@fortawesome/free-solid-svg-icons'; // Importa los iconos que necesites

export const BaseNavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
      <div className="container-fluid ms-3">
        <a className="navbar-brand text-white" href="/inicio">
          Buen Sabor
        </a>
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link active text-white"
                aria-current="page"
                href="/carrito"
              >
                <FontAwesomeIcon icon={faShoppingCart} className="icon" /> {/* Icono para 'Productos' */}
                Productos
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active text-white"
                aria-current="page"
                href="/promociones"
              >
                <FontAwesomeIcon icon={faTags} className="icon" /> {/* Icono para 'Promociones' */}
                Promociones
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
