<template>
    <div class="pie">
      <div class="content">
        <div id="carPie" :style="{width: '400px', height: '400px'}" class="pie"></div>
      </div>
    </div>
</template>

<script>
  import {getHaiData} from '../../api/api'
    export default {
      data(){
        return{
          type:[
            "permanentAdress","education","age","married","child","comType","house","price","monthly"
          ],
          title:"555",
          legendData:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
          seriesData:[
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
            {value:234, name:'联盟广告'},
            {value:135, name:'视频广告'},
            {value:1548, name:'搜索引擎'}
          ],
          permanentAdress:[]
        }
      },
      methods:{
        drawPie(data){
          console.log('pie='+data)
          let myChart = this.$echarts.init(document.getElementById('carPie'))
          var option = {
           title : {
             text: this.title,
             x:'center',
           },
           tooltip : {
             trigger: 'item',
             formatter: "{a} <br/>{b} : {c} ({d}%)"
           },
           legend: {
             orient: 'vertical',
             left: 'left',
             y:20,
             data: this.legendData,
           },
           series : [
             {
               name: '访问来源',
               type: 'pie',
               radius : '75%',
               center: ['50%', '60%'],
               data:this.permanentAdress,
               itemStyle: {
                 emphasis: {
                   shadowBlur: 10,
                   shadowOffsetX: 0,
                   shadowColor: 'rgba(0, 0, 0, 0.5)'
                 }
               }
             }
           ]
         };
          myChart.setOption(option)
        },
        getData(){
          let _this = this;
          for(var i=0;i<this.type.length;i++){
            getHaiData(this,this.type[i]).then(res=>{
             for (let item in res){
               //console.log(item.length)
               switch (i){
                 case 0:
                   _this.permanentAdress.push({
                     name:item,
                     value:item.length
                   });
                   _this.drawPie();
                   break;
               }
             }

            })
          }
        }
      },
      mounted(){
        //this.drawPie()
        this.getData()
      }
    }
</script>

<style scoped lang="stylus">
.pie
  width 100%
  .content
    width 100%
    display flex
    flex-wrap wrap
    justify-content space-around
    .pie
      margin-top 30px
</style>
