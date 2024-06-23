import './Inicio.css'; // Archivo CSS para estilos personalizados
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faTags } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'; // Importa los componentes necesarios de React Bootstrap

export const Inicio = () => {
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
        <div className="texto">
          <p className='text-center m-3'>
            El Buen Sabor es un restaurante ubicado en el corazón de la ciudad, conocido por su gastronomía auténtica y ambiente acogedor.
          </p>
          <p className='text-center m-3'>
            Especializados en una fusión de cocina tradicional y contemporánea, ofrecemos platos que van desde asados y mariscos frescos hasta opciones vegetarianas saludables.
          </p>
        </div>
      </Container>
      <hr />
    </Container>
  );
};

export default Inicio;
