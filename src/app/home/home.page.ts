import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  products: Object[] = []; 
  cartNumer: number = 0;
  cartProducts: Object[] = []; 
  constructor() {}

  ngOnInit(){
    this.loadData();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.loadData();
      event.target.complete();
    }, 2000);
  }

  loadData(){
    const data = localStorage.getItem('products');
    this.products = data ? JSON.parse(data) : [];
    const cartData = localStorage.getItem('carts');
    this.cartProducts = cartData ? JSON.parse(cartData) : [];
    this.cartNumer = this.cartProducts.length;
    if(this.products.length > 0){
      this.products.map(a=>{
        a['number'] = 0; 
        a['isChecked'] = false;
      });
    }
  }

  increment(i){
    this.products[i]['number'] += 1;
    const qty = this.products[i]['qty']
    if(this.products[i]['number']+1 > qty){
      this.products[i]['number'] = qty;
    }
  }
  decrement(i){
    if(this.products[i]['number']-1 < 0){
      this.products[i]['number'] = 0;
    }
    else{
      this.products[i]['number'] -= 1;
    }
  }

  addCart(){
    let data = this.products.filter(a=> a['isChecked'] == true && a['number'] > 0);
    const dataLen = data.length;
    if(dataLen > 0){
      this.cartProducts.unshift(...data);
      localStorage.setItem('carts', JSON.stringify(this.cartProducts));
      this.cartNumer = this.cartProducts.length;
    };
  }
}
