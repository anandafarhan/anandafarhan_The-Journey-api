const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth');
const { uploadFile } = require('../middlewares/uploadFile');
const { uploadFileG } = require('../middlewares/uploadFileG');
const { register, login, checkAuth } = require('../controllers/auth');
const {
	getJourneys,
	getJourneysByDate,
	getJourney,
	addJourney,
	updateJourney,
	deleteJourney,
	getUserJourneys,
	updateJourneyNF,
} = require('../controllers/journey');
const {
	getUserBookmarks,
	addOrDeleteUserBookmark,
	getUserBookmarksId,
} = require('../controllers/bookmark');
const { updateUser } = require('../controllers/user');

//* --------------------------  AUTH  ---------------------------- *//
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth', auth, checkAuth);
router.patch('/user', auth, uploadFile('avatar'), updateUser);

//* -----------------------  JOURNEY ROUTE  ------------------------- *//
router.get('/journeys', getJourneys);
router.get('/journey/:id', getJourney);
router.get('/my-journeys', auth, getUserJourneys);
router.post('/journey', auth, uploadFile('thumbnail'), addJourney);
router.patch('/journey/:id', auth, uploadFile('thumbnail'), updateJourney);
router.patch('/journeyNF/:id', auth, updateJourneyNF);
router.delete('/journey/:id', auth, deleteJourney);

//* -----------------------  BOOKMARK ROUTE  ------------------------- *//
router.get('/my-bookmarks', auth, getUserBookmarks);
router.get('/my-bookmarksId', auth, getUserBookmarksId);
router.post('/bookmark', auth, addOrDeleteUserBookmark);

router.post('/upload', auth, uploadFileG('image'));

module.exports = router;
