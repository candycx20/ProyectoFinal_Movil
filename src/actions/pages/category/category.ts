import axios from "axios";

// Configuración de la base URL (asegúrate de que esté bien configurada)
const BASE_URL = 'http://10.0.2.2:8000';

// Obtener todas las categorías
export const getCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/categorias/`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener las categorías:", error);
        return [];
    }
};

// Crear una nueva categoría
export const createCategory = async (nombre: string, descripcion: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/categorias/`, {
            nombre,
            descripcion,
        });
        return response.data;
    } catch (error) {
        console.error("Error al crear la categoría:", error);
        return null;
    }
};

// Actualizar una categoría
export const updateCategory = async (id: number, nombre: string, descripcion: string) => {
    try {
        const response = await axios.put(`${BASE_URL}/categorias/${id}/`, {
            nombre,
            descripcion,
        });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar la categoría:", error);
        return null;
    }
};

// Eliminar una categoría
export const deleteCategory = async (id: number) => {
    try {
        await axios.delete(`${BASE_URL}/categorias/${id}/`);
        return true;
    } catch (error) {
        console.error("Error al eliminar la categoría:", error);
        return false;
    }
};
