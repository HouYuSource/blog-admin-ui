webpackJsonp([3],{kysJ:function(t,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=l("3cXf"),n=l.n(i),a=l("/AKN");var o={name:"commentList",data:function(){return{trueFlag:!0,loading:!0,q:{order:"desc",keyword:"",pageIndex:0,pageSize:10},totalElements:0,totalPages:0,commentList:[],infoVisible:!1,entity:{id:"",blogId:"",blogTitle:"",content:"",email:"",toEmail:"",status:!1},replyVisible:!1,replyEntity:{id:"",blogId:"",blogTitle:"",content:"",email:"",toEmail:"",sourceContent:""}}},created:function(){this.commentPage()},methods:{log:function(t){this.$message({showClose:!0,message:t,type:"success"})},commentPage:function(t){var e,l=this;this.loading=!0,this.q.keyword=t||this.q.keyword,(e=this.q,Object(a.a)({url:"/admin/comment/page",method:"get",params:e})).then(function(t){l.commentList=t.data.content,l.totalElements=t.data.totalElements,l.totalPages=t.data.totalPages,l.loading=!1})},search:function(){this.commentPage()},handleReply:function(t,e){this.replyVisible=!0,this.replyEntity.sourceContent=e.content,this.replyEntity.content="",this.replyEntity.toEmail=e.email,this.replyEntity.blogId=e.blogId,this.replyEntity.blogTitle=e.blogTitle,this.replyEntity.email="for.houyu@qq.com"},saveComment:function(){var t,e=this;this.replyEntity.content?(t=this.replyEntity,Object(a.a)({url:"/comment",method:"post",data:t})).then(function(t){e.$message({showClose:!0,message:"回复成功!",type:"success"}),e.commentPage(),e.replyVisible=!1}):this.$message({showClose:!0,message:"内容不可以为空!",type:"warning"})},handleInfo:function(t,e){this.infoVisible=!0,this.entity=JSON.parse(n()(e)),this.entity.status=1==this.entity.status},updateCommentStatus:function(){var t,e=this;this.infoVisible=!1,this.entity.status=this.entity.status?1:0,this.entity.id&&(t=this.entity,Object(a.a)({url:"/admin/comment/status",method:"put",data:t})).then(function(t){e.$message({showClose:!0,message:"修改成功!",type:"success"}),e.commentPage()})},handleDelete:function(t,e){var l=this;this.$confirm("此操作不可逆，是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var t;(t=e.id,Object(a.a)({url:"/admin/comment/"+t,method:"delete"})).then(function(t){l.$message({showClose:!0,message:"删除成功",type:"success"}),l.commentPage()})})},handleSizeChange:function(t){this.q.pageSize=t,this.commentPage()},handleCurrentChange:function(t){this.q.pageIndex=t-1,this.commentPage()}}},s={render:function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",[l("el-form",{attrs:{inline:!0,model:t.q}},[l("el-form-item",{attrs:{label:"搜索"}},[l("el-input",{attrs:{placeholder:"博客标题 / 邮箱 / 内容",clearable:""},on:{change:t.search},model:{value:t.q.keyword,callback:function(e){t.$set(t.q,"keyword",e)},expression:"q.keyword"}})],1),t._v(" "),l("el-form-item",[l("el-button",{attrs:{type:"primary"},on:{click:t.search}},[t._v("查询")])],1)],1),t._v(" "),l("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.commentList,"show-header":"",border:"",fit:!t.trueFlag}},[l("el-table-column",{attrs:{prop:"blogTitle",label:"博客标题","show-overflow-tooltip":t.trueFlag,width:"200"}}),t._v(" "),l("el-table-column",{attrs:{prop:"email",label:"评论邮箱","show-overflow-tooltip":t.trueFlag,width:"200"}}),t._v(" "),l("el-table-column",{attrs:{prop:"toEmail",label:"回复邮箱","show-overflow-tooltip":t.trueFlag,width:"200"}}),t._v(" "),l("el-table-column",{attrs:{prop:"createDate",label:"时间",width:"180"}}),t._v(" "),l("el-table-column",{attrs:{prop:"content",label:"内容","show-overflow-tooltip":t.trueFlag,width:"550"}}),t._v(" "),l("el-table-column",{attrs:{fixed:"right",prop:"status",label:"状态",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("div",{directives:[{name:"show",rawName:"v-show",value:1==e.row.status,expression:"scope.row.status == 1"}],staticStyle:{cursor:"pointer"},attrs:{href:"#"}},[l("el-tag",{attrs:{effect:"dark",type:"success"},on:{click:function(e){return t.log("请移步查看修改")}}},[t._v("通过")])],1),t._v(" "),l("div",{directives:[{name:"show",rawName:"v-show",value:1!=e.row.status,expression:"scope.row.status != 1"}],staticStyle:{cursor:"pointer"},attrs:{href:"#"}},[l("el-tag",{attrs:{effect:"plain",type:"info"},on:{click:function(e){return t.log("请移步查看修改")}}},[t._v("待审核")])],1)]}}])}),t._v(" "),l("el-table-column",{attrs:{fixed:"right",label:"操作",width:"250"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("el-button",{attrs:{size:"mini"},on:{click:function(l){return t.handleInfo(e.$index,e.row)}}},[t._v("查看")]),t._v(" "),l("el-button",{attrs:{size:"mini"},on:{click:function(l){return t.handleReply(e.$index,e.row)}}},[t._v("回复")]),t._v(" "),l("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(l){return t.handleDelete(e.$index,e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),l("div",{staticClass:"block",staticStyle:{"margin-top":"10px"}},[l("el-pagination",{attrs:{"page-size":t.q.pageSize,"page-sizes":[10,20,50],layout:"total, sizes, prev, pager, next",total:t.totalElements},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),l("el-dialog",{attrs:{title:"查看评论",visible:t.infoVisible,width:"30%"},on:{"update:visible":function(e){t.infoVisible=e}}},[l("el-form",{attrs:{model:t.entity}},[l("el-form-item",{attrs:{label:"博客标题","label-width":"100px"}},[l("el-input",{attrs:{disabled:t.trueFlag,autocomplete:"off"},model:{value:t.entity.blogTitle,callback:function(e){t.$set(t.entity,"blogTitle",e)},expression:"entity.blogTitle"}})],1),t._v(" "),l("el-form-item",{attrs:{label:"评论邮箱","label-width":"100px"}},[l("el-input",{attrs:{disabled:t.trueFlag,autocomplete:"off"},model:{value:t.entity.email,callback:function(e){t.$set(t.entity,"email",e)},expression:"entity.email"}})],1),t._v(" "),l("el-form-item",{attrs:{label:"回复邮箱","label-width":"100px"}},[l("el-input",{attrs:{disabled:t.trueFlag,autocomplete:"off"},model:{value:t.entity.toEmail,callback:function(e){t.$set(t.entity,"toEmail",e)},expression:"entity.toEmail"}})],1),t._v(" "),l("el-form-item",{attrs:{label:"内容","label-width":"100px"}},[l("el-input",{attrs:{rows:"6",type:"textarea",disabled:t.trueFlag},model:{value:t.entity.content,callback:function(e){t.$set(t.entity,"content",e)},expression:"entity.content"}})],1),t._v(" "),l("el-form-item",{attrs:{label:"审核状态","label-width":"100px"}},[l("el-switch",{model:{value:t.entity.status,callback:function(e){t.$set(t.entity,"status",e)},expression:"entity.status"}})],1)],1),t._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(e){t.infoVisible=!1}}},[t._v("取 消")]),t._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:t.updateCommentStatus}},[t._v("确 定")])],1)],1),t._v(" "),l("el-dialog",{attrs:{title:"回复评论",visible:t.replyVisible,width:"30%"},on:{"update:visible":function(e){t.replyVisible=e}}},[l("el-form",{attrs:{model:t.replyEntity}},[l("el-form-item",{attrs:{label:"回复邮箱","label-width":"100px"}},[l("el-input",{attrs:{disabled:t.trueFlag,autocomplete:"off"},model:{value:t.replyEntity.toEmail,callback:function(e){t.$set(t.replyEntity,"toEmail",e)},expression:"replyEntity.toEmail"}})],1),t._v(" "),l("el-form-item",{attrs:{label:"博客标题","label-width":"100px"}},[l("el-input",{attrs:{disabled:t.trueFlag,autocomplete:"off"},model:{value:t.replyEntity.blogTitle,callback:function(e){t.$set(t.replyEntity,"blogTitle",e)},expression:"replyEntity.blogTitle"}})],1),t._v(" "),l("el-form-item",{attrs:{label:"评论内容","label-width":"100px"}},[l("el-input",{attrs:{rows:"3",type:"textarea",disabled:t.trueFlag},model:{value:t.replyEntity.sourceContent,callback:function(e){t.$set(t.replyEntity,"sourceContent",e)},expression:"replyEntity.sourceContent"}})],1),t._v(" "),l("el-form-item",{attrs:{label:"回复内容","label-width":"100px"}},[l("el-input",{attrs:{rows:"6",type:"textarea"},model:{value:t.replyEntity.content,callback:function(e){t.$set(t.replyEntity,"content",e)},expression:"replyEntity.content"}})],1)],1),t._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(e){t.replyVisible=!1}}},[t._v("取 消")]),t._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:t.saveComment}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var r=l("C7Lr")(o,s,!1,function(t){l("mczH")},null,null);e.default=r.exports},mczH:function(t,e){}});
//# sourceMappingURL=3.c0b7f3ef50d81aa6d9ff.js.map