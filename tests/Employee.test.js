const { describe, it, expect } = require("@jest/globals");
const Employee = require("../lib/Employee");

describe("Employee", () => {
    const name = "Courtney";
    const id = "123456";
    const email = "courtney@test.com";
    const employee = new Employee(name, id, email);

    describe('getName', () => {
        it("should return a 'string' containing the 'name' provided at initialization", () => {
            expect(employee.getName()).toEqual(name);
        });
    });
    describe('getId', () => {
        it("should return a 'string' containing an 'id' provided at initialization", () => {
            expect(employee.getId()).toEqual(id);
        });
    });
    describe('getEmail', () => {
        it("should return a 'string' containing an 'email' input provided at initialization", () => {
            expect(employee.getEmail()).toEqual(email);
        });
    });

    describe('getRole', () => {
        it("should return a 'string' containing the employees 'role' provided at initialization", () => {
            expect(employee.getRole()).toEqual("Employee");
        });
    });
});


