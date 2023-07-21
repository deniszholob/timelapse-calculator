// DataBind Class
function DataBind(element, data) {
  this.data = data;
  this.element = element;
  element.value = data;
  element.addEventListener("change", this, false);
}

/**
 * DataBind Class Method
 * Defines a change event handle
 */
DataBind.prototype.handleEvent = function (event) {
  switch (event.type) {
    case "change":
      this.change(this.element.value);
  }
};

/**
 * DataBind Class Method
 * Sets data and element values based on input param
 */
DataBind.prototype.change = function (value) {
  this.data = value;
  this.element.value = value;
};

// Find all elements that need to be binded
var inputElements = document.querySelectorAll("input[bind]");

// =================================================== //

// UI input/output fields
let shooting_fps = document.getElementById("computed-shooting-fps");
let shooting_interval = document.getElementById("shooting-interval");
let shooting_interval_unit = document.getElementById("shooting-interval-unit");

let shooting_duration = document.getElementById("shooting-duration");
let shooting_duration_unit = document.getElementById("shooting-duration-unit");

let clip_frame_count = document.getElementById("clip-frame-count");
let clip_playback_fps = document.getElementById("clip-playback-fps");
let clip_length = document.getElementById("clip-length");

let image_size = document.getElementById("image-size");
let image_size_unit = document.getElementById("image-size-unit");
let total_size = document.getElementById("total-size");
let total_size_unit = document.getElementById("total-size-unit");

// Timeplapse objects holds all the data for calculations
let timelapse = {};

// Time constants
const timeUnits = {
  seconds: 0,
  minutes: 1,
  hours: 2,
};
calculate_clip();

function calculate_size() {
  // console.log("calculate_size");
  getVals();
  timelapse.total_size = timelapse.clip_frame_count * timelapse.image_size;
  if (timelapse.total_size >= 1000 && timelapse.image_size_unit <= 1) {
    timelapse.total_size_unit = (
      parseInt(timelapse.image_size_unit) + 1
    ).toString();
    timelapse.total_size = timelapse.total_size / 1000;
  } else {
    timelapse.total_size_unit = timelapse.image_size_unit;
  }
  console.table(timelapse);
  setVals();
}

// Calculates clip from shooting time
function calculate_clip() {
  // console.log("calculate_clip");
  getVals();
  timelapse.shooting_fps =
    1 /
    timeToSec(timelapse.shooting_interval, timelapse.shooting_interval_unit);
  timelapse.clip_frame_count =
    timeToSec(timelapse.shooting_duration, timelapse.shooting_duration_unit) *
    timelapse.shooting_fps;
  timelapse.clip_length =
    timelapse.clip_frame_count / timelapse.clip_playback_fps;
  setVals();
  calculate_size();
}

function calculate_Interval() {
  console.log("calculate_Interval (TODO)");
}

// Returns time in seconds
function timeToSec(timeLength, unit) {
  if (unit == timeUnits.seconds) {
    return timeLength;
  }
  if (unit == timeUnits.minutes) {
    return timeLength * 60;
  }
  if (unit == timeUnits.hours) {
    return timeLength * 3600;
  }
}

// Populates timelapse object from UI
function getVals() {
  timelapse.shooting_interval = shooting_interval.value;
  timelapse.shooting_interval_unit = shooting_interval_unit.value;
  timelapse.shooting_duration = shooting_duration.value;
  timelapse.shooting_duration_unit = shooting_duration_unit.value;

  timelapse.clip_frame_count = clip_frame_count.value;
  timelapse.clip_playback_fps = clip_playback_fps.value;
  timelapse.clip_length = clip_length.value;

  timelapse.image_size = image_size.value;
  timelapse.image_size_unit = image_size_unit.value;
  timelapse.total_size = total_size.value;
  timelapse.total_size_unit = total_size_unit.value;
}

// Populates UI from timelapse object
function setVals() {
  shooting_fps.innerText = timelapse.shooting_fps;

  shooting_interval.value = timelapse.shooting_interval;
  shooting_interval_unit.value = timelapse.shooting_interval_unit;
  shooting_duration.value = timelapse.shooting_duration;
  shooting_duration_unit.value = timelapse.shooting_duration_unit;

  clip_frame_count.value = timelapse.clip_frame_count;
  clip_playback_fps.value = timelapse.clip_playback_fps;
  clip_length.value = timelapse.clip_length;

  image_size.value = timelapse.image_size;
  image_size_unit.value = timelapse.image_size_unit;
  total_size.value = timelapse.total_size;
  total_size_unit.value = timelapse.total_size_unit;
}
