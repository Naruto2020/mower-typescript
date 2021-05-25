// import module
const fs = require("fs");
import {Land} from './land';
//import {parseInstructions} from './parser';
import {parseMowItNowSpecs} from './parser'

// initialisation de la classe MowItNowWorker
export class MowItNowWorker {
    log: { debug: (arg0: string) => void; } | null;
    queues: any[];
    land: any|{};
    history: [];
    constructor(logger = null) {
      this.log = logger;
  
      this.queues = [];
      this.land = {};
      this.history = [];
    }
  
    /**
     * affiche debug si loggin injecté 
     *  {*} toDebug  à deboger
     */
    debug(toDebug = '\n') {
      if (this.log) {
        this.log.debug(toDebug);
      }
    }
  
    /**
     * Initialisation de MowItNowWorker depuis une chaine de carractère
     *  {string} text  string contenant les instructions 
     * retourne l' instance courante 
     */
    fromText(text:string) {
      const mowItNow:any = parseMowItNowSpecs(text);
  
      const mowers:any = mowItNow.mowersDefinition.map((definition: { mower: any; }) => definition.mower);
      this.queues = mowItNow.mowersDefinition.map((definition: { mowerTransactions: any; }) => definition.mowerTransactions);
  
      const { width, height } = mowItNow.landSize;
      this.land = new Land(height, width, mowers);
  
      return this;
    }
  
    /**
     * Initialisation MowItNowWorker depuis un tableau 
     * parametre {array} mowItNow Array array contenant toutes les lignes d'instructions 
     * retourne  l'instance courante
     */
    fromArray(mowItNowArray: any[]) {
      const isValidArray = mowItNowArray && mowItNowArray instanceof Array && mowItNowArray.length >= 3;
  
      if (!isValidArray) {
        throw Error(`mauvais parametre dans le tableau mowItNow : ${mowItNowArray}`);
      }
      return this.fromText(mowItNowArray.join('\n'));
    }
  
    /**
     * Initialisation  MowItNowWorker depuis un fichier et appel du cb en parametre 
     * parametre {string} path  chemin du fichier d'instructions 
     * parametre {function} callback  fonction a appeler une fois terminé 
     * parametre {string} encoding  encodage fichier 
     */
    fromFileAsync(path:string, callback: (arg0: this) => void, encoding = 'utf-8') {
      fs.readFile(path, encoding, (err: any, instructions: string) => {
        if (err) {
          throw err;
        }
        callback(this.fromText(instructions));
      });
    }
  
    /**
     * Initialisation  MowItNowWorker depuis un fichier 
     * parametre {*} path chemin du fichier d'instructions
     * parametre {*} encoding encodage fichier 
     * retourne instance courante
     */
    fromFileSync(path:any, encoding:string = 'utf-8'):any {
      const instructions = fs.readFileSync(__dirname + path, encoding);
  
      return this.fromText(instructions);
    }
  
    /**
     * retourne un objet avec l'état actuel de l'aspirateur 
     * retourne un tableau d'objets
     */
    getMowers() {
      return this.land.mowers.map((mower: { getCurrentState: () => any; }) => mower.getCurrentState());
    }
  
    /**
     * résourdre le probleme de déplacement des aspirateur en les déplacants par itération 
     * si tous les aspirateurs en cours d'exécution sont tous bloqués urgence
     * throws Error si tous les aspirateurs en cours d'exécutions sont bloqués par un autre 
     * retourne instance courante 
     */
    resolve() {
      if (this.queues.length === 0) {
        throw Error('aucunes instructions trouvées. avez vous utilisé les fonctions d\' aides ?');
      }
  
      let allQueuesEmpty;
      do {
        allQueuesEmpty = this.queues.reduce((isQueuesEmpty, queue):any => {
          const isCurrentQueueEmpty = queue.length === 0;
  
          if (!isCurrentQueueEmpty) {
            const currentTransaction:any = queue.shift();
            this.debug(`Transaction: ${currentTransaction}`);
  
            // Execute commande
            currentTransaction.run();
            this.debug(`resultats ${currentTransaction.mower}`);
  
            // si l'aspirateur est bloqué par un autre mettre le déplacement en haut de la file d'attente
            if (currentTransaction.mower.isBlocked()) {
              queue.unshift(currentTransaction);
            }
  
            //  si plus de transaction dans la file, aspirateur en position final
            if (queue.length === 0) {
              currentTransaction.mower.end();
            }
  
            this.land.generateNewMap(); // pour chaque nouvel exécution 
          }
          return isQueuesEmpty && isCurrentQueueEmpty;
        }, true);
  
        // si tous les aspirateurs encore en marche sont bloquées 
        const blockedMowers:any[] = this.land.mowers.filter((mower: { isBlocked: () => any; }) => mower.isBlocked());
        const finishedMowers:any = this.land.mowers.filter((mower: { hasFinished: () => any; }) => mower.hasFinished());
        const isDeadLockCase:boolean = blockedMowers.length === (this.land.mowers.length - finishedMowers);
        this.debug(`Aspirateurs bloqués: ${blockedMowers}`);
        if (isDeadLockCase) {
          throw Error('Tous les aspirateurs encore en marche bloqués . Urgence !');
        }
  
        this.debug(this.land.toString());
      } while (!allQueuesEmpty);
      this.debug(this.land.mowers.map((mower: any) => mower).join('\n'));
  
      return this;
    }
}
  
export const mowItNow = (logger = null):any => new MowItNowWorker(logger);
  
