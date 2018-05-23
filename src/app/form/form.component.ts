/**
 * Created by liufeng on 2018/5/23.
 */
import {Component, OnInit, ViewChild, AfterViewInit} from "@angular/core";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    //订阅表单值改变事件
    this.registerForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  //找到表单
  @ViewChild('registerForm') registerForm: NgForm;


  constructor() {
  }

  formData = {} as any;

  ngOnInit() {
    //默认性别为male
    this.formData.sex = "male";

  }

  doSubmit(obj: any) {
    //表单提交
    console.log(JSON.stringify(obj));
  }

  onValueChanged(data) {

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      //取到表单字段
      const control = this.registerForm.form.get(field);
      //表单字段已修改或无效
      if (control && control.dirty && !control.valid) {
        //取出对应字段可能的错误信息
        const messages = this.validationMessages[field];
        //从errors里取出错误类型，再拼上该错误对应的信息
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + '';
        }
      }

    }

  }


  //存储错误信息
  formErrors = {
    'email': '',
    'userName': '',
    'passwordGroup.password1': '',
    'passwordGroup.password2': '',
    'sex': ''
  };
  //错误对应的提示
  validationMessages = {
    'email': {
      'required': '邮箱必须填写.',
      'pattern': '邮箱格式不对',
    },
    'userName': {
      'required': '用户名必填.',
      'minlength': '用户名太短',
    },
    'passwordGroup.password1': {
      'required': '请输入密码',
      'minlength': '密码太短',
    },
    'passwordGroup.password2': {
      'required': '请重复输入密码',
      'minlength': '密码太短',
      'passwordNEQ': '两次输入密码不同',
      'password1InValid': ''
    },
    'sex': {
      'required': '性别必填'
    }

  };
}
