
class Package {
  constructor(attributes){
    this.destination = attributes.destination;
    this.startLocation = attributes.startLocation;
    this.deadline = attributes.deadline;
    this.id = attributes.id;
  }

  mustLeaveByUNIX(speed){
    return this.deadline - this.destination.secondsTo(this.startLocation, speed);
  }
}

Package.prototype.compareFartherFirst = function(packageA, packageB){
  return packageA.mustLeaveByUNIX() - packageB.mustLeaveByUNIX();
};

Package.prototype.sortNeedLeaveSooner = function(packages){
  return packages.sort(this.compareFartherFirst);
};

export default Package;
