export function contador(id) {
    let template = `
    <div class="d-flex justify-content-center align-items-center gap-3 my-3">
        <button id="decrementarBtn-${id}" class="btn btn-dark">-</button>
        <div>
            <span id="valorBtn-${id}">1</span>
        </div>
        <button id="incrementarBtn-${id}" class="btn btn-dark">+</button>
    </div>
    `;
    return template;
}

export function setupContador(id) {
    let valor = 1;
    const valorBtn = document.getElementById(`valorBtn-${id}`);
    const incrementarBtn = document.getElementById(`incrementarBtn-${id}`);
    const decrementarBtn = document.getElementById(`decrementarBtn-${id}`);
    if (!valorBtn || !incrementarBtn || !decrementarBtn) return;

    incrementarBtn.addEventListener('click', () => {
        valor++;
        valorBtn.textContent = valor;
    });
    decrementarBtn.addEventListener('click', () => {
        if (valor > 1) {
            valor--;
            valorBtn.textContent = valor;
        }
    });
}

