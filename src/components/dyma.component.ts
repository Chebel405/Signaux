import { Component, signal, computed, linkedSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Product {
    name: string;
    price: number;

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
    <h1>Prix : {{price()}}</h1>
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
        },
        {
            name: 'Glock 17',
            price: 600,
        },
    ]);
    // Signal qui contient le produit actuellement selectionné ou null
    selectedProduct = signal<Product | null>(null);
    quantity = linkedSignal({
        source: this.selectedProduct,
        computation: (newProduct) => {
            console.log(newProduct);
            return 1;
        }
    });
    price = computed(
        () => (this.selectedProduct()?.price || 0) * this.quantity()
    );

}
