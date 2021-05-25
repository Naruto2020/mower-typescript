"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
// initialisation des instructions 
const ALLOWED_INSTRUCTIONS = ['A', 'D', 'G'];
// initialisation de la classe Transaction 
class Transaction {
    constructor(mower, instruction) {
        this.mower = mower;
        this.instruction = instruction;
    }
    // methode pour s'assurer de la  validité de l'instruction recu 
    static isValidInstruction(instruction) {
        return ALLOWED_INSTRUCTIONS.includes(instruction);
    }
    // execution de l'instruction 
    run() {
        this.mower.move(this.instruction);
    }
    // retourne l'instruction sous forme de string 
    toString() {
        return `'${this.instruction}' sur ${this.mower}`;
    }
}
exports.Transaction = Transaction;
//module.exports = Transaction;
