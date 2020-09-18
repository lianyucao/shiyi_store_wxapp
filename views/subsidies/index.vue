<template>
	<view class="content">
		<view class="" v-if="datalist.length > 0">
			<fold-card v-for="(item,index) in datalist" :key="index" :datalist="item"></fold-card>
		</view>
		<view class="bg-white" v-else style="height: 100vh">
			<view class="" style="position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);">
				<image class="wh-150" src="https://shiyi.cg500.com/uploads/nodata.png" mode=""></image>
				<view class="text-center text-16" style="color: #5170FF;">
					暂无数据
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import FoldCard from '../../components/foldCard/index.vue'
	import {
		keys
	} from '../../config/StorageKey.js'
	export default {
		data() {
			return {
				datalist:[]
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList() {
				this.$api.send({
					url: "/screditlog",
					method: "POST",
					data: {
						store_id: uni.getStorageSync(keys.storeinfo).storeid
					},
					success: (res) => {
						if(res.code == 200){
							this.datalist = res.data
						}else{
							this.datalist = res.data
						}
					}
				})
			}
		},
		components: {
			FoldCard
		}
	}
</script>

<style>

</style>
