//https://api.nytimes.com/svc/topstories/v2/home.json?api-key=ci5mI5D1XhSbHZfaueFFTKqMDclZfABq
//http://localhost:4000/home.json?api-key=ci5mI5D1XhSbHZfaueFFTKqMDclZfABq



const express = require('express');
const router = express.Router();
const https = require("https");
const url = require("url");
const fetch = require('node-fetch');
var apiKey = 'ci5mI5D1XhSbHZfaueFFTKqMDclZfABq';

router.get('/', async (req, res) => {

    const api_url = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=' + apiKey;
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    //res.json(json);
    let articles = json.results;
    let arr = [];
    //let len = articles.length;


    for (let i = 0; i < articles.length; ++i) {
        let article = articles[i];
        let title = article.title;
        let url = article.url;
        let img;

        let multimedia = article.multimedia;
        try {
            for (let j = 0; j < multimedia.length; ++j) {
                let asset = multimedia[j];
                let width = asset.width;
                console.log(width)
                if (width >= 2000) {
                    img = asset.url;
                    console.log(img)
                    break;
                }
            }
        } catch (error) {
                img = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg';
                break;
        }

        if(typeof img === "undefined"){
            img = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg';
        }




        let section = article.section;
        //get trans-fomart date
        let fetch_date = article.published_date;
        let d = new Date(fetch_date);
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        let date = year + '-' + month + '-' + day;

        let description = article.abstract;

        let object = {};
        object['URL'] = url;
        object['Title'] = title;
        object['Image'] = img;
        object['Section'] = section;
        object['Date'] = date;
        object['Description'] = description;
        arr[i] = object;

        if(arr.length === 10) break;

    }
    res.json(arr);

});
module.exports = router;

