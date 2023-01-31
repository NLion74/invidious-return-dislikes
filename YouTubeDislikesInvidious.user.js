// ==UserScript==
// @name         Return YouTube Dislike for Invidious
// @namespace    NLion74/invidious-scripts/YouTubeDislikesInvidious.user.js
// @version      0.2
// @description  Show dislikes for a video on all invidious instances
// @author       nlion
// @match        https://*/watch?v=*
// @connect      returnyoutubedislikeapi.com
// @icon         https://iv.nlion.nl/favicon-32x32.png
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
                $dislike_count.innerHTML = '<p id="dislikes"><i class="icon ion-ios-thumbs-down"></i> ' + jsonData.dislikes + '</p>'
            },
            anonymous: true
        });
    }
    let $dislike_count = document.getElementById("dislikes");
    $dislike_count.style.display = null;
    $dislike_count.style.visibility = null;

    doRequest(video_data.id);
})();
