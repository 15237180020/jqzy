<template>
  <div class="item_feom">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="商品名称">
        <el-input v-model="obj.name"></el-input>
      </el-form-item>

      <el-form-item label="商品描述">
        <el-input v-model="obj.subtitle"></el-input>
      </el-form-item>

      <el-form-item label="活动区域">
          <el-select @change="onchange" v-model="form.region" placeholder="请选择一级分类">
              <el-option
                  v-for="(item,index) in listCart"
                  :key="index"
                  :label="item.name" :value="item.name"></el-option>
            </el-select>
          <el-select v-if="form.region" v-model="form.region2" placeholder="请选择二级分类">
                <el-option
                v-for="(item,index) in listCart2"
                :key="index"
                :label="item.name" :value="item.name"></el-option>
          </el-select>

      </el-form-item>

      <el-form-item label="商品描述">
        <input type="number" v-model="obj.price" class="numberaa" /> 元
      </el-form-item>

      <el-form-item label="商品库存">
        <input type="text" v-model="obj.stock" class="numberaa" /> 件
      </el-form-item>

      <!-- obj.imageHost + obj.mainImage -->

      <el-form-item label="商品图片">
           <img :src="obj.imageHost + obj.mainImage" alt="">
      </el-form-item>
      <!-- <el-form-item label="商品图片">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item> -->

      <el-form-item label="商品详情">
        <div class="item_input" contenteditable="true">
          <p v-html="obj.detail"></p>
        </div>

        <!-- <div v-html="obj.detail"></div> -->
      </el-form-item>
    </el-form>

    <button @click="onQue">确定</button>
  </div>
</template>

<script>
import { modifyList ,modify ,cateList} from "../../http/index";
export default {
  data() {
    return {
      id: this.$route.query.id,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
    
      obj: {},
        listCart:[],
        listCart2:[],

      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ]

    };
  },

  mounted() {
    this.onModify();

    // this.modifyList();

    this.onQue(),

          // 一级分类
        cateList().then(res=>{
            // console.log(res)
            this.listCart = res.data.data
        })
  },

  methods: {


    // * 
    async onModify() {
      let { data: res } = await modify(
        `/api/product/detail.do?productId=${this.id}`
      );

      // var onj = {
      //   data:res
      // }


      console.log(res);

      this.obj = res.data;

    //  console.log(this.obj)
    },

  
        // 二级分类
        onchange(page){
            // page  是你选中的name 
            this.listCart.map(item=>{
                if(item.name === page){
                    cateList({categoryId:item.id}).then(res=>{
                        console.log(res)
                        this.listCart2 = res.data.data
                    })  
                }
            })
        },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },

    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

   async onQue(){
      const {data:res} = await modifyList(
        `/api/product/save.do?categoryId=${this.obj.categoryId}&name=${this.obj.name}&
        subtitl=${this.obj.subtitle}&subImages=${this.obj.subImages}
        &detail=&price=${this.obj.price}&stock=${this.obj.stock}
        &status=${this.obj.status}&id=${this.obj.id}`
      )
    
      // console.log(res)

        this.$message({
          message: '修改成功',
          type: 'success'
        })

        this.$router.push('/tables')
    },


    
  }
};
</script>

<style scoped>
.item_feom {
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.numberaa {
  width: 220px;
  height: 30px;
}

.item_input {
  width: 200px;
  min-height: 20px;
  max-height: 70px;
  outline: 0;
  border: 1px solid #000;
  font-size: 13px;
}
</style>