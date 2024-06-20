import React from "react";
import { Modal, Button, Row, Col, Card, ListGroup } from "react-bootstrap";
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

  const fechaDesde = new Date(promocion.fechaDesde).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const fechaHasta = new Date(promocion.fechaHasta).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{promocion.denominacion}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {promocion.promocionDetalle.length > 0 && (
          <div className="mb-4">
            <h5>Combo:</h5>
            <ListGroup>
              {promocion.promocionDetalle.map((detalle) => (
                <ListGroup.Item key={detalle.id}>
                  <Row>
                    <Col>
                      <strong>Cantidad:</strong> {detalle.cantidad}
                    </Col>
                    <Col>
                      <strong>Artículo:</strong> {detalle.articulo.denominacion}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )}
        <Card>
          <Card.Body>
            {promocion.imagenes.length > 0 && (
              <div className="d-flex justify-content-center">
                <img
                  src={promocion.imagenes[0].url}
                  alt={promocion.denominacion}
                  className="img-thumbnail"
                  style={{ maxWidth: "500px" }}
                />
              </div>
            )}
            <Card.Text className="mt-3" style={{ color: "blue" }}>
              {promocion.descripcionDescuento}
            </Card.Text>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Precio Promocional:</strong> ${promocion.precioPromocional}
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Fecha Desde:</strong> {fechaDesde}
                  </Col>
                  <Col>
                    <strong>Fecha Hasta:</strong> {fechaHasta}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Hora Desde:</strong> {promocion.horaDesde}
                  </Col>
                  <Col>
                    <strong>Hora Hasta:</strong> {promocion.horaHasta}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Tipo de Promoción:</strong> {promocion.tipoPromocion}
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
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
