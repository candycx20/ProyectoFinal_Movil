import { tesloApi } from "../../config/api/tesloApi";
import { User } from "../../domain/entities/user"
import type { AuthResponse } from "../../infrastructure/interfaces/auth.responses"


const returnUserToken = async (token: string): Promise<User | null> => {
    try {
        const response = await fetch('http://10.0.2.2:8000/user/', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener los datos del usuario');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        return null;
    }
};
    

export const authLogin = async (username: string, password: string) => {
    try {
        const { data: tokens } = await tesloApi.post<AuthResponse>('token/', {
            username,
            password
        })
        const user = await returnUserToken(tokens.access);

        return {
            user,
            tokens,
        };
        } catch (error) {
        console.log(error)
        return null;
    }
}


/*
import { User } from "../../domain/entities/user";
import type { AuthResponse } from "../../infrastructure/interfaces/auth.responses";

// Solicitar datos del usuario directamente con fetch
const returnUserToken = async (token: string): Promise<User | null> => {
    try {
        const response = await fetch('http://10.0.2.2:8000/user/', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`, // Pasar el token de acceso
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener los datos del usuario');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        return null;
    }
};

// Función para autenticar usuario
export const authLogin = async (username: string, password: string) => {
    try {

        // Solicitud de tokens usando fetch
        const tokenResponse = await fetch('http://10.0.2.2:8000/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        if (!tokenResponse.ok) {
            throw new Error('Error al obtener los tokens');
        }

        const tokens: AuthResponse = await tokenResponse.json();

        // Obtener información del usuario con el token de acceso
        const user = await returnUserToken(tokens.access);

        return {
            user,
            tokens,
        };
    } catch (error) {
        console.error('Error en la autenticación:', error);
        return null;
    }
};

*/