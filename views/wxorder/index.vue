<template>
	<view class="content">
		<view class="h-80 flex align-center padding-l-15" style="background: #13C2C2;">
			<image class="wh-23 margin-r-10" src="http://shiyi.cg500.com/uploads/wxapp/wait.png" mode=""></image>
			<text class="text-16 text-white text-bold">{{orderinfo.status > 2 ?orderinfo.status>4? orderinfo.status>5?'订单已结束':'订单审核中':"用户已付款,请上传维修凭证" :'用户已到店,请报价'}}</text>
		</view>
		<view class="">
			<serve-card :datalist="datelist"></serve-card>
			<!-- <view class="h-55 bg-white text-16 flex align-center padding-15 solid-bottom">
				<text class="margin-r-20" style="color: #0F1826;">存放商品</text>
				<text style="color: #0F1826;" v-for="(item,index) in 3" :key="index">商品{{index}};</text>
			</view> -->
			<view class="h-55 bg-white text-16 flex align-center padding-15 solid-bottom">
				<text class="margin-r-17" style="color: #0F1826;">{{orderinfo.status == 1?'门店报价':'实付款'}}</text>
				<input class="w-70s" type="text" value="" placeholder="请输入实付款金额" v-model="payment" :disabled="orderinfo.totalprice?true:false" />
			</view>
		</view>
		<view class="bg-white margin-t-10">
			<view class="solid-bottom h-55 padding-15 flex align-center text-16" style="color: #0F1826;">订单信息</view>
			<view class="solid-bottom padding-l-15 text-16" style="color: #0F1826;">
				<view class="h-55 flex align-center">
					<text class="margin-r-20">订单编号</text>
					<text>{{orderinfo.ordersn}}</text>
				</view>
				<view class="h-55 flex align-center">
					<text class="margin-r-20">服务时间</text>
					<text>{{orderinfo.servicetime}}</text>
				</view>
			</view>
			<view class="solid-bottom h-55 padding-15 text-16 flex align-center" style="color: #0F1826;">
				<text class="margin-r-20">订单备注</text>
				<text>{{orderinfo.remark}}</text>
			</view>
		</view>
		<view class="margin-t-9 padding-b-55">
			<view class="min-h190 bg-white solid-bottom" style="padding: 17px 15px 0 15px;">
				<view class="text-16" style="color: #0F1826;">维修前</view>
				<view class="margin-t-15">
					<view class="flex align-center justify-between" v-if="orderinfo.storeimgs.length > 0">
						<image class="wh-120" style="border-radius: 5px;" :src="item" mode="" v-for="(item,index) in orderinfo.storeimgs"
						 :key="index"></image>
					</view>
					<view class="cu-form-group" style="padding: 0;" v-else>
						<view class="grid col-3 grid-square flex-sub">
							<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
								<image :src="imgList[index]" mode="aspectFill"></image>
								<view class="pos-abs text-white" style="display: inline-block;right: 0;top:0" @tap.stop="DelImg" :data-index="index">
									<text class='cuIcon-roundclose bg-red' style="border-radius: 50%;"></text>
								</view>
							</view>
							<view class="solids" @tap="showModal($event,'normal')" data-target="Modal" v-if="imgList.length < 3">
								<text class='cuIcon-add'></text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="min-h190 bg-white solid-bottom" style="padding: 17px 15px 0 15px;" v-if="orderinfo.status != 1">
				<view class="text-16" style="color: #0F1826;">维修后</view>
				<view class="margin-t-15">
					<view class="flex align-center justify-between" v-if="orderinfo.endimgs.length > 0">
						<image class="wh-120" style="border-radius: 5px;" :src="item" mode="" v-for="(item,index) in orderinfo.endimgs"
						 :key="index"></image>
					</view>
					<view class="cu-form-group" style="padding: 0;" v-else>
						<view class="grid col-3 grid-square flex-sub">
							<view class="bg-img" v-for="(item,index) in afterList" :key="index" @tap="ViewImage($event,'card')" :data-url="afterList[index]">
								<image :src="afterList[index]" mode="aspectFill"></image>
								<view class="pos-abs text-white" style="display: inline-block;right: 0;top:0" @tap.stop="DelImg($event,'card')"
								 :data-index="index">
									<text class='cuIcon-roundclose bg-red' style="border-radius: 50%;"></text>
								</view>
							</view>
							<view class="solids" @tap="showModal($event,'card')" data-target="Modal" v-if="afterList.length < 3">
								<text class='cuIcon-add'></text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<button class="cu-btn lg w-100s text-white pos-fix bottom-0" style="height: 55px;background: #5170FF;font-size: 16px;border-radius: 0;"
		 @tap="submit">{{orderinfo.status > 4 ?'确认':'确认提交'}}</button>

		<view class="cu-modal bottom-modal" :class="modalName=='Modal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="" style="border-radius:8px 8px 0px 0px;">
				<view class="bg-white h-57 lh-57 solid-bottom" @tap="ChooseImage(type,'camera')">
					<text class="text-18" style="color: #333333;">拍照</text>
				</view>
				<view class="bg-white h-57 lh-57 solid-bottom" @tap="ChooseImage(type,'album')">
					<text class="text-18" style="color: #333333;">相册</text>
				</view>
				<view class="bg-white h-57 lh-57 solid-bottom margin-t-8" @tap="hideModal">
					<text class="text-18" style="color: #333333;">取消</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import ServeCard from '../../components/serveCard/index.vue'
	export default {
		data() {
			return {
				datelist: {
					// title: '郑秋',
					// imgUrl: '/static/img/logo.png',
					// telphone: '14193689116',
					// haveserver: true,
					// havebtn: true,
					// showbtn: false,
					// serverlist: ['洗车', '贴膜'],
					// havebtncarNumber: '辽A123456',
				},
				imgList: [],
				upimgList: [],
				afterList: [],
				upafterList: [],
				payment: '',
				modalName: null,
				type: '',
				orderinfo: ''
			}
		},
		onLoad(option) {
			this.getList(option.id)
		},
		methods: {
			ViewImage(e, type) {
				if (type == 'card') {
					uni.previewImage({
						urls: this.afterList,
						current: e.currentTarget.dataset.url
					})
				} else {
					uni.previewImage({
						urls: this.imgList,
						current: e.currentTarget.dataset.url
					})
				}
			},
			DelImg(e, type) {
				if (type == 'card') {
					this.afterList.splice(e.currentTarget.dataset.index, 1)
				} else {
					this.imgList.splice(e.currentTarget.dataset.index, 1)
				}
			},
			ChooseImage(type, sourcetype) {
				if (type == 'card') {
					uni.chooseImage({
						count: 1, //默认9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: [sourcetype],
						success: (res) => {
							if (this.afterList.length != 0) {
								this.afterList = this.afterList.concat(res.tempFilePaths)
							} else {
								this.afterList = res.tempFilePaths
							}
							this.modalName = null
						}
					});
				} else {
					uni.chooseImage({
						count: 1, //默认9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: [sourcetype],
						success: (res) => {
							if (this.imgList.length != 0) {
								this.imgList = this.imgList.concat(res.tempFilePaths)
							} else {
								this.imgList = res.tempFilePaths
							}
							this.modalName = null
						}
					});
				}
			},
			showModal(e, type) {
				this.modalName = e.currentTarget.dataset.target
				this.type = type
			},
			hideModal(e) {
				this.modalName = null
			},
			getList(id) {
				this.$api.send({
					url: "/malldetail",
					method: "POST",
					data: {
						id
					},
					success: (res) => {
						if (res.code == 200) {
							this.datelist = {
								title: res.data.uname,
								imgUrl: res.data.car_img,
								telphone: res.data.uphone,
								haveserver: true,
								havebtn: true,
								showbtn: false,
								serverlist: [res.data.servicename],
								havebtncarNumber: res.data.car_code,
							}
							this.orderinfo = res.data
							if (res.data.totalprice) {
								this.payment = res.data.totalprice
							}
						}
					}
				})
			},
			submit() {
				if (this.payment == '') {
					uni.showToast({
						icon: "none",
						title: "请输入服务报价"
					})
					return
				}

				if (this.orderinfo.status == 1) {
					if (this.imgList.length < 3) {
						uni.showToast({
							icon: "none",
							title: "请至少上传三张维修前照片"
						})
						return
					} else {
						for (var i = 0; i < this.imgList.length; i++) {
							uni.uploadFile({
								url: 'https://shiyi.cg500.com/admin/interfaces/upload',
								filePath: this.imgList[i],
								name: 'file',
								header: {
									"Content-Type": "multipart/form-data"
								},
								success: (res) => {
									if (res.statusCode == 200) {
										if (res.data != '400') {
											this.upimgList.push(res.data)
										}
									}
								}
							})
						}

						setTimeout(() => {
							if (this.imgList.length != this.upimgList.length) {
								uni.showToast({
									icon: "none",
									title: "图片格式不符,请检查后重新上传"
								})
								this.imgList = []
								this.upimgList = []
								return
							} else {
								this.$api.send({
									url: "/mallsave",
									method: "POST",
									data: {
										id: this.orderinfo.id,
										price: this.payment,
										storeimgs: this.upimgList
									},
									success: (res) => {
										if (res.code == 200) {
											uni.showToast({
												icon: "success",
												title: "提交成功",
												success: () => {
													setTimeout(() => {
														uni.navigateBack({
															delta: 1
														})
													}, 1000)
												}
											})
										}
									}
								})
							}
						}, 1000)
					}
				} else if (this.orderinfo.status == 4) {
					if (this.afterList.length < 3) {
						uni.showToast({
							icon: "none",
							title: "请至少上传三张维修后照片"
						})
						return
					} else {
						for (var i = 0; i < this.afterList.length; i++) {
							uni.uploadFile({
								url: 'https://shiyi.cg500.com/admin/interfaces/upload',
								filePath: this.afterList[i],
								name: 'file',
								header: {
									"Content-Type": "multipart/form-data"
								},
								success: (res) => {
									if (res.statusCode == 200) {
										if (res.data != '400') {
											this.upafterList.push(res.data)
										}
									}
								}
							})
						}

						setTimeout(() => {
							if (this.afterList.length != this.upafterList.length) {
								uni.showToast({
									icon: "none",
									title: "图片格式不符,请检查后重新上传"
								})
								this.afterList = []
								this.upafterList = []
								return
							} else {
								this.$api.send({
									url: "/mallsave",
									method: "POST",
									data: {
										id: this.orderinfo.id,
										endimgs: this.upafterList
									},
									success: (res) => {
										if (res.code == 200) {
											uni.showToast({
												icon: "success",
												title: "提交成功",
												success: () => {
													setTimeout(() => {
														uni.navigateBack({
															delta: 1
														})
													}, 1000)
												}
											})
										}
									}
								})
							}
						}, 1000)
					}
				} else {
					uni.navigateBack({
						delta: 1
					})
				}


			}
		},
		components: {
			ServeCard
		}
	}
</script>

<style>

</style>
