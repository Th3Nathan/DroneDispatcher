/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

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

/* harmony default export */ __webpack_exports__["a"] = (Package);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

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

/* harmony default export */ __webpack_exports__["a"] = (Drone);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assign__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_express__);



const app = __WEBPACK_IMPORTED_MODULE_2_express___default()();

app.get('/assignments', function (req, res) {
  Object(__WEBPACK_IMPORTED_MODULE_0__api_util__["a" /* default */])().then(items => res.send(Object(__WEBPACK_IMPORTED_MODULE_1__assign__["a" /* default */])(items)))
    .catch(() => res.send("Error"));
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__package__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__drone__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__location__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_request_promise_native__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_request_promise_native___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_request_promise_native__);





const options = (endpoint) => {
  return {
    uri: `http://codetest.kube.getswift.co/${endpoint}`,
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true
  };
};

const fetch = (items) => __WEBPACK_IMPORTED_MODULE_3_request_promise_native___default()(options(items));

const formatPackage = (data) => {
  let destination = new __WEBPACK_IMPORTED_MODULE_2__location__["a" /* default */](data.destination.latitude, data.destination.longitude);
  let startLocation = new __WEBPACK_IMPORTED_MODULE_2__location__["a" /* default */](-37.816656, 144.964212);
  let id = data.packageId;
  let deadline = data.deadline;
  return new __WEBPACK_IMPORTED_MODULE_0__package__["a" /* default */]({
    id,
    destination,
    startLocation,
    deadline
  });
};

const formatDrone = (data) => {
  let id = data.droneId;
  let currentLocation = new __WEBPACK_IMPORTED_MODULE_2__location__["a" /* default */](data.location.latitude, data.location.longitude);
  let homeLocation = new __WEBPACK_IMPORTED_MODULE_2__location__["a" /* default */](-37.816656, 144.964212);
  let packages = formatPackages(data.packages);
  return new __WEBPACK_IMPORTED_MODULE_1__drone__["a" /* default */]({
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

/* harmony default export */ __webpack_exports__["a"] = (getData);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (Location);


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("request-promise-native");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__drone__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__package__ = __webpack_require__(0);



const assign = (items) => {
  const orderedDrones = __WEBPACK_IMPORTED_MODULE_0__drone__["a" /* default */].prototype.sortTimeAvailable(items.drones);
  const orderedPackages = __WEBPACK_IMPORTED_MODULE_1__package__["a" /* default */].prototype.sortNeedLeaveSooner(items.packages);
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

/* harmony default export */ __webpack_exports__["a"] = (assign);


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map