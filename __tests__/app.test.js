process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

describe("/api", () => {
  
  //hook runs and drops db
  beforeEach(() => {
    return connection.seed.run();
  });
  afterAll(() => {
    return connection.destroy();
  });

  describe('topics', () => {
    test('GET: returns an array of topics', () => {
      return request(app)
      .get('/api/topics')
      .expect(200)
      .then(({body}) => {
        expect(body.topics).toEqual(expect.arrayContaining([
          expect.objectContaining({
            description: expect.any(String),
            slug: expect.any(String)
          })
        ]))
      })
    })
  })
  test('ALL: 404 - non-existent path', () => {
    return request(app)
    .get('/api/tipocs')
    .expect(404)
    .then(res => {
      expect(res.body.msg).toBe('This path does not exist')
    })
  })
});