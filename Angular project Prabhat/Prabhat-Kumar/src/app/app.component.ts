import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Prabhat Kumar's Personal Website</h1>
  `,
  styles: [`
    h1 {
      color: blue;
    }
  `]
})
export class AppComponent {
  title = 'Prabhat-Kumar';
}