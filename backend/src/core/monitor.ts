import axios from 'axios';

async function checkApiHealth(url: string) {
  const start = Date.now();

  try {
    const response = await axios.get(url, { timeout: 5000 });
    const duration = Date.now() - start;

    console.log(`[Service URL - OK] :: [${url}]`);
    console.log(`[Status] :: ${response.status}`);
    console.log(`[Response time] :: ${duration}ms`);
    console.log(`[Date] :: ${new Date().toLocaleString()}`);
  } catch (error: any) {
    const duration = Date.now() - start;
    
    console.error(`[Service URL not working!] :: [${url}]`);
    console.log(`[Error] :: ${error.message}`);
    console.log(`[Attempt lasted ${duration}ms]`);
  }
}

checkApiHealth('https://www.google.com');
checkApiHealth('https://api.github.com/users/octocat');
