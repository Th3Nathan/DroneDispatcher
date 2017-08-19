import Location from './../location';

const locationA = new Location(32.9697, -96.80322);
const locationB = new Location(29.46786, -98.53506);
const speed = 50; //kilometers per hour
const ABTime = (422.74 / 50) * 3600;

test('calculates distance between points correctly', () => {
  expect(locationA.distance(locationB)).toBeGreaterThan(422);
  expect(locationA.distance(locationB)).toBeLessThan(423);
});
