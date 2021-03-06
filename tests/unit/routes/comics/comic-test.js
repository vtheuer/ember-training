import Ember from "ember";
import { moduleFor, test } from 'ember-qunit';

const Comic = Ember.Object.extend({
  slug: '',
  title: '',
  scriptwriter: '',
  illustrator: '',
  publisher: ''
});

const blackSad = Comic.create({
  slug: 'blacksad',
  title: 'Blacksad',
  scriptwriter: 'Juan Diaz Canales',
  illustrator: 'Juanjo Guarnido',
  publisher: 'Dargaud'
});

const calvinAndHobbes = Comic.create({
  slug: 'calvin-and-hobbes',
  title: 'Calvin and Hobbes',
  scriptwriter: 'Bill Watterson',
  illustrator: 'Bill Watterson',
  publisher: 'Andrews McMeel Publishing'
});

const akira = Comic.create({
  slug: 'akira',
  title: 'Akira',
  scriptwriter: 'Katsuhiro Otomo',
  illustrator: 'Katsuhiro Otomo',
  publisher: 'Epic Comics'
});

const COMICS = [blackSad, calvinAndHobbes, akira];

moduleFor('route:comics/comic', 'Unit | Route | comics/comic', {
  beforeEach() {
    this.subject().modelFor = function () {
      return COMICS;
    };
  }
});

test('it exists', function (assert) {
  const route = this.subject();
  assert.ok(route);
});


test('model() should retrieve existing slug', function (assert) {
  const route = this.subject();

  const params = {comic_slug: 'blacksad'};
  const model = route.model(params);

  assert.equal(model, blackSad, "model with existing slug retrieved");
});

test('model() should throw error if slug not found', function (assert) {
  assert.expect(1);

  const route = this.subject();
  const params = {comic_slug: 'wrong'};

  try {
    route.model(params);
  }
  catch (error) {
    assert.ok(error !== undefined, "non existing model throws exception");
  }
});
