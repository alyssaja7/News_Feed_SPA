//http://localhost:3000/search?api-key=c05384c5-6def-48bd-8d98-ad6b7c9e9caa&section=(sport|business|technology|politics)&show-blocks=all

// const express = require('express');
// const router = express.Router();
// const https= require("https");
// const url= require("url");
// const fetch = require('node-fetch');
// var apiKey = 'c05384c5-6def-48bd-8d98-ad6b7c9e9caa';
//
//
// /*
//     get home page json data in the guardian news
//     这里做了数据过滤，只返回了必要的数据。没过滤之前一页十个，过滤之后返回这十个对应的。我觉得应该是top_headline这样规定的？？？
//  */
// router.get('/', async (req, res)=> {
//     console.log(req)
//     const params = url.parse(req.url, true).query;
//
//     console.log(params);
//     console.log(params.section);
//     const multi_section = params.section.split('|');
//     //console.log(multi_section);
//     const sport_section = multi_section[0];
//     const business_section = multi_section[1];
//     const tech_section = multi_section[2];
//     const politics_section = multi_section[3];
//     //console.log(sport_section);
//     //console.log(business_section);
//     //console.log(tech_section);
//     //console.log(politics_section);
//
//     //这里括号的问题虽说不影响，但能不能解决一下
//
//     const api_url = 'https://content.guardianapis.com/search?api-key='
//         + apiKey +'&section=('+ sport_section + '|' + business_section + '|' + tech_section + '|' + politics_section +')&show-blocks=all';
//
//     const fetch_response = await fetch(api_url);
//     const json = await fetch_response.json();
//     //return res.json(json);
//     //console.log(res.json(json));
//     let articles = json.response.results;
//     //create a new json object for the simplified guardian home json data
//     let arr = [];
//     // let guardian_home = {};
//     //console.log(articles[0].webTitle);
//     let id;
//     for(let i = 0; i < articles.length; ++i){
//         let article = articles[i];
//         let url = article.webUrl;
//
//         id = article.id;
//         //let id = article.id;
//         //get title
//         let title = article.webTitle;
//
//         let img;
//         try{
//             let img_assets = article.blocks.main.elements[0].assets;
//             //console.log(img_assets);
//             let len_assets = img_assets.length;
//
//             if(len_assets == 0){
//                 img = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png';
//             }else{
//                 img = img_assets[len_assets - 1].file;
//             }
//
//         }catch(error){
//             img = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png';
//         }
//         //get section
//         let section = article.sectionId;
//         //get date: convert format to yyyy-mm-dd
//         let fetch_date = article.webPublicationDate;
//         let d = new Date(fetch_date);
//         let day = d.getDate();
//         let month = d.getMonth() + 1;
//         let year = d.getFullYear();
//         if(month < 10){
//             month ='0' + month;
//         }
//         if(day < 10){
//             day = '0' + day;
//         }
//         let date = year + '-' + month + '-' + day;
//         //get description
//         let description = article.blocks.body[0].bodyTextSummary;
//         let object = {};
//         object['ID'] = id;
//         let qufen = article.webUrl.substring(15,23)
//         object['qufen'] = qufen;
//         object['URL'] = url;
//         object['Title'] = title;
//         object['Image'] = img;
//         object['Section'] = section;
//         object['Date'] = date;
//         object['Description'] = description;
//         arr[i] = object;
//     }
//     //guardian_home['articles'] = arr;
//     res.json(arr);
//     //console.log('success get');
// });
//
// //http://localhost:5000/search/result?q=debates&api-key=c05384c5-6def-48bd-8d98-ad6b7c9e9caa&show-blocks=all
// //https://content.guardianapis.com/search?q=debates&api-key=c05384c5-6def-48bd-8d98-ad6b7c9e9caa&show-blocks=all
//
// router.get('/result', async (req, res)=> {
//     // console.log(req)
//     const params = url.parse(req.url, true).query;
//     const keyword = params.q;
//     console.log(keyword)
//     // console.log(params)
//     const api_url = 'https://content.guardianapis.com/search?q=' + keyword + '&api-key='
//         + apiKey + '&show-blocks=all';
//
//     const fetch_response = await fetch(api_url);
//     const json = await fetch_response.json();
//     // return res.json(json);
//     let articles = json.response.results;
//     let arr = [];
//     let id;
//
//     for(let i = 0; i < articles.length; ++i){
//         let article = articles[i];
//         let url = article.webUrl;
//         id = article.id;
//
//         //get title
//         let title = article.webTitle;
//
//         let img;
//         try{
//             let img_assets = article.blocks.main.elements[0].assets;
//             //console.log(img_assets);
//             let len_assets = img_assets.length;
//
//             if(len_assets == 0){
//                 img = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png';
//             }else{
//                 img = img_assets[len_assets - 1].file;
//             }
//
//         }catch(error){
//             img = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png';
//         }
//         //get section
//         let section = article.sectionId;
//         //get date: convert format to yyyy-mm-dd
//         let fetch_date = article.webPublicationDate;
//         let d = new Date(fetch_date);
//         let day = d.getDate();
//         let month = d.getMonth() + 1;
//         let year = d.getFullYear();
//         if(month < 10){
//             month ='0' + month;
//         }
//         if(day < 10){
//             day = '0' + day;
//         }
//         let date = year + '-' + month + '-' + day;
//
//         let object = {};
//         object['ID'] = id;
//         object['URL'] = url;
//         object['Title'] = title;
//         object['Image'] = img;
//         object['Section'] = section;
//         object['Date'] = date;
//         arr[i] = object;
//
//         if(arr.length === 5) break;
//     }
//     res.json(arr);
// });
//
//
//
// module.exports = router;





//hw9

//https://content.guardianapis.com/search?order-by=newest&show-fields=starRating,headline,thumbnail,short-url&api-key=c05384c5-6def-48bd-8d98-ad6b7c9e9caa
//http://localhost:3000/search?order-by=newest&show-fields=starRating,headline,thumbnail,short-url&api-key=c05384c5-6def-48bd-8d98-ad6b7c9e9caa

const express = require('express');
const router = express.Router();
const url= require("url");
const fetch = require('node-fetch');
let apiKey = 'c05384c5-6def-48bd-8d98-ad6b7c9e9caa';

/*
    Home Fragment: Latest 10 news from guardian
*/
router.get('/', async (req, res) => {

    const api_url = 'https://content.guardianapis.com/search?order-by=newest&show-fields=starRating,headline,thumbnail,short-url&api-key=' + apiKey;
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    //return res.json(json);

    let articles = json.response.results;
    let arr = [];
    for(let i = 0; i < articles.length; ++i){
        let img = articles[i].fields.thumbnail;

        //special case: img doesn't exist
        if(img === undefined || img === null){
            img = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
        }
        let title = articles[i].webTitle;
        let time = articles[i].webPublicationDate;
        let section = articles[i].sectionName;
        let webUrl = articles[i].webUrl;
        let id = articles[i].id;

        let each = {};
        each['img'] = img;
        each['title'] = title;
        each['time'] = time;
        each['section'] = section;
        each['webUrl'] = webUrl;
        each['id'] = id;
        arr[i] = each;

        if(arr.length === 10) break;
    }

    let latestTen = {latestTen: arr};

    res.json(latestTen);
});



//http://localhost:3000/search/result?q=debates&api-key=c05384c5-6def-48bd-8d98-ad6b7c9e9caa&show-blocks=all
//https://content.guardianapis.com/search?q=debates&api-key=c05384c5-6def-48bd-8d98-ad6b7c9e9caa&show-blocks=all

router.get('/result', async (req, res)=> {

    const params = url.parse(req.url, true).query;
    const keyword = params.q;
    console.log(keyword)

    const api_url = 'https://content.guardianapis.com/search?q=' + keyword + '&api-key='
        + apiKey + '&show-blocks=all';

    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    // return res.json(json);
    let articles = json.response.results;
    let arr = [];


    for(let i = 0; i < articles.length; ++i){
        let article = articles[i];
        let url = article.webUrl;
        let id = article.id;

        //get title
        let title = article.webTitle;

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
        let date = article.webPublicationDate;



        let each = {};
        each['img'] = img;
        each['title'] = title;
        each['time'] = date;
        each['section'] = section;
        each['webUrl'] = url;
        each['id'] = id;
        arr[i] = each;

        if(arr.length === 10) break;
    }
    let latestTen = {latestTen: arr};

    res.json(latestTen);
});


module.exports = router;
