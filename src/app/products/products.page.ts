import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {PopoverController} from '@ionic/angular';
import { UserComponent } from './user.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  @ViewChild('prodForm') formValues;

  successMsg = "";
  submitted = [];
  constructor(
    public popoverController: PopoverController
    ){ }

  ngOnInit() {
    const data = localStorage.getItem('products');
    this.submitted = data ? JSON.parse(data) : [];
  }

  userInfo(ev) {
    this.showPopover(ev);
  }

  async showPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: UserComponent,
      event: ev,
      translucent: true,
      showBackdrop: false,
      cssClass: 'userInfo'
    });
    return await popover.present();
  }

  createProd(prodForm: NgForm): any{
    let product: NgForm = prodForm.value;
    let last: any = localStorage.getItem('products');
    console.log(last);
    if(last == null){
      last = [product]
    }else{
      last = JSON.parse(last);
      last.unshift(product)
    }

    localStorage.setItem('products', JSON.stringify(last));
    this.successMsg = "successfuly saved product";
    this.submitted.unshift(product);
    setTimeout(()=>{
      this.successMsg = '';
      this.formValues.resetForm();
    },5000);
  }

  delete(index){
    this.submitted.splice(index,1);
    localStorage.setItem('products', JSON.stringify(this.submitted));
  }
}
