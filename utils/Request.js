import {urls} from '../config/UrlKey.js'
import {keys} from '../config/StorageKey.js'

export default{
	send(param,backpage, backtype){
		console.log("request",param)
		var _self = this, 
		url = param.url,
		method = param.method,
		header = {
			//Authorization:uni.getStorageSync(keys.token),
		},
		data = param.data || {}, 
		hideLoading = param.hideLoading || false,
	    hideErrorMsg = param.hideErrorMsg || false   
	    //拼接完整请求地址
	    var requestUrl =urls.base + url;
	    var timestamp = Date.parse(new Date());//时间戳
	    data["timestamp"] = timestamp;
	    // #ifdef MP-WEIXIN
	    data["device"] = "wxapp";
	    data["ver"] = "1.1.30";
	    // #endif
	    // #ifdef APP-PLUS || H5
	    data["device"] = "iosapp";
	    data["ver"] = "1.0.0";
	    // #endif
	    
	    //请求方式:GET或POST(POST需配置header: {'content-type' : "application/x-www-form-urlencoded"},)
	    if(method){
	        method = method.toUpperCase();//小写改为大写
	        if(method=="POST"){
	            header = {'content-type' : "application/json;charset=UTF-8"};
	        }else{
	            header = {'content-type' : "application/json"};
	        }
	    }else{
	        method = "GET";
	        header = {'content-type' : "application/json"};
	    }
	    //用户交互:加载圈
		if (!hideLoading) {
	        uni.showLoading({title:'加载中...'});
	    } 
	    
	    // console.log("网络请求start");
	    //网络请求
		let token = uni.getStorageSync(keys.token)
		if (token) {
			header.Authorization = token
		}
	    uni.request({
	        url: requestUrl,
	        method: method,
	        header: header,
	        data: data,
	        success: res => {
				if (!hideLoading) {
				    uni.hideLoading();
				}
	            if (res.statusCode && res.statusCode != 200) {//api错误
	                /* uni.showModal({
						title:'加载失败',
						icon:'none',
						duration: 3000
	                    // content:"" + res.data.status + '---' + res.data.path
	                }); */
					// uni.showToast({
					//     title: '加载失败',
					// 		icon:'none',
					//     duration: 3000
					// });
					console.log('失败原因:'+JSON.stringify(res.data))
	                return;
	            }
				if (res.data.code != 200 ) {
				     /* uni.showModal({
						 title:'返回数据错误',
						 icon:'none',
						 duration: 3000
				         // content:"" + res.data.msg
				     }); */
					 if(!hideErrorMsg){
						 // uni.showToast({
						 //     title: res.data.msg,
						 //     icon:'none',
						 //     duration: 3000
						 // })
					 }
					 console.log("result:"+JSON.stringify(res.data))
				     // return;
				    }
	            if(res != null){
					typeof param.success == "function" && param.success(res.data);
				}
	        },
	        fail: (e) => {
				if (!hideLoading) {
				    uni.hideLoading();
				}
	            console.log("网络请求fail:" + JSON.stringify(e));
	            // uni.showModal({
	            //     content:"" + e.errMsg
	            // })
	            typeof param.fail == "function" && param.fail(e.data);
	        },
	        complete: () => {
	            // console.log("网络请求complete");
	            /* if (!hideLoading) {
	                uni.hideLoading();
	            } */
	            typeof param.complete == "function" && param.complete();
	            return;
	        }
	    });
	}
	
}