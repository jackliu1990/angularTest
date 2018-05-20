import {Injectable} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
@Injectable()
export class MainController {

  constructor(private router: Router, private route: ActivatedRoute) {
    console.log(route);
  }
}
