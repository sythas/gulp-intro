class Player {
    name:string = "Yoyo";
    
    constructor(n) {
        this.name = n;
        //console.log("Player::constructor...");
    }
    
    attack() {
        return this.name.toUpperCase() + ", attacking...!";
    }

    sayName() {
        console.log("My name is: %s", this.name);
    }
}

class Gladiator extends Player {
    weapon:string = "knife";
    playerClass:string = "gladiator";
    
    constructor(n,w) {
        super(n);
        this.weapon = w;
    }
    attack() {
        var str = super.attack();
        return str + ' He has a ' + this.weapon.toUpperCase() + '...!';
    }
}

class Wizard extends Player {
    weapon:string = "knife";
    tools:string[] = ["staff"];
    playerClass:string = "wizard";
    
    constructor(n,w,t) {
        super(n);
        this.weapon = w;
        if (t.length > 0) {
            var a = this.tools;
            t.forEach(function(tool) {
                a.push(tool);
            });
            this.tools = a;
        }
    }
    attack() {
        var str = super.attack();
        str += ' He has a ' + this.weapon.toUpperCase();
        this.tools.forEach( function(t) {
            str += ' and a ' + t.toUpperCase();
        })
        str += '...!';
        return str;
    }
}
