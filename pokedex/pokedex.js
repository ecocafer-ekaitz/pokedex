const state = { 
    pokedex: [], 
    filteredPokedex: [], 
    idx: 0, 
    rotationId: null 
};

async function init() {
    try {
        const res = await fetch('assets/pokedex.json');
        state.pokedex = await res.json();
        state.filteredPokedex = [...state.pokedex];
        render();
        bindButtons();
        setupSearch();
        startRotation();
    } catch (e) {
        console.error(e);
    }
}

function render() {
    const p = state.filteredPokedex[state.idx];
    const view = document.getElementById('pokemon-view');
    if (!view) return;

    if (!p) {
        view.innerHTML = '<div class="no-results">No se encontraron resultados</div>';
        return;
    }

    view.innerHTML = `
    <div class="left-column">
        <div class="pokemon-image-wrapper">
            <img src="assets/images/${p.image}" alt="${p.name}" class="pokemon-img">
        </div>
        <div class="stats-card">
            <h3>Puntos de base</h3>
            <div class="chart-container">
                ${renderStat('PS', p.stats.ps)}
                ${renderStat('Ataque', p.stats.ataque)}
                ${renderStat('Defensa', p.stats.defensa)}
                ${renderStat('At. Especial', p.stats.ataque_especial)}
                ${renderStat('Def. Especial', p.stats.defensa_especial)}
                ${renderStat('Velocidad', p.stats.velocidad)}
            </div>
        </div>
    </div>
    <div class="right-column">
        <h2 class="pokemon-name">${p.name}</h2>
        <p class="description">${p.description}</p>
        <div class="info-box">
            <div class="info-row">
                <div class="info-item">
                    <span class="info-label">Altura</span>
                    <span class="info-value">${p.altura} m</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Categoría</span>
                    <span class="info-value">${p.categoria}</span>
                </div>
            </div>
            <div class="info-row">
                <div class="info-item">
                    <span class="info-label">Peso</span>
                    <span class="info-value">${p.peso} kg</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Habilidad</span>
                    <span class="info-value">${p.habilidad} <span class="question">?</span></span>
                </div>
            </div>
        </div>
        <div class="type-section">
            <h3>Tipo</h3>
            <div class="badges">${renderTypes(p.types)}</div>
        </div>
        <div class="weakness-section">
            <h3>Debilidad</h3>
            <div class="badges">${renderTypes(p.debilidades)}</div>
        </div>
    </div>`;

    updateActiveButton(p.id);
}

const renderTypes = types => (types || []).map(t => `<span class="badge ${t.toLowerCase()}">${t}</span>`).join('');

const renderStat = (label, value) => `
    <div class="stat-col">
        <div class="bar-track">
            <div class="bar-fill" style="height: ${Math.min(100, Math.max(0, value))}%;"></div>
            <div class="bar-grid"></div>
        </div>
        <span class="label">${label}</span>
    </div>`;

function setupSearch() {
  document.getElementById('buscador')?.addEventListener('input', ({ target: { value: v } }) => {
    const term = v.toLowerCase();
    stopRotation();
    state.idx = 0;
    state.filteredPokedex = state.pokedex.filter(p => JSON.stringify(p).toLowerCase().includes(term));
    render();
  });
}

function updateActiveButton(id) {
    document.querySelectorAll('.pokemon-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.id == id);
    });
}

function stopRotation() {
    if (state.rotationId) {
        clearInterval(state.rotationId);
        state.rotationId = null;
    }
}

function startRotation() {
    if (!state.filteredPokedex.length) return;
    stopRotation();
    state.rotationId = setInterval(() => {
        state.idx = (state.idx + 1) % state.filteredPokedex.length;
        render();
    }, 4000);
}

function bindButtons() {
    const buttons = document.querySelectorAll('.pokemon-btn');
    buttons.forEach((btn, i) => btn.addEventListener('click', () => {
        stopRotation();
        const foundIdx = state.filteredPokedex.findIndex(p => p.id == btn.dataset.id);
        if (foundIdx !== -1) {
            state.idx = foundIdx;
            render();
        }
    }));
}

init();