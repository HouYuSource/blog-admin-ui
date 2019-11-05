<template>
  <div>
    <el-form :inline="true" :model="q">
      <el-form-item label="搜索">
        <el-input @change="search" v-model="q.keyword" placeholder="名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="voteList" style="width: 100%" show-header border>
      <el-table-column prop="id" label="ID" :show-overflow-tooltip="trueFlag" width="200"></el-table-column>
      <el-table-column prop="email" label="邮箱" :show-overflow-tooltip="trueFlag" width="350"></el-table-column>
      <el-table-column prop="blogTitle" label="博客标题" :show-overflow-tooltip="trueFlag" width="500"></el-table-column>
      <el-table-column prop="createDate" label="时间" :show-overflow-tooltip="trueFlag" width="350"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
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

  </div>
</template>

<script>

  import * as voteApi from '@/api/VoteApi.js'

  export default {
    name: 'voteList',
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
        voteList: [],

      }
    },
    created () {
      this.votePage()
    },
    methods: {
      log (text) {
        this.$message({
          showClose: true,
          message: text,
          type: 'success'
        })
      },
      votePage: function (keyword) {
        this.loading = true
        this.q.keyword = keyword ? keyword : this.q.keyword
        voteApi.page(this.q).then(res => {
          this.voteList = res.data.content
          this.totalElements = res.data.totalElements
          this.totalPages = res.data.totalPages
          this.loading = false
        })
      },
      search () {
        this.votePage()
      },
      handleDelete (index, row) {
        this.$confirm('此操作不可逆，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            showClose: true,
            message: '暂不支持删除',
            type: 'warning'
          })
          /*voteApi.deleteVote(row.id).then(res => {
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            })
            this.votePage()
          })*/
        })
      },
      handleSizeChange (val) {
        this.q.pageSize = val
        this.votePage()
      },
      handleCurrentChange (val) {
        this.q.pageIndex = val - 1
        this.votePage()
      },
    }
  }
</script>

<style>

</style>
