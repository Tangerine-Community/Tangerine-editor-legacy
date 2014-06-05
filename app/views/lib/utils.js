// Generated by CoffeeScript 1.7.1
var utils;

utils = {
  exportValueMap: {
    "correct": 1,
    "checked": 1,
    "incorrect": "0",
    "unchecked": "0",
    "missing": ".",
    "not_asked": ".",
    "skipped": 999
  },
  exportValue: function(databaseValue) {
    if (databaseValue == null) {
      databaseValue = "no_record";
    }
    if (utils.exportValueMap[databaseValue] != null) {
      return utils.exportValueMap[databaseValue];
    } else {
      return String(databaseValue);
    }
  },
  pair: function(key, value) {
    var o;
    if (value === void 0) {
      value = "no_record";
    }
    o = {};
    o[key] = value;
    return o;
  },
  unpair: function(pair) {
    var key, value;
    for (key in pair) {
      value = pair[key];
      return [key, value];
    }
    return "object not found";
  }
};

if (typeof exports === "object") {
  exports.clone = utils.clone;
  exports.exportValue = utils.exportValue;
  exports.pair = utils.pair;
  exports.unpair = utils.unpair;
}