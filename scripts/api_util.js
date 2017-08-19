import Package from './package';
import Drone from './drone';
import Location from './location';
import rp from 'request-promise-native';

const options = (endpoint) => {
  return {
    uri: `http://codetest.kube.getswift.co/${endpoint}`,
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true
  };
};

const fetch = (items) => rp(options(items));

const formatPackage = (data) => {
  let destination = new Location(data.destination.latitude, data.destination.longitude);
  let startLocation = new Location(-37.816656, 144.964212);
  let id = data.packageId;
  let deadline = data.deadline;
  return new Package({
    id,
    destination,
    startLocation,
    deadline
  });
};

const formatDrone = (data) => {
  let id = data.droneId;
  let currentLocation = new Location(data.location.latitude, data.location.longitude);
  let homeLocation = new Location(-37.816656, 144.964212);
  let packages = formatPackages(data.packages);
  return new Drone({
    id,
    currentLocation,
    homeLocation,
    packages
  });
};

const formatPackages = (packagesData) => {
  return packagesData.map(data => formatPackage(data));
};

const formatDrones = (dronesData) => {
  return dronesData.map(data => formatDrone(data));
};

const getData = () => {
  return Promise.all([fetch("packages"), fetch("drones")])
  .then(values => {
    let packages = formatPackages(values[0]);
    let drones = formatDrones(values[1]);
    return {
      packages,
      drones
    };
  });
};

export default getData;
