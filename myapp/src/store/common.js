import axios from 'axios';

export default {
    state:{
        user:'空'
    },
    mutations:{
        login(state,{username,Authorization}){
            state.user = {
                username,
                Authorization
            }
			this.state.user=username;
            // 存入本地存储
            localStorage.setItem("user", username);
			 localStorage.setItem("Authorization", Authorization);
        },
        logout(state){
            state.user = null;

            // 清空本地存储
            localStorage.removeItem("user");
			localStorage.removeItem("Authorization");
        }
    },
    actions:{
        async checkLogin(context,payload){
            let user = localStorage.getItem("user");
			
			let Authorization = localStorage.getItem("Authorization");
            if(!user){
                context.commit('logout');
            }else{
                // user = JSON.parse(user);
                // 发起ajax请求，校验token是否过期
                let {data} = await axios.get('http://localhost:2020/verify',{
                    headers:{
                        // Authorization:user.Authorization
						Authorization:Authorization
						
                    }
                })
				console.log(data)
                // 放置刷新vuex数据丢失的问题
                if(data.code===1){
                    // context.commit('login',user);
					localStorage.setItem("user", user);
					 localStorage.setItem("Authorization", Authorization);
                }else{
                    context.commit('logout');
                    return 400
                }
            }
            return 200;
        }
    }
}