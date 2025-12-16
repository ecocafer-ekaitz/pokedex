// MODELOA

let pokemon = {
    "id": 4,
    "name": "Charmander",
    "description": "La llama de la punta de su cola indica su salud. Si está sano, arderá con intensidad.",
    "image": "charmander.png",
    "altura": 0.6,
    "categoria": "Lagarto",
    "peso": 8.5,
    "habilidad": "Mar Llamas",
    "types": ["fuego"],
    "debilidades": ["agua", "tierra", "roca"],
    "stats": {
      "ps": 39,
      "ataque": 52,
      "defensa": 43,
      "ataque_especial": 60,
      "defensa_especial": 50,
      "velocidad": 65
    }
  };


/// VISTA

function pokemonView(){

    document.getElementById("pokemon-view").innerHTML = `
    
    <div class="left-column">
        <div class="pokemon-image-wrapper">
            <img src="assets/images/${pokemon.image}" alt="${pokemon.name}" class="pokemon-img">
        </div>

        <div class="stats-card">
            <h3>Puntos de base</h3>
            <div class="chart-container">
                <div class="stat-col">
                    <div class="bar-track">
                        <div class="bar-fill" style="height: ${pokemon.stats.ps}%;"></div>
                        <div class="bar-grid"></div> </div>
                    <span class="label">PS</span>
                </div>

                <div class="stat-col">
                    <div class="bar-track">
                        <div class="bar-fill" style="height: ${pokemon.stats.ataque}%;"></div>
                        <div class="bar-grid"></div>
                    </div>
                    <span class="label">Ataque</span>
                </div>

                <div class="stat-col">
                    <div class="bar-track">
                        <div class="bar-fill" style="height: ${pokemon.stats.defensa}%;"></div>
                        <div class="bar-grid"></div>
                    </div>
                    <span class="label">Defensa</span>
                </div>

                <div class="stat-col">
                    <div class="bar-track">
                        <div class="bar-fill" style="height: ${pokemon.stats.ataque_especial}%;"></div>
                        <div class="bar-grid"></div>
                    </div>
                    <span class="label">Ataque Especial</span>
                </div>

                <div class="stat-col">
                    <div class="bar-track">
                        <div class="bar-fill" style="height: ${pokemon.stats.defensa_especial}%;"></div>
                        <div class="bar-grid"></div>
                    </div>
                    <span class="label">Defensa Especial</span>
                </div>

                <div class="stat-col">
                    <div class="bar-track">
                        <div class="bar-fill" style="height: ${pokemon.stats.velocidad}%;"></div>
                        <div class="bar-grid"></div>
                    </div>
                    <span class="label">Velocidad</span>
                </div>
            </div>
        </div>
    </div>

    <div class="right-column">
        <p class="description">
            ${pokemon.description}
        </p>

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

            <div class="info-row">
                <div class="info-item">
                    <span class="info-label">Sexo</span>
                    <span class="info-value sex-icons">
                        <span class="male">&#9794;</span>
                        <span class="female">&#9792;</span>
                    </span>
                </div>
            </div>
        </div>

        <div class="type-section">
            <h3>Tipo</h3>
            <div class="badges">
                ${vistaTipos(pokemon.types)}
            </div>
        </div>

        <div class="weakness-section">
            <h3>Debilidad</h3>
            <div class="badges">
                ${vistaTipos(pokemon.debilidades)}
            </div>
        </div>
    </div>

    `
    
}

// Deitu vista lehenengo aldiz
pokemonView()

function vistaTipos(types){
   return types.map(tipo => `<span class="badge ${tipo}">${tipo}</span>`).join("")
}