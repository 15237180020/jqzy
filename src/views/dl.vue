<template>
<div>
  <div class="zong">
	  <div class="hezi">
   <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="账号名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="form.mima"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">登录</el-button>
  </el-form-item>
</el-form>
</div>
  </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          mima:''
        }
      }
    },
    methods: {
    onSubmit() {
      this.$axios
        .post("http://ceshi5.dishait.cn/admin/login", {
          username: this.form.name,
          password: this.form.mima,
        })
        .then((res) => {
          localStorage.token = res.data.data.token;
          this.$router.push({ path: "/home" });
        })
        .catch(() => {
          alert("登录失败");
        });
    },
    //点击请求接口 
  },
    
  }
</script>

<style>
.zong{
	width: 100%;
	height: 800px;
	display: inline-flex;
	justify-content:space-around;
	align-items: center;

}
.hezi{
	width: 500px;
	height: 400px;
	text-align: center;
}
</style>