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
                let table = this.gridElem.firstElementChild;
                for (i = startX; i < width + startX; ++i) {
                    for (j = startY; j < height + startY; ++j) {
                        table.children[j].children[i].style.backgroundColor = color;
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

        if (!this.gridFull()) {
            this.addRectangles(++tryNumber);
        }
    }

    /**
     * Récupère les coords de la prochaine case non occupée
     *
     * @returns {[int,int]}
     */
    getNextUnoccupied() {

        let table = this.gridElem.firstElementChild;
        let i = 0;
        let j = 0;
        table:
            for (let tr of table.children) {
                for (let td of tr.children) {
                    /* Assez de place */
                    if (td.style.backgroundColor === "") {
                        break table;
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

        let table = this.gridElem.firstElementChild;
        for (let i = startX; i < width + startX; ++i) {
            for (let j = startY; j < height + startY; ++j) {
                try {
                    if (table.children[j].children[i].style.backgroundColor !== "") {
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

        let table = this.gridElem.firstElementChild;
        let leftNumber = 0;
        for (let tr of table.children) {
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

        let table = document.createElement("TABLE");
        for (let i = 0; i < this.number; ++i) {

            let tr = document.createElement("TR");
            for (let j = 0; j < this.number; ++j) {
                tr.appendChild(document.createElement("TD"));
            }

            table.appendChild(tr);
        }

        this.gridElem.innerHTML = "";
        this.gridElem.appendChild(table);
    }
}