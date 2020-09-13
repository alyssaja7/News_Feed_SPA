//https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:("https://www.nytimes.com/2020/04/08/world/europe/coronavirus-doctors-immigrants.html")&api-key=ci5mI5D1XhSbHZfaueFFTKqMDclZfABq
//http://localhost:4000/articlesearch.json?fq=web_url:("https://www.nytimes.com/2020/04/08/us/coronavirus-global-progress.html")&api-key=ci5mI5D1XhSbHZfaueFFTKqMDclZfABq
const cors = require("cors")
const express = require('express');
const router = express.Router();
const https = require("https");
const url = require("url");
const fetch = require('node-fetch');
var apiKey = 'ci5mI5D1XhSbHZfaueFFTKqMDclZfABq';

router.get('/', cors(), async (req, res) => {
    console.log(req.query)
    let id = req.query.fq;
    let api_url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=' + id + '&api-key=' + apiKey;
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();

    let ny_detail = {}

    let content = json.response.docs[0];
    let title = content.headline.main;
    let url = content.web_url;
    //get img
    let img;
    let multimedia;
    multimedia = content.multimedia;
    console.log(multimedia)
    for (let j = 0; j < multimedia.length; ++j) {
        let asset = multimedia[j];
        let width = asset.width;
        console.log(width)
        if (width >= 2000) {
            img = "https://static01.nyt.com/" + asset.url;
            console.log(img)
            break;
        }
    }
    //special case:
    if (typeof img === "undefined") {
        img = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg';
    }

    //get date
    let d = new Date(content.pub_date);
    let middle_date = d.toDateString().split(" ");   //object
    let date = middle_date[2] + " " + middle_date[1] + " " + middle_date[3];


    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    if(month < 10){
        month ='0' + month;
    }
    if(day < 10){
        day = '0' + day;
    }
    let dash_date = year + '-' + month + '-' + day;

    let description = content.abstract;

    let section = content.section_name;
    let tag = content.web_url.substring(12,19).toUpperCase();

    ny_detail['Title'] = title;
    ny_detail['Section'] = section;

    ny_detail['Tag'] = tag;
    ny_detail['Dash_Date'] = dash_date;
    ny_detail['URL'] = url;
    ny_detail['Image'] = img;
    ny_detail['Date'] = date;
    ny_detail['Description'] = description;

    res.json(ny_detail);

});

//https://api.nytimes.com/svc/search/v2/articlesearch.json?q=debates&api-key=ci5mI5D1XhSbHZfaueFFTKqMDclZfABq
//http://localhost:5000/articlesearch.json/result?q=debates&api-key=ci5mI5D1XhSbHZfaueFFTKqMDclZfABq
router.get('/result', cors(), async (req, res) => {
    let keyword = req.query.q;
    let api_url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+ keyword +'&api-key=' + apiKey;
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    let articles = json.response.docs;
    let arr = [];

    for(let i = 0; i < articles.length; ++i){
        let content = articles[i];
        let title = content.headline.main;
        let url = content.web_url;
        //get section
        let section = content.news_desk.toUpperCase();

        //get img
        let img;
        let multimedia;
        multimedia = content.multimedia;
        console.log(multimedia)
        for (let j = 0; j < multimedia.length; ++j) {
            let asset = multimedia[j];
            let width = asset.width;
            console.log(width)
            if (width >= 2000) {
                img = "https://static01.nyt.com/" + asset.url;
                console.log(img)
                break;
            }
        }
        //special case:
        if (typeof img === "undefined") {
            img = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg';
        }
        //get date
        let d = new Date(content.pub_date);
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        if(month < 10){
            month ='0' + month;
        }
        if(day < 10){
            day = '0' + day;
        }
        let date = year + '-' + month + '-' + day;


        let object = {};
        object['URL'] = url;
        object['Title'] = title;
        object['Image'] = img;
        object['Section'] = section;
        object['Date'] = date;
        arr[i] = object;

        if(arr.length === 5) break;
    }
    res.json(arr);
});


module.exports = router;