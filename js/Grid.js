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

            /* Génération d'un rectangle, pas plus d'un tier de la grille */
            let width = parseInt(Math.random() * this.number) + 1;
            let height = parseInt(Math.random() * this.number) + 1;
            let area = width * height;
            let totalArea = this.number * this.number;

            /* Pas plus de la moitiée de la grille */
            if (area / totalArea > 1 / 2) {
                continue;
            }

            let table = this.gridElem.firstElementChild;

            /* Récupération des prochaines cases dispo */
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

            /* Assignation pour décalage */
            let startX = i;
            let startY = j;

            /* Vérif assez de place dispo */
            let canAdd = true;
            add:
                for (i = startX; i < width + startX; ++i) {
                    for (j = startY; j < height + startY; ++j) {
                        try {
                            if (table.children[j].children[i].style.backgroundColor !== "") {
                                canAdd = false;
                                break add;
                            }
                        }
                        catch (e) {
                            canAdd = false;
                            break add;
                        }
                    }
                }

            /* Ajout sans chevauchement ou case déjà remplie */
            if (canAdd) {
                let color = "#" + ((1 << 24) * Math.random() | 0).toString(16);
                for (i = startX; i < width + startX; ++i) {
                    for (j = startY; j < height + startY; ++j) {
                        table.children[j].children[i].style.backgroundColor = color;
                    }
                }
            }

            /* Stoppage de la boucle */
            let stop = true;
            stop:
                for (let tr of table.children) {
                    for (let td of tr.children) {
                        if (td.style.backgroundColor === "") {
                            stop = false;
                            break stop;
                        }
                    }
                }

            if (stop) {
                break;
            }
        }
    }
}