import { Inject, Injectable, forwardRef} from '@nestjs/common';
import { Query, Resolver, ResolveProperty } from '@nestjs/graphql';
import { AuthorService} from './author.service';
import { PostService} from './post.service';

@Resolver('Author')
@Injectable()
export class AuthorResolver {

    constructor(
        private readonly authorService: AuthorService,
        private readonly postService: PostService,
    ) { }

    @Query()
    author(obj, args, context, info) {
        return this.authorService.findById(args.id);
    } 

    @Query()
    authors(obj, args, context, info) {        
        // console.log('filter',args.filter);
        // console.log('offset',args.offset);
        // console.log('limit',args.limit);
        return this.authorService.findAll();
        //return authors;
    }

    @ResolveProperty()
    posts(author, args, context, info) {
        let res =  this.postService.filterByAuthorId(author.id);
        return res;
    }
}