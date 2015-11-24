(function (root, factory) {
  if (typeof define === 'function' && define.amd) define([], factory);
  else if (typeof exports !== 'undefined') module.exports = factory();
  else root.herit = factory();
})(this, function () {
  'use strict';

  var extend = function (objA) {
    for (var i = 1, l = arguments.length; i < l; ++i) {
      var objB = arguments[i];
      for (var k in objB) if (objB.hasOwnProperty(k)) objA[k] = objB[k];
    }
    return objA;
  };

  // Define the mixin
  var herit = function () {

    // Juggle arguments.
    var i;
    var Parent = function () {};
    for (i = 0; typeof arguments[i] === 'function'; ++i) {
      Parent = i ? herit(arguments[i], {constructor: Parent}) : arguments[i];
    }
    var protoProps = arguments[i] || {};

    // `Child` is the passed in `constructor` proto property
    // or a default function that uses `Parent`'s constructor.
    var Child =
      protoProps.hasOwnProperty('constructor') ?
      protoProps.constructor :
      function () { return Parent.apply(this, arguments); };

    // Use Object.create if it's available.
    if (herit.useObjectCreate) {
      Child.prototype = Object.create(Parent.prototype);

    // Otherwise use the workaround.
    } else {

      // `Dummy` is a dummy constructor to ensure `Parent.constructor`
      // isn't actually called as it could have unintended
      // side effects.
      var Dummy = function () { this.constructor = Child; };
      Dummy.prototype = Parent.prototype;
      Child.prototype = new Dummy();
    }

    // Pass __super__ and the on the prototype properties.
    extend(Child.prototype, protoProps);

    // Pass on the static properties.
    extend(Child, Parent, arguments[i + 1] || {});

    // Return the finished constructor.
    return Child;
  };

  herit.useObjectCreate = Object.hasOwnProperty('create');

  return herit;
});
