import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpClient } from '@angular/common/http';

import { Scheduler } from 'rxjs/Scheduler';

import { map } from 'rxjs/operators/map';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/never';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = `Chris' Sandbox`;

  private MAX_RETRIES = 100;
  private RETRY_INTERVAL_MODIFIER = 100; // modifier in ms

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  runFooMapPipeline() {
    const o = Observable.create(obs => {
      for (let i = 1; i < 5; i = i + 1) {
        if (i % 2 === 0) {
          obs.error('Error!');
        } else {
          obs.next(i);
        }
      }
    });

    o
    .pipe(
      map((n: number) => n * 2),
    )
    .catch(err => {
      console.error(err);
      return Observable.never();
    })
    .subscribe(x => console.log(x));
  }

  runExponentialBackoff() {
    this.http.get(`/`)
      .retryWhen(errors => {
        let attempts = 0;
        return errors
          .take(this.MAX_RETRIES)
          .switchMap(obs => {
            attempts += 1;
            const message = `Attempt ${attempts}. Waiting ${Math.pow(2, attempts) * this.RETRY_INTERVAL_MODIFIER / 1000}`;
            console.log(message);
            return Observable.of(obs).delay(Math.pow(2, attempts) * this.RETRY_INTERVAL_MODIFIER);
          });
      })
      .subscribe();
  }
}
