/**
 * Gestion de la grille
 */
export default class Grid {

    constructor(number) {

        this.number = number;
        this.gridElem = document.querySelector('.grid');

        /* Création de la grille */
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

    /**
     * Ajoute les rectangles
     */
    addRectangles() {

        while (true) {

            /* Génération d'un rectangle */
            let width = parseInt(Math.random() * this.number) + 1;
            let height = parseInt(Math.random() * this.number) + 1;
            let area = width * height;
            let totalArea = this.number * this.number;

            /* Pas plus de la moitiée de la grille */
            if (area / totalArea > 1 / 2) {
                continue;
            }

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

            /* Stoppage de la boucle */
            if (this.gridFull()) {
                break;
            }
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

        let table = this.gridElem.firstElementChild;
        for (let tr of table.children) {
            for (let td of tr.children) {
                if (td.style.backgroundColor === "") {
                    return false;
                }
            }
        }

        return true;
    }
}