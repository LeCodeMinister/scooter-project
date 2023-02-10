const Scooter = require('../src/Scooter')
const User = require('../src/User')
//15 tests lol
describe("Testing Scooter Class", () => {
  //Testing station
  test("Testing 'station' property ('station' parameter passed)", () => {
	  const scooter1 = new Scooter('London');
      expect(scooter1.station).toBe('London');
  });
  test("Testing 'station' property ('station' parameter NOT passed)", () => {
      const scooter1 = new Scooter();
      expect(scooter1.station).toBe(null);
  });
  //Testing user
  test("Testing 'user' property (parameter passed)", () => {
      const scooter1 = new Scooter('London', 'Ahmed');
      expect(scooter1.user).toBe('Ahmed');
  });
  test("Testing 'user' property (parameter NOT passed)", () => {
      const scooter1 = new Scooter('London');
      expect(scooter1.user).toBe(null);
  });
  //Testing nextSerial
  test("Testing 'nextSerial' property", () => {
      const scooter1 = new Scooter('London', 'Ahmed');
      expect(scooter1.nextSerial).toBe(scooter1.serial + 1);
  });
  //Testing serial
  test("Testing 'serial' property", () => {
      const scooter1 = new Scooter('London', 'Ahmed');
      const scooter2 = new Scooter('Manchester', 'Ahmed');
      expect(scooter2.serial).toBe(scooter1.serial + 1);
      expect(scooter2.serial).toBe(scooter1.nextSerial);
  });
  //Testing charge
  test("Testing 'charge' property", () => {
      const scooter1 = new Scooter('London', 'Ahmed');
      expect(scooter1.charge).toBe(100);
  });
  //Testing isBroken
  test("Testing 'isBroken' property", () => {
      const scooter1 = new Scooter('London', 'Ahmed');
      expect(scooter1.isBroken).toBe(false);
  });
  //Testing rent()
  test("Testing 'rent()' method (Charge above %20 & docked)", () => {
	  const user1 = new User("Ahmed", "QWERTY123", 18);
      const scooter1 = new Scooter('London', 'Ahmed');
	  scooter1.rent();
      expect(scooter1.station).toBe(null);
      expect(scooter1.user).toBe("Ahmed");
  });
  test("Testing 'rent()' method (Charge less than 20%)", () => {
	  const user1 = new User("Ahmed", "QWERTY123", 18);
	  const scooter1 = new Scooter('London', 'Ahmed');
	  scooter1.charge = 15;
	  expect(scooter1.rent()).toThrow("scooter needs to charge");
  });
  test("Testing 'rent()' method (Broken)", () => {
	  const user1 = new User("Ahmed", "QWERTY123", 18);
	  const scooter1 = new Scooter('London', 'Ahmed');
	  scooter1.isBroken = true;
  	  expect(scooter1.rent()).toThrow("scooter needs repair");
  });
  //Testing dock(station)
  test("Testing 'dock(station)' method", () => {
	  const user1 = new User("Ahmed", "QWERTY123", 18);
      const scooter1 = new Scooter('London', 'Ahmed');
	  scooter1.rent();
      scooter1.dock('Manchester');
      expect(scooter1.user).toBe(null);
      expect(scooter1.station).toBe('Manchester');
  });
  //Testing recharge()
  test("Testing 'recharge()' method", async () => {
      const scooter1 = new Scooter('London', 'Ahmed');
      scooter1.charge = 0;
      await scooter1.recharge();
      expect(scooter1.charge).toBe(100);
  });
  //Testing requestRepair()
  test("Testing 'requestRepair()' method", async () => {
      const scooter1 = new Scooter('London', 'Ahmed');
      scooter1.isBroken = true;
	  const logSpy = jest.spyOn(console, 'log');
      await scooter1.requestRepair();
      expect(scooter1.isBroken).toBe(false);
      expect(logSpy).toHaveBeenCalledWith('repair completed');
  });
});
