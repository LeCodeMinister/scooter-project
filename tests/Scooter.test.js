const Scooter = require('../src/Scooter')
const User = require('../src/User')

describe("Testing Scooter Class", () => {
  //Testing station
  test("Testing 'station' property (parameter passed)", () => {
      const scooter1 = new Scooter('London Station');
      expect(scooter1.station).toBe('London Station');
  });
  test("Testing 'station' property (parameter NOT passed)", () => {
      const scooter1 = new Scooter();
      expect(scooter1.station).toBe(null);
  });
  //Testing user
  test("Testing 'user' property (parameter passed)", () => {
      const scooter1 = new Scooter('London Station', 'Ahmed');
      expect(scooter1.user).toBe('Ahmed');
  });
  test("Testing 'user' property (parameter NOT passed)", () => {
      const scooter1 = new Scooter('London Station');
      expect(scooter1.user).toBe(null);
  });
  //Testing nextSerial
  test("Testing 'nextSerial' property", () => {
      const scooter1 = new Scooter('London Station', 'Ahmed');
      expect(scooter1.nextSerial).toBe(2);
  });
  test("Testing 'nextSerial' property", () => {
      const scooter1 = new Scooter('London Station', 'Ahmed');
      const scooter2 = new Scooter('Manchester Station', 'Steve');
      expect(scooter2.nextSerial).toBe(3);
  });
  //Testing serial
  test("Testing 'serial' property", () => {
      const scooter1 = new Scooter('London Station', 'Ahmed');
      expect(scooter1.serial).toBe(1);
  });
  //Testing charge
  test("Testing 'charge' property", () => {
      const scooter1 = new Scooter('London Station', 'Ahmed');
      expect(scooter1.charge).toBe(100);
  });
  //Testing isBroken
  test("Testing 'isBroken' property", () => {
      const scooter1 = new Scooter('London Station', 'Ahmed');
      expect(scooter1.isBroken).toBe(false);
  });
  //Testing rent()
  test("Testing 'rent()' method", () => {
      const scooter1 = new Scooter('London Station', 'Ahmed');
      expect(scooter1.rent()).toBe(false);
  });//needs rentScooter() from ScooterApp here
  //Testing dock(station)
  test("Testing 'dock(station)' method", () => {
      const scooter1 = new Scooter('London Station', 'Ahmed');
      //needs rentScooter() from ScooterApp here
      scooter1.dock('Manchester Station');
      expect(scooter1.station).toBe('Manchester Station');
  });//needs dockScooter() from ScooterApp here
  //Testing recharge()
  test("Testing 'recharge()' method", () => {
      const scooter1 = new Scooter('London Station', 'Ahmed');
      scooter1.charge = 0;
      scooter1.recharge();
      expect(scooter1.charge).toBe(100);
  });
  //Testing requestRepair()
  test("Testing 'requestRepair()' method", () => {
      const scooter1 = new Scooter('London Station', 'Ahmed');
      scooter1.isBroken = true;
      scooter1.requestRepair();
      expect(scooter1.isBroken).toBe(false);
  });
});
