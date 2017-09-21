/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Shikaku_js__ = __webpack_require__(1);


/* Démarrage */
new __WEBPACK_IMPORTED_MODULE_0__Shikaku_js__["a" /* default */]();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Grid__ = __webpack_require__(2);
/**
 * Classe qui gère l'appli
 */


class Shikaku {

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
        this.grid = new __WEBPACK_IMPORTED_MODULE_0__Grid__["a" /* default */](number);

        /* Ajout des rectangles */
        this.grid.addRectangles();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Shikaku;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Gestion de la grille
 */
class Grid {

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
                /* Un numéro de case aléatoire et le nombre de cases ajoutées */
                let rand = parseInt(Math.random() * area) + 1;
                let number = 0;
                for (i = startX; i < width + startX; ++i) {
                    for (j = startY; j < height + startY; ++j) {

                        /* Affichage du nombre et de la couleur */
                        if (++number === rand) {
                            table.children[j].children[i].style.backgroundColor = color;
                            table.children[j].children[i].setAttribute('data-content', area);
                        }
                        else {
                            table.children[j].children[i].style.backgroundColor = '#fff';
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Grid;


/***/ })
/******/ ]);