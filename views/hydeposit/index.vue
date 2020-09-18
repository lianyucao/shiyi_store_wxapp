<template>
	<view class="content">
		<view class="">
			<uni-search-bar @confirm="search" @input="input" @cancel="cancel" :bgColor="'#FFFFFF'" />
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
				// title: '郑秋',
				// imgUrl: '/static/img/logo.png',
				// telphone: '14193689116',
				// carNumber: '辽A2345H',
				// havegoods: true,
				// goodslist: [{
				// 	title: '商品名称商品名称商品名称',
				// 	price: '54.98',
				// 	num: '1',
				// 	img: '/static/img/logo.png'
				// }, {
				// 	title: '商品名称商品名称商品名称',
				// 	price: '68.98',
				// 	num: '2',
				// 	img: '/static/img/logo.png'
				// }]
				searchVal: ''
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
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
					url: "/storegoods",
					method: "POST",
					data: {
						store_id: uni.getStorageSync(keys.storeinfo).storeid,
						uname: name
					},
					success: (res) => {
						if (res.code == 200) {
							var arr = []
							for (var i = 0; i < res.data.length; i++) {
								arr.push({
									title: res.data[i].uname,
									imgUrl: res.data[i].user.avatar,
									telphone: res.data[i].uphone,
									carNumber: '',
									havegoods: true,
									goodslist: res.data[i].goods
								})
							}
							this.datalist = arr
						} else {
							var arr = []
							for (var i = 0; i < res.data.length; i++) {
								arr.push({
									title: res.data[i].uname,
									imgUrl: res.data[i].user.avatar,
									telphone: res.data[i].uphone,
									carNumber: '',
									havegoods: true,
									goodslist: res.data[i].goods
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
