import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
	CandidateCreateInput as ICandidateCreateInput,
	CandidateFindInput,
	Candidate,
	CandidateUpdateInput,
	CandidateCreateInput
} from '@gauzy/models';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable()
export class CandidatesService {
	constructor(private http: HttpClient) {}

	getAll(
		relations?: string[],
		findInput?: CandidateFindInput
	): Observable<{ items: Candidate[]; total: number }> {
		const data = JSON.stringify({ relations, findInput });
		// console.log('Get all candidates in service', data)
		return this.http.get<{ items: Candidate[]; total: number }>(
			`/api/candidate`,
			{
				params: { data }
			}
		);
	}

	getCandidateById(id: string) {
		return this.http
			.get<Candidate>(`/api/candidate/${id}`)
			.pipe(first())
			.toPromise();
	}

	update(id: string, updateInput: CandidateUpdateInput): Promise<any> {
		return this.http
			.put(`/api/candidate/${id}`, updateInput)
			.pipe(first())
			.toPromise();
	}

	create(createInput: ICandidateCreateInput): Observable<Candidate> {
		return this.http.post<Candidate>('/api/candidate/create', createInput);
	}
	createBulk(createInput: CandidateCreateInput[]): Observable<Candidate[]> {
		console.log('createInput in candidate service', createInput);
		return this.http.post<Candidate[]>(
			'/api/candidate/createBulk',
			createInput
		);
	}
}
