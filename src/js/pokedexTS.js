"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//Capturando valores del DOM
let nombrePokemon = document.querySelector("#nombrePokemon");
let resultado = document.querySelector("#resultado");
let contenedor = document.querySelector(".contenedor__card");
//Funcion para borrar el contenido del contenedor
let borrar = document.querySelector("#borrar");
borrar.addEventListener("click", () => {
    contenedor.className = "contenedor__card waiting";
    resultado.innerHTML = "";
    nombrePokemon.value = "";
    nombrePokemon.placeholder = "Busca tu pokemon";
});
//Funcion para buscar el pokemon
let buscar = document.querySelector("#buscar");
buscar.addEventListener("click", () => {
    obtenerPokemon(nombrePokemon, resultado, contenedor);
});
//Petición a API
const obtenerPokemon = (nombrePokemon, resultado, contenedor) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon.value.toLowerCase()}`;
    const requerimiento = yield fetch(url);
    //Validando si el pokemon existe
    if (requerimiento.status === 200) {
        const pokemon = yield requerimiento.json();
        //Mostrando el pokemon
        const id = pokemon.id;
        const nombre = toCamelCase(pokemon.name);
        const tipo = toCamelCase(pokemon.types[0].type.name);
        const peso = pokemon.weight;
        const altura = pokemon.height;
        const imagen = pokemon.sprites.front_default;
        contenedor.className = "contenedor__card";
        resultado.innerHTML = `
    <img src="${imagen}" alt="${nombre}">
    <p><strong>N°</strong>${id}</p><br>
    <p><strong>Nombre:</strong> ${nombre}</p><br>
    <p><strong>Tipo:</strong> ${tipo}</p><br>
    <p><strong>Peso:</strong> ${peso / 10} Kg</p><br>
    <p><strong>Altura:</strong> ${altura / 10} m </p><br>
    `;
    }
    else {
        //Resetea la visualizacion de los resultados y avisa si no existe el pokemon
        contenedor.className = "contenedor__card waiting";
        resultado.innerHTML = "";
        nombrePokemon.value = "";
        nombrePokemon.placeholder = "Pokemon no encontrado";
    }
});
// Funcion para convertir el nombre del pokemon a camelCase
function toCamelCase(str) {
    let text = str.split("");
    text[0] = text[0].toUpperCase();
    return text.join("");
}
