// Función para mostrar los resultados
function mostrarResultados(data) {
    const resultadoContainer = document.getElementById('resultado-container');
    if (!resultadoContainer) return;
    
    resultadoContainer.innerHTML = ''; // Limpiar resultados anteriores
    
    // Crear contenedor para la imagen
    const imagenContainer = document.createElement('div');
    imagenContainer.className = 'w-full flex justify-center mb-6';
    
    // Añadir la imagen
    const imagen = document.createElement('img');
    imagen.src = data.imagen;
    imagen.alt = 'Roadmap generado';
    imagen.className = 'max-w-full rounded-lg shadow-lg';
    imagenContainer.appendChild(imagen);
    
    // Crear contenedor para el texto
    const textoContainer = document.createElement('div');
    textoContainer.className = 'w-full bg-white p-6 rounded-lg shadow-lg';
    textoContainer.innerHTML = formatearRespuesta(data.respuesta);
    
    // Añadir elementos al contenedor principal
    resultadoContainer.appendChild(imagenContainer);
    resultadoContainer.appendChild(textoContainer);
    
    // Hacer visible el contenedor de resultados
    resultadoContainer.classList.remove('hidden');
    
    // Desplazarse a los resultados
    resultadoContainer.scrollIntoView({ behavior: 'smooth' });
}

// Función para formatear la respuesta de texto
function formatearRespuesta(texto) {
    // Convertir saltos de línea en etiquetas HTML
    let formateado = texto.replace(/\n/g, '<br>');
    
    // Formatear viñetas
    formateado = formateado.replace(/- /g, '• ');
    
    // Resaltar títulos
    formateado = formateado.replace(/(.+):(\s*)<br>/g, '<h3 class="text-xl font-bold mb-2 mt-4">$1:</h3>');
    
    return formateado;
}