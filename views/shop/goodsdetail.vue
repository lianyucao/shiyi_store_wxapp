<template>
	<view class="content">
		<swiper class="screen-swiper min-h375" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true"
		 indicator-color="#8799a3" indicator-active-color="#0081ff" :circular="true" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item" mode="aspectFill"></image>   <!-- v-if="item.type=='image'" -->
				<!-- <video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video> -->
			</swiper-item>
		</swiper>
		<view class="bg-white min-h90 padding-15 flex justify-between align-end">
			<view class="">
				<view class="text-18 margin-b-10" style="color: #141F33;">{{List.name}}</view>
				<view class="">
					<view class="" v-if="List.vip_price">
						<text class="text-22 text-bold margin-r-4" style="color: #FF5A47;">¥{{List.vip_price}}</text>
						<text class="text-12" style="color: #99A0AD;text-decoration: line-through;">¥{{List.price}}</text>
					</view>
					<view class="" v-else>
						<text class="text-22 text-bold margin-r-4" style="color: #FF5A47;">¥{{List.price}}</text>
					</view>
				</view>
			</view>
			<view class="flex align-center margin-r-5">
				<image @tap="modify(-1)" class="wh-22" src="/static/img/sub.png" mode=""></image>
				<view class="w-33 text-14 text-center" style="color: #313131;">{{shopItem.num}}</view>
				<image @tap="modify(1)" class="wh-22" src="/static/img/add.png" mode=""></image>
			</view>
		</view>
		<view class="bg-white h-185 margin-t-10" style="padding: 15px 0 0 16px;">
			<view class="text-18" style="color: #313131;">产品信息</view>
			<view class="flex flex-wrap w-100s h-85s">
				<view class="w-50s flex align-center h-50">
					<text class="w-30s text-14" style="display: inline-block;color: #A1A1A1;">品牌</text>
					<text class="text-14" style="color: #313131;">{{List.brand}}</text>
				</view>
				<view class="w-50s flex align-center h-50">
					<text class="w-30s text-14" style="display: inline-block;color: #A1A1A1;">规格</text>
					<text class="text-14" style="color: #313131;">{{List.size}}</text>
				</view>
			</view>
		</view>
		<view class="margin-t-10 padding-b-55">
			<view class="h-48 lh-48 bg-white padding-l-16 text-18" style="color: #313131;">
				图文详情
			</view>
			<view class="">
				<rich-text :nodes="mainContent"></rich-text>
			</view>
		</view>
		<button class="cu-btn lg w-100s text-white pos-fix bottom-0" style="height: 55px;background: #5170FF;font-size: 16px;border-radius: 0;" @tap="goback">确认</button>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		// computed:{
		// 	...mapState([
		// 		'SCarlist'
		// 	])
		// },
		data() {
			return {
				swiperList: [],
				dotStyle: false,
				shopItem: '',
				List: '',
				mainContent:''
			}
		},
		onLoad(options) {
			this.TowerSwiper('swiperList') // 初始化towerSwiper 传已有的数组名即可
			this.shopItem = JSON.parse(options.shop)
			this.getList(this.shopItem.id)
		},
		methods: {
			...mapMutations([
				'SET_SCARLISTNUM',
				'JOIN_SHOPCAR'
			]),
			TowerSwiper(name) {
				let list = this[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.swiperList = list
			},
			modify(num) {
				if (num == 1) {
					if (this.shopItem.num == 0) {
						this.shopItem.num++
						this.JOIN_SHOPCAR(this.shopItem)
						return
					} else {
						this.shopItem.num++
						this.SET_SCARLISTNUM(this.shopItem)
					}
				} else {
					if (this.shopItem.num > 0) {
						this.shopItem.num--
						this.SET_SCARLISTNUM(this.shopItem)
					}
				}
			},
			getList(id) {
				this.$api.send({
					url: "/goodsinfo",
					method: "POST",
					data: {
						id
					},
					success: (res) => {
						if(res.code == 200){
							this.List = res.data.array[0]
							this.swiperList = res.data.array[0].goods_imgss
							
							//富文本解析
							let str = res.data.array[0].info;
							var subStr = new RegExp('<img', 'ig'); //创建正则表达式对象,不区分大小写,全局查找
							var result = str.replace(subStr, "<img style='width:100%;height:auto;display:block;' "); //把'is'替换为空字符串
							this.mainContent = result;
						}
					}
				})
			},
			goback(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>

</style>
