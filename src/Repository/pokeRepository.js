export default class PokemonRepository {

  constructor(database = require('./pokemons.json')) {
    this.baseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
    this.database = database;
  }

  getPokemonById(id) {
    return this.database.find(data => data.id === id);
  }

  getPokemonByName(name) {
    return this.database.find(data => data.identifier === name);
  }

  getSpriteByName(name) {
    let id =this.getPokemonByName(name).id;
    return this.baseUrl.concat(`${id}.png`);
  }

  getSpriteById(id) {
    return this.baseUrl.concat(`${id}.png`);
  }

  getNames(){
    return this.database.map(pokemon => pokemon.identifier);
  }
}