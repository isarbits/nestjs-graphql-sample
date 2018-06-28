import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Query, Resolver, ResolveProperty } from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { PostService } from './post.service';

@Resolver('Post')
@Injectable()
export class PostResolver {

    constructor(
        private readonly authorService: AuthorService,
        private readonly postService: PostService,
    ) { }

    @Query()
    post(obj, args, context, info) {
        return this.postService.findById(args.id);
    }

    @Query()
    posts(obj, args, context, info) {
        // console.log('filter', args.filter);
        // console.log('offset', args.offset);
        // console.log('limit', args.limit);
        return this.postService.findAll();
    }

    @ResolveProperty()
    author(post, args, context, info) {
        console.log('resolver authorId', post.authorId)
        return this.authorService.findById(post.authorId);        
    }
}