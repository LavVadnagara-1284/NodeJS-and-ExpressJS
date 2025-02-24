const { nanoid } = require('nanoid');
const URL = require('../models/url-mdls');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if(!body) return res.status(400).json({ error: 'url is required'})
    const shortID = nanoid(8);
    await URL.create({
        shortID,
        redirectURL: body.url,
        visitHistory: [],
    })
}