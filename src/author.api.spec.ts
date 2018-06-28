const supertest = require('supertest');
import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

describe('GraphQL - Authors', () => {
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

    it(`Get author by id with id and lastName`, async () => {
        let payload = { "query": "{author(id:1){id,lastName}}" };
        await supertest(app.getHttpServer())
            .post('/graphql')
            .send(payload)
            .set('Accept', 'application/json')
            .expect(200)
            .expect((res) => {
                expect(res.body).not.toBeNull();
                expect(res.body.data).not.toBeNull();
                expect(res.body.data.author).not.toBeNull();
                expect(res.body.data.author.id).toEqual(1);
                expect(res.body.data.author.lastName).toEqual('Coleman');
            });
    });
    it(`Get author by id with posts`, async () => {
        let payload = { "query": "{author(id:2){id,lastName,posts{id,title} }}" };
        await supertest(app.getHttpServer())
            .post('/graphql')
            .send(payload)
            .set('Accept', 'application/json')
            .expect(200)
            .expect((res) => {
                // console.log(JSON.stringify(res.body, [2], 2));
                expect(res.body).not.toBeNull();
                expect(res.body.data).not.toBeNull();
                expect(res.body.data.author).not.toBeNull();
                expect(res.body.data.author.id).toEqual(2);
                expect(res.body.data.author.posts.length).toEqual(2);
                expect(res.body.data.author.posts[0].id).toEqual(2);
            });
    });
    it(`get all authors`, async () => {
        // let payload = { "query": "{authors(filter:{id:1},limit:1,offset:2){id,lastName}}" };
        let payload = { "query": "{authors(limit:1){id,lastName}}" };
        await supertest(app.getHttpServer())
            .post('/graphql')
            .send(payload)
            .set('Accept', 'application/json')
            .expect(200)
            .expect((res) => {
                // console.log(JSON.stringify(res.body,[2],2));
                expect(res.body).not.toBeNull();
                expect(res.body.data).not.toBeNull();
                expect(res.body.data.authors).not.toBeNull();
                expect(res.body.data.authors.length > 0).toBeTruthy();
            });
    });



    afterAll(async () => {
        await app.close();
    });
});