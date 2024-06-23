import Promocion from "../types/Promocion";
import BackendClient from "./BackendClient";

interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
}

export default class PromocionService extends BackendClient<Promocion> {
    // Obtener Promociones ordenados por precio
    public async getPromocionesSortedByPrecio(url: string, page: number, size: number): Promise<Page<Promocion[]>> {
        try {
            const path = `${url}/promociones/sortedByPrecio?page=${page}&size=${size}`;
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

    // Obtener promociones por tipo
    public async getPromocionesByTipo(url: string, tipo: string, page: number, size: number): Promise<Page<Promocion[]>> {
        try {
            const path = `${url}/promociones/tipo/${tipo}?page=${page}&size=${size}`;
            const response = await fetch(path, { method: "GET" });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data: Page<Promocion[]> = await response.json();
            return data;
        } catch (error) {
            console.error("Error al obtener artículos por categoría:", error);
            throw error;
        }
    }
}