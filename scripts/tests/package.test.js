import Location from './../location';
import Package from './../package';


const locationA = new Location(32.9697, -96.80322);
const locationB = new Location(29.46786, -98.53506);

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

test('If package destination is too far to deliver on time, leave by time should be before current time', () => {
  expect(packA.mustLeaveByUNIX()).toBeLessThan(nowUNIX);
});

test('If package starts and ends delivery as destination, must leave time should equal deadline', () => {
  expect(packB.mustLeaveByUNIX()).toBeCloseTo(deadline);
});

test('for packages starting near destination, must leave time should be the deadline minus the seconds to deliver', () => {
  const deliverBy = oneDayLaterUNIX - ABTime;
  expect(packC.mustLeaveByUNIX()).toBeCloseTo(deliverBy, -1);
});
