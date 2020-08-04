const {
  formatDates,
  makeRefObj,
  formatComments,
} = require('../db/utils/utils');

describe('formatDates', () => {
  test('should return empty array if passed empty array', () => {
    const input = [];
    const output = formatDates(input);
    expect(formatDates(input)).toEqual([]);
  });
  test('should make a new array', () => {
    const timeStamps = [];
    const output = formatDates([]);
    expect(output).not.toBe(timeStamps);
  });
  test("converts a timestamp into a date object, when passed an array with an object containing a timestamp", () => {
    const timeStamps = [{ created_at: 154700514171 }];
    const output = formatDates(timeStamps);
    expect(output).toEqual([{ created_at: new Date(154700514171) }]);
  });
  test("converts a timestamp into a date object, when passed an array with an object containing several key value pairs including a timestamp", () => {
    const timeStamps = [
      {
        title: "Z",
        topic: "mitch",
        author: "icellusedkars",
        body: "I was hungry.",
        created_at: 785420514171
      }
    ];
    const expected = [
      {
        title: "Z",
        topic: "mitch",
        author: "icellusedkars",
        body: "I was hungry.",
        created_at: new Date(785420514171)
      }
    ];
    const actual = formatDates(timeStamps);
    expect(actual).toEqual(expected);
  });
  test("converts timestamps from several date objects, when passed an array with several objects containing several key value pairs including a timestamp", () => {
    const timeStamps = [
      {
        title: "Z",
        topic: "mitch",
        author: "icellusedkars",
        body: "I was hungry.",
        created_at: 785420514171
      },
      {
        title: "Does Mitch predate civilisation?",
        topic: "mitch",
        author: "icellusedkars",
        body:
          "Archaeologists have uncovered a gigantic statue from the dawn of humanity, and it has an uncanny resemblance to Mitch. Surely I am not the only person who can see this?!",
        created_at: 659276514171
      }
    ];
    const expected = [
      {
        title: "Z",
        topic: "mitch",
        author: "icellusedkars",
        body: "I was hungry.",
        created_at: new Date(785420514171)
      },
      {
        title: "Does Mitch predate civilisation?",
        topic: "mitch",
        author: "icellusedkars",
        body:
          "Archaeologists have uncovered a gigantic statue from the dawn of humanity, and it has an uncanny resemblance to Mitch. Surely I am not the only person who can see this?!",
        created_at: new Date(659276514171)
      }
    ];
    const actual = formatDates(timeStamps);
    expect(actual).toEqual(expected);
  });

});

describe('makeRefObj', () => {
  test("returns an empty object if passed an empty array", () => {
    const ref = [];
    const actual = makeRefObj(ref);
    expect(actual).toEqual({});
  });
  test("takes an array and key and value arguments and returns the arguments as key and value in object", () => {
    const ref = [{ article_id: 1, title: "A" }];
    const actual = makeRefObj(ref, "title", "article_id");
    expect(actual).toEqual({ A: 1 });
  });
  test("takes an array of multiple objects and key and value arguments and returns all the correct key value pairs in a new object", () => {
    const ref = [
      { article_id: 1, title: "A" },
      { article_id: 2, title: "B" },
      { article_id: 3, title: "C" }
    ];
    const actual = makeRefObj(ref, "title", "article_id");
    expect(actual).toEqual({ A: 1, B: 2, C: 3 });
  });
  test("takes an array of multiple objects with muktiple key value pairs and key and value arguments and returns all the correct key value pairs in a new object", () => {
    const ref = [
      {
        article_id: 1,
        title: "Z",
        topic: "mitch",
        author: "icellusedkars",
        body: "I was hungry.",
        created_at: 785420514171
      },
      {
        article_id: 2,
        title: "Does Mitch predate civilisation?",
        topic: "mitch",
        author: "icellusedkars",
        body:
          "Archaeologists have uncovered a gigantic statue from the dawn of humanity, and it has an uncanny resemblance to Mitch. Surely I am not the only person who can see this?!",
        created_at: 659276514171
      }
    ];
    const actual = makeRefObj(ref, "title", "article_id");
    expect(actual).toEqual({ "Does Mitch predate civilisation?": 2, Z: 1 });
  });
  test("will return a lookup object with multiple key value pairs when given multiple artist rows", () => {
    const artistRows = [
      { forename: "tom", artist_id: 1, surname: "Simmons" },
      { forename: "david", artist_id: 2, surname: "Bartlett" },
      { forename: "Steve", artist_id: 3, surname: "Dunn", age: 50 }
    ];
    expect(makeRefObj(artistRows, "forename", "artist_id")).toEqual({
      tom: 1,
      david: 2,
      Steve: 3
    });
  });
});

/*
  Its created_by property renamed to an author key
Its belongs_to property renamed to an article_id key
The value of the new article_id key must be the id corresponding to the original title value provided
Its created_at value converted into a javascript date object
The rest of the comment's properties must be maintained
*/

describe("formatComments", () => {
  test("returns a new empty array when given an empty array and ", () => {
    const shops = [];
    const formattedComments = formatComments(shops);
    expect(formattedComments).toEqual([]);
    expect(formattedComments).not.toBe(shops);
  });
  test("returns an array with items containing a owner_id key", () => {
    const owners = [
      {
        forename: "Rosa",
        surname: "Casper",
        age: 56,
        owner_id: 1,
      },
    ];
    const lookup = makeRefObj(owners, "forename", "owner_id");
    const shops = [
      {
        shop_name: "TestShop-1",
        owner: "Rosa",
        slogan: "testSlogan",
      },
    ];
    expect(formatComments(shops, lookup, 'owner_id', 'owner')[0]).toHaveProperty("owner_id");
  });
  test("returns an array with items having owner key removed", () => {
    const owners = [
      {
        forename: "Rosa",
        surname: "Casper",
        age: 56,
        owner_id: 1,
      },
    ];
    const lookup = makeRefObj(owners, "forename", "owner_id");
    const shops = [
      {
        shop_name: "TestShop-1",
        owner: "Rosa",
        slogan: "testSlogan",
      },
    ];
    expect(formatComments(shops, lookup, 'owner_id', 'owner')[0]).not.toHaveProperty("owner");
  });
  test("returns object with all other keys added", () => {
    const owners = [
      {
        forename: "Rosa",
        surname: "Casper",
        age: 56,
        owner_id: 1,
      },
    ];
    const lookup = makeRefObj(owners, "forename", "owner_id");
    const shops = [
      {
        shop_name: "TestShop-1",
        owner: "Rosa",
        slogan: "testSlogan",
      },
    ];
    expect(formatComments(shops, lookup, 'owner_id', 'owner')[0]).toEqual({
      shop_name: "TestShop-1",
      owner_id: 1,
      slogan: "testSlogan",
    });
  });
  test("works for arrays with multiple shops", () => {
    const owners = [
      {
        forename: "Rosa",
        surname: "Casper",
        age: 56,
        owner_id: 1,
      },
    ];
    const lookup = makeRefObj(owners, "forename", "owner_id");
    const shops = [
      {
        shop_name: "TestShop-1",
        owner: "Rosa",
        slogan: "testSlogan",
      },
      {
        shop_name: "TestShop-2",
        owner: "Rosa",
        slogan: "testSlogan",
      },
    ];
    expect(formatComments(shops, lookup, 'owner_id', 'owner')).toEqual([
      {
        shop_name: "TestShop-1",
        owner_id: 1,
        slogan: "testSlogan",
      },
      {
        shop_name: "TestShop-2",
        owner_id: 1,
        slogan: "testSlogan",
      },
    ]);
  });
  test("works for arrays with multiple shop owners", () => {
    const owners = [
      {
        forename: "Rosa",
        owner_id: 1,
      },
      {
        forename: "Jim",
        owner_id: 2,
      },
    ];
    const lookup = makeRefObj(owners, "forename", "owner_id");
    const shops = [
      {
        shop_name: "TestShop-1",
        owner: "Rosa",
        slogan: "testSlogan-1",
      },
      {
        shop_name: "TestShop-2",
        owner: "Jim",
        slogan: "testSlogan-2",
      },
    ];
    expect(formatComments(shops, lookup, 'owner_id', 'owner')).toEqual([
      {
        shop_name: "TestShop-1",
        owner_id: 1,
        slogan: "testSlogan-1",
      },
      {
        shop_name: "TestShop-2",
        owner_id: 2,
        slogan: "testSlogan-2",
      },
    ]);
  });
  test("does not mutate the original array or contents", () => {
    const owners = [
      {
        forename: "Rosa",
        owner_id: 1,
      },
      {
        forename: "Jim",
        owner_id: 2,
      },
    ];

    const lookup = makeRefObj(owners, "forename", "owner_id");

    const shops = [
      {
        shop_name: "TestShop-1",
        owner: "Rosa",
        slogan: "testSlogan-1",
      },
      {
        shop_name: "TestShop-2",
        owner: "Jim",
        slogan: "testSlogan-2",
      },
    ];
    formatComments(shops, lookup, 'owner_id', 'owner');
    expect(shops).toEqual([
      {
        shop_name: "TestShop-1",
        owner: "Rosa",
        slogan: "testSlogan-1",
      },
      {
        shop_name: "TestShop-2",
        owner: "Jim",
        slogan: "testSlogan-2",
      },
    ]);
  });
  test("can take an additional keyToAdd and keyToRemove arguments that will allow it to format any items not just shops", () => {
    const treasures = [
      {
        treasure_name: "treasure-a",
        colour: "turquoise",
        age: 200,
        cost_at_auction: "20.00",
        shop: "shop-b",
      },
    ];
    const lookup = { "shop-b": 1 };
    const keyToAdd = "shop_id";
    const keyToRemove = "shop";
    expect(formatComments(treasures, lookup, keyToAdd, keyToRemove)).toEqual([
      {
        treasure_name: "treasure-a",
        colour: "turquoise",
        age: 200,
        cost_at_auction: "20.00",
        shop_id: 1,
      },
    ]);
  });
});
