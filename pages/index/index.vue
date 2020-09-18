<template>
	<view class="content bg-white" style="height: 100vh;overflow: hidden;">
		<view class="h-50s margin-t-80">
			<view class="h-56" style="padding: 0 15px;">
				<input class="solid-bottom h-100s" type="number" value="" placeholder="请输入手机号" maxlength="11" v-model="telphone"
				 @input="changeInp" />
			</view>
			<view class="h-56" style="padding: 0 15px;">
				<input class="solid-bottom h-100s" type="password" value="" placeholder="请输入密码" v-model="password" @input="changeInp" />
			</view>
			<view class="margin-t-48" style="padding: 0 15px;">
				<button @tap="login" :disabled="loginBtn" class="h-44 text-16 cu-btn block" type="default" style="background: #5170FF;border-radius: 8px;color: #FFFFFF;">登陆</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {keys} from '../../config/StorageKey.js'
	export default {
		data() {
			return {
				telphone: '',
				password: '',
				loginBtn: true
			}
		},
		onLoad() {

		},
		methods: {
			changeInp(e) {
				this.changeLoginBtn()
			},
			changeLoginBtn() {
				if (this.telphone.length >= 11 && this.password.length > 0) {
					this.loginBtn = false
				} else {
					this.loginBtn = true
				}
			},
			login() {
				if (!(/^1[34578]\d{9}$/.test(this.telphone))) {
					uni.showToast({
						title: "请输入合法的手机号",
						icon: "none"
					})
					return
				}
				this.$api.send({
					url: "/buslogin",
					method: "POST",
					data: {
						user: this.telphone,
						pass: this.password
					},
					success: (res) => {
						if(res.code == 200){
							uni.redirectTo({
								url:'/views/home',
								success: () => {
									uni.setStorageSync(keys.storeinfo,res.data)
								}
							})
						}else{
							uni.showToast({
								icon:"none",
								title:res.data
							})
						}
					}
				})
			}
		}
	}
</script>

<style>

</style>
