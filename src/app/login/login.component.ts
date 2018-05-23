/**
 * Created by liufeng on 2018/5/23.
 */
import {Component, OnInit} from '@angular/core';
import { UserModel } from './user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  constructor() {
  }

  //定义user为Usermodel
  private user = new UserModel();

  ngOnInit() {
  }

  /**
   * 登陆事件
   * @param form 表单中的输入值
   */
  submit(form) {
    if (form.username == "1" && form.password == "12345678") {
      alert("登录成功了");
    } else {
      alert("非法用户");
    }
  }
}
