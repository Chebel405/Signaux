import { Component, signal, computed, linkedSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Product {
    name: string;
    price: number;
    lang: string[];

}


@Component({
    selector: 'app-dyma',
    imports: [FormsModule],
    template: `
    <select 
        [ngModel]="selectedProduct()"
        (ngModelChange)="selectedProduct.set($event)"
    >
        <option disabled [value]="null">Chose a product</option>
        @for(product of products(); track product.name){
            <option [ngValue]="product">{{product.name}}</option>
        }
    </select>
    <hr />
        <input
            [ngModel]="quantity()"
            (ngModelChange)="quantity.set($event)"
            type="number"/>
    <hr />


    <hr />
    @if(this.selectedProduct()){
    <select 
        [ngModel]="selectedLang()"
        (ngModelChange)="selectedLang.set($event)"
    >
        <option disabled [value]="null">Chose a language</option>
        @for(lang of this.selectedProduct()?.lang; track $index){
            <option [value]="lang">{{lang}}</option>
        }
    </select> 
    <hr />
    }
    <h1>Prix : {{price()}}</h1>



    <hr />
    @if(this.selectedProduct() && isCheapProduct()){
        <div>
            <p style="color:green">Ce produit est un bon plan !</p>
        </div>
    }

    <hr />
    <hr />
    @if(this.selectedProduct() && isExpensiveProduct()){
        <div>
            <p style="color:red">Ce produit n'est pas un bon plan !</p>
        </div>
    }



        `,
    styles: `
  `,
})
export class DymaComponent {
    // Signal qui contient la liste des produits dispo
    products = signal<Product[]>([
        {
            name: 'Cz Shadow 2',
            price: 1800,
            lang: ['fr', 'en'],
        },
        {
            name: 'Glock 17',
            price: 600,
            lang: ['es', 'en'],
        },
        {
            name: 'Glock 16',
            price: 750,
            lang: ['es', 'en'],
        },
        {
            name: 'Glock 15',
            price: 150,
            lang: ['es', 'en'],
        },
        {
            name: 'Glock 14',
            price: 200,
            lang: ['es', 'en'],
        },
    ]);
    // Signal qui contient le produit actuellement selectionné ou null
    selectedProduct = signal<Product | null>(null);
    isCheapProduct = linkedSignal(() => {
        const product = this.selectedProduct();
        return product ? product.price < 600 : false;
    })
    isExpensiveProduct = linkedSignal(() => {
        const product = this.selectedProduct();
        return product ? product.price > 1000 : false;
    })
    selectedLang = linkedSignal(() => this.selectedProduct()?.lang[0]);
    quantity = linkedSignal({
        source: this.selectedProduct,
        computation: () => 1,
    });
    price = computed(
        () => (this.selectedProduct()?.price || 0) * this.quantity()
    );

}
