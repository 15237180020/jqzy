<template>
  <div>
      <div class="item_title_container">
          <h1>商品管理 -- 添加商品</h1>
      </div>
<div class="item_from_wrapper">
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
            <el-input v-model="form.name" placeholder="请输入商品名称"></el-input>
        </el-form-item>

        <el-form-item label="商品描述">
            <el-input v-model="form.subtitle" placeholder="请输入商品描述"></el-input>
        </el-form-item>

        <el-form-item label="所属分类">
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

        <el-form-item label="商品价格">
            <el-input v-model="form.price" placeholder="价格"></el-input>元
        </el-form-item>

        <el-form-item label="商品库存">
            <el-input v-model="form.stock" placeholder="库存"></el-input>件
        </el-form-item>

        <el-form-item label="商品图片">
            <el-upload
            name="upload_file"
            class="upload-demo"
            action="/api/product/upload.do"
            :on-preview="handlePreview"
            :before-remove="beforeRemove"
            :before-upload="beforeAvatarUpload"
            :on-success="handleSuccess"
            >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>

        </el-form-item>


        <el-form-item>
               <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
    </el-form>

</div>


  </div>
</template>

<script>
import { addList ,cateList} from '../../http/index'
export default {
    data(){
        return {
            form:{
                name:"", // 名称 
                region:"",  //分类
                subtitle:"",//描述
                price:"",// 价格
                stock:"",// 库存
                // status: 1, // 状态
                categoryId: 0,
                region2:"",
                subImages:""
            },

            listCart:[],
            listCart2:[]
        }
    },

    mounted(){
        // 一级分类
        cateList().then(res=>{
            // console.log(res)
            this.listCart = res.data.data
        })
        // console.log(this.form.subImages)
    },

    methods:{
        onSubmit(){
            if(this.form.name == '' || this.form.subtitle == ''){
                this.$message('不能为空')
                return ;
            }
            addList(this.form).then(res=>{
                console.log(res)

                this.$message({
                  message: res.data.data,
                  type: "success"
                });

                this.$router.push('/tables')
            })
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

        // 图片  点击文件列表中已上传的文件时的钩子	
        // 点击文件列表中已上传的文件时的钩子	function(file)
        handlePreview(file){
            console.log(file.name)
            this.form.subImages = file.name
        },

        // 删除图片  删除文件之前的钩子
        beforeRemove(file, fileList){
            console.log(file, fileList)

            return this.$confirm(`确定移除${file.name}?`)
        },

        // 限制图片的大小 跟格式   上传文件之前的钩子
        beforeAvatarUpload(file){
            console.log(file)
            const isjpg = file.type === 'image/jpeg';
            const isLt = file.size/1024/1024 < 2

            if(!isjpg){
                this.$message.error("上传头像图片只能是JPG格式！！！")  
            }

            if(!isLt){
                this.$message.error("上传头像图片大小不能超过2MB！！！")  
            }
            return isjpg && isLt;
        },
 
        // 文件上传成功时的钩子   function(response, file, fileList)
        handleSuccess(response, file, fileList){
            console.log(response.data.uri)
            this.form.subImages = response.data.uri
        }
    }
}
</script>

<style scoped>
.item_title_container h1{
    font-size: 35px;
    margin: 10px;
}

.item_from_wrapper {
    width: 100%;
    height: 60vh;
    display: inline-flex;
    justify-content: center;
    align-items: center;
}

.el-input {
    width: 300px;
}
</style>