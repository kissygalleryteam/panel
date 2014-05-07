KISSY.add(function (S, Node, Panel) {
    var $ = Node.all;
    describe('panel', function () {
        it('Instantiation of components',function(){
            var panel = new Panel("#panel");
            window.panel = panel;


            // expect(S.isObject(demo)).toBe(true);
        })
    });

},{requires:['node','gallery/panel/1.0/']});