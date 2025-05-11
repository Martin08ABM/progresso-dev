// Añadir div de carga si no existe
document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('loading-indicator')) {
        const loadingIndicator = document.createElement('div');
        loadingIndicator.id = 'loading-indicator';
        // Aseguramos que el elemento tenga la clase 'none' para que esté oculto inicialmente
        loadingIndicator.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden';
        loadingIndicator.style.display = 'none'; // Doble seguridad para garantizar que esté oculto
        loadingIndicator.innerHTML = '<div class="bg-white p-6 rounded-lg shadow-xl"><p class="text-lg">Generando tu roadmap...</p><div class="mt-4 w-full h-2 bg-gray-200 rounded-full"><div class="animate-pulse h-full bg-blue-600 rounded-full"></div></div></div>';
        document.body.appendChild(loadingIndicator);
    } else {
        // Si ya existe, asegurarse de que esté oculto
        const loadingIndicator = document.getElementById('loading-indicator');
        loadingIndicator.classList.add('hidden');
        loadingIndicator.style.display = 'none';
    }
    
    // Añadir contenedor de resultados si no existe
    if (!document.getElementById('resultado-container')) {
        const resultadoContainer = document.createElement('div');
        resultadoContainer.id = 'resultado-container';
        resultadoContainer.className = 'w-full mt-8 hidden';
        document.querySelector('.w-full.p-2').appendChild(resultadoContainer);
    }
});