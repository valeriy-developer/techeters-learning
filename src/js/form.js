import {validation} from './validation'

export const form = () => {
  const $form = document.querySelector('.form')
  const $inputs = $form.querySelectorAll('.input')
  const $wrapperClass = '.input-wrapper'

  const validateInputs = el => {
    if (el.dataset.validation === 'required') {
      if (validation.required(el.value)) {
        el.closest($wrapperClass).classList.add('error')
        return true
      } else {
        el.closest($wrapperClass).classList.remove('error')
        return false
      }
    }

    if (el.dataset.validation === 'email') {
      if (validation.email(el.value)) {
        el.closest($wrapperClass).classList.add('error')
        return true
      } else {
        el.closest($wrapperClass).classList.remove('error')
        return false
      }
    }

    return false
  }

  const onSubmit = e => {
    e.preventDefault()
    const errors = []
    const formData = {}

    $inputs.forEach(input => {
      const isError = validateInputs(input)

      errors.push(isError)
    })

    if (!errors.includes(true)) {
      $inputs.forEach(input => {
        formData[input.name] = input.value
        input.value = ''
        input.blur()
        input.closest($wrapperClass).classList.remove('active')
      })

      console.log(formData)
    }
  }

  const onFocus = e => {
    const el = e.currentTarget
    el.closest($wrapperClass).classList.add('active')
  }

  const onBlur = e => {
    const el = e.currentTarget
    if (el.value.trim() === '') {
      el.closest($wrapperClass).classList.remove('active')
    }
  }

  const onInput = e => {
    const el = e.currentTarget

    validateInputs(el)
  }

  $inputs.forEach(input => {
    input.addEventListener('focus', onFocus)
    input.addEventListener('blur', onBlur)
    input.addEventListener('input', onInput)
  })

  $form.addEventListener('submit', onSubmit)

  return () => {
    $inputs.forEach(input => {
      input.removeEventListener('focus', onFocus)
      input.removeEventListener('blur', onBlur)
      input.removeEventListener('input', onInput)
    })

    $form.removeEventListener('submit', onSubmit)
  }
}
