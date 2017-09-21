/**
 * Classe qui gère la partie
 */
export default class GameManager {

    constructor() {

        this.gridElem = document.querySelector('.grid');
        this.fixedTiles = [];
        this.playing = false;

        /* Début de partie */
        document.addEventListener('StartGame', () => this.startGame(), false);
        setInterval(() => this.checkFullRectangles(), 300);
    }

    /**
     * Récupère les cases fixes pour vérifier ensuite si les rectangles sont complets
     */
    startGame() {

        this.fixedTiles = [];
        this.playing = true;

        let grid = this.gridElem.firstElementChild;
        for (let tr of grid.children) {
            for (let td of tr.children) {
                if (td.getAttribute('data-content') !== null)
                    this.fixedTiles.push(td);
            }
        }
    }

    /**
     * Déplacement, vérification des rectangles ok
     */
    checkFullRectangles() {

        if (!this.playing) {
            return;
        }

        let completeTiles = 0;
        for (let fixedTile of this.fixedTiles) {

            let number = parseInt(fixedTile.getAttribute('data-content'));
            let color = fixedTile.style.backgroundColor;

            /* Récupération de la case la plus haute */
            let higherTile = this.getHigherTile(fixedTile);

            /* Récupération de toutes les cases sur la même horizontale */
            let horizontalTiles = this.getHorizontalTiles(higherTile);

            /* Vérification que toutes les lignes en dessous sont de la même couleur et que ça donne le bon nombre */
            if (this.isRectangle(horizontalTiles, number)) {
                fixedTile.classList.add('big');
                ++completeTiles;
            }
            else {
                fixedTile.classList.remove('big');
            }
        }

        /* Gagné */
        if (completeTiles === this.fixedTiles.length) {
            this.playing = false;
            alert('Gagné !');
        }
    }

    /**
     * Récupère la case la plus haute à partir de celle en param
     *
     * @param tile
     *
     * @returns {*}
     */
    getHigherTile(tile) {
        let parent = tile.parentNode;
        let index = Array.prototype.indexOf.call(parent.childNodes, tile);
        let higherTile = tile;

        while (true) {

            if (parent.previousElementSibling !== null) {

                let previousYTile = parent.previousElementSibling.children[index];
                if (previousYTile.style.backgroundColor === tile.style.backgroundColor) {
                    higherTile = previousYTile;
                }
                else {
                    break;
                }

                /* Ligne précédente */
                parent = parent.previousElementSibling;
            }
            else {
                break;
            }
        }

        return higherTile;
    }

    /**
     * Récupère toutes les cases sur la même horizontale
     *
     * @param tile
     *
     * @returns {[null]}
     */
    getHorizontalTiles(tile) {
        let horizontalTiles = [tile];

        /* Gauche */
        let prevTile = tile;
        while (true) {

            prevTile = prevTile.previousElementSibling;
            if (prevTile !== null && prevTile.style.backgroundColor === tile.style.backgroundColor) {
                horizontalTiles.unshift(prevTile);
            }
            else {
                break;
            }
        }

        /* Droite */
        let nextTile = tile;
        while (true) {

            nextTile = nextTile.nextElementSibling;
            if (nextTile !== null && nextTile.style.backgroundColor === tile.style.backgroundColor) {
                horizontalTiles.push(nextTile);
            }
            else {
                break;
            }
        }

        return horizontalTiles;
    }

    /**
     * Parcours toutes les lignes pour savoir si tout est bon
     *
     * @param horizontalTiles
     *
     * @param number
     *
     * @returns {boolean}
     */
    isRectangle(horizontalTiles, number) {

        let currentTilesNumber = 0;
        let indexes = [];

        while (true) {

            let indexTmp = [];
            let parent = horizontalTiles[0].parentNode;
            /* Récupération de tous les indexes */
            for (let tile of horizontalTiles) {

                let index = Array.prototype.indexOf.call(parent.childNodes, tile);
                indexTmp.push(index);
                ++currentTilesNumber;
            }

            /* Ajout des indexes dans le tableau pour comparaison */
            indexes.push(indexTmp);

            /* Case suivante */
            if (parent.nextElementSibling !== null) {

                for (let tile of horizontalTiles) {
                    let index = Array.prototype.indexOf.call(parent.childNodes, tile);
                    let nextTile = parent.nextElementSibling.children[index];

                    /* Il y a bien une case en dessous, break pour que la boucle while continue */
                    if (nextTile.style.backgroundColor === tile.style.backgroundColor) {
                        horizontalTiles = this.getHorizontalTiles(nextTile);
                        break;
                    }
                    else {
                        horizontalTiles = null;
                    }
                }

                /* Plus de cases en dessous */
                if (horizontalTiles === null) {
                    break;
                }
            }
            /* Plus de cases */
            else {
                break;
            }
        }

        /* Vérification de tous les indexes */
        let sameIndexes = true;
        for (let i = 0, l = indexes.length; i < l - 1; ++i) {
            if (indexes[i].join(',') !== indexes[i + 1].join(',')) {
                sameIndexes = false;
            }
        }

        return currentTilesNumber === number && sameIndexes === true;
    }
}