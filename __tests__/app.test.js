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
    test('ALL: 404 - non-existent path', () => {
      return request(app)
      .get('/api/tipocs')
      .expect(404)
      .then(res => {
        expect(res.body.msg).toBe('This path does not exist')
      })
    })
    test('invalid methods', () => {
      test('status: 405' ,() => {
        const invalidMethods = ['patch', 'put', 'post', 'delete'];
        const methodPromises = invalidMethods.map(method => {
          return request(app)
          [method]('/api/topics')
          .expect(405)
          .then(({body: {msg}}) => {
            expect(msg).toBe('method not allowed!')
          })
        })
        return Promise.all(methodPromises);
      })
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
     test('POST: returns with posted comment from given article_id', () => {
       return request(app)
       .post('/api/articles/1/comments')
       .send({username: 'butter_bridge', body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!"})
       .expect(201)
       .then(({body:{comment}}) => {
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
      //this test passes, but it's not doing what I want it to yet!
      test('POST: returns a 200 when passing a request body without author key', () => {
        return request(app)
        .patch('/api/articles/7')
        .send({body: "Lobster pot"})
        .expect(200)
        .then(({body: {comment}}) => {
          expect(comment).toEqual(undefined);
        })
       });
       test('GET: returns an array of comments for passed article_id', () => {
         return request(app)
         .get('/api/articles/1/comments?sort_by=created_at')
         .expect(200)
         .then(({body:{comments}}) => {
           expect(Array.isArray(comments)).toBe(true);
           expect(comments.length).toBe(13);
            expect(comments[0]).toHaveProperty('comment_id');
            expect(comments[0]).toHaveProperty('votes');
            expect(comments[0]).toHaveProperty('created_at');
            expect(comments[0]).toHaveProperty('author');
            expect(comments[0]).toHaveProperty('body');
         })
       })
       test('GET: array is sorted by created_at', () => {
         return request(app)
         .get('/api/articles/1/comments?sort_by=created_at')
         .expect(200)
         .then(({body:{comments}}) => {
           const mappedComments = comments.map(comment => {
             return {created_at: new Date(comment.created_at)}
           })
          expect(mappedComments).toBeSortedBy("created_at", {
            descending: true
          });
         })
       })
       test('GET: returns a 404 status when given valid article_id syntax, but article_id not found', () => {
        return request(app)
        .get('/api/articles/69/comments')
        .expect(404) //still getting a 200!
        .then(({body: {msg}}) => {
          expect(msg).toEqual('article_id does not exist!');
        })
      })
      test('GET: returns a 400 status when given invalid article_id syntax', () => {
        return request(app)
        .get('/api/articles/mango/comments')
        .expect(400)
        .then(({body: {msg}}) => {
          expect(msg).toEqual('bad request');
        })
      })
  })
  describe('comments', () => {
    test('DELETE: deletes a comment by comment_id and status 204 and no content', () => {
      return request(app)
        .delete('/api/comments/16')
        .expect(204)
    })
  })
});