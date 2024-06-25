import { useEffect, useState } from 'react';
import './Inicio.css'; // Archivo CSS para estilos personalizados
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faTags } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'; // Importa los componentes necesarios de React Bootstrap
import Categoria from '../../../types/Categoria';
import CategoriaService from '../../../services/CategoriaService';

export const Inicio = () => {
  const url = import.meta.env.VITE_API_URL;
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [cargando, setCargando] = useState(true); // Estado para manejar la carga
  const categoriaService = new CategoriaService();
  localStorage.removeItem('categoriaSeleccionada');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await categoriaService.getAll(url + "categoria");
        setCategorias(categories);
      } catch (error) {
        console.error('Error fetching categorias:', error);
      } finally {
        setCargando(false); // Cambiar el estado de carga a false una vez que los datos se han obtenido
      }
    };

    fetchData();
  }, []);

  const handleClickCategoria = (categoriaId: number) => {
    localStorage.setItem('categoriaSeleccionada', categoriaId.toString());
    window.location.href = '/productos';
  };
  return (
    <Container fluid className="inicio-container">
      <Container className="contenido">
        {cargando && categorias.length === 0 ? (
          <div style={{ height: 'calc(100vh - 56px)' }} className={'d-flex flex-column justify-content-center align-items-center w-100'}>
            <div className="spinner-border" role="status"></div>
            <div>Cargando...</div>
          </div>
        ) : (
          <>
            <div className="texto">
              <h1 className='text-center'>El Buen Sabor</h1>
            </div>
            <Row className="tarjetas-container m-3">
              <Col xs={12} md={6} className="mb-4">
                <Card className="tarjeta">
                  <Card.Body className='text-center'>
                    <div className="icono">
                      <FontAwesomeIcon icon={faUtensils} size="3x" />
                    </div>
                    <Card.Title>Productos</Card.Title>
                    <Card.Text>Descubre nuestra variedad de productos</Card.Text>
                    <Button className="Boton" href="/productos">
                      Ver productos aquí
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={6} className="mb-4">
                <Card className="tarjeta">
                  <Card.Body className='text-center'>
                    <div className="icono text-center">
                      <FontAwesomeIcon icon={faTags} size="3x" />
                    </div>
                    <Card.Title>Promociones</Card.Title>
                    <Card.Text>Conoce nuestras promociones especiales</Card.Text>
                    <Button className="Boton" href="/promociones">
                      Ver promociones aquí
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="categorias-container m-3">
              <div className="texto">
                <h3 className='text-center'>Categorías</h3>
              </div>
              {categorias.map((categoria) => (
                <Col key={categoria.id} xs={6} md={4} lg={3} className="mb-4">
                  <div className="card tarjeta categoria-card h-100 text-center" onClick={() => handleClickCategoria(categoria.id)}>
                    <div className="card-body d-flex flex-column justify-content-center align-items-center">
                      <p><b>{categoria.denominacion}</b></p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
      <hr />
    </Container>
  );
  
};

export default Inicio;
