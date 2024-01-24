<template>
  <div>
    <div class="top">
      <div class="top-title">NOSS 最新余额排行榜</div>
      <div class="top-desc">
        由于早前有部分脏数据，做了如下处理：
        1.索引恢复至最后一条MINT记录；
        2.所有事件从前到后逐个处理并索引；
        3.在处理transfer事件时，如果自转，则将该事件标记为非法，并且不更改索引数据；
        4.如果转账金额大于余额，则将该事件标记为非法，并且不更改索引数据；
        5.仅作参考，一切数据以官方为准，您也可以点击查询余额进行验证。
      </div>

    </div>

    <el-table :data="list" stripe style="width: 100%" border>
      <el-table-column prop="rank" align="center" label="排名" width="50"></el-table-column>
      <el-table-column prop="pkNpub" header-align="center" label="地址" min-width="200"></el-table-column>
      <el-table-column prop="balance" align="center" label="余额"></el-table-column>
      <el-table-column prop="mintTimes" align="center" label="mint次数"></el-table-column>
      <el-table-column prop="mintCount" align="center" label="mint个数"></el-table-column>
      <el-table-column prop="transferInTimes" align="center" label="转入次数"></el-table-column>
      <el-table-column prop="transferInCount" align="center" label="转入个数"></el-table-column>
      <el-table-column prop="transferOutTimes" align="center" label="转出次数"></el-table-column>
      <el-table-column prop="transferOutCount" align="center" label="转出个数"></el-table-column>
      <el-table-column prop="lastActive" align="center" label="最后活动时间"></el-table-column>
      <el-table-column header-align="center" align="center" width="150" label="查询">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="queryBalance(scope.row.pkNpub)">官方余额查询</el-button>
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>




export default {
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.$http({
        url: '/web3/noss/rank',
        method: 'post',
        data: this.$http.adornData({})
      }).then(res => {
        console.log(res)
        if (res && res.code === 0) {
          let index = 1;
          res.list.forEach(element => {
            let d = new Date(element.lastActiveTime);
            element.lastActive = this.formatFullDateTime(d);
            element.rank = index;
            index++;
          });
          this.list = res.list;
        }
      })
    },
    formatFullDateTime(date) {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();
      return year + "-" + String(month).padStart(2, "0") + "-" + String(day).padStart(2, "0") +
        " " + String(hour).padStart(2, "0") + ":" + String(minute).padStart(2, "0") + ":" + String(second).padStart(2, "0");
    },
    queryBalance(address) {
      window.open(`https://api-worker.noscription.org/indexer/balance?npub=${address}`, "_blank");
    }
  }
}
</script>

<style>
.top-title {
  font-size: 20px;
  color: #03034c;
}
.top-desc {
  padding: 10px 20px;
  line-height: 1.2;
  text-align: left;
}
</style>
