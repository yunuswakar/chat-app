const express = require('express');
const router = express.Router();
const { signup } = require('../../controller/userController');
const { login } = require('../../controller/userController');
const { setPin } = require('../../controller/userController');
const { verifyOtp } = require('../../controller/userController');
const { resendOtp } = require('../../controller/userController');
const { resendOtpOnMail } = require('../../controller/userController');
const { forgotPassword } = require('../../controller/userController');
const { resetPassword } = require('../../controller/userController');
const { userNameExist } = require('../../controller/userController');
const { userDetail } = require('../../controller/userController');
const { updateProfile } = require('../../controller/userController');
const { changePassword } = require('../../controller/userController');
const {verifyOtpUpdate} = require('../../controller/userController');
const{pinExists} = require('../../controller/userController');
const {resetPin} = require('../../controller/userController');
const{searchContact} = require('../../controller/userController');
//const {receiverListCorrection} = require('../../controller/userController');


const {social} = require('../../controller/userController');
const {socialLogin}= require('../../controller/userController');
// const{numberExists11} = require('../../controller/userController')
//const{stripeSignup} = require('../../controller/userController');
const{numberExists} = require('../../controller/userController');
const{isNumberValid}=require('../../controller/userController')
const {searchUser} = require('../../controller/userController');
const {notificationsList} = require('../../controller/userController');

const{approveAndReject} = require('../../controller/userController');
const{listContact} = require('../../controller/userController')
const {addContact} =require('../../controller/userController')
const {editContact} =require('../../controller/userController')
const {deleteContact} =require('../../controller/userController')

const{getVendors} = require('../../controller/userController');
//const{approveAndReject} = require('../../controller/userController');
const{addMoneyRequest} = require('../../controller/userController');
const{withdrawMoneyRequest} = require('../../controller/userController');
const{sendMoneyRequest} = require('../../controller/userController');

const {searchContactList} = require('../../controller/userController')
const {addMoney} =require('../../controller/userController')
const {verifyToken} =  require('../../middelware/auth');
const { basicAuthUser } = require('../../middelware/auth');
  const {appParsing}  = require('../../middelware/multiParseParsing');
  const {
    signUpValidation,
   // socialSignUpValidation,
    loginValidation,
    setPinValidation,
    verifyOtpValidation,
    userIdValidation,
    emailValidation,
    resetPasswordValidation,
    userNameValidation,
  } = require('../../middelware/validation');


router.post('/signup',signUpValidation, signup);

router.post('/login', basicAuthUser,loginValidation,login);
router.post('/setPin', basicAuthUser, setPinValidation,setPin);
router.post('/verifyOtp', verifyOtpValidation,verifyOtp);
router.post( '/resendOtp', basicAuthUser, userIdValidation,resendOtp);
router.post( '/resendOtpOnMail', basicAuthUser, userIdValidation,resendOtpOnMail);
router.post('/forgotPassword',basicAuthUser, emailValidation, forgotPassword);
router.post( '/resetPassword', basicAuthUser,resetPasswordValidation,resetPassword)
router.post('/userNameExist', basicAuthUser, userNameValidation,userNameExist);

router.get( '/userDetail/:userId', basicAuthUser,verifyToken, userDetail);  // pramod

router.post( '/updateProfile', basicAuthUser, verifyToken,userIdValidation,updateProfile);
router.post( '/changePassword',basicAuthUser, verifyToken, changePassword);
router.post( '/verifyOtpUpdate',  basicAuthUser, verifyToken, verifyOtpUpdate);
router.post( '/pinExists', basicAuthUser, pinExists);
router.post( '/resetPin', basicAuthUser, userIdValidation, resetPin);
router.post( '/social',social);
router.post( '/socialLogin',socialLogin);

//router.post( '/stripeSignup',stripeSignup);

router.post( '/numberExists',numberExists);
router.post( '/isnumbervalid', isNumberValid);
router.post( '/searchUser',searchUser);
router.post( '/notificationsList',notificationsList);

resendOtpOnMail


//router.post( '/approveAndReject',approveAndReject);
router.post('/addMoneyRequest',addMoneyRequest);
router.post('/withdrawMoneyRequest',withdrawMoneyRequest);
router.post('/sendMoneyRequest',sendMoneyRequest);
router.post('/getVendors',getVendors);
router.post('/addMoney',addMoney);


// router.post( '/numberExists11',numberExists11);
router.post( '/approveAndReject',approveAndReject);
router.post( '/searchContact',searchContact);

router.post( '/addContact',addContact);
router.post( '/editContact',editContact);
router.post( '/deleteContact',deleteContact);


router.post( '/listContact',listContact);
router.post( '/searchContactList',searchContactList);

module.exports = router;