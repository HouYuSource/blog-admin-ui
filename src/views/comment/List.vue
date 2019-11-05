<template>
  <div>
    <el-form :inline="true" :model="q">
      <el-form-item label="搜索">
        <el-input @change="search" v-model="q.keyword" placeholder="博客标题 / 邮箱 / 内容" clearable></el-input>
      </el-form-item>
      <el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="commentList" style="width: 100%" show-header border>
      <!--<el-table-column prop="id" label="ID" :show-overflow-tooltip="trueFlag" width="190"></el-table-column>-->
      <el-table-column prop="blogTitle" label="博客标题" :show-overflow-tooltip="trueFlag" width="200"></el-table-column>
      <el-table-column prop="email" label="评论邮箱" :show-overflow-tooltip="trueFlag" width="200"></el-table-column>
      <el-table-column prop="toEmail" label="回复邮箱" :show-overflow-tooltip="trueFlag" width="200"></el-table-column>
      <el-table-column prop="createDate" label="时间" width="180"></el-table-column>
      <el-table-column prop="content" label="内容" :show-overflow-tooltip="trueFlag" width="550"></el-table-column>
      <el-table-column fixed="right" prop="status" label="状态" width="80">
        <template slot-scope="scope">
          <div style="cursor:pointer;" href="#" v-show="scope.row.status == 1">
            <el-tag effect="dark" @click="log('请移步查看修改')" type="success">通过</el-tag>
          </div>
          <div style="cursor:pointer;" href="#" v-show="scope.row.status != 1">
            <el-tag effect="plain" @click="log('请移步查看修改')" type="info">待审核</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleInfo(scope.$index, scope.row)">查看</el-button>
          <el-button size="mini" @click="handleReply(scope.$index, scope.row)">回复</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block" style="margin-top: 10px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="q.pageSize"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next"
        :total="totalElements">
      </el-pagination>
    </div>

    <el-dialog title="查看评论" :visible.sync="infoVisible" width="30%">
      <el-form :model="entity">
        <el-form-item label="博客标题" label-width="100px">
          <el-input v-model="entity.blogTitle" :disabled="trueFlag" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="评论邮箱" label-width="100px">
          <el-input v-model="entity.email" :disabled="trueFlag" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="回复邮箱" label-width="100px">
          <el-input v-model="entity.toEmail" :disabled="trueFlag" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" label-width="100px">
          <el-input rows="6" type="textarea" :disabled="trueFlag" v-model="entity.content"></el-input>
        </el-form-item>
        <el-form-item label="审核状态" label-width="100px">
          <el-switch v-model="entity.status"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="infoVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateCommentStatus">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="回复评论" :visible.sync="replyVisible" width="30%">
      <el-form :model="replyEntity">
        <el-form-item label="回复邮箱" label-width="100px">
          <el-input v-model="replyEntity.toEmail" :disabled="trueFlag" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="博客标题" label-width="100px">
          <el-input v-model="replyEntity.blogTitle" :disabled="trueFlag" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="评论内容" label-width="100px">
          <el-input rows="3" type="textarea" :disabled="trueFlag" v-model="replyEntity.sourceContent"></el-input>
        </el-form-item>
        <el-form-item label="回复内容" label-width="100px">
          <el-input rows="6" type="textarea" v-model="replyEntity.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="replyVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveComment">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import * as commentApi from '@/api/CommentApi.js'

  export default {
    name: 'commentList',
    data () {
      return {
        trueFlag: true,
        loading: true,
        // Page请求参数
        q: {
          order: 'desc',
          keyword: '',
          pageIndex: 0,
          pageSize: 10,
        },
        // 列表总数
        totalElements: 0,
        totalPages: 0,
        // 列表
        commentList: [],

        infoVisible: false,
        entity: {
          id: '',
          blogId: '',
          blogTitle: '',
          content: '',
          email: '',
          toEmail: '',
          status: false,
        },

        replyVisible: false,
        replyEntity: {
          id: '',
          blogId: '',
          blogTitle: '',
          content: '',
          email: '',
          toEmail: '',
          sourceContent: '',
        },

      }
    },
    created () {
      this.commentPage()
    },
    methods: {
      log (text) {
        this.$message({
          showClose: true,
          message: text,
          type: 'success'
        })
      },
      commentPage: function (keyword) {
        this.loading = true
        this.q.keyword = keyword ? keyword : this.q.keyword
        commentApi.page(this.q).then(res => {
          this.commentList = res.data.content
          this.totalElements = res.data.totalElements
          this.totalPages = res.data.totalPages
          this.loading = false
        })
      },
      search () {
        this.commentPage()
      },
      handleReply (index, row) {
        this.replyVisible = true
        this.replyEntity.sourceContent = row.content
        this.replyEntity.content = ''
        this.replyEntity.toEmail = row.email
        this.replyEntity.blogId = row.blogId
        this.replyEntity.blogTitle = row.blogTitle
        this.replyEntity.email = 'for.houyu@qq.com'
      },
      saveComment () {
        if (this.replyEntity.content) {                   // update
          commentApi.saveComment(this.replyEntity).then(res => {
            this.$message({showClose: true, message: '回复成功!', type: 'success'})
            this.commentPage()
            this.replyVisible = false
          })
        } else {
          this.$message({showClose: true, message: '内容不可以为空!', type: 'warning'})
        }
      },
      handleInfo (index, row) {
        this.infoVisible = true
        this.entity = JSON.parse(JSON.stringify(row))
        this.entity.status = this.entity.status == 1
      },
      updateCommentStatus () {
        this.infoVisible = false
        this.entity.status = this.entity.status ? 1 : 0
        if (this.entity.id) {                   // update
          commentApi.updateCommentStatus(this.entity).then(res => {
            this.$message({showClose: true, message: '修改成功!', type: 'success'})
            this.commentPage()
          })
        }
      },
      handleDelete (index, row) {
        this.$confirm('此操作不可逆，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          commentApi.deleteComment(row.id).then(res => {
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            })
            this.commentPage()
          })
        })
      },
      handleSizeChange (val) {
        this.q.pageSize = val
        this.commentPage()
      },
      handleCurrentChange (val) {
        this.q.pageIndex = val - 1
        this.commentPage()
      },
    }
  }
</script>

<style>

</style>
