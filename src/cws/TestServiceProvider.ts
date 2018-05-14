import {HttpService} from './HttpService';
import {TestService} from './TestService';

export let testServiceProvider = {
  provide: TestService,
  useFactory: (httpService: HttpService) => {
    return new TestService(httpService);
  },
  deps: [HttpService]
}

export let httpServiceProvider = {
  provide: HttpService,
  useFactory: () => {
    return new HttpService();
  },
  deps: []
}
