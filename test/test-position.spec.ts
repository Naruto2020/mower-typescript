import { Position } from '../src/lib/position';
describe('Position', () => {
  it('should export the class', () => {
    expect(Position).not.toBeUndefined();
  });

  const [EAST, SOUTH, NORTH, WEST] = ['E', 'S', 'N', 'W'];

  describe('create a position instance', () => {
    const x = '1';
    const y = '2';
    const orientation = NORTH;
    const position = new Position(x, y, orientation);

    it('should create a Position instance', () => {
      expect(position).toEqual({"orientation": "N", "x": 1, "y": 2});
      expect(position).toBeInstanceOf(Position);
    });
    it('should include x, y and orientation properties', () => {
      expect(position).toHaveProperty('x');
      expect(position).toHaveProperty('y');
      expect(position).toHaveProperty('orientation');
    });
    it('should include x, y, orientation well-formated instantiatied value', () => {
      expect(position.x).not.toBeNaN();
      expect(position.y).not.toBeNaN();
      expect(position.orientation).toBe("N");
    });
  });

  describe('rotations', () => {
    describe(NORTH, () => {
      it('turnLeft should rotate the position to W', () => {
        const position = new Position(0, 0, NORTH);
        position.turnLeft();

        expect(position.orientation).toBe('W');
        expect(position.orientation).toEqual(WEST);
      });
      it('turnRight should rotate the position to E', () => {
        const position = new Position(0, 0, NORTH);
        position.turnRight();

        expect(position.orientation).toBe('E');
        expect(position.orientation).toEqual(EAST);
      });
    });

    describe(WEST, () => {
      it('turnLeft should rotate the position to S', () => {
        const position = new Position(0, 0, WEST);
        position.turnLeft();

        expect(position.orientation).toBe('S');
        expect(position.orientation).toEqual(SOUTH);
      });
      it('turnRight should rotate the position to N', () => {
        const position = new Position(0, 0, WEST);
        position.turnRight();

        expect(position.orientation).toBe('N');
        expect(position.orientation).toEqual(NORTH);
      });
    });

    describe(SOUTH, () => {
      it('turnLeft should rotate the position to E', () => {
        const position = new Position(0, 0, SOUTH);
        position.turnLeft();

        expect(position.orientation).toBe('E');
        expect(position.orientation).toEqual(EAST);
      });
      it('turnRight should rotate the position to W', () => {
        const position = new Position(0, 0, SOUTH);
        position.turnRight();

        expect(position.orientation).toBe('W');
        expect(position.orientation).toEqual(WEST);
      });
    });

    describe(EAST, () => {
      it('turnLeft should rotate the position to N', () => {
        const position = new Position(0, 0, EAST);
        position.turnLeft();

        expect(position.orientation).toBe('N');
        expect(position.orientation).toEqual(NORTH);
      });
      it('turnRight should rotate the position to S', () => {
        const position = new Position(0, 0, EAST);
        position.turnRight();

        expect(position.orientation).toBe('S');
        expect(position.orientation).toEqual(SOUTH);
      });
    });
  });
});