"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const position_1 = require("../src/lib/position");
describe('Position', () => {
    it('should export the class', () => {
        expect(position_1.Position).not.toBeUndefined();
    });
    const [EAST, SOUTH, NORTH, WEST] = ['E', 'S', 'N', 'W'];
    /*describe('create a position instance', () => {
      const x = '1';
      const y = '2';
      const orientation = NORTH;
      const position = new Position(x, y, orientation);
  
      it('should create a Position instance', () => {
        expect(position).to.be.a('object');
        expect(position).to.be.a.instanceOf(Position);
      });
      it('should include x, y and orientation properties', () => {
        expect(position).to.have.ownProperty('x');
        expect(position).to.have.ownProperty('y');
        expect(position).to.have.ownProperty('orientation');
      });
      it('should include x, y, orientation well-formated instantiatied value', () => {
        expect(position.x).to.be.a('number');
        expect(position.y).to.be.a('number');
        expect(position.orientation).to.be.a('string');
        expect(position).to.include({ x: parseInt(x, 10) });
        expect(position).to.include({ y: parseInt(y, 10) });
        expect(position).to.include({ orientation });
      });
    });*/
});
