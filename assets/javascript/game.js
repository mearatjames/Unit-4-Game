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
let _defend = $('#defend').clone()

//Global Variables
let character = [
    mario = {
         name: 'mario',
         hp: 130,
         atk: 5,
         catk: 11,
    },
    goomba = {
         name: 'goomba',
         hp: 120,
         atk: 6,
         catk: 14,
    },
    koopa = {
         name: 'koopa',
         hp: 140,
         atk: 4,
         catk: 12,
    },
    bowser = {
         name: 'bowser',
         hp: 150,
         atk: 4,
         catk: 13,
    }
]

let hasAttacker = false;
let hasDefender = false;
let attackReady = false;
let selectedAttacker, selectedDefender;
let attackerStats, defenderStats;
let defenderCount = 0;
let audio = document.getElementById('backgroundAudio')
let selectAudio = document.getElementById('selectAudio')   
let selectAudio2 = document.getElementById('selectAudio2')   
let attackAudio = document.getElementById('attackAudio')   
let defeatAudio = document.getElementById('defeatAudio')   
let overAudio = document.getElementById('overAudio')   
let winAudio = document.getElementById('winAudio')   
    
//Game Function 
    function startGame() {
        reset();
        _message.text('Select the attacker');
        selectAttacker();
        audio.loop = true;
        audio.play();
    }
    
    //Select Attacker
function selectAttacker() {
        $('.character').on('click', function() {
            audio.pause();
            if(hasDefender) return;
            if (!hasAttacker) {
                selectAudio.play();
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
                pwrUp =attackerStats.atk;
            } else {
                selectAudio2.play();
                attackReady = true;
                selectedDefender = $(this);
                hasDefender = true;
                $('#defendArea').replaceWith(selectedDefender);
                _message.text('Click Attack! Button');
                let name = $('#defender');
                let hp = $('#defendHp');
                let pwr = $('#counterPwr')
                let bar = $('#defendHpBar');
                stats(selectedDefender, name, hp, bar, pwr);
                defenderStats = charStats(selectedDefender);
            }
        })
    }
    //Character Stats
    function charStats(char) {
        for (let i = 0; i < character.length; i++) {
            if (char.attr('id') === character[i].name){
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
            attackAudio.play();
            selectedDefender.animate({opacity: 0.5})
            defenderStats.hp = defenderStats.hp - attackerStats.atk;
            attackReady = false;
            statsUpdate(defenderStats.hp)
            logic(defenderStats.hp)
            setTimeout(function(){
                if (defenderStats.hp <= 0) return;
                selectedDefender.animate({opacity: 1})
                selectedAttacker.animate({opacity: 0.5})
                selectedAttacker.animate({opacity: 1})
                attackerStats.hp = attackerStats.hp - defenderStats.catk;
                attackerStats.atk = attackerStats.atk + pwrUp;
                statsUpate2 (attackerStats.hp, attackerStats.atk)
                attackReady = true;
                if (attackerStats.hp <= 0) {
                    attackReady = false;
                    overAudio.play();
                    return _message.text("Game Over")
                }
            }, 700)
        }
    }

    function statsUpdate(defendHealth) {
        if (defendHealth < 0) {
            defendHealth = 0
        }
        $('#defendHp').text(defendHealth);
        $('#defendHpBar').attr("style", "width: " + Math.floor((defendHealth / 150) * 100 )+ "%")
    }

    function statsUpate2(attackHealth, pwrUp) {
        if (attackHealth < 0) {
            attackHealth = 0
        }
        $('#attackHp').text(attackHealth);
        $('#attackHpBar').attr("style", "width: " + Math.floor((attackHealth / 150) * 100 )+ "%")
        $('#attackPwr').text(pwrUp);
    }

    //Game Logic
    function logic(defenderHp) {
        if (defenderHp <= 0) {
            _message.text("You defeated " + defenderStats.name.toUpperCase()) 
            defenderCount++;
            if (defenderCount < 3) {
            setTimeout(function() {
                defeatAudio.play();
                _message.text("Select the next defender");
                $('#defend').replaceWith(_defend.clone());
                attackReady = false;
                hasDefender = false;
                selectAttacker();
            }, 1000)
         } else { 
            winAudio.play();
            _message.text("You defeated all defenders!!");

        }
    }
    }
    
    //Game Reset
    function reset() {
        hasAttacker = false;
        hasDefender = false;
        attackReady = false;
        defenderCount = 0;
        _attackHp.empty();
        _attackPwr.empty();
        _defendHp.empty();
        _counterPwr.empty();
        $('.progress').children().attr("style", "width: 0%");
        $('#fightArea').replaceWith(_fightArea.clone())
        $('#characters').replaceWith(_characters.clone())
        _message.text("Select the attacker")
        character = [
            mario = {
                 name: 'mario',
                 hp: 130,
                 atk: 5,
                 catk: 11,
            },
            goomba = {
                 name: 'goomba',
                 hp: 120,
                 atk: 6,
                 catk: 14,
            },
            koopa = {
                 name: 'koopa',
                 hp: 140,
                 atk: 4,
                 catk: 12,
            },
            bowser = {
                 name: 'bowser',
                 hp: 150,
                 atk: 4,
                 catk: 13,
            }
        ]
        }
        
        //Eventlistener
     _attackBtn.on('click', attack)
    $('#startGame').on('click', startGame)