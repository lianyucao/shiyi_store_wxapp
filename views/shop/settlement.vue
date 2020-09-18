<template>
	<view class="content">
		<!-- <scroll-view scroll-x class="bg-white nav">
			<view class="flex justify-around text-center">
				<view class="cu-item text-17" style="color: #333333;" :class="index==TabCur?'sel cur':''" v-for="(item,index) in NavList"
				 :key="index" @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</view>
		</scroll-view> -->
		<view class="cu-form-group">
			<view class="title text-16" style="color: #0F1826;">{{TabCur == 0 ? '选择地址' : '选择商家'}}</view>
			<input class="text-16" style="color: #666666;" placeholder="请输入地址" name="input" v-if="TabCur == 0" v-model="address"></input>
			<input disabled class="text-16" style="color: #666666;" :placeholder="storeAddress?storeAddress.storeName:'请选择商家'"
			 name="input" v-if="TabCur == 1" @tap="this.$system.getToPage('/active/discountmall/selstore')"></input>
			<text class='cuIcon-right text-gray' v-if="TabCur == 1"></text>
		</view>
		<view class="min-h85 bg-white margin-t-10">
			<view class="cu-form-group text-16">
				<view class="title" style="color: #A1A1A1;">姓名：</view>
				<input placeholder="请输入姓名" name="input" type="text" v-model="name" style="color: #313131;"></input>
			</view>
			<view class="cu-form-group text-16">
				<view class="title" style="color: #A1A1A1;">电话：</view>
				<input type="number" placeholder="请输入联系方式" name="input" v-model="telephone" style="color: #313131;"></input>
			</view>
			<view class="" style="padding: 0 15px 25px 15px;">
				<view class="min-h95 margin-b-5 flex justify-between" style="background:rgba(81,112,255,0.05);border-radius: 5px;padding: 12px 15px;"
				 v-for="(item,index) in SCarlist" :key="index">
					<view class="flex align-center">
						<image class="wh-72 margin-r-10" style="border-radius: 5px;" :src="item.goods_img" mode=""></image>
						<view class="">
							<view class="flex <align-center></align-center>">
								<text class="text-16 margin-r-5" style="color: #313131;">{{item.name}}</text>
							</view>
							<view class="text-16 margin-t-30" style="color: #FF3F00;">¥{{item.store_price}}</view>
						</view>
					</view>
					<view class="text-11 flex align-end" style="color: #A1A1A1;">
						x{{item.num}}
					</view>
				</view>
			</view>
			<view class="cu-form-group min-h116">
				<textarea maxlength="-1" @input="textareaInput" placeholder="请输入备注.."></textarea>
			</view>
			<button class="cu-btn lg w-100s text-white pos-fix" style="height: 55px;background: #5170FF;font-size: 16px;border-radius: 0;bottom: 0;"
			 @tap="submit">确认</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import {
		keys
	} from '../../config/StorageKey.js'
	export default {
		computed: {
			...mapState(['SCarlist'])
		},
		data() {
			return {
				TabCur: 0,
				// NavList: ['邮寄到家', '存放到店'],
				name: '',
				telephone: '',
				textareaValue: '',
				storeAddress: '',
				address: ''
			}
		},
		onLoad() {

		},
		onShow() {
			this.storeAddress = uni.getStorageSync(keys.selstore)
		},
		onUnload() {
			uni.removeStorageSync(keys.selstore)
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id
			},
			textareaInput(e) {
				this.textareaValue = e.detail.value
			},
			submit() {

				if (this.address == '' || this.name == '' || this.telephone == '') {
					uni.showToast({
						icon: "none",
						title: "请填写完整信息"
					})
					return
				}

				if (!(/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(this.name))) {
					uni.showToast({
						title: "请输入正确的姓名",
						icon: "none"
					})
					return
				}
				if (!(/^1[34578]\d{9}$/.test(this.telephone))) {
					uni.showToast({
						title: "请输入合法的手机号",
						icon: "none"
					})
					return
				}
				var price = 0
				for (var i = 0; i < this.SCarlist.length; i++) {
					price += Number(this.SCarlist[i].store_price) * this.SCarlist[i].num
				}
				this.$api.send({
					url: "/storegoodspay",
					method: "POST",
					data: {
						address: this.address,
						name: this.name,
						mobile: this.telephone,
						goodsid: this.SCarlist,
						price,
						remark: this.textareaValue,
						store_id: uni.getStorageSync(keys.storeinfo).storeid
					},
					success: (res) => {
						if (res.code == 200) {
							uni.showToast({
								icon:"success",
								title:'购买成功'
							})
							setTimeout(() =>{
								uni.navigateBack({
									delta:1
								})
							},1500)
						}else{
							uni.showToast({
								icon:"none",
								title:res.msg
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
	.sel {
		color: #5170FF !important;
	}
</style>
