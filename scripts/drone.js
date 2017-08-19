
class Drone {
  constructor(attributes){
    this.currentLocation = attributes.currentLocation;
    this.homeLocation = attributes.homeLocation;
    this.packages = attributes.packages;
    this.id = attributes.id;
  }

  timeTillHome(){
    return this.currentLocation.secondsTo(this.homeLocation);
  }

  noPackages(){
    return this.packages.length === 0;
  }

  cannotDeliver(pack){
    const currentTime = new Date().getTime() / 1000 | 0;
    return (pack.deadline - this.timeTillAvailable()) < currentTime;
  }

  packageDeliverTime(){
    return this.packages.reduce(
      (time, pack) => {
        const toDestination = this.currentLocation.secondsTo(pack.destination);
        const toHome = pack.destination.secondsTo(this.homeLocation);
        this.currentLocation = this.homeLocation;
        return time + toDestination + toHome;
      },
      0
    );
  }

  timeTillAvailable(){
    return this.noPackages() ? this.timeTillHome() : this.packageDeliverTime();
  }
}

Drone.prototype.compareTimeTillAvailable = function(droneA, droneB){
    return droneA.timeTillAvailable() - droneB.timeTillAvailable();
  };

Drone.prototype.sortTimeAvailable = function(drones){
  return drones.sort(this.compareTimeTillAvailable);
};

export default Drone;
