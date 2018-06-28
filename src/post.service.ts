import { Injectable, Inject, forwardRef, UnprocessableEntityException, UnauthorizedException } from '@nestjs/common';
import { find, filter } from 'lodash';

const posts = [
    { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
    { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
    { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
    { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 },
];

@Injectable()
export class PostService {

    findById(postId: number): any[] {
        return find(posts, { id: postId });
    }
    filterByAuthorId(authorId: number) {
        return filter(posts, { authorId: authorId });
    }

    findAll() {
        return posts;
    }
}
