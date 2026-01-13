let pokedex = [];
let pokemon;

async function init() {
    try {
        const response = await fetch("assets/pokedex.json");
        pokedex = await response.json();
        pokemon = pokedex[0];
        view();
    } catch (error) {
        console.error(error);
    }
}

function view() {
    pokemonView();
    listaView();
}

function listaView() {
    const listContainer = document.getElementById("pokedex-list");
    if (!listContainer) return;

    listContainer.innerHTML = `
        <div class="pokemon-buttons">
            ${pokedex.map((poke, index) => `
                <button class="pokemon-btn" onclick="selectPokemon(${index})">
                    ${poke.name}
                </button>
            `).join("")}
        </div>`;
}

function selectPokemon(index) {
    pokemon = pokedex[index];
    pokemonView();
}

function pokemonView() {
    const viewContainer = document.getElementById("pokemon-view");
    if (!viewContainer) return;

    viewContainer.innerHTML = `
    <div class="left-column">
        <div class="pokemon-image-wrapper">
            <img src="assets/images/${pokemon.image}" alt="${pokemon.name}" class="pokemon-img">
        </div>

        <div class="stats-card">
            <h3>Puntos de base</h3>
            <div class="chart-container">
                ${renderStat("PS", pokemon.stats.ps)}
                ${renderStat("Ataque", pokemon.stats.ataque)}
                ${renderStat("Defensa", pokemon.stats.defensa)}
                ${renderStat("At. Especial", pokemon.stats.ataque_especial)}
                ${renderStat("Def. Especial", pokemon.stats.defensa_especial)}
                ${renderStat("Velocidad", pokemon.stats.velocidad)}
            </div>
        </div>
    </div>

    <div class="right-column">
        <p class="description">${pokemon.description}</p>

        <div class="info-box">
            <div class="info-row">
                <div class="info-item">
                    <span class="info-label">Altura</span>
                    <span class="info-value">${pokemon.altura} m</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Categoría</span>
                    <span class="info-value">${pokemon.categoria}</span>
                </div>
            </div>
            
            <div class="info-row">
                <div class="info-item">
                    <span class="info-label">Peso</span>
                    <span class="info-value">${pokemon.peso} kg</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Habilidad</span>
                    <span class="info-value">${pokemon.habilidad} <span class="question">?</span></span>
                </div>
            </div>
        </div>

        <div class="type-section">
            <h3>Tipo</h3>
            <div class="badges">${vistaTipos(pokemon.types)}</div>
        </div>

        <div class="weakness-section">
            <h3>Debilidad</h3>
            <div class="badges">${vistaTipos(pokemon.debilidades)}</div>
        </div>
    </div>`;
}

function vistaTipos(types) {
    return types.map(tipo => `<span class="badge ${tipo.toLowerCase()}">${tipo}</span>`).join("");
}

function renderStat(label, value) {
    return `
    <div class="stat-col">
        <div class="bar-track">
            <div class="bar-fill" style="height: ${value}%;"></div>
            <div class="bar-grid"></div>
        </div>
        <span class="label">${label}</span>
    </div>`;
}

init();