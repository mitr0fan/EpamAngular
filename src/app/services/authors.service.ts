import { Injectable } from '@angular/core';
import { DATA } from 'common/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from '../user';

@Injectable({
    providedIn: 'root',
})
export class AuthorsService {
    private authorsUrl = DATA.AUTHORS_SERVER;

    constructor(private http: HttpClient) {}

    getAuthorsList(searchValue: string): Observable<Author[]> {
        return this.http.get<Author[]>(this.authorsUrl, {
            params: {
                fullName_like: searchValue,
            },
        });
    }
}
