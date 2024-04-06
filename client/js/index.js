
const cursosContainer = document.getElementById('shopcurso');

cursos.forEach((curso) => {
    const cursoDiv = document.createElement('div');
    cursoDiv.classList.add('curso');
    
    cursoDiv.innerHTML = `
    <div class="parrafo">
    <img src="${curso.img}" alt="${curso.nombre}">
    <h5>${curso.nombre}</h5>
    <p>Duración: ${curso.duracion}</p>
    <p>Costo: $${curso.costo}</p>
    </div>
    `;
    
    const buyButton = document.createElement('button');
    buyButton.innerText = 'Comprar';
    cursoDiv.append(buyButton);

    cursosContainer.append(cursoDiv);
});