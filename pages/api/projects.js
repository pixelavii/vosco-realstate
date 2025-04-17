import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

export default async function Project(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { cityName: url } = req.body;
  try {
    const browser = await puppeteer.launch({
      headless: true,
      ignoreDefaultArgs: ['--enable-automation'],
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-blink-features=AutomationControlled'
      ]
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
      "AppleWebKit/537.36 (KHTML, like Gecko) " +
      "Chrome/114.0.0.0 Safari/537.36"
    );
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => false });
    });

    await page.goto(`https://www.magicbricks.com/new-projects-${url}/`, {
      waitUntil: 'networkidle2'
    });
    await page.waitForSelector('.mghome__prjblk__txtsec');

    const projectData = await page.$$eval(
      '.mghome__prjblk__txtsec',
      projects => projects.map(p => ({ text: p.innerText.trim() }))
    );

    await browser.close();
    return res.status(200).json({ profile: { RealState: projectData, RealStateMapData: projectData } });
  } catch (err) {
    console.error('Error fetching data:', err);
    return res.status(500).json({ message: 'Error in fetching data' });
  }
}