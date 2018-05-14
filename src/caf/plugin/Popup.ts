import {SimpleComponent} from '../component/SimpleComponent';

export interface Popup {
  destory();
  hide();
  show(component: SimpleComponent);
}
