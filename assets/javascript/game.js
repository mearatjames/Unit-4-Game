//DOM Selectors
let _message = $('#message')
let _attackHp = $('#attackHp')
let _attackHpBar = $('#attackHpBar')
let _defendHp = $('#defendHp')
let _defendHpBar = $('#defendHpBar')
let _attackPwr = $('#attackPwr')
let _counterPwr = $('#counterPwr')
let _attackBtn = $('#attackBtn')
let _fightArea = $('#fightArea').clone()
let _characters = $('#characters').clone()


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
         hp: 110,
         atk: 10,
         catk: 5,
    },
    koopa = {
         name: 'koopa',
         hp: 130,
         atk: 8,
         catk: 7,
    },
    bowser = {
         name: 'bowser',
         hp: 140,
         atk: 11,
         catk: 8,
    }
]

let hasAttacker = false;
let hasDefender = false;
let attackReady = false;
let selectedAttacker, selectedDefender;
let attackerStats, defenderStats;

    
    //Game Function
    
    function startGame() {
        reset();
        _message.text('Select the attacker');
        selectAttacker();
    }
    
    //Select Attacker
    function selectAttacker() {
        $('.character').on('click', function() {
            if (!hasAttacker) {
                selectedAttacker = $(this);
                hasAttacker = true;
                _message.text('Select the defender');
                $('#atkArea').replaceWith(selectedAttacker);
                let name = $('#attacker');
                let hp = $('#attackHp');
                let pwr = $('#attackPwr')
                let bar = $('#attackHpBar');
                stats(selectedAttacker, name, hp, bar, pwr);
                attackerStats = charStats(selectedAttacker)
            } else {
                selectedDefender = $(this);
                hasDefender = true;
                $('#defendArea').replaceWith(selectedDefender);
                _message.text('Click Attack! Button');
                attackReady = true;
                let name = $('#defender');
                let hp = $('#defendHp');
                let pwr = $('#counterPwr')
                let bar = $('#defendHpBar');
                stats(selectedDefender, name, hp, bar, pwr);
                defenderStats = charStats(selectedDefender)
            }
        })
    }
    //Character Stats
    function charStats(char) {
        for (let i = 0; i < character.length; i++) {
            if (char.attr('id') === character[i].name){
                console.log(character[i])
                return character[i];
            }
        }
    }

    //Attacker Stats  
    function stats(a, b, c, d, e){
        for (let i = 0; i < character.length; i++) {
            if (a.attr('id') === character[i].name){
            c.text(character[i].hp);
            b.text(character[i].name.toUpperCase());
            hpBar = Math.floor((character[i].hp / 150) * 100);
            d.attr("style","width: " + hpBar + "%");
            !attackReady ? e.text(character[i].atk): e.text(character[i].catk)
            }
        }
    } 
    
    //Attack Function
    function attack() { 
        if (attackReady) {
            defenderStats.hp = defenderStats.hp - attackerStats.atk;
            attackReady = false;
            statsUpdate(defenderStats.hp)
            setTimeout(function(){
               attackerStats.hp = attackerStats.hp - defenderStats.catk;
               attackerStats.atk = attackerStats.atk * 2;
               statsUpate2 (attackerStats.hp, attackerStats.atk)
               attackReady = true;
            }, 1000)
        }
    }

    function statsUpdate(defendHealth) {
        $('#defendHp').text(defendHealth);
        $('#defendHpBar').attr("style", "width: " + Math.floor((defendHealth / 150) * 100 )+ "%")
    }

    function statsUpate2(attackHealth, pwrUp) {
        $('#attackHp').text(attackHealth);
        $('#attackHpBar').attr("style", "width: " + Math.floor((attackHealth / 150) * 100 )+ "%")
        $('#attackPwr').text(pwrUp);
    }
    
    //Game Reset
    function reset() {
        hasAttacker = false;
        hasDefender = false;
        attackReady = false;
        _attackHp.empty();
        _attackPwr.empty();
        _defendHp.empty();
        _counterPwr.empty();
        $('#fightArea').replaceWith(_fightArea.clone())
        $('#characters').replaceWith(_characters.clone())
        }
        
        //Eventlistener
    _attackBtn.on('click', attack)
    $('#startGame').on('click', startGame)