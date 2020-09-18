const mutations = {
	JOIN_SHOPCAR(state, payload) {
		if(payload.type == 'arr'){
			state.SCarlist = payload.item
		}else{
			state.SCarlist.push(payload)
		}
	},
	SET_SCARLISTNUM(state, payload) {
		for (var i = 0; i < state.SCarlist.length; i++) {
			if (state.SCarlist[i].id == payload.id) {
				state.SCarlist[i] = payload
			}
		}
		console.log(JSON.stringify(state.SCarlist), '******')
	},
}

export default mutations
