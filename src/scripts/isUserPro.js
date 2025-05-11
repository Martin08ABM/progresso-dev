// Verificar si el usuario tiene la versión PRO
document.addEventListener('DOMContentLoaded', () => {
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    };

    if (getCookie('proPayed') === 'true') {
        // Si el usuario ha pagado por la versión PRO, habilitar el botón de enviar
        document.getElementById('submitButton').disabled = false;
        document.getElementById('remainingInputs').textContent = '∞'; // Mostrar infinito como inputs restantes
    }
});

// Definir un objeto userTracker simple si no está disponible
const userTracker = {
    getUid: function() {
        // Generar o recuperar un ID único para el usuario
        let userId = localStorage.getItem('userId');
        if (!userId) {
            userId = 'user_' + Math.random().toString(36).substring(2, 15);
            localStorage.setItem('userId', userId);
        }
        return userId;
    },
    trackUserAction: function(action, data) {
        // Implementación simple de seguimiento
        console.log('User action tracked:', action, data);
    }
};