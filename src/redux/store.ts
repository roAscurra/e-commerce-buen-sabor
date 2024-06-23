// Importación necesaria
import { configureStore } from "@reduxjs/toolkit";
import tablaReducer from "./slices/TablaReducer"; // Renombramos el slice y su reducer
import {articuloManufacturadoSlice} from "./slices/ArticuloManufacturado"; // Renombramos el slice y su reducer
import modalReducer from "./slices/Modal"; // Renombramos el slice y su reducer
import {categoriaSlice} from "./slices/Categoria";
import { promocionSlice } from './slices/Promocion';
import {articuloInsumoSlice} from "./slices/ArticuloInsumo.ts";


// Configuración de la tienda de Redux
export const store = configureStore({
  reducer: {
    tabla: tablaReducer, // Cambiamos el nombre de la clave para que coincida con el nombre del slice
    modal: modalReducer, // Cambiamos el nombre de la clave para que coincida con el nombre del slice
    articuloInsumo: articuloInsumoSlice.reducer,
    articuloManufacturado: articuloManufacturadoSlice.reducer,
    //articuloManufacturadoDetalle
    categoria: categoriaSlice.reducer,
    promocion: promocionSlice.reducer
  },
});

// Inferimos los tipos `RootState` y `AppDispatch` del almacén de la tienda misma
export type RootState = ReturnType<typeof store.getState>;
// Tipo inferido: { modal: ModalState, tabla: TablaState, articuloManufacturado: ArticuloManufacturadoState }
export type AppDispatch = typeof store.dispatch;