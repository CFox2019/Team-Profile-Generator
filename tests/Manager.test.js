const { describe, it, expect } = require("@jest/globals");
const Manager = require("../lib/Manager");

describe("Manager", () => {
    const name = "Jeremy";
    const id = "234567";
    const email = "jeremy@test.com";
    const officeNumber = 7701234567;
    const manager = new Manager(name, id, email, officeNumber);

    describe('getOfficeNumber', () => {
        it("should return a 'number' containing the 'officeNumber' provided at initialization", () => {
            expect(manager.getOfficeNumber()).toEqual(officeNumber);
        });
    });

    describe('getRole', () => {
        it("should return a 'string' containing the employees 'role' provided at initialization", () => {
            expect(manager.getRole()).toEqual("Manager");
        });
    });
});