<template>
	<view class="content bg-white" style="height: 100vh;">
		<view class="min-h255 pos-rel" style="background: url(https://shiyi.cg500.com/uploads/wxapp/9f58eb4edc03da63d3e32de5d5abdc3.png) no-repeat;background-size: 100% 50%;padding: 0 15px;">
			<view class="min-h205 bg-white pos-abs w-93s" style="padding: 15px 15px 20px 15px;box-shadow:0px 2px 6px 0px rgba(0,0,0,0.08);border-radius: 5px;bottom: 0;">
				<view class="flex align-center justify-between">
					<text class="text-16 text-bold" style="color: #313131;">{{storeinfo.storename}}</text>
					<!-- <image class="wh-14" src="../static/img/bianji.png" mode=""></image> -->
					<image src="http://shiyi.cg500.com/uploads/wxapp/erw.png" mode="" class="wh-20" @tap="showModal('Modal')"></image>
				</view>
				<view class="flex margin-t-27">
					<view class="solid-right padding-r-37">
						<view class="text-14">今日收益</view>
						<view class="text-30 text-bold margin-t-4">{{todaym}}</view>
					</view>
					<view class="margin-l-30">
						<view class="text-14">待结余额</view>
						<view class="text-30 text-bold margin-t-4">{{buscredit}}</view>
					</view>
				</view>
				<button class="cu-btn w-100s h-44 text-16 text-white margin-t-16" style="border-radius: 8px;background: #5170FF;" @tap="withdraw">提现</button>
			</view>
		</view>
		<view class="flex flex-wrap justify-between pick" style="padding: 0 19px;">
			<view class="h-77 text-center w-30s" v-for="(item,index) in navList" :key="index" @tap="gotopage(item.path)">
				<image class="wh-21 margin-t-22" :src="item.imaUrl" mode=""></image>
				<view class="text-14 margin-t-15" style="color: #666666;">{{item.title}}</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="modalName=='Modal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<view class="cu-bar padding-b-15 padding-t-15" style="background: rgba(243, 237, 231, 1.0);">
					<view class="w-100s">
						<view class="text-center">
							<image :src="imgUrl" mode="" class="wh-260"></image>
						</view>
						<view class="text-14 text-gray margin-t-15">门店二维码</view>
						<view class="text-center margin-t-15">
							<button class="cu-btn lg w-50s text-white" style="height: 45px;background: #FFA546;font-size: 16px;border-radius: 0;border-radius: 30px;"
							 @tap="submit">保存相册</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		keys
	} from '../config/StorageKey.js'
	export default {
		data() {
			return {
				navList: [{
					imaUrl: '/static/img/huiyuan.png',
					title: '会员预约列表',
					path: './hyyuyue/index'
				}, {
					imaUrl: '/static/img/wxjilu.png',
					title: '历史维修记录',
					path: './wxrecord/index'
				}, {
					imaUrl: '/static/img/cunfang.png',
					title: '会员存放列表',
					path: './hydeposit/index'
				}, {
					imaUrl: '/static/img/wxjulubt.png',
					title: '平台补贴列表',
					path: './subsidies/index'
				}, {
					imaUrl: '/static/img/store.png',
					title: '实驿平台商城',
					path: './shop/discountmall'
				}],
				storeinfo: '',
				todaym:'',
				buscredit:'',
				imgUrl:'',
				modalName:''
			}
		},
		onLoad() {
			this.getTodaymoney()
			this.getBuscredit()
			this.getMa()
		},
		onShow() {
			uni.hideHomeButton()
			this.storeinfo = uni.getStorageSync(keys.storeinfo)
		},
		methods: {
			gotopage(path) {
				uni.navigateTo({
					url: path
				})
			},
			getTodaymoney() {
				this.$api.send({
					url: "/todaymoney",
					method: "POST",
					data: {
						storeid:uni.getStorageSync(keys.storeinfo).storeid
					},
					success: (res) => {
						if(res.code == 200){
							this.todaym = res.data
						}
					}
				})
			},
			getBuscredit() {
				this.$api.send({
					url: "/buscredit",
					method: "POST",
					data: {
						storeid:uni.getStorageSync(keys.storeinfo).storeid
					},
					success: (res) => {
						if(res.code == 200){
							this.buscredit = res.data
						}
					}
				})
			},
			withdraw(){
				uni.showToast({
					icon:"none",
					title:"暂未开启"
				})
			},
			submit() {
				uni.downloadFile({
					url: this.imgUrl,
					success: (res) => {
						if (res.statusCode == 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: (res) => {
									uni.showToast({
										title: "保存成功",
										icon: "none"
									});
								},
								fail: (res) => {
									uni.showToast({
										title: "保存失败，请稍后重试",
										icon: "none"
									});
								}
							});
						}
					}
				})
			},
			getMa() {
				this.$api.send({
					url: "/xcxCode",
					method: "POST",
					data: {
						store_id:uni.getStorageSync(keys.storeinfo).storeid
					},
					success: (res) => {
						if (res.code == 200) {
							this.imgUrl = res.img
						}
					}
				})
			},
			showModal(name) {
				this.modalName = name
			},
			hideModal(e) {
				this.modalName = null
			}
		}
	}
</script>

<style scoped>
	.pick:after {
		content: '';
		width: 30%;
	}
</style>
