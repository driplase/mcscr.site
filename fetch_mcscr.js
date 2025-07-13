import https from 'https';
import fs from 'fs';

function fetchWebsite(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function main() {
  try {
    console.log('Fetching mcscr.jp...');
    const content = await fetchWebsite('https://mcscr.jp');
    fs.writeFileSync('fetch/index.html', content, 'utf-8');
    console.log('Saved to mcscr_home.html');
  } catch (error) {
    console.error('Error fetching website:', error.message);
  }
}

main(); 