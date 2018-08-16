/**
 *
 */
layui.define(['element', 'util', 'element'], function () {
    var $ = layui.jquery
        , layer = layui.layer
        , element = layui.element
        , device = layui.device();

    //阻止IE7以下访问
    if (device.ie && device.ie < 8) {
        layer.alert('Layui最低支持ie8，您当前使用的是古老的 IE' + device.ie + '，请更换高版本的浏览器');
    }
    //触发事件
    var menu_list = [0];
    var active = {
        tabAdd: function (othis, id, title, src) {
            //新增一个Tab项
            element.tabAdd('main-tab-list', {
                title: title //用于演示
                , id: id //实际使用一般是规定好的id，这里以时间戳模拟下
            });
            menu_list.push(parseInt(id));
            $('.main-iframe').hide();
            $('.site-content').append('<iframe frameborder="0" width="100%" height="100%" class="main-iframe"  id="main-iframe-' + id + '" name="main-iframe-' + id + '" \n' +
                '                    src="' + src + '"></iframe>');
            element.init();
            //增加点击关闭事件
            var r = $(".layui-tab-title").find("li");
            //每次新打开tab都是最后一个，所以只对最后一个tab添加点击关闭事件
            r.eq(r.length - 1).children("i").on("click", function () {
                var id = parseInt($(this).parent("li").attr('lay-id'));
                menu_list.splice($.inArray(id, menu_list), 1);
                element.tabDelete("main-tab-list", id);
            }), element.tabChange("main-tab-list", id);

        }
        , tabDelete: function (othis) {
            //$(this).attr('lay-id');
            //删除指定Tab项
            //element.tabDelete('main-tab-list', '44'); //删除：“商品管理”
        }
        , tabChange: function (othis, id) {
            //切换到指定Tab项
            element.tabChange('main-tab-list', id); //切换到：用户管理
            $('.main-iframe').hide();
            $('#main-iframe-' + id).addClass('layui-show');
        }
    };
    $('.site-menu-active').on('click', function () {
        var othis = $(this);
        var id = parseInt(othis.attr('lay-id'));
        if ($.inArray(parseInt(id), menu_list) === -1) {
            active['tabAdd'] ? active['tabAdd'].call(this, othis, id, othis.text(), othis.attr('lay-href')) : '';
        } else {
            active['tabChange'].call(this, othis, id);
        }
    });

    element.on('tab(main-tab-list)', function () {
        var id = $(this).attr('lay-id');
        $('.main-iframe').hide();
        $('#main-iframe-' + id).show();
        $('.site-menu-active').parent().removeClass('layui-this');
        $('.site-menu-active[lay-id="' + id + '"]').parent().addClass('layui-this');
    });

    $('.main-iframe-refresh').click(function () {
        var id = $('.layui-tab-title').find('.layui-this').attr('lay-id');
        var src = document.getElementById('main-iframe-' + id).src;
        document.getElementById('main-iframe-' + id).src = src;
    });
});