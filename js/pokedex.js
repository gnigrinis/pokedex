//Capturando los elementos del DOM necesarios
let buscador = document.getElementById('buscador');
let nombrePokemon= document.getElementById('nombrePokemon');
let resultado = document.getElementById('resultado');
let contenedor = document.querySelector('.contenedor__card');

//Funcion para borrar el contenido de la pantalla
let borrar = document.getElementById('borrar');
borrar.addEventListener('click', () => {
  contenedor.className = 'contenedor__card waiting';
  resultado.innerHTML = "";
  nombrePokemon.value = "";
  nombrePokemon.placeholder = "Busca tu pokemon";
});

//Funcion para buscar el pokemon
let buscar = document.getElementById('buscar');
buscar.addEventListener('click', () => {
  obtenerPokemon(nombrePokemon, resultado,contenedor);
});

//Se realiza la peticion a la API
const obtenerPokemon = async(nombrePokemon, resultado) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon.value.toLowerCase()}`;
  const requerimiento = await fetch(url);
  
  //Verificar si la peticion fue exitosa
  if (requerimiento.status == 200) {
    const pokemon = await requerimiento.json();
    
    //Extraer los datos del pokemon
    const id = pokemon.id;
    const nombre = toCamelCase(pokemon.name);
    const tipo = toCamelCase(pokemon.types[0].type.name);
    const peso = pokemon.weight;
    const altura = pokemon.height;
    const imagen = pokemon.sprites.front_default;
    
    //Imprime en pantalla resultado
    contenedor.className = 'contenedor__card';
    resultado.innerHTML = `
    <img src="${imagen}" alt="${nombre}">
    <p><strong>N°</strong>${id}</p><br>
    <p><strong>Nombre:</strong> ${nombre}</p><br>
    <p><strong>Tipo:</strong> ${tipo}</p><br>
    <p><strong>Peso:</strong> ${peso/10} Kg</p><br>
    <p><strong>Altura:</strong> ${altura/10} m </p><br>
    `;

    //Resetea la visualizacion de los resultados y avisa al usuario que no se encontro el pokemon
  } else{
    contenedor.className = 'contenedor__card waiting';
    resultado.innerHTML = "";
    nombrePokemon.value = "";
    nombrePokemon.placeholder = "Pokemon no encontrado";
  }

}

// Funcion para convertir el nombre del pokemon a camelCase
function toCamelCase(str){
  text = str.split("");
  text[0] = text[0].toUpperCase();
  console.log(text.join(""));
  return text.join("");
}

