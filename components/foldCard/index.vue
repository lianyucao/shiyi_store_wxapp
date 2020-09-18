<template>
	<view class="bg-white" :style="{height:height + 'px'}" style="transition: 0.3s;overflow: hidden;">
		<view class="min-h55 solid-bottom flex align-center justify-between" style="padding: 0 15px;">
			<view class="text-16" style="color: #0F1826;">{{datalist.create_at}}</view>
			<view class="">
				<text class="text-16 margin-r-5" style="color: #FF3F00;">¥{{Number(datalist.price).toFixed(2)}}</text>
				<text @tap="dropDown" class="text-gray" :class="flag?'cuIcon-triangleupfill':'cuIcon-triangledownfill'"></text>
			</view>
		</view>
		<view class="flex justify-between padding-17" v-if="flag">
			<view class="">
				<view class="flex align-center">
					<image class="wh-16 margin-r-5" src="../../static/img/huiyuan.png" mode=""></image>
					<text class="text-16" style="color: #0F1826;">{{datalist.uname}}</text>
				</view>
				<view class="flex align-center margin-t-12">
					<image class="wh-16 margin-r-5" src="../../static/img/huiyuan.png" mode=""></image>
					<text class="text-16" style="color: #0F1826;">{{datalist.uphone}}</text>
				</view>
			</view>
			<view class="">
				<text class="text-14" style="color: #A1A1A1;">{{datalist.ordersn}}</text>
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
						// time:'2020.03.04',
						// price:'54.98',
						// name:'韩杰',
						// telephone:'19246758378',
						// bankcard:'8973897389731347'
					}
				}
			}
		},
		data() {
			return {
				height: 55,
				flag: false
			}
		},
		onLoad() {
			
		},
		methods: {
			dropDown() {
				this.flag = !this.flag
				if (this.flag) {
					this.height = 150
				} else {
					this.height = 55
				}
			}
		}
	}
</script>

<style>
	
</style>
