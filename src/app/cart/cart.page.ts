import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  carts: Object[] = [];
  purchased: Object[] = [];
  constructor() { }

  ngOnInit() {
    this.loadData();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.loadData();
      event.target.complete();
    }, 2000);
  }
  loadData(){
    const data = localStorage.getItem('carts');
    this.carts = data ? JSON.parse(data) : [];
    const purchaseData = localStorage.getItem('purchased');
    this.purchased = purchaseData ? JSON.parse(purchaseData) : [];
  }

  delete(index){
    this.carts.splice(index,1);
    localStorage.setItem('carts', JSON.stringify(this.carts));
  }

  purchase(){
    const date = this.currentTime();
    this.carts.forEach((a)=>{
      a['date'] = date;
      this.purchased.unshift(a)
    })
    // this.purchased.unshift(...this.carts);
    console.log(this.purchased);
    localStorage.setItem('purchased', JSON.stringify(this.purchased));
    localStorage.removeItem('carts');
    this.carts = [];
  }

  currentTime(){
    const date = new Date();
    return date.getFullYear() +"-"+date.getMonth() + "-" + date.getDate();
  }
}
