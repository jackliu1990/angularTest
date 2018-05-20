import {Component, Injectable, Injector, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Injectable()
export class WorkspaceComponent implements OnInit {

  // 模拟数据，服务端传入代替
  workspaces: any[];

  constructor(private router: Router, private route: ActivatedRoute) {
    console.log(route);
  }

  ngOnInit() {
    this.workspaces = this.getWorkspaces();
  }

  getWorkspaces (): any[] {
    return [
      {name: 'workspace1', type: 'ProstGre', status: '未初始化'},
      {name: 'workspace2', type: 'MongoDB', status: '未关联'},
      {name: 'workspace3', type: '空间数据文件系统', status: '已关联'},
      {name: 'workspace4', type: 'MongoDB', status: '未关联'},
      {name: 'workspace5', type: 'ProstGre', status: '已关联'},
      {name: 'workspace6', type: 'MongoDB', status: '未初始化'},
      {name: 'workspace7', type: '空间数据文件系统', status: '已关联'},
      {name: 'workspace8', type: 'ElasticSearch', status: '未关联'},
      {name: 'workspace9', type: 'ProstGre', status: '未初始化'}
    ];
  }


  refresh() {
    let httpUrl = 'http://172.18.24.35:8080/tsgis/wscs/workspace' +
      '/create?className=' + 'com.gs.gis.descriptor.workspace.PostGreStoreDescriptor';
    /* this.http.get(httpUrl, {responseType: 'json'}).then(data=>{
       data.es={
         $type:'ESStoreDescriptor,http://www.Gs.com',
         clusterName:'clusterName'
       };
       let p1: any = JSON.stringify(data);
       let pp=new TObjectCreator();
       let test= pp.create(p1);
     });*/



    // TODO: refresh
    console.log('refresh');
    // this.bar.start();
    // this.dialog.success('123');
  }

  // 根据储存类型，带参(workspacename)路由到相应的工作区组件
  editWorkspace(workspacename: string, storetype: string) {
    switch (storetype) {
      case 'ProstGre':
        this.router.navigate(['db'], {relativeTo: this.route,
          queryParams:{operator: 'edit', workspacename: workspacename, type: 'postgre'}});
        break;
      case 'MongoDB' :
        this.router.navigate(['db'], {relativeTo: this.route,
          queryParams:{operator: 'edit', workspacename: workspacename, type: 'mongo'}});
        break;
      case '空间数据文件系统':
        this.router.navigate(['fs'], {relativeTo: this.route,
          queryParams:{operator: 'edit', workspacename: workspacename}});
        break;
      case 'ElasticSearch':
        this.router.navigate(['elasticsearch'], {relativeTo: this.route,
          queryParams:{operator: 'edit', workspacename: workspacename}});
        break;
    }
  }
  // 编辑还是复制，要有一个字段传到工作区组件
  // 根据储存类型，带参路由到相应的工作区组件
  copyWorkspace(workspacename: string, storetype: string) {
    switch (storetype) {
      case 'ProstGre':
        this.router.navigate(['db'], {relativeTo: this.route,
          queryParams: {operator: 'copy', workspacename: workspacename, type: 'postgre'}});
        break;
      case 'MongoDB' :
        this.router.navigate(['db'], {relativeTo: this.route,
          queryParams: {operator: 'copy', workspacename: workspacename, type: 'mongo'}});
        break;
      case '空间数据文件系统':
        this.router.navigate(['fs'], {relativeTo: this.route,
          queryParams: {operator:'copy', workspacename: workspacename}});
        break;
      case 'ElasticSearch':
        this.router.navigate(['elasticsearch'], {relativeTo: this.route,
          queryParams: {operator: 'copy', workspacename: workspacename}});
        break;
    }
  }

  // 根据储存类型，路由到关联post组件或关联mongo组件
  associateWorkspace(type: string, workspacename: string) {
    switch (type) {
      case 'ProstGre':
        this.router.navigate(['associate/postgresql'], {relativeTo: this.route,
          queryParams: {workspacename: workspacename}});
        break;
      case 'MongoDB' :
        this.router.navigate(['associate/mongodb'], {relativeTo: this.route,
          queryParams: {workspacename: workspacename}});
        break;
      case '空间数据文件系统':
        // TODO: 关联工作区数据集
        // TODO：更改数据集状态为“已关联”
        this.changeStatus(workspacename, '已关联');
        break;
      case 'ElasticSearch':
        // TODO: 关联工作区数据集
        this.changeStatus(workspacename, '已关联');
        break;
    }
  }

  // 初始化关联结构
  initWorkspace(workspacename: string) {
    // TODO: 初始化关联结构
    // TODO: 将数据集状态改为‘未关联’
    this.changeStatus(workspacename, '未关联');
  }

  // 更改工作区数据集状态
  changeStatus(workspacename: string, status: string) {
    this.workspaces.forEach(workspace => {
      if (workspace.name === workspacename) {
        workspace.status = status;
      }
    });
  }

  // // 销毁数据集关联信息
  // destroyWorkspace(workspacename: string) {
  //   if (this.isUsed(workspacename)) {
  //     this.dialog.info('工作区在图层服务或空间任务中正在被使用，请先删除相关图层服务或空间任务！');
  //   } else {
  //     let flag = this.dialog.confirm('销毁',`是否要销毁${workspacename}工作区的数据集关联信息？`);
  //     flag.then((value: boolean) => {
  //       if (value) {
  //         // TODO：销毁选中的工作区的数据集关联信息
  //         console.log(`销毁了${workspacename}工作区的数据集关联信息`);
  //         this.changeStatus(workspacename, '未初始化');
  //       } else {
  //         console.log(`取消销毁${workspacename}工作区的数据集关联信息`);
  //       }
  //     });
  //   }
  // }

  // 工作区在图层服务或空间任务中是否正在被使用
  isUsed(workspacename: string): boolean {
    return false;
  }

  // // 删除工作区
  // deleteWorkspace(workspacename: string) {
  //   if (this.isUsed(workspacename)) {
  //     this.dialog.info('该工作区在图层服务或空间任务中正在被使用，请先删除图层服务或空间任务！');
  //   } else {
  //     let flag = this.dialog.confirm('删除',`是否删除${workspacename}工作区？`);
  //     flag.then((value: boolean) => {
  //       if (value) {
  //         // TODO：删除选中的工作区
  //         console.log(`删除了${workspacename}工作区`);
  //         this.workspaces = this.workspaces.filter(workspace => workspace.name !== workspacename);
  //       } else {
  //         console.log(`取消删除${workspacename}工作区`);
  //       }
  //     });
  //   }
  // }
}
