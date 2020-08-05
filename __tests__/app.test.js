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
    test('GET: returns a 200 status and an array of topics', () => {
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
  describe('users', () => {
  describe('/api/users/:username', () => {
  test('GET: returns a 200 status and user by username', () => {
    return request(app)
    .get('/api/users/lurker')
    .expect(200)
    .then(({body:{user}}) => {
      expect(user).toEqual(
        {
          username: 'lurker',
          name: 'do_nothing',
          avatar_url:
            'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
        }
      )
    })
  })
  test('GET: returns a 404 status and username not found', () => {
    return request(app)
    .get('/api/users/jason123')
    .expect(404)
    .then(({body: {msg}}) => {
      console.log('=*=>', msg)
      expect(msg).toBe('username does not exist!');
    })
  })
});

})
describe('articles', () => {
  test('GET: returns an article by article_id', () => {
    return request(app)
    .get('/api/articles/3')
    .expect(200)
    .then(({body:{article}}) => {
        expect(article).toHaveProperty(
          'article_id')
        expect(article).toHaveProperty(
          'body')
        expect(article).toHaveProperty(
          'title')
        expect(article).toHaveProperty(
          'topic')
        expect(article).toHaveProperty(
          'author')
        expect(article).toHaveProperty(
          'votes')
        expect(article).toHaveProperty(
          'comment_count')
      })
    })
  })
});