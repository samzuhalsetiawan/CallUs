import { firebaseConfig } from "./modules/firebaseConfig";
import { initializeApp } from 'firebase/app'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const csLoginButton = document.getElementById('cs-login-button')
const recaptchaContainer = document.getElementById('firebaseui-auth-container')
const btnSendVerificationPhone = document.getElementById('dialog-cs-btn-send-verif')
const btnVerificationPhone = document.getElementById('dialog-cs-btn-verif')

btnSendVerificationPhone.addEventListener('click', function(ev) {
  ev.preventDefault()
  phoneAuth()
  document.querySelector('.send-verification-container').classList.toggle('hide')
  document.querySelector('.otp-verification-container').classList.toggle('hide')
})

btnVerificationPhone.addEventListener('click', function(ev) {
  ev.preventDefault()
  codeVerify()
  document.querySelector('.send-verification-container').classList.toggle('hide')
  document.querySelector('.otp-verification-container').classList.toggle('hide')
})

csLoginButton.addEventListener('click', function() {
  render()
})


function render() {
  window.recaptchaVerifier = new RecaptchaVerifier(recaptchaContainer, {}, auth)
  window.recaptchaVerifier.render()
}

function phoneAuth() {
  var phoneNumber = document.getElementById('phone-input').value
  signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
    .then(confirmationResult => {
      window.confirmationResult = confirmationResult
    })
    .catch(error => {
      console.error(error.message)
    })
}

function codeVerify() {
  const code = document.getElementById('otp-code').value
  window.confirmationResult.confirm(code)
    .then(() => {
      const namaInstansi = document.querySelector("dialog").dataset.instansi;
      window.location = `/lobby?m=cs&i=${namaInstansi}`;
    })
    .catch(() => {
      console.log('FAILED')
    })
}