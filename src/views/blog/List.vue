<template>
  <div>
    <el-form :inline="true" :model="q">
      <el-form-item label="搜索">
        <el-input @change="search" v-model="q.keyword" placeholder="标题 / 分类 / 标签" clearable></el-input>
      </el-form-item>
      <!--<el-form-item label="活动区域">-->
      <!--<el-select placeholder="活动区域">-->
      <!--<el-option value="shanghai"></el-option>-->
      <!--<el-option value="beijing"></el-option>-->
      <!--</el-select>-->
      <!--</el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="formatImageSrc">格式化MD图片地址</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="blogList" style="width: 100%" show-header border>
      <el-table-column prop="title" label="标题" :show-overflow-tooltip="trueFlag" width="280"></el-table-column>
      <el-table-column prop="summary" label="摘要" :show-overflow-tooltip="trueFlag" width="400"></el-table-column>
      <el-table-column prop="catalogName" label="分类" :show-overflow-tooltip="trueFlag" width="150"></el-table-column>
      <el-table-column prop="tags" label="标签" :show-overflow-tooltip="trueFlag" width="250"></el-table-column>
      <el-table-column prop="readSize" label="阅读-点赞-评论" width="130" align="center">
        <template slot-scope="data">
          <p>{{ data.row.readSize }} - {{ data.row.voteSize }} - {{ data.row.commentSize }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" label="时间" width="120"></el-table-column>
      <el-table-column prop="canComment" label="评论状态" width="100">
        <template slot-scope="scope">
          <div style="cursor:pointer;" href="#" v-show="scope.row.canComment == 1">
            <el-tag @click="log('请移步编辑修改')" type="success">广开言路</el-tag>
          </div>
          <div style="cursor:pointer;" href="#" v-show="scope.row.canComment != 1">
            <el-tag @click="log('请移步编辑修改')" type="danger">我想静静</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="80">
        <template slot-scope="scope">
          <div style="cursor:pointer;" href="#" v-show="scope.row.status == 1">
            <el-tag effect="dark" @click="log('请移步编辑修改')" type="success">发布</el-tag>
          </div>
          <div style="cursor:pointer;" href="#" v-show="scope.row.status != 1">
            <el-tag effect="plain" @click="log('请移步编辑修改')" type="info">草稿</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160"><!--fixed="right"-->
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
      <!--:current-page.sync="currentPage1"-->
    </div>
  </div>
</template>

<script>

  import * as blogApi from '@/api/BlogApi.js'

  export default {
    name: 'blogList',
    data () {
      return {
        trueFlag: true,
        loading: true,
        // 博客Page请求参数
        q: {
          order: 'desc',
          keyword: '',
          pageIndex: 0,
          pageSize: 10,
        },
        // 博客列表总数
        totalElements: 0,
        totalPages: 0,
        // 博客列表
        blogList: [],
      }
    },
    created () {
      this.blogPage()
    },
    methods: {
      log (text) {
        this.$message({
          showClose: true,
          message: text,
          type: 'success'
        })
      },

      blogPage: function (keyword) {
        this.loading = true
        this.q.keyword = keyword ? keyword : this.q.keyword
        blogApi.page(this.q).then(res => {
          this.blogList = res.data.content
          this.totalElements = res.data.totalElements
          this.totalPages = res.data.totalPages
          this.loading = false
        })
      },
      search () {
        this.blogPage()
      },
      formatImageSrc () {
        blogApi.formatImageSrc().then(res => {
          if (res.code == 200) {
            this.$message({
              showClose: true,
              message: "成功!",
              type: 'success'
            })
          }
        })
      },
      handleEdit (index, row) {
        this.$router.push({name: 'editBlog', params: {blogEntity: row}})
      },
      handleDelete (index, row) {
        this.$confirm('此操作不可逆，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          blogApi.deleteBlog(row.id).then(res => {
            if (res.code == 200) {
              this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success'
              })
            }
            this.blogPage()
          })
        })
      },
      handleSizeChange (val) {
        this.q.pageSize = val
        this.blogPage()
      },
      handleCurrentChange (val) {
        this.q.pageIndex = val - 1
        this.blogPage()
      },
    }
  }
</script>

<style>

</style>
