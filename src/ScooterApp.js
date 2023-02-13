const User = require('../src/User')
const Scooter = require('../src/Scooter')

class ScooterApp {
  constructor() {
    this.stations = {
      "London": [], 
      "Manchester": [], 
      "Glasgow": []
    };
    this.registeredUsers = {}; //obj => obj - username as key, full object as value 
  }
  registerUser(username, password, age) {
    if (username in this.registeredUsers) {
      throw new Error("already registered");
    }
    if (age < 18) {
      throw new Error("too young to register");
    }
    this.registeredUsers[username] = new User(username, password, age);
    console.log("user has been registered");
    return this.registeredUsers[username];
  }
  loginUser(username, password) {
    if (username in this.registeredUsers) {
      try {
        this.registeredUsers[username].login(password);
        if (this.registeredUsers[username].loggedIn) {
          console.log("user has been logged in");
        }
      } catch (error) {
        throw new Error("Username or password is incorrect");
      }
    } else {
      throw new Error("Username or password is incorrect");
    }
  }
  logoutUser(username) {
    if (username in this.registeredUsers) {
      this.registeredUsers[username].logout();
      if (this.registeredUsers[username].loggedIn == false) {
        console.log("user is logged out");
      }
    } else {
      throw new Error("no such user is logged in");
    }
  }
  createScooter(station) {
    if (station in this.stations) {
      let scooter = new Scooter(station);
      this.stations[station].push(scooter);
      console.log("created new scooter");
      return scooter;
    } else {
      throw new Error("no such station");
    }
  }
  dockScooter(scooter, station) {
    if (station in this.stations) {
      if (scooter.station == station) {
        throw new Error("scooter already at station");
      } else {
        scooter.dock(station);
        console.log("scooter is docked");
      }
    } else {
      throw new Error("no such station");
    }
  }
  rentScooter(scooter, user) {
    if (scooter.user == null) {
      scooter.rent();
      scooter.user = user;
      console.log("scooter is rented");
    } else {
      throw new Error("scooter already rented");
    }
  }
  print() {
    console.log(this.registeredUsers);
    console.log(this.stations);
    console.log("London station has ", this.stations["London"].length, " scooters.");
    console.log("Glasgow station has ", this.stations["Glasgow"].length, " scooters.");
    console.log("Manchester station has ", this.stations["Manchester"].length, " scooters.");
  }
}
let myScooterApp = new ScooterApp();

module.exports = ScooterApp
