import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { map } from 'rxjs/operators/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/never';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit() {
    const o = Observable.create(obs => {
      for (let i = 1; i < 5; i = i + 1) {
        obs.next(i);
        if (i % 2 === 0) {
          obs.error('Foo');
        }
      }
    });

    o
    .pipe(
      map((n: number) => n * 2),
    )
    .catch(err => {
      console.log(err);
      return Observable.never();
    })
    .subscribe(x => console.log(x));
  }
}
