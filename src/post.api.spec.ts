const supertest = require('supertest');
import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

describe('GraphQL - Posts', () => {
    let app: INestApplication;
    let catsService = { findAll: () => ['test'] };
    let request;
    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    it(`Get post by id with id and title`, async () => {
        let payload = { "query": "{post(id:1){id,title}}" };
        await supertest(app.getHttpServer())
            .post('/graphql')
            .send(payload)
            .set('Accept', 'application/json')
            .expect(200)
            .expect((res) => {
                expect(res.body).not.toBeNull();
                expect(res.body.data).not.toBeNull();
                expect(res.body.data.post).not.toBeNull();
                expect(res.body.data.post.id).toEqual(1);
                expect(res.body.data.post.title).not.toBeNull();
            });
    });
    it(`Get post with autohr`, async () => {
        let payload = { "query": "{post(id:2){id,title,author{lastName} }}" };
        await supertest(app.getHttpServer())
            .post('/graphql')
            .send(payload)
            .set('Accept', 'application/json')
            .expect(200)
            .expect((res) => {
                expect(res.body).not.toBeNull();
                expect(res.body.data).not.toBeNull();
                expect(res.body.data.post).not.toBeNull();
                expect(res.body.data.post.id).toEqual(2);
                expect(res.body.data.post.title).not.toBeNull();
                expect(res.body.data.post.author).not.toBeNull();
                expect(res.body.data.post.author.lastName).toEqual('Stubailo');
            });
    });
    it(`get all posts`, async () => {
        // let payload = { "query": "{authors(filter:{id:1},limit:1,offset:2){id,lastName}}" };
        let payload = { "query": "{posts(limit:1){id,title}}" };
        await supertest(app.getHttpServer())
            .post('/graphql')
            .send(payload)
            .set('Accept', 'application/json')
            .expect(200)
            .expect((res) => {
                // console.log(JSON.stringify(res.body,[2],2));
                expect(res.body).not.toBeNull();
                expect(res.body.data).not.toBeNull();
                expect(res.body.data.posts).not.toBeNull();
                expect(res.body.data.posts.length > 0).toBeTruthy();
            });
    });



    afterAll(async () => {
        await app.close();
    });
});