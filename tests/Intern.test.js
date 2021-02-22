const { describe, it, expect } = require("@jest/globals");
const Intern = require("../lib/Intern");

describe("Intern", () => {
    const name = "Kylo";
    const id = "456789";
    const email = "kylo@test.com";
    const school = "GA Tech";
    const intern = new Intern(name, id, email, school);

    describe('getSchool', () => {
        it("should return a 'string' containing the 'school' provided at initialization", () => {
            expect(intern.getSchool()).toEqual(school);
        });
    });

    describe('getRole', () => {
        it("should return a 'string' containing the employees 'role' provided at initialization", () => {
            expect(intern.getRole()).toEqual("Intern");
        });
    });
});