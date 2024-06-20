import ArticuloDto from "../types/dto/ArticuloDto";
import BackendClient from "./BackendClient";

export default class ArticuloDtoService extends BackendClient<ArticuloDto> {

    // Obtener artículos
    public async getAll(url: string): Promise<ArticuloDto[]> {
        try {
            const path = `${url}/articulos`;
            const response = await fetch(path, { method: "GET" });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al obtener artículos:", error);
            throw error;
        }
    }

    // Obtener artículos ordenados por precio
    public async getArticulosSortedByPrecio(url: string): Promise<ArticuloDto[]> {
        try {
            const path = `${url}/articulos/sortedByPrecio`;
            const response = await fetch(path, { method: "GET" });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al obtener artículos ordenados por precio:", error);
            throw error;
        }
    }

    // Obtener artículos por categoría
    public async getArticulosByCategoria(url: string, idCategoria: number): Promise<ArticuloDto[]> {
        try {
            const path = `${url}/articulosByCategoria/${idCategoria}`;
            const response = await fetch(path, { method: "GET" });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al obtener artículos por categoría:", error);
            throw error;
        }
    }

}
