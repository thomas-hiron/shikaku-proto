/**
 * Gestion de la grille
 */
export default class Grid {

    constructor(number) {

        this.number = number;
        this.gridElem = document.querySelector('.grid');

        let table = document.createElement("TABLE");
        for (let i = 0; i < number; ++i) {

            let tr = document.createElement("TR");
            for (let j = 0; j < number; ++j) {
                tr.appendChild(document.createElement("TD"));
            }

            table.appendChild(tr);
        }

        this.gridElem.innerHTML = "";
        this.gridElem.appendChild(table);
    }
}