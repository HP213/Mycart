module.exports = function Cart(oldCart){
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = function(item, id){
    var storedItem  = this.items[id];
    if(!storedItem){
      storedItem = this.items[id] = {item : item, qty : 0, price : 0};
    }
    storedItem.qty++;
    storedItem.price = storedItem.item.price*storedItem.qty;
    this.totalQty +=1 ;
    this.totalPrice += storedItem.item.price;
  };

  this.reduceOne = function(id){
    var storedItem  = this.items[id];

      storedItem.qty--;
      storedItem.price -= storedItem.item.price;
      this.totalQty-- ;
      this.totalPrice -= storedItem.item.price;

      if(this.items[id].qty <=0){
        delete this.items[id];
      }
  }

  this.change = function(id,change){
    var oldQty =   this.items[id].qty
    var oldPrice = this.items[id].price;
    this.items[id].qty = change;
    this.items[id].price = this.items[id].item.price*change;
    if(oldQty > change){
      this.totalQty -= (oldQty - change);
      this.totalPrice -= (oldPrice - change*this.items[id].item.price);
      if(!this.items[id].qty){
        delete this.items[id]
      }
    }else{
      this.totalQty += (change - oldQty);
      this.totalPrice += (change*this.items[id].item.price - oldPrice);
    }

  }
  this.remove = function(id){
    this.totalPrice -= this.items[id].price;
    this.totalQty -= this.items[id].qty;
    delete this.items[id]
  }



  this.generateArray = function(){
    var arr = [];
    for(var id in this.items){
      arr.push(this.items[id]);
    }
    return arr;
  };
};
