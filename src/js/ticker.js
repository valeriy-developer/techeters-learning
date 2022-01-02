import gsap from 'gsap'

export const ticker = duration => {
  const $ticker = document.querySelector('.ticker')
  const tl = gsap.timeline({repeat: -1})

  tl.to($ticker, {x: '-50%', duration: duration, ease: 'linear'})
  tl.to($ticker, {x: 0, duration: 0, ease: 'linear'})
}
