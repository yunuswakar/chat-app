var express = require("express");
var router = express.Router();
const USERS = require("../app/auth/controller/auth.controller");
const STATIC = require("../app/static/controller/static.controller");
const SUBSCRIPTION = require("../app/subscription/controller/subscription.controller");
const STORE = require("../app/store/controller/store.controller");
const CRYSTAL = require("../app/crystal/controller/crystal.controller");
const POST = require("../app/post/controller/post.controller");
const HOME = require("../app/home/controller/home.controller");
const RATING = require("../app/rating/controller/rating.controller");
const NOTIFICATIONS = require("../app/notifications/controller/notifications.controller");
const ADDEDCRYSTAL = require("../app/addedCrystal/controller/addedCrystal.controller");
const OPERATIONLOG = require("../app/operationLog/controller/operationLog.controller");
const CRITERIA = require("../app/contentCriteria/controller/contentCriteria.controller");
const UPDATETABLE = require("../app/updateTable/controller/updateTable.controller");
const PAGE = require("../app/pages/controller/pages.controller");
const CREDIT = require("../app/credit/controller/credit.controller");

const handleResponse = require("../middlewares/handleResponse");
const auth = require("../middlewares/auth");
require("express-group-routes");
const responseMessage = require("../helper/responseMessages");
const { authenticate } = require("../middlewares/auth");
const { static } = require("express");
const subscriptionModel = require("../app/subscription/model/subscription.model");

const setResponseObject =
  require("../helper/commonFunctions").setResponseObject;
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Crystal Server" });
});

router.group("/auth", (user) => {
  user.post("/signUp", USERS.signup, handleResponse.RESPONSE);
  user.post("/login", USERS.login, handleResponse.RESPONSE);
  user.put("/forgotPassword", USERS.forgotPassword, handleResponse.RESPONSE);
  user.put(
    "/resetPassword/:token",
    USERS.resetPassword,
    handleResponse.RESPONSE
  );
  user.put(
    "/changePassword",
    auth.authenticate,
    USERS.changePassword,
    handleResponse.RESPONSE
  );
  user.put(
    "/updateProfile/:deviceId",
    auth.authenticate,
    USERS.updateProfile,
    handleResponse.RESPONSE
  );
  user.delete(
    "/delete/:id",
    auth.authenticate,
    USERS.delete,
    handleResponse.RESPONSE
  );
  user.get(
    "/getById",
    auth.authenticate,
    USERS.getById,
    handleResponse.RESPONSE
  );
  user.get(
    "/getUsers",
    auth.authenticate,
    USERS.getUsers,
    handleResponse.RESPONSE
  );
  user.get(
    "/dashboardInfo",
    auth.authenticate,
    USERS.dashboardInfo,
    handleResponse.RESPONSE
  );
  user.post(
    "/toggleButton",
    auth.authenticate,
    USERS.toggleButton,
    handleResponse.RESPONSE
  );
  user.post("/sendVerifyLink", USERS.sendVerifyLink, handleResponse.RESPONSE);
  user.get("/verifyLink", USERS.verifyLink, handleResponse.RESPONSE);
  user.get("/getAllCountry", USERS.getAllCountry, handleResponse.RESPONSE);
  user.get("/getState", USERS.getState, handleResponse.RESPONSE);
  user.post(
    "/blockUser",
    auth.authenticate,
    USERS.blockUser,
    handleResponse.RESPONSE
  );
  user.get("/getUser", USERS.getUser, handleResponse.RESPONSE);
  user.put(
    "/editProfile",
    auth.authenticate,
    USERS.editProfile,
    handleResponse.RESPONSE
  );
  user.get("/getAllUser", USERS.getAllUser, handleResponse.RESPONSE);
  user.post("/forgetPassword", USERS.forgetPassword, handleResponse.RESPONSE);
  user.get("/logout", auth.authenticate, USERS.logout, handleResponse.RESPONSE);
});
router.group("/static", (static) => {
  static.post(
    "/addContent",
    auth.authenticate,
    STATIC.addContent,
    handleResponse.RESPONSE
  );
  static.get("/getById/:id", STATIC.getById, handleResponse.RESPONSE);
  static.delete(
    "/delete/:id",
    auth.authenticate,
    STATIC.delete,
    handleResponse.RESPONSE
  );
  static.get(
    "/getContents",
    auth.authenticate,
    STATIC.getContents,
    handleResponse.RESPONSE
  );
  static.put(
    "/updateContent/:id",
    auth.authenticate,
    STATIC.updateContent,
    handleResponse.RESPONSE
  );
  static.get(
    "/getByHeading/:heading",
    STATIC.getByHeading,
    handleResponse.RESPONSE
  );
  static.get("/getOne/:heading", STATIC.getOne, handleResponse.RESPONSE);
  static.get("/getAllData", STATIC.getAllData, handleResponse.RESPONSE);
  static.put(
    "/updateTutorial/:id",
    auth.authenticate,
    STATIC.updateTutorial,
    handleResponse.RESPONSE
  );
  static.get(
    "/getText",
    auth.authenticate,
    STATIC.getText,
    handleResponse.RESPONSE
  );
  static.put(
    "/updateText/:id",
    auth.authenticate,
    STATIC.updateText,
    handleResponse.RESPONSE
  );
});


//subscription===========
router.group("/subscription", (subscription) => {
  subscription.post(
    "/addSubscription",
    auth.authenticate,
    SUBSCRIPTION.addSubscription,
    handleResponse.RESPONSE
  );
  subscription.get(
    "/getById/:id",
    auth.authenticate,
    SUBSCRIPTION.getById,
    handleResponse.RESPONSE
  );
  subscription.get(
    "/getSubscription",
    auth.authenticate,
    SUBSCRIPTION.getSubscription,
    handleResponse.RESPONSE
  );
  subscription.delete(
    "/delete/:id",
    auth.authenticate,
    SUBSCRIPTION.delete,
    handleResponse.RESPONSE
  );
  subscription.put(
    "/updateSubscription/:id",
    auth.authenticate,
    SUBSCRIPTION.updateSubscription,
    handleResponse.RESPONSE
  );
  subscription.post("/payment", SUBSCRIPTION.payment, handleResponse.RESPONSE);
  subscription.get(
    "/getPayment",
   
    SUBSCRIPTION.getPayment,
    handleResponse.RESPONSE
  );
  subscription.get(
    "/paymentHistory",
    auth.authenticate,
    SUBSCRIPTION.paymentHistory,
    handleResponse.RESPONSE
  );
  subscription.get(
    "/getAll",
    auth.authenticate,
    SUBSCRIPTION.getAll,
    handleResponse.RESPONSE
  );
  subscription.get(
    "/paymentCron",
    SUBSCRIPTION.paymentCron,
    handleResponse.RESPONSE
  );
  subscription.get(
    "/getAllPayment",
    SUBSCRIPTION.getAllPayment,
    handleResponse.RESPONSE
  );
  subscription.delete(
    "/deletePayment/:id",
    auth.authenticate,
    SUBSCRIPTION.deletePayment,
    handleResponse.RESPONSE
  );
});


//----------------

router.group("/store", (store) => {
  store.post(
    "/addStore",
    auth.authenticate,
    STORE.addStore,
    handleResponse.RESPONSE
  );
  store.get("/getById/:id", STORE.getById, handleResponse.RESPONSE);
  store.get("/getStores", STORE.getStores, handleResponse.RESPONSE);
  store.delete(
    "/delete/:id",
    auth.authenticate,
    STORE.delete,
    handleResponse.RESPONSE
  );
  store.put(
    "/updateStore/:id",
    auth.authenticate,
    STORE.updateStore,
    handleResponse.RESPONSE
  );
  store.get("/getSortingStore", STORE.getSortingStore, handleResponse.RESPONSE);
  store.post(
    "/getFilterStore",
    auth.authenticate,
    STORE.getFilterStore,
    handleResponse.RESPONSE
  );
  store.post("/searchStore", STORE.searchStore, handleResponse.RESPONSE);
  store.get("/getAllStore", STORE.getAllStore, handleResponse.RESPONSE);
  store.get("/getStates", STORE.getStates, handleResponse.RESPONSE);
  store.get("/getCity", STORE.getCity, handleResponse.RESPONSE);
  store.get("/getAllStores", STORE.getAllStores, handleResponse.RESPONSE);
  store.post("/importStore", STORE.importStore, handleResponse.RESPONSE);
});
router.group("/crystal", (crystal) => {
  crystal.post("/addCrystal", CRYSTAL.addCrystal, handleResponse.RESPONSE);
  crystal.get(
    "/getAllCrystal",
    auth.authenticate,
    CRYSTAL.getAllCrystal,
    handleResponse.RESPONSE
  );
  crystal.get(
    "/getById/:id",
    auth.authenticate,
    CRYSTAL.getById,
    handleResponse.RESPONSE
  );
  crystal.get(
    "/getCrystals",
    auth.authenticate,
    CRYSTAL.getCrystals,
    handleResponse.RESPONSE
  );
  crystal.delete(
    "/delete/:id",
    auth.authenticate,
    CRYSTAL.delete,
    handleResponse.RESPONSE
  );
  crystal.put(
    "/updateCrystal/:id",
    auth.authenticate,
    CRYSTAL.updateCrystal,
    handleResponse.RESPONSE
  );
  crystal.get(
    "/getCrystalCount",
    auth.authenticate,
    CRYSTAL.getCrystalCount,
    handleResponse.RESPONSE
  );
  crystal.post(
    "/favourite",
    auth.authenticate,
    CRYSTAL.favourite,
    handleResponse.RESPONSE
  );
  crystal.post(
    "/addNotes",
    auth.authenticate,
    CRYSTAL.addNotes,
    handleResponse.RESPONSE
  );
  crystal.get(
    "/getCrystal",
    auth.authenticate,
    CRYSTAL.getCrystal,
    handleResponse.RESPONSE
  );
  crystal.post(
    "/lookupFilter",
    auth.authenticate,
    CRYSTAL.lookupFilter,
    handleResponse.RESPONSE
  );
  crystal.get(
    "/myFavourite",
    auth.authenticate,
    CRYSTAL.myFavourite,
    handleResponse.RESPONSE
  );
  crystal.get(
    "/lookupFilterData",
    auth.authenticate,
    CRYSTAL.lookupFilterData,
    handleResponse.RESPONSE
  );
  crystal.post(
    "/favouriteFilter",
    auth.authenticate,
    CRYSTAL.favouriteFilter,
    handleResponse.RESPONSE
  );
  crystal.get(
    "/getAllNote",
    auth.authenticate,
    ADDEDCRYSTAL.getAllNote,
    handleResponse.RESPONSE
  );
  crystal.post(
    "/saveCrystal",
    auth.authenticate,
    ADDEDCRYSTAL.saveCrystal,
    handleResponse.RESPONSE
  );
  crystal.get(
    "/crystalHistory",
    auth.authenticate,
    ADDEDCRYSTAL.crystalHistory,
    handleResponse.RESPONSE
  );
  crystal.post(
    "/addFavourite",
    auth.authenticate,
    ADDEDCRYSTAL.addFavourite,
    handleResponse.RESPONSE
  );
  crystal.post(
    "/note",
    auth.authenticate,
    ADDEDCRYSTAL.note,
    handleResponse.RESPONSE
  );
  crystal.delete(
    "/deleteCrystal/:id",
    auth.authenticate,
    ADDEDCRYSTAL.deleteCrystal,
    handleResponse.RESPONSE
  );
  crystal.get(
    "/viewCrsyatl/:id",
    auth.authenticate,
    ADDEDCRYSTAL.viewCrsyatl,
    handleResponse.RESPONSE
  );
  crystal.put(
    "/editCrystal/:id",
    auth.authenticate,
    ADDEDCRYSTAL.editCrystal,
    handleResponse.RESPONSE
  );
  crystal.put(
    "/editIdentification/:id",
    auth.authenticate,
    ADDEDCRYSTAL.editIdentification,
    handleResponse.RESPONSE
  );
  crystal.get(
    "/favouriteHistory",
    auth.authenticate,
    ADDEDCRYSTAL.favouriteHistory,
    handleResponse.RESPONSE
  );
  crystal.get(
    "/wrapperApi",
    auth.authenticate,
    CRYSTAL.wrapperApi,
    handleResponse.RESPONSE
  );
  crystal.get(
    "/filterCrystal",
    auth.authenticate,
    ADDEDCRYSTAL.filterCrystal,
    handleResponse.RESPONSE
  );
  crystal.post("/scanningData", auth.authenticate, CRYSTAL.scanningData);
  crystal.put("/updateFlag/:id", CRYSTAL.updateFlag, handleResponse.RESPONSE);
  crystal.get(
    "/getMyCrystal",
    auth.authenticate,
    ADDEDCRYSTAL.getMyCrystal,
    handleResponse.RESPONSE
  );
  crystal.put("/changeBrain", CRYSTAL.changeBrain, handleResponse.RESPONSE);
  crystal.post(
    "/importCrystal",
    CRYSTAL.importCrystal,
    handleResponse.RESPONSE
  );
});
router.group("/post", (post) => {
  post.post(
    "/createPost",
    auth.authenticate,
    POST.createPost,
    handleResponse.RESPONSE
  );
  post.get(
    "/getMyPost",
    auth.authenticate,
    POST.getMyPost,
    handleResponse.RESPONSE
  );
  post.get(
    "/getAllPost",
    auth.authenticate,
    POST.getAllPost,
    handleResponse.RESPONSE
  );
  post.post(
    "/blockPost",
    auth.authenticate,
    POST.blockPost,
    handleResponse.RESPONSE
  );
  post.get(
    "/unblockPost/:id",
    auth.authenticate,
    POST.unblockPost,
    handleResponse.RESPONSE
  );
  post.get(
    "/getById/:id",
    auth.authenticate,
    POST.getById,
    handleResponse.RESPONSE
  );
  post.post(
    "/likeAndDislikePost",
    auth.authenticate,
    POST.likeAndDislikePost,
    handleResponse.RESPONSE
  );
  post.post(
    "/sendReport",
    auth.authenticate,
    POST.sendReport,
    handleResponse.RESPONSE
  );
  post.get(
    "/trendingPost",
    auth.authenticate,
    POST.trendingPost,
    handleResponse.RESPONSE
  );
  post.post(
    "/hidePost",
    auth.authenticate,
    POST.hidePost,
    handleResponse.RESPONSE
  );
  post.get(
    "/allPost",
    auth.authenticate,
    POST.allPost,
    handleResponse.RESPONSE
  );
  post.get("/myPost", auth.authenticate, POST.myPost, handleResponse.RESPONSE);
  post.get(
    "/getAllReport",
    auth.authenticate,
    POST.getAllReport,
    handleResponse.RESPONSE
  );
  post.get("/getAll", POST.getAll, handleResponse.RESPONSE);
  post.delete(
    "/delete/:id",
    auth.authenticate,
    POST.delete,
    handleResponse.RESPONSE
  );
  post.delete(
    "/deleteReport/:id",
    auth.authenticate,
    POST.deleteReport,
    handleResponse.RESPONSE
  );
  post.get(
    "/allpost",
    auth.authenticate,
    POST.allpost,
    handleResponse.RESPONSE
  );
});
router.group("/home", (home) => {
  home.get("/getById/:id", HOME.getById, handleResponse.RESPONSE);
  home.delete(
    "/delete/:id",
    auth.authenticate,
    HOME.delete,
    handleResponse.RESPONSE
  );
  home.post(
    "/addGroup",
    auth.authenticate,
    HOME.addGroup,
    handleResponse.RESPONSE
  );
  home.post(
    "/addHomeContent",
    auth.authenticate,
    HOME.addHomeContent,
    handleResponse.RESPONSE
  );
  home.get(
    "/homeData",
    auth.authenticate,
    HOME.homeData,
    handleResponse.RESPONSE
  );
  home.put(
    "/updateGroup/:id",
    auth.authenticate,
    HOME.updateGroup,
    handleResponse.RESPONSE
  );
  home.put(
    "/updateHomeContent/:id",
    HOME.updateHomeContent,
    handleResponse.RESPONSE
  );
  home.post(
    "/hidePost",
    auth.authenticate,
    HOME.hidePost,
    handleResponse.RESPONSE
  );
  home.get(
    "/getGroupById/:id",
    auth.authenticate,
    HOME.getGroupById,
    handleResponse.RESPONSE
  );
  home.delete(
    "/deleteGroup/:id",
    auth.authenticate,
    HOME.deleteGroup,
    handleResponse.RESPONSE
  );
  home.get(
    "/getAllGroup",
    auth.authenticate,
    HOME.getAllGroup,
    handleResponse.RESPONSE
  );
  home.get("/getAll", auth.authenticate, HOME.getAll, handleResponse.RESPONSE);
  home.get(
    "/getAllContent",
    auth.authenticate,
    HOME.getAllContent,
    handleResponse.RESPONSE
  );
  home.get(
    "/getContents",
    auth.authenticate,
    HOME.getContents,
    handleResponse.RESPONSE
  );

  home.get(
    "/getGroups",
    auth.authenticate,
    HOME.getGroups,
    handleResponse.RESPONSE
  );
  home.post(
    "/removePost",
    auth.authenticate,
    HOME.removePost,
    handleResponse.RESPONSE
  );
  home.post(
    "/interestFlag",
    auth.authenticate,
    HOME.interestFlag,
    handleResponse.RESPONSE
  );
  home.post("/dropdownGroup", HOME.dropdownGroup, handleResponse.RESPONSE);
  home.post("/filterGroup", HOME.filterGroup, handleResponse.RESPONSE);
});

router.group("/rate", (rate) => {
  rate.post(
    "/rating",
    auth.authenticate,
    RATING.rating,
    handleResponse.RESPONSE
  );
  rate.get("/getRating", RATING.getRating, handleResponse.RESPONSE);
  rate.get(
    "/getAllRating",
    auth.authenticate,
    RATING.getAllRating,
    handleResponse.RESPONSE
  );
  rate.get(
    "/userRating",
    auth.authenticate,
    RATING.userRating,
    handleResponse.RESPONSE
  );
});
router.group("/notification", (notification) => {
  notification.get(
    "/getNotification",
    auth.authenticate,
    NOTIFICATIONS.getNotification,
    handleResponse.RESPONSE
  );
  notification.post(
    "/createNotification",
    auth.authenticate,
    NOTIFICATIONS.createNotification,
    handleResponse.RESPONSE
  );
  notification.get(
    "/sendNotificationUser",
    NOTIFICATIONS.sendNotificationUser,
    handleResponse.RESPONSE
  );
  notification.delete(
    "/delete/:id",
    NOTIFICATIONS.delete,
    handleResponse.RESPONSE
  );
  notification.get(
    "/delete/:id",
    NOTIFICATIONS.delete,
    handleResponse.RESPONSE
  );
  notification.get(
    "/getNotificationData",
    NOTIFICATIONS.getNotificationData,
    handleResponse.RESPONSE
  );
});

router.group("/criteria", (text) => {
  text.post(
    "/addCriteria",
    auth.authenticate,
    CRITERIA.addCriteria,
    handleResponse.RESPONSE
  );
  text.get(
    "/getById/:id",
    auth.authenticate,
    CRITERIA.getById,
    handleResponse.RESPONSE
  );
  text.get(
    "/getAll",
    auth.authenticate,
    CRITERIA.getAll,
    handleResponse.RESPONSE
  );
  text.delete(
    "/delete/:id",
    auth.authenticate,
    CRITERIA.delete,
    handleResponse.RESPONSE
  );
  text.put(
    "/updateCriteria/:id",
    CRITERIA.updateCriteria,
    handleResponse.RESPONSE
  );
  text.put(
    "/updateCriteriaData/:id",
    CRITERIA.updateCriteriaData,
    handleResponse.RESPONSE
  );
});
router.group("/operation", (operation) => {
  operation.get(
    "/getApiLog",
    auth.authenticate,
    OPERATIONLOG.getApiLog,
    handleResponse.RESPONSE
  );
  operation.delete("/delete/:id", OPERATIONLOG.delete, handleResponse.RESPONSE);
  operation.get(
    "/getOne/:id",
    auth.authenticate,
    OPERATIONLOG.getOne,
    handleResponse.RESPONSE
  );
  operation.get(
    "/logTable",
    auth.authenticate,
    OPERATIONLOG.logTable,
    handleResponse.RESPONSE
  );
  operation.post("/apiData", OPERATIONLOG.apiData, handleResponse.RESPONSE);
  operation.post("/logData", OPERATIONLOG.logData, handleResponse.RESPONSE);
});
router.group("/updateTable", (updateTable) => {
  updateTable.put(
    "/addTable",
    auth.authenticate,
    UPDATETABLE.addTable,
    handleResponse.RESPONSE
  );
  updateTable.delete(
    "/delete/:id",
    auth.authenticate,
    UPDATETABLE.delete,
    handleResponse.RESPONSE
  );
  updateTable.get(
    "/getById/:id",
    auth.authenticate,
    UPDATETABLE.getById,
    handleResponse.RESPONSE
  );
  updateTable.get("/getTable", UPDATETABLE.getTable, handleResponse.RESPONSE);
});
router.group("/page", (page) => {
  page.post(
    "/addPage",
    auth.authenticate,
    PAGE.addPage,
    handleResponse.RESPONSE
  );
  page.get(
    "/getPages",
    auth.authenticate,
    PAGE.getPages,
    handleResponse.RESPONSE
  );
  page.delete(
    "/delete/:id",
    auth.authenticate,
    PAGE.delete,
    handleResponse.RESPONSE
  );
  page.get(
    "/getAllPage",
    auth.authenticate,
    PAGE.getAllPage,
    handleResponse.RESPONSE
  );
});
router.group("/credit", (credit) => {
  credit.post(
    "/addCredit",
    auth.authenticate,
    CREDIT.addCredit,
    handleResponse.RESPONSE
  );
  credit.get(
    "/getAllCredit",
    auth.authenticate,
    CREDIT.getAllCredit,
    handleResponse.RESPONSE
  );
  credit.delete(
    "/delete/:id",
    auth.authenticate,
    CREDIT.delete,
    handleResponse.RESPONSE
  );
  credit.get(
    "/getCredits",
    auth.authenticate,
    CREDIT.getCredits,
    handleResponse.RESPONSE
  );
  credit.get("/creditCode", CREDIT.creditCode, handleResponse.RESPONSE);
  credit.get("/getOne/:id", CREDIT.getOne, handleResponse.RESPONSE);
  credit.get("/getUserCredit", CREDIT.getUserCredit, handleResponse.RESPONSE);
});
module.exports = router;
