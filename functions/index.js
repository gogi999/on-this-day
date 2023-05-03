const functions = require("firebase-functions");
const scraper = require('./scraper.js');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

const getToday = () => {
    const today = new Date();

    return `${today.getDate()}${today.getMonth() + 1}${today.getFullYear()}`;
}

exports.pubsub = functions
    .region('europe-west3')
    .runWith({ memory: '2GB' })
    .pubsub.schedule('0 0 * * *')
    .timeZone('Europe/Sarajevo')
    .onRun(async () => {
        try {
            const scrapedData = await scraper.scrapeData();
            await db.collection('days').doc(getToday()).set(scrapedData);
        } catch (err) {
            throw new Error(err);
        }
    });
