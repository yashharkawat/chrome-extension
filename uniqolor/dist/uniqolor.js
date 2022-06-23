/**
* Generate unique and beautiful colors from any texts or numbers
 * @version v1.0.2
 * @link https://github.com/dastoori/uniqolor#README
 * @author Rasool Dastoori
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.uniqolor = factory());
})(this, (function () { 'use strict';

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var SATURATION_BOUND = [0, 100];
  var LIGHTNESS_BOUND = [0, 100];

  var pad2 = function pad2(str) {
    return "".concat(str.length === 1 ? '0' : '').concat(str);
  };

  var clamp = function clamp(num, min, max) {
    return Math.max(Math.min(num, max), min);
  };

  var random = function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  /**
   * Generate hashCode
   * @param  {string} str
   * @return {number}
   */


  var hashCode = function hashCode(str) {
    var len = str.length;
    var hash = 0;

    for (var i = 0; i < len; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash &= hash; // Convert to 32bit integer
    }

    return hash;
  };
  /**
  * Clamps `num` within the inclusive `range` bounds
  * @param  {number}       num
  * @param  {number|Array} range
  * @return {number}
  */


  var boundHashCode = function boundHashCode(num, range) {
    if (typeof range === 'number') {
      return range;
    }

    return num % Math.abs(range[1] - range[0]) + range[0];
  };
  /**
   * Sanitizing the `range`
   * @param  {number|Array} range
   * @param  {Array}        bound
   * @return {number|Array}
   */


  var sanitizeRange = function sanitizeRange(range, bound) {
    if (typeof range === 'number') {
      return clamp.apply(void 0, [Math.abs(range)].concat(_toConsumableArray(bound)));
    }

    if (range.length === 1 || range[0] === range[1]) {
      return clamp.apply(void 0, [Math.abs(range[0])].concat(_toConsumableArray(bound)));
    }

    return [Math.abs(clamp.apply(void 0, [range[0]].concat(_toConsumableArray(bound)))), clamp.apply(void 0, [Math.abs(range[1])].concat(_toConsumableArray(bound)))];
  };
  /**
   * @param  {number} p
   * @param  {number} q
   * @param  {number} t
   * @return {number}
   */


  var hueToRgb = function hueToRgb(p, q, t) {
    if (t < 0) {
      t += 1;
    } else if (t > 1) {
      t -= 1;
    }

    if (t < 1 / 6) {
      return p + (q - p) * 6 * t;
    }

    if (t < 1 / 2) {
      return q;
    }

    if (t < 2 / 3) {
      return p + (q - p) * (2 / 3 - t) * 6;
    }

    return p;
  };
  /**
   * Converts an HSL color to RGB
   * @param  {number} h Hue
   * @param  {number} s Saturation
   * @param  {number} l Lightness
   * @return {Array}
   */


  var hslToRgb = function hslToRgb(h, s, l) {
    var r;
    var g;
    var b;
    h /= 360;
    s /= 100;
    l /= 100;

    if (s === 0) {
      // achromatic
      r = g = b = l;
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hueToRgb(p, q, h + 1 / 3);
      g = hueToRgb(p, q, h);
      b = hueToRgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  };
  /**
   * Determines whether the RGB color is light or not
   * http://www.w3.org/TR/AERT#color-contrast
   * @param  {number}  r               Red
   * @param  {number}  g               Green
   * @param  {number}  b               Blue
   * @param  {number}  differencePoint
   * @return {boolean}
   */


  var rgbIsLight = function rgbIsLight(r, g, b, differencePoint) {
    return (r * 299 + g * 587 + b * 114) / 1000 >= differencePoint;
  }; // eslint-disable-line max-len

  /**
   * Converts an HSL color to string format
   * @param  {number} h Hue
   * @param  {number} s Saturation
   * @param  {number} l Lightness
   * @return {string}
   */


  var hslToString = function hslToString(h, s, l) {
    return "hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)");
  };
  /**
   * Converts RGB color to string format
   * @param  {number}  r      Red
   * @param  {number}  g      Green
   * @param  {number}  b      Blue
   * @param  {string}  format Color format
   * @return {string}
   */


  var rgbFormat = function rgbFormat(r, g, b, format) {
    switch (format) {
      case 'rgb':
        return "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");

      case 'hex':
      default:
        return "#".concat(pad2(r.toString(16))).concat(pad2(g.toString(16))).concat(pad2(b.toString(16)));
    }
  };
  /**
   * Generate unique color from `value`
   * @param  {string|number} value
   * @param  {Object}        [options={}]
   * @param  {string}        [options.format='hex']
   *  The color format, it can be one of `hex`, `rgb` or `hsl`
   * @param  {number|Array}  [options.saturation=[50, 55]]
   *  Determines the color saturation, it can be a number or a range between 0 and 100
   * @param  {number|Array}  [options.lightness=[50, 60]]
   *  Determines the color lightness, it can be a number or a range between 0 and 100
   * @param  {number}        [options.differencePoint=130]
   *  Determines the color brightness difference point. We use it to obtain the `isLight` value
   *  in the output, it can be a number between 0 and 255
   * @return {Object}
   * @example
   *
   * uniqolor('Hello world!')
   * // { color: "#5cc653", isLight: true }
   *
   * uniqolor('Hello world!', { format: 'rgb' })
   * // { color: "rgb(92, 198, 83)", isLight: true }
   *
   * uniqolor('Hello world!', {
   *   saturation: 30,
   *   lightness: [70, 80],
   * })
   * // { color: "#afd2ac", isLight: true }
   *
   * uniqolor('Hello world!', {
   *   saturation: 30,
   *   lightness: [70, 80],
   *   differencePoint: 200,
   * })
   * // { color: "#afd2ac", isLight: false }
   */


  var uniqolor = function uniqolor(value) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$format = _ref.format,
        format = _ref$format === void 0 ? 'hex' : _ref$format,
        _ref$saturation = _ref.saturation,
        saturation = _ref$saturation === void 0 ? [50, 55] : _ref$saturation,
        _ref$lightness = _ref.lightness,
        lightness = _ref$lightness === void 0 ? [50, 60] : _ref$lightness,
        _ref$differencePoint = _ref.differencePoint,
        differencePoint = _ref$differencePoint === void 0 ? 130 : _ref$differencePoint;

    var hash = Math.abs(hashCode(String(value)));
    var h = boundHashCode(hash, [0, 360]);
    var s = boundHashCode(hash, sanitizeRange(saturation, SATURATION_BOUND));
    var l = boundHashCode(hash, sanitizeRange(lightness, LIGHTNESS_BOUND));

    var _hslToRgb = hslToRgb(h, s, l),
        _hslToRgb2 = _slicedToArray(_hslToRgb, 3),
        r = _hslToRgb2[0],
        g = _hslToRgb2[1],
        b = _hslToRgb2[2];

    return {
      color: format === 'hsl' ? hslToString(h, s, l) : rgbFormat(r, g, b, format),
      isLight: rgbIsLight(r, g, b, differencePoint)
    };
  };
  /**
   * Generate random color
   * @param  {Object}       [options={}]
   * @param  {string}       [options.format='hex']
   *  The color format, it can be one of `hex`, `rgb` or `hsl`
   * @param  {number|Array} [options.saturation=[50, 55]]
   *  Determines the color saturation, it can be a number or a range between 0 and 100
   * @param  {number|Array} [options.lightness=[50, 60]]
   *  Determines the color lightness, it can be a number or a range between 0 and 100
   * @param  {number}       [options.differencePoint=130]
   *  Determines the color brightness difference point. We use it to obtain the `isLight` value
   *  in the output, it can be a number between 0 and 255
   * @return {Object}
   * @example
   *
   * uniqolor.random()
   * // { color: "#644cc8", isLight: false }
   *
   * uniqolor.random({ format: 'rgb' })
   * // { color: "rgb(195, 65, 126)", isLight: false }
   *
   * uniqolor.random({
   *   saturation: 30,
   *   lightness: [70, 80],
   * })
   * // { color: "#c7b9da", isLight: true }
   *
   * uniqolor.random({
   *   saturation: 30,
   *   lightness: [70, 80],
   *   differencePoint: 255,
   * })
   * // { color: "#afd2ac", isLight: false }
   */


  uniqolor.random = function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$format = _ref2.format,
        format = _ref2$format === void 0 ? 'hex' : _ref2$format,
        _ref2$saturation = _ref2.saturation,
        saturation = _ref2$saturation === void 0 ? [50, 55] : _ref2$saturation,
        _ref2$lightness = _ref2.lightness,
        lightness = _ref2$lightness === void 0 ? [50, 60] : _ref2$lightness,
        _ref2$differencePoint = _ref2.differencePoint,
        differencePoint = _ref2$differencePoint === void 0 ? 130 : _ref2$differencePoint;

    saturation = sanitizeRange(saturation, SATURATION_BOUND);
    lightness = sanitizeRange(lightness, LIGHTNESS_BOUND);
    var h = random(0, 360);
    var s = typeof saturation === 'number' ? saturation : random.apply(void 0, _toConsumableArray(saturation));
    var l = typeof lightness === 'number' ? lightness : random.apply(void 0, _toConsumableArray(lightness));

    var _hslToRgb3 = hslToRgb(h, s, l),
        _hslToRgb4 = _slicedToArray(_hslToRgb3, 3),
        r = _hslToRgb4[0],
        g = _hslToRgb4[1],
        b = _hslToRgb4[2];

    return {
      color: format === 'hsl' ? hslToString(h, s, l) : rgbFormat(r, g, b, format),
      isLight: rgbIsLight(r, g, b, differencePoint)
    };
  };

  return uniqolor;

}));