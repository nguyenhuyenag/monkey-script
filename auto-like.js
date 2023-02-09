(function () {
    function getHttpRequest() {
        try { return new XMLHttpRequest(); }
        catch (error) { }
        try { return new ActiveXObject("Msxml2.XMLHTTP"); }
        catch (error) { }
        try { return new ActiveXObject("Microsoft.XMLHTTP"); }
        catch (error) { }
        throw new Error("Could not create HTTP request object.");
    }

    async function httpGet(url) {
        var request = getHttpRequest();
        var promise = new Promise((resolve, reject) => {
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    resolve(request.responseText);
                }
            }
        });
        request.open("GET", url, true);
        request.send(null);
        return await promise;
    }

    async function httpPost(url, data) {
        var request = getHttpRequest();
        var promise = new Promise((resolve, reject) => {
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    resolve(request.responseText);
                }
            }
        });
        request.open("POST", url, true);
        request.setRequestHeader('Accept', 'application/json, text/javascript, */*; q=0.01');
        request.setRequestHeader('content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send(data);
        return await promise;
    }

    // function sleep(time) {
    //     return new Promise((resolve) => setTimeout(resolve, time));
    // }

    /*Follow mình, không thích có thể remove =]] */
    // async function follow() {
    //     var text = await httpGet('https://next.voz.vn/members/vuongbaoremix.1251373');
    //     var parser = new DOMParser();
    //     var htmlDoc = parser.parseFromString(text, 'text/html');
    //     var token = htmlDoc.documentElement.getAttribute("data-csrf");
    //     httpPost("https://next.voz.vn/members/vuongbaoremix.1251373/follow", "_xfRequestUri=/members/vuongbaoremix.1251373/&_xfWithData=1&_xfToken=" + token + "&_xfResponseType=json");
    // }
    // follow();
    /*------------------------------------------*/

    async function autoLike(reaction = 1) {
        var totalPage = 1;
        var url = /(.*)\/(page)?/gm.exec(window.location.href)[1];
        var pageNav = [...document.querySelectorAll(".pageNav-page")].pop()?.querySelector("a");
        if (pageNav != null) {
            totalPage = /\/page-(.*)/gm.exec(pageNav.href)[1];
        }
        var pathName = /(.*)\/(page)?/gm.exec(window.location.pathname) + "/";

        for (var i = 1; i <= totalPage; i++) {
            console.log("-------- Like page: " + i + "--------");
            var text = await httpGet(url + "/page-" + i);
            var parser = new DOMParser();
            var htmlDoc = parser.parseFromString(text, 'text/html');
            var token = htmlDoc.documentElement.getAttribute("data-csrf");

            [...htmlDoc.querySelectorAll("a.reaction.reaction--imageHidden")].forEach(item => {
                var postId = /\/posts\/(\d+)\/react/gm.exec(item.href)[1];
                console.log("Like post: " + postId);
                var r = reaction || Math.floor(Math.random() * 6) + 1;
                // httpPost("/posts/" + postId + "/react?reaction_id=" + r, "_xfRequestUri=" + pathName + "page-" + i + "&_xfWithData=1&_xfToken=" + token + "&_xfResponseType=json");
            });
        }
        console.log("done");
    }
    autoLike(0);
})();