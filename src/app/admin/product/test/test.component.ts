import { Component } from '@angular/core';
import { DataService, Person } from '../../../services/test/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  people$: Observable<Person[]> | undefined;
	selectedPersonId = '5a15b13c36e7a7f00cf0d7cb';

	constructor(private dataService: DataService) {}

	ngOnInit() {
		this.people$ = this.dataService.getPeople();
  }

  customSearchFn(term: string, item: any): boolean {
    term = term.toLowerCase();
    return item.name.toLowerCase().includes(term) || item.age.toString().includes(term);
  }
}
