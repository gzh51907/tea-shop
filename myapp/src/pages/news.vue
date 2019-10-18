<template>
  <div class="xiaoxi">
    <div class="xiaoxitop">
      <h2>消息</h2>
      <p>0条未读消息</p>
    </div>
    <div class="xiaoxicenter">
      <div class="small">
        <img src="https://m.chadian.com/assets/img/i-user-message2-icon.png
      " alt />
        <p>互动消息</p>
      </div>
      <div class="small">
        <img src="https://m.chadian.com/assets/img/i-user-message1-icon.png
      " alt />
        <p>系统消息</p>
      </div>
      <div class="small">
        <img src="https://m.chadian.com/assets/img/i-user-message3-icon.png
      " alt />
        <p>物流消息</p>
      </div>
    </div>
    <div class="xiaobottom"></div>
  </div>
</template>
<script>
import "../assets/rem";
export default {};
</script>
<style  lang="scss" scoped>
.xiaoxi {
  .xiaoxitop {
    position: fixed;
    top: 0;
    height: 4.48rem;
    width: 100%;
    background: -webkit-linear-gradient(left, #fe4101, #f02b2b);
    padding: 0 0.266667rem;
    color: #fff;
    h2 {
      font-size: 0.48rem;
      line-height: 0.48rem;
      margin-top: 0.8rem;
      margin-bottom: 0.266667rem;
    }
  }
  .xiaoxicenter {
    position: fixed;
    top: 3.04rem;
    background-color: #fff;
    height: 2.693333rem;
    width: 92%;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 99;
    border-radius: 0.266667rem;
    display: flex;
    justify-content: space-between;
    .small {
      flex: 1;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      img {
        width: 1.333333rem;
        height: 1.333333rem;
      }
      p {
        font-size: 0.373333rem;
        margin-top: 0.266667rem;
      }
    }
  }
  .xiaobottom {
    background-color: #f4f4f4;
    position: fixed;
    top: 4.48rem;
    bottom: 0.96rem;
    width: 100%;
  }
}
</style>