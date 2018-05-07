export default class PokeApi {
    constructor() {
        this.baseUrl = 'http://pokeapi.salestock.net/api/v2/pokemon/';
    }
    list(nextUrl) {
        let url = nextUrl ? nextUrl : `${this.baseUrl}?limit=60`;
        return fetch(url, this.requestInfo)
            .then(response => response.json());
    }
    get(id) {
        return fetch(`${this.baseUrl}${id}`, this.requestInfo)
            .then(response => response.json());
    }
}