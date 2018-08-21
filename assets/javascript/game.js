//DOM Selectors
let _message = $('#message')
let _mario = $('#mario')
let _goomba = $('#goomba')
let _koopa = $('#koopa')
let _bowser = $('#bowser')
let _attacker = $('#attacker')
let _defender = $('#defender')
let _attackHp = $('#attackHp')
let _attackHpBar = $('#attachHpBar')
let _defendHp = $('#defendHp')
let _defendHpBar = $('#defendHpBar')
let _attackPwr = $('#attackPwr')
let _attackPwrBar = $('#attackPwrBar')
let _counterPwr = $('#counterPwr')
let _counterPwrBar = $('#counterPwrBar')


//Global Variables


//Game Function
function startGame() {
   _message.html('Select the attacker');

}

//Select Attacker


//Select Defender


//Attack Function


//Game Reset


//Event Listener
$('#startGame').on('click', startGame)
