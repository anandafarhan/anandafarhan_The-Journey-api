const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth');
const { uploadFile } = require('../middlewares/uploadFile');
const { register, login, checkAuth } = require('../controllers/auth');
const {
	getJourneys,
	getJourneysByDate,
	getJourney,
	addJourney,
	updateJourney,
	deleteJourney,
	getUserJourneys,
} = require('../controllers/journey');
const {
	getUserBookmarks,
	addUserBookmark,
	deleteUserBookmark,
} = require('../controllers/bookmark');

//* --------------------------  AUTH  ---------------------------- *//
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth', auth, checkAuth);

//* -----------------------  JOURNEY ROUTE  ------------------------- *//
router.get('/journeys', getJourneys);
router.get('/journey/:id', getJourney);
router.get('/my-journeys', auth, getUserJourneys);
router.post('/journey', auth, uploadFile('thumbnail'), addJourney);
router.patch('/journey/:id', auth, uploadFile('thumbnail'), updateJourney);
router.delete('/journey/:id', auth, deleteJourney);

//* -----------------------  BOOKMARK ROUTE  ------------------------- *//
router.get('/my-bookmarks', auth, getUserBookmarks);
router.post('/bookmark', auth, addUserBookmark);
router.delete('/bookmark/:id', auth, deleteUserBookmark);

module.exports = router;
