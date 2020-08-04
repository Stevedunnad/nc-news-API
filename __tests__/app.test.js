process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

describe("/api", () => {
  
  //hook runs and drops db
  beforeEach(() => {
    return connection.seed.run();
  });
  after(() => {
    return connection.destroy();
  });

  describe('topics', () => {
    it('GET: returns an array of topics', () => {
      return request(app)
      .get('/api/topics')
      .expect(200)
      .then((res) => {
        res.body.topics.forEach(topic => {
          expect(topics.length).toBe(3)
        })
      })
    })
  })
});