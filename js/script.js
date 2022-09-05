import { Modal } from './modal.js'
import { AlertError } from './alert-error.js'
import { notANumber, calculateIMC } from './utility.js'

const form = document.querySelector('form')
const inputWeight = document.querySelector('#weight')
const inputHeight = document.querySelector('#height')
const btnCloseAfterImcMessage = document.querySelector('.modal button.close')

form.onsubmit = event => {
  event.preventDefault()

  const weight = inputWeight.value
  const height = inputHeight.value

  const weightOrHeightIsNotANumber = notANumber(weight) || notANumber(height)

  if (weightOrHeightIsNotANumber) {
    AlertError.open()
    return
  }

  AlertError.close()

  const result = calculateIMC(weight, height)
  displayResultMessage(result)
  form.reset()
  inputWeight.focus()
}

window.addEventListener('input', AlertError.close)
window.addEventListener('click', AlertError.close)
btnCloseAfterImcMessage.addEventListener('click', InputFocusWeightOnClose)

function InputFocusWeightOnClose() {
  inputWeight.focus()
}

function displayResultMessage(result) {
  const message = `Your BMI is ${result}`

  Modal.message.innerText = message
  Modal.open()
}
