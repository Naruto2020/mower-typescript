import {Transaction} from './transaction';
import {mowerFactory} from './mower';

/**
 *  analyse de de l'apirateur en position initial (5 5 N) 
 * param {string} initPositionLine ligne contenant la position initial 
 * retourne {Position} position initial de l'aspirateur 
 * throws {Error}  si la ligne n'est pas correcte 
 */

const parseMowerPosition = (initialPositionLine: string):any => {
  const initPositionLineRegex:RegExp = /(\d+) (\d+) ([N|E|W|S]$)/;
  const isValidInitPositionLine:boolean = initPositionLineRegex.test(initialPositionLine);

  if (!isValidInitPositionLine){
    throw new Error(`ligne contenant la position initiale de l'aspirateur invalide . devrais être 'X Y ORIENTATION'.. '${initialPositionLine}' trouvé.`);
  }

  // grace à l'affectation par décomposition on ignore les éléments avant la position initiale 
  const [ , x, y, orientation]:any = initialPositionLine.match(initPositionLineRegex);

  return mowerFactory(x, y, orientation);
};

/**
 * analyse de la ligne d'instruction de l'aspirateur dans un tableau d'instruction 
 * param {string} instructionLine  contient les instructions de l'aspirateur 
 * retourne {Array}  contient la liste d'instructions de l'aspirateur 
 * throws {Error}  si la ligne d'instruction n'est pas valide 
 */

const parseInstructionsLine = (instructionLine: string ):any => {
  const instructionsRegex:RegExp = /([A|D|G][^\s-]$)/;
  const isValidInstructions:boolean = instructionsRegex.test(instructionLine);

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

const parseCurrentMower = (initMowerPositionLine:string, mowerInstructionsLine: string) => {
  const mower = parseMowerPosition(initMowerPositionLine);
  const mowerInstructions = parseInstructionsLine(mowerInstructionsLine);

  const mowerTransactions = mowerInstructions.map((instruction: string) =>
    new Transaction(mower, instruction));

  return { mower, mowerTransactions };
};

/**
 *  analyse les spécifications de l'aspirateur en action pour creer un environnement initiale  
 * 
 * param {string} specs spécifications des aspirateurs en action 
 * retourne  objet contenant l'aspirateur et ça liste de transactions
 */

export const parseMowItNowSpecs = (specs: any) => {
  const isValidSpecs:boolean = specs && typeof specs === 'string';
  if (!isValidSpecs) {
    throw Error(' les spécifications pour executer les aspirateurs en action sont invalides .verrifier la doc svp.');
  }

  const splitSpecs:string[] = specs.split('\n');

  // on extrait l'en-tête representant les spécifications du jardin
  const landSpecsRegex:RegExp = /(\d+) (\d+)/;
  const [, width, height]:any = splitSpecs[0].match(landSpecsRegex);
  splitSpecs.shift();

  const mowersDefinition:(string|number)[] = [];
  for (let line = 0; line < splitSpecs.length; line += 2) {
    const initMowerPositionLine:string = splitSpecs[line].trim();
    console.log("ligne",splitSpecs[line + 1]);
    const mowerInstructionsLine:string = splitSpecs[line + 1].trim();

    const mowerDefinition :any = parseCurrentMower(initMowerPositionLine, mowerInstructionsLine);

    mowersDefinition.forEach((mowerDef:any):void => {
      const mowerStoredState:any = mowerDef.mower.getCurrentState();
      const mowerToAddState:any = mowerDefinition.mower.getCurrentState();
      const isOnSamePosition:boolean = mowerStoredState.x === mowerToAddState.x && mowerStoredState.y === mowerToAddState.y;

      if (isOnSamePosition) {
        throw new Error('deux aspirateurs à la meme position.');
      }
    });
    mowersDefinition.push(mowerDefinition);
    return {
      landSize: { width, height },
      mowersDefinition,
    }  
  };
};    

//exports.parseMowItNowSpecs = parseMowItNowSpecs;