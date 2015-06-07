function appLoaded() {
    console.log('app.js loaded...');
}

var ngApp = angular.module('app', []);

ngApp.controller('MainController', function($scope) {
    var main = this;
    
    main.data1 = "angular data 1";
    main.data2 = "angular data 2";
    main.playerStatus = "";
    main.visible = true;
    
    main.hideData = function() {
        main.visible = !main.visible;
    };
    
        //-- the class stuff
        
    main.game = new Game('MyDungeon');
    main.p1 = new Player('Tom');
    main.p2 = new Gladiator('Dick','sword');
    main.p3 = new Gladiator('Harry','spear');
    main.p4 = new Wizard("Gandalf","sword",["spellbook","crystal skull"]);

    main.game.addPlayer(p1);
    main.game.addPlayer(p2);
    main.game.addPlayer(p3);
    main.game.addPlayer(p4);
    
    main.addNewPlayer = function(pl) {
        main.game.removePlayer();
    };

    main.attackit = function(p) {
        main.playerStatus = p.attack();
    };
});

appLoaded();
console.log("\nStandard JS stuff...");
t = new test();
t.printVar();

var p1 = new Player('Tom');
var p2 = new Gladiator('Dick','sword');
var p3 = new Gladiator('Harry','spear');
var p4 = new Wizard("Gandalf","sword",["spellbook","crystal skull"]);

console.log("\nThe \"Game\" class - create a game called \"myMaze\"...");
var g = new Game('myMaze',[p1, p2, p3, p4]);
console.log("\nThe \"Player, Gladiator, and Wizard\" classes - create a \"Player\", two \"Gladiators\", and a Wizard...");