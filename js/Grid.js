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

            /* Pas plus d'1/3 de la grille */
            if (area / totalArea > 1 / 3) {
                continue;
            }

            let table = this.gridElem.firstElementChild;
            for (let i = 0; i < width; ++i) {

                for (let j = 0; j < height; ++j) {
                    table.children[j].children[i].classList.add('bg');
                }
            }

            break;
        }
    }
}