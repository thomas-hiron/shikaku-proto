/**
 * Classe qui gère l'appli
 */
import Grid from "./Grid";

export default class Shikaku {

    constructor() {

        this.grid = null;

        /* Ajout des listeners sur les boutons */
        let btns = document.querySelectorAll('button');
        for (let btn of btns)
            btn.addEventListener('click', (e) => this.createGrid(e), false);
    }

    /**
     * Bouton cliqué, création de la grille
     *
     * @param e
     */
    createGrid(e) {
        let number = e.currentTarget.value;
        this.grid = new Grid(number);
    }
}