//http://localhost:3000/science?api-key=c05384c5-6def-48bd-8d98-ad6b7c9e9caa&show-blocks=all
//https://content.guardianapis.com/science?api-key=c05384c5-6def-48bd-8d98-ad6b7c9e9caa&show-blocks=all
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
let apiKey = 'c05384c5-6def-48bd-8d98-ad6b7c9e9caa';

router.get('/', async (req, res)=> {
    const api_url = 'https://content.guardianapis.com/science?api-key=' + apiKey + '&show-blocks=all'
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    let articles = json.response.results;

    //create a new json object for the simplified guardian home json data
    let arr = [];

    let id;

    for(let i = 0; i < articles.length; ++i){
        let article = articles[i];
        let url = article.webUrl;
        id = article.id;
        //get title
        let title = article.webTitle;

        //get img: if not exist, use default
        //console.log(article.blocks.main.elements)
        let img;
        try{
            let img_assets = article.blocks.main.elements[0].assets;
            //console.log(img_assets);
            let len_assets = img_assets.length;

            if(len_assets == 0){
                img = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png';
            }else{
                img = img_assets[len_assets - 1].file;
            }

        }catch(error){
            img = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png';
        }



        //get section
        let section = article.sectionId;

        //get date: convert format to yyyy-mm-dd
        let time = article.webPublicationDate;

        //get description
        //let description = article.blocks.body[0].bodyTextSummary;

        let object = {};

        // let qufen = article.webUrl.substring(15,23)
        // object['qufen'] = qufen;

        object['id'] = id;
        object['title'] = title;
        object['webUrl'] = url;
        object['img'] = img;
        object['section'] = section;
        object['time'] = time;
        // object['description'] = description;

        arr[i] = object;
        if(arr.length === 10) break;
    }


    let latestTen = {latestTen: arr};

    res.json(latestTen);



});



module.exports = router;