export const form = () => {
  const $form = document.querySelector('.form')
  const $inputs = $form.querySelectorAll('.input')

  const onSubmit = e => {
    e.preventDefault()
  }

  const onFocus = e => {
    const el = e.currentTarget
    el.classList.add('active')
  }

  const onBlur = e => {
    const el = e.currentTarget
    if (el.value.trim() === '') {
      el.classList.remove('active')
    }
  }

  $inputs.forEach(input => {
    input.addEventListener('focus', onFocus)
    input.addEventListener('blur', onBlur)
  })

  $form.addEventListener('submit', onSubmit)
}
