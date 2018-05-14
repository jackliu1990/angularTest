import {HttpService} from './HttpService';

export class TestService {
  constructor(private httpService: HttpService) {

  }
  get() {
    return this.httpService.getData();
  }
}
