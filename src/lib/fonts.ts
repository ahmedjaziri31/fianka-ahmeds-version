import localFont from 'next/font/local';

export const rosieBrown = localFont({
  src: [
    {
      path: '../../public/fonts/RosieBrownSerifDemo.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Rosie Brown Serif Demo.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-rosie-brown',
  display: 'swap',
});

 