# 📝 Praktika: Pokédex Dinamikoa Sortzen

![alt text](doc/charizard.png)

Praktika honetan, HTML eta CSS maketa estatiko bat web-aplikazio funtzional bihurtuko dugu **JavaScript** erabiliz. Datuak bistatik bereizten, testu-txantiloiak (Template Strings) erabiltzen eta kanpoko fitxategi batetik datuak kargatzen ikasiko dugu.


## 📂 Hasierako fitxategiakZure biltegian honako hau daukazu:

* `index.html`: Oinarrizko egitura (hutsik edo adibideko datuekin).
* `style.css`: Pokédex ofiziala bezala ikusteko estiloak.
* `assets/images/`: Irudiak gordetzeko karpeta.

---

## 🚀 1. Atala: Datuen Eredua (JS Objektuak)

Aplikazioak funtziona dezan baino lehen, Pokémon baten informazioa JavaScript-ek ulertzeko moduan adierazi behar dugu.

### 1.1 Objektua Sortu

1. Sortu `script.js` fitxategi bat eta lotu zure HTMLan, `</body>` etiketa itxi aurretik.
2. Deklaratu `pokemon` izeneko konstante bat; hau **Objektu** bat izango da.
3. Kopiatu *Bulbasaurren* datuak (erreferentziako irudian ikusten direnak) eta pasa itzazu objektu honen propietatetara.

Egitura honen antzekoa izan beharko luke (falta dena osatu):

```javascript
const pokemon = {
    id: 1,
    name: "Bulbasaur",
    description: "Jaio ondoren, bizkarreko erraboileko mantenugaiez elikatzen da...",
    image: "...", // Irudiaren ibilbidea (path)
    types: ["grass", "poison"],
    stats: {
        hp: 45,
        attack: 49,
        // ... gainerako estatistikak
    }
    // ... altuera, pisua, kategoria, etab.
};

```

---

## 🎨 2. Atala: Renderizazio Dinamikoa (Template Strings)

Orain kodean itsatsitako HTMLa (hardcoded) ezabatu eta JavaScript erabiliz sortuko dugu.

### 2.1 HTMLa prestatu

Ziurtatu zure `index.html` fitxategian Pokémonaren fitxa doan tokia hutsik dagoela, baina ID batekin identifikatuta. Adibidez:

```html
<main id="pokemon-detail" class="right-column">
   </main>

```

### 2.2 Renderizazio funtzioa

Zure `script.js` fitxategian, sortu `renderPokemon(data)` izeneko funtzioa.
Funtzio honek honako hau egin behar du:

1. `#pokemon-detail` edukiontzia aukeratu.
2. **Template Strings** (komatxo etzan edo alderantzikatuak ```) erabili fitxaren HTML bloke osoa definitzeko.
3. Testu finkoak `data` objektuko aldagaiekin ordezkatu. Adibidez: `${data.name}`.
4. HTML hori edukiontziaren `innerHTML` propietateari esleitu.

**Froga:** Deitu `renderPokemon(pokemon)` funtzioari zure script-aren amaieran. Pantailan Bulbasaur agertzen bada, funtzionatzen du!

> **Erronka:** Aldatu eskuz Bulbasaurren izena zure JS objektuan (adibidez, "Ivysaur" jarri) eta freskatu orria. Bakarrik eguneratzen da? Hori da magia!

---

## ⚡ 3. Atala: Kanpo Datuak eta Asinkronia (Fetch)

Datuak JavaScript kodearen barruan idazteak ez du balio 1.000 Pokémon baldin baditugu. Datuak fitxategi bereizi batera eramango ditugu.

### 3.1 JSONa Sortu

1. Sortu `pokedex.json` fitxategia `assets` karpetaren barruan.
2. Ebaki Bulbasaurren objektua eta itsatsi bertan.
3. **Garrantzitsua:** Bihurtu objektu-Array batean (`[...]` artean sartu) eta ziurtatu gako (key) guztiek komatxo bikoitzak dituztela `"key": "value"`.
4. Gehitu gutxienez 5 Pokémon gehiago [Pokedex](https://www.pokemon.com/es/pokedex)

### 3.2 Fetch erabiliz (Azalpena)

> 🧠 **Kontzeptu Berria: Fetch eta Asinkronia**
> Orain arte, kodea goitik behera irakurtzen zen berehala. Baina kanpoko fitxategi bat irakurtzeak (edo zerbitzari bati datuak eskatzeak) **denbora behar du** (milisegundoak edo segundoak). JavaScript ez da "izoztuta" geratzen itxaroten; beste gauza batzuk exekutatzen jarraitzen du.
> 
> Hori kudeatzeko `fetch` (bila joan) eta `async/await` (itxaron) erabiltzen ditugu.
> * `fetch('fitxategia.json')`: Eskaera hasten du.
> * `await`: Kodeari esaten dio "itxaron hemen datua iritsi arte".
> * `response.json()`: Iritsitako testua JS objektu erabilgarri bihurtzen du.
> 
> 

### 3.3 Kargatzea inplementatu

Aldatu zure `script.js`. Ezabatu hasieran eskuz sortu zenuen `const pokemon` objektua. Orain kargatu egingo dugu.

Kopiatu eta ulertu eskeleto hau:

```javascript
let allPokemon = []; // Hemen gordeko ditugu kargatutako datuak

async function init() {
    try {
        // 1. JSON fitxategiari eskaera egin
        const response = await fetch("assets/pokedex.json");
        
        // 2. Erantzuna benetako JSON bihurtu
        const data = await response.json();
        
        // 3. Datuak gure aldagai globalean gorde
        allPokemon = data;
        
        console.log("Kargatutako datuak:", allPokemon);

        // 4. Lehenengoa renderizatu ondo dagoela egiaztatzeko
        renderPokemon(allPokemon[0]);

    } catch (error) {
        console.error("Errorea datuak kargatzean:", error);
    }
}

// Funtzioa exekutatu
init();

```

---

## 📜 4. Atala: Hautapen Zerrenda

Orain Pokémonen Array bat daukagunez (`allPokemon`), alboko zerrenda sortuko dugu batetik bestera aldatu ahal izateko.

### 4.1 HTML eta CSS

Ezkerrean edukiontzi bat behar duzu. Ez badaukazu, gehitu `<aside>` edo `div` bat zure HTMLan zerrendarako.

```html
<div class="app-layout">
    <aside id="pokemon-list-container">
        </aside>
    <main id="pokemon-detail">
        </main>
</div>

```

### 4.2 Zerrenda sortu Begizta (Loop) bidez

Sortu funtzio berri bat JS-n: `renderList(pokemons)`.

1. Funtzio honek pokemonen arraya jaso behar du.
2. Zerrendaren edukiontzia garbitu behar du (`innerHTML = ''`).
3. Begizta bat erabili (`forEach` edo `map`) pokemon bakoitza zeharkatzeko.
4. Bakoitzarentzat, HTML elementu bat sortu (`div` edo `li` bat), bere irudi txikiarekin eta izenarekin.

### 4.3 Interaktibitatea (Klik egitea)

Hemen dago gakoa. Begizta barruan, zerrendako elementua sortzen duzunean, gehitu iezaiozu "entzule" (listener) bat:

```javascript
// Adibide kontzeptuala begizta barruan
zerrendakoElementua.addEventListener("click", () => {
    // Klik egitean, xehetasuna margotzen duen funtzioari deitzen diogu
    // begiztaren UNEKO POKÉMONA pasatuz
    renderPokemon(unekoPokemon); 
});

```

Deitu `renderList(allPokemon)` funtzioari zure `init()` funtzioaren barruan.

---

## ✅ Azken Ataza: Pokédex-a Bete

Praktika amaitzeko:

1. Editatu `assets/pokedex.json` fitxategia.
2. Bilatu informazioa interneten eta osatu JSONa **gutxienez 10 Pokémonekin**.
3. Ziurtatu zerrendan klik egitean eskuineko fitxa behar bezala eguneratzen dela datu guztiekin (estatistika-barrak, motak, ahuleziak, etab.).

Ekin lanari! 👨‍💻👩‍💻

4. Igo aldaketa guztiak githubera