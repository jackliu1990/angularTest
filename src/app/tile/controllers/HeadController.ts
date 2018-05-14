import {ActivatedRoute, Router} from '@angular/router';
import {Injectable, Injector} from '@angular/core';
import {TestService} from '../../../cws/TestService';

@Injectable()
export class HeadController {
  constructor(private router: Router,private testService:TestService) {
    console.log(router);
    console.log(testService);
  }
}
