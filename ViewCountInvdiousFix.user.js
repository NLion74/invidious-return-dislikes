// ==UserScript==
// @name         ViewCount Invdious Fix
// @namespace    NLion74/invidious-return-dislikes
// @version      0.1
// @description  Show ViewCount for a video on invidious instances, because it didnt work for me even on public instances
// @author       nlion, forked from https://github.com/dieser-niko/youtube-dislikes-invidious
// @match        https://*/watch?v=*
// @connect      returnyoutubedislikeapi.com
// @icon         https://iv.nlion74.de/favicon-32x32.png
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

let dislike_api = "https://returnyoutubedislikeapi.com/votes?videoId=";
let video_data = JSON.parse(document.getElementById('video_data').innerHTML);

(function() {
    'use strict';

    function doRequest(videoId) {
        let response = GM_xmlhttpRequest({
            method: 'GET',
            url: dislike_api + videoId,
            responseType: 'json',
            timeout: 10000,
            onload: function(data) {
                let jsonData = {};
                jsonData = JSON.parse(data.responseText);
                $views_count.innerHTML = '<p id="views"><i class="icon ion-ios-eye"></i> ' + jsonData.viewCount + '</p>'
            },
            anonymous: true
        });
    }
    let $views_count = document.getElementById("views");

    doRequest(video_data.id);
})();
