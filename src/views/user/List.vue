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

    <el-table v-loading="loading" :data="userList" style="width: 100%" show-header border>
      <!--<el-table-column prop="id" label="ID" :show-overflow-tooltip="trueFlag" width="150"></el-table-column>-->
      <el-table-column prop="username" label="名称" :show-overflow-tooltip="trueFlag" width="250"></el-table-column>
      <el-table-column prop="email" label="邮箱" :show-overflow-tooltip="trueFlag" width="300"></el-table-column>
      <el-table-column prop="avatar" label="头像" :show-overflow-tooltip="trueFlag" width="400"></el-table-column>
      <el-table-column prop="role" label="角色" :show-overflow-tooltip="trueFlag" width="150"></el-table-column>
      <el-table-column prop="createDate" label="创建时间" :show-overflow-tooltip="trueFlag" width="300"></el-table-column>
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

    <el-dialog title="编辑用户" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="entity">
        <el-form-item label="名称" label-width="100px">
          <el-input v-model="entity.username" autocomplete="off" placeholder="set good name"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="entity.password" type="password" autocomplete="off" placeholder="abc.123"></el-input>
        </el-form-item>
        <el-form-item label="头像" label-width="100px">
          <el-input v-model="entity.avatar" autocomplete="off" placeholder="https://www.shaines.cn/avatar.png"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="entity.email" autocomplete="off" placeholder="for.houyu@qq.com"></el-input>
        </el-form-item>
        <el-form-item label="角色" label-width="100px">
          <el-input v-model="entity.role" autocomplete="off" placeholder="USER"></el-input>
          <!--<input placeholder="">-->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import * as userApi from '@/api/UserApi.js'
  import * as config from '@/js/config.js'

  export default {
    name: 'userList',
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
        userList: [],

        dialogTableVisible: false,
        dialogFormVisible: false,
        entity: {
          id: '',
          username: '',
          password: '',
          avatar: '',
          email: '',
          role: '',
        }
      }
    },
    created () {
      this.userPage()
    },
    methods: {
      log (text) {
        this.$message({
          showClose: true,
          message: text,
          type: 'success'
        })
      },
      userPage: function (keyword) {
        this.loading = true
        this.q.keyword = keyword ? keyword : this.q.keyword
        userApi.page(this.q).then(res => {
          this.userList = res.data.content
          this.totalElements = res.data.totalElements
          this.totalPages = res.data.totalPages
          this.loading = false
        })
      },

      checkForm(entity){
        if (!entity.username) return "用户名不可以为空"
        if (!entity.password) return "密码不可以为空"
        if (!entity.avatar) return "头像不可以为空"
        if (!entity.email) return "邮箱不可以为空"
        if (!entity.role) return "角色不可以为空"
        return true;
      },
      saveUser () {
        let checkMsg = this.checkForm(this.entity)
        if (checkMsg !== true) {
          this.$message({showClose: true, message: checkMsg, type: 'warning'})
          return
        }
        this.entity.password = this.$md5(config.PASSWORD_SALT + this.entity.password)
        if (this.entity.id) {                   // update
          userApi.updateUser(this.entity).then(res => {
            if (res.code == '200') {
              this.$message({showClose: true, message: '修改成功!', type: 'success'})
            }
            this.userPage()
          })
        } else {                                // save
          userApi.saveUser(this.entity).then(res => {
            if (res.code == '200') {
              this.$message({showClose: true, message: '新增成功!', type: 'success'})
            }
            this.userPage()
          })
        }
        this.dialogFormVisible = false
      },
      search () {
        this.$message({showClose: true, message: '就那么几个, 没必要搜索了!', type: 'warning'})
        this.userPage()
      },
      handleAdd () {
        this.dialogFormVisible = true
        this.entity = {
          id: '',
          username: '',
          password: '',
          avatar: '',
          email: '',
          role: '',
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
          userApi.deleteUser(row.id).then(res => {
            if (res.code == '200') {
              this.$message({ showClose: true, message: '删除成功', type: 'success'})
            }
            this.userPage()
          })
        })
      },
      handleSizeChange (val) {
        this.q.pageSize = val
        this.userPage()
      },
      handleCurrentChange (val) {
        this.q.pageIndex = val - 1
        this.userPage()
      },
    }
  }
</script>

<style>

</style>
