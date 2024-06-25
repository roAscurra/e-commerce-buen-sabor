import React from "react";
import { Modal, Button, Row, Col, Card, Carousel } from "react-bootstrap";
import Promocion from "../../../types/Promocion";

interface PromocionModalProps {
  show: boolean;
  handleClose: () => void;
  promocion: Promocion | null;
}

const PromocionModal: React.FC<PromocionModalProps> = ({
  show,
  handleClose,
  promocion,
}) => {
  if (!promocion) return null;

  // Concatenar los detalles de la promoción en un solo texto
  const detallesPromocion = promocion.promocionDetalle.map(
    (detalle) =>
      `${detalle.cantidad} ${detalle.articulo.denominacion.toLocaleLowerCase()}`
  ).join(",");

  const imageUrlArray = promocion.imagenes?.map(image => image.url) || [];

  return (
  <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton>
      <Modal.Title style={{ color: "#5d8ec7", textAlign: "center", width: "100%" }}>
        {promocion.denominacion}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Carousel>
        {imageUrlArray.map((url, index) => (
          <Carousel.Item key={index}>
            <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
              <img
                src={url}
                alt={`Slide ${index}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      <Row>
        <Col xs={12} md={12}>
          <Card>
            <Card.Body>
              <Card.Text>
                {promocion.descripcionDescuento}
              </Card.Text>
              <Row>
                <Col xs={6}>
                  <strong>Inicia:</strong> {promocion.horaDesde} hrs
                </Col>
                <Col xs={6}>
                  <strong>Finaliza:</strong> {promocion.horaHasta} hrs
                </Col>
              </Row>
              <br />
              <strong>Incluye:</strong>
              <br />
              {detallesPromocion}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Cerrar
      </Button>
    </Modal.Footer>
  </Modal>
  );
  
  
};

export default PromocionModal;
