import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { graphqlExpress } from 'apollo-server-express';
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql';

import { AuthorService } from './author.service';
import { PostService } from './post.service';

import { AuthorResolver} from './author.resolver';
import { PostResolver} from './post.resolver';


@Module({
    imports: [GraphQLModule],
    providers: [AuthorResolver, PostResolver,AuthorService, PostService]
})
export class AppModule  implements NestModule {
    constructor(private readonly graphQLFactory: GraphQLFactory) { }

    configure(consumer: MiddlewareConsumer) {
        const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.graphql');
        const schema = this.graphQLFactory.createSchema({ typeDefs });

        consumer
            .apply(graphqlExpress(req => ({ schema, rootValue: req })))
            .forRoutes('/graphql');
    }
}