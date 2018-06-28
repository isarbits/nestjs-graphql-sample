import { Injectable, Inject, forwardRef, UnprocessableEntityException, UnauthorizedException } from '@nestjs/common';
import { find, filter } from 'lodash';

const authors = [
    { id: 1, firstName: 'Tom', lastName: 'Coleman' },
    { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
    { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
];


@Injectable()
export class AuthorService {

    findById(authorId:number) : any[] {
        return find(authors, { id: authorId });
    }

    findAll() {
        return authors;
    }
}
