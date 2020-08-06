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
  test('GET: returns a 404 status when username not found', () => {
    return request(app)
    .get('/api/users/jason123')
    .expect(404)
    .then(({body: {msg}}) => {
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
    test('GET: returns a 404 status when article_id not found', () => {
      return request(app)
      .get('/api/articles/69')
      .expect(404)
      .then(({body: {msg}}) => {
        expect(msg).toEqual('article_id does not exist!');
      })
    })
    test('PATCH: updates articles.votes and returns updated vote', () => {
      return request(app)
      .patch('/api/articles/1')
      .send({inc_votes: 1})
      .expect(200)
      .then(({body:{article}}) => {
          expect(article.votes).toBe(101)
        })
      }) 
     test('PATCH: returns a 200 when passing a request body without inc_votes', () => {
      return request(app)
      .patch('/api/articles/2')
      .send({pink_votes: 0})
      .expect(200)
      .then(({body: {article}}) => {
        console.log('=*=>', article)
        expect(article).toEqual(
          expect.objectContaining({
            title: expect.any(String),
            article_id: 2,
            body: expect.any(String),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: 0,
          })
        );
      })
     });
     //the above test checks for valid id, but what about valid request...
     //...also, should I have a test for PATCH to check if the object/property was changed as requested
     
     test('POST: returns with posted comment from given article_id', () => {
       return request(app)
       .post('/api/articles/1/comments')
       .send({username: 'butter_bridge', body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!"})
       .expect(201)
       .then(({body:{comment}}) => {
        console.log('>--->', comment)
        expect(comment).toEqual(
          expect.objectContaining({
            comment_id: expect.any(Number),
            author: 'butter_bridge',
            body: expect.any(String),
            article_id: 1,
            created_at: expect.any(String),
            votes: 0,
          })
        )
      })
      })
  })
});