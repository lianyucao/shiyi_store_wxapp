<template>
	<view class="bg-white solid-bottom" style="padding: 18px 15px 15px 15px;transition: 0.3s;overflow: hidden;" :style="{height:height + 'px'}">
		<view class="flex">
			<image class="wh-116 margin-r-12" :src="datalist.imgUrl" mode=""></image>
			<view class="w-65s">
				<view class="text-17" style="color: #313131;">{{datalist.title}}</view>
				<view class="flex align-center margin-t-5">
					<image class="wh-13" src="../../static/img/phone.png" mode=""></image>
					<text class="text-14" style="color: #5170FF;">{{datalist.telphone}}</text>
				</view>
				<view class="text-13 margin-t-5" style="color: #313131;">{{datalist.carNumber}}</view>
				<view class="margin-t-50" @tap="dropDown" v-if="datalist.havegoods">
					<text class="text-13" style="color: #5170FF;">{{flag?'收起':'展开全部'}}</text>
					<text class="text-blue" :class="flag?'cuIcon-triangleupfill':'cuIcon-triangledownfill'"></text>
				</view>
				<view class="margin-t-9" v-if="datalist.haveserver">
					<text v-for="(item,index) in datalist.serverlist" :key="index" class="h-15 text-11 text-center lh-15 margin-r-5 padding-3" style="background:rgba(255,165,70,0.1);display: inline-block;color: #FFA546;">{{item}}</text>
				</view>
				<view class="margin-t-15 flex justify-between align-end min-h29" v-if="datalist.havebtn">
					<text class="text-13" style="color: #313131;">{{datalist.havebtncarNumber}}</text>
					<button type="default" class="cu-btn h-29 text-14 text-bold padding-0" style="background: #5170FF;color: #FFFFFF;padding: 0 12px;" v-if="datalist.showbtn" @tap="this.$system.getToPage(datalist.navurl)">{{datalist.btntitle}}</button>
				</view>
			</view>
		</view>
		<view class="margin-t-18" v-if="flag">
			<view v-for="(item,index) in datalist.goodslist" :key="index" class="h-65 flex margin-b-10" style="background:rgba(81,112,255,0.05);border-radius: 5px;padding: 6px 10px;">
				<image class="wh-53 margin-r-10" style="border-radius: 5px;" :src="item.goods_img" mode=""></image>
				<view class="w-80s">
					<view class="text-16" style="color: #313131;">{{item.goodsname}}</view>
					<view class="margin-t-15 flex justify-between">
						<text class="text-14" style="color: #FF3F00;">¥{{item.price}}</text>
						<text class="text-11" style="color: #A1A1A1;">x{{item.goodsnum}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			datalist:{
				type:Object,
				default:function(){
					return {
						// title:'郝琼',
						// imgUrl:'/static/img/logo.png',
						// telphone:'14193689116',
						// carNumber:'辽A2345H',
						// havegoods:false,
						// haveserver:false,
						// havebtn:false,
						// serverlist:['洗车','贴膜'],
						// havebtncarNumber:'辽A123456',
						// showbtn:true,
						// btntitle:'上传完成照片',
						// goodslist:[{
						// 	title:'商品名称商品名称商品名称',
						// 	price:'54.98',
						// 	num:'1',
						// 	img:'/static/img/logo.png'
						// },{
						// 	title:'商品名称商品名称商品名称',
						// 	price:'68.98',
						// 	num:'2',
						// 	img:'/static/img/logo.png'
						// }]
					}
				}
			}
		},
		data() {
			return {
				height: 150,
				flag: false
			}
		},
		onLoad() {

		},
		methods: {
			dropDown() {
				this.flag = !this.flag
				if (this.flag) {
					this.height = 310
				} else {
					this.height = 150
				}
			}
		}
	}
</script>

<style>

</style>
