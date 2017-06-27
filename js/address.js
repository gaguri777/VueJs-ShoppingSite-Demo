new Vue ({
  el: '.container',
  data: {
    limitnumber: 3,
    addresslist: [],
    currentIndex: 0,
    shippingMethod: 1
  },
  mounted: function () {
    this.$nextTick(function () {
      this.getAddresslist();
    });
  },
  computed: {
    filteraddress: function () {
      return this.addresslist.slice(0,this.limitnumber);
    }
  },
  methods: {
    getAddresslist: function () {
      var _this = this;
      this.$http.get("data/address.json").then(function (response) {
       
        var res = response.data;
        if (res.status == "0") {
            _this.addresslist = res.result;

        } 
      })
    },
    loadmore: function () {
      this.limitnumber = this.addresslist.length;
    },
    setDefault: function (addressId) {
      var _this = this;
      this.addresslist.forEach(function (item, index) {
        if (item.addressId==addressId) {
          item.isDefault =true;
        } else {
          item.isDefault =false;
        }
      })
    }
  },
})