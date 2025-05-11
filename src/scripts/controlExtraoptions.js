// SCRIPT PARA MANEJAR EL DESPLEGABLE Y LAS OPCIONES
document.addEventListener('DOMContentLoaded', () => {
    const dropdownButton = document.getElementById('menu-button');
    const dropdownItems = document.getElementById('menu-items');
    const checkboxContainer = document.getElementById('checkbox-container');
    const selectedOptionsContainer = document.getElementById('selected-options');
    
    // Obtener todas las checkboxes usando la clase option-checkbox que agregamos
    const checkboxes = document.querySelectorAll('.option-checkbox');

    const updateSelectedOptions = () => {
        if (selectedOptionsContainer) {
            selectedOptionsContainer.innerHTML = ''; // Limpiar el contenedor de tarjetas

            checkboxes.forEach((checkbox) => {
                if (checkbox.checked) {
                    // Obtener el texto de la etiqueta que contiene el checkbox
                    const optionText = checkbox.parentElement.textContent.trim();
                    const optionValue = checkbox.value;

                    // Crear la tarjeta con el nombre de la opción seleccionada
                    const card = document.createElement('span');
                    card.classList.add(
                        'inline-flex',
                        'items-center',
                        'rounded-full',
                        'bg-green-100',
                        'px-3',
                        'py-0.5',
                        'text-sm',
                        'font-medium',
                        'text-green-800',
                    );
                    card.textContent = optionText;

                    // Agregar botón para eliminar la opción
                    const removeButton = document.createElement('button');
                    removeButton.type = 'button';
                    removeButton.classList.add('ml-1', 'text-green-500', 'hover:text-green-700', 'focus:outline-none');
                    removeButton.innerHTML = `
                    <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M6 4a1 1 0 011.707-.707L10 5.586l2.293-2.293A1 1 0 0114.707 4L12.414 6.293l2.293 2.293A1 1 0 0112.293 9.707L10 7.414l-2.293 2.293A1 1 0 016.293 8.586L8.586 6.293 6.293 4A1 1 0 016 4z" clip-rule="evenodd"/>
                    </svg>`;

                    
                    // Evento para eliminar la opción al hacer clic en el botón
                    removeButton.addEventListener('click', () => {
                        checkbox.checked = false;
                        updateSelectedOptions();
                    });

                    card.appendChild(removeButton);
                    selectedOptionsContainer.appendChild(card);
                }
            });
        }
    };

    // Manejar el clic en el botón del menú desplegable
    if (dropdownButton && dropdownItems) {
        dropdownButton.addEventListener('click', () => {
            const expanded = dropdownButton.getAttribute('aria-expanded') === 'true' || false;
            dropdownButton.setAttribute('aria-expanded', (!expanded).toString());
            dropdownItems.classList.toggle('hidden');
            dropdownItems.classList.toggle('w-100');
        });
    }

    // Escuchar cambios en las casillas de verificación
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectedOptions);
    });

    // Cerrar el desplegable si se hace clic fuera de él
    window.addEventListener('click', (event) => {
        const targetElement = event.target;
        if (
            dropdownButton &&
            dropdownItems &&
            !dropdownButton.contains(targetElement) &&
            !dropdownItems.contains(targetElement)
        ) {
            dropdownButton.setAttribute('aria-expanded', 'false');
            dropdownItems.classList.add('hidden');
        }
    });

    // Inicializar la visualización de las opciones seleccionadas al cargar la página
    updateSelectedOptions();
});