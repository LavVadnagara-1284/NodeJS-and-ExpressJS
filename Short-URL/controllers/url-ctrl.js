const { nanoid } = require('nanoid');
const URL = require('../models/url-mdl');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'url is required' })

    const shortID = nanoid(8);
    if (!shortID) {
        return res.status(400).json({ error: 'shortID is required' })
    } else {
        console.log("Generated shortID:", shortID);
    }

    try {
        await URL.create({
            shortID,
            redirectURL: body.url,
            visitHistory: [],
            createdBy: req.user._id,
        })
        // const newURL = await URL.create({
        //     shortID,
        //     redirectURL: body.url,
        //     visitHistory: [],
        // })

        // return res.render('home', {id: newURL.shortID})
        // return res.redirect(`/?id=${newURL.shortID}`);
        return res.redirect('/');

    } catch (err) {
        console.error('Error generating short URL:', err);
        return res.status(500).json({ error: 'Failed to create URL, Internal server error' })
    }
}

async function handleGetAnalytics(req, res) {
    const shortID = req.params.shortID;
    const result = await URL.findOne({ shortID })
    return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory })
}

async function handleGetShortURL(req, res) {
    const shortID = req.params.shortID;
    try {
        const entry = await URL.findOneAndUpdate(
            { shortID },
            { $push: { visitHistory: { timestamp: Date.now() } } },
            { new: true });

        if (!entry) return res.status(404).json({ error: 'Short ID not found' })
        res.redirect(entry.redirectURL)
    }
    catch (err) {
        console.error('Error redirecting to URL:', err);
        return res.status(500).json({ error: 'Failed to redirect, Internal server error' })
    }
}

module.exports = {
    handleGenerateNewShortURL, handleGetAnalytics, handleGetShortURL
}