it('Name is function', function(){
    expect(typeof Name).toBe('function');
});

it('Name return object', function(){
   expect(typeof Name([])).toBe('object')
});