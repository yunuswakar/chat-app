let userRoutes=require('express').Router()
let adminRoutes=require('express').Router()
let userHandler=require('../fileHandler/userHandler.js')
let adminHandler=require('../fileHandler/adminHandler.js')

adminRoutes.post('/adminLogin',adminHandler.adminLogin);
adminRoutes.post('/userList',adminHandler.userList);
adminRoutes.post('/postList',adminHandler.postList);
adminRoutes.post('/getUserDetail',adminHandler.getUserDetail);
adminRoutes.post('/getPostDetail',adminHandler.getPostDetail);
adminRoutes.post('/logout',adminHandler.logout);
adminRoutes.post('/updatePostStatus',adminHandler.updatePostStatus);
adminRoutes.post('/updateUserStatus',adminHandler.updateUserStatus);
adminRoutes.post('/passwordChange',adminHandler.passwordChange);
adminRoutes.post('/emailChange',adminHandler.emailChange);
adminRoutes.post('/totalCount',adminHandler.totalCount);
adminRoutes.post('/deletePost',adminHandler.deletePost);
adminRoutes.post('/deleteUser',adminHandler.deleteUser);
adminRoutes.post('/reportList',adminHandler.reportList);
adminRoutes.post('/reportDetail',adminHandler.reportDetail);
adminRoutes.post('/deleteReport',adminHandler.deleteReport);
adminRoutes.post('/staticContentGet',adminHandler.staticContentGet)
adminRoutes.post('/StaticContentUpdate',adminHandler.StaticContentUpdate)


module.exports=adminRoutes;


