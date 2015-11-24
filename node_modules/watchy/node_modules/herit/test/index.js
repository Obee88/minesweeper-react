var herit = require('..');
var expect = require('chai').expect;

[true, false].forEach(function (withObjectCreate) {
  describe(
    withObjectCreate ? 'With Object.create' : 'Without Object.create',
    function () {
      if (!withObjectCreate) {
        before(function () { herit.useObjectCreate = false; });
      }

      describe('A simple "class"', function () {
        var Klass = herit({
          constructor: function () { this.instanceProp = 'a'; },
          protoProp: 'b'
        }, {
          staticProp: 'c'
        });

        it('is a function', function () {
          expect(Klass).to.be.a('function');
        });

        it('is inherited by its child', function () {
          expect(new Klass()).to.be.instanceof(Klass);
        });

        it('copies static properties', function () {
          expect(Klass).to.have.property('staticProp', 'c');
        });

        it('copies prototype properties', function () {
          expect(Klass.prototype).to.have.property('protoProp', 'b');
        });

        it('equals the special constructor property', function () {
          expect(Klass.prototype.constructor).to.equal(Klass);
        });

        it('invokes the constructor on instance creation', function () {
          expect(new Klass()).to.have.property('instanceProp', 'a');
        });
      });

      describe('Single inheritance', function () {
        var KlassA = herit({
          aProtoMethod: function () {}
        }, {
          aStaticMethod: function () {}
        });

        var KlassB = herit(KlassA);

        it('works with instanceof', function () {
          expect(new KlassB()).to.be.instanceOf(KlassA);
        });

        it("inherits the parent class's static methods", function () {
          expect(KlassB).to.have.property('aStaticMethod');
        });

        it("inherits the parent class's prototype methods", function () {
          expect(KlassB.prototype).to.have.property('aProtoMethod');
        });
      });

      describe('Multiple inheritance', function () {
        var KlassA = herit({
          theProtoMethod: function () {}
        });

        var KlassB = herit({
          theProtoMethod: function () {}
        });

        var KlassC = herit(KlassA, KlassB);

        it('works with instanceof', function () {
          expect(new KlassC()).to.be.instanceOf(KlassA).and.instanceOf(KlassB);
        });

        it("inherits the most recent parent's prototype methods", function () {
          expect(KlassC.prototype).to.have
            .property('theProtoMethod', KlassB.prototype.theProtoMethod);
        });
      });
    }
  );
});
