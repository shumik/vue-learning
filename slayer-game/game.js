new Vue({
    el: '#app',
    data: {
        initHeroHealth: 100,
        initMonsterHealth: 100,
        heroHealth: '',
        monsterHealth: '',
        heroMaxDamage: 10,
        heroMaxSpecialDamage: 20,
        heroDefenceDecreaseOnSpecialAttackMultiplier: 1.2,
        monsterMaxDamage: 15,
        heroMaxHeal: 20,
        winner: '',
        gameStarted: false,
        log: [],
    },
    computed: {},
    watch: {
        heroHealth: function (value) {
            if (value <= 0) {
                this.gameStarted = false;
                this.winner = 'monster';
            }
        },
        monsterHealth: function (value) {
            if (value <= 0) {
                this.gameStarted = false;
                this.winner = 'monster';
            }
        },
        winner: function (value) {
            if (value === '' || this.gameStarted === true) {
                return;
            }
            this.alertWinner();
        }
    },
    methods: {
        startNewGame: function () {
            this.gameStarted = true;
            this.heroHealth = this.initHeroHealth;
            this.monsterHealth = this.initMonsterHealth;
            this.winner = '';
            this.log = [];
            this.log.push('Game started!');
        },
        attack: function () {
            this.monsterAttack();
            this.heroAttack(this.heroMaxDamage);
        },
        specialAttack: function () {
            this.monsterAttack(this.heroDefenseDecreaseOnSpecialAttackMultiplier);
            this.heroAttack(this.heroMaxSpecialDamage);
        },
        heal: function () {
            this.monsterAttack();
            this.heroHeal(this.heroMaxHeal);
        },
        monsterAttack: function (heroDefenceDecreaseMultiplier = 1) {
            if (this.monsterHealth <= 0) {
                return;
            }
            let monsterDamage = Math.floor(Math.random() * this.monsterMaxDamage * heroDefenceDecreaseMultiplier) + 1;
            this.heroHealth -= monsterDamage;
            this.log.push('Monster hits hero for ' + monsterDamage + ' points');
        },
        heroAttack: function (maxDamage) {
            if (this.heroHealth <= 0) {
                return;
            }
            let heroDamage = Math.floor(Math.random() * maxDamage) + 1;
            this.monsterHealth -= heroDamage;
            this.log.push('Hero hits monster for ' + heroDamage + ' points');
        },
        heroHeal: function (maxHeal) {
            if (this.heroHealth <= 0) {
                return;
            }
            let heroHeal = Math.floor(Math.random() * maxHeal) + 1;
            this.heroHealth += heroHeal;
            this.log.push('Hero heals himself for ' + heroHeal + ' points');
        },
        giveUp: function () {
            this.gameStarted = false;
            this.winner = 'monster';
        },
        alertWinner: function () {
            alert(this.winner + ' is winner!');
        }
    }
});