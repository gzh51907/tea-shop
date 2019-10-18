export default {
    state:{
        admname:localStorage.getItem("admname"),
    },
    mutations:{
        login(state,{admname}){
            state.admname = {
               admname
            }
			this.state.admname=admname;
            // 存入本地存储
            localStorage.setItem("admname", admname);
        },
        logout(state){
            state.admname = null;
            // 清空本地存储
            localStorage.removeItem("admname");
        }
    },
    actions:{
        checkLogin(context){
            let admname = localStorage.getItem("admname");
            if(!admname){
                context.commit('logout');
            }
        }
    }
}