<template>
	<view class="content">
		<view class="">
			<uni-search-bar @confirm="search" @input="input" @cancel="cancel" :bgColor="'#FFFFFF'" :placeholder="'请输入姓名'" />
		</view>
		<view class="" v-if="datalist.length > 0">
			<serve-card v-for="(item,index) in datalist" :key="index" :datalist="item" />
		</view>
		<view class="bg-white" v-else style="height: calc(100vh - 52px);">
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
				datalist: [],
				searchVal: '',
				// {
				// 	title: '郝琼',
				// 	imgUrl: '/static/img/logo.png',
				// 	telphone: '14193689116',
				// 	haveserver: true,
				// 	havebtn: true,
				// 	serverlist: ['洗车', '贴膜'],
				// 	havebtncarNumber: '辽A123456',
				// 	btntitle: '维修',
				// 	showbtn: true
				// }
			}
		},
		onShow() {
			this.getList()
		},
		methods: {
			search(res) {
				// uni.showToast({
				// 	title: '搜索：' + res.value,
				// 	icon: 'none'
				// })
			},
			input(res) {
				this.$api.send({
					url: "/prevsearch",
					method: "POST",
					data: {
						keyword:res.value
					},
					success: (res) => {
						if(res.code == 200){
							var arr = []
							for (var i = 0; i < res.data.length; i++) {
								arr.push({
									title: res.data[i].uname,
									imgUrl: res.data[i].car_img,
									telphone: res.data[i].uphone,
									haveserver: true,
									havebtn: true,
									serverlist: [res.data[i].servicename],
									havebtncarNumber: res.data[i].car_code,
									btntitle: '维修',
									showbtn: true,
									navurl: '/views/wxorder/index?id=' + res.data[i].id
								})
							}
							this.datalist = arr
						}
					}
				})
			},
			cancel(res) {
				// uni.showToast({
				// 	title: '点击取消，输入值为：' + res.value,
				// 	icon: 'none'
				// })
			},
			getList() {
				this.$api.send({
					url: "/memberprev",
					method: "POST",
					data: {
						storeid: uni.getStorageSync(keys.storeinfo).storeid
					},
					success: (res) => {
						if (res.code == 200) {
							var arr = []
							for (var i = 0; i < res.data.length; i++) {
								arr.push({
									title: res.data[i].uname,
									imgUrl: res.data[i].car_img,
									telphone: res.data[i].uphone,
									haveserver: true,
									havebtn: true,
									serverlist: [res.data[i].servicename],
									havebtncarNumber: res.data[i].car_code,
									btntitle: '维修',
									showbtn: true,
									navurl: '/views/wxorder/index?id=' + res.data[i].id
								})
							}
							this.datalist = arr
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

<style>

</style>
