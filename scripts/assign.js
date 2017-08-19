import Drone from './drone';
import Package from './package';

const assign = (items) => {
  const orderedDrones = Drone.prototype.sortTimeAvailable(items.drones);
  const orderedPackages = Package.prototype.sortNeedLeaveSooner(items.packages);
  const unassignedPackageIds = [];
  const assignments = [];

  orderedDrones.forEach(drone => {
    let pack = orderedPackages.shift();
    if (!pack) return;
    while (drone.cannotDeliver(pack)){
      unassignedPackageIds.push(pack.id);
      pack = orderedPackages.shift();
      if (!pack) return;
    }
    assignments.push({droneID: drone.id, packageID: pack.id});
  });

  const leftoverPackIDS = orderedPackages.map(pack => pack.id);
  leftoverPackIDS.forEach(id => unassignedPackageIds.push(id));

  return { assignments, unassignedPackageIds };
};

export default assign;
