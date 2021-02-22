const { describe, it, expect } = require("@jest/globals");
const Engineer = require("../lib/Engineer");

describe("Engineer", () => {
    const name = "Darth";
    const id = "987654";
    const email = "darth@test.com";
    const github = "darthvader";
    const engineer = new Engineer(name, id, email, github);

    describe('getGithub', () => {
        it("should return a 'string' containing 'github' username provided at initialization", () => {
            expect(engineer.getGithub()).toEqual(github);
        });
    });

    describe('getRole', () => {
        it("should return a 'string' containing the employees 'role' provided at initialization", () => {
            expect(engineer.getRole()).toEqual("Engineer");
        });
    });
});
