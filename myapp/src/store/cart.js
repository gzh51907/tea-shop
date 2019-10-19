import axios from 'axios';
import qs from 'qs';

export default {
	state: {
		qtylength:"",
		isall:false,
	       cartlist: [
			   
	           // {
	           //     id: "1",
	           //     name: "大益普洱2019年7572，1901批次熟茶357g",
	           //     imgurl:
	           //         "https://chadian-img.oss-cn-shanghai.aliyuncs.com/product/i15684733130003321.jpeg?x-oss-process=image/resize,m_fill,h_100,w_100",
	           //     price: 158,
	           //     qty: 2
	           // },
	       ]
	   },
	   getters: {
		   getcid (state) {
		      let cid=[];
		   				for(let i=0;i<state.cartlist.length;i++){
		   					if(state.cartlist[i].check==true){
		   						cid.push(state.cartlist[i]._id)
		   					}
		   				}
		   				return cid
		   },
	       totalPrice(state) {
			   let money=0;
			   		for(let i=0;i<state.cartlist.length;i++){
			   			if(state.cartlist[i].check==true){
			   				money+=(state.cartlist[i].price-0)*(state.cartlist[i].qty-0)
			   			}
			   		}
	           return money
			   // state.cartlist.reduce((prev, item) => prev + item.price * item.qty, 0)
	       },
	       saleGoods(state) {
	           return state.cartlist.map(item => {
	               item.price *= 0.5;
	               return item;
	           })
	       }
	   },
		
	   mutations: {
		   
		   ischeck(state){
		   		  if(state.isall==true){
					  for(let i=0;i<state.cartlist.length;i++){
					  	  state.cartlist[i].check=true;
					  }
				  }else{
					  for(let i=0;i<state.cartlist.length;i++){
					  	  state.cartlist[i].check=false;
					  }
				  }
		   },
		   chackall(state){
		   			   console.log(123)
		   			   let num=0;
		   			   for(let i=0;i<state.cartlist.length;i++){
		   				   if(state.cartlist[i].check==true){
		   					   num++;
		   				   }
		   			   };
		   			   if(num==state.cartlist.length){
		   				   state.isall=true;
		   			   }else{
		   				    state.isall=false;
		   			   }
		   },
		   setcartlist(state,data){
			     state.cartlist=data;
		   },
	       add2cart(state, goods) {
	           state.cartlist.unshift(goods);
	       },
	       removeFromCart(state) {
	           state.cartlist = state.cartlist.filter(item => item.check != true);
	       },
	       clearCart(state) {
	           state.cartlist = [];
	       },
	       changeQty(state, { _id, qty }) {
	           state.cartlist.forEach(item => {
	               if (item._id === _id) {
	                   item.qty = qty;
	               }
	           })
	       }
	   },
	   actions: {
		   //查询购物车
		   async getcart(context) {
		   	let username = localStorage.getItem("user");
		   	if(username){
		   		let { data } = await axios.post("http://116.62.5.240:2020/cart/findcart",qs.stringify({username}));
		       context.commit('setcartlist',data)
		   	}else{
		   		this.$router.push(`/login`);
		   	}
		   	
		      },
			// 库存量限制  
	       async changeQtyAsync(context, {_id, gid, qty }) {
			   	let username = localStorage.getItem("user");
	           // 获取库存数量kucun，然后与传入的qty进行对比
	           let { data } = await axios.get(`http://116.62.5.240:2020/cart/findkucun?gid=${gid}&qty=${qty}&username=${username}`)
	           let kucun = data;
	           if (qty <= kucun & qty>=1) {
	               context.commit('changeQty', {_id, qty })
	           } else if(qty<1){
				    context.commit('changeQty', { _id,qty:1 })
			   }
			   else {
	               // 库存不足
	               context.commit('changeQty', { _id,qty:kucun })
	           }
	       },
		   //删除购物车
		   async removecart(context) {
			 let _id=  context.getters.getcid;
			 // let _id="sdadas"
			 console.log(qs.stringify({_id}))
		   	if(_id.length !=0){
		   		let { data } = await axios.post("http://116.62.5.240:2020/cart/removecart",
				qs.stringify({_id}));
				if(data=='ok'){
					context.commit('removeFromCart')
				}
		       
		   	}else{
		   	}
		   	
		      },
	   },
}