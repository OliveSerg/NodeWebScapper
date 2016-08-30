const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')
const site = 'http://substack.net/images/'
var results = []

request(site, function(error, response, body){
  if(error){

  } else {
    var $ = cheerio.load(body)
    $('tr').each(function(i, elem){
      var file = $(this).children('td').eq(0).text()
      var url = $(this).children('td').eq(2).children('a').attr('href')
      var type = getType($(this).children('td').eq(2).text())
      results[i] = `${file},${url},${type}\n`
    })
    writeToCSV(results)
  }

})

function getType(string){
  if (string.match(/\/$/)){
    return 'directory'
  } else if(string.match(/\.\w+$/)) {
    var type = string.match(/\.\w+$/)
    return type[0]
  } else {
    return string
  }
}

function writeToCSV(results){
  fs.writeFile("./images.csv", results.join(""), function(err){
    if (err) return console.log("Failed")
    console.log("Success!")
  })
}
