import React, { useEffect, useState } from 'react';
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
        console.log("")
      }
    };

    fetchData();
  }, []);
  const handleClickCategoria = (categoriaId: number) => {
    localStorage.setItem('categoriaSeleccionada', categoriaId.toString());
    window.location.href = '/carrito';
  };
  return (
    <Container fluid className="inicio-container">
      <Container className="contenido">
        <div className="texto">
          <h1 className='texto-principal'>El Buen Sabor</h1>
        </div>
        <Row className="tarjetas-container m-3">
          <Col xs={12} md={6} className="mb-4">
            <Card className="tarjeta">
              <Card.Body>
                <div className="icono">
                  <FontAwesomeIcon icon={faUtensils} size="3x" />
                </div>
                <Card.Title>Productos</Card.Title>
                <Card.Text>Descubre nuestra variedad de productos</Card.Text>
                <Button className="Boton" href="/carrito">
                  Ver productos aquí
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} className="mb-4">
            <Card className="tarjeta">
              <Card.Body>
                <div className="icono">
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
          {categorias.map((categoria) => (
            <Col key={categoria.id} xs={6} md={4} lg={3} className="mb-4">
              <Card className="tarjeta categoria-card h-100 text-center" onClick={() => handleClickCategoria(categoria.id)}>
                <Card.Body className="d-flex flex-column justify-content-center">
                  <Card.Title className="card-title h6">{categoria.denominacion}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <hr />
    </Container>
  );
};

export default Inicio;
