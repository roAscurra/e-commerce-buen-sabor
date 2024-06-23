import { Modal, Button, Carousel } from 'react-bootstrap';
import ArticuloManufacturadoDetalle from '../../../types/ArticuloManufacturadoDetalle';
import ArticuloDto from '../../../types/dto/ArticuloDto';
import './ModalIngredientes.css';

type IngredientesModalProps = {
  open: boolean;
  onClose: () => void;
  ingredientes: ArticuloManufacturadoDetalle[];
  product: ArticuloDto;
};

const IngredientesModal = ({ open, onClose, ingredientes, product }: IngredientesModalProps) => {
    const imageUrlArray = product.imagenes?.map(image => image.url) || [];

  return (
    <Modal show={open} onHide={onClose} centered size="lg">
      <Modal.Header closeButton className="justify-content-center">
        <Modal.Title style={{ color: "#5d8ec7", textAlign: "center", width: "100%" }}>
          {product.denominacion}
        </Modal.Title>      
    </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
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
            </div>
            <div className="col-sm-6">
              <h5>Descripción: {product.descripcion}</h5>
              <p>Ingredientes:</p>
              <p>
                {ingredientes.map((ingrediente, index) => (
                  <span key={index}>
                    {ingrediente.cantidad} {ingrediente.articuloInsumo.unidadMedida.denominacion.toLowerCase()} de {ingrediente.articuloInsumo.denominacion.toLowerCase()}{index !== ingredientes.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default IngredientesModal;
