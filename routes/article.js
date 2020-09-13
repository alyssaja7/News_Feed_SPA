//http://localhost:4000/article?id=sport/2020/apr/03/englands-cricketers-to-hand-back-500000-and-donate-to-charities?api-key=c05384c5-6def-48bd-8d98-ad6b7c9e9caa&show-blocks=all
//https://content.guardianapis.com/sport/blog/2020/apr/04/talking-horses-millions-will-tune-in-for-itv-virtual-grand-national-horse-racing?api-key=c05384c5-6def-48bd-8d98-ad6b7c9e9caa&show-blocks=all
const cors = require("cors")
const express = require('express');
const router = express.Router();
const https = require("https");
const url = require("url");
const fetch = require('node-fetch');
var apiKey = 'c05384c5-6def-48bd-8d98-ad6b7c9e9caa';

router.get('/', cors(), async (req, res) => {

    //console.log(req.query)
    let id = req.query.id;
    console.log(id)
    let api_url = 'https://content.guardianapis.com/' + id + '&show-blocks=all';
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();

    //create a new json object for the simplified guardian home json data
    let guardian_detail = {};
    let content;

    let article_id;
    let section;
    let url;
    let title;
    let d;
    let middle_date;
    let date;

    try {
        content = json.response.content;

        article_id = content.id;
        section = content.sectionId;
        url = content.webUrl;
        title = content.webTitle;
        d = new Date(content.webPublicationDate);
        middle_date= d.toDateString().split(" ");   //object
        date = middle_date[2] + " " + middle_date[1] + " " + middle_date[3];
    } catch (error) {}

    let img;
    let img_assets;
    let len_assets;
    try {
        img_assets = content.blocks.main.elements[0].assets;
        len_assets = img_assets.length;
    } catch (error) {}

    if (img_assets === undefined || len_assets == 0) {
        img = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png';
    } else if(len_assets !== 0 ||img_assets !== undefined){
        img = img_assets[len_assets - 1].file;
    }
    console.log(img)

    // let img;
    // try{
    //     let img_assets = article.blocks.main.elements[0].assets;
    //     //console.log(img_assets);
    //     let len_assets = img_assets.length;
    //
    //     if(len_assets == 0){
    //         img = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png';
    //     }else{
    //         img = img_assets[len_assets - 1].file;
    //     }
    //
    // }catch(error){
    //     img = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png';
    // }




    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    let dash_date = year + '-' + month + '-' + day;


    let description = content.blocks.body[0].bodyTextSummary;
    //console.log(description);
    let tag = content.webUrl.substring(15, 23).toUpperCase();

    guardian_detail['ID'] = article_id;
    guardian_detail['Tag'] = tag;
    guardian_detail['Section'] = section;

    guardian_detail['Title'] = title;
    guardian_detail['URL'] = url;
    guardian_detail['Image'] = img;
    guardian_detail['Date'] = date;
    guardian_detail['Dash_Date'] = dash_date;
    guardian_detail['Description'] = description;


    res.json(guardian_detail);

    //console.log('success get');

});


module.exports = router;
