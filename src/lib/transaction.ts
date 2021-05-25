// initialisation des instructions 
const ALLOWED_INSTRUCTIONS:string[] = ['A', 'D', 'G'];

// initialisation de la classe Transaction 

export class Transaction {
    mower: any;
    instruction: string;
    constructor( mower:any, instruction:string){
        this.mower = mower;
        this.instruction = instruction;
    }

    // methode pour s'assurer de la  validité de l'instruction recu 
    static  isValidInstruction(instruction:string):any{
        return ALLOWED_INSTRUCTIONS.includes(instruction);
    }

    // execution de l'instruction 
    
    run():void{
        this.mower.move(this.instruction);
    }

    // retourne l'instruction sous forme de string 
    toString():any{
        return `'${this.instruction}' sur ${this.mower}`;
    }
}

//module.exports = Transaction;