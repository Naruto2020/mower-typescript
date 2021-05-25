"use strict";
const fs = require('fs');
const mowItNow_1 = require('../src/lib/mowitnow');
const MowItNowWorker = require('../src/lib/mowitnow');
// test mowItNow 
describe('mowItNow', () => {
    let worker = mowItNow_1.mowItNow();
    it('should export the mowItNow factory helper', () => {
        expect(mowItNow_1.mowItNow()).toEqual({ "history": [], "land": {}, "log": null, "queues": [] });
    });
    describe('factory create a new MowItNowWorker', () => {
        it('should return a MowItNowWorker', () => {
            expect(worker).toBeInstanceOf(mowItNow_1.MowItNowWorker);
            expect(worker.queues).toEqual([]);
            expect(worker.land).toEqual({});
            expect(worker.history).toEqual([]);
        });
    });
    describe('init with helpers functions', () => {
        const instructionPath = './test/simple-instructions.txt';
        const instructions = fs.readFileSync(instructionPath, 'utf-8');
        const arrayInstructions = instructions.split('\n');
        it('should init with plain text and return current instance', () => {
            const returnedValue = worker.fromText(instructions);
            expect(worker.queues).not.toEqual([]);
            expect(worker.land).not.toEqual({});
            expect(worker.history).toEqual([]);
            expect(returnedValue).toEqual(worker);
        });
        it('should init from array and return current instance', () => {
            const returnedValue = worker.fromArray(arrayInstructions);
            expect(worker.queues).not.toEqual([]);
            expect(worker.land).not.toEqual({});
            expect(worker.history).toEqual([]);
            expect(returnedValue).toEqual(worker);
        });
        it('should init from file - async', () => {
            worker.fromFileAsync(instructionPath, (worker) => {
                expect(worker.queues).not.toEqual([]);
                expect(worker.land).not.toEqual({});
                expect(worker.history).toEqual([]);
            });
        });
        it('raise Exception if two mowers have been found at the same position', () => {
            const filePath = './test/same-position-mowers-instructions.txt';
            const initWorker = () => { worker.fromFileSync(filePath); };
            expect(initWorker).toThrow(Error);
        });
    });
    describe('getMowers()', () => {
        const instructionPath = './test/simple-instructions.txt';
        worker = mowItNow_1.mowItNow().fromFileSync(instructionPath);
        it('it should be a MowItNowWorker function', () => {
            expect(worker.getMowers).toBe(Function);
        });
        it('should return an array', () => {
            const mowers = worker.getMowers();
            expect(mowers).not.toEqual([]);
        });
        it('should containing current mowers states (position, isStuck)', () => {
            const mowers = worker.getMowers();
            mowers.forEach((mower) => {
                expect(mower).toHaveProperty('x');
                expect(mower).toHaveProperty('y');
                expect(mower).toHaveProperty('orientation');
                expect(mower).toHaveProperty('status');
            });
        });
    });
});
