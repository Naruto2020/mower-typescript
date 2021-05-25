// initialisation de la classe Positon 
export class Position{
    x: number|string;
    y: number|string;
    orientation: any;

    constructor(x: any, y:any, orientation:any = null){
        this.x = Number.parseInt(x, 10);
        this.y = Number.parseInt(y, 10);
        this.orientation = orientation; 
    }

    // representation des orientations
    getRepresentation():any{
        switch(this.orientation){
            case 'N' : return ' ^ ';
            case 'E' : return ' > ';
            case 'S' : return ' v ';
            case 'W' : return ' < ';
            default : return ' '; 
        }
    }

    // gestion des orientations 90° left et  right 
    turnLeft():void {
        switch (this.orientation) {
            case 'N':
                this.orientation = 'W';
                break;
            case 'W':
                this.orientation = 'S';
                break;
            case 'S':
                this.orientation = 'E';
                break;
            case 'E':
                this.orientation = 'N';
                break;
            default: break;
        }
    }

    turnRight():void {
        switch (this.orientation) {

            case 'N':
                this.orientation = 'E';
                break;
            case 'W':
                this.orientation = 'N';
                break;
            case 'S':
                this.orientation = 'W';
                break;
            case 'E':
                this.orientation = 'S';
                break;
            default: break;
        }
    }

    // on definit la prochaine position en fonction du déplacement de la tondeuse
    getNextPosition():void{
        // on copie les propriétés directes et enumérables de l'objet position sur l'instance newPosition
        const newPosition : any = Object.assign(Object.create(Object.getPrototypeOf(this)), this);

        switch (this.orientation) {
            case 'N':
                newPosition.y += 1;
                break;
            case 'W':
                newPosition.x -= 1;
                break;
            case 'S':
                newPosition.y -= 1;
                break;
            case 'E':
                newPosition.x += 1;
                break;
            default: break;
        }
        return newPosition;
    } 

    // on retourne la position sous forme de string 
    toString():any {
        return `${this.x} ${this.y} ${this.orientation}`;
    }

}

//module.exports = Position;