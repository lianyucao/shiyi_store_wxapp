<template>
	<view class="content">
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex justify-center solid-bottom">
				<view class="cu-item flex-sub pos-rel justify-center" style="display: flex;" v-for="(item,index) in navList" :key="index"
				 :class="index==TabCur?'sel':''" @tap="tabSelect" :data-id="index">
					{{item}}
					<view class="pos-abs w-60s" style="bottom: 0;border-radius: 20px;" :class="index==TabCur?'cur':''"></view>
				</view>
			</view>
		</scroll-view>
		<view class="">
			<uni-search-bar @confirm="search" @input="input" @cancel="cancel" :bgColor="'#FFFFFF'" />
		</view>
		<view class="" v-if="datalist.length > 0">
			<view class="" v-if="TabCur == 0">
				<serve-card v-for="(item,index) in datalist" :key="index" :datalist="item" />
			</view>
			<view class="" v-if="TabCur == 1">
				<serve-card v-for="(item,index) in datalist" :key="index" :datalist="item" />
			</view>
			<view class="" v-if="TabCur == 2">
				<serve-card v-for="(item,index) in datalist" :key="index" :datalist="item" />
			</view>
		</view>
		<view class="bg-white" v-else style="height: calc(100vh - 101px)">
			<view class="" style="position: absolute;left: 50%;top: 40%;transform: translate(-50%,-50%);">
				<image class="wh-150" src="https://shiyi.cg500.com/uploads/nodata.png" mode=""></image>
				<view class="text-center text-16" style="color: #5170FF;">
					暂无数据
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import ServeCard from '../../components/serveCard/index.vue'
	import uniSearchBar from '../../components/search/uni-search-bar/uni-search-bar.vue'
	import {
		keys
	} from '../../config/StorageKey.js'
	export default {
		data() {
			return {
				navList: ['进行中', '审核中', '已结束'],
				TabCur: 0,
				datalist: [],
				// title: '郑秋',
				// imgUrl: '/static/img/logo.png',
				// telphone: '14193689116',
				// haveserver: true,
				// havebtn: true,
				// serverlist: ['洗车', '贴膜'],
				// havebtncarNumber: '辽A123456',
				// btntitle: '上传补漆照片',
				// showbtn: true,
				// navurl: '/views/wxorder/index?id=' + 1
				searchVal: ''
			}
		},
		onShow() {
			this.getList()
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id
				this.getList()
			},
			search(res) {
				// uni.showToast({
				// 	title: '搜索：' + res.value,
				// 	icon: 'none'
				// })
				this.getList(res.value)
			},
			input(res) {
				this.getList(res.value)
			},
			cancel(res) {
				// uni.showToast({
				// 	title: '点击取消，输入值为：' + res.value,
				// 	icon: 'none'
				// })
			},
			getList(name) {
				this.$api.send({
					url: "/storesorder",
					method: "POST",
					data: {
						store_id: uni.getStorageSync(keys.storeinfo).storeid,
						type: this.TabCur + 4,
						uname:name
					},
					success: (res) => {
						if (res.code == 200) {
							if (this.TabCur == 0) {
								var arr = []
								for (var i = 0; i < res.data.length; i++) {
									arr.push({
										title: res.data[i].uname,
										imgUrl: res.data[i].car_img[0],
										telphone: res.data[i].uphone,
										haveserver: true,
										havebtn: true,
										serverlist: [res.data[i].servicename],
										havebtncarNumber: res.data[i].car_number,
										btntitle: '上传补漆照片',
										showbtn: true,
										navurl: '/views/wxorder/index?id=' + res.data[i].id
									})
								}
								this.datalist = arr
							} else if (this.TabCur == 1) {
								var arr = []
								for (var i = 0; i < res.data.length; i++) {
									arr.push({
										title: res.data[i].uname,
										imgUrl: res.data[i].car_img[0],
										telphone: res.data[i].uphone,
										haveserver: true,
										havebtn: true,
										serverlist: [res.data[i].servicename],
										havebtncarNumber: res.data[i].car_number,
										btntitle: '已完成',
										showbtn: true,
										navurl: '/views/wxorder/index?id=' + res.data[i].id
									})
								}
								this.datalist = arr
							} else {
								var arr = []
								for (var i = 0; i < res.data.length; i++) {
									arr.push({
										title: res.data[i].uname,
										imgUrl: res.data[i].car_img[0],
										telphone: res.data[i].uphone,
										haveserver: true,
										havebtn: true,
										serverlist: [res.data[i].servicename],
										havebtncarNumber: res.data[i].car_number,
										btntitle: '已结束',
										showbtn: true,
										navurl: '/views/wxorder/index?id=' + res.data[i].id
									})
								}
								this.datalist = arr
							}
						}else{
							this.datalist = res.data
						}
					}
				})
			}
		},
		components: {
			ServeCard,
			uniSearchBar
		}
	}
</script>

<style scoped>
	.sel {
		color: #5170FF;
	}

	.cur {
		border: 1px solid #5170FF;
	}
</style>
