 var vm = new Vue({
  el:"#app",
  data: {
    productlist: [],
    totalMoney: 0,
    checkAllflag: false,
    delflag: false,
    curProduct: ''
  },
  filters: {
    formatMoney: function (value) {
      return "$ "+value.toFixed(2);
    }
  },
  methods: {
    cartview: function(){
      var _this = this;
      this.$http.get("data/cartData.json", {"id":123}).then(function (res) {
        _this.productlist = res.data.result.list;
        // _this.totalMoney = res.data.result.totalMoney;
      })
    },
    changeMoney:  function(product, way){
      if(way>0){
        product.productQuantity++;
      } else {
        product.productQuantity--;
        if(product.productQuantity < 1){
          product.productQuantity = 1;
        }
      }
      this.calcTotalPrice();
    },
    selectedProduct: function(item) {
      if (typeof item.checked == 'undefined') {
        //     //新注册变量
        this.$set(item, "checked", true);
      } else {
        item.checked = !item.checked;
      }
      this.calcTotalPrice();
    },
    checkAll: function (flag) {
      this.checkAllflag = flag;
      var _this = this;
    
        this.productlist.forEach(function (item, index) {
          if (typeof item.checked == 'undefined') {
                _this.$set(item, "checked", _this.checkAllflag);
              } else {
                item.checked = _this.checkAllflag;
              }
        })
              this.calcTotalPrice();;
      
    },
    calcTotalPrice: function() {
      var _this = this;
      this.totalMoney = 0;
      this.productlist.forEach( function (item, index){
        if (item.checked) {
          _this.totalMoney += item.productPrice * item.productQuantity;
        }
      })
    },
    delconfirm: function (item){
      this.delflag = true;
      this.curProduct = item;
    },
    delProduct: function () {
      var index = this.productlist.indexOf(this.curProduct);
      this.productlist.splice(index, 1);
      this.delflag = false;
    }
  },
  mounted: function () {
    this.cartview();
  }
});

Vue.filter("money", function (value, type) {
  return "$ " + value.toFixed(2) + type;
})