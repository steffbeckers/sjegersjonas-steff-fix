import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-settings-landing',
    templateUrl: './settings-landing.component.html',
    styleUrls: ['./settings-landing.component.scss'],
    standalone: false
})
export class SettingsLandingComponent implements OnInit {

  settings = [
    { icon: 'fa-solid fa-percent', 'text': 'VAT percentages', link: 'vat' },
    { icon: 'fa-solid fa-tags', 'text': 'Product Categories', link: 'product-category' },
    { icon: 'fa-solid fa-box', 'text': 'Product Units', link: 'product-unit' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
