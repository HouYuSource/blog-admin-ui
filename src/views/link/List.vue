<template>
  <div>
    <el-form :inline="true" :model="q">
      <el-form-item label="搜索">
        <el-input @change="search" v-model="q.keyword" placeholder="名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="primary" @click="handleAdd" plain>添加</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="linkList" style="width: 100%" show-header border>
      <el-table-column prop="id" label="ID" :show-overflow-tooltip="trueFlag" width="350"></el-table-column>
      <el-table-column prop="text" label="名称" :show-overflow-tooltip="trueFlag" width="500"></el-table-column>
      <el-table-column prop="src" label="网址" :show-overflow-tooltip="trueFlag" width="600"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
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
    </div>

    <el-dialog title="编辑分类" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="entity">
        <el-form-item label="友链名称" label-width="100px">
          <el-input v-model="entity.text" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="友链网址" label-width="100px">
          <el-input v-model="entity.src" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveLink">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import * as linkApi from '@/api/LinkApi.js'

  export default {
    name: 'linkList',
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
        linkList: [],

        dialogTableVisible: false,
        dialogFormVisible: false,
        entity: {
          id: '',
          text: '',
          src: '',
        }
      }
    },
    created () {
      this.linkPage()
    },
    methods: {
      log (text) {
        this.$message({
          showClose: true,
          message: text,
          type: 'success'
        })
      },
      linkPage: function (keyword) {
        this.loading = true
        this.q.keyword = keyword ? keyword : this.q.keyword
        linkApi.page(this.q).then(res => {
          this.linkList = res.data.content
          this.totalElements = res.data.totalElements
          this.totalPages = res.data.totalPages
          this.loading = false
        })
      },
      saveLink () {
        this.dialogFormVisible = false
        if (!this.entity.text) {
          this.$message({showClose: true, message: '名称不可以为空', type: 'warning'})
          return
        }
        if (!this.entity.src) {
          this.$message({showClose: true, message: '网址不可以为空', type: 'warning'})
          return
        }
        if (this.entity.id) {                   // update
          linkApi.updateLink(this.entity).then(res => {
            if (res.code == '200') {
              this.$message({showClose: true, message: '修改成功!', type: 'success'})
            }
            this.linkPage()
          })
        } else {                                // save
          linkApi.saveLink(this.entity).then(res => {
            if (res.code == '200') {
              this.$message({showClose: true, message: '新增成功!', type: 'success'})
            }
            this.linkPage()
          })
        }
      },
      search () {
        this.$message({showClose: true, message: '就那么几个, 没必要搜索了!', type: 'warning'})
        this.linkPage()
      },
      handleAdd () {
        this.dialogFormVisible = true
        this.entity = {
          id: '',
          text: '',
          src: '',
        }
      },
      handleEdit (index, row) {
        this.dialogFormVisible = true
        this.entity = JSON.parse(JSON.stringify(row))
      },
      handleDelete (index, row) {
        this.$confirm('此操作不可逆，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          linkApi.deleteLink(row.id).then(res => {
            if (res.code === 200) {
              this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success'
              })
            }
            this.linkPage()
          })
        })
      },
      handleSizeChange (val) {
        this.q.pageSize = val
        this.linkPage()
      },
      handleCurrentChange (val) {
        this.q.pageIndex = val - 1
        this.linkPage()
      },
    }
  }
</script>

<style>

</style>
