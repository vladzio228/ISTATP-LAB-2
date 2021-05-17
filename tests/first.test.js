/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app');

describe('Get Endpoints', () => {
  it('get all contacts', async () => {
    const res = await request(app).get('/api/v1/contacts');
    expect(res.statusCode).toEqual(200);
  });
});
