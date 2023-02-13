const User = require('../src/User')
const Scooter = require('../src/Scooter')
const ScooterApp = require('../src/ScooterApp')
//23 tests looool
// ScooterApp tests here
describe("Testing ScooterApp Class", () => {
    //Testing stations
    test("Testing 'stations' property", () => {
        const myScooterApp = new ScooterApp();// The three stations are London, Manchester & Glasgow
        expect(myScooterApp.stations).toHaveProperty("London");
        expect(myScooterApp.stations).toHaveProperty("Manchester");
        expect(myScooterApp.stations).toHaveProperty("Glasgow");
    });
    //Testing registeredUsers
    test("Testing 'registeredUsers' property", () => {
        const myScooterApp = new ScooterApp();
        myScooterApp.registerUser("Ahmed", "QWERTY123", 18);
        expect(myScooterApp.registeredUsers).toHaveProperty("Ahmed");
        expect(Object.keys(myScooterApp.registeredUsers).length).toBe(1);
    });
	//Testing registerUser() 
    test("Testing 'registerUser()' method (New user)", () => {
        const myScooterApp = new ScooterApp();
        myScooterApp.registerUser("Ahmed", "QWERTY123", 18);
        expect(myScooterApp.registeredUsers).toHaveProperty("Ahmed");
    });
	test("Testing 'registerUser()' method (New user) (console msg)", () => {
        const myScooterApp = new ScooterApp();
		const logSpy = jest.spyOn(console, 'log');
        myScooterApp.registerUser("Ahmed", "QWERTY123", 18);
		expect(logSpy).toHaveBeenCalledWith('user has been registered');
    });
	test("Testing 'registerUser()' method (User too young)", () => {
        const myScooterApp = new ScooterApp();
        expect(() => {
            myScooterApp.registerUser("Ahmed", "QWERTY123", 16)
        }).toThrow(Error("too young to register"));
    });
	test("Testing 'registerUser()' method (User exists already)", () => {
        const myScooterApp = new ScooterApp();
        myScooterApp.registerUser("Steve", "QWERTY123", 18);
		expect(() => {
            myScooterApp.registerUser("Steve", "QWERTY123", 18)
        }).toThrow(Error("already registered"));
	});
	//Testing loginUser() 
    test("Testing 'loginUser()' method (User exists)", () => {
        const myScooterApp = new ScooterApp();
        const user1 = myScooterApp.registerUser("Ahmed", "QWERTY123", 18);
		myScooterApp.loginUser("Ahmed", "QWERTY123");
        expect(user1.loggedIn).toBe(true);
    });
	test("Testing 'loginUser()' method (User exists) (console msg)", () => {
        const myScooterApp = new ScooterApp();
        const user1 = myScooterApp.registerUser("Ahmed", "QWERTY123", 18);
		const logSpy = jest.spyOn(console, 'log');
		myScooterApp.loginUser("Ahmed", "QWERTY123");
        expect(logSpy).toHaveBeenCalledWith("user has been logged in");
    });
	test("Testing 'loginUser()' method (User does NOT exist)", () => {
        const myScooterApp = new ScooterApp();
        const user1 = myScooterApp.registerUser("Ahmed", "QWERTY123", 18);
		delete myScooterApp.registeredUsers.Ahmed;
        expect(() => {
            myScooterApp.loginUser("Ahmed", "QWERTY123")
    }).toThrow(Error("Username or password is incorrect"));
    });
	test("Testing 'loginUser()' method (Incorrect password)", () => {
        const myScooterApp = new ScooterApp();
        const user1 = myScooterApp.registerUser("Ahmed", "QWERTY123", 18);
        expect(() => {
            myScooterApp.loginUser("Ahmed", "QWERTY")
        }).toThrow("Username or password is incorrect");
    });
	//Testing logoutUser() 
    test("Testing 'logoutUser()' method (User exists)", () => {
        const myScooterApp = new ScooterApp();
        const user1 = myScooterApp.registerUser("Ahmed", "QWERTY123", 18);
		myScooterApp.loginUser("Ahmed", "QWERTY123");
        myScooterApp.logoutUser("Ahmed");
        expect(user1.loggedIn).toBe(false);
    });
	test("Testing 'logoutUser()' method (User exists) (console msg)", () => {
        const myScooterApp = new ScooterApp();
        const user1 = myScooterApp.registerUser("Ahmed", "QWERTY123", 18);
		myScooterApp.loginUser("Ahmed", "QWERTY123");
		const logSpy = jest.spyOn(console, 'log');
		myScooterApp.logoutUser("Ahmed");
        expect(logSpy).toHaveBeenCalledWith('user is logged out');
    });
	test("Testing 'logoutUser()' method (User does NOT exist) (error msg)", () => {
        const myScooterApp = new ScooterApp();
        const user1 = myScooterApp.registerUser("Ahmed", "QWERTY123", 18);
		delete myScooterApp.registeredUsers.Ahmed;
        expect(() => {
            myScooterApp.logoutUser("Ahmed")
        }).toThrow(Error("no such user is logged in"));
    });
	//Testing createScooter() 
    test("Testing 'createScooter()' method (New Scooter)", () => {
        const myScooterApp = new ScooterApp();
        const scooter1 = myScooterApp.createScooter("Glasgow");
		expect(scooter1.station).toBe("Glasgow");
    });
	test("Testing 'createScooter()' method (New Scooter) (console msg)", () => {
        const myScooterApp = new ScooterApp();
		const logSpy = jest.spyOn(console, 'log');
        const scooter4 = myScooterApp.createScooter("Manchester");
		expect(logSpy).toHaveBeenCalledWith('created new scooter');
    });
    test("Testing 'createScooter()' method (Station does NOT exist)", () => {
        const myScooterApp = new ScooterApp();
		expect(() => {
            myScooterApp.createScooter("Liverpool")
    }).toThrow(Error("no such station"));
    });
	//Testing rentScooter() 
    test("Testing 'rentScooter()' method (Scooter is docked)", () => {
        const myScooterApp = new ScooterApp();
        const scooter1 = myScooterApp.createScooter("Glasgow");
		const user1 = myScooterApp.registerUser("Ahmed", "QWERTY123", 18);
		myScooterApp.loginUser("Ahmed", "QWERTY123");
		myScooterApp.rentScooter(scooter1, "Ahmed");
		expect(scooter1.station).toBe(null);
		expect(scooter1.user).toBe("Ahmed");
    });
    test("Testing 'rentScooter()' method (Scooter is docked) (console msg)", () => {
        const myScooterApp = new ScooterApp();
        const scooter1 = myScooterApp.createScooter("Glasgow");
		const user1 = myScooterApp.registerUser("Ahmed", "QWERTY123", 18);
		myScooterApp.loginUser("Ahmed", "QWERTY123");
		const logSpy = jest.spyOn(console, 'log');
		myScooterApp.rentScooter(scooter1, "Ahmed");
		expect(logSpy).toHaveBeenCalledWith('scooter is rented');
    });
	test("Testing 'rentScooter()' method (Scooter is rented already) (console msg)", () => {
        const myScooterApp = new ScooterApp();
        const scooter1 = myScooterApp.createScooter("Glasgow");
		const user1 = myScooterApp.registerUser("Ahmed", "QWERTY123", 18);
		myScooterApp.loginUser("Ahmed", "QWERTY123");
		myScooterApp.rentScooter(scooter1, "Ahmed");
		expect(() => {
            myScooterApp.rentScooter(scooter1, "Ahmed")
    }).toThrow(Error('scooter already rented'));
    });
	//Testing dockScooter()
	test("Testing 'dockScooter()' method (Scooter is rented)", () => {
        const myScooterApp = new ScooterApp();
        const scooter1 = myScooterApp.createScooter("Glasgow");
		const user1 = myScooterApp.registerUser("Ahmed", "QWERTY123", 18);
		myScooterApp.loginUser("Ahmed", "QWERTY123");
		myScooterApp.rentScooter(scooter1, "Ahmed");
		myScooterApp.dockScooter(scooter1, "London");
		expect(scooter1.station).toBe("London");
		expect(scooter1.user).toBe(null);
    });
	test("Testing 'dockScooter()' method (Scooter is rented) (console msg)", () => {
        const myScooterApp = new ScooterApp();
        const scooter1 = myScooterApp.createScooter("Glasgow");
		const user1 = myScooterApp.registerUser("Ahmed", "QWERTY123", 18);
		myScooterApp.loginUser("Ahmed", "QWERTY123");
		myScooterApp.rentScooter(scooter1, "Ahmed");
		const logSpy = jest.spyOn(console, 'log');
		myScooterApp.dockScooter(scooter1, "London");
		expect(logSpy).toHaveBeenCalledWith('scooter is docked');
    });
	test("Testing 'dockScooter()' method (Station does NOT exist) (console msg)", () => {
        const myScooterApp = new ScooterApp();
        const scooter1 = myScooterApp.createScooter("Glasgow");
		const user1 = myScooterApp.registerUser("Ahmed", "QWERTY123", 18);
		myScooterApp.loginUser("Ahmed", "QWERTY123");
		myScooterApp.rentScooter(scooter1, "Ahmed");
		expect(() => {
            myScooterApp.dockScooter(scooter1, "Liverpool")
        }).toThrow(Error("no such station"))
    });
	test("Testing 'dockScooter()' method (Scooter docked already) (console msg)", () => {
        const myScooterApp = new ScooterApp();
        const scooter1 = myScooterApp.createScooter("Glasgow");
		const user1 = myScooterApp.registerUser("Ahmed", "QWERTY123", 18);
		myScooterApp.loginUser("Ahmed", "QWERTY123");
		myScooterApp.rentScooter(scooter1, "Ahmed");
		myScooterApp.dockScooter(scooter1, "London");
		expect(() => {
            myScooterApp.dockScooter(scooter1, "London")
        }).toThrow(Error("scooter already at station"))
    });
});