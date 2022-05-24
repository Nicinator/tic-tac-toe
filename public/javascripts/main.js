// get available options
let availableSigns
fetch('/available-signs', {
  method: 'GET'
})
.then(response => response.json())
.then(data => {
  availableSigns = data

  if(availableSigns.x === true) {
    const button = document.createElement('button')
    button.innerHTML = 'X'
    button.addEventListener('click', selectSignEventListener)
    selectSign.appendChild(button)
  }

  if(availableSigns.o === true) {
    const button = document.createElement('button')
    button.innerHTML = 'O'
    button.addEventListener('click', selectSignEventListener)
    selectSign.appendChild(button)
  }

  statusText.innerHTML = 'Zeichen auswählen'
})

// select sign buttons
const selectSign = document.getElementById('select-sign')
const statusText = document.querySelector('#select-sign p')
let selectedSign = null
function selectSignEventListener() {
    selectedSign = this.innerHTML
    statusText.innerHTML = 'Warten auf Gegenspieler...'

    for(let i = selectSign.children.length - 1; i > 0; i--) {
      selectSign.children[i].remove()
    }

    fetch('/select-sign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({selectedSign})
    })

    setInterval(update, 1000)
}

// game buttons
const buttons = document.getElementById('buttons')
for(let i = 0; i < 9; i++) {
    const button = document.createElement('button')
    button.innerHTML = ''
    button.addEventListener('click', function() {
        buttonClickEventHandler(i + 1)
    })
    buttons.appendChild(button)
}

function buttonClickEventHandler(number) {
    console.log(number)
}

// Update loop
let gameStarted = false
function update() {
  if(gameStarted === false) {
    fetch('/update', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      if(data.gameStarted === true) {
        statusText.innerHTML = 'Spiel wurde gestartet!'
        gameStarted = true
      }
    })
  } else {
    // get game data from other person
  }
}