class Game {
    name:string = "Game";
    players:string[] = [];

    constructor(n,pl) {
        this.name = n;
        if (pl) {
            var a = [];
            pl.forEach(function(p) {
                a.push(p);
            });
            this.players = a;
        }
        //console.log("Game::constructor...");
    }
    
    addPlayer = function(p) {
        this.players.push(p);
    }
    
    removePlayer = function(p) {
        this.players.forEach(function(pl, idx) {
            if (p.name.toUpperCase() === pl.name.toUpperCase()) {
                this.players.splice(idx, 1);
            }
        });
    }
    
    sayName = function() {
        console.log("I'm the game %s...", this.name.toUpperCase());
    }
    
    listPlayers = function() {
        if (this.players.length > 0) {
            console.log("%s has these players...", this.name);
            this.players.forEach(function(p) {
                console.log("  I'm player %s", p.name);
            })
        }
    }
}