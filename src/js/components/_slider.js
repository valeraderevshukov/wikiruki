import slick from 'slick-carousel';
import { DOC, WIN, widthMD, widthSM, widthXS } from '../constants';
import { buildIcon } from '../utils';

const slider = $('.js-slider');
slider.slick({
  dots: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 1,
  prevArrow: `<button class="slider__prev" type="button">${buildIcon('arrow-left')}</button>`,
  nextArrow: `<button class="slider__next" type="button">${buildIcon('arrow-right')}</button>`,
  responsive: [
    {
      breakpoint: widthMD,
      settings: {
        variableWidth: true
      }
    }
  ]
});

const heroSlider = $('.js-hero-slider');
heroSlider.slick({
  arrows: false,
  dots: true,
  autoplay: true,
  autoplaySpeed: 4000,
  infinite: true,
  speed: 700,
  fade: true,
  cssEase: 'linear',
  pauseOnHover: false
});

DOC.ready(() => {
  let timeOut;
  let arrayHref = [];
  const sliderIcons = $('.slick-slider .icon use');
  sliderIcons.each((i,el) => {
    const atr = $(el).attr('xlink:href');
    arrayHref.push(atr);
  });
  WIN.on('resize', () => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      for(let i = 0; i <= sliderIcons.length-1; i++) {
        $(sliderIcons[i]).attr('xlink:href', `${arrayHref[i]}`); 
      }
    },100);
  });
});
