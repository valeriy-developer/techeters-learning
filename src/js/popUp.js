export const popUp = () => {
  const $popUp = document.querySelector('.pop-up')
  const $closeButton = $popUp.querySelector('.pop-up__close-btn')
  const $openButton = document.querySelector('.hero__button')

  const $backdrop = $popUp.querySelector('.pop-up__backdrop')

  const openPopUp = () => {
    $popUp.classList.add('pop-up--open')
  }

  const closePopUp = () => {
    $popUp.classList.remove('pop-up--open')
  }

  $closeButton.addEventListener('click', closePopUp)
  $backdrop.addEventListener('click', closePopUp)
  $openButton.addEventListener('click', openPopUp)
}
