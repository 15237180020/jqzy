<template>
  <div>
    <h3>学生信息管理</h3>
    <div>
      <a-form-model layout="inline" :model="formInline">
        <a-form-model-item>
          <a-input v-model="formInline.name" placeholder="用户名搜索"></a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-input v-model="formInline.phone" type="text" placeholder="手机号码进行搜做"></a-input>
        </a-form-model-item>
        <a-form-model-item label="状态" prop="region">
          <a-select v-model="formInline.status" placeholder="please select your zone">
            <a-select-option value="1">启用</a-select-option>
            <a-select-option value="0">禁用</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="search">搜索</a-button>
          <a-button type="primary" @click="reset">重置</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div>
      <a-table
        :columns="columns"
        :data-source="list"
        :pagination="{ total: list.length, defaultPageSize: 5 }"
        bordered
      >
        <!-- 头像 -->
        <template slot="avatar" slot-scope="props">
          <img :src="props" />
        </template>
        <!-- 显示时间 -->
        <template slot="created_at" slot-scope="props">
          <p>{{ props | timeFilter }}</p>
        </template>
        <!--    启用禁用 -->
        <template slot="status" slot-scope="props">
          <p>{{ props==0?'禁用':'启用'}}</p>
        </template>
        <!--异步操作：查看详情页、删除 -->
        <!-- record代表这一行数据 -->
        <template slot="action" slot-scope="text, record">
          <div class="action_container">
            <a-button
              type="primary"
              shape="circle"
              icon="search"
              size="small"
              @click="onClickDetails(record)"
            />
            <a-button
              type="danger"
              shape="circle"
              icon="delete"
              size="small"
              @click="onClickDelete(record)"
            />
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      coplist: [],
      columns: [
        {
          title: "UID",
          dataIndex: "uid",
        },
        {
          title: "姓名",
          dataIndex: "nickname",
        },
        {
          title: "头像",
          dataIndex: "avatar",
          scopedSlots: { customRender: "avatar" },
        },
        {
          title: "手机号",
          dataIndex: "mobile",
        },
        {
          title: "状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
        },
        {
          title: "创建时间",
          dataIndex: "created_at",
          scopedSlots: { customRender: "created_at" },
        },
        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
        },
      ],
      formInline: {
        name: "",
        phone: "",
        status: "",
      },
    };
  },
  created() {
    this.getstu();
  },
  filters: {
    timeFilter(value) {
      var date = new Date(value * 1000);
      var str = `${date.getHours()}时${date.getMinutes()}分${date.getSeconds()}分，${date.getFullYear()}年`;
      return str;
    },
    //过滤时间
  },
  methods: {
    getstu() {
      this.$axios.get("http://localhost:8080/list.json").then((res) => {
		 console.log(222)
        this.list = res.data;
        this.coplist = res.data;
      });
      //获取数据
    },

    onClickDelete(record) {
      this.list.forEach((item, index) => {
        if (item.uid == record.uid) {
          this.coplist.splice(index, 1);
        }
      });
      //删除数据record 是固定的
    },
    onClickDetails(record) {
      this.$router.push({
        path: "/xq",
        query: { uid: record.uid },
      });
      //跳转详情
    },
    search() {
      var res = [];
      if (this.formInline.status == "") {
        res = this.coplist.filter((item) => {
          return (
            item.nickname.includes(this.formInline.name) &&
            item.mobile.includes(this.formInline.phone)
          );
        });
      } else {
        res = this.coplist.filter((item) => {
          return (
            item.status == this.formInline.status &&
            item.nickname.includes(this.formInline.name) &&
            item.mobile.includes(this.formInline.phone)
          );
        });
      }
      this.list = res;
    },
    //搜索
    reset() {
      this.list = this.coplist;
      this.formInline.name = "";
      this.formInline.phone = "";
      this.formInline.status = "";
    },
    //重置
  },
};
</script>

<style>
img {
  width: 20px;
  height: 20px;
}
</style>