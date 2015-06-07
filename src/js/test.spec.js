describe('test', function(){
  it('should have t1 value', function(){
    expect(new test().t1).toEqual('test1');
  });

  it('should have t2 value', function(){
    expect(new test().t2).toEqual('test1');
  });
  
  it('should have printVar function', function(){
    expect(new test().printVar).toBeDefined();
  });
});