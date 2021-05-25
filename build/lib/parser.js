"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMowItNowSpecs = void 0;
const transaction_1 = require("./transaction");
const mower_1 = require("./mower");
/**
 *  analyse de de l'apirateur en position initial (5 5 N)
 * param {string} initPositionLine ligne contenant la position initial
 * retourne {Position} position initial de l'aspirateur
 * throws {Error}  si la ligne n'est pas correcte
 */
const parseMowerPosition = (initialPositionLine) => {
    const initPositionLineRegex = /(\d+) (\d+) ([N|E|W|S]$)/;
    const isValidInitPositionLine = initPositionLineRegex.test(initialPositionLine);
    if (!isValidInitPositionLine) {
        throw new Error(`ligne contenant la position initiale de l'aspirateur invalide . devrais être 'X Y ORIENTATION'.. '${initialPositionLine}' trouvé.`);
    }
    // grace à l'affectation par décomposition on ignore les éléments avant la position initiale 
    const [, x, y, orientation] = initialPositionLine.match(initPositionLineRegex);
    return mower_1.mowerFactory(x, y, orientation);
};
/**
 * analyse de la ligne d'instruction de l'aspirateur dans un tableau d'instruction
 * param {string} instructionLine  contient les instructions de l'aspirateur
 * retourne {Array}  contient la liste d'instructions de l'aspirateur
 * throws {Error}  si la ligne d'instruction n'est pas valide
 */
const parseInstructionsLine = (instructionLine) => {
    const instructionsRegex = /([A|D|G][^\s-]$)/;
    const isValidInstructions = instructionsRegex.test(instructionLine);
    if (!isValidInstructions) {
        throw new Error(`instructions invalide : ${isValidInstructions}`);
    }
    return Array.from(instructionLine);
};
/**
 *  analyse des 2 lignes affichant l'aspirateur et ses instructions
 * param {string} initApirateurPositionLine  position ligne conetant la position initial
 * param {string} aspirateurInstructionsLine  contient les instructions de l'aspirateur
 */
const parseCurrentMower = (initMowerPositionLine, mowerInstructionsLine) => {
    const mower = parseMowerPosition(initMowerPositionLine);
    const mowerInstructions = parseInstructionsLine(mowerInstructionsLine);
    const mowerTransactions = mowerInstructions.map((instruction) => new transaction_1.Transaction(mower, instruction));
    return { mower, mowerTransactions };
};
/**
 *  analyse les spécifications de l'aspirateur en action pour creer un environnement initiale
 *
 * param {string} specs spécifications des aspirateurs en action
 * retourne  objet contenant l'aspirateur et ça liste de transactions
 */
const parseMowItNowSpecs = (specs) => {
    const isValidSpecs = specs && typeof specs === 'string';
    if (!isValidSpecs) {
        throw Error(' les spécifications pour executer les aspirateurs en action sont invalides .verrifier la doc svp.');
    }
    const splitSpecs = specs.split('\n');
    // on extrait l'en-tête representant les spécifications du jardin
    const landSpecsRegex = /(\d+) (\d+)/;
    const [, width, height] = splitSpecs[0].match(landSpecsRegex);
    splitSpecs.shift();
    const mowersDefinition = [];
    for (let line = 0; line < splitSpecs.length; line += 2) {
        const initMowerPositionLine = splitSpecs[line].trim();
        console.log("ligne", splitSpecs[line + 1]);
        const mowerInstructionsLine = splitSpecs[line + 1].trim();
        const mowerDefinition = parseCurrentMower(initMowerPositionLine, mowerInstructionsLine);
        mowersDefinition.forEach((mowerDef) => {
            const mowerStoredState = mowerDef.mower.getCurrentState();
            const mowerToAddState = mowerDefinition.mower.getCurrentState();
            const isOnSamePosition = mowerStoredState.x === mowerToAddState.x && mowerStoredState.y === mowerToAddState.y;
            if (isOnSamePosition) {
                throw new Error('deux aspirateurs à la meme position.');
            }
        });
        mowersDefinition.push(mowerDefinition);
        return {
            landSize: { width, height },
            mowersDefinition,
        };
    }
    ;
};
exports.parseMowItNowSpecs = parseMowItNowSpecs;
//exports.parseMowItNowSpecs = parseMowItNowSpecs;
