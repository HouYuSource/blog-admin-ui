webpackJsonp([5],{bRVg:function(e,t){},jrJP:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("3cXf"),n=i.n(a),l=i("/AKN");var s={name:"linkList",data:function(){return{trueFlag:!0,loading:!0,q:{order:"desc",keyword:"",pageIndex:0,pageSize:10},totalElements:0,totalPages:0,linkList:[],dialogTableVisible:!1,dialogFormVisible:!1,entity:{id:"",text:"",src:""}}},created:function(){this.linkPage()},methods:{log:function(e){this.$message({showClose:!0,message:e,type:"success"})},linkPage:function(e){var t,i=this;this.loading=!0,this.q.keyword=e||this.q.keyword,(t=this.q,Object(l.a)({url:"/admin/link/page",method:"get",params:t})).then(function(e){i.linkList=e.data.content,i.totalElements=e.data.totalElements,i.totalPages=e.data.totalPages,i.loading=!1})},saveLink:function(){var e,t=this;(this.dialogFormVisible=!1,this.entity.text)?this.entity.src?this.entity.id?(e=this.entity,Object(l.a)({url:"/admin/link",method:"put",data:e})).then(function(e){"200"==e.code&&t.$message({showClose:!0,message:"修改成功!",type:"success"}),t.linkPage()}):function(e){return Object(l.a)({url:"/admin/link",method:"post",data:e})}(this.entity).then(function(e){"200"==e.code&&t.$message({showClose:!0,message:"新增成功!",type:"success"}),t.linkPage()}):this.$message({showClose:!0,message:"网址不可以为空",type:"warning"}):this.$message({showClose:!0,message:"名称不可以为空",type:"warning"})},search:function(){this.$message({showClose:!0,message:"就那么几个, 没必要搜索了!",type:"warning"}),this.linkPage()},handleAdd:function(){this.dialogFormVisible=!0,this.entity={id:"",text:"",src:""}},handleEdit:function(e,t){this.dialogFormVisible=!0,this.entity=JSON.parse(n()(t))},handleDelete:function(e,t){var i=this;this.$confirm("此操作不可逆，是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var e;(e=t.id,Object(l.a)({url:"/admin/link/"+e,method:"delete"})).then(function(e){200===e.code&&i.$message({showClose:!0,message:"删除成功",type:"success"}),i.linkPage()})})},handleSizeChange:function(e){this.q.pageSize=e,this.linkPage()},handleCurrentChange:function(e){this.q.pageIndex=e-1,this.linkPage()}}},o={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("el-form",{attrs:{inline:!0,model:e.q}},[i("el-form-item",{attrs:{label:"搜索"}},[i("el-input",{attrs:{placeholder:"名称",clearable:""},on:{change:e.search},model:{value:e.q.keyword,callback:function(t){e.$set(e.q,"keyword",t)},expression:"q.keyword"}})],1),e._v(" "),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:e.search}},[e._v("查询")]),e._v(" "),i("el-button",{attrs:{type:"primary",plain:""},on:{click:e.handleAdd}},[e._v("添加")])],1)],1),e._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.linkList,"show-header":"",border:"",fit:!e.trueFlag}},[i("el-table-column",{attrs:{prop:"id",label:"ID","show-overflow-tooltip":e.trueFlag,width:"350"}}),e._v(" "),i("el-table-column",{attrs:{prop:"text",label:"名称","show-overflow-tooltip":e.trueFlag,width:"500"}}),e._v(" "),i("el-table-column",{attrs:{prop:"src",label:"网址","show-overflow-tooltip":e.trueFlag,width:"600"}}),e._v(" "),i("el-table-column",{attrs:{fixed:"right",label:"操作",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{size:"mini"},on:{click:function(i){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),i("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(i){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),i("div",{staticClass:"block",staticStyle:{"margin-top":"10px"}},[i("el-pagination",{attrs:{"page-size":e.q.pageSize,"page-sizes":[10,20,50],layout:"total, sizes, prev, pager, next",total:e.totalElements},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),i("el-dialog",{attrs:{title:"编辑分类",visible:e.dialogFormVisible,width:"30%"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[i("el-form",{attrs:{model:e.entity}},[i("el-form-item",{attrs:{label:"友链名称","label-width":"100px"}},[i("el-input",{attrs:{autocomplete:"off"},model:{value:e.entity.text,callback:function(t){e.$set(e.entity,"text",t)},expression:"entity.text"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"友链网址","label-width":"100px"}},[i("el-input",{attrs:{autocomplete:"off"},model:{value:e.entity.src,callback:function(t){e.$set(e.entity,"src",t)},expression:"entity.src"}})],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.saveLink}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var r=i("C7Lr")(s,o,!1,function(e){i("bRVg")},null,null);t.default=r.exports}});
//# sourceMappingURL=5.b76c63ab6bc0045640db.js.map