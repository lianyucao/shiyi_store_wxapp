<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "colorui/fontSize.css";
	/* 解决头条小程序组件内引入字体不生效的问题 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		src: url('/static/uni.ttf');
	}
	/* #endif */
	/* .border{
		border: solid 1px red;
	}
	.text{
		font-family:PingFangSC-Semibold,PingFang SC;
	}
	.body_{
		position: absolute;
		width: 100%;
		padding-bottom: 12px;
	} */
	/*每个页面公共css */
</style>
