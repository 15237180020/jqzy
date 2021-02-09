<template>
  <div>
    <el-table
      :data="nav"
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="ID"
      > </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
      > </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
      > </el-table-column>

      <el-table-column
        prop="phone"
        label="电话"
      > </el-table-column>

      <el-table-column
        prop="createTime"
        :formatter="onformatter"
        label="注册时间"
      ></el-table-column>
    </el-table>
    <div class="block">
      <span class="demonstration">直接前往</span>
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>

import { userList } from "../../http/index";
import time from '../../uiif/Time'
export default {
  data () {
    return {
      list: {
        pageNum: 5,
        pageSize: 5
      },
      nav: [],
    };
  },

  methods: {
    async liatdata () {
      const { data: res } = await userList(
        `/api/user/list.do?pageNum=${this.list.pageNum}`
      );

      console.log(res)

      this.nav = res.data.list;

      if (res.status !== 0) return this.$message.error(res.msg);


    },

    handleCurrentChange (val) {
      console.log(val)
      this.list.pageNum = val;
      this.liatdata()
    },


    onformatter (row, column, cellValue, index) {

      return time(row.updateTime)
    }
  },
  mounted () {
    this.liatdata();
  },
  created () {

  },

  components: {

  }
};
</script>

<style>
</style>