import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, Typography } from "@mui/material";
import ArticuloManufacturadoDetalle from "../../../types/ArticuloManufacturadoDetalle";
import ArticuloDto from "../../../types/dto/ArticuloDto";
import "./ModalIngredientes.css"

type IngredientesModalProps = {
    open: boolean;
    onClose: () => void;
    ingredientes: ArticuloManufacturadoDetalle[];
    product: ArticuloDto;
};

const IngredientesModal = ({ open, onClose, ingredientes, product }: IngredientesModalProps) => {
    const imageUrl = product.imagenes && product.imagenes[0] ? product.imagenes[0].url : '';

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: '10px',
                }
            }}
        >
            <DialogTitle>
                <h1 className="modal-title">Ingredientes de "{product.denominacion}"</h1>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h4" gutterBottom className="modal-description">
                            {product.descripcion}
                        </Typography><br />
                        <ul style={{ listStyleType: "none", padding: 0 }}>
                            {ingredientes.map((ingrediente, index) => (
                                <li
                                    key={index}
                                    className="modal-list-item"
                                >
                                    {ingrediente.articuloInsumo.denominacion} - {ingrediente.cantidad} {ingrediente.articuloInsumo.unidadMedida.denominacion === "Cantidades" ? "Unidades" : ingrediente.articuloInsumo.unidadMedida.denominacion}
                                </li>
                            ))}
                        </ul>
                    </Grid>
                    <Grid item xs={6}>
                        {imageUrl && (
                            <img
                                src={imageUrl}
                                alt={product.denominacion}
                                style={{
                                    width: '100%',
                                    borderRadius: '10px',
                                }}
                            />
                        )}
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} className="modal-button">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default IngredientesModal;
