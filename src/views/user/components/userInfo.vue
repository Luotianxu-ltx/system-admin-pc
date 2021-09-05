<template>
  <div class="userInfo">
    <img src="../../../assets/img/17e2f2f4c273bcf288d7193810557d80.jpeg" alt="">
    <div class="detail">
      <div class="name">{{ user.username }}</div>
      <div class="role">{{ user.roles }}</div>
    </div>
    <div class="info">
      <div class="list">
        <div class="text">
          <Icon icon="dianhua" class="icon"></Icon>电话
        </div>
        <div class="text-content">{{ user.mobile }}</div>
      </div>
      <div class="list">
        <div class="text">
          <Icon icon="youxiang" class="icon"></Icon>邮箱
        </div>
        <div class="text-content">{{ user.email }}</div>
      </div>
      <div class="list">
        <div class="text">
          <Icon icon="time" class="icon"></Icon>创建时间
        </div>
        <div class="text-content">2021年8月29日</div>
      </div>
      <div class="list">
        <div class="text">
          <Icon icon="time" class="icon"></Icon>修改时间
        </div>
        <div class="text-content">2021年8月29日</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'userInfo',
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  mounted () {
    this.user = JSON.parse(this.userInfo)
    if (this.user.roles.length === 1) {
      this.user.roles = this.user.roles[0]
    } else {
      this.user.roles = this.user.roles.join('/')
    }
    console.log(this.user)
  },
  data () {
    return {
      user: ''
    }
  }
}
</script>

<style lang="less" scoped>
.userInfo {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 30px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 6px 0 rgb(218 218 253 / 65%), 0 2px 6px 0 rgb(206 206 238 / 54%);

  img {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    border: 5px solid #0d6efd;
  }

  .detail {
    width: 100%;
    font-size: 24px;
    text-align: center;
    border-bottom: 1px solid #ccc;

    .name {
      font-size: 24px;
      font-weight: 500;
      color: #32393f;
      margin: 10px 0;
    }

    .role {
      font-size: 14px;
      color: #6c757d;
      margin-bottom: 20px;
    }
  }

  .info {
    width: 100%;
    margin-top: 20px;

    .list {
      display: flex;
      justify-content: space-between;
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      margin-bottom: 10px;
      border-bottom: 1px solid rgba(0, 0, 0, .125);

      .text {
        font-size: 16px;
        font-weight: 700;
        color: #32393f;

        .icon {
          margin-right: 5px;
        }
      }
    }

  }
}
</style>
