const cleanForm = responses => {
  document.querySelector('#endereco').value = ''
  document.querySelector('#bairro').value = ''
  document.querySelector('#cidade').value = ''
  document.querySelector('#estado').value = ''
}

const fillForm = responses => {
  document.querySelector('#endereco').value = responses.logradouro
  document.querySelector('#bairro').value = responses.bairro
  document.querySelector('#cidade').value = responses.localidade
  document.querySelector('#estado').value = responses.uf
}
const isNumber = cep => /^[0-9]+$/.test(cep)

const validCep = cep => cep.length == 8 && isNumber(cep)

const searchCep = async () => {
  if (document.querySelector('#cep').value) {
    cleanForm()
    const cep = document.querySelector('#cep').value
    const url = `https://viacep.com.br/ws/${cep}/json/`
    if (validCep(cep)) {
      const data = await fetch(url)
      const responses = await data.json()
      if (responses.hasOwnProperty('erro')) {
        document.querySelector('#cep').value = 'CEP não encontrado!'
        const clean = () => {
          document.querySelector('#cep').value = ''
        }
        document.querySelector('#cep').addEventListener('click', clean)
      } else {
        fillForm(responses)
      }
    } else {
      document.querySelector('#cep').value = 'CEP inválido!'
      const clean = () => {
        document.querySelector('#cep').value = ''
      }
      document.querySelector('#cep').addEventListener('click', clean)
    }
  }
}

document.querySelector('#cep').addEventListener('focusout', searchCep)
