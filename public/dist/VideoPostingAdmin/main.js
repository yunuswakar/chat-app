(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _my_profile_my_profile_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./my-profile/my-profile.component */ "./src/app/my-profile/my-profile.component.ts");
/* harmony import */ var _component_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./component/sidebar/sidebar.component */ "./src/app/component/sidebar/sidebar.component.ts");
/* harmony import */ var _component_header_header_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./component/header/header.component */ "./src/app/component/header/header.component.ts");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var _app_guard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app.guard */ "./src/app/app.guard.ts");
/* harmony import */ var _post_management_post_management_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./post-management/post-management.component */ "./src/app/post-management/post-management.component.ts");
/* harmony import */ var _user_management_user_management_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./user-management/user-management.component */ "./src/app/user-management/user-management.component.ts");
/* harmony import */ var _user_management_user_detail_user_detail_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./user-management/user-detail/user-detail.component */ "./src/app/user-management/user-detail/user-detail.component.ts");
/* harmony import */ var _post_management_post_detail_post_detail_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./post-management/post-detail/post-detail.component */ "./src/app/post-management/post-detail/post-detail.component.ts");
/* harmony import */ var _static_content_static_content_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./static-content/static-content.component */ "./src/app/static-content/static-content.component.ts");
/* harmony import */ var _static_content_edit_static_content_edit_static_content_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./static-content/edit-static-content/edit-static-content.component */ "./src/app/static-content/edit-static-content/edit-static-content.component.ts");
/* harmony import */ var _my_profile_edit_profile_edit_profile_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./my-profile/edit-profile/edit-profile.component */ "./src/app/my-profile/edit-profile/edit-profile.component.ts");
/* harmony import */ var _reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./reset-password/reset-password.component */ "./src/app/reset-password/reset-password.component.ts");
/* harmony import */ var _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./forgot-password/forgot-password.component */ "./src/app/forgot-password/forgot-password.component.ts");
/* harmony import */ var _report_management_report_management_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./report-management/report-management.component */ "./src/app/report-management/report-management.component.ts");
/* harmony import */ var _report_management_report_detail_report_detail_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./report-management/report-detail/report-detail.component */ "./src/app/report-management/report-detail/report-detail.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















var routes = [
    { path: '', component: _login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"] },
    { path: "login", component: _login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"] },
    { path: "resetPassword", component: _reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_15__["ResetPasswordComponent"] },
    { path: "forgotPassword", component: _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_16__["ForgotPasswordComponent"] },
    { path: "header", component: _component_header_header_component__WEBPACK_IMPORTED_MODULE_5__["HeaderComponent"] },
    // { path: "dashboard",component:DashboardComponent},
    { path: "admin", component: _component_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_4__["SidebarComponent"],
        children: [
            { path: "dashboard", component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_6__["DashboardComponent"], canActivate: [_app_guard__WEBPACK_IMPORTED_MODULE_7__["AppGuard"]] },
            { path: "postManagement", component: _post_management_post_management_component__WEBPACK_IMPORTED_MODULE_8__["PostManagementComponent"], canActivate: [_app_guard__WEBPACK_IMPORTED_MODULE_7__["AppGuard"]] },
            { path: "userManagement", component: _user_management_user_management_component__WEBPACK_IMPORTED_MODULE_9__["UserManagementComponent"], canActivate: [_app_guard__WEBPACK_IMPORTED_MODULE_7__["AppGuard"]] },
            { path: "userDetails/:id", component: _user_management_user_detail_user_detail_component__WEBPACK_IMPORTED_MODULE_10__["UserDetailComponent"], canActivate: [_app_guard__WEBPACK_IMPORTED_MODULE_7__["AppGuard"]] },
            { path: "postDetails/:id", component: _post_management_post_detail_post_detail_component__WEBPACK_IMPORTED_MODULE_11__["PostDetailComponent"], canActivate: [_app_guard__WEBPACK_IMPORTED_MODULE_7__["AppGuard"]] },
            { path: "reportDetails/:id", component: _report_management_report_detail_report_detail_component__WEBPACK_IMPORTED_MODULE_18__["ReportDetailComponent"], canActivate: [_app_guard__WEBPACK_IMPORTED_MODULE_7__["AppGuard"]] },
            { path: "staticContent", component: _static_content_static_content_component__WEBPACK_IMPORTED_MODULE_12__["StaticContentComponent"], canActivate: [_app_guard__WEBPACK_IMPORTED_MODULE_7__["AppGuard"]] },
            { path: "editStaticContent/:id", component: _static_content_edit_static_content_edit_static_content_component__WEBPACK_IMPORTED_MODULE_13__["EditStaticContentComponent"], canActivate: [_app_guard__WEBPACK_IMPORTED_MODULE_7__["AppGuard"]] },
            { path: "myProfile", component: _my_profile_my_profile_component__WEBPACK_IMPORTED_MODULE_3__["MyProfileComponent"], canActivate: [_app_guard__WEBPACK_IMPORTED_MODULE_7__["AppGuard"]] },
            { path: "editProfile", component: _my_profile_edit_profile_edit_profile_component__WEBPACK_IMPORTED_MODULE_14__["EditProfileComponent"], canActivate: [_app_guard__WEBPACK_IMPORTED_MODULE_7__["AppGuard"]] },
            { path: "reportManagement", component: _report_management_report_management_component__WEBPACK_IMPORTED_MODULE_17__["ReportManagementComponent"], canActivate: [_app_guard__WEBPACK_IMPORTED_MODULE_7__["AppGuard"]] },
            { path: '**', redirectTo: 'admin/dashboard', pathMatch: 'full' },
        ]
    },
    { path: '**', redirectTo: 'admin/dashboard', pathMatch: 'full' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'VideoPostingAdmin';
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.guard.ts":
/*!******************************!*\
  !*** ./src/app/app.guard.ts ***!
  \******************************/
/*! exports provided: AppGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppGuard", function() { return AppGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppGuard = /** @class */ (function () {
    function AppGuard(router) {
        this.router = router;
    }
    AppGuard.prototype.canActivate = function (route, state) {
        if (localStorage.getItem('LOGINTOKEN') != null) {
            return true;
        }
        // else{
        this.router.navigate(['/login']);
        return false;
        // }
    };
    AppGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AppGuard);
    return AppGuard;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng2-ckeditor */ "./node_modules/ng2-ckeditor/lib/ng2-ckeditor.js");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ng2_ckeditor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _component_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./component/sidebar/sidebar.component */ "./src/app/component/sidebar/sidebar.component.ts");
/* harmony import */ var _component_header_header_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./component/header/header.component */ "./src/app/component/header/header.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./forgot-password/forgot-password.component */ "./src/app/forgot-password/forgot-password.component.ts");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var _user_management_user_management_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./user-management/user-management.component */ "./src/app/user-management/user-management.component.ts");
/* harmony import */ var _post_management_post_management_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./post-management/post-management.component */ "./src/app/post-management/post-management.component.ts");
/* harmony import */ var _static_content_static_content_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./static-content/static-content.component */ "./src/app/static-content/static-content.component.ts");
/* harmony import */ var _my_profile_my_profile_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./my-profile/my-profile.component */ "./src/app/my-profile/my-profile.component.ts");
/* harmony import */ var _my_profile_edit_profile_edit_profile_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./my-profile/edit-profile/edit-profile.component */ "./src/app/my-profile/edit-profile/edit-profile.component.ts");
/* harmony import */ var _reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./reset-password/reset-password.component */ "./src/app/reset-password/reset-password.component.ts");
/* harmony import */ var _user_management_user_detail_user_detail_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./user-management/user-detail/user-detail.component */ "./src/app/user-management/user-detail/user-detail.component.ts");
/* harmony import */ var _post_management_post_detail_post_detail_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./post-management/post-detail/post-detail.component */ "./src/app/post-management/post-detail/post-detail.component.ts");
/* harmony import */ var _static_content_edit_static_content_edit_static_content_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./static-content/edit-static-content/edit-static-content.component */ "./src/app/static-content/edit-static-content/edit-static-content.component.ts");
/* harmony import */ var _logout_logout_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./logout/logout.component */ "./src/app/logout/logout.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var ng4_loading_spinner__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ng4-loading-spinner */ "./node_modules/ng4-loading-spinner/ng4-loading-spinner.umd.js");
/* harmony import */ var ng4_loading_spinner__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(ng4_loading_spinner__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var ngx_embed_video__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ngx-embed-video */ "./node_modules/ngx-embed-video/dist/index.js");
/* harmony import */ var ngx_embed_video__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(ngx_embed_video__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var _report_management_report_management_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./report-management/report-management.component */ "./src/app/report-management/report-management.component.ts");
/* harmony import */ var _report_management_report_detail_report_detail_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./report-management/report-detail/report-detail.component */ "./src/app/report-management/report-detail/report-detail.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





























// import { MatVideoModule } from 'mat-video';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _component_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_5__["SidebarComponent"],
                _component_header_header_component__WEBPACK_IMPORTED_MODULE_6__["HeaderComponent"],
                _login_login_component__WEBPACK_IMPORTED_MODULE_7__["LoginComponent"],
                _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_8__["ForgotPasswordComponent"],
                _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_9__["DashboardComponent"],
                _user_management_user_management_component__WEBPACK_IMPORTED_MODULE_10__["UserManagementComponent"],
                _post_management_post_management_component__WEBPACK_IMPORTED_MODULE_11__["PostManagementComponent"],
                _static_content_static_content_component__WEBPACK_IMPORTED_MODULE_12__["StaticContentComponent"],
                _my_profile_my_profile_component__WEBPACK_IMPORTED_MODULE_13__["MyProfileComponent"],
                _my_profile_edit_profile_edit_profile_component__WEBPACK_IMPORTED_MODULE_14__["EditProfileComponent"],
                _reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_15__["ResetPasswordComponent"],
                _user_management_user_detail_user_detail_component__WEBPACK_IMPORTED_MODULE_16__["UserDetailComponent"],
                _post_management_post_detail_post_detail_component__WEBPACK_IMPORTED_MODULE_17__["PostDetailComponent"],
                _static_content_edit_static_content_edit_static_content_component__WEBPACK_IMPORTED_MODULE_18__["EditStaticContentComponent"],
                _logout_logout_component__WEBPACK_IMPORTED_MODULE_19__["LogoutComponent"],
                _report_management_report_management_component__WEBPACK_IMPORTED_MODULE_27__["ReportManagementComponent"],
                _report_management_report_detail_report_detail_component__WEBPACK_IMPORTED_MODULE_28__["ReportDetailComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_24__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_20__["ReactiveFormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_20__["FormsModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_21__["BrowserAnimationsModule"],
                ngx_toastr__WEBPACK_IMPORTED_MODULE_23__["ToastrModule"].forRoot({
                    preventDuplicates: true
                }),
                ng4_loading_spinner__WEBPACK_IMPORTED_MODULE_22__["Ng4LoadingSpinnerModule"].forRoot(),
                ngx_pagination__WEBPACK_IMPORTED_MODULE_25__["NgxPaginationModule"],
                ng2_ckeditor__WEBPACK_IMPORTED_MODULE_2__["CKEditorModule"],
                ngx_embed_video__WEBPACK_IMPORTED_MODULE_26__["EmbedVideo"].forRoot(),
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.service.ts":
/*!********************************!*\
  !*** ./src/app/app.service.ts ***!
  \********************************/
/*! exports provided: AppService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppService", function() { return AppService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppService = /** @class */ (function () {
    function AppService(http, toastr) {
        this.http = http;
        this.toastr = toastr;
        // baseUrl = "http://172.16.11.228:1507"; // Local Url
        //baseUrl = "http://mean.mobiloitte.com:1501";  // Stagging url
        this.baseUrl = "http://ec2-100-25-1-176.compute-1.amazonaws.com:1507"; // Live Url
    }
    AppService.prototype.getApi = function (url) {
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ "Content-Type": "application/json", 'token': localStorage.getItem('token'), '_id': localStorage.getItem('_id') }),
        };
        return this.http.get(this.baseUrl + url, this.httpOptions);
    };
    AppService.prototype.succ = function (msg) {
        this.toastr.success(msg);
    };
    AppService.prototype.err = function (msg) {
        this.toastr.error(msg);
    };
    AppService.prototype.postApi = function (url, data, isHeader) {
        if (!isHeader) {
            this.httpOptions = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ "Content-Type": "application/json" }),
            };
            return this.http.post(this.baseUrl + url, data);
        }
        else {
            this.httpOptions = {
                // headers: new HttpHeaders({ "Content-Type": "application/json"}),
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ "Content-Type": "application/json", 'token': localStorage.getItem('LOGINTOKEN'), '_id': localStorage.getItem('_id') }),
            };
            return this.http.post(this.baseUrl + url, data, this.httpOptions);
        }
    };
    AppService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"]])
    ], AppService);
    return AppService;
}());



/***/ }),

/***/ "./src/app/component/header/header.component.css":
/*!*******************************************************!*\
  !*** ./src/app/component/header/header.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/component/header/header.component.html":
/*!********************************************************!*\
  !*** ./src/app/component/header/header.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <!DOCTYPE html>\n<html lang=\"en\">\n\n\n<body class=\"afterlogin\">\n    <div class=\"wrapper\">\n        <header class=\"header\">\n            <nav class=\"navbar clearfix\">\n                <div class=\"logo-box\">\n                    <a class=\"navbar-brand logo\" href=\"dashboard.html\">\n                        <img src=\"assets/img/logo.png\" alt=\"logo\" class=\"lg-logo\">\n                        <img src=\"assets/img/logo-small.png\" alt=\"logo\" class=\"sm-logo\">\n                    </a>\n                </div>\n                <div class=\"header-right-part\">\n                    <button class=\"btn btn-toggle\" type=\"button\">\n                        <i class=\"fas fa-bars\"></i>\n                    </button>\n                    <button class=\"btn btn-outline-secondary btn-mobsearch\" type=\"button\"><i class=\"fas fa-search\"></i></button>\n                </div>\n            </nav>\n        </header> -->\n"

/***/ }),

/***/ "./src/app/component/header/header.component.ts":
/*!******************************************************!*\
  !*** ./src/app/component/header/header.component.ts ***!
  \******************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(/*! ./header.component.html */ "./src/app/component/header/header.component.html"),
            styles: [__webpack_require__(/*! ./header.component.css */ "./src/app/component/header/header.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/component/sidebar/sidebar.component.css":
/*!*********************************************************!*\
  !*** ./src/app/component/sidebar/sidebar.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/component/sidebar/sidebar.component.html":
/*!**********************************************************!*\
  !*** ./src/app/component/sidebar/sidebar.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header class=\"header\">\n    <nav class=\"navbar clearfix\">\n        <div class=\"logo-box\">\n            <a class=\"navbar-brand logo\" [routerLink]=\"['../admin/dashboard']\" >\n                <!-- <img src=\"assets/img/logo.png\" alt=\"logo\" class=\"lg-logo\"> -->\n                <label class=\"lg-logo\" style=\"color: white;\" >Video Posting</label>\n                <label class=\"sm-logo\" style=\"color: white;\" >VP</label>\n                <!-- <img src=\"assets/img/logo-small.png\" alt=\"logo\" class=\"sm-logo\"> -->\n            </a>\n        </div>\n        <div class=\"header-right-part\">\n            <button class=\"btn btn-toggle\" type=\"button\">\n                <i class=\"fas fa-bars\" style=\"color:whitesmoke\"></i>\n            </button>\n            <button class=\"btn btn-outline-secondary btn-mobsearch\" type=\"button\"><i class=\"fas fa-search\"></i></button>\n        </div>\n        <!-- <ul class=\" mr-4 pull-right\">\n             \n      <li class=\"nav-item dropdown\">\n              <a class=\"nav-link\" href=\"javascript:void(0);\" id=\"navbarDropdownMenuLink\" data-toggle=\"dropdown\" aria-haspopup=\"true\"\n                  aria-expanded=\"false\">\n                  \n                  <img src={{profilePic}}     height=\"50\" width=\"50\" style=\"border-radius:50%\" class=\"img-circle\"  alt=\"User Image\">\n                \n              </a>\n              <div class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"navbarDropdownMenuLink\">\n      \n                  <a class=\"dropdown-item\" href=\"javascript:void(0);\" [routerLink]=\"['/admin/myProfile']\" >My\n                      Profile</a>\n            \n                  <a class=\"dropdown-item\" href=\"javascript:void(0);\"  data-target=\"#signout_modal\" data-toggle=\"modal\">Logout</a>\n              </div>\n          </li>\n      </ul>  -->\n\n    </nav>\n</header>\n\n<aside class=\"sidebar\">\n    <div class=\"sidebar-scroller\">\n        <!--Accordion Start -->\n        <div id=\"accordion\" class=\"sidebar-menu\">\n            <div class=\"user-panel clearfix\">\n                <div class=\"pull-left image\">\n                    <img src={{profilePic}} style=\"border-radius:50%\" class=\"img-circle\" alt=\"User Image\">\n\n                </div>\n                <div class=\"pull-left info mt10\">\n                    <a [routerLink]=\"['../admin/myProfile']\">\n                        <p>Welcome</p>\n                        <h4>{{name}}</h4>\n                    </a>\n                </div>\n            </div>\n            <!-- menu-box Start -->\n            <div class=\"menu-box\" [ngClass]=\"{'active': sidemenu == 'dashboard'}\">\n                <div class=\"card-header clearfix\" id=\"headingOne\">\n                    <a class=\"side_menu\" [routerLink]=\"['../admin/dashboard']\">\n                        <span class=\"side_menu_icon\">\n                            <!-- <i class=\"fas fa-tachometer-alt\"></i> -->\n                            <img src=\"assets/img/dashboard-icon.png\" alt=\"icon\" />\n                        </span>\n                        <span class=\"side_page_name\">Dashboard</span>\n                    </a>\n                </div>\n            </div>\n            <!-- menu-box End -->\n            <!-- menu-box Start -->\n            <div class=\"menu-box\" [ngClass]=\"{'active': sidemenu == 'userManagement'}\">\n                <div class=\"card-header clearfix\" id=\"headingTwo\">\n                    <a class=\"side_menu\" [routerLink]=\"['../admin/userManagement']\">\n                        <span class=\"side_menu_icon\">\n                            <!-- <i class=\"fas fa-users\"></i> -->\n                            <img src=\"assets/img/user-manage.png\" alt=\"icon\" />\n                        </span>\n                        <span class=\"side_page_name\">User Management</span>\n                    </a>\n                </div>\n            </div>\n            <!-- menu-box End -->\n            <!-- menu-box Start -->\n            <div class=\"menu-box\" [ngClass]=\"{'active': sidemenu == 'postManagement'}\">\n                <div class=\"card-header clearfix\" id=\"headingThree\">\n                    <a class=\"side_menu\" [routerLink]=\"['../admin/postManagement']\">\n                        <span class=\"side_menu_icon\">\n                            <!-- <i class=\"fas fa-users\"></i> -->\n                            <img src=\"assets/img/buy.png\" alt=\"icon\" />\n                        </span>\n                        <span class=\"side_page_name\">Post Management</span>\n                    </a>\n                </div>\n            </div>\n            <div class=\"menu-box\" [ngClass]=\"{'active': sidemenu == 'reportManagement'}\">\n                <div class=\"card-header clearfix\" id=\"headingThree\">\n                    <a class=\"side_menu\" [routerLink]=\"['../admin/reportManagement']\">\n                        <span class=\"side_menu_icon\">\n                            <!-- <i class=\"fas fa-users\"></i> -->\n                            <img src=\"assets/img/buy.png\" alt=\"icon\" />\n                        </span>\n                        <span class=\"side_page_name\">Report Management</span>\n                    </a>\n                </div>\n            </div>\n            <!-- menu-box End -->\n            <!-- menu-box Start -->\n            <div class=\"menu-box\" [ngClass]=\"{'active': sidemenu == 'staticContent'}\">\n                <div class=\"card-header clearfix\" id=\"headingThree\">\n                    <a class=\"side_menu\" [routerLink]=\"['../admin/staticContent']\">\n                        <span class=\"side_menu_icon\">\n                            <!-- <i class=\"fas fa-users\"></i> -->\n                            <img src=\"assets/img/static-content.png\" alt=\"icon\" />\n                        </span>\n                        <span class=\"side_page_name\">Static Content</span>\n                    </a>\n                </div>\n            </div>\n            <div class=\"menu-box\" [ngClass]=\"{'active': sidemenu == 'myProfile'}\">\n                <div class=\"card-header clearfix\" id=\"headingThree\">\n                    <a class=\"side_menu\" [routerLink]=\"['../admin/myProfile']\">\n                        <span class=\"side_menu_icon\">\n                            <!-- <i class=\"fas fa-users\"></i> -->\n                            <img src=\"assets/img/user-icon.png\" alt=\"icon\" />\n                        </span>\n                        <span class=\"side_page_name\">My Profile</span>\n                    </a>\n                </div>\n            </div>\n            <!-- menu-box End -->\n            <!-- menu-box Start -->\n            <div class=\"menu-box\">\n                <div class=\"card-header clearfix\">\n                    <a class=\"side_menu\" data-target=\"#signout_modal\" data-toggle=\"modal\">\n                        <span class=\"side_menu_icon\">\n                            <!-- <i class=\"fas fa-sign-out-alt\"></i> -->\n                            <img src=\"assets/img/logout.png\" alt=\"icon\" />\n                        </span>\n                        <span style=\"color:whitesmoke\" class=\"side_page_name\">Logout</span>\n                    </a>\n                </div>\n            </div>\n            <!-- menu-box End -->\n        </div>\n        <!--Accordion End -->\n    </div>\n</aside>\n<router-outlet></router-outlet>\n\n\n\n\n<div class=\"modal fade global-modal reset-modal\" id=\"signout_modal\">\n    <div class=\"modal-dialog max-WT-500\">\n        <div class=\"modal-content\">\n            <!-- Modal body -->\n            <div class=\"modal-body  text-center\">\n                <div class=\"row align-items-center modal_flax_height\">\n                    <div class=\"col\">\n                        <div class=\"box-title mb40 d-inline-block\">\n                            <i class=\"fas fa-power-off off-icon\"></i>\n                            <p class=\"mt40\">Are you sure you want to logout?</p>\n                        </div>\n                        <div class=\"text-center\">\n                            <a (click)=\"logout()\" data-dismiss=\"modal\" class=\"btn btn-blue btn-noYes\">YES</a>\n                            <button type=\"button\" class=\"btn btn-red btn-noYes ml-2\" data-dismiss=\"modal\">CANCEL</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/component/sidebar/sidebar.component.ts":
/*!********************************************************!*\
  !*** ./src/app/component/sidebar/sidebar.component.ts ***!
  \********************************************************/
/*! exports provided: SidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarComponent", function() { return SidebarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../app.service */ "./src/app/app.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(route, service) {
        this.route = route;
        this.service = service;
        this.url = [];
        this.profilePic = "https://res.cloudinary.com/sumit9211/image/upload/v1542879708/und4l1ruuang3cexhb9a.jpg";
        // this.profilepic=localStorage.getItem("profilePic")
        this.name = localStorage.getItem("name");
        console.log("profilePic", this.profilePic);
    }
    SidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.profilepic=localStorage.getItem("profilePic")
        this.route.events.subscribe(function (event) {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"]) {
                console.log("event====>>>>", event);
                _this.url = event.url.split("/");
                console.log("this.url", _this.url);
                _this.sidemenu = _this.url[_this.url.length - 1];
                console.log(_this.sidemenu);
            }
        });
        this.toggle();
    };
    SidebarComponent.prototype.toggle = function () {
        if ($(window).width() < 768) {
            $('body').removeClass('toggle-wrapper');
        }
        else if ($(window).width() > 767 && $(window).width() < 1025) {
            $('body').addClass('toggle-wrapper');
        }
        $(window).resize(function () {
            if ($(window).width() < 768) {
                $('body').removeClass('toggle-wrapper');
            }
            else if ($(window).width() > 767 && $(window).width() < 1025) {
                $('body').addClass('toggle-wrapper');
            }
        });
        $(".scroll-section, .sidebar").niceScroll({
            cursorborder: "",
            cursorcolor: "#EFC0ED",
            boxzoom: false
        });
        $(".btn-toggle,.close_panel").click(function () {
            $("body").toggleClass("toggle-wrapper");
        });
        $(document).on("click", ".top-user-img", function () {
            $(".head-drop-down").toggleClass("show");
        });
    };
    SidebarComponent.prototype.logout = function () {
        var _this = this;
        var apireq = {
            userId: localStorage.getItem("_id")
        };
        this.service.postApi('/api/v1/admin/logout', apireq, 1).subscribe(function (success) {
            if (success.response_code == 200) {
                localStorage.removeItem('_id');
                localStorage.removeItem('role');
                localStorage.removeItem('LOGINTOKEN');
                localStorage.removeItem('name');
                localStorage.removeItem('profilePic');
                _this.route.navigate(['/login']);
                _this.service.succ(success.response_message);
            }
            else {
                _this.service.err(success.response_message);
            }
        }, function (error) {
            console.log("Something went wrong");
        });
    };
    SidebarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sidebar',
            template: __webpack_require__(/*! ./sidebar.component.html */ "./src/app/component/sidebar/sidebar.component.html"),
            styles: [__webpack_require__(/*! ./sidebar.component.css */ "./src/app/component/sidebar/sidebar.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _app_service__WEBPACK_IMPORTED_MODULE_2__["AppService"]])
    ], SidebarComponent);
    return SidebarComponent;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard.component.css":
/*!***************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.html":
/*!****************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n            <main class=\"middle-content\">\n                <!-- Page Title Start -->\n                <div class=\"page_title_block\">\n                    <h1 class=\"page_title\">Dashboard</h1>\n                </div>\n                <!-- Page Title End -->\n                <div class=\"content-section dashboard-block\">\n                    <ul class=\"dash_list d-flex w-100 flex-wrap text-center justify-content-between\">\n                        <li class=\"d-inline-flex align-items-center justify-content-center showCursor\" [routerLink]=\"['/admin/userManagement']\">\n                            <div class=\"w-100\">\n                                <div class=\"dash_icn\">\n                                    <i class=\"fas fa-users fa-3x\"></i>\n                                </div>\n                                <h2>Total Users</h2>\n                                <h4>{{data?.User}}</h4>\n                            </div>\n                        </li>\n                        <li class=\"d-inline-flex align-items-center justify-content-center showCursor\" [routerLink]=\"['/admin/userManagement']\">\n                            <div class=\"w-100\">\n                                <div class=\"dash_icn\">\n                                    <i class=\"fas fa-user-ninja fa-3x\"></i>\n                                </div>\n                                <h2>Total Active Users</h2>\n                                <h4>{{data?.ActiveUser}}</h4>\n                            </div>\n                        </li>\n                        <li class=\"d-inline-flex align-items-center justify-content-center showCursor\" [routerLink]=\"['/admin/userManagement']\">\n                            <div class=\"w-100\">\n                                <div class=\"dash_icn\">\n                                    <i class=\"fas fa-user-slash fa-3x\"></i>\n                                </div>\n                                <h2>Total Inactive User</h2>\n                                <h4>{{data?.InactiveUser}}</h4>\n                            </div>\n                        </li>\n                        <li class=\"d-inline-flex align-items-center justify-content-center showCursor\" [routerLink]=\"['/admin/postManagement']\">\n                            <div class=\"w-100\">\n                                <div class=\"dash_icn\">\n                                    <i class=\"fas fa-users-cog fa-3x\"></i>\n                                </div>\n                                <h2>Total Posts</h2>\n                                <h4>{{data?.Post}}</h4>\n                            </div>\n                        </li>\n                        <li class=\"d-inline-flex align-items-center justify-content-center showCursor\" [routerLink]=\"['/admin/reportManagement']\" >\n                            <div class=\"w-100\">\n                                <div class=\"dash_icn\">\n                                    <i class=\"fas fa-coins fa-3x\"></i>\n                                </div>\n                                <h2>Total Reports</h2>\n                                <h4>{{data?.Report}}</h4>\n                            </div>\n                        </li>\n                         <li class=\"d-inline-flex align-items-center justify-content-center showCursor\">\n                            <div class=\"w-100\">\n                                <div class=\"dash_icn\">\n                                    <i class=\"fa fa-clock fa-3x\"></i>\n                                </div>\n                                <h2>Total Video Time</h2>\n                                <h4>{{data?.videoDuration}}&nbsp; hours</h4>\n                            </div>\n                        </li>\n                         <li class=\"d-inline-flex align-items-center justify-content-center showCursor\" >\n                            <div class=\"w-100\">\n                                <div class=\"dash_icn\">\n                                    <i class=\"fas fa-database fa-3x\"></i>\n                                </div>\n                                <h2>Total Video Size</h2>\n                                <h4>{{data?.videoSize}}&nbsp; GB</h4>\n                            </div>\n                        </li>\n                    </ul>\n                </div>\n            </main>\n\n    "

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.ts":
/*!**************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.ts ***!
  \**************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app.service */ "./src/app/app.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(service) {
        this.service = service;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.getDataApi();
    };
    DashboardComponent.prototype.getDataApi = function () {
        var _this = this;
        var apireq = {
            "userId": localStorage.getItem("_id")
        };
        this.service.postApi("/api/v1/admin/totalCount", apireq, 1).subscribe(function (success) {
            if (success.response_code == 200) {
                _this.data = success.obj;
            }
            else {
                console.log(success.response_message);
            }
        }, function (error) {
            console.log("Something went wrong");
        });
    };
    DashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(/*! ./dashboard.component.html */ "./src/app/dashboard/dashboard.component.html"),
            styles: [__webpack_require__(/*! ./dashboard.component.css */ "./src/app/dashboard/dashboard.component.css")]
        }),
        __metadata("design:paramtypes", [_app_service__WEBPACK_IMPORTED_MODULE_1__["AppService"]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/forgot-password/forgot-password.component.css":
/*!***************************************************************!*\
  !*** ./src/app/forgot-password/forgot-password.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/forgot-password/forgot-password.component.html":
/*!****************************************************************!*\
  !*** ./src/app/forgot-password/forgot-password.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"login-wrapper\">\n  <div class=\"container-common\">\n    <div class=\"row justify-content-center\">\n      <div class=\"col-md-6\">\n        <form class=\"login_box_outer\" [formGroup]=\"forgotPasswordMain\" #f=\"ngForm\">\n          <div class=\"login-box max-WT-520\">\n            <div class=\"login-right-block\">\n              <div class=\"login-heading\">\n                <h4>FORGOT PASSWORD</h4>\n              </div>\n              <div class=\"login-box-body\">\n                <p class=\"common-paragrph text-center\">Please enter a registered email address so that we can send you\n                  reset instruction</p>\n                <div class=\"form-group\">\n                  <input type=\"email\" class=\"form-control\" formControlName=\"email\" placeholder=\"Email Address\" />\n                  <div class=\"text-danger\" *ngIf=\"forgotPasswordMain.get('email').hasError('required') && (forgotPasswordMain.get('email').dirty || f.submitted)\">\n                    Email is required.\n                  </div>\n                  <div class=\"text-danger\" *ngIf=\"forgotPasswordMain.get('email').hasError('pattern') && (forgotPasswordMain.get('email').dirty || f.submitted)\">\n                    Invalid email id.\n                  </div>\n                </div>\n              </div>\n              <div class=\"text-center mt-3\">\n                <button type=\"submit\" (click)=\"forgotFunc(forgotPasswordMain.value)\" class=\"btn btn-login btn-large  width100 font-100\">SUBMIT</button>\n                <button class=\"btn btn-primary  mt-2 mr-2\" [routerLink]=\"['/login']\">BACK TO LOGIN</button>\n              </div>\n              <!-- <a href=\"\" class=\"text-center mt20 reset-link\">Resend Link ?</a> -->\n            </div>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/forgot-password/forgot-password.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/forgot-password/forgot-password.component.ts ***!
  \**************************************************************/
/*! exports provided: ForgotPasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgotPasswordComponent", function() { return ForgotPasswordComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ForgotPasswordComponent = /** @class */ (function () {
    function ForgotPasswordComponent() {
    }
    ForgotPasswordComponent.prototype.ngOnInit = function () {
        this.forgotPasswordMain = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)])
        });
    };
    ForgotPasswordComponent.prototype.forgotFunc = function (forgetdata) {
        if (this.forgotPasswordMain.invalid) {
            return;
        }
        console.log("forgetdata", forgetdata);
    };
    ForgotPasswordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-forgot-password',
            template: __webpack_require__(/*! ./forgot-password.component.html */ "./src/app/forgot-password/forgot-password.component.html"),
            styles: [__webpack_require__(/*! ./forgot-password.component.css */ "./src/app/forgot-password/forgot-password.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
}());



/***/ }),

/***/ "./src/app/login/login.component.css":
/*!*******************************************!*\
  !*** ./src/app/login/login.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<main class=\"app-content patient-section\">\n<div class=\"login-wrapper\">\n  <div class=\"container-common\">\n    <div class=\"row justify-content-center\">\n      <div class=\"col-md-6\">\n        \n          <div class=\"login-box max-WT-520\">\n            <div class=\"login-right-block\">\n              <form class=\"login-form\" [formGroup]=\"LoginForm\" #f=\"ngForm\">\n              <div class=\"login-heading\">\n                <h4>LOGIN</h4>\n              </div>\n              <div class=\"login-box-body\">\n                <div class=\"form-group\">\n                  <input type=\"email\" class=\"form-control\" maxlength=\"256\" formControlName=\"email\" placeholder=\"Email\" />\n                  <div class=\"text-danger\" *ngIf=\"LoginForm.get('email').hasError('required') && (LoginForm.get('email').dirty || f.submitted)\">\n                     Please enter email address.\n                  </div>\n                  <div class=\"text-danger\" *ngIf=\"LoginForm.get('email').hasError('pattern') && !(LoginForm.get('email').hasError('maxlength')) && (LoginForm.get('email').dirty || f.submitted)\">\n                    Please enter valid email id.\n                  </div>\n                  <div class=\"text-danger\" *ngIf=\"LoginForm.get('email').hasError('maxlength') && (LoginForm.get('email').dirty || f.submitted)\">\n                    Email address maximum length should be 256 character.\n                  </div>\n                </div>\n                <div class=\"form-group\">\n                  <input type=\"password\" class=\"form-control\" maxlength=\"17\" formControlName=\"password\" placeholder=\"Password\"\n                    required />\n                  <div class=\"text-danger\" *ngIf=\"LoginForm.get('password').hasError('required') && (LoginForm.get('password').dirty || f.submitted)\">\n                    Please enter password.\n                  </div>\n                  <div class=\"text-danger\" *ngIf=\"LoginForm.get('password').hasError('minlength') && (LoginForm.get('password').dirty || f.submitted)\">\n                   Password minimum length should be 8 character.\n                  </div>\n                  <div class=\"text-danger\" *ngIf=\"LoginForm.get('password').hasError('maxlength') && (LoginForm.get('password').dirty || f.submitted)\">\n                    Password maximum length should be 16 character.\n                  </div>\n                </div>\n                <div class=\"form-group row\">\n                  <div class=\"col-6\">\n                    <div class=\"remember-text \">\n                      <label class=\"checkbox-design\">\n                        <!-- <input type=\"checkbox\" formControlName=\"checkbox\" /><span></span>Remember me -->\n                      </label>\n                    </div>\n                  </div> \n                  <div class=\"col-lg-6\">\n                    <div class=\"forgot-links\">\n                    <!--   <a [routerLink]=\"['/forgotPassword']\" >Forgot Password?</a> -->\n                     \n                    </div>\n                  </div>\n                </div>\n             \n              <div class=\"text-center mt20\">\n                <button type=\"submit\" (click)=\"loginFunction(LoginForm.value)\" class=\"btn btn-login btn-large  width100 font-100\">LOGIN</button>\n              </div>\n            </div>\n        </form>\n      </div>\n    </div>\n   \n  </div>\n</div>\n</div>\n</div>\n\n</main>\n"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../app.service */ "./src/app/app.service.ts");
/* harmony import */ var ng4_loading_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng4-loading-spinner */ "./node_modules/ng4-loading-spinner/ng4-loading-spinner.umd.js");
/* harmony import */ var ng4_loading_spinner__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ng4_loading_spinner__WEBPACK_IMPORTED_MODULE_4__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginComponent = /** @class */ (function () {
    function LoginComponent(route, spinnerService, service) {
        this.route = route;
        this.spinnerService = spinnerService;
        this.service = service;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.LoginForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(256), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)]),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(8), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(16)]),
        });
    };
    LoginComponent.prototype.loginFunction = function (loginData) {
        var _this = this;
        if (this.LoginForm.invalid) {
            return;
        }
        if (loginData.checkbox) {
            localStorage.setItem('email', loginData.email);
            localStorage.setItem('password', loginData.password);
        }
        var apiData = {
            "email": loginData.email,
            "password": loginData.password,
            "role": 1
        };
        this.spinnerService.show();
        this.service.postApi('/api/v1/admin/adminLogin', apiData, 0).subscribe(function (success) {
            console.log(success);
            if (success.response_code == 200) {
                localStorage.setItem('LOGINTOKEN', success.Data.jwtToken);
                localStorage.setItem("_id", success.Data._id);
                localStorage.setItem("role", success.Data.role);
                localStorage.setItem("name", success.Data.name);
                localStorage.setItem("profilePic", success.Data.profilePic);
                _this.service.succ(success.response_message);
                _this.spinnerService.hide();
                _this.route.navigate(['/admin/dashboard']);
            }
            else {
                if (success.response_code == 500) {
                    _this.service.err(success.response_message);
                    _this.spinnerService.hide();
                    console.log("error");
                }
                else {
                    _this.spinnerService.hide();
                    _this.service.err(success.response_message);
                }
            }
        }, function (error) {
            _this.service.err("something went wrong");
            _this.spinnerService.hide();
        });
    };
    LoginComponent.prototype.forgotPassword = function () {
        this.route.navigate(['/forgotPassword']);
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], ng4_loading_spinner__WEBPACK_IMPORTED_MODULE_4__["Ng4LoadingSpinnerService"], _app_service__WEBPACK_IMPORTED_MODULE_3__["AppService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/logout/logout.component.css":
/*!*********************************************!*\
  !*** ./src/app/logout/logout.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/logout/logout.component.html":
/*!**********************************************!*\
  !*** ./src/app/logout/logout.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  logout works!\n</p>\n"

/***/ }),

/***/ "./src/app/logout/logout.component.ts":
/*!********************************************!*\
  !*** ./src/app/logout/logout.component.ts ***!
  \********************************************/
/*! exports provided: LogoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogoutComponent", function() { return LogoutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LogoutComponent = /** @class */ (function () {
    function LogoutComponent() {
    }
    LogoutComponent.prototype.ngOnInit = function () {
    };
    LogoutComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-logout',
            template: __webpack_require__(/*! ./logout.component.html */ "./src/app/logout/logout.component.html"),
            styles: [__webpack_require__(/*! ./logout.component.css */ "./src/app/logout/logout.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], LogoutComponent);
    return LogoutComponent;
}());



/***/ }),

/***/ "./src/app/my-profile/edit-profile/edit-profile.component.css":
/*!********************************************************************!*\
  !*** ./src/app/my-profile/edit-profile/edit-profile.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/my-profile/edit-profile/edit-profile.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/my-profile/edit-profile/edit-profile.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n"

/***/ }),

/***/ "./src/app/my-profile/edit-profile/edit-profile.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/my-profile/edit-profile/edit-profile.component.ts ***!
  \*******************************************************************/
/*! exports provided: EditProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditProfileComponent", function() { return EditProfileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EditProfileComponent = /** @class */ (function () {
    function EditProfileComponent() {
    }
    EditProfileComponent.prototype.ngOnInit = function () {
    };
    EditProfileComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-edit-profile',
            template: __webpack_require__(/*! ./edit-profile.component.html */ "./src/app/my-profile/edit-profile/edit-profile.component.html"),
            styles: [__webpack_require__(/*! ./edit-profile.component.css */ "./src/app/my-profile/edit-profile/edit-profile.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], EditProfileComponent);
    return EditProfileComponent;
}());



/***/ }),

/***/ "./src/app/my-profile/my-profile.component.css":
/*!*****************************************************!*\
  !*** ./src/app/my-profile/my-profile.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/my-profile/my-profile.component.html":
/*!******************************************************!*\
  !*** ./src/app/my-profile/my-profile.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<main class=\"middle-content\">\n  <!-- Page Title Start -->\n  <div class=\"page_title_block\">\n    <h1 class=\"page_title\">Admin Detail</h1>\n  </div>\n  <!-- Page Title End -->\n  <div class=\"content-section\">\n    <div class=\"outer-box\">\n      <div class=\"custom_tabs common-tabs\">\n        <div class=\"tab-content\">\n          <div class=\"tab-pane active show\" id=\"general_info\">\n            <div class=\"order-view mt30 max-WT-700 mrgn-0-auto\">\n              <div class=\"main-block-innner mb40 mt40\">\n                <div class=\"add-store-block input-style\">\n                  <div class=\"user-profile\">\n                    <div class=\"image-box\">\n                      <img src={{image}} *ngIf=\"image!=undefined\" class=\"profile-pic\">\n                      <img src=\"assets/img/profile-img.jpg\" *ngIf=\"image==undefined\" class=\"profile-pic\">\n                    </div>\n                  </div>\n                  <div class=\"form-group row align-items-baseline\">\n                    <label class=\"col-md-5\">Name :</label>\n                    <div class=\"col-md-7\">\n                      <label>{{userDetail?.name}}</label>\n                    </div>\n                  </div>\n                  <div class=\"form-group row align-items-baseline\">\n                    <label class=\"col-md-5\">User ID :</label>\n                    <div class=\"col-md-7\">\n                      <label>{{userDetail?._id}}</label>\n                    </div>\n                  </div>\n                  <div class=\"form-group row align-items-baseline\">\n                    <label class=\"col-md-5\">Email :</label>\n                    <div class=\"col-md-5\">\n                      <label>{{userDetail?.email}}</label>\n                    </div>\n                   <div class=\"col-md-2\">\n                      <button class=\"btn btn-primary\" (click)=\"openModal('edit_profile_modal1',userDetail?.email)\"  data-target=\"model\" style=\"background-color:rgba(10, 102, 123)\">Change</button>\n                    </div>\n                  </div>\n                  <div class=\"form-group row align-items-baseline\">\n                    <label class=\"col-md-5\">Phone No :</label>\n                    <div class=\"col-md-7\">\n                      <label>{{userDetail?.countryCode}}{{userDetail?.mobileNumber}}</label>\n                    </div>\n                  </div>\n               \n                  <div class=\"form-group row align-items-baseline ml-4\">\n\n                    <button class=\"btn btn-primary \" data-target=\"#edit_profile_modal\" data-toggle=\"modal\" style=\"background-color:rgba(10, 102, 123)\">Change Password</button>\n                    <!-- [routerLink]=\"['/admin/dashboard']\" -->\n                    <button class=\"btn btn-primary ml-3\" [routerLink]=\"['/admin/dashboard']\" style=\"background-color:rgb(10, 102, 123)\">Back</button>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</main>\n\n\n\n\n\n<div class=\"modal fade global-modal reset-modal\" id=\"edit_profile_modal\">\n    <div class=\"modal-dialog max-WT-500\">\n      <form class=\"change_password\" [formGroup]=\"changePasswordForm\" #f=\"ngForm\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header \">\n            <h4 class=\"modal-title text-center\">Change Password</h4>\n            <!-- <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button> -->\n          </div>\n          <div class=\"modal-body\">\n            <div class=\"row align-items-center modal_flax_height\">\n  \n  \n              <div class=\"col-md-12\">\n                <div class=\"row\">\n  \n                  <div class=\"col-md-12\">\n                    <div class=\"form-group\">\n                      <label class=\"control-labe\">Old Password</label>\n                      <input class=\"form-control\" formControlName=\"oldPassword\" autocomplete=\"false\" type=\"password\">\n                      <span class=\"text-danger\" *ngIf=\"changePasswordForm.get('oldPassword').hasError('required') && (changePasswordForm.get('oldPassword').dirty || f.submitted)\">Please enter old password</span>\n                      <span class=\"text-danger\" *ngIf=\"changePasswordForm.get('oldPassword').hasError('minlength') && (changePasswordForm.get('oldPassword').dirty || f.submitted)\">\n                        Old password minimum length should be 8 character..</span>\n                      <span class=\"text-danger\" *ngIf=\"changePasswordForm.get('oldPassword').hasError('maxlength') && (changePasswordForm.get('oldPassword').dirty || f.submitted)\">Old password maximum length should be 16 character.</span>\n                    </div>\n                  </div>\n                </div>\n                <div class=\"row\">\n                <div class=\"col-md-12\">\n                  <div class=\"form-group\">\n                    <label class=\"control-labe\">New Password</label>\n                    <input class=\"form-control\" formControlName=\"newPassword\" maxlength=\"17\" autocomplete=\"false\" type=\"password\">\n                    <span class=\"text-danger\" *ngIf=\"changePasswordForm.get('newPassword').hasError('required') && (changePasswordForm.get('newPassword').dirty || f.submitted)\">\n                       Please enter new password.</span>\n                    <span class=\"text-danger\" *ngIf=\"changePasswordForm.get('newPassword').hasError('minlength') && (changePasswordForm.get('newPassword').dirty || f.submitted)\">New password minimum length should be 8 character.</span>\n                    <span class=\"text-danger\" *ngIf=\"changePasswordForm.get('newPassword').hasError('maxlength') && (changePasswordForm.get('newPassword').dirty || f.submitted)\">New password maximum length should be 16 character.</span>\n                  </div>\n                </div>\n              </div>\n  \n              <div class=\"row\">\n                <div class=\"col-md-12\">\n                  <div class=\"form-group\">\n                    <label class=\"control-labe\">Confirm Password</label>\n                    <input class=\"form-control\" formControlName=\"confirmPassword\" maxlength=\"17\" autocomplete=\"false\" type=\"password\">\n                    <span class=\"text-danger\" *ngIf=\"changePasswordForm.get('confirmPassword').hasError('required') && !(changePasswordForm.value.newPassword != changePasswordForm.value.confirmPassword) && (changePasswordForm.get('confirmPassword').dirty || f.submitted)\">Please enter confirm password.</span>\n                    <span class=\"text-danger\" *ngIf=\"(changePasswordForm.value.newPassword != changePasswordForm.value.confirmPassword) &&  (changePasswordForm.get('confirmPassword').dirty || f.submitted)\">Password and confirm password should be same.</span>\n                  </div>\n                </div>\n              </div>\n            </div>\n  \n            </div>\n            <div class=\"row\">\n              <div class=\"col-6\">\n                <button type=\"submit\" (click)=\"editProfile(changePasswordForm.value)\"  class=\"btn btn-gray btn-large radius0 btn-block\">SUBMIT</button>\n              </div>\n              <div class=\"col-6\">\n                <button type=\"button\" class=\"btn btn-red btn-large radius0 btn-block\" (click)=\"reset()\" data-dismiss=\"modal\">CANCEL</button>\n              </div>\n            </div>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n\n<!-- Change Email -->\n<div class=\"modal fade global-modal reset-modal\" id=\"edit_profile_modal1\">\n    <div class=\"modal-dialog max-WT-500\">\n      <form class=\"change_password\" [formGroup]=\"changeEmailForm\" #g=\"ngForm\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header \">\n            <h4 class=\"modal-title text-center\">Change Email</h4>\n            <!-- <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button> -->\n          </div>\n          <div class=\"modal-body\">\n            <div class=\"row align-items-center modal_flax_height\">\n                <div class=\"col-md-12\">\n                <div class=\"row\">\n                  <div class=\"col-md-12\">\n                    <div class=\"form-group\">\n                      <label class=\"control-labe\">Email</label>\n                      <input class=\"form-control\" formControlName=\"email\" maxlength=\"257\" type=\"text\">\n                      <div class=\"text-danger\" *ngIf=\"changeEmailForm.get('email').hasError('required') && (changeEmailForm.get('email').dirty || g.submitted)\" >\n                            Please enter email address.\n                        </div>\n                        <div class=\"text-danger\" *ngIf=\"changeEmailForm.get('email').hasError('pattern') && !(changeEmailForm.get('email').hasError('maxlength')) && (changeEmailForm.get('email').dirty || g.submitted)\">\n                          Please enter valid email id.\n                        </div>\n                        <div class=\"text-danger\" *ngIf=\"changeEmailForm.get('email').hasError('maxlength') && (changeEmailForm.get('email').dirty || g.submitted)\">\n                            Email address maximum length should be 256 character.\n                      </div>\n                    </div>\n                  </div>\n                </div>\n            </div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-6\">\n                <button type=\"submit\" (click)=\"editEmailProfile(changeEmailForm.value)\" class=\"btn btn-gray btn-large radius0 btn-block\">SUBMIT</button>\n              </div>\n              <div class=\"col-6\">\n                <button type=\"button\" class=\"btn btn-red btn-large radius0 btn-block\" data-dismiss=\"modal\">CANCEL</button>\n              </div>\n            </div>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n\n"

/***/ }),

/***/ "./src/app/my-profile/my-profile.component.ts":
/*!****************************************************!*\
  !*** ./src/app/my-profile/my-profile.component.ts ***!
  \****************************************************/
/*! exports provided: MyProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyProfileComponent", function() { return MyProfileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../app.service */ "./src/app/app.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MyProfileComponent = /** @class */ (function () {
    function MyProfileComponent(router, activatedRoute, service) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.service = service;
        this.image = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAWRXhpZgAATU0AKgAAAAgAAAAAAAD/4QNwaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pg0KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPg0KCTxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+DQoJCTxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9IkJGNzlBRkU3Qjg3Rjk4OEMzNzA0RkI4MDNFRDYwNDYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjMyMjJFN0Y0NUU3MTExRTI5QUE4OEEyRTVCNjE3MkY1IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjMyMjJFN0YzNUU3MTExRTI5QUE4OEEyRTVCNjE3MkY1IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUgTWFjaW50b3NoIj4NCgkJCTx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAyODAxMTc0MDcyMDY4MTFCMzc5RTY0NTg0REM4NUYwIiBzdFJlZjpkb2N1bWVudElEPSJCRjc5QUZFN0I4N0Y5ODhDMzcwNEZCODAzRUQ2MDQ2MyIvPg0KCQk8L3JkZjpEZXNjcmlwdGlvbj4NCgk8L3JkZjpSREY+DQo8L3g6eG1wbWV0YT4NCjw/eHBhY2tldCBlbmQ9J3cnPz7/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCADIAMgDASIAAhEBAxEB/8QAHQABAAICAwEBAAAAAAAAAAAAAAMEBwgBAgYJBf/EAEAQAAEDAwIDBgQDBQQLAAAAAAABAgMEERIFYQYHEyExQVFx8AgigaEUYpEyQlKxshUWgsEjJDM0Y3JzdMLh8f/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDN1hYlsLAR4nFiXHYWXyAjxS/eMSREt3IcY7AR23OcSS2xxjsB0xsLe7ndURqXXst5nk67mrwpQVEkMusQuezsd0muel/K6IqfcD1GO5zZDEPFvP6kjpXQ6BDJLUOSyVNQzFrPRvivqY0ZzS4sjnfK3XKnN63VFRqt+jVSyfRANqcdxia1abzt4qoqx009YyujcllgmiYjE3TFEVD9jT/iE1mKVv4ygo6iPJL9NHMcieNu1QM+47jHc/G4c410biinifQV8D5XpdaZ0iJK1fFFb3n7qt80AjxGJ3x2GOwHTE4x3JMdhjsB0x3GJIiW8DjHYDpiLHfHY5svkBHbcEiJbuQASY7qMd1JMdxjuBHjuox3Ukx3GO4EeO6jHdSTHc5t296ARY7qVNU1Sk0SglrK6obT00aXdI/uT/2S6rqVPounVNdWSpFS07FkkevgiGsHMnmVV8cajJHHI+LR2PvDTOREv2ftOt3r/ID9Pj/nPqPE3XodPT+z9MVytyY5epK3dfBF8kMbgAAAAAAHaN7ono9jnMenc5q2VPqel0LmRxBoNfDUR6lUVDGKiOgqJVex6eSop5gAbLcEc59L4wr4tPkppNOrZE+Rsj0cxy+SO7O1fKxkTHc0pgnkpZ45oXrHLG5Hse1bK1U7UVDY/lhzdo+J4KbTNRl6Os2xRXJZk9vFF8Ft4AZHx3UY7qS23OMdwI8d1GO6kmO4x3Ajx3UY7qS47nGO4EeO6gkx3AE2O4x3JsFOLARY7jHcmxGIEOO4x3JsbnWS7GOd32RVA115/cbVdTr0nDsMnToaZrHSo1f9o9Wo7t2S6dhiEu61qM2r6xW1tQ7KaeZ0jl3VSkAAAAAAAAAAAA7wzPppmTROVkjHI5rkWyoqdqHQAbpcNai7WeHNL1B6Ix9VSxTuanciuYir/M/Sx3PA8htQk1Ll1SNkVVWmlkp0V3b2IqKn0s630MiYL5AQ47i25NgMVAhtuMd7E2Awt/8AAIcdwS23+wAmVtvP6HOHqTYen6hGegEOHqMPUmVnoMPQCHAjqIWPglbI3ONWqjmr4pbtQtYen6nWVrUjer1RrMVyXyQDRKucx9bUOjYkcayOVrE/dS62QgLOpNjZqNU2JVWJJXoxV71bdbfYrAAAAAAAAAAAAAHcgGynw1/iHcGVqSIn4dKx3S874pl/kZcwuY/5A6etHy0onKxWLPLLMqr+9d1kX9EQyNhfyAhw9Rh6k2HoMPQCHD1GF/MlwTb9Rh6AQ4eoJ0bby/UAT4KMF8SbDyGCeoEPTGHZ4k2Gww2Ahw9TrJA2WN0b2o5jkVrmqnYqL4KWMNhhsBo9zC0T+7nG+s6e2H8PFFUO6UflGva37Kh50zZ8UWgwUPEml6pGqpNXQuZKngvTsiL+i2+hhMAAAAAAAAAAAA8AANueQeb+WWnZVCVCo+SyIt+mmS2b/n9TImPqYP8AhW1Fsula5p62zimZOiKvbZyW/wDH7mdsE8AIcPNLjC/gpN09hhsBDgMPUmw2GGwEGK7gnw2AFjD3cYfT6k+G4wAgw93GHu5PhuMNwK+G33OcPdyfAYgaxfFdUPXiDQqdbdNtK+RPVX2X+lDBRsL8W0NqjhqTDswnar7bs7LmvQAAAAAAAAAAAAABsR8KOiypHr2qr2RPWOmanmqXcv8ANDYLDb7nhuQ/DTuHOWOlNlZhPVtWseipZfn7W3/w4mQcNvuBXw2+4w2+5Yw93GAFfDb7jDb7ljD3cYe7gQYe7gnw3AFnBfdjjFSxhsMNgK+KjFSx09h0wK+KjFSx09hhsBhz4m9Dg1Dlq+rkc2OehqGSRKve7JcVb9b3+hqAfQfjLg+i434dq9Hr2r0KhvY9v7THJ+y5N0U0w5ucs38reI4dO/GLXQTwJPHMseC2uqKipde6wHhwAAAAAAAAAAPR8uuHGcW8b6NpMjsIqmdEeqJf5U+ZU+qIqH4FPA6pnihYl3yPRjU81VbIbq8veQ3DvAddBqlOyoqNTbEjc6l6Oaxyp8ytRESy96Ae+hgbBEyONqNjYiNa1E7EROxDvgvkWMNhhsBXxUYKpYw2GGwFfAYqWMNhgBBgvuwJ8NgBY6Y6ZY6W32HTW3coFfpjpljpflHS/KBX6ZxhuWel+UdNfJQK/TMA/F3ww6s4Z0jWoo7uoZ3QyuTwZIiWv/ib9zYZI1Re5Tz/AB/wpFxlwdq2jzIiJUwORjnfuvTtav0VEA+doO0kawyPjd+01ytU6gAAAAAAAAey5OaI3iHmfw3RvblH+MZM9PNrPnX+k346d+81P+EDQoa/jTVdRkS8lDSo2NPJXusq/oi/qbcdNbdygV+n2+Q6ZY6a27lHS2+wFfpjpljpflHS/KBX6Y6faWOl+UdNfICv0wWOlsAJ+mg6aFnC/iMVArdNB00LOKjACt00HTQtYKOn6AVemh0njToSf8q/yLmCqodDmmK9y9igfMOs/wB8n/6jv5kJ+nxRSx0PE+s00SWigrZ4mIv8LZHIn2Q/MAAAAAAAAA2Q+DBt9Z4n/wC3h/qcbVdJDRz4febmncp9Y1OXU6SoqaauiZHnT2V0atcq3svenabacA84uFeY7+jo+o3rETJaSob05bedl7/oqgeu6aDpp7sWendTnp+gFXpoOmhZVioc9NfMCr00HTQs4qMFArdNPdgWcLgCxhsMCxhv9xj7uBXw9BhsWMPQYb/cCvh6DAs4e7jACtgY+5k88OFuVlRBTatPLPXypmlHSMzkRn8Tr2RE9V7T9rmhzJ0rlbw1LqupOzkW7KamavzTSW7Gpt5qfPbjLiut444mr9b1B2VVVyK9Wp3MTua1NkSyAVeIK+PVeINUrokc2Gqq5p2I5O1GuerkvvZT88AAAAAAAAADk9Zym1pOH+ZXDdc6o/CxR10aSSXsiMVbOvtZVPJAD6ktRr2o5qo5qpdHIt0VPM5wMAfCHzMl4l0Cq4b1KrWev09UdS9RfmdAqWtfxxVP0U2Hw93Ar4IMCxh7uc4AVsBgWcPdzjECvj7uCzhv9wBPgowLGHu55TjLmjwnwBErtc1ykopLKqU/UR8zvRiXX7AejwGBrrxF8bnDVDK6PR9Fr9UsnZLM5sDVXw7O1bGLuYPxi8TcV6XHRaJSpww5XKs1TTzdWV7fBqKrUx9U7QN2JJI4VTqSNjVe7NyIfjcScbaBwhp0ldq+q0tFTsS/zypk7Zre9V9D5oajr+qaxOs1fqNVWSqqrnPM56/dSk+R8ls3udb+JbgZK5883ZObXF61MCOi0ajRYqKJ6Wdj2Xe7dV+1jGYAAAAAAAAAAAAAABa0uvn0vUaerp6iWlmiejmzQuVr27op9LuBOMtG454fpq/RtRZqESMa17r/AOka5ES6PTwU+Y56LgXj7WuXWvQ6rotU6CZi/PGvbHKni1zfFAPpxh7uc4bfcxZye+Irh3mnDFSSSs0nXsfnoZ3oiSL/AMNV/a9O8y1h7uBXwGHu5Yw93GHu4FfDb7gsYe7gDRTmt8WnEvG8s1HoTn8PaM7sRsSp+IkT8z07vRpgueeSqldLNI+aV3a58jlc5V3VToAFgAAAAAAAAAAAAAAAAAAAAAAAd4ZpKaZksMjopWLk17FsrV80VDabkb8XctGtLoXGqrNCqpHFrCL80fbZElTxT8xqsAPrJQ1dPqVJFVUk8dTTStR8csTkc1yL4opPgvmfOrk18RHEPKSpZTJI7UtBc5FkoJ3KqMTxWNf3V27lN9+AeYGhcy9Ci1XQqxtVAtkkjsqPhf4tci9yp+gH73TXzBPh5IAPkaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHrOXHMvXeV3EEOq6LVOjxcnWpnKvSnb4tenj6gAfQfk7zv4f5w6SktBKlJqcSf6xpszk6jFt2uT+Ju4AA/9k=";
    }
    MyProfileComponent.prototype.ngOnInit = function () {
        this.getUserData();
        this.changePasswordForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
            oldPassword: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].minLength(8), _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(16)]),
            newPassword: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].minLength(8), _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(16)]),
            confirmPassword: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required])
        });
        this.changeEmailForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(256), _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)])),
        });
    };
    MyProfileComponent.prototype.getUserData = function () {
        var _this = this;
        var apireq = {
            userId: localStorage.getItem('_id')
        };
        this.service.postApi('/api/v1/admin/getUserDetail', apireq, 1).subscribe(function (success) {
            console.log(success);
            if (success.response_code == 200) {
                _this.userDetail = success.Data;
                //this.image = success.Data.profilePic
                _this.image = "https://res.cloudinary.com/sumit9211/image/upload/v1542879708/und4l1ruuang3cexhb9a.jpg";
                console.log("userDetails", _this.userDetail);
                console.log(_this.image);
            }
            else {
                console.log(success.response_message);
            }
        }, function (error) {
            console.log("Something went wrong");
        });
    };
    MyProfileComponent.prototype.editProfile = function (data) {
        var _this = this;
        if (this.changePasswordForm.invalid || (data['newPassword'] != data['confirmPassword'])) {
            return;
        }
        $('#edit_profile_modal').modal('hide');
        var apireq = {
            userId: localStorage.getItem('_id'),
            password: data.oldPassword,
            newPassword: data.newPassword
        };
        console.log("Api Data======>>>>>", apireq);
        this.service.postApi('/api/v1/admin/passwordChange', apireq, 1).subscribe(function (success) {
            console.log(success);
            if (success.response_code == 200) {
                _this.router.navigate(['/admin/dashboard']);
                _this.service.succ(success.response_message);
            }
            else {
                _this.service.err(success.response_message);
            }
        }, function (error) {
            console.log("Something went wrong");
        });
    };
    MyProfileComponent.prototype.editEmailProfile = function (dataa) {
        var _this = this;
        if (this.changeEmailForm.invalid) {
            return;
        }
        var apireq1 = {
            userId: localStorage.getItem('_id'),
            email: dataa.email
        };
        console.log(apireq1);
        this.service.postApi('/api/v1/admin/emailChange', apireq1, 1).subscribe(function (success) {
            console.log(success);
            if (success.response_code == 200) {
                $('#edit_profile_modal1').modal('hide');
                _this.service.succ(success.response_message);
                _this.router.navigate(['/admin/dashboard']);
            }
            else {
                _this.service.err(success.response_message);
                console.log(success.response_message);
            }
        }, function (error) {
            console.log("Something went wrong");
        });
    };
    MyProfileComponent.prototype.reset = function () {
        this.changePasswordForm.controls['oldPassword'].setValue(null);
        this.changePasswordForm.controls['newPassword'].setValue(null);
        this.changePasswordForm.controls['confirmPassword'].setValue(null);
    };
    MyProfileComponent.prototype.openModal = function (id, email) {
        this.userEmail = email;
        this.changeEmailForm.controls['email'].setValue(this.userEmail);
        $('#' + id).modal({ backdrop: 'static', keyboard: false });
    };
    MyProfileComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-my-profile',
            template: __webpack_require__(/*! ./my-profile.component.html */ "./src/app/my-profile/my-profile.component.html"),
            styles: [__webpack_require__(/*! ./my-profile.component.css */ "./src/app/my-profile/my-profile.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _app_service__WEBPACK_IMPORTED_MODULE_2__["AppService"]])
    ], MyProfileComponent);
    return MyProfileComponent;
}());



/***/ }),

/***/ "./src/app/post-management/post-detail/post-detail.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/post-management/post-detail/post-detail.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/post-management/post-detail/post-detail.component.html":
/*!************************************************************************!*\
  !*** ./src/app/post-management/post-detail/post-detail.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<main class=\"middle-content\">\n    <!-- Page Title Start -->\n    <div class=\"page_title_block\">\n        <h1 class=\"page_title\">Post Detail</h1>\n    </div>\n    <!-- Page Title End -->\n    <div class=\"content-section\">\n        <div class=\"outer-box\">\n            <div class=\"custom_tabs common-tabs\">\n                <div class=\"tab-content\">\n                    <div class=\"tab-pane active show\" id=\"general_info\">\n                        <div class=\"order-view mt30 max-WT-700 mrgn-0-auto\">\n                            <div class=\"main-block-innner mb40 mt40\">\n                                <div class=\"add-store-block input-style\">\n                                    <div class=\"user-profile\">\n                                        <div class=\"image-box\">\n                                          <ng-container *ngIf=\"item?.thumbImage != ''; else elseTemplate\">\n                                              <img src=\"{{ item?.thumbImage }}\" class=\"profile-pic\">\n                                          </ng-container>\n                                          <ng-template #elseTemplate>\n                                            <img src=\"assets/img/profile-img.jpg\" class=\"profile-pic\">\n                                          </ng-template>\n                                        </div>\n                                    </div>\n\n                                    <div class=\"form-group row align-items-baseline\">\n                                        <div class=\"video\">\n                                        \n                                        <iframe *ngIf=\"iframe_html\"\n                                               allowfullscreen=\"allowfullscreen\"\n                                               mozallowfullscreen=\"mozallowfullscreen\"\n                                               msallowfullscreen=\"msallowfullscreen\"\n                                               oallowfullscreen=\"oallowfullscreen\"\n                                               webkitallowfullscreen=\"webkitallowfullscreen\"\n                                               [src]=\"iframe_html\">\n                                               </iframe>\n                                                            \n                                      <!--   <cl-video public-id=\"item?.publicId\" cloud_name=\"xplanator\" \n                                           controls=\"true\" preload=\"none\" width=\"925\" crop=\"scale\" \n                                           autoplay=\"true\"  class=\"manipulation-video\"\n                                           fallback-content=\"Your browser does not support HTML5 video tags\">\n                                        <cl-transformation overlay=\"text:arial_20:Cloudinary%20features\" \n                                           color=\"red\" gravity=\"north\" y=\"12\"></cl-transformation>\n                                        </cl-video> -->\n\n                                            <!-- <iframe width=\"100%\" height=\"300\" [src]=\"iframe_html\"></iframe> -->\n\n                                          <!--   <video controls (click)=\"toggleVideo()\" #videoPlayer>\n                                                <source src=\"{{ item?.video }}\" type=\"video/wmv\">\n                                                Browser not supported\n                                            </video> -->\n                                          <!--   <video controls (click)=\"toggleVideo()\" #videoPlayer width=\"320\" height=\"240\" controls>\n                                              <source src=\"{{iframe_html}}\">\n                                            </video> -->\n                                        </div>\n                                    </div>\n                                     <div class=\"form-group row align-items-baseline\">\n                                        <label class=\"col-md-5\">Post ID :</label>\n                                        <div class=\"col-md-7\">\n                                            <label>{{ item?._id }}</label>\n                                        </div>\n                                    </div>\n                                    <div class=\"form-group row align-items-baseline\">\n                                        <label class=\"col-md-5\">Post Title :</label>\n                                        <div class=\"col-md-7\">\n                                            <label>{{ item?.videoTitle }}</label>\n                                        </div>\n                                    </div>\n                                    <div class=\"form-group row align-items-baseline\">\n                                        <label class=\"col-md-5\">Post Description :</label>\n                                        <div class=\"col-md-7\">\n                                            <label>{{ item?.videosDescription }}</label>\n                                        </div>\n                                    </div>\n                                     <div class=\"form-group row align-items-baseline\">\n                                        <label class=\"col-md-5\">Video Time :</label>\n                                        <div class=\"col-md-7\" *ngIf = \"item?.duration\">\n                                            <label>{{ item?.duration }} &nbsp;sec</label>\n                                        </div>\n                                         <div class=\"col-md-7\" *ngIf = \"!item?.duration\">\n                                            <label></label>\n                                        </div>\n                                    </div>\n                                     <div class=\"form-group row align-items-baseline\">\n                                        <label class=\"col-md-5\">Video Data Size :</label>\n                                        <div class=\"col-md-7\" *ngIf = \"item?.videoSize\">\n                                            <label>{{ item?.videoSize }} &nbsp;KB</label>\n                                        </div>\n                                         <div class=\"col-md-7\" *ngIf = \"!item?.videoSize\">\n                                            <label></label>\n                                        </div>\n                                    </div>\n                                    \n                                    <div class=\"form-group row align-items-baseline\">\n                                        <label class=\"col-md-5\">Name (Real Name) :</label>\n                                        <div class=\"col-md-7\">\n                                            <label>{{ item?.userId?.name }}</label>\n                                        </div>\n                                    </div>\n                                    <div class=\"form-group row align-items-baseline\">\n                                        <label class=\"col-md-5\">Created By (User Name) :</label>\n                                        <div class=\"col-md-7\">\n                                            <label>{{ item?.userId?.username }}</label>\n                                        </div>\n                                    </div>\n\n\n                                    <div class=\"form-group row align-items-baseline\">\n                                        <label class=\"col-md-5\">Total Comments : </label>\n                                        <div class=\"col-md-7\">\n                                            <label>{{ item?.commentCount }}</label>\n                                        </div>\n                                    </div>\n                                    <div class=\"form-group row align-items-baseline\">\n                                        <label class=\"col-md-5\">Total Likes :</label>\n                                        <div class=\"col-md-7\">\n                                            <label>{{ item?.likeCount }}</label>\n                                        </div>\n                                    </div>\n                                    <div class=\"form-group row align-items-baseline\">\n                                        <label class=\"col-md-5\">Average Rating :</label>\n                                        <div class=\"col-md-7\">\n                                            <label>{{ item?.rateAvg }}</label>\n                                        </div>\n                                    </div>\n                                    <div class=\"form-group row align-items-baseline\">\n                                        <label class=\"col-md-5\">Total Reports :</label>\n                                        <div class=\"col-md-7\">\n                                            <label>{{ item?.reportCount }}</label>\n                                        </div>\n                                    </div>\n                                    <div class=\"form-group row align-items-baseline\">\n                                        <label class=\"col-md-5\">Total Views :</label>\n                                        <div class=\"col-md-7\">\n                                            <label>{{ item?.viewCount }}</label>\n                                        </div>\n                                    </div>\n\n                                     <div class=\"form-group row align-items-baseline\">\n                                        <label class=\"col-md-5\">Total Reshare :</label>\n                                        <div class=\"col-md-7\">\n                                            <label>{{ item?.shareCount }}</label>\n                                        </div>\n                                    </div>\n                                      <div class=\"form-group row align-items-baseline\">\n                                        <label class=\"col-md-5\">Total Ext-Share :</label>\n                                        <div class=\"col-md-7\">\n                                            <label>{{ item?.retweetCount }}</label>\n                                        </div>\n                                    </div>\n                                    <div class=\"form-group row align-items-baseline\">\n                                        <label class=\"col-md-5\">Status :</label>\n                                        <div class=\"col-md-7\">\n                                            <label>{{ item?.status }}</label>\n                                        </div>\n                                    </div>\n                                    <div class=\"form-group row align-items-baseline\">\n                                        <label class=\"col-md-5\">Visibility :</label>\n                                        <div class=\"col-md-7\">\n                                            <label>{{ item?.visibility }}</label>\n                                        </div>\n                                    </div>\n                                    <div class=\"form-group row align-items-baseline\">\n                                        <label class=\"col-md-5\">Created Date & Time :</label>\n                                        <div class=\"col-md-7\">\n                                            <label>{{ item?.createdAt1 | date:'dd/MM/yyyy h:mm a' }}</label>\n                                        </div>\n                                    </div>\n                                    <div class=\"form-group row align-items-baseline\">\n                                        <label class=\"col-md-5\">Updated Date & Time :</label>\n                                        <div class=\"col-md-7\">\n                                            <label>{{ item?.updatedAt | date:'dd/MM/yyyy h:mm a' }}</label>\n                                        </div>\n                                    </div>\n                                     <div class=\"form-group row align-items-baseline\">\n                                        <button class=\"btn btn-primary\" [routerLink]=\"['/admin/postManagement']\" style=\"background-color:rgba(10, 17, 123, 1)\">Back</button>\n                                      </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <!-- Table Responsive End -->\n    </div>\n</main>"

/***/ }),

/***/ "./src/app/post-management/post-detail/post-detail.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/post-management/post-detail/post-detail.component.ts ***!
  \**********************************************************************/
/*! exports provided: PostDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostDetailComponent", function() { return PostDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_app_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/app.service */ "./src/app/app.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_embed_video__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-embed-video */ "./node_modules/ngx-embed-video/dist/index.js");
/* harmony import */ var ngx_embed_video__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ngx_embed_video__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PostDetailComponent = /** @class */ (function () {
    function PostDetailComponent(serviceCaller, activatedRoute, embedService, senetizer) {
        this.serviceCaller = serviceCaller;
        this.activatedRoute = activatedRoute;
        this.embedService = embedService;
        this.senetizer = senetizer;
        this.temp = {};
        this.postID = {};
        this.item = {};
        this.postID = activatedRoute.snapshot.url[1].path;
    }
    PostDetailComponent.prototype.ngOnInit = function () {
        this.getDetail();
    };
    PostDetailComponent.prototype.getDetail = function () {
        var _this = this;
        this.temp.userId = localStorage.getItem('_id');
        this.temp.postId = this.postID;
        this.serviceCaller.postApi("/api/v1/admin/getPostDetail", this.temp, 0).subscribe(function (data) {
            // console.log('$$$$$$$$$$$$$$$', data);
            if (data.response_code == 200) {
                _this.item = data.result;
                var URL_1 = data.result.video;
                _this.spl = URL_1.split(".");
                console.log("this.split", _this.spl);
                _this.spl[_this.spl.length - 1] = 'mp4';
                console.log("this.split join=====>>", _this.spl);
                _this.spl = _this.spl.join(".");
                console.log("this.split afterjoin=====>>", _this.spl);
                // // var endType=spl[spl.length-1]
                // console.log('sssssssssssssssssssssssssss1----->',URL)
                // this.spl.pop();
                // this.spl.push('mp4')
                // console.log('sssssssssssssssssssssssssss2----->',this.sql)
                // this.sql.join(".")
                // console.log('sssssssssssssssssssssssssss3----->',this.sql)
                // this.iframe_html = this.embedService.embed(data.result.video);
                _this.iframe_html = _this.senetizer.bypassSecurityTrustResourceUrl(_this.spl);
            }
        });
    };
    PostDetailComponent.prototype.toggleVideo = function () {
        this.videoplayer.nativeElement.play();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('videoPlayer'),
        __metadata("design:type", Object)
    ], PostDetailComponent.prototype, "videoplayer", void 0);
    PostDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-post-detail',
            template: __webpack_require__(/*! ./post-detail.component.html */ "./src/app/post-management/post-detail/post-detail.component.html"),
            styles: [__webpack_require__(/*! ./post-detail.component.css */ "./src/app/post-management/post-detail/post-detail.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_app_service__WEBPACK_IMPORTED_MODULE_1__["AppService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            ngx_embed_video__WEBPACK_IMPORTED_MODULE_3__["EmbedVideoService"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["DomSanitizer"]])
    ], PostDetailComponent);
    return PostDetailComponent;
}());



/***/ }),

/***/ "./src/app/post-management/post-management.component.css":
/*!***************************************************************!*\
  !*** ./src/app/post-management/post-management.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/post-management/post-management.component.html":
/*!****************************************************************!*\
  !*** ./src/app/post-management/post-management.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<main class=\"middle-content\">\n  <!-- Page Title Start -->\n  <div class=\"page_title_block\">\n      <h1 class=\"page_title\">Post Management</h1>\n\n  </div>\n  <!-- Page Title End -->\n  <div class=\"content-section\">\n      <div class=\"outer-box\">\n          <!-- Gloabl Table Box Start -->\n          <div class=\"global-table no-radius p0\">\n              <div class=\"tab-content1\">\n                  <div class=\"tab-pane1\">\n                      <div class=\"sec_head_new\">\n                            <form [formGroup]=\"postForm\" #f=\"ngForm\" >\n                                <div class=\"row justify-content-between\">\n                                    <div class=\" col-md-3 \">\n                                        <div class=\"filter_search mb20 width100\">\n                                        <div class=\"input-group filter_search_group\">\n                                            <input type=\"text\" formControlName=\"search\" class=\"form-control\" placeholder=\"Search by post title\" title=\"Search by post title\">\n                                            <div class=\"input-group-append\">\n                                            <button class=\"btn btn_search_group\" type=\"button\"><img src=\"assets/img/icon-search.png\" alt=\"Search\"></button>\n                                            </div>\n                                        </div>\n                                        </div>\n                                    </div>\n                                    <div class=\"col-md-3 \">\n                                        <div class=\"head_flt_select input-label\">\n                                        <strong><span class=\"d-flex align-items-center\">From</span></strong>\n                                         <input type=\"date\" formControlName=\"fromDate\" class=\"form-control\" [(ngModel)]=\"element\" (ngModelChange)=\"Changed($event)\" placeholder=\"Search by date\" max= \"{{nowDate1 | date:'yyyy-MM-dd'}}\" onkeydown=\"return false\">\n                                        </div>\n                                    </div>\n    \n                         \n                                    <div class=\" col-md-3 \">\n                                        <div class=\"head_flt_select input-label\">\n                                        <b><span class=\"d-flex align-items-center\">To</span></b>\n                                      <input type=\"date\" formControlName=\"toDate\" min= \"{{nowDate2 | date:'yyyy-MM-dd'}}\" max= \"{{nowDate | date:'yyyy-MM-dd'}}\" onkeydown=\"return false\" class=\"form-control\"\n                                            placeholder=\"Search by date\">\n                                        </div>\n                                    </div>\n                                    <div class=\" col-md-3 \">\n                                        <div class=\"text-left\">\n                                            <button type=\"submit\"  (click)=\"searchFilter(postForm.value)\" class=\"btn  btn-theme form-group mr-3\">Search</button>\n                                            <button type=\"reset\" (click)=\"getList()\" class=\"btn  btn-theme form-group\">Reset</button>\n                                        </div>\n                                    </div>\n                                </div>\n                            </form>\n                      </div>\n                      <div class=\"table-responsive\">\n                          <table class=\"table table-bordered\">\n                              <thead>\n                                  <tr class=\"no_wrap_th\">\n                                      <th>ID</th>\n                                      <th>Post ID</th>\n                                      <th>Post Image</th>\n                                      <th>Post Title</th>\n                                      <th>Created By (User Name)</th>\n                                      <th>Name (Real Name)</th>\n                                      <th>Video Time</th>\n                                      <th>Video Data Size (KB)</th>\n                                      <th>Visibility</th>\n                                      <th>Total Views</th>\n                                      <th>Total Comments</th>\n                                      <th>Star Rating (Avg)</th>\n                                      <th>Total Likes</th>\n                                      <th>Total Reshare</th>\n                                      <th>Total Ext-Share</th>\n                                       <th>Status</th>\n                                      <th>Created Date & Time</th>\n                                      <th>Updated Date & Time</th>\n                                      <th class=\"action_td_btn3\">Action</th>\n                                  </tr>\n                              </thead>\n                              <ng-container *ngIf=\"items.length > 0; else elseTemplate\">\n                                    <tbody *ngFor=\"let item of items | paginate: {itemsPerPage:limit, currentPage:pageNumber, totalItems: pageData?.total } ; let i=index \" >\n                                        <tr>\n                                            <td>{{ (i+1) + srNo }}</td>\n                                             <td>{{ item?._id }}</td>\n                                            <td><img class=\"img-circle\"  alt=\"User Image\" height=\"50\" width=\"50\" style=\"border-radius:50%\" src=\"{{ item?.thumbImage }}\" ></td>\n                                            <td>{{ item?.videoTitle }}</td>\n                                            <td>{{ item?.userId.username }}</td>\n                                            <td>{{ item?.userId.name }}</td>\n                                            <td *ngIf = \"item.duration\">{{ item?.duration }}&nbsp;sec</td>\n                                            <td *ngIf = \"!item.duration\"></td>\n                                            <td>{{ item?.videoSize }}</td>\n                                            <td>{{ item?.visibility }}</td>\n                                            <td>{{ item?.viewCount }}</td>\n                                            <td>{{ item?.commentCount }}</td>\n                                            <td>{{ item?.rateAvg }}</td>\n                                            <td>{{ item?.likeCount }}</td>\n                                            <td>{{ item?.shareCount }}</td>\n                                            <td>{{ item?.retweetCount }}</td>\n                                            <td *ngIf=\"item?.status=='ACTIVE'\" style=\"color:green\">Active</td>\n                                            <td *ngIf=\"item?.status=='INACTIVE'\" style=\"color:red\">Inactive</td>\n                                            <td *ngIf=\"item?.status!='ACTIVE' && item?.status!='INACTIVE'\"></td>\n                                            <td>{{ item?.createdAt1 | date:'MM/dd/yyyy h:mm a' }}</td>\n                                            <td>{{ item?.updatedAt | date:'MM/dd/yyyy h:mm a' }}</td>\n                                            <td class=\"action_td_btn3\">\n                                                <a class=\"btn btn-primary mr-2\" (click)=\"postDetail(item)\" ><i class=\"fa fa-eye\" style=\"color:white\"> View</i></a>\n                                                <a class=\"btn btn-danger mr-2\" (click)=\"delete(item?._id)\" data-toggle=\"modal\" data-target=\"#delete\"><i class=\"fa fa-trash\" style=\"color:white\"> Delete</i></a>\n                                                <a class=\"btn btn-warning mr-2\" style=\"color:white\" *ngIf=\"item?.status=='ACTIVE'\" (click)=\"block(item?._id,item?.status)\" data-toggle=\"modal\" data-target=\"#block1\"><i class=\"fa fa-ban\" style=\"color:white\"> Inactive</i></a>\n                                                <a class=\"btn btn-warning mr-2\" style=\"color:white;background: green;min-width: 77px;border-color:green\" *ngIf=\"item?.status=='INACTIVE'\" (click)=\"block(item?._id,item?.status)\" data-toggle=\"modal\" data-target=\"#block1\"><i class=\"fa fa-ban\" style=\"color:white\"> Active</i></a>\n                                            </td>\n                                        </tr>\n                                    </tbody>\n                              </ng-container>\n                              <ng-template #elseTemplate>\n                                    <tbody >\n                                        <tr>\n                                            <td colspan=\"11\">No Data Found.</td>\n                                        </tr>\n                                    </tbody>\n                              </ng-template>\n                          </table>\n                      </div>\n                      <div class=\"custom-pagination mt20 text-right\">\n                        <pagination-controls (pageChange)=\"pagination($event)\"></pagination-controls>\n                      </div>\n                  </div>\n\n              </div>\n          </div>\n\n      </div>\n  </div>\n  <!-- Table Responsive End -->\n</main>\n\n\n<!-- delete_modal Start -->\n<div class=\"modal fade global-modal reset-modal\" id=\"block1\">\n    <div class=\"modal-dialog max-WT-500\">\n        <form class=\"change_password\">\n            <div class=\"modal-content\">\n                <div>\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n                    <div class=\"modal-body\">\n                        <div class=\"text-center modal_flax_height d-flex align-items-center justify-content-center\">\n                            <div class=\"w-100\">\n                                <p *ngIf=\"status === 'ACTIVE'\" >Are you sure you want to activate this post ?</p>\n                                <p *ngIf=\"status === 'INACTIVE'\" >Are you sure you want to deactivate this post?</p>\n                                <div>\n                                    <button type=\"submit\" (click)=\"block_mod()\" data-dismiss=\"modal\" class=\"btn btn-success mr-3\">Yes</button>\n                                    <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">Cancel</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>\n<!-- delete_modal End -->\n\n<!-- delete_modal Start -->\n<div class=\"modal fade global-modal reset-modal\" id=\"delete\">\n        <div class=\"modal-dialog max-WT-500\">\n          <form class=\"change_password\">\n            <div class=\"modal-content\">\n              <div>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n      \n                <div class=\"modal-body\">\n                  <div class=\"text-center modal_flax_height d-flex align-items-center justify-content-center\">\n                    <div class=\"w-100\">\n                      <p>Are you sure you want to delete this user?</p>\n                      <div>\n                        <button type=\"submit\" class=\"btn btn-success mr-3\" (click)=\"deleteApi()\" data-dismiss=\"modal\" >Delete</button>\n                        <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">Cancel</button>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </form>\n        </div>\n      </div>\n      <!-- delete_modal End -->"

/***/ }),

/***/ "./src/app/post-management/post-management.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/post-management/post-management.component.ts ***!
  \**************************************************************/
/*! exports provided: PostManagementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostManagementComponent", function() { return PostManagementComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app.service */ "./src/app/app.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PostManagementComponent = /** @class */ (function () {
    function PostManagementComponent(serviceCaller, router) {
        this.serviceCaller = serviceCaller;
        this.router = router;
        this.temp = {};
        this.items = {};
        this.pageNumber = 1;
        this.limit = 10;
        this.search = "";
    }
    PostManagementComponent.prototype.ngOnInit = function () {
        this.nowDate = new Date();
        this.nowDate1 = new Date();
        this.nowDate2 = '';
        this.postForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            search: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](''),
            toDate: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](''),
            fromDate: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('')
        });
        this.getList();
    };
    PostManagementComponent.prototype.searchFilter = function (searchData) {
        var _this = this;
        if (searchData.fromDate)
            this.fromDates = new Date(searchData.fromDate).toISOString();
        else
            this.fromDates = "";
        if (searchData.toDate)
            this.toDates = (new Date(new Date(searchData.toDate).getTime() + 24 * 60 * 60 * 1000).toISOString());
        else
            this.toDates = "";
        this.temp.userId = "tggadfgda";
        this.temp.search = searchData.search;
        this.temp.limit = this.limit;
        this.temp.pageNumber = this.pageNumber;
        this.temp.fromDate = this.fromDates;
        this.temp.toDate = this.toDates;
        this.serviceCaller.postApi("/api/v1/admin/postList", this.temp, 0).subscribe(function (data) {
            // console.log("@@@@@@@@@@@", data);
            if (data.response_code == 200) {
                _this.items = data.result.docs;
                _this.pageData = data.result;
                _this.srNo = (_this.pageNumber - 1) * 10;
            }
        });
    };
    PostManagementComponent.prototype.postDetail = function (detail) {
        // console.log('############', detail);
        this.router.navigate(['../../admin/postDetails/' + detail._id]);
    };
    PostManagementComponent.prototype.getList = function () {
        var _this = this;
        this.temp.userId = localStorage.getItem('_id');
        this.temp.search = "";
        this.temp.fromDate = "";
        this.temp.toDate = "";
        this.temp.limit = this.limit;
        this.temp.pageNumber = this.pageNumber;
        this.serviceCaller.postApi("/api/v1/admin/postList", this.temp, 0).subscribe(function (data) {
            //  console.log("@@@@@@@@@@@", data);
            if (data.response_code == 200) {
                _this.items = data.result.docs;
                _this.pageData = data.result;
                _this.srNo = (_this.pageNumber - 1) * 10;
            }
        });
    };
    PostManagementComponent.prototype.pagination = function ($event) {
        this.pageNumber = $event;
        this.getList();
    };
    PostManagementComponent.prototype.block = function (id, status) {
        this.id = id;
        if (status == 'ACTIVE') {
            this.status = 'INACTIVE';
        }
        else {
            this.status = 'ACTIVE';
        }
    };
    PostManagementComponent.prototype.block_mod = function () {
        var _this = this;
        var a = {
            "postId": this.id,
            "userId": "dafgafgadfg",
            "status": this.status
        };
        this.serviceCaller.postApi("/api/v1/admin/updatePostStatus", a, 0).subscribe(function (data) {
            if (data.response_code == 200) {
                _this.serviceCaller.succ(data.response_message);
                _this.getList();
            }
            else {
                _this.getList();
            }
        });
    };
    PostManagementComponent.prototype.Changed = function (event) {
        if (event) {
            this.nowDate2 = event;
            this.nowDate = new Date();
        }
    };
    PostManagementComponent.prototype.delete = function (id) {
        this.id = id;
    };
    PostManagementComponent.prototype.deleteApi = function () {
        var _this = this;
        var deleteData = {
            "postId": this.id,
            "userId": localStorage.getItem('_id')
        };
        this.serviceCaller.postApi("/api/v1/admin/deletePost", deleteData, 0).subscribe(function (data) {
            console.log('$$$$$$$$$$$$$$$', data);
            if (data.response_code == 200) {
                _this.serviceCaller.succ(data.response_message);
            }
            else {
                _this.serviceCaller.err(data.response_message);
            }
            _this.getList();
        });
    };
    PostManagementComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-post-management',
            template: __webpack_require__(/*! ./post-management.component.html */ "./src/app/post-management/post-management.component.html"),
            styles: [__webpack_require__(/*! ./post-management.component.css */ "./src/app/post-management/post-management.component.css")]
        }),
        __metadata("design:paramtypes", [_app_service__WEBPACK_IMPORTED_MODULE_1__["AppService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], PostManagementComponent);
    return PostManagementComponent;
}());



/***/ }),

/***/ "./src/app/report-management/report-detail/report-detail.component.css":
/*!*****************************************************************************!*\
  !*** ./src/app/report-management/report-detail/report-detail.component.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/report-management/report-detail/report-detail.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/report-management/report-detail/report-detail.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<main class=\"middle-content\">\n    <!-- Page Title Start -->\n    <div class=\"page_title_block\">\n        <h1 class=\"page_title\">Report Detail</h1>\n    </div>\n    <!-- Page Title End -->\n    <div class=\"content-section\">\n        <div class=\"outer-box\">\n            <div class=\"custom_tabs common-tabs\">\n                <div class=\"tab-content\">\n                    <div class=\"tab-pane active show\" id=\"general_info\">\n                        <div class=\"order-view mt30 max-WT-700 mrgn-0-auto\">\n                            <div class=\"main-block-innner mb40 mt40\">\n                                <div class=\"add-store-block input-style\">\n                                    <div class=\"user-profile\">\n                                        <div class=\"image-box\">\n                                          <ng-container *ngIf=\"item?.postId.thumbImage != ''; else elseTemplate\">\n                                              <img src=\"{{ item?.postId.thumbImage }}\" class=\"profile-pic\">\n                                          </ng-container>\n                                          <ng-template #elseTemplate>\n                                            <img src=\"assets/img/profile-img.jpg\" class=\"profile-pic\">\n                                          </ng-template>\n                                        </div>\n                                    </div>\n                                    <div class=\"form-group row align-items-baseline\">\n                                        <label class=\"col-md-5\">Post ID :</label>\n                                        <div class=\"col-md-7\">\n                                            <label>{{ item?.postId._id }}</label>\n                                        </div>\n                                    </div>\n                                    <div class=\"form-group row align-items-baseline\">\n                                        <label class=\"col-md-5\">Post Title :</label>\n                                        <div class=\"col-md-7\">\n                                            <label>{{ item?.postId.videoTitle }}</label>\n                                        </div>\n                                    </div>\n                                    <div class=\"form-group row align-items-baseline\">\n                                        <label class=\"col-md-5\">Post Description :</label>\n                                        <div class=\"col-md-7\">\n                                            <label>{{ item?.postId.videosDescription }}</label>\n                                        </div>\n                                    </div>\n                                    <div class=\"form-group row align-items-baseline\">\n                                        <label class=\"col-md-5\">Reported By :</label>\n                                        <div class=\"col-md-7\">\n                                            <label>{{ item?.reportBy.name }}</label>\n                                        </div>\n                                    </div>\n                                    <div class=\"form-group row align-items-baseline\">\n                                        <label class=\"col-md-5\">Report Type:</label>\n                                        <div class=\"col-md-7\">\n                                            <label>{{ item?.report }}</label>\n                                        </div>\n                                    </div>\n                                    <div class=\"form-group row align-items-baseline\">\n                                        <label class=\"col-md-5\">Reported Date & Time:</label>\n                                        <div class=\"col-md-7\">\n                                            <label>{{ item?.createdAt | date:'dd/MM/yyyy h:mm a' }}</label>\n                                        </div>\n                                    </div>\n                                     <div class=\"form-group row align-items-baseline\">\n                                        <label class=\"col-md-5\">Inactive Date & Time:</label>\n                                        <div class=\"col-md-7\">\n                                            <label>{{ item?.postId.actionTime | date:'dd/MM/yyyy h:mm a' }}</label>\n                                        </div>\n                                    </div>\n                                     <div class=\"form-group row align-items-baseline\">\n                                        <button class=\"btn btn-primary\" [routerLink]=\"['/admin/reportManagement']\" style=\"background-color:rgba(10, 17, 123, 1)\">Back</button>\n                                      </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <!-- Table Responsive End -->\n    </div>\n</main>"

/***/ }),

/***/ "./src/app/report-management/report-detail/report-detail.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/report-management/report-detail/report-detail.component.ts ***!
  \****************************************************************************/
/*! exports provided: ReportDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportDetailComponent", function() { return ReportDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_app_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/app.service */ "./src/app/app.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ReportDetailComponent = /** @class */ (function () {
    function ReportDetailComponent(serviceCaller, activatedRoute) {
        this.serviceCaller = serviceCaller;
        this.activatedRoute = activatedRoute;
        this.temp = {};
        this.item = {};
        this.reportID = activatedRoute.snapshot.url[1].path;
    }
    ReportDetailComponent.prototype.ngOnInit = function () {
        this.getDetail();
    };
    ReportDetailComponent.prototype.getDetail = function () {
        var _this = this;
        this.temp.userId = localStorage.getItem('_id');
        this.temp.reportId = this.reportID;
        this.serviceCaller.postApi("/api/v1/admin/reportDetail", this.temp, 0).subscribe(function (data) {
            console.log('$$$$$$$$$$$$$$$', data);
            if (data.response_code == 200) {
                _this.item = data.result[0];
            }
        });
    };
    ReportDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-report-detail',
            template: __webpack_require__(/*! ./report-detail.component.html */ "./src/app/report-management/report-detail/report-detail.component.html"),
            styles: [__webpack_require__(/*! ./report-detail.component.css */ "./src/app/report-management/report-detail/report-detail.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_app_service__WEBPACK_IMPORTED_MODULE_1__["AppService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], ReportDetailComponent);
    return ReportDetailComponent;
}());



/***/ }),

/***/ "./src/app/report-management/report-management.component.css":
/*!*******************************************************************!*\
  !*** ./src/app/report-management/report-management.component.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/report-management/report-management.component.html":
/*!********************************************************************!*\
  !*** ./src/app/report-management/report-management.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<main class=\"middle-content\">\n    <!-- Page Title Start -->\n    <div class=\"page_title_block\">\n      <h1 class=\"page_title\">Report Management</h1>\n  \n    </div>\n    <!-- Page Title End -->\n    <div class=\"content-section\">\n      <div class=\"outer-box\">\n        <!-- Gloabl Table Box Start -->\n        <div class=\"global-table no-radius p0\">\n          <div class=\"tab-content1\">\n            <div class=\"tab-pane1\">\n              <div class=\"sec_head_new\">\n                <form [formGroup]=\"searchForm\" (ngSubmit)=\"searchFilter(searchForm.value)\" >\n                  <div class=\"row justify-content-between\">\n                    <div class=\" col-md-3 \">\n                        <div class=\"filter_search mb20 width100\">\n                        <div class=\"input-group filter_search_group\">\n                            <input type=\"text\" formControlName=\"search\" class=\"form-control\" placeholder=\"Search by report type\" title=\"Search by report type\">\n                            <div class=\"input-group-append\">\n                            <button class=\"btn btn_search_group\" type=\"button\"><img src=\"assets/img/icon-search.png\" alt=\"Search\"></button>\n                            </div>\n                        </div>\n                        </div>\n                    </div>\n                    <!-- <div class=\"col-md-3 \">\n                        <div class=\"head_flt_select input-label\">\n                        <strong><span class=\"d-flex align-items-center\">From</span></strong>\n                        <input type=\"date\" formControlName=\"fromDate\" class=\"form-control\" \n                            placeholder=\"Search by date\">\n                        </div>\n                    </div>\n                    <div class=\" col-md-3 \">\n                        <div class=\"head_flt_select input-label\">\n                        <b><span class=\"d-flex align-items-center\">To</span></b>\n                        <input type=\"date\" formControlName=\"toDate\"  class=\"form-control\"\n                            placeholder=\"Search by date\">\n                        </div>\n                    </div> -->\n                    <div class=\" col-md-3 \">\n                        <div class=\"text-left\">\n                            <button type=\"submit\" class=\"btn  btn-theme form-group mr-3\">Search</button>\n                            <button type=\"reset\" (click)=\"getList()\" class=\"btn  btn-theme form-group\">Reset</button>\n                        </div>\n                    </div>\n                  </div>\n                </form>\n              </div>\n              <div class=\"table-responsive\">\n                <table class=\"table table-bordered\">\n                  <thead>\n                    <tr class=\"no_wrap_th\">\n                      <th>ID</th>\n                      <th>Report ID</th>\n                      <th>Post Image</th>\n                      <th>Post Title</th>\n                      <th>Reported By</th>\n                      <th>Report Type</th>\n                      <th>Reported Date & Time</th>\n                      <th class=\"action_td_btn3\">Action</th>\n                      <th class=\"action_td_btn3\">Action Date & Time</th>\n                    </tr>\n                  </thead>\n                  <ng-container *ngIf=\"items.length > 0; else elseTemplate\">\n                    <tbody>\n                      <tr *ngFor='let x of items | paginate: { itemsPerPage: limit, currentPage: pageNumber , totalItems: pageData?.total };let i=index'>\n                        <td>{{ (i+1) + srNo }}</td>\n                        <td>{{ x?._id }}</td>\n                        <td><img class=\"img-circle\"  alt=\"Image\" height=\"50\" width=\"50\" style=\"border-radius:50%\" src=\"{{ x?.postData[0].thumbImage }}\" ></td>\n                        <td>{{ x?.postData[0].videoTitle }}</td>\n                        <td>{{ x?.userData[0].name }}</td>\n                        <td>{{ x?.report }}</td>\n                        <td>{{x?.createdAt | date:'MM/dd/yyyy h:mm a' }}</td>\n                        <td class=\"action_td_btn3\">\n                          <a class=\"btn btn-primary mr-2\" (click)=\"reportDetail(x)\" ><i class=\"fa fa-eye\" style=\"color:white\"> View</i></a>\n                          <a class=\"btn btn-danger mr-2\" (click)=\"delete(x?._id)\" data-toggle=\"modal\" data-target=\"#delete\"><i class=\"fa fa-trash\" style=\"color:white\"> Delete</i></a>\n                           <a class=\"btn btn-warning mr-2\" style=\"color:white\" *ngIf=\"x?.postData[0].status=='ACTIVE'\" (click)=\"block(x?.postData[0]._id,x?.postData[0].status)\" data-toggle=\"modal\" data-target=\"#block1\"><i class=\"fa fa-ban\" style=\"color:white\"> Inactive</i></a>\n                          <a class=\"btn btn-warning mr-2\" style=\"color:white;background: green;min-width: 77px;border-color:green\" *ngIf=\"x?.postData[0].status=='INACTIVE'\" (click)=\"block(x?.postData[0]._id,x?.postData[0].status)\" data-toggle=\"modal\" data-target=\"#block1\"><i class=\"fa fa-ban\" style=\"color:white\"> Active</i></a>\n                        </td>\n                        <td>{{x?.postData[0].actionTime | date:'dd/MM/yyyy h:mm a'}}</td>\n                      </tr>\n                    </tbody>\n                  </ng-container>\n                  <ng-template #elseTemplate>\n                    <tbody>\n                      <tr>\n                        <td colspan=\"6\">No Data Found.</td>\n                      </tr>\n                    </tbody>\n                  </ng-template>\n                </table>\n              </div>\n              <div class=\"custom-pagination mt20 text-right\">\n                  <pagination-controls (pageChange)=\"pagination($event)\"></pagination-controls>\n                </div>\n            </div>\n  \n          </div>\n        </div>\n  \n      </div>\n    </div>\n    <!-- Table Responsive End -->\n  </main>\n  \n  <!-- delete_modal Start -->\n  <div class=\"modal fade global-modal reset-modal\" id=\"delete\">\n    <div class=\"modal-dialog max-WT-500\">\n      <form class=\"change_password\">\n        <div class=\"modal-content\">\n          <div>\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n              <div class=\"modal-body\">\n              <div class=\"text-center modal_flax_height d-flex align-items-center justify-content-center\">\n                <div class=\"w-100\">\n                  <p>Are you sure you want to delete this report?</p>\n                  <div>\n                    <button type=\"submit\" class=\"btn btn-info mr-3\" data-dismiss=\"modal\" (click)=\"deleteApi()\">Submit</button>\n                    <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">Cancel</button>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n  <!-- delete_modal End -->\n  <!-- delete_modal Start -->\n<div class=\"modal fade global-modal reset-modal\" id=\"block1\">\n    <div class=\"modal-dialog max-WT-500\">\n        <form class=\"change_password\">\n            <div class=\"modal-content\">\n                <div>\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n                    <div class=\"modal-body\">\n                        <div class=\"text-center modal_flax_height d-flex align-items-center justify-content-center\">\n                            <div class=\"w-100\">\n                                <p *ngIf=\"status === 'ACTIVE'\" >Are you sure you want to activate this post ?</p>\n                                <p *ngIf=\"status === 'INACTIVE'\" >Are you sure you want to deactivate this post?</p>\n                                <div>\n                                    <button type=\"submit\" (click)=\"block_mod()\" data-dismiss=\"modal\" class=\"btn btn-success mr-3\">Yes</button>\n                                    <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">Cancel</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/report-management/report-management.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/report-management/report-management.component.ts ***!
  \******************************************************************/
/*! exports provided: ReportManagementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportManagementComponent", function() { return ReportManagementComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../app.service */ "./src/app/app.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ReportManagementComponent = /** @class */ (function () {
    function ReportManagementComponent(serviceCaller, router) {
        this.serviceCaller = serviceCaller;
        this.router = router;
        this.temp = {};
        this.items = {};
        this.pageNumber = 1;
        this.limit = 10;
    }
    ReportManagementComponent.prototype.ngOnInit = function () {
        this.formValidation();
        this.getList();
    };
    ReportManagementComponent.prototype.searchFilter = function (searchData) {
        var _this = this;
        this.search = searchData.search;
        this.temp.userId = "tggadfgda";
        this.temp.search = this.search;
        this.temp.limit = this.limit;
        this.temp.pageNumber = this.pageNumber;
        this.serviceCaller.postApi("/api/v1/admin/reportList", this.temp, 0).subscribe(function (data) {
            // console.log("@@@@@@@@@@@", data);
            if (data.response_code == 200) {
                _this.items = data.data.result;
                _this.pageData = data.data.result;
                _this.srNo = (_this.pageNumber - 1) * 10;
            }
        });
    };
    ReportManagementComponent.prototype.formValidation = function () {
        this.searchForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            search: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](''),
            fromDate: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](''),
            toDate: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('')
        });
    };
    ReportManagementComponent.prototype.getList = function () {
        var _this = this;
        this.temp.userId = localStorage.getItem('_id');
        this.temp.search = "";
        this.temp.limit = this.limit;
        this.temp.pageNumber = this.pageNumber;
        this.serviceCaller.postApi("/api/v1/admin/reportList", this.temp, 0).subscribe(function (data) {
            // console.log('@@@@@@@@@@@@', data.data.result);
            _this.items = data.data.result;
            _this.pageData = data.data.result;
            _this.srNo = (_this.pageNumber - 1) * 10;
        });
    };
    ReportManagementComponent.prototype.pagination = function ($event) {
        this.pageNumber = $event;
        this.getList();
    };
    ReportManagementComponent.prototype.reportDetail = function (report) {
        this.router.navigate(['../../admin/reportDetails/' + report._id]);
    };
    ReportManagementComponent.prototype.delete = function (id) {
        this.id = id;
    };
    ReportManagementComponent.prototype.deleteApi = function () {
        var _this = this;
        var deleteData = {
            "reportId": this.id,
            "userId": localStorage.getItem('_id')
        };
        this.serviceCaller.postApi("/api/v1/admin/deleteReport", deleteData, 0).subscribe(function (data) {
            if (data.response_code == 200) {
                _this.serviceCaller.succ(data.response_message);
            }
            else {
                _this.serviceCaller.err(data.response_message);
            }
            _this.getList();
        });
    };
    ReportManagementComponent.prototype.block = function (id, status) {
        this.ids = id;
        if (status == 'ACTIVE') {
            this.status = 'INACTIVE';
        }
        else {
            this.status = 'ACTIVE';
        }
    };
    ReportManagementComponent.prototype.block_mod = function () {
        var _this = this;
        var a = {
            "postId": this.ids,
            "userId": "dafgafgadfg",
            "status": this.status
        };
        this.serviceCaller.postApi("/api/v1/admin/updatePostStatus", a, 0).subscribe(function (data) {
            if (data.response_code == 200) {
                _this.serviceCaller.succ(data.response_message);
                _this.getList();
            }
            else {
                _this.getList();
            }
        });
    };
    ReportManagementComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-report-management',
            template: __webpack_require__(/*! ./report-management.component.html */ "./src/app/report-management/report-management.component.html"),
            styles: [__webpack_require__(/*! ./report-management.component.css */ "./src/app/report-management/report-management.component.css")]
        }),
        __metadata("design:paramtypes", [_app_service__WEBPACK_IMPORTED_MODULE_2__["AppService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], ReportManagementComponent);
    return ReportManagementComponent;
}());



/***/ }),

/***/ "./src/app/reset-password/reset-password.component.css":
/*!*************************************************************!*\
  !*** ./src/app/reset-password/reset-password.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/reset-password/reset-password.component.html":
/*!**************************************************************!*\
  !*** ./src/app/reset-password/reset-password.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"login-wrapper\">\n    <div class=\"container-common\">\n        <div class=\"row justify-content-center\">\n            <div class=\"col-md-6\">\n                <form class=\"login_box_outer\" action=\"login.html\">\n                    <div class=\"login-box max-WT-520\">\n                        <div class=\"login-right-block\">\n                            <div class=\"login-heading\">\n                                <h4>RESET PASSWORD</h4>\n                            </div>\n                            <div class=\"login-box-body\">\n                                <p class=\"common-paragrph text-center\">Please enter a registered email address so that we can send you reset instruction</p>\n                                <div class=\"form-group\">\n                                    <input type=\"email\" class=\"form-control\" placeholder=\"Password\" />\n                                </div>\n                                <div class=\"form-group\">\n                                    <input type=\"email\" class=\"form-control\" placeholder=\"Confirm Password\" />\n                                </div>\n                            </div>\n                            <div class=\"text-center mt40\">\n                                <button type=\"submit\" class=\"btn btn-login btn-large  width100 font-100\">SUBMIT</button>\n                            </div>\n                        </div>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/reset-password/reset-password.component.ts":
/*!************************************************************!*\
  !*** ./src/app/reset-password/reset-password.component.ts ***!
  \************************************************************/
/*! exports provided: ResetPasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetPasswordComponent", function() { return ResetPasswordComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent() {
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
    };
    ResetPasswordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-reset-password',
            template: __webpack_require__(/*! ./reset-password.component.html */ "./src/app/reset-password/reset-password.component.html"),
            styles: [__webpack_require__(/*! ./reset-password.component.css */ "./src/app/reset-password/reset-password.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());



/***/ }),

/***/ "./src/app/static-content/edit-static-content/edit-static-content.component.css":
/*!**************************************************************************************!*\
  !*** ./src/app/static-content/edit-static-content/edit-static-content.component.css ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/static-content/edit-static-content/edit-static-content.component.html":
/*!***************************************************************************************!*\
  !*** ./src/app/static-content/edit-static-content/edit-static-content.component.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<main class=\"middle-content\">\n\n  <div class=\"page_title_block\">\n    <h1 class=\"page_title\">{{pageName}}</h1>\n\n  </div>\n\n  <div class=\"content-section\">\n    <div class=\"main-block-innner mb40 mt40\">\n      <div class=\"row \">\n            <div class=\"col-md-12\">\n        <form [formGroup]=\"staticContentForm\" #f=\"ngForm\">\n          <div class=\"form-group row \">\n            <label class=\"col-md-2\">Type :</label>\n            <div class=\"col-md-8\">\n              <input type=\"text\" formControlName=\"type\" placeholder=\"type\" class=\"form-control\" disabled>\n              <div *ngIf=\"staticContentForm.get('type').hasError('required') && (staticContentForm.get('type').dirty || f.submitted)\"\n                style=\"color:red\">\n                *Please enter type\n              </div>\n            </div>\n          </div>\n          <div class=\"form-group row \">\n            <label class=\"col-md-2\">Description:</label>\n            <div class=\"col-md-8\">\n              <ckeditor class=\"form-control\" formControlName=\"description\" #myckeditor [config]=\"ckeConfig\" debounce=\"500\">\n              </ckeditor>\n              <div *ngIf=\"staticContentForm.get('description').hasError('required') && (staticContentForm.get('description').dirty || f.submitted)\"\n                style=\"color:red\">\n                *Please enter description\n              </div>\n            </div>\n          </div>\n          <div class=\"text-center mt40\">\n            <button (click)=\"Update(staticContentForm.value)\" class=\"btn btn-large   max-WT-200 font-100 btn-green\">Update</button>\n            <a [routerLink]=\"['/admin/staticContent']\" class=\"btn btn-large  max-WT-200 font-100 btn-grey ml5\">Cancel</a>\n          </div>\n        </form>\n        </div>\n      </div>\n    </div>\n  </div>\n</main>\n"

/***/ }),

/***/ "./src/app/static-content/edit-static-content/edit-static-content.component.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/static-content/edit-static-content/edit-static-content.component.ts ***!
  \*************************************************************************************/
/*! exports provided: EditStaticContentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditStaticContentComponent", function() { return EditStaticContentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../app.service */ "./src/app/app.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EditStaticContentComponent = /** @class */ (function () {
    function EditStaticContentComponent(activatedRoute, service, route) {
        this.activatedRoute = activatedRoute;
        this.service = service;
        this.route = route;
    }
    EditStaticContentComponent.prototype.ngOnInit = function () {
        this.getId();
        this.formValidation();
        this.getContent();
    };
    EditStaticContentComponent.prototype.getId = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (paramsId) {
            _this.id = paramsId.id;
            console.log(_this.id);
        });
    };
    EditStaticContentComponent.prototype.formValidation = function () {
        this.staticContentForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            type: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]),
            description: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required])
        });
    };
    EditStaticContentComponent.prototype.getContent = function () {
        var _this = this;
        var apiData = {
            "type": this.id
        };
        this.service.postApi('/api/v1/admin/staticContentGet', apiData, 1).subscribe(function (success) {
            console.log(success);
            if (success.response_code == 200) {
                _this.staticContentForm.controls['type'].setValue(success.Data.title);
                _this.staticContentForm.controls['description'].setValue(success.Data.description);
                // this.service.succ(success.response_message)
            }
            else {
                if (success.response_code == 500) {
                    _this.service.err(success.response_message);
                }
                else {
                    _this.service.err(success.response_message);
                }
            }
        }, function (error) {
            _this.service.err("something went wrong");
        });
    };
    EditStaticContentComponent.prototype.Update = function (data) {
        var _this = this;
        var apiData = {
            "type": this.id,
            "description": data.description
        };
        console.log(apiData);
        this.service.postApi('/api/v1/admin/StaticContentUpdate', apiData, 1).subscribe(function (success) {
            console.log(success);
            if (success.responseCode == 200) {
                _this.service.succ(success.responseMessage);
                _this.route.navigate(['/admin/staticContent']);
            }
            else {
                if (success.response_code == 500) {
                    _this.service.err(success.responseMessage);
                }
                else {
                    _this.service.err(success.responseMessage);
                }
            }
        }, function (error) {
            _this.service.err("something went wrong");
        });
    };
    EditStaticContentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-edit-static-content',
            template: __webpack_require__(/*! ./edit-static-content.component.html */ "./src/app/static-content/edit-static-content/edit-static-content.component.html"),
            styles: [__webpack_require__(/*! ./edit-static-content.component.css */ "./src/app/static-content/edit-static-content/edit-static-content.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _app_service__WEBPACK_IMPORTED_MODULE_3__["AppService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], EditStaticContentComponent);
    return EditStaticContentComponent;
}());



/***/ }),

/***/ "./src/app/static-content/static-content.component.css":
/*!*************************************************************!*\
  !*** ./src/app/static-content/static-content.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/static-content/static-content.component.html":
/*!**************************************************************!*\
  !*** ./src/app/static-content/static-content.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<main class=\"middle-content\">\n  <!-- Page Title Start -->\n  <div class=\"page_title_block\">\n      <h1 class=\"page_title\">Static Content Management</h1>\n      <!-- <div class=\"common-bredcrumb\">\n          <ol class=\"breadcrumb\">\n\n              <li class=\"breadcrumb-item active\">User Management</li>\n          </ol>\n\n      </div> -->\n  </div>\n  <!-- Page Title End -->\n  <div class=\"content-section\">\n      <div class=\"outer-box\">\n\n          <!-- Gloabl Table Box Start -->\n          <div class=\"global-table no-radius p0\">\n\n              <div class=\"tab-content1\">\n                  <div class=\"tab-pane1\">\n                      <div class=\"table-responsive\">\n                          <table class=\"table table-bordered\">\n                              <thead>\n                                  <tr class=\"no_wrap_th\">\n                                      <th>ID</th>\n                                      <th>Page Name </th>\n                                      <th class=\"action_td_btn3\">Action</th>\n                                  </tr>\n                              </thead>\n                              <tbody>\n                                  <!-- <tr>\n                                      <td>1</td>\n                                      <td>About US</td>\n                                      <td class=\"action_td_btn3\">\n                                          <a [routerLink]=\"['../../admin/editStaticContent/'+'ABOUT_US']\"><i class=\"fa fa-eye\"></i></a>\n                                      </td>\n                                  </tr> -->\n                                  <tr>\n                                      <td>1</td>\n                                      <td>Terms & Services</td>\n                                      <td class=\"action_td_btn3\">\n                                          <a [routerLink]=\"['../../admin/editStaticContent/'+'TermCondition']\"><i class=\"fa fa-eye\"></i></a>\n                                      </td>\n                                  </tr>\n                                  <tr>\n                                        <!-- TermCondition/PrivacyPolicy -->\n                                      <td>2</td>\n                                      <td>Privacy Policy</td>\n                                      <td class=\"action_td_btn3\">\n                                          <a [routerLink]=\"['../../admin/editStaticContent/'+'PrivacyPolicy']\"><i class=\"fa fa-eye\"></i></a>\n                                      </td>\n                                  </tr>\n                              </tbody>\n                          </table>\n                      </div>\n                  </div>\n\n              </div>\n          </div>\n\n      </div>\n  </div>\n  <!-- Table Responsive End -->\n\n</main>"

/***/ }),

/***/ "./src/app/static-content/static-content.component.ts":
/*!************************************************************!*\
  !*** ./src/app/static-content/static-content.component.ts ***!
  \************************************************************/
/*! exports provided: StaticContentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StaticContentComponent", function() { return StaticContentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var StaticContentComponent = /** @class */ (function () {
    function StaticContentComponent() {
    }
    StaticContentComponent.prototype.ngOnInit = function () {
    };
    StaticContentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-static-content',
            template: __webpack_require__(/*! ./static-content.component.html */ "./src/app/static-content/static-content.component.html"),
            styles: [__webpack_require__(/*! ./static-content.component.css */ "./src/app/static-content/static-content.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], StaticContentComponent);
    return StaticContentComponent;
}());



/***/ }),

/***/ "./src/app/user-management/user-detail/user-detail.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/user-management/user-detail/user-detail.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/user-management/user-detail/user-detail.component.html":
/*!************************************************************************!*\
  !*** ./src/app/user-management/user-detail/user-detail.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<main class=\"middle-content\">\n  <!-- Page Title Start -->\n  <div class=\"page_title_block\">\n    <h1 class=\"page_title\">User Detail</h1>\n  </div>\n  <!-- Page Title End -->\n  <div class=\"content-section\">\n    <div class=\"outer-box\">\n      <div class=\"custom_tabs common-tabs\">\n        <div class=\"tab-content\">\n          <div class=\"tab-pane active show\" id=\"general_info\">\n            <div class=\"order-view mt30 max-WT-700 mrgn-0-auto\">\n              <div class=\"main-block-innner mb40 mt40\">\n                <div class=\"add-store-block input-style\">\n                  <div class=\"user-profile\">\n                    <div class=\"image-box\">\n                      <img src={{image}} *ngIf=\"image!=undefined\" class=\"profile-pic\">\n                      <img src=\"assets/img/profile-img.jpg\" *ngIf=\"image==undefined\" class=\"profile-pic\">\n                    </div>\n                  </div>\n                  <div class=\"form-group row align-items-baseline\">\n                    <label class=\"col-md-5\">User ID :</label>\n                    <div class=\"col-md-7\">\n                      <label>{{userDetail?._id}}</label>\n                    </div>\n                  </div>\n                  <div class=\"form-group row align-items-baseline\">\n                    <label class=\"col-md-5\">Name (Real Name):</label>\n                    <div class=\"col-md-7\">\n                      <label>{{userDetail?.name}}</label>\n                    </div>\n                  </div>\n                  <div class=\"form-group row align-items-baseline\">\n                    <label class=\"col-md-5\"> User Name :</label>\n                    <div class=\"col-md-7\">\n                      <label>{{userDetail?.username}}</label>\n                    </div>\n                  </div>\n                  <div class=\"form-group row align-items-baseline\">\n                    <label class=\"col-md-5\">Email :</label>\n                    <div class=\"col-md-7\">\n                      <label>{{userDetail?.email}}</label>\n                    </div>\n                  </div>\n                  <div class=\"form-group row align-items-baseline\">\n                    <label class=\"col-md-5\">Phone Number :</label>\n                    <div class=\"col-md-7\">\n                      <label>{{userDetail?.countryCode}}{{userDetail?.mobileNumber}}</label>\n                    </div>\n                  </div>\n                   <div class=\"form-group row align-items-baseline\">\n                    <label class=\"col-md-5\">User Location :</label>\n                    <div class=\"col-md-7\">\n                      <label>{{userDetail?.country}}</label>\n                    </div>\n                  </div>\n                    <div class=\"form-group row align-items-baseline\">\n                        <label class=\"col-md-5\">Total Posts :</label>\n                        <div class=\"col-md-7\">\n                          <label>{{userDetail?.posts}}</label>\n                        </div>\n                  </div>\n                  <div class=\"form-group row align-items-baseline\">\n                    <label class=\"col-md-5\">Total Followers :</label>\n                    <div class=\"col-md-7\">\n                      <label>{{userDetail?.followerCount}}</label>\n                    </div>\n                  </div>\n                  <div class=\"form-group row align-items-baseline\">\n                    <label class=\"col-md-5\">Total Followings :</label>\n                    <div class=\"col-md-7\">\n                      <label>{{userDetail?.followingCount}}</label>\n                    </div>\n                  </div>\n                  <div class=\"form-group row align-items-baseline\">\n                      <label class=\"col-md-5\">Mobile Number Verification :</label>\n                      <div class=\"col-md-7\">\n                        <label *ngIf=\"userDetail?.mobileOtpVerificationStatus == true\">Verified</label>\n                        <label *ngIf=\"userDetail?.mobileOtpVerificationStatus == false\">Not Verified</label>\n                      </div>\n                    </div>\n                    <div class=\"form-group row align-items-baseline\">\n                        <label class=\"col-md-5\">Email Verification :</label>\n                        <div class=\"col-md-7\">\n                          <label *ngIf=\"userDetail?.emailOtpVerificationStatus == true\">Verified</label>\n                          <label *ngIf=\"userDetail?.emailOtpVerificationStatus == false\">Not Verified</label>\n                        </div>\n                      </div>\n                      <div class=\"form-group row align-items-baseline\">\n                          <label class=\"col-md-5\">Created Date & Time :</label>\n                          <div class=\"col-md-7\">\n                            <label>{{userDetail?.createdAt | date:'dd/MM/yyyy h:mm a'}}</label>\n                          </div>\n                        </div>\n                          <div class=\"form-group row align-items-baseline\">\n                          <label class=\"col-md-5\">Updated Date & Time :</label>\n                          <div class=\"col-md-7\">\n                            <label>{{userDetail?.updatedAt | date:'dd/MM/yyyy h:mm a'}}</label>\n                          </div>\n                        </div>\n                  <div class=\"form-group row align-items-baseline\">\n                    <button class=\"btn btn-primary\" [routerLink]=\"['/admin/userManagement']\" style=\"background-color:rgba(10, 17, 123, 1)\">Back</button>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</main>"

/***/ }),

/***/ "./src/app/user-management/user-detail/user-detail.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/user-management/user-detail/user-detail.component.ts ***!
  \**********************************************************************/
/*! exports provided: UserDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserDetailComponent", function() { return UserDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_app_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/app.service */ "./src/app/app.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { getDiffieHellman } from 'crypto';


var UserDetailComponent = /** @class */ (function () {
    function UserDetailComponent(router, activatedRoute, service) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.service = service;
        this.image = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAWRXhpZgAATU0AKgAAAAgAAAAAAAD/4QNwaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pg0KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPg0KCTxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+DQoJCTxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9IkJGNzlBRkU3Qjg3Rjk4OEMzNzA0RkI4MDNFRDYwNDYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjMyMjJFN0Y0NUU3MTExRTI5QUE4OEEyRTVCNjE3MkY1IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjMyMjJFN0YzNUU3MTExRTI5QUE4OEEyRTVCNjE3MkY1IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUgTWFjaW50b3NoIj4NCgkJCTx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAyODAxMTc0MDcyMDY4MTFCMzc5RTY0NTg0REM4NUYwIiBzdFJlZjpkb2N1bWVudElEPSJCRjc5QUZFN0I4N0Y5ODhDMzcwNEZCODAzRUQ2MDQ2MyIvPg0KCQk8L3JkZjpEZXNjcmlwdGlvbj4NCgk8L3JkZjpSREY+DQo8L3g6eG1wbWV0YT4NCjw/eHBhY2tldCBlbmQ9J3cnPz7/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCADIAMgDASIAAhEBAxEB/8QAHQABAAICAwEBAAAAAAAAAAAAAAMEBwgBAgYJBf/EAEAQAAEDAwIDBgQDBQQLAAAAAAABAgMEERIFYQYHEyExQVFx8AgigaEUYpEyQlKxshUWgsEjJDM0Y3JzdMLh8f/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDN1hYlsLAR4nFiXHYWXyAjxS/eMSREt3IcY7AR23OcSS2xxjsB0xsLe7ndURqXXst5nk67mrwpQVEkMusQuezsd0muel/K6IqfcD1GO5zZDEPFvP6kjpXQ6BDJLUOSyVNQzFrPRvivqY0ZzS4sjnfK3XKnN63VFRqt+jVSyfRANqcdxia1abzt4qoqx009YyujcllgmiYjE3TFEVD9jT/iE1mKVv4ygo6iPJL9NHMcieNu1QM+47jHc/G4c410biinifQV8D5XpdaZ0iJK1fFFb3n7qt80AjxGJ3x2GOwHTE4x3JMdhjsB0x3GJIiW8DjHYDpiLHfHY5svkBHbcEiJbuQASY7qMd1JMdxjuBHjuox3Ukx3GO4EeO6jHdSTHc5t296ARY7qVNU1Sk0SglrK6obT00aXdI/uT/2S6rqVPounVNdWSpFS07FkkevgiGsHMnmVV8cajJHHI+LR2PvDTOREv2ftOt3r/ID9Pj/nPqPE3XodPT+z9MVytyY5epK3dfBF8kMbgAAAAAAHaN7ono9jnMenc5q2VPqel0LmRxBoNfDUR6lUVDGKiOgqJVex6eSop5gAbLcEc59L4wr4tPkppNOrZE+Rsj0cxy+SO7O1fKxkTHc0pgnkpZ45oXrHLG5Hse1bK1U7UVDY/lhzdo+J4KbTNRl6Os2xRXJZk9vFF8Ft4AZHx3UY7qS23OMdwI8d1GO6kmO4x3Ajx3UY7qS47nGO4EeO6gkx3AE2O4x3JsFOLARY7jHcmxGIEOO4x3JsbnWS7GOd32RVA115/cbVdTr0nDsMnToaZrHSo1f9o9Wo7t2S6dhiEu61qM2r6xW1tQ7KaeZ0jl3VSkAAAAAAAAAAAA7wzPppmTROVkjHI5rkWyoqdqHQAbpcNai7WeHNL1B6Ix9VSxTuanciuYir/M/Sx3PA8htQk1Ll1SNkVVWmlkp0V3b2IqKn0s630MiYL5AQ47i25NgMVAhtuMd7E2Awt/8AAIcdwS23+wAmVtvP6HOHqTYen6hGegEOHqMPUmVnoMPQCHAjqIWPglbI3ONWqjmr4pbtQtYen6nWVrUjer1RrMVyXyQDRKucx9bUOjYkcayOVrE/dS62QgLOpNjZqNU2JVWJJXoxV71bdbfYrAAAAAAAAAAAAAHcgGynw1/iHcGVqSIn4dKx3S874pl/kZcwuY/5A6etHy0onKxWLPLLMqr+9d1kX9EQyNhfyAhw9Rh6k2HoMPQCHD1GF/MlwTb9Rh6AQ4eoJ0bby/UAT4KMF8SbDyGCeoEPTGHZ4k2Gww2Ahw9TrJA2WN0b2o5jkVrmqnYqL4KWMNhhsBo9zC0T+7nG+s6e2H8PFFUO6UflGva37Kh50zZ8UWgwUPEml6pGqpNXQuZKngvTsiL+i2+hhMAAAAAAAAAAAA8AANueQeb+WWnZVCVCo+SyIt+mmS2b/n9TImPqYP8AhW1Fsula5p62zimZOiKvbZyW/wDH7mdsE8AIcPNLjC/gpN09hhsBDgMPUmw2GGwEGK7gnw2AFjD3cYfT6k+G4wAgw93GHu5PhuMNwK+G33OcPdyfAYgaxfFdUPXiDQqdbdNtK+RPVX2X+lDBRsL8W0NqjhqTDswnar7bs7LmvQAAAAAAAAAAAAABsR8KOiypHr2qr2RPWOmanmqXcv8ANDYLDb7nhuQ/DTuHOWOlNlZhPVtWseipZfn7W3/w4mQcNvuBXw2+4w2+5Yw93GAFfDb7jDb7ljD3cYe7gQYe7gnw3AFnBfdjjFSxhsMNgK+KjFSx09h0wK+KjFSx09hhsBhz4m9Dg1Dlq+rkc2OehqGSRKve7JcVb9b3+hqAfQfjLg+i434dq9Hr2r0KhvY9v7THJ+y5N0U0w5ucs38reI4dO/GLXQTwJPHMseC2uqKipde6wHhwAAAAAAAAAAPR8uuHGcW8b6NpMjsIqmdEeqJf5U+ZU+qIqH4FPA6pnihYl3yPRjU81VbIbq8veQ3DvAddBqlOyoqNTbEjc6l6Oaxyp8ytRESy96Ae+hgbBEyONqNjYiNa1E7EROxDvgvkWMNhhsBXxUYKpYw2GGwFfAYqWMNhgBBgvuwJ8NgBY6Y6ZY6W32HTW3coFfpjpljpflHS/KBX6ZxhuWel+UdNfJQK/TMA/F3ww6s4Z0jWoo7uoZ3QyuTwZIiWv/ib9zYZI1Re5Tz/AB/wpFxlwdq2jzIiJUwORjnfuvTtav0VEA+doO0kawyPjd+01ytU6gAAAAAAAAey5OaI3iHmfw3RvblH+MZM9PNrPnX+k346d+81P+EDQoa/jTVdRkS8lDSo2NPJXusq/oi/qbcdNbdygV+n2+Q6ZY6a27lHS2+wFfpjpljpflHS/KBX6Y6faWOl+UdNfICv0wWOlsAJ+mg6aFnC/iMVArdNB00LOKjACt00HTQtYKOn6AVemh0njToSf8q/yLmCqodDmmK9y9igfMOs/wB8n/6jv5kJ+nxRSx0PE+s00SWigrZ4mIv8LZHIn2Q/MAAAAAAAAA2Q+DBt9Z4n/wC3h/qcbVdJDRz4febmncp9Y1OXU6SoqaauiZHnT2V0atcq3svenabacA84uFeY7+jo+o3rETJaSob05bedl7/oqgeu6aDpp7sWendTnp+gFXpoOmhZVioc9NfMCr00HTQs4qMFArdNPdgWcLgCxhsMCxhv9xj7uBXw9BhsWMPQYb/cCvh6DAs4e7jACtgY+5k88OFuVlRBTatPLPXypmlHSMzkRn8Tr2RE9V7T9rmhzJ0rlbw1LqupOzkW7KamavzTSW7Gpt5qfPbjLiut444mr9b1B2VVVyK9Wp3MTua1NkSyAVeIK+PVeINUrokc2Gqq5p2I5O1GuerkvvZT88AAAAAAAAADk9Zym1pOH+ZXDdc6o/CxR10aSSXsiMVbOvtZVPJAD6ktRr2o5qo5qpdHIt0VPM5wMAfCHzMl4l0Cq4b1KrWev09UdS9RfmdAqWtfxxVP0U2Hw93Ar4IMCxh7uc4AVsBgWcPdzjECvj7uCzhv9wBPgowLGHu55TjLmjwnwBErtc1ykopLKqU/UR8zvRiXX7AejwGBrrxF8bnDVDK6PR9Fr9UsnZLM5sDVXw7O1bGLuYPxi8TcV6XHRaJSpww5XKs1TTzdWV7fBqKrUx9U7QN2JJI4VTqSNjVe7NyIfjcScbaBwhp0ldq+q0tFTsS/zypk7Zre9V9D5oajr+qaxOs1fqNVWSqqrnPM56/dSk+R8ls3udb+JbgZK5883ZObXF61MCOi0ajRYqKJ6Wdj2Xe7dV+1jGYAAAAAAAAAAAAAABa0uvn0vUaerp6iWlmiejmzQuVr27op9LuBOMtG454fpq/RtRZqESMa17r/AOka5ES6PTwU+Y56LgXj7WuXWvQ6rotU6CZi/PGvbHKni1zfFAPpxh7uc4bfcxZye+Irh3mnDFSSSs0nXsfnoZ3oiSL/AMNV/a9O8y1h7uBXwGHu5Yw93GHu4FfDb7gsYe7gDRTmt8WnEvG8s1HoTn8PaM7sRsSp+IkT8z07vRpgueeSqldLNI+aV3a58jlc5V3VToAFgAAAAAAAAAAAAAAAAAAAAAAAd4ZpKaZksMjopWLk17FsrV80VDabkb8XctGtLoXGqrNCqpHFrCL80fbZElTxT8xqsAPrJQ1dPqVJFVUk8dTTStR8csTkc1yL4opPgvmfOrk18RHEPKSpZTJI7UtBc5FkoJ3KqMTxWNf3V27lN9+AeYGhcy9Ci1XQqxtVAtkkjsqPhf4tci9yp+gH73TXzBPh5IAPkaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHrOXHMvXeV3EEOq6LVOjxcnWpnKvSnb4tenj6gAfQfk7zv4f5w6SktBKlJqcSf6xpszk6jFt2uT+Ju4AA/9k=";
    }
    UserDetailComponent.prototype.ngOnInit = function () {
        this.getId();
        this.getUserData();
    };
    UserDetailComponent.prototype.getId = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (paramsId) {
            _this.id = paramsId.id;
            console.log(_this.id);
        });
    };
    UserDetailComponent.prototype.getUserData = function () {
        var _this = this;
        var apireq = {
            userId: this.id
        };
        this.service.postApi('/api/v1/admin/getUserDetail', apireq, 1).subscribe(function (success) {
            // console.log(success)
            if (success.response_code == 200) {
                _this.userDetail = success.Data;
                _this.image = success.Data.profilePic;
                console.log("userDetails", _this.userDetail);
                console.log(_this.image);
            }
            else {
                console.log(success.response_message);
            }
        }, function (error) {
            console.log("Something went wrong");
        });
    };
    UserDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user-detail',
            template: __webpack_require__(/*! ./user-detail.component.html */ "./src/app/user-management/user-detail/user-detail.component.html"),
            styles: [__webpack_require__(/*! ./user-detail.component.css */ "./src/app/user-management/user-detail/user-detail.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], src_app_app_service__WEBPACK_IMPORTED_MODULE_2__["AppService"]])
    ], UserDetailComponent);
    return UserDetailComponent;
}());



/***/ }),

/***/ "./src/app/user-management/user-management.component.css":
/*!***************************************************************!*\
  !*** ./src/app/user-management/user-management.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/user-management/user-management.component.html":
/*!****************************************************************!*\
  !*** ./src/app/user-management/user-management.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<main class=\"middle-content\">\n  <!-- Page Title Start -->\n  <div class=\"page_title_block\">\n    <h1 class=\"page_title\">User Management</h1>\n\n  </div>\n  <!-- Page Title End -->\n  <div class=\"content-section\">\n    <div class=\"outer-box\">\n      <!-- Gloabl Table Box Start -->\n      <div class=\"global-table no-radius p0\">\n        <div class=\"tab-content1\">\n          <div class=\"tab-pane1\">\n            <div class=\"sec_head_new\">\n              <form [formGroup]=\"searchForm\"   #f=\"ngForm\">\n                  <div class=\"row justify-content-between\">\n                      <div class=\" col-md-3 \">\n                          <div class=\"filter_search mb20 width100\">\n                          <div class=\"input-group filter_search_group\">\n                            <input type=\"text\" formControlName=\"search\" class=\"form-control\" title=\"Search by username,name,email\" placeholder=\"Search by username,name,email\">\n                              <div class=\"input-group-append\">\n                              <button class=\"btn btn_search_group\" type=\"button\"><img src=\"assets/img/icon-search.png\" alt=\"Search\"></button>\n                              </div>\n                          </div>\n                          </div>\n                      </div>\n                      <div class=\"col-md-3 \">\n                          <div class=\"head_flt_select input-label\">\n                          <strong><span class=\"d-flex align-items-center\">From</span></strong>\n                          <input type=\"date\" formControlName=\"formDate\" class=\"form-control\" [(ngModel)]=\"element\" (ngModelChange)=\"Changed($event)\" placeholder=\"Search by date\" max= \"{{nowDate1 | date:'yyyy-MM-dd'}}\" onkeydown=\"return false\">\n                             \n                          </div>\n                      </div>\n                      <div class=\" col-md-3 \">\n                          <div class=\"head_flt_select input-label\">\n                          <b><span class=\"d-flex align-items-center\">To</span></b>\n                          <input type=\"date\" formControlName=\"toDate\" min= \"{{nowDate2 | date:'yyyy-MM-dd'}}\" class=\"form-control\" placeholder=\"Search by date\"  max= \"{{nowDate | date:'yyyy-MM-dd'}}\" onkeydown=\"return false\">\n                              \n                          </div>\n                      </div>\n                      <div class=\" col-md-3 \">\n                          <div class=\"text-left\">\n                            <button type=\"submit\" (click)=\"search(searchForm.value)\" class=\"btn btn-theme form-group mr-3\">Search</button>\n                            <button type=\"reset\" (click)=\"getViewData()\" class=\"btn  btn-theme form-group\">Reset</button>\n                          </div>\n                      </div>\n                  </div>\n              </form>\n        </div>\n            <div class=\"table-responsive\">\n              <table class=\"table table-bordered\">\n                <thead>\n                  <tr class=\"no_wrap_th\">\n                    <th>ID</th>\n                    <th>User ID</th>\n                    <th>Name (Real Name)</th>\n                    <th>User Name</th>\n                    <th>Email</th>\n                    <th>Phone Number</th>\n                    <th>User Location</th>\n                    <th>Total Posts</th>\n                    <th>Total Followers</th>\n                    <th>Total Followings</th>\n                    <th>Status</th>\n                    <th>Created Date & Time</th>\n                    <th>Updated Date & Time</th>\n                    <th class=\"action_td_btn3\">Action</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr *ngFor='let x of userArr | paginate: { itemsPerPage: limit, currentPage: pageNumber , totalItems: total };let i=index'>\n                    <td>{{(i+1) + srNumber }}</td>\n                    <td>{{x?._id}}</td>\n                    <td>{{x?.name}}</td>\n                    <td>{{x.username}}</td>\n                    <td>{{x?.email}}</td>\n                    <td>{{x?.countryCode}}{{x?.mobileNumber}}</td>\n                    <td>{{x?.country}}</td>\n                    <td>{{x?.posts}}</td>\n                    <td>{{x?.followerCount}}</td>\n                    <td>{{x?.followingCount}}</td>\n                    <td *ngIf=\"x?.status=='ACTIVE'\" style=\"color:green\">Active</td>\n                    <td *ngIf=\"x?.status=='INACTIVE'\" style=\"color:red\">Inactive</td>\n                    <td *ngIf=\"x?.status!='ACTIVE' && x?.status!='INACTIVE'\"></td>\n                    <td>{{x?.createdAt | date:'MM/dd/yyyy h:mm a'}}</td>\n                    <td>{{x?.updatedAt | date:'MM/dd/yyyy h:mm a'}}</td>\n                    <td class=\"action_td_btn3\">\n                      <a class=\"btn btn-primary mr-2\" [routerLink]=\"['/admin/userDetails/'+x?._id]\"><i class=\"fa fa-eye\" style=\"color:white\"> View</i></a>\n                      <a class=\"btn btn-danger mr-2\" style=\"color:white\" (click)=\"openModal('delete',x?._id)\"><i class=\"fa fa-trash\" style=\"color:white\"> Delete</i></a>\n                      <a class=\"btn btn-warning mr-2\" style=\"color:white\" (click)=\"openModal('block',x?._id)\" *ngIf=\"x?.status=='ACTIVE'\" data-target=\"modal\"><i class=\"fa fa-ban\" style=\"color:white\"> Inactive</i></a>\n                      <a class=\"btn btn-warning mr-2\" style=\"color:white;background: green;min-width: 77px;border-color:green\" (click)=\"openModal('unblock',x?._id)\" *ngIf=\"x?.status=='INACTIVE'\" data-target=\"modal\"><i class=\"fa fa-ban\" style=\"color:white\"> Active</i></a>\n                    </td>\n                  </tr>\n                  <tr *ngIf=\"userArr == ''\">\n                      <td colspan=\"9\" vertical-align=\"middle\">\n                        <div class=\"no-record\">\n                          <div class=\"no-recordin\">\n                            <H5 style=\"margin-left: 44%;\">No record found</H5>\n                          </div>\n                        </div>\n                      </td>\n                    </tr>\n                </tbody>\n              </table>\n              \n            </div>\n            <div *ngIf=\"userArr != ''\" class=\"pull-right mt-4\">\n                <pagination-controls (pageChange)=\"pagination($event)\"></pagination-controls>\n              </div>\n          </div>\n\n        </div>\n      </div>\n\n    </div>\n  </div>\n  <!-- Table Responsive End -->\n  <!-- </div> -->\n</main>\n\n<!-- delete_modal Start -->\n<div class=\"modal fade global-modal reset-modal\" id=\"delete\">\n  <div class=\"modal-dialog max-WT-500\">\n    <form class=\"change_password\">\n      <div class=\"modal-content\">\n        <div>\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n\n          <div class=\"modal-body\">\n            <div class=\"text-center modal_flax_height d-flex align-items-center justify-content-center\">\n              <div class=\"w-100\">\n                <p>Are you sure you want to delete this user?</p>\n                <div>\n                  <button type=\"submit\" class=\"btn btn-success mr-3\" (click)=\"deleteApi('DELETE')\">Delete</button>\n                  <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">Cancel</button>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </form>\n  </div>\n</div>\n<!-- delete_modal End -->\n<!-- block_modal Start -->\n<div class=\"modal fade global-modal reset-modal\" id=\"block\">\n  <div class=\"modal-dialog max-WT-500\">\n    <form class=\"change_password\">\n      <div class=\"modal-content\">\n        <div>\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n\n          <div class=\"modal-body\">\n            <div class=\"text-center modal_flax_height d-flex align-items-center justify-content-center\">\n              <div class=\"w-100\">\n                <p>Are you sure you want to deactivate this user ?</p>\n                <div>\n                  <button type=\"submit\" class=\"btn btn-success mr-3\" (click)=\"blockApi('INACTIVE','block')\">Block</button>\n                  <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">Cancel</button>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </form>\n  </div>\n</div>\n<!-- block_modal End -->\n<!-- unblock_modal Start -->\n<div class=\"modal fade global-modal reset-modal\" id=\"unblock\">\n    <div class=\"modal-dialog max-WT-500\">\n      <form class=\"change_password\">\n        <div class=\"modal-content\">\n          <div>\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n  \n            <div class=\"modal-body\">\n              <div class=\"text-center modal_flax_height d-flex align-items-center justify-content-center\">\n                <div class=\"w-100\">\n                  <p>Are you sure you want to activate this user ?</p>\n                  <div>\n                    <button type=\"submit\" class=\"btn btn-success mr-3\" (click)=\"blockApi('ACTIVE','unblock')\">Unblock</button>\n                    <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">Cancel</button>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n  <!-- unblock_modal End -->"

/***/ }),

/***/ "./src/app/user-management/user-management.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/user-management/user-management.component.ts ***!
  \**************************************************************/
/*! exports provided: UserManagementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserManagementComponent", function() { return UserManagementComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../app.service */ "./src/app/app.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserManagementComponent = /** @class */ (function () {
    function UserManagementComponent(service) {
        this.service = service;
        this.userArr = [];
        this.pageNumber = 1;
    }
    UserManagementComponent.prototype.ngOnInit = function () {
        this.nowDate = new Date();
        this.nowDate1 = new Date();
        this.nowDate2 = '';
        this.searchFormVAlue();
        this.getViewData();
    };
    UserManagementComponent.prototype.searchFormVAlue = function () {
        this.searchForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            search: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](''),
            formDate: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](''),
            toDate: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('')
        });
    };
    UserManagementComponent.prototype.pagination = function (event) {
        this.pageNumber = event;
        this.getViewData();
    };
    UserManagementComponent.prototype.getViewData = function () {
        var _this = this;
        var apireq = {
            "userId": "fghfgu57567567",
            "limit": 10,
            "pageNumber": this.pageNumber,
            "search": ""
        };
        this.service.postApi('/api/v1/admin/userList', apireq, 1).subscribe(function (success) {
            if (success.response_code == 200) {
                _this.userArr = success.Data.docs;
                _this.limit = success.Data.limit;
                _this.total = success.Data.total;
                _this.srNumber = (_this.pageNumber - 1) * 10;
            }
            else {
                _this.service.err(success.response_message);
            }
        }, function (error) {
            _this.service.err("Something went wrong");
        });
    };
    UserManagementComponent.prototype.search = function (data) {
        var _this = this;
        console.log(data);
        if (data.formDate)
            this.fromDates = new Date(data.formDate).toISOString();
        else
            this.fromDates = "";
        if (data.toDate)
            this.toDates = (new Date(new Date(data.toDate).getTime() + 24 * 60 * 60 * 1000).toISOString());
        else
            this.toDates = "";
        var apireq = {
            "userId": "fghfgu57567567",
            "limit": 10,
            "pageNumber": this.pageNumber,
            "search": data.search,
            "fromDate": this.fromDates,
            "toDate": this.toDates
        };
        console.log(apireq);
        this.service.postApi('/api/v1/admin/userList', apireq, 1).subscribe(function (success) {
            console.log(success);
            if (success.response_code == 200) {
                _this.userArr = success.Data.docs;
                _this.limit = success.Data.limit;
                _this.total = success.Data.total;
            }
            else {
                _this.service.err(success.response_message);
            }
        }, function (error) {
            _this.service.err("Something went wrong");
        });
    };
    UserManagementComponent.prototype.deleteApi = function (status) {
        var _this = this;
        var apireq = {
            "userId": this.userId
        };
        this.service.postApi('/api/v1/admin/deleteUser', apireq, 1).subscribe(function (success) {
            if (success.response_code == 200) {
                _this.getViewData();
                $('#delete').modal('hide');
                _this.service.succ(success.response_message);
            }
            else {
                _this.service.err(success.response_message);
            }
        }, function (error) {
            _this.service.err("Something went wrong");
        });
    };
    UserManagementComponent.prototype.blockApi = function (status, modal) {
        var _this = this;
        console.log('##########', status);
        var apireq = {
            "userId": this.userId,
            "status": status
        };
        this.service.postApi('/api/v1/admin/updateUserStatus', apireq, 1).subscribe(function (success) {
            console.log(success);
            if (success.response_code == 200) {
                _this.getViewData();
                $('#' + modal).modal('hide');
                _this.service.succ(success.response_message);
            }
            else {
                _this.service.err(success.response_message);
            }
        }, function (error) {
            _this.service.err("Something went wrong");
        });
    };
    UserManagementComponent.prototype.openModal = function (id, userId) {
        this.userId = userId;
        $('#' + id).modal({ backdrop: 'static', keyboard: false });
    };
    // changeDate(){
    //   this.dateValue=new Date(this.searchForm.value.formDate)
    //   console.log(this.dateValue)
    // }
    UserManagementComponent.prototype.Changed = function (event) {
        if (event) {
            this.nowDate2 = event;
            this.nowDate = new Date();
        }
    };
    UserManagementComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user-management',
            template: __webpack_require__(/*! ./user-management.component.html */ "./src/app/user-management/user-management.component.html"),
            styles: [__webpack_require__(/*! ./user-management.component.css */ "./src/app/user-management/user-management.component.css")]
        }),
        __metadata("design:paramtypes", [_app_service__WEBPACK_IMPORTED_MODULE_2__["AppService"]])
    ], UserManagementComponent);
    return UserManagementComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/deepak.gupta/VideoPosting/VideoPostingAdmin/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map