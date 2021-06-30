// test url: https://example.edu/
// test file that doesn't: /vagrant/w2/d3-net/page-fetcher/newFile.html
// test file that does exist: /vagrant/w2/d3-net/page-fetcher/existingFile.html

const cliArgs = process.argv.slice(2, 4);
let urlToFetch;
let localFilePath;
for (const arg of cliArgs) {
  let urlCheck = arg.includes('http');
  if (urlCheck) {
    urlToFetch = arg;
  } else {
    localFilePath = arg;
  }
};
// console.log('urlToFetch: ', urlToFetch);
// console.log('localFilePath: ', localFilePath);

const fs = require('fs')

// Node HTTP Request:
const request = require('request');

request(urlToFetch, (error, response, body) => {

  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.

  const bytes = body.length;

  if (!error) {
    console.log('calling fs.writeFile');
    fs.writeFile(localFilePath, body, { flag: 'a' }, err => {
      //write content
      if (err) {
        console.error(err)
        return
      }
      console.log('file written successfully');
      console.log(`Downloaded and saved ${bytes} to ${localFilePath}`);
    })
  }
});
