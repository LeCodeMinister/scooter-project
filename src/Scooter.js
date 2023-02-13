class Scooter{
  static nextSerial = 1; 
  constructor(station = null) {
    this.station = station;
    this.user = null;
    this.serial = Scooter.nextSerial;
    this.charge = 100;
    this.isBroken = false;
    Scooter.nextSerial += 1;
  }
  rent() {
    if (this.charge < 21) {
      throw new Error("scooter needs to charge");
    }
    if (this.isBroken == true) {
      throw new Error("scooter needs repair");
    }
    this.station = null;//Looking at Andy's answer to Herve, just undock, don't assign to user here
    //Have a look at the rentScooter/dockUser() tests that use this guy
  }
  dock(station) {
    this.station = station;
    this.user = null;
  }
  async recharge() {
    console.log('starting charge');
    await new Promise(resolve => setTimeout(resolve, 5000)); // wait 5 seconds
    this.charge = 100;
    console.log('charge completed');   
  }
  async requestRepair() {
    console.log('starting repair');
    await new Promise(resolve => setTimeout(resolve, 5000)); // wait 5seconds
    this.isBroken = false;
    console.log('repair completed');  
  }
}


module.exports = Scooter
