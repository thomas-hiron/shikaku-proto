/**
 * Gestion de la grille
 */
export default class Grid {

    constructor(number) {

        this.number = number;
        this.gridElem = document.querySelector('.grid');

        /* Création de la grille */
        this.resetGrid();
    }

    /**
     * Ajoute les rectangles
     *
     * @param tryNumber Le nombre d'essai
     */
    addRectangles(tryNumber = 0) {

        let leftNumber = this.getLeftNumber();

        /* Génération d'un rectangle, pas plus de la moitié de la grille */
        let width = parseInt(Math.random() * this.number / 2) + 1;
        let height = parseInt(Math.random() * this.number / 2) + 1;
        let area = width * height;
        let totalArea = this.number * this.number;

        /* Pas de rectangle simple */
        if (area !== 1) {
            /* Récupération des prochaines cases dispo */
            let [i, j] = this.getNextUnoccupied();

            /* Assignation pour décalage */
            let startX = i;
            let startY = j;

            /* Vérif assez de place dispo (pas de chevauchement ou de sortie de grille */
            let canAdd = this.canAdd(startX, startY, width, height);

            /* Ajout */
            if (canAdd) {
                let color = "#" + ((1 << 24) * Math.random() | 0).toString(16);
                let grid = this.gridElem.firstElementChild;
                /* Un numéro de case aléatoire et le nombre de cases ajoutées */
                let rand = parseInt(Math.random() * area) + 1;
                let number = 0;
                for (i = startX; i < width + startX; ++i) {
                    for (j = startY; j < height + startY; ++j) {

                        /* Affichage du nombre et de la couleur */
                        if (++number === rand) {
                            grid.children[j].children[i].style.backgroundColor = color;
                            grid.children[j].children[i].setAttribute('data-content', area);
                        }
                        else {
                            grid.children[j].children[i].style.backgroundColor = '#fff';
                        }
                    }
                }
            }
        }
        else {
            /* Réinitialisation si trop d'essais */
            if (tryNumber > Math.pow(this.number, 2)) {
                tryNumber = 0;
                this.resetGrid();
            }
        }

        /* Encore de la place, rajout */
        if (!this.gridFull()) {
            this.addRectangles(++tryNumber);
        }
        /* Début de la partie */
        else {
            let event = new CustomEvent("StartGame");
            document.dispatchEvent(event);
        }
    }

    /**
     * Récupère les coords de la prochaine case non occupée
     *
     * @returns {[int,int]}
     */
    getNextUnoccupied() {

        let grid = this.gridElem.firstElementChild;
        let i = 0;
        let j = 0;
        grid:
            for (let tr of grid.children) {
                for (let td of tr.children) {
                    /* Assez de place */
                    if (td.style.backgroundColor === "") {
                        break grid;
                    }

                    ++i;
                }

                ++j;
                i = 0;
            }

        return [i, j];
    }

    /**
     * Si on peut ajouter le rectangle aux coords en param et à la taille
     *
     * @param startX
     * @param startY
     * @param width
     * @param height
     *
     * @returns {boolean}
     */
    canAdd(startX, startY, width, height) {

        let grid = this.gridElem.firstElementChild;
        for (let i = startX; i < width + startX; ++i) {
            for (let j = startY; j < height + startY; ++j) {
                try {
                    if (grid.children[j].children[i].style.backgroundColor !== "") {
                        return false;
                    }
                }
                catch (e) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Si la grille est complète
     *
     * @returns {boolean}
     */
    gridFull() {

        return this.getLeftNumber() === 0;
    }

    /**
     * Retourne le nombre de cases restantes
     *
     * @returns {boolean}
     */
    getLeftNumber() {

        let grid = this.gridElem.firstElementChild;
        let leftNumber = 0;
        for (let tr of grid.children) {
            for (let td of tr.children) {
                if (td.style.backgroundColor === "") {
                    ++leftNumber;
                }
            }
        }

        return leftNumber;
    }

    /**
     * Réinitialise la grille
     *
     * @returns {boolean}
     */
    resetGrid() {

        let grid = document.createElement("TABLE");
        for (let i = 0; i < this.number; ++i) {

            let tr = document.createElement("TR");
            for (let j = 0; j < this.number; ++j) {
                tr.appendChild(document.createElement("TD"));
            }

            grid.appendChild(tr);
        }

        this.gridElem.innerHTML = "";
        this.gridElem.appendChild(grid);
    }
}