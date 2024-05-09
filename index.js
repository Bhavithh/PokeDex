const url = " https://pokeapi.co/api/v2/pokemon/";

const card = document.getElementById("card");
const btn = document.getElementById("btn");

const typeColor = {
  bug: "#C6DADC", // Light Green
  dragon: "#7030A0", // Purple
  electric: "#FFD700", // Gold
  fairy: "#FBAEDC", // Light Pink
  fighting: "#C03028", // Red
  fire: "#F08030", // Orange
  flying: "#A088FF", // Light Blue
  grass: "#7CFC00", // Lime Green
  ground: "#E0C068", // Light Brown
  ghost: "#D3D3D3", // Gray
  ice: "#98D8D8", // Light Blue (different from flying)
  normal: "#A8A8A8", // Light Gray
  poison: "#A040A0", // Purple (darker than dragon)
  psychic: "#F85888", // Pink
  rock: "#B8A038", // Brown
  water: "#477FFF", // Blue
};

let getPokeData = () => {
  let id = Math.floor(Math.random() * 150) + 1;
  const finalUrl = url + id;

  fetch(finalUrl)
    .then((response) => response.json())
    .then((data) => {
      generateCard(data);
    });
};

let generateCard = (data) => {
  console.log(data);
  const hp = data.stats[0].base_stat;
  const imgSrc = data.sprites.other.dream_world.front_default || "";
  const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
  const statAttack = data.stats[1].base_stat;
  const statDefence = data.stats[2].base_stat;
  const statSpeed = data.stats[5].base_stat;

  const themeColor = typeColor[data.types[0].type.name];
  console.log(themeColor);
  card.innerHTML = `
    <p class="hp">
        <span>HP</span>
        ${hp}
    </p>
    <img src=${imgSrc} />
    <h2 class="poke-name">${pokeName}</h2>
    <div class="types">

    </div>
    <div class="stats">
        <div>
            <h3>${statAttack}</h3>
            <p>Attack</p>
        </div>
        <div>
            <h3>${statDefence}</h3>
            <p>Defence</p>
        </div>
        <div>
            <h3>${statSpeed}</h3>
            <p>Speed</p>
        </div>
    </div>
  
  `;
  appendTypes(data.types);
  styleCard(themeColor);
};

let appendTypes = (types) => {
  types.forEach((item) => {
    let span = document.createElement("span");
    span.textContent = item.type.name;
    document.querySelector(".types").appendChild(span);
  });
};

let styleCard = (colorf) => {
  card.style.background = `radial-gradient(circle at 50% 0%,${colorf} 36%,#ffffff 36%)`;
  card.querySelectorAll(".types span").forEach((typeColor) => {
    typeColor.style.backgroundColor = colorf;
  });
};
btn.addEventListener("click", getPokeData);
window.addEventListener("load", getPokeData);
