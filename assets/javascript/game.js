//DOM Selectors
let _message = $('#message')
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
let _attackBtn = $('#attackBtn')


//Global Variables
let character = [
    mario = {
         name: 'mario',
         hp: 120,
         atk: 9,
         catk: 6,
    },
    goomba = {
         name: 'goomba',
         hp: 90,
         atk: 10,
         catk: 5,
    },
    koopa = {
         name: 'koopa',
         hp: 130,
         atk: 7,
         catk: 7,
    },
    bowser = {
         name: 'bowser',
         hp: 130,
         atk: 11,
         catk: 8,
    }
]

let hasAttacker = false;
let hasDefender = false;
let attackReady = false;
let selectedAttacker, selectedDefender;

    
    //Game Function
    
    function startGame() {
        hasAttacker = false;
        hasDefender = false;
        attackReady = false;
        
        _message.text('Select the attacker');
        selectAttacker();
    }
    
    //Select Attacker
    function selectAttacker() {
        $('.character').on('click', function() {
            if (!hasAttacker) {
                selectedAttacker = $(this);
                // console.log(selectedAttacker.attr('id'))
                hasAttacker = true;
                _message.text('Select the defender');
                $('#atkArea').replaceWith(selectedAttacker);
                attackerStats();
            } else {
                selectedDefender = $(this);
                selectDefender(selectedDefender);
                defenderStats();
            }
        })
    }
    
    //Attacker Stats  
    function attackerStats(){
        for (let i = 0; i < character.length; i++) {
            if (selectedAttacker.attr('id') === character[i].name)
            console.log(character[i].name);
            _attackHp.text(character[i].hp);
            _attackPwr.text(character[i].atk);
        }
    } 

    //Select Defender
    function selectDefender(selectedDefender) {
        hasDefender = true;
        $('#defendArea').replaceWith(selectedDefender);
        _message.text('Click Attack! Button');
        attackReady = true;
    }

    //Defender Stats
    function defenderStats(){
        for (let i = 0; i < character.length; i++) {
        if (selectedDefender.attr('id') === character[i].name)
            console.log(character[i].name);
            _defendHp.text(character[i].hp);
            _counterPwr.text(character[i].catk);
        }
    } 
    
    //Attack Function
    function attack() { 
        if (attackReady) {
            console.log('Attack!')
        }
    }
    
    //Game Reset
    function reset() {
        
        }
        
        //Eventlistener
    _attackBtn.on('click', attack)
    $('#startGame').on('click', startGame)