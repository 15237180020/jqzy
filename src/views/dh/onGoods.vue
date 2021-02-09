<template>
  <div>
      <h2>商品详情</h2>

        <div class="item_name">
            <h2>商品名称</h2>
            <p>{{obj.name}}</p>
        </div>

        <div class="item_name">
            <h2>商品描述</h2>
            <p>{{obj.subtitle}}</p>
        </div>

        <div class="item_name">
            <h2>当前状态</h2>
            <p>{{obj.status | stateList}}</p>
        </div>
        
        <div class="item_name">
            <h2>所属分类</h2>
            <p> 
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in options"
                      :key="index"
                    :label="item.name"
                    :value="item.name"
                    >
                    </el-option>
                </el-select>
            </p>
        </div>

        <div class="item_name">
            <h2>商品价格</h2>
            <p>
                <input type="text" v-model="obj.price"  readonly> 元
            </p>
        </div>

        
        <div class="item_name">
            <h2>商品库存</h2>
            <p>
                <input type="text" v-model="obj.stock" readonly> 件
            </p>
        </div>
  
        <div class="item_name">
            <h2>商品图片</h2>
            <p>
                <img :src="obj.imageHost+obj.mainImage" alt="">
            </p>
        </div>
  </div>
</template>

<script>
import { xiang ,cateList}  from '../../http/indexx'
export default {
    data(){
        return {
            id:this.$route.query.id,
            obj:{},

            options:[],
            value:""
        }
    },

    mounted(){
        this.xiangw(),
        cateList().then(res=>{
            console.log(res)
            this.options = res.data.data
        })
    },

    methods:{
       async xiangw(){

           const {data:res} = await xiang (
              `/api/product/detail.do?productId=${this.id}`
           )

           this.obj = res.data
        }
    },


    filters:{
        stateList(val){
            if(val == 1){
                return '已下架'
            } else {
                return '在售'
            }
        }
    }
}
</script>

<style scoped>
.item_name {
    width: 60%;
    height: 40px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-left: 100px;
    margin-top: 10px;
    padding: 10px;
    /* margin: 30px; */
}

.item_name  p{
    width: 400px;
    height: 70%;
    background-color: #999;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 80px;
}

img {
    width:100px;
}
</style>