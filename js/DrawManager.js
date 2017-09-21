/**
 * Classe qui gère le dessin des cases
 */
export default class DrawManager {

    constructor() {

        let grid = document.querySelector('.grid');

        /* La couleur pour dessiner */
        this.color = null;

        /* Ajout du listener mousedown */
        grid.addEventListener('mousedown', (e) => this.onMouseDown(e), false);

        /* Ajout du listener mouseup */
        grid.addEventListener('mouseup', (e) => this.onMouseUp(e), false);

        /* Ajout du listener mousemove */
        grid.addEventListener('mousemove', (e) => this.onMouseMove(e), false);
    }

    /**
     * Mousedown, init de la couleur qui va permettre de dessiner
     *
     * @param e
     */
    onMouseDown(e) {

        e.preventDefault();
        let bgc = e.target.style.backgroundColor;

        /* Si pas de blanc */
        if (!bgc.match(/(.*255){3}/)) {
            this.color = bgc;
        }
    }

    /**
     * Mouseup, plus de dessin
     *
     * @param e
     */
    onMouseUp(e) {

        this.color = null;
    }

    /**
     * Mousemove, on dessine
     *
     * @param e
     */
    onMouseMove(e) {

        /* Pour pas dessiner sur les blocs fixes */
        if (e.target.getAttribute('data-content') === null && this.color !== null && e.target.nodeName === "TD") {

            /* Vérification des cases adjacentes */
            let hasAdjacentWithSameColor = false;
            let adjacents = this.getAdjacentsTiles(e.target);
            for (let adjacent of adjacents) {

                if (adjacent.style.backgroundColor === this.color) {
                    hasAdjacentWithSameColor = true;
                }
            }

            if (hasAdjacentWithSameColor) {
                e.target.style.backgroundColor = this.color;
            }
        }
    }

    /**
     * Récupère les cases à côté
     *
     * @param elem
     *
     * @returns {Array}
     */
    getAdjacentsTiles(elem) {

        let adjacents = [];

        /* Gauche et droite */
        if (elem.previousElementSibling !== null) {
            adjacents.push(elem.previousElementSibling);
        }
        if (elem.nextElementSibling !== null) {
            adjacents.push(elem.nextElementSibling);
        }

        let parent = elem.parentNode;
        let index = Array.prototype.indexOf.call(parent.childNodes, elem);

        /* Haut et bas */
        if (parent.previousElementSibling !== null) {
            adjacents.push(parent.previousElementSibling.children[index]);
        }
        if (parent.nextElementSibling !== null) {
            adjacents.push(parent.nextElementSibling.children[index]);
        }

        return adjacents;
    }
}