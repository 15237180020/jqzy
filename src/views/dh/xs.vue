<template>
  <div>
    <div>
      <a-form-model layout="inline" :model="formInline">
        <a-form-model-item>
          <a-input v-model="formInline.name" placeholder="部门搜索"></a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-input
            v-model="formInline.phone"
            type="text"
            placeholder="电话进行搜"
          ></a-input>
        </a-form-model-item>

        <a-form-model-item>
          <a-button type="primary" @click="search">搜索</a-button>
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

      <!--                    修改数据-->
      <div>
        <a-modal v-model="visible" title="修改" @ok="handleOk">
          <a-form-model
            ref="ruleForm"
            :model="message"
            :rules="rules"
            v-bind="layout"
          >
            <a-form-model-item has-feedback label="用户名">
              <a-input v-model="message.name" type="text" autocomplete="off" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="地址">
              <a-input v-model="message.dz" type="text" autocomplete="off" />
            </a-form-model-item>
          </a-form-model>
        </a-modal>
      </div>
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
          title: "部门名称",
          dataIndex: "name",
        },
        {
          title: "电话",
          dataIndex: "phone",
        },
        {
          title: "距离",
          dataIndex: "distance",
        },
        {
          title: "营业时间",
          dataIndex: "opening_hours",
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
      message: {
        name: "",
        dz: "",
        id: 0,
      },
      visible: false,
    };
  },
  created() {
    this.$axios.get("/shopList.json").then((res) => {
      console.log(res.data);
      this.list = res.data;
      this.coplist = res.data;
    });
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
    onClickDelete(record) {
      this.list.forEach((item, index) => {
        if (item.index == record.index) {
          this.coplist.splice(index, 1);
        }
      });
      //删除数据record 是固定的
    },

    search() {
      var res = [];
      if (this.formInline.status == "") {
        res = this.coplist.filter((item) => {
          return (
            item.name.includes(this.formInline.name) &&
            item.phone.includes(this.formInline.phone)
          );
        });
      }
      this.list = res;
    },
    //搜索

    //修改
    onClickDetails(record) {
      //显示弹出框
      this.visible = true;

      //定义一个message数据，让他们保持一致
      this.message.name = record.name;
      this.message.id = record.id;
      this.message.dz = record.address;
    },
    //修改成功OK
    handleOk() {
      //隐藏弹出框
      this.visible = false;

      //遍历数组，如果id相等，。和修改后的名字和地址保持一致
      this.list.map((el) => {
        if (el.id == this.message.id) {
          el.name = this.message.name;
          el.address = this.message.dz;
        }
      });
    },
  },
};
</script>

<style>
img {
  width: 20px;
  height: 20px;
}
</style>