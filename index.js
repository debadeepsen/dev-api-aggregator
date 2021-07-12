const { default: axios } = require("axios");
const fs = require("fs");
const TOTAL = 100;
const PER_PAGE = 100;

let articles = [];
function getData(page) {
    axios.get(`https://dev.to/api/articles/latest?per_page=${PER_PAGE}&page=${page}`)
        .then(d => {
            articles = articles.concat(d.data);
            console.log(`Page ${page} processed.`);

            if (page < TOTAL) {
                getData(page + 1);
            }
            else {
                console.log("Writing to file...");
                fs.writeFileSync("articles/articles.json", JSON.stringify(articles));
                console.log("Finished!");
            }
        })
}


getData(1);