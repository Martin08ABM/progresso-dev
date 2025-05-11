import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

// Constantes de configuración
const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const UID_STORAGE_KEY = 'progressodev_uuid';

// Clase para manejar identificadores de usuario
export class UserTracker {
    constructor() {
        // Inicializar cliente de Supabase
        this.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        
        // Inicializar UID
        this.uid = null;
        this.initializeUid();
    }

    // Inicializa el identificador único del usuario
    initializeUid() {
        try {
            // Intentar cargar el UID existente
            const storedUid = localStorage.getItem(UID_STORAGE_KEY);
            
            if (storedUid) {
                this.uid = storedUid;
                this.updateUserVisit();
            } else {
                // Generar un nuevo UID si no existe
                this.createNewUser();
            }
        } catch (error) {
            console.error('Error al inicializar UID:', error);
        }
    }

    // Crea un nuevo usuario en Supabase y almacena el UID localmente
    async createNewUser() {
        try {
            const newUid = uuidv4();
            this.uid = newUid;
            
            // Guardar UID en localStorage
            localStorage.setItem(UID_STORAGE_KEY, newUid);
            
            // Datos del usuario para Supabase
            const userData = {
                uniqueId: newUid,
                createdAt: new Date().toISOString(),
                lastVisited: new Date().toISOString(),
                userAgent: navigator.userAgent,
                referrer: document.referrer || null,
                timesVisited: 1,
                isPro: this.checkIfUserIsPro()
            };
            
            // Guardar en Supabase
            const { error } = await this.supabase
                .from('user_identifiers')
                .insert(userData);
                
            if (error) {
                console.error('Error al crear identificador en Supabase:', error);
            }
        } catch (error) {
            console.error('Error al crear nuevo usuario:', error);
        }
    }

    // Actualiza los datos de visita del usuario
    async updateUserVisit() {
        if (!this.uid) return;
        
        try {
            // Obtener datos actuales
            const { data, error: fetchError } = await this.supabase
                .from('user_identifiers')
                .select('timesVisited')
                .eq('uniqueId', this.uid)
                .single();
            
            if (fetchError) {
                console.error('Error al obtener datos del usuario:', fetchError);
                return;
            }
            
            // Actualizar datos en Supabase
            const { error: updateError } = await this.supabase
                .from('user_identifiers')
                .update({
                    lastVisited: new Date().toISOString(),
                    timesVisited: (data?.timesVisited || 0) + 1,
                    isPro: this.checkIfUserIsPro(),
                    userAgent: navigator.userAgent,
                    referrer: document.referrer || null
                })
                .eq('uniqueId', this.uid);
            
            if (updateError) {
                console.error('Error al actualizar datos del usuario:', updateError);
            }
        } catch (error) {
            console.error('Error al actualizar visita:', error);
        }
    }

    // Verifica si el usuario tiene estatus PRO
    checkIfUserIsPro() {
        try {
            // Verificar cookie de pago
            function getCookie(name) {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
                return null;
            }
            
            return getCookie('proPayed') === 'true';
        } catch (error) {
            console.error('Error al verificar estatus Pro:', error);
            return false;
        }
    }

    // Actualiza el estado PRO del usuario
    async updateProStatus(isPro) {
        if (!this.uid) return;
        
        try {
            const { error } = await this.supabase
                .from('user_identifiers')
                .update({ isPro })
                .eq('uniqueId', this.uid);
            
            if (error) {
                console.error('Error al actualizar estado PRO:', error);
            }
        } catch (error) {
            console.error('Error al actualizar estado PRO:', error);
        }
    }

    // Registra una acción del usuario
    async trackUserAction(actionType, actionData) {
        if (!this.uid) return;
        
        try {
            const { error } = await this.supabase
                .from('user_actions')
                .insert({
                    userId: this.uid,
                    actionType,
                    actionData,
                    timestamp: new Date().toISOString()
                });
            
            if (error) {
                console.error('Error al registrar acción:', error);
            }
        } catch (error) {
            console.error('Error al registrar acción del usuario:', error);
        }
    }

    /**
     * Obtiene el identificador único
     */
    getUid() {
        return this.uid;
    }
}

// Exportar una instancia por defecto para usar en toda la aplicación
export const userTracker = new UserTracker();

// Función auxiliar para inicializar el seguimiento de usuario en la aplicación
export function initializeUserTracking() {
    return userTracker;
}
