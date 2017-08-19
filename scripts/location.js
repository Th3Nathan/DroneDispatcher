class Location {
  constructor(latitude, longitude){
    this.latitude = latitude;
    this.longitude = longitude;
  }

  distance(loc2){
    // http://www.movable-type.co.uk/scripts/latlong.html
    // In kilometers
    const R = 6371e3; // metres
    const φ1 = this._latRadians();
    const φ2 = loc2._latRadians();
    const Δφ = (loc2.latitude - this.latitude) * Math.PI / 180;
    const Δλ = (loc2.longitude - this.longitude) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c) / 1000;
  }

  secondsTo(loc2, speed){
    // speed in kilometers/hour
    speed |= 50;
    return (this.distance(loc2) / speed) * 3600;
  }

  _latRadians(){
    return this.latitude * Math.PI / 180;
  }
}

export default Location;
