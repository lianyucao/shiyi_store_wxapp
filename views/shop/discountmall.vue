<template>
	<view class="content">
		<view class="bg-white" style="padding: 4px 15px 22px;">
			<!-- <view class="flex align-center padding-b-5">
				<image class="wh-38 margin-r-10" :src="item.shop_avatar" mode=""></image>
				<view class="">
					<view class="text-16 text-bold" style="color: #313131;">{{item.shop_Category}}</view>
					<view class="text-12" style="color: #A1A1A1;">{{item.shop_detail}}</view>
				</view>
			</view> -->
			<view v-for="(item,index) in list" :key="index" class="flex align-center justify-between margin-t-10" style="border:1px solid #5170FF;border-radius: 5px;">
				<view class="flex align-center" style="padding: 6px 0 6px 10px;" @tap="godetail(item)">
					<image class="wh-53 margin-r-10" :src="item.goods_img" mode=""></image>
					<text class="text-16" style="color: #313131;">{{item.name}}</text>
				</view>
				<view class="flex align-center">
					<view class="pos-rel margin-r-26">
						<view class="">
							<view class="text-16" style="color: #FF3F00;">{{'¥' + item.store_price}}</view>
						</view>
					</view>
					<view class="min-w82 h-65 flex align-center justify-end">
						<image v-if="item.num == 0" class="w-24 h-21 margin-r-16" src="https://shiyi.cg500.com/uploads/admin/attachment/20200831/d0f43f7b007ea2fa106d2eba528d4d8e.png"
						 mode="" @tap="Joinshopcar(index)"></image>
						<view class="flex align-center margin-r-5" v-if="item.num > 0">
							<image @tap="modify(-1,index)" class="wh-22" src="/static/img/sub.png" mode=""></image>
							<view class="w-33 text-14 text-center" style="color: #313131;">{{item.num}}</view>
							<image @tap="modify(1,index)" class="wh-22" src="/static/img/add.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="h-55 w-100s bg-white pos-fix solid-top flex align-center justify-between padding-l-17" style="bottom: 0;">
			<view class="flex">
				<view @tap="showModal" data-target="shopcarModal" class="cu-avatar lg margin-r-15" style="width: 24px;height: 22px;"
				 :style="{background:'url(' + 'https://shiyi.cg500.com/uploads/admin/attachment/20200831/d0f43f7b007ea2fa106d2eba528d4d8e.png' + ')' + 'no-repeat',backgroundSize:'100% 100%'}">
					<view class="cu-tag badge bg-red" style="width: 15px;height: 15px;font-size: 8px;" v-if="countNum > 0 || countNum == '99+'">{{countNum}}</view>
				</view>
				<view class="h-24 solid-left lh-24 padding-l-15">
					<text class="text-14 margin-r-10" style="color: #313131;">合计：</text>
					<text class="text-16" style="color: #FF3F00;">¥{{countMoney.toFixed(2)}}</text>
				</view>
			</view>
			<button @tap="goSettlement" class="w-146 h-100s text-16 text-bold lh-55 margin-0" style="background: #5170FF;color: #fff;border-radius: 0;"
			 type="default">确认</button>
			<!-- 购物车遮罩层 -->
			<view class="cu-modal bottom-modal" :class="modalName=='shopcarModal'?'show':''" @tap="hideModal">
				<view class="cu-dialog h-60s" style="border-radius: 15px 15px 0 0;" @tap.stop="">
					<view class="cu-bar bg-white justify-end solid-bottom">
						<text class="lg text-gray cuIcon-roundclose text-20 margin-r-10" @tap="hideModal"></text>
					</view>
					<view class="h-100s">
						<view class="bg-white h-100s" style="overflow: hidden;" v-if="carlist.length == 0">
							<view class="lg text-gray cuIcon-cart text-100 margin-t-100"></view>
							<view class="">您的购物车什么都没有哦！</view>
						</view>
						<view v-else v-for="(item,idx) in carlist" :key="idx" class="flex align-center justify-between margin-t-5 bg-white">
							<view class="flex align-center" style="padding: 6px 0 6px 10px;">
								<image class="wh-53 margin-r-10" :src="item.goods_img" mode=""></image>
								<text class="text-16" style="color: #313131;">{{item.name}}</text>
							</view>
							<view class="flex align-center">
								<view class="pos-rel margin-r-26">
									<view class="">
										<view class="text-16" style="color: #FF3F00;">{{'¥' + item.store_price}}</view>
									</view>
								</view>
								<view class="min-w82 h-65 flex align-center justify-center">
									x {{item.num}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		computed: {
			...mapState([
				'SCarlist'
			]),
			countNum() {
				var Num = 0
				if (this.carlist.length > 0) {
					this.carlist.forEach((item, index) => {
						Num += item.num
						return Num
					})
				}
				if (Num > 99) {
					return '99+'
				} else {
					return Num
				}
			},
			countMoney() {
				var Money = 0
				if (this.carlist.length > 0) {
					this.carlist.forEach((item, index) => {
						Money += item.num * item.store_price
						return Money
					})
				}
				return Money
			}
		},
		data() {
			return {
				modalName: '',
				list: [],
				carlist: []
				// {
				// 	shop_avatar: '/static/img/xicar.png',
				// 	shop_Category: '洗车',
				// 	shop_detail: '车身冲洗，内饰清洁除尘',
				// 	products: [{
				// 			id: '01',
				// 			avatar: '/static/img/mend.png',
				// 			title: '刘备',
				// 			newprice: '100',
				// 			oldprice: '200',
				// 			num: 0
				// 		},
				// 		{
				// 			id: '02',
				// 			avatar: '/static/img/mend.png',
				// 			title: '关羽',
				// 			newprice: '300',
				// 			oldprice: '',
				// 			num: 0
				// 		},
				// 		{
				// 			id: '03',
				// 			avatar: '/static/img/mend.png',
				// 			title: '张飞',
				// 			newprice: '321',
				// 			oldprice: '500',
				// 			num: 0
				// 		}
				// 	]
				// }
			}
		},
		onLoad() {
			this.getList()
		},
		onShow() {
			console.log(this.SCarlist)
			setTimeout(() => {
				this.carlist = this.SCarlist.filter(item => {
					return item.num > 0
				})
				for (var i = 0; i < this.SCarlist.length; i++) {
					for (var a = 0; a < this.list.length; a++) {
						if (this.SCarlist[i].id == this.list[a].id) {
							this.list[a].num = this.SCarlist[i].num
						}
					}
				}
			}, 500)
		},
		onHide() {
			this.JOIN_SHOPCAR({
				type: 'arr',
				item: this.carlist
			})
		},
		onUnload() {
			this.JOIN_SHOPCAR({
				type: 'arr',
				item: []
			})
		},
		methods: {
			...mapMutations([
				'JOIN_SHOPCAR'
			]),
			Joinshopcar(index) {
				this.list[index].num++
				this.carlist.push(this.list[index])
				for (var i = 0; i < this.carlist.length; i++) {
					if (this.carlist[i].id == this.list[index].id) {
						this.carlist[i].num = this.list[index].num
					}
				}
				const id = 'id'
				this.carlist = this.carlist.reduce((all, next) => all.some((atom) => atom[id] == next[id]) ? all : [...all, next],
					[]);
			},
			modify(num, index) {
				if (num == 1) {
					this.list[index].num++
				} else {
					this.list[index].num--
				}
				for (var i = 0; i < this.carlist.length; i++) {
					if (this.carlist[i].id == this.list[index].id) {
						this.carlist[i] = this.list[index]
					}
				}
				this.carlist = this.carlist.filter(item => {
					return item.num > 0
				})
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = ''
			},
			godetail(item) {
				item.info = ''
				uni.navigateTo({
					url: '/views/shop/goodsdetail?shop=' + JSON.stringify(item)
				})
			},
			getList() {
				this.$api.send({
					url: "/index",
					method: "GET",
					data: {},
					success: (res) => {
						if (res.code == 200) {
							this.list = res.data
						}
					}
				})
			},
			goSettlement() {
				if (this.carlist.length <= 0) {
					uni.showToast({
						title: '您还没有选购商品',
						icon: "none"
					})
				} else {
					uni.navigateTo({
						url: '/views/shop/settlement'
					})
				}
			}
		}
	}
</script>

<style>

</style>
