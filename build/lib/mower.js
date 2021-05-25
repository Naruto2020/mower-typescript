"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mowerFactory = void 0;
// import modules 
const position_1 = require("./position");
const { EventEmitter } = require('events'); // permet de renforcer le couplage entre les modules 
// initialisation de la classe Aspirateur héritant de Eventmitter 
class Mower extends EventEmitter {
    constructor(position) {
        super();
        this.position = position;
        this.status = 'off';
    }
    /**
     * Execution de la commande en paramètre (A pour avancer, D pour tourner a droite , G pour tourner à gauche)
     *  (transaction) commande à executer
     */
    move(transaction) {
        switch (transaction) {
            case 'A': {
                // Calcul la position suivante et l'afficher
                const nextPosition = this.position.getNextPosition();
                // reaction de l'aspirateur suite a l'evenement 'A' avancer 
                this.emit('moveTo', nextPosition);
                break;
            }
            case 'D':
                this.position.turnRight();
                break;
            case 'G':
                this.position.turnLeft();
                break;
            default: break;
        }
    }
    /**
     * on déplace  l' aspirateur  vers la position  en paramètre
     *  (position) la position à rejoindre
     */
    moveTo(position) {
        this.position = position;
    }
    /**
     * on change le status si un aspirateur est bloquée par un autre
     */
    block() {
        this.status = 'stuck';
    }
    /**
     * on change le status quand l' aspirateur  est en marche
     */
    start() {
        this.status = 'running';
    }
    /**
     * on change le status quand l'aspirateur a terminée
     */
    end() {
        this.status = 'finished';
    }
    /**
     *  boolean pour savoir si l' aspirateur est bloquée par une autre
     *  {boolean} True si l'aspi est bloquée
     */
    isBlocked() {
        return this.status === 'stuck';
    }
    /**
     * boolean pour savoir si l' aspirateur est arrivée a ca position final ie n'a plus de commande à exécuter
     */
    hasFinished() {
        return this.status === 'finished';
    }
    /**
     * on stoke l'aspirateur dans un objet
     *  {object} contient l'etat actuel de l'aspirateur
     */
    getCurrentState() {
        //on retourne la copie des propriétés directes et enumérables de l'objet Aspirateur (Mower) 
        return Object.assign({}, this.position, { status: this.status });
    }
    // on retourne la position de la tondeuse et son status sous forme de string
    toString() {
        return `Mower: ${this.position}, status=${this.status}`;
    }
}
// conception des aspirateur à partir de la classe Mower 
const mowerFactory = (x, y, orientation) => {
    const position = new position_1.Position(x, y, orientation);
    return new Mower(position);
};
exports.mowerFactory = mowerFactory;
