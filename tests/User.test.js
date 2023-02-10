const User = require('../src/User')
//7 tests lol
// User tests here
describe("Testing User Class", () => {
    //Testing username
    test("Testing 'username' property", () => {
        const user1 = new User("Ahmed", "QWERTY123", 18);
        expect(user1.username).toBe("Ahmed");
    });
    //Testing password
    test("Testing 'password' property", () => {
        const user1 = new User("Ahmed", "QWERTY123", 18);
        expect(user1.password).toBe("QWERTY123");
    });
    //Testing age
    test("Testing 'age' property", () => {
        const user1 = new User("Ahmed", "QWERTY123", 18);
        expect(user1.age).toBe(18);
    });
    //Testing loggedIn
    test("Testing 'loggedIn' property", () => {
        const user1 = new User("Ahmed", "QWERTY123", 18);
        expect(user1.loggedIn).toBe(false);
    });
    //Testing login()
    test("Testing 'login' method (correct password)", () => {
        const user1 = new User("Ahmed", "QWERTY123", 18);
        user1.login("QWERTY123");
        expect(user1.loggedIn).toBe(true);
    });
    test("Testing 'login' method (wrong password)", () => {
        const user1 = new User("Ahmed", "QWERTY123", 18);
        expect(user1.login("QWERTY")).toThrow("incorrect password");
    });
    //Testing logout()
    test("Testing 'logout' method (user exists)", () => {
        const user1 = new User("Ahmed", "QWERTY123", 18);
        user1.login("QWERTY123");
        user1.logout();
        expect(user1.loggedIn).toBe(false);
    });
});