import {animate, style, transition, animation} from '@angular/animations';

export const fadeOut = animation([
      style({ height: 0 , opacity: 0}),
      animate('0.2s ease-in', style({ height: '*', opacity: 1 }))
  ]);

export const enterAnimation = animation([
  style({ opacity: 0 }),
  animate('0.1s ease-in', style({ opacity: 1 }))
]);

export const outAnimation = animation([
  style({ opacity: 1}),
  animate('0.1s ease-in', style({ opacity: 0 }))
]);
