"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require("axios");
const pageNum = 20;
function formatMusicItem(item) {
    return {
        id: item.id,
        title: item.title,
        artist: item.artist_name,
        artwork: item.album_cover,
        urls: "https://shige.s.3322.net:43333/" + item.filepath,
    };
}
function formatArtistItem(item) {
    return {
        id: item.id,
        name: item.name,
        avatar: item.headImg,
    };
}
let lastQuery;
let lastMusicId;
async function searchMusic(query, page) {
    if (query !== lastQuery || page === 1) {
        lastMusicId = 0;
    }
    lastQuery = query;
    
    const response =await axios.get('https://sg-api.fuyinweb.net/api/search', {
        params: {
          q: query
        },
        headers: {
          'user-agent': 'Dart/3.4 (dart:io)',
          'accept': 'application/json',
          'authorization': 'Bearer 961d90f6aadcb90376faf8562eca7ca8',
          'host': 'sg-api.fuyinweb.net',
          'content-type': 'application/json',
          'x-api-version': 'v6'
        }
      });
    let songs = response.data.songs;
    console.log(songs.map(formatMusicItem));
    return {
        isEnd: true,
        data: songs.map(formatMusicItem),
    };
}
async function search(query, page, type) {
    if (type === "music") {
        return await searchMusic(query, page);
    }
}
async function getMediaSource(musicItem, quality) {
    let url;
    // if (quality === "standard") {
    //     url = musicItem.urls.find((it) => it.streamType === 5).url;
    // }
    // else if (quality === "high") {
    //     url = musicItem.urls.find((it) => it.streamType === 1).url;
    // }
    url = musicItem.urls;
    return {
        url,
    };
}

searchMusic("恩典", 1);
module.exports = {
    platform: "福音音乐",
    author: 'xieru',
    version: "0.0.1",
    supportedSearchType: ["music"],
    srcUrl: "https://raw.githubusercontent.com/RyanXie123/MusicFreePlugins/refs/heads/master/plugins/fuyin/index.ts",
    cacheControl: "no-cache",
    search,
    getMediaSource,
};
