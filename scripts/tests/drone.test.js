import Location from './../location';
import Package from './../package';
import Drone from './../drone';

const locationA = new Location(32.9697, -96.80322);
const locationB = new Location(29.46786, -98.53506);
const homeLocation = new Location(-37.816656, 144.964212);

const speed = 50; //kilometers per hour
const ABTime = (422.74 / 50) * 3600;
const nowUNIX = new Date().getTime() / 1000 | 0;
const oneDayLaterUNIX = nowUNIX + 86400;


const deadline = nowUNIX + 1; //deadline is one second from current time
const startLocation = locationA;
const destination = locationB; //takes about 7 minutes to deliver
const id = 1;

const packA = new Package({
  deadline, startLocation:
  locationA, destination:
  locationB,
  id
});

const packB = new Package({
  deadline,
  startLocation: locationA,
  destination: locationA,
  id
});

const packC = new Package({
  deadline: oneDayLaterUNIX,
  startLocation: locationA,
  destination: locationB,
  id
});

test('drones starting from home location with no packages have 0 seconds of wait time', () => {
  const emptyDroneAtHome = new Drone({
    id: 1,
    packages: [],
    currentLocation: homeLocation,
    homeLocation
  });
  expect(emptyDroneAtHome.timeTillAvailable()).toBeCloseTo(0);
});

test('drone starting away from home location with no packages should have wait time equal to time to travel back home', () => {
  const emptyDroneAwayFromHome = new Drone({
    id: 1,
    packages: [],
    currentLocation: locationA,
    homeLocation
  });
  const timeTillHome = locationA.secondsTo(homeLocation);

  expect(emptyDroneAwayFromHome.timeTillAvailable()).toBeCloseTo(timeTillHome);
});

test('drone with package should be available after delivering package and returning home', () => {
  const packagedDrone = new Drone({
    id: 1,
    packages: [ packC ],
    currentLocation: locationA,
    homeLocation
  });
  const toPackage = packagedDrone.currentLocation.secondsTo(packC.destination);
  const packDestinationToHome = packC.destination.secondsTo(homeLocation);
  const timeTillDeliverAndReturn = toPackage + packDestinationToHome;

  expect(packagedDrone.timeTillAvailable()).toBeCloseTo(timeTillDeliverAndReturn);
});
