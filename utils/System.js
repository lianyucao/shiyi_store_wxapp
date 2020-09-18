import {keys} from '../config/StorageKey.js'

export default{
	wxlogin(){
		uni.login({
		  provider: 'weixin',
		  success: function (loginRes) {
			uni.setStorageSync(keys.wxcode, loginRes.code);
		  }
		});
	},
	getlocalhost(){
		uni.getLocation({
		    type: 'wgs84',
		    success: function (res) {
				var map ={}
				map.long=res.longitude;
				map.lat=res.latitude;
				uni.setStorageSync(keys.mylocalhost, map);
		    }
		});
	},
	randomNum(Max){
		let Min=1;
		var Range = Max - Min;   
		var Rand = Math.random();   
		return(Min + Math.round(Rand * Range)); 
	},
	getUserInfo(){
		uni.getUserInfo({
		      provider: 'weixin',
		      success: function (infoRes) {
				  let loginlist = uni.getStorageSync(keys.myuserlogininfo)
				  loginlist.nickname = infoRes.userInfo.nickName
				  loginlist.avatarUrl = infoRes.userInfo.avatarUrl
				  loginlist.gender = infoRes.userInfo.gender
				  uni.setStorageSync(keys.myuserlogininfo,loginlist)
		      }
		});
	},
	getOutStr(str,len){
		if(str==null||str==''||str==undefined){
			return ''
		}
		if(str.length>len){
			return str.substring(0,len)+"..."
		}else{
			return str
		}
	},
	getToPage(path){
		if(path==''||path==undefined){
			return;
		}
		console.log(path)
		uni.navigateTo({
		    url: path
		});
	},
	getsetTime(time) {
		var currentTime = Date.parse(new Date());
		var dateTime = time; //后台传递来的时间
		var d_day = Date.parse(new Date(dateTime));
		var day = Math.ceil(Math.abs((d_day - currentTime) / 1000 / 3600 / 24)); //计算日期
		var hour = Math.ceil(Math.abs((d_day - currentTime) / 1000 / 3600)); //计算小时
		var minutes = Math.ceil(Math.abs((d_day - currentTime) / 1000 / 60)); //计算分钟
		var seconds = Math.ceil(Math.abs((d_day - currentTime) / 1000)); //计算秒
		if (day >= 2 && day < 30) {
			return (parseInt(day) + "天前").toString();
		}else if(day > 30){
			return (parseInt(day / 30) + "月前").toString();
		} else if (hour > 0 && hour < 24) {
			return (parseInt(hour) + "小时前").toString();
		} else if (minutes > 0 && minutes < 60) {
			return (parseInt(minutes) + "分钟前").toString();
		} else if (seconds > 0 && seconds < 60) {
			return (parseInt(seconds) + "秒前").toString();
		} else if (day > 0 && day < 2) {
			return ("昨天").toString();
		}
	}
}