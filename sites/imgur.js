const puppeteer = require("puppeteer-core");
const downloadImage = require("../scripts/downloadImageBuffer.js");

module.exports = async url => {
	const browser = await puppeteer.launch({
		executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
	});
	const page = await browser.newPage();
	await page.goto(url);
	await page.click(".btn-wall--yes").catch(() => {});
	return await Promise.all([
		page.title(),
		page.$$eval(".image-placeholder", els => els.map(el =>
			el.getAttribute("src").replace(/(_d)?\.[a-zA-Z]{3,4}\?.+$/,
				".jpg?width=9999")))
	]).then(results => {
		browser.close();
		const promises = results[1].map(url => downloadImage(url).catch(console.log));
		return [promises, results[0].slice(0, -8), url];
	});
};