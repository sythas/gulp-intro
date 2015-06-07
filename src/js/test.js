function test() {
    var self = this;
    
    this.t1 = 'test1';
    this.t2 = 'test1';
    
    this.printVar = function() {
        console.log('Test Module Properties: t1: %s, t2: %s', this.t1, this.t2);
    };
}