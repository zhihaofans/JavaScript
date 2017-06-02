// ==UserScript==
// @name         匿名版一键搜图
// @namespace    http://zhihaofans.com
// @version      0.3.8
// @description  一键搜图(让盗图狗不再得意，让你不再为祭品信息而烦恼)
// @author       zhihaofans
// @match        https://h.nimingban.com/f/*
// @match        https://h.nimingban.com/t/*
// @match        http://www.kukuku.cc/t/*
// @match        http://www.kukuku.cc/*
// @grant        none
// @note         开源地址:https://github.com/zhihaofans/Some-JavaScript/blob/master/nimingban.com/nimingban.imagesearch.js
// @note         Greasyfork地址:https://greasyfork.org/zh-CN/scripts/21115
// ==/UserScript==
(function () {
    var setting_show = 0;
    var nmb_search = {
        "sogou": "http://pic.sogou.com/ris?query=",
        "baidu": "http://image.baidu.com/n/pc_search?queryImageUrl=",
        "google": "https://www.google.com/searchbyimage?image_url=",
        "saucenao": "http://saucenao.com/search.php?db=999&url=",
        "iqdb": "http://www.iqdb.org/?url=",
        "iisearch": "http://iisearch.ddo.jp/front.php?mode=1&url=",
        "tineye": "http://tineye.com/search/?url="
    };
    $(document).ready(function () {
        setting();
        $("#html_search").hide();
        start();
        $("#html_button_setting").click(function () {
            if (setting_show === 0) {
                $("#html_search").show();
                setting_show = 1;
            } else {
                $("#html_search").hide();
                setting_show = 0;
            }
        });
        $("#html_search").change(function () {
            search_change($("#html_search").val());
        });
    });
    function setting() {
        if (localStorage.getItem("setting_search") === null||localStorage.getItem("setting_search") === undefined) {
            localStorage.setItem("setting_search", "baidu");
        }
        console.log(localStorage.setting_search in nmb_search);
        if ((localStorage.setting_search in nmb_search)===false) {
            localStorage.setItem("setting_search", "baidu");
            alert("设置错误，已初始化(baidu)\n即将刷新");
        }
        var nmb_select = "<select id=\"html_search\" name=\"html_search\" onchange=\"search_change(this.value)\"><option value=\"baidu\">baidu</option><option value=\"google\">google</option><option value=\"sogou\">sogou</option><option value=\"saucenao\">saucenao</option><option value=\"iqdb\">iqdb</option><option value=\"tineye\">tineye</option><option value=\"360\">360</option><option value=\"iisearch\">iisearch</option></select>";
        var li = "<li><a href=\"javascript:void(0)\" id=\"html_button_setting\">一键搜图</a></li> " + nmb_select;
        $("ul.uk-breadcrumb:first").append(li);//first是为了兼容kukuku.cc
        $("#html_search option[value='" + localStorage.setting_search + "']").prop("selected", true);
    }
    function search_change(_search) {
        localStorage.setItem("setting_search", _search);
        alert("设置完毕(" + _search + ")\n即将刷新");
        location.reload();
    }
    function start() {
        var imgs_num = $("a.h-threads-img-a").length;
        var a_1 = 1;
        for (var a = 0; a < imgs_num; a++) {
            var nmb_img = $("a.h-threads-img-a:eq(" + a + ")");
            a_1 = a + 1;
            if (localStorage.getItem("setting_search", "baidu") == "360") {
                var nmb_link = "<form id=\"_form" + a_1 + "\" method=\"post\" action=\"http://st.so.com/stu\" target=\"_blank\" ><input type=\"hidden\" name=\"imgurl\" value=\"" + nmb_img.attr("href") + "\" /> <a onclick=\"document.getElementById('_form" + a_1 + "').submit();\">(←一键搜图)</a></form>";
            } else {
                var nmb_link = "<a  target=\"_blank\" id=\"one_key_search_image_" + a_1 + "\" href=\"" + nmb_search[localStorage.setting_search] + nmb_img.attr("href") + "\">(←一键搜图)</a>";
            }
            nmb_img.prop("outerHTML", nmb_img.prop("outerHTML") + nmb_link);
        }
    }
})();