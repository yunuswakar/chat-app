webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__guard_auth_guard__ = __webpack_require__("./src/app/guard/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_login_login_component__ = __webpack_require__("./src/app/components/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_forgot_password_forgot_password_component__ = __webpack_require__("./src/app/components/forgot-password/forgot-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_reset_password_reset_password_component__ = __webpack_require__("./src/app/components/reset-password/reset-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_dashboard_dashboard_component__ = __webpack_require__("./src/app/components/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_user_management_user_management_component__ = __webpack_require__("./src/app/components/user-management/user-management.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_settings_settings_component__ = __webpack_require__("./src/app/components/settings/settings.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_terms_conditions_terms_conditions_component__ = __webpack_require__("./src/app/components/terms-conditions/terms-conditions.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_terms_conditions_editor_terms_conditions_editor_component__ = __webpack_require__("./src/app/components/terms-conditions-editor/terms-conditions-editor.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_view_user_details_view_user_details_component__ = __webpack_require__("./src/app/components/view-user-details/view-user-details.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_page_not_found_page_not_found_component__ = __webpack_require__("./src/app/components/page-not-found/page-not-found.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_view_faq_view_faq_component__ = __webpack_require__("./src/app/components/view-faq/view-faq.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_add_faq_add_faq_component__ = __webpack_require__("./src/app/components/add-faq/add-faq.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_edit_faq_edit_faq_component__ = __webpack_require__("./src/app/components/edit-faq/edit-faq.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_edit_profile_edit_profile_component__ = __webpack_require__("./src/app/components/edit-profile/edit-profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_vendor_management_vendor_management_component__ = __webpack_require__("./src/app/components/vendor-management/vendor-management.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_add_vendor_add_vendor_component__ = __webpack_require__("./src/app/components/add-vendor/add-vendor.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__transaction_management_transaction_management_component__ = __webpack_require__("./src/app/transaction-management/transaction-management.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__vendor_profile_vendor_profile_component__ = __webpack_require__("./src/app/vendor-profile/vendor-profile.component.ts");



















var routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full', canActivate: [__WEBPACK_IMPORTED_MODULE_0__guard_auth_guard__["a" /* AuthGuard */]] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_1__components_login_login_component__["a" /* LoginComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__guard_auth_guard__["a" /* AuthGuard */]] },
    { path: 'forgot-password', component: __WEBPACK_IMPORTED_MODULE_2__components_forgot_password_forgot_password_component__["a" /* ForgotPasswordComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__guard_auth_guard__["a" /* AuthGuard */]] },
    { path: 'reset-password/:userid', component: __WEBPACK_IMPORTED_MODULE_3__components_reset_password_reset_password_component__["a" /* ResetPasswordComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__guard_auth_guard__["a" /* AuthGuard */]] },
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_4__components_dashboard_dashboard_component__["a" /* DashboardComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__guard_auth_guard__["a" /* AuthGuard */]] },
    { path: 'user-management', component: __WEBPACK_IMPORTED_MODULE_5__components_user_management_user_management_component__["a" /* UserManagementComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__guard_auth_guard__["a" /* AuthGuard */]] },
    { path: 'settings', component: __WEBPACK_IMPORTED_MODULE_6__components_settings_settings_component__["a" /* SettingsComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__guard_auth_guard__["a" /* AuthGuard */]] },
    { path: 'terms-conditions', component: __WEBPACK_IMPORTED_MODULE_7__components_terms_conditions_terms_conditions_component__["a" /* TermsConditionsComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__guard_auth_guard__["a" /* AuthGuard */]] },
    { path: 'terms-conditions-edit', component: __WEBPACK_IMPORTED_MODULE_8__components_terms_conditions_editor_terms_conditions_editor_component__["a" /* TermsConditionsEditorComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__guard_auth_guard__["a" /* AuthGuard */]] },
    { path: 'view-user/:id', component: __WEBPACK_IMPORTED_MODULE_9__components_view_user_details_view_user_details_component__["a" /* ViewUserDetailsComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__guard_auth_guard__["a" /* AuthGuard */]] },
    { path: 'view-faqs', component: __WEBPACK_IMPORTED_MODULE_11__components_view_faq_view_faq_component__["a" /* ViewFaqComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__guard_auth_guard__["a" /* AuthGuard */]] },
    { path: 'add-faq', component: __WEBPACK_IMPORTED_MODULE_12__components_add_faq_add_faq_component__["a" /* AddFaqComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__guard_auth_guard__["a" /* AuthGuard */]] },
    { path: 'edit-faq/:faqId', component: __WEBPACK_IMPORTED_MODULE_13__components_edit_faq_edit_faq_component__["a" /* EditFaqComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__guard_auth_guard__["a" /* AuthGuard */]] },
    { path: 'edit-profile', component: __WEBPACK_IMPORTED_MODULE_14__components_edit_profile_edit_profile_component__["a" /* EditProfileComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__guard_auth_guard__["a" /* AuthGuard */]] },
    { path: 'vendor-management', component: __WEBPACK_IMPORTED_MODULE_15__components_vendor_management_vendor_management_component__["a" /* VendorManagementComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__guard_auth_guard__["a" /* AuthGuard */]] },
    { path: 'add-vendor', component: __WEBPACK_IMPORTED_MODULE_16__components_add_vendor_add_vendor_component__["a" /* AddVendorComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__guard_auth_guard__["a" /* AuthGuard */]] },
    { path: 'transaction-management', component: __WEBPACK_IMPORTED_MODULE_17__transaction_management_transaction_management_component__["a" /* TransactionManagementComponent */] },
    { path: 'vendor-profile/:id', component: __WEBPACK_IMPORTED_MODULE_18__vendor_profile_vendor_profile_component__["a" /* VendorProfileComponent */] },
    { path: "**", component: __WEBPACK_IMPORTED_MODULE_10__components_page_not_found_page_not_found_component__["a" /* PageNotFoundComponent */] }
];


/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n<ngx-spinner\n  bdOpacity = 0.2\n  size = \"large\"\n  color = \"#EFE8E8\"\n  type = \"square-jelly-box\"\n  fullScreen = \"true\"\n  >  <p style=\"color: white;\" > Loading... </p>\n  </ngx-spinner>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_data_service__ = __webpack_require__("./src/app/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_animations__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_routing_app_routing_module__ = __webpack_require__("./src/app/app-routing/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_dashboard_dashboard_component__ = __webpack_require__("./src/app/components/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_login_login_component__ = __webpack_require__("./src/app/components/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_forgot_password_forgot_password_component__ = __webpack_require__("./src/app/components/forgot-password/forgot-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_reset_password_reset_password_component__ = __webpack_require__("./src/app/components/reset-password/reset-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_sidebar_sidebar_component__ = __webpack_require__("./src/app/components/sidebar/sidebar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_user_management_user_management_component__ = __webpack_require__("./src/app/components/user-management/user-management.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_settings_settings_component__ = __webpack_require__("./src/app/components/settings/settings.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_terms_conditions_terms_conditions_component__ = __webpack_require__("./src/app/components/terms-conditions/terms-conditions.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_terms_conditions_editor_terms_conditions_editor_component__ = __webpack_require__("./src/app/components/terms-conditions-editor/terms-conditions-editor.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ckeditor_ckeditor5_angular__ = __webpack_require__("./node_modules/@ckeditor/ckeditor5-angular/fesm5/ckeditor-ckeditor5-angular.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_ngx_spinner__ = __webpack_require__("./node_modules/ngx-spinner/ngx-spinner.umd.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_ngx_spinner___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_ngx_spinner__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ng6_toastr_notifications__ = __webpack_require__("./node_modules/ng6-toastr-notifications/fesm5/ng6-toastr-notifications.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_spinner_spinner_component__ = __webpack_require__("./src/app/components/spinner/spinner.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__guard_auth_guard__ = __webpack_require__("./src/app/guard/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_ngx_pagination__ = __webpack_require__("./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_view_user_details_view_user_details_component__ = __webpack_require__("./src/app/components/view-user-details/view-user-details.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_page_not_found_page_not_found_component__ = __webpack_require__("./src/app/components/page-not-found/page-not-found.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_view_faq_view_faq_component__ = __webpack_require__("./src/app/components/view-faq/view-faq.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__components_add_faq_add_faq_component__ = __webpack_require__("./src/app/components/add-faq/add-faq.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__components_edit_faq_edit_faq_component__ = __webpack_require__("./src/app/components/edit-faq/edit-faq.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__components_edit_profile_edit_profile_component__ = __webpack_require__("./src/app/components/edit-profile/edit-profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__components_vendor_management_vendor_management_component__ = __webpack_require__("./src/app/components/vendor-management/vendor-management.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__components_add_vendor_add_vendor_component__ = __webpack_require__("./src/app/components/add-vendor/add-vendor.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__transaction_management_transaction_management_component__ = __webpack_require__("./src/app/transaction-management/transaction-management.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__vendor_profile_vendor_profile_component__ = __webpack_require__("./src/app/vendor-profile/vendor-profile.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_dashboard_dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_forgot_password_forgot_password_component__["a" /* ForgotPasswordComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_reset_password_reset_password_component__["a" /* ResetPasswordComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_sidebar_sidebar_component__["a" /* SidebarComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_user_management_user_management_component__["a" /* UserManagementComponent */],
                __WEBPACK_IMPORTED_MODULE_14__components_settings_settings_component__["a" /* SettingsComponent */],
                __WEBPACK_IMPORTED_MODULE_15__components_terms_conditions_terms_conditions_component__["a" /* TermsConditionsComponent */],
                __WEBPACK_IMPORTED_MODULE_16__components_terms_conditions_editor_terms_conditions_editor_component__["a" /* TermsConditionsEditorComponent */],
                __WEBPACK_IMPORTED_MODULE_20__components_spinner_spinner_component__["a" /* SpinnerComponent */],
                __WEBPACK_IMPORTED_MODULE_24__components_view_user_details_view_user_details_component__["a" /* ViewUserDetailsComponent */],
                __WEBPACK_IMPORTED_MODULE_25__components_page_not_found_page_not_found_component__["a" /* PageNotFoundComponent */],
                __WEBPACK_IMPORTED_MODULE_26__components_view_faq_view_faq_component__["a" /* ViewFaqComponent */],
                __WEBPACK_IMPORTED_MODULE_27__components_add_faq_add_faq_component__["a" /* AddFaqComponent */],
                __WEBPACK_IMPORTED_MODULE_28__components_edit_faq_edit_faq_component__["a" /* EditFaqComponent */],
                __WEBPACK_IMPORTED_MODULE_29__components_edit_profile_edit_profile_component__["a" /* EditProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_30__components_vendor_management_vendor_management_component__["a" /* VendorManagementComponent */],
                __WEBPACK_IMPORTED_MODULE_31__components_add_vendor_add_vendor_component__["a" /* AddVendorComponent */],
                __WEBPACK_IMPORTED_MODULE_32__transaction_management_transaction_management_component__["a" /* TransactionManagementComponent */],
                __WEBPACK_IMPORTED_MODULE_33__vendor_profile_vendor_profile_component__["a" /* VendorProfileComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["d" /* RouterModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_routing_app_routing_module__["a" /* routes */]),
                __WEBPACK_IMPORTED_MODULE_17__ckeditor_ckeditor5_angular__["a" /* CKEditorModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_19_ng6_toastr_notifications__["b" /* ToastrModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_18_ngx_spinner__["NgxSpinnerModule"],
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["e" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_21__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_23_ngx_pagination__["a" /* NgxPaginationModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_0__services_data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_22__guard_auth_guard__["a" /* AuthGuard */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/components/add-faq/add-faq.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/add-faq/add-faq.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"page-wrapper\">\n  <!-- HEADER MOBILE-->\n  <app-sidebar></app-sidebar>\n  <!-- PAGE CONTAINER-->\n  <div class=\"page-container\">\n    <!-- HEADER DESKTOP-->\n    <header class=\"header-desktop\">\n      <div class=\"section__content section__content--p30\">\n        <div class=\"container-fluid\">\n        </div>\n      </div>\n      <nav class=\"navbar-sidebar\" style=\"display:none\">\n        <div class=\"nav\" id=\"nav-tab\" role=\"tablist\">\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'dashboard')}\" [routerLink]=\"('/dashboard')\">Dashboard</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'user-management')}\" [routerLink]=\"('/user-management')\">User Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'vendor-management')}\" [routerLink]=\"('/vendor-management')\">Vendor Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'transaction-management')}\" [routerLink]=\"('/transaction-management')\">Transaction Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'branch-management')}\" [routerLink]=\"('/branch-management')\">Branch Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'settings')}\" [routerLink]=\"('/settings')\">Settings</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'edit-profile')}\" [routerLink]=\"('/edit-profile')\">Edit Profile</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'view-faqs')}\" [routerLink]=\"('/view-faqs')\">FAQ</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'terms-conditions')}\" [routerLink]=\"('/terms-conditions')\">Terms and Conditions</a>\n          <a class=\"nav-item nav-link\" data-toggle=\"modal\" style=\"cursor: pointer; color: #007bff\" data-target=\"#logoutModal\">Logout</a>\n        </div>\n      </nav>\n    </header>\n    <!-- HEADER DESKTOP-->\n\n    <!-- MAIN CONTENT-->\n    <div class=\"main-content\">\n        <div class=\"section__content section__content--p30\">\n          <div class=\"container-fluid\">\n            <div class=\"row\">\n              <div class=\"col-md-12\">\n\n\n                <div class=\"card\">\n                  <div class=\"card-header\">\n                    <strong class=\"card-title\">Add FAQ</strong>\n                  </div>\n                  <div class=\"table-data__tool-right\">\n\n                  </div>\n\n                  <div class=\"login-form\" style=\"padding: 50px;\">\n\n                    <form>\n                        <div class=\"form-group\">\n                            <label>Question</label>\n                            <input maxlength=\"256\" class=\"au-input au-input--full\" type=\"text\" [(ngModel)]=\"question\" name=\"question\" placeholder=\"Question\">\n                          </div>\n                        <div class=\"form-group\">\n                            <label>Answer</label>\n                            <input class=\"au-input au-input--full\" maxlength=\"256\" type=\"text\" [(ngModel)]=\"answer\" name=\"answer\" placeholder=\"Answer\">\n                          </div>\n                          <div class=\"form-actions form-group\">\n                            <button type=\"submit\" (click)=\"addFAQ()\" [disabled]=\"!question || !answer\" class=\"btn btn-primary btn-sm\">Submit</button>\n                          </div>\n                    </form>\n                    \n                </div>\n\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    <!-- END MAIN CONTENT-->\n    <!-- END PAGE CONTAINER-->\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/components/add-faq/add-faq.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddFaqComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_data_service__ = __webpack_require__("./src/app/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AddFaqComponent = /** @class */ (function () {
    function AddFaqComponent(dataService, route) {
        var _this = this;
        this.dataService = dataService;
        this.route = route;
        this.route.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* NavigationEnd */]) {
                _this.currUrl = event.url.split('/')[1];
            }
        });
    }
    AddFaqComponent.prototype.ngOnInit = function () {
    };
    AddFaqComponent.prototype.addFAQ = function () {
        var _this = this;
        if (navigator.onLine) {
            this.dataService.spinnerShow();
            var data = {
                "type": "FAQ",
                "question": this.question,
                "answer": this.answer
            };
            this.dataService.post("admin/addFaq", data, 1).subscribe(function (res) {
                _this.dataService.spinnerHide();
                if (res.response_code == 200) {
                    _this.dataService.successToastr(res.response_message);
                    window.history.back();
                }
                else if (res.response_code == 403 || res.response_code == 409 || res.response_code == 404 || res.response_code == 401) {
                    _this.dataService.errorToastr(res.response_message);
                    _this.dataService.logOut();
                }
                else {
                    _this.dataService.errorToastr(res.response_message);
                }
            }, function (err) {
                _this.dataService.spinnerHide();
                _this.dataService.errorToastr("Something went wrong");
            });
        }
        else {
            this.dataService.errorToastr("Your internet connection seems to be lost!");
        }
    };
    AddFaqComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-add-faq',
            template: __webpack_require__("./src/app/components/add-faq/add-faq.component.html"),
            styles: [__webpack_require__("./src/app/components/add-faq/add-faq.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]])
    ], AddFaqComponent);
    return AddFaqComponent;
}());



/***/ }),

/***/ "./src/app/components/add-vendor/add-vendor.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/add-vendor/add-vendor.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"page-wrapper\">\n  <!-- HEADER MOBILE-->\n  <app-sidebar></app-sidebar>\n  <!-- PAGE CONTAINER-->\n  <div class=\"page-container\">\n    <!-- HEADER DESKTOP-->\n    <header class=\"header-desktop\">\n      <div class=\"section__content section__content--p30\">\n        <div class=\"container-fluid\">\n        </div>\n      </div>\n      <nav class=\"navbar-sidebar\" style=\"display:none\">\n        <div class=\"nav\" id=\"nav-tab\" role=\"tablist\">\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'dashboard')}\"\n            [routerLink]=\"('/dashboard')\">Dashboard</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'user-management')}\"\n            [routerLink]=\"('/user-management')\">User Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'vendor-management')}\"\n            [routerLink]=\"('/vendor-management')\">Vendor Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'transaction-management')}\"\n            [routerLink]=\"('/transaction-management')\">Transaction Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'branch-management')}\"\n            [routerLink]=\"('/branch-management')\">Branch Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'settings')}\"\n            [routerLink]=\"('/settings')\">Settings</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'edit-profile')}\"\n            [routerLink]=\"('/edit-profile')\">Edit Profile</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'view-faqs')}\"\n            [routerLink]=\"('/view-faqs')\">FAQ</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'terms-conditions')}\"\n            [routerLink]=\"('/terms-conditions')\">Terms and Conditions</a>\n          <a class=\"nav-item nav-link\" data-toggle=\"modal\" style=\"cursor: pointer; color: #007bff\"\n            data-target=\"#logoutModal\">Logout</a>\n        </div>\n      </nav>\n    </header>\n    <!-- HEADER DESKTOP-->\n    <app-spinner></app-spinner>\n    <!-- MAIN CONTENT-->\n    <div class=\"main-content\">\n      <div class=\"section__content section__content--p30\">\n        <div class=\"container-fluid\">\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              <!-- DATA TABLE -->\n              <h3 class=\"title-5 m-b-35\">Add Vendor</h3>\n              <div class=\"row\">\n                <div class=\"col-lg-12\">\n                  <div class=\"au-card recent-report\">\n                    <div class=\"au-card-inner\">\n                      <button [routerLink]=\"['/vendor-management']\" type=\"submit\"\n                        class=\"btn btn-primary btn-sm\" style=\"width: 10%;\">Back</button>\n                      <hr />\n                      <div>\n                        <div class=\"table-responsive table-responsive-data2\">\n                          <form [formGroup]=\"addVendor\" #f=\"ngForm\">\n                            <table class=\"table table-data2\">\n                              <tbody>\n                                <tr>\n                                  <td>\n                                    <strong>Username*</strong>\n                                  </td>\n                                  <td>\n                                    <input formControlName=\"userName\" maxlength=\"50\" class=\"au-input au-input--full\"\n                                      type=\"text\" name=\"username\" placeholder=\"Username\">\n                                    <span class=\"error-msg\"\n                                      *ngIf=\"addVendor.get('userName').hasError('required') && (addVendor.get('userName').touched || addVendor.get('userName').dirty || f.submitted)\">Please\n                                      enter username.</span>\n                                    <span class=\"error-msg\"\n                                      *ngIf=\"addVendor.get('userName').hasError('minlength')\">Username\n                                      must contain at least 4 characters.</span>\n                                  </td>\n                                </tr>\n                                <tr class=\"spacer\"></tr>\n                                <tr>\n                                  <td>\n                                    <strong>First name*</strong>\n                                  </td>\n                                  <td>\n                                    <input formControlName=\"firstName\" maxlength=\"256\" class=\"au-input au-input--full\"\n                                      type=\"text\" name=\"firstname\" placeholder=\"First name\">\n                                    <span class=\"error-msg\"\n                                      *ngIf=\"addVendor.get('firstName').hasError('required') && (addVendor.get('firstName').touched || addVendor.get('firstName').dirty || f.submitted)\">Please\n                                      enter first name.</span>\n                                    <span class=\"error-msg\"\n                                      *ngIf=\"addVendor.get('firstName').hasError('pattern')\">Please\n                                      enter valid first name.</span>\n                                  </td>\n                                </tr>\n                                <tr class=\"spacer\"></tr>\n                                <tr>\n                                  <td>\n                                    <strong>Middle Name</strong>\n                                  </td>\n                                  <td>\n                                    <input formControlName=\"middleName\" maxlength=\"256\" class=\"au-input au-input--full\"\n                                      type=\"text\" name=\"middlename\" placeholder=\"Middle name\">\n                                    <span class=\"error-msg\"\n                                      *ngIf=\"addVendor.get('middleName').hasError('pattern')\">Please\n                                      enter valid middle name.</span>\n                                  </td>\n                                </tr>\n                                <tr class=\"spacer\"></tr>\n                                <tr>\n                                  <td>\n                                    <strong>Last name</strong>\n                                  </td>\n                                  <td>\n                                    <input formControlName=\"lastName\" maxlength=\"256\" class=\"au-input au-input--full\"\n                                      type=\"text\" name=\"lastname\" placeholder=\"Last name\">\n                                    <!-- <span class=\"error-msg\"\n                                      *ngIf=\"addVendor.get('lastName').hasError('required') && addVendor.get('lastName').dirty\">Please\n                                      enter last name.</span> -->\n                                    <span class=\"error-msg\"\n                                      *ngIf=\"addVendor.get('lastName').hasError('pattern')\">Please\n                                      enter valid last name.</span>\n                                  </td>\n                                </tr>\n                                <tr class=\"spacer\"></tr>\n                                <tr>\n                                  <td>\n                                    <strong>Email*</strong>\n                                  </td>\n                                  <td>\n                                    <input formControlName=\"email\" maxlength=\"256\" class=\"au-input au-input--full\"\n                                      type=\"email\" name=\"email\" placeholder=\"Email\">\n                                    <span class=\"error-msg\"\n                                      *ngIf=\"addVendor.get('email').hasError('required') && (addVendor.get('email').dirty || addVendor.get('email').touched || f.submitted)\">Please\n                                      enter email.</span>\n                                    <span class=\"error-msg\"\n                                      *ngIf=\"addVendor.get('email').hasError('pattern')\">Please\n                                      enter valid email.</span>\n                                  </td>\n                                </tr>\n                                <tr class=\"spacer\"></tr>\n                                <tr>\n                                  <td>\n                                    <strong>Store No.*</strong>\n                                  </td>\n                                  <td>\n                                    <input formControlName=\"storeNo\" maxlength=\"50\" class=\"au-input au-input--full\"\n                                      type=\"text\" name=\"storeNo\" placeholder=\"Store No.\">\n                                    <span class=\"error-msg\"\n                                      *ngIf=\"addVendor.get('storeNo').hasError('required') && (addVendor.get('storeNo').dirty || addVendor.get('storeNo').touched || f.submitted)\">Please\n                                      enter store number.</span>\n                                  </td>\n                                </tr>\n                                <tr class=\"spacer\"></tr>\n                                <tr>\n                                  <td>\n                                    <strong>Street Name*</strong>\n                                  </td>\n                                  <td>\n                                    <input formControlName=\"street\" maxlength=\"50\" class=\"au-input au-input--full\"\n                                      type=\"text\" name=\"street\" placeholder=\"Street Name\">\n                                    <span class=\"error-msg\"\n                                      *ngIf=\"addVendor.get('street').hasError('required') && (addVendor.get('street').dirty || addVendor.get('street').touched || f.submitted)\">Please\n                                      enter street name.</span>\n                                  </td>\n                                </tr>\n                                <tr class=\"spacer\"></tr>\n                                <!-- <tr>\n                                  <td>\n                                    <strong>Landmark</strong>\n                                  </td>\n                                  <td>\n                                    <input formControlName=\"landMark\" maxlength=\"50\" class=\"au-input au-input--full\"\n                                      type=\"text\" name=\"landMark\" placeholder=\"Landmark\">\n                                  </td>\n                                </tr> -->\n                                <tr class=\"spacer\"></tr>\n                                <tr>\n                                  <td>\n                                    <strong>Area*</strong>\n                                  </td>\n                                  <td>\n                                    <input formControlName=\"area\" maxlength=\"50\" class=\"au-input au-input--full\"\n                                      type=\"text\" name=\"area\" placeholder=\"Area\">\n                                    <span class=\"error-msg\"\n                                      *ngIf=\"addVendor.get('area').hasError('required') && (addVendor.get('area').dirty || addVendor.get('area').touched || f.submitted)\">Please\n                                      enter area.</span>\n                                  </td>\n                                </tr>\n                                <tr>\n                                  <td>\n                                    <strong>City*</strong>\n                                  </td>\n                                  <td>\n                                    <input formControlName=\"city\" maxlength=\"50\" class=\"au-input au-input--full\"\n                                      type=\"text\" name=\"city\" placeholder=\"City\">\n                                    <span class=\"error-msg\"\n                                      *ngIf=\"addVendor.get('city').hasError('required') && (addVendor.get('city').dirty || addVendor.get('city').touched || f.submitted)\">Please\n                                      enter city.</span>\n                                      <span class=\"error-msg\"\n                                      *ngIf=\"addVendor.get('city').hasError('pattern')\">Please\n                                      enter valid city.</span>\n                                  </td>\n                                </tr>\n                                <tr>\n                                  <td>\n                                    <strong>State/Province*</strong>\n                                  </td>\n                                  <td>\n                                    <input formControlName=\"state\" maxlength=\"50\" class=\"au-input au-input--full\"\n                                      type=\"text\" name=\"state\" placeholder=\"State\">\n                                    <span class=\"error-msg\"\n                                      *ngIf=\"addVendor.get('state').hasError('required') && (addVendor.get('state').dirty || addVendor.get('state').touched || f.submitted)\">Please\n                                      enter state.</span>\n                                      <span class=\"error-msg\"\n                                      *ngIf=\"addVendor.get('state').hasError('pattern')\">Please\n                                      enter valid state.</span>\n                                  </td>\n                                </tr>\n                                <tr>\n                                  <td>\n                                    <strong>Pin*</strong>\n                                  </td>\n                                  <td>\n                                    <input formControlName=\"pin\" maxlength=\"8\" class=\"au-input au-input--full\"\n                                      type=\"text\" name=\"pin\" placeholder=\"Pin\">\n                                    <span class=\"error-msg\"\n                                      *ngIf=\"addVendor.get('pin').hasError('required') && (addVendor.get('pin').touched || addVendor.get('pin').dirty || f.submitted)\">Please\n                                      enter pin.</span>\n                                      <span class=\"error-msg\"\n                                      *ngIf=\"addVendor.get('pin').hasError('pattern')\">Please\n                                      enter valid pin.</span>\n                                  </td>\n                                </tr>\n                                <tr class=\"spacer\"></tr>\n                                <tr>\n                                  <td>\n                                    <strong>Country*</strong>\n                                  </td>\n                                  <td>\n                                    <select class=\"form-control down-arrow select-form\" formControlName=\"country\"\n                                      (change)=\"selectedCountry()\">\n                                      <option value=\"\">Select Country*</option>\n                                      <option *ngFor=\"let country of countriesList\" [value]=\"country.name\">\n                                        {{country.name}}</option>\n                                    </select>\n                                    <span class=\"error-msg\"\n                                      *ngIf=\"addVendor.get('country').hasError('required') && (addVendor.get('country').dirty || addVendor.get('country').touched || f.submitted)\">Please\n                                      select country.</span>\n                                  </td>\n                                </tr>\n                                <tr class=\"spacer\"></tr>\n                                <tr *ngIf=\"addVendor.get('country').valid\">\n                                  <td>\n                                    <strong>Country Code*</strong>\n                                  </td>\n                                  <td>\n                                    {{countryCode}}\n                                  </td>\n                                </tr>\n                                <tr class=\"spacer\"></tr>\n                                <tr>\n                                  <td>\n                                    <strong>Mobile Number*</strong>\n                                  </td>\n                                  <td>\n                                    <input formControlName=\"mobileNumber\" maxlength=\"256\"\n                                      class=\"au-input au-input--full\" type=\"text\" name=\"mobileNumber\"\n                                      placeholder=\"Mobile Number\">\n                                    <span class=\"error-msg\"\n                                      *ngIf=\"addVendor.get('mobileNumber').hasError('required') && (addVendor.get('mobileNumber').dirty || addVendor.get('mobileNumber').touched || f.submitted)\">Please\n                                      enter mobile number.</span>\n                                    <span class=\"error-msg\"\n                                      *ngIf=\"addVendor.get('mobileNumber').hasError('pattern')\">Please\n                                      enter valid mobile number.</span>\n                                  </td>\n                                </tr>\n                                <tr class=\"spacer\"></tr>\n                                <!-- <tr>\n                                  <td>\n                                    <strong>Password*</strong>\n                                  </td>\n                                  <td>\n                                    <input formControlName=\"password\" maxlength=\"16\" class=\"au-input au-input--full\"\n                                      type=\"password\" name=\"password\" placeholder=\"Password\">\n                                    <span class=\"error-msg\"\n                                      *ngIf=\"addVendor.get('password').hasError('required') && addVendor.get('password').dirty\">Please\n                                      enter password.</span>\n                                    <span class=\"error-msg\"\n                                      *ngIf=\"addVendor.get('password').hasError('pattern') && addVendor.get('password').dirty\">Password\n                                      must contain at least 6 characters.</span>\n                                  </td>\n                                </tr> -->\n                              </tbody>\n                            </table>\n                            <!-- <div *ngIf=\"messageError\" style=\"text-align: center;color:red;\">{{messageError}}</div> -->\n                            <div class=\"form-actions form-group\">\n                              <button type=\"submit\" \n                                class=\"btn btn-primary btn-sm\" style=\"width: 10%;\" (click)=\"add()\">Submit</button>\n                                <!-- [disabled]=\"!addVendor.valid || !countryCode\" -->\n                            </div>\n                          </form>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n\n        </div>\n      </div>\n    </div>\n    <!-- END MAIN CONTENT-->\n    <!-- END PAGE CONTAINER-->\n  </div>\n\n</div>\n<footer>\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <div class=\"copyright\">\n        <p>Copyright © 2019 Remittance - A digital Wallet. All rights reserved.</p>\n      </div>\n    </div>\n  </div>\n</footer>"

/***/ }),

/***/ "./src/app/components/add-vendor/add-vendor.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddVendorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_data_service__ = __webpack_require__("./src/app/services/data.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AddVendorComponent = /** @class */ (function () {
    function AddVendorComponent(dataService, route) {
        var _this = this;
        this.dataService = dataService;
        this.route = route;
        this.addVendor = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormGroup */]({
            userName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(4)])),
            firstName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern(/^[a-zA-Z]*$/)])),
            middleName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern(/^[a-zA-Z]*$/)),
            lastName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern(/^(\w+\s?)*\s*$/)])),
            email: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)])),
            storeNo: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required])),
            street: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required])),
            // landMark: new FormControl(''),
            area: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required])),
            city: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern(/^[a-zA-Z]*$/)])),
            state: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern(/^(\w+\s?)*\s*$/)])),
            pin: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern(/^[1-9][0-9]{4,5}$/)])),
            country: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required),
            mobileNumber: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern(/^[1-9][0-9]{4,14}$/)])),
        });
        this.route.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* NavigationEnd */]) {
                _this.currUrl = event.url.split('/')[1];
            }
        });
    }
    AddVendorComponent.prototype.ngOnInit = function () {
        this.countryListApi();
        this.message();
    };
    AddVendorComponent.prototype.message = function () {
        if (this.addVendor.valid && this.countryCode) {
            this.messageError = '';
        }
    };
    //------------------------------ Country JSON ------------------------------//
    AddVendorComponent.prototype.countryListApi = function () {
        var _this = this;
        this.dataService.getJson().subscribe(function (response) {
            _this.countriesList = response['countries'];
        }, function (error) {
            _this.dataService.errorToastr('Could not fetch list of countries. Please try again later');
        });
    };
    //------------------------------ End Country JSON ------------------------------//
    //------------------------------ Change Country ------------------------------//
    AddVendorComponent.prototype.selectedCountry = function () {
        var _this = this;
        var index = this.countriesList.findIndex(function (x) { return x.name == _this.addVendor.value.country; });
        if (index > -1) {
            console.log(index);
            this.countryCode = this.countriesList[index].dial_code;
        }
    };
    //------------------------------ End Change Country ------------------------------//
    AddVendorComponent.prototype.add = function () {
        var _this = this;
        if (navigator.onLine) {
            if (this.addVendor.valid && this.countryCode) {
                this.dataService.spinnerShow();
                this.addVendor.value.countryCode = this.countryCode;
                this.dataService.post('admin/addVendor', this.addVendor.value, 1).subscribe(function (response) {
                    _this.dataService.spinnerHide();
                    if (response['response_code'] == 200 || response['response_code'] == 201) {
                        _this.route.navigate(['/vendor-management']);
                    }
                    else if (response.response_code == 403 || response.response_code == 409 || response.response_code == 401) {
                        _this.dataService.errorToastr(response.response_message);
                        _this.dataService.logOut();
                    }
                    else {
                        _this.dataService.errorToastr(response["response_message"]);
                    }
                }, function (err) {
                    _this.dataService.spinnerHide();
                    _this.dataService.errorToastr('Something went wrong');
                });
            }
            else {
                this.dataService.errorToastr("Some information is missing. Please complete the form");
            }
        }
        else
            this.dataService.errorToastr('Your internet connection seems to be lost');
    };
    AddVendorComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-add-vendor',
            template: __webpack_require__("./src/app/components/add-vendor/add-vendor.component.html"),
            styles: [__webpack_require__("./src/app/components/add-vendor/add-vendor.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services_data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]])
    ], AddVendorComponent);
    return AddVendorComponent;
}());



/***/ }),

/***/ "./src/app/components/dashboard/dashboard.component.css":
/***/ (function(module, exports) {

module.exports = "/* .profile,.nav-sm span.fa{display:none}.nav-sm .nav.side-menu li a i{font-size:25px!important;text-align:center;width:100%!important;margin-bottom:5px}.nav-sm ul.nav.child_menu{left:100%;position:absolute;top:0;width:210px;z-index:4000;background:#3E5367;display:none}.nav-sm ul.nav.child_menu li{padding:0 10px}.nav-sm ul.nav.child_menu li a{text-align:left!important}.menu_section{margin-bottom:35px}.menu_section h3{padding-left:15px;color:#fff;text-transform:uppercase;letter-spacing:.5px;font-weight:700;font-size:11px;margin-bottom:0;margin-top:0;text-shadow:1px 1px #000}.menu_section>ul{margin-top:10px}.profile_pic{width:35%;float:left}.img-circle.profile_img{width:70%;background:#fff;margin-left:15%;z-index:1000;position:inherit;margin-top:20px;border:1px solid rgba(52,73,94,.44);padding:4px}.profile_info{padding:25px 10px 10px;width:65%;float:left}.profile_info span{font-size:13px;line-height:30px;color:#BAB8B8}.profile_info h2{font-size:14px;color:#ECF0F1;margin:0;font-weight:300}.profile.img_2{text-align:center}.profile.img_2 .profile_pic{width:100%}.profile.img_2 .profile_pic .img-circle.profile_img{width:50%;margin:10px 0 0}.profile.img_2 .profile_info{padding:15px 10px 0;width:100%;margin-bottom:10px;float:left}\n\n.profile_pic{width:35%;float:left}.img-circle.profile_img{width:70%;background:#fff;margin-left:15%;z-index:1000;position:inherit;margin-top:20px;border:1px solid rgba(52,73,94,.44);padding:4px}.profile_info{padding:25px 10px 10px;width:65%;float:left}.profile_info span{font-size:13px;line-height:30px;color:#BAB8B8}.profile_info h2{font-size:14px;color:#ECF0F1;margin:0;font-weight:300}.profile.img_2{text-align:center}.profile.img_2 .profile_pic{width:100%}.profile.img_2 .profile_pic .img-circle.profile_img{width:50%;margin:10px 0 0}.profile.img_2 .profile_info{padding:15px 10px 0;width:100%;margin-bottom:10px;float:left}\n\n.clearfix:after,form:after{content:\".\";display:block;height:0;clear:both;visibility:hidden} */\n"

/***/ }),

/***/ "./src/app/components/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"page-wrapper\">\n  <!-- HEADER MOBILE-->\n  <app-sidebar></app-sidebar>\n  <!-- PAGE CONTAINER-->\n  <div class=\"page-container\">\n    <header class=\"header-desktop\">\n      <div class=\"section__content section__content--p30\">\n        <div class=\"container-fluid\">\n        </div>\n      </div>\n      <nav class=\"navbar-sidebar\" style=\"display:none\">\n        <div class=\"nav\" id=\"nav-tab\" role=\"tablist\">\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'dashboard')}\"\n            [routerLink]=\"('/dashboard')\">Dashboard</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'user-management')}\"\n            [routerLink]=\"('/user-management')\">User Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'vendor-management')}\"\n            [routerLink]=\"('/vendor-management')\">Vendor Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'transaction-management')}\"\n            [routerLink]=\"('/transaction-management')\">Transaction Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'branch-management')}\"\n            [routerLink]=\"('/branch-management')\">Branch Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'settings')}\"\n            [routerLink]=\"('/settings')\">Settings</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'edit-profile')}\"\n            [routerLink]=\"('/edit-profile')\">Edit Profile</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'view-faqs')}\"\n            [routerLink]=\"('/view-faqs')\">FAQ</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'terms-conditions')}\"\n            [routerLink]=\"('/terms-conditions')\">Terms and Conditions</a>\n          <a class=\"nav-item nav-link\" data-toggle=\"modal\" style=\"cursor: pointer; color: #007bff\"\n            data-target=\"#logoutModal\">Logout</a>\n        </div>\n      </nav>\n    </header>\n    <!-- MAIN CONTENT-->\n    <div class=\"main-content\">\n      <div class=\"section__content section__content--p30\">\n        <div class=\"container-fluid\">\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              <div class=\"overview-wrap\">\n                <h2 class=\"title-1\">Overview</h2>\n              </div>\n            </div>\n          </div>\n          <div class=\"row m-t-25\">\n            <div class=\"col-sm-6 col-lg-4\">\n              <div class=\"overview-item overview-item--c1\">\n                <div class=\"overview__inner\">\n                  <div class=\"overview-box clearfix\">\n                    <div class=\"icon\">\n                      <i class=\"zmdi zmdi-account-o\"></i>\n                    </div>\n                    <div class=\"text\">\n                      <h2>{{noOfUsers}}</h2>\n                      <span>Total No. of Users</span>\n                    </div>\n                  </div>\n                  <div class=\"overview-chart\">\n                    <canvas id=\"widgetChart1\"></canvas>\n                  </div>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-sm-6 col-lg-4\">\n              <div class=\"overview-item overview-item--c2\">\n                <div class=\"overview__inner\">\n                  <div class=\"overview-box clearfix\">\n                    <div class=\"icon\">\n                      <i class=\"zmdi zmdi-money\"></i>\n                    </div>\n                    <div class=\"text\">\n                      <h2>{{totalTransaction}}</h2>\n                      <span>Total No. of Transactions</span>\n                    </div>\n                  </div>\n                  <div class=\"overview-chart\">\n                    <canvas id=\"widgetChart2\"></canvas>\n                  </div>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-sm-6 col-lg-4\">\n              <div class=\"overview-item overview-item--c3\">\n                <div class=\"overview__inner\">\n                  <div class=\"overview-box clearfix\">\n                    <div class=\"icon\">\n                      <i class=\"zmdi zmdi-store\"></i>\n                    </div>\n                    <div class=\"text\">\n                      <h2>{{totalVander}}</h2>\n                      <span>Total No. of Vendor</span>\n                    </div>\n                  </div>\n                  <div class=\"overview-chart\">\n                    <canvas id=\"widgetChart3\"></canvas>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-lg-12\">\n              <div class=\"au-card recent-report\">\n                <div class=\"au-card-inner\">\n                  <h3 class=\"title-2\">recent reports</h3>\n                  <div class=\"chart-info\">\n                    <div class=\"chart-info__left\">\n                      <div class=\"chart-note\">\n                        <span class=\"dot dot--blue\"></span>\n                        <span>products</span>\n                      </div>\n                      <div class=\"chart-note mr-0\">\n                        <span class=\"dot dot--green\"></span>\n                        <span>services</span>\n                      </div>\n                    </div>\n                    <div class=\"chart-info__right\">\n                      <div class=\"chart-statis\">\n                        <span class=\"index incre\">\n                          <i class=\"zmdi zmdi-long-arrow-up\"></i>25%</span>\n                        <span class=\"label\">products</span>\n                      </div>\n                      <div class=\"chart-statis mr-0\">\n                        <span class=\"index decre\">\n                          <i class=\"zmdi zmdi-long-arrow-down\"></i>10%</span>\n                        <span class=\"label\">services</span>\n                      </div>\n                    </div>\n                  </div>\n                  <div class=\"recent-report__chart\">\n                    <div style=\"padding-left: 65%; width: 97%;\">\n                        <select class=\"form-control max-WT-100 m-2\" name='transactions' [(ngModel)]='transactionData' #sel (change)=\"onChange($event)\" >\n                            <option value=\"Yearly\" selected>All</option>\n                            <option value=\"Daily\">Daily</option>\n                            <option value=\"Weekly\">Weekly</option>\n                            <option value=\"Monthly\">Monthly</option>\n                            <option value=\"Yearly\">Yearly</option>\n                          </select>\n                    </div>\n                    <!-- <canvas id=\"recent-rep-chart\"></canvas> -->\n                    <div>\n                      <div id=\"chartContainer\" style=\"height: 370px; width: 100%;\"></div>\n                    </div>\n                  </div>\n                  <div class=\"recent-report__chart\">\n                    <div style=\"padding-left: 65%; width: 97%;\">\n                        <select class=\"form-control max-WT-100 m-2\" name='transactions' [(ngModel)]='transactionData1' #sel (change)=\"onChange1($event)\">\n                            <option value=\"Yearly\" selected>All</option>\n                            <option value=\"Daily\">Daily</option>\n                            <option value=\"Weekly\">Weekly</option>\n                            <option value=\"Monthly\">Monthly</option>\n                            <option value=\"Yearly\">Yearly</option>\n                          </select>\n                    </div>\n                    <!-- <canvas id=\"recent-rep-chart\"></canvas> -->\n                    <div>\n                      <div id=\"chartContainer1\" style=\"height: 370px; width: 100%;\"></div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <!-- END MAIN CONTENT-->\n    <!-- END PAGE CONTAINER-->\n  </div>\n\n</div>\n<footer>\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <div class=\"copyright\">\n        <p>Copyright © 2019 Remittance - A digital Wallet. All rights reserved.</p>\n      </div>\n    </div>\n  </div>\n</footer>"

/***/ }),

/***/ "./src/app/components/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ng6_toastr_notifications__ = __webpack_require__("./node_modules/ng6-toastr-notifications/fesm5/ng6-toastr-notifications.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_data_service__ = __webpack_require__("./src/app/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(dataService, toaster, route) {
        var _this = this;
        this.dataService = dataService;
        this.toaster = toaster;
        this.route = route;
        this.transactionData = 'Yearly';
        this.monthChartData = '';
        this.graphData = [];
        this.graphDisplay = [];
        this.transactionData1 = 'Yearly';
        this.route.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* NavigationEnd */]) {
                _this.currUrl = event.url.split('/')[1];
            }
        });
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageChange(1);
        this.onChange(1);
        this.onChange1(1);
        this.canvasChart();
        this.canvasChartAmount();
        if (navigator.onLine) {
            this.dataService.spinnerShow();
            this.dataService.get("admin/totalUser", '').subscribe(function (res) {
                _this.dataService.spinnerHide();
                if (res.response_code == 200) {
                    _this.noOfUsers = res.result.result;
                }
                if (res.response_code == 403 || res.response_code == 409 || res.response_code == 404 || res.response_code == 401) {
                    _this.toaster.errorToastr(res.response_message);
                    _this.dataService.logOut();
                }
            }, function (err) {
                _this.dataService.spinnerHide();
                console.log("Error", err);
            });
            this.dataService.spinnerShow();
            this.dataService.get("admin/totalTransaction", 1).subscribe(function (res) {
                _this.dataService.spinnerHide();
                _this.totalTransaction = res.result.result;
            }, function (err) {
                _this.dataService.spinnerHide();
                console.log("Error", err);
            });
        }
        else {
            this.toaster.dismissAllToastr();
            this.toaster.errorToastr("Your internet connection seems to be lost!");
        }
    };
    DashboardComponent.prototype.canvasChart = function () {
        var chart = new CanvasJS.Chart("chartContainer");
        // chart.options.axisY = { prefix: "$", suffix: "K", includeZero: false };
        chart.options.axisY = { includeZero: false };
        chart.options.title = { text: "Total Transactions" };
        var series1 = {
            type: "column",
            name: "First Quarter",
            indexLabelFontColor: "#5A5757",
            indexLabelPlacement: "outside",
            showInLegend: true,
            dataPoints: this.graphDisplay,
        };
        chart.options.data = [];
        chart.options.data.push(series1);
        chart.render();
    };
    DashboardComponent.prototype.onChange = function (event) {
        var _this = this;
        this.graphDisplay = [];
        this.dataService.spinnerShow();
        this.dataService.post('admin/userGraph', { "dayCount": this.transactionData }, 1).subscribe(function (data) {
            _this.dataService.spinnerHide();
            _this.graphData = data.totalTransaction;
            _this.graphData.forEach(function (element) {
                _this.graphDisplay.push({ label: element.day.toString(), y: element.count, indexLabel: element.day.toString() });
            });
            _this.canvasChart();
        }, function (error) {
            _this.dataService.spinnerHide();
        });
    };
    DashboardComponent.prototype.pageChange = function (currentPage) {
        var _this = this;
        this.dataService.spinnerShow();
        this.dataService.post("admin/searchVendors", {
            page: currentPage
        }, 1).subscribe(function (res) {
            _this.dataService.spinnerHide();
            if (res.response_code == 200) {
                _this.totalVander = res.result.total;
            }
            else if (res.response_code == 403 || res.response_code == 409 || res.response_code == 404 || res.response_code == 401) {
                _this.dataService.errorToastr(res.response_message);
                // this.dataService.logOut();
            }
            else {
                _this.dataService.errorToastr("Cannot get the users.");
            }
        }, function (err) {
            _this.dataService.spinnerHide();
            _this.dataService.errorToastr("Cannot get the users.");
        });
    };
    DashboardComponent.prototype.canvasChartAmount = function () {
        var chart = new CanvasJS.Chart("chartContainer1");
        chart.options.axisY = { prefix: "$", includeZero: false };
        chart.options.title = { text: "Total volume of transaction" };
        var series1 = {
            type: "column",
            name: "First Quarter",
            indexLabelFontColor: "#5A5757",
            indexLabelPlacement: "outside",
            showInLegend: true,
            dataPoints: this.graphDisplay1,
        };
        chart.options.data = [];
        chart.options.data.push(series1);
        chart.render();
    };
    DashboardComponent.prototype.onChange1 = function (event) {
        var _this = this;
        this.graphDisplay1 = [];
        this.dataService.spinnerShow();
        this.dataService.post('admin/userGraphVolume', { "dayCount": this.transactionData1 }, 1).subscribe(function (data) {
            _this.dataService.spinnerHide();
            _this.graphData = data.totalTransaction;
            _this.graphData.forEach(function (element) {
                _this.graphDisplay1.push({ label: element.day.toString(), y: element.count, indexLabel: element.day.toString() });
                console.log('ststus ', _this.graphDisplay1);
            });
            _this.canvasChartAmount();
        }, function (error) {
            _this.dataService.spinnerHide();
        });
    };
    DashboardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__("./src/app/components/dashboard/dashboard.component.html"),
            styles: [__webpack_require__("./src/app/components/dashboard/dashboard.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_0_ng6_toastr_notifications__["a" /* ToastrManager */], __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/components/edit-faq/edit-faq.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/edit-faq/edit-faq.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"page-wrapper\">\n    <!-- HEADER MOBILE-->\n    <app-sidebar></app-sidebar>\n    <!-- PAGE CONTAINER-->\n    <div class=\"page-container\">\n      <!-- HEADER DESKTOP-->\n      <header class=\"header-desktop\">\n        <div class=\"section__content section__content--p30\">\n          <div class=\"container-fluid\">\n          </div>\n        </div>\n        <nav class=\"navbar-sidebar\" style=\"display:none\">\n          <div class=\"nav\" id=\"nav-tab\" role=\"tablist\">\n            <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'dashboard')}\" [routerLink]=\"('/dashboard')\">Dashboard</a>\n            <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'user-management')}\" [routerLink]=\"('/user-management')\">User Management</a>\n            <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'vendor-management')}\" [routerLink]=\"('/vendor-management')\">Vendor Management</a>\n            <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'transaction-management')}\" [routerLink]=\"('/transaction-management')\">Transaction Management</a>\n            <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'branch-management')}\" [routerLink]=\"('/branch-management')\">Branch Management</a>\n            <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'settings')}\" [routerLink]=\"('/settings')\">Settings</a>\n            <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'edit-profile')}\" [routerLink]=\"('/edit-profile')\">Edit Profile</a>\n            <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'view-faqs')}\" [routerLink]=\"('/view-faqs')\">FAQ</a>\n            <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'terms-conditions')}\" [routerLink]=\"('/terms-conditions')\">Terms and Conditions</a>\n            <a class=\"nav-item nav-link\" data-toggle=\"modal\" style=\"cursor: pointer; color: #007bff\" data-target=\"#logoutModal\">Logout</a>\n          </div>\n        </nav>\n      </header>\n      <!-- HEADER DESKTOP-->\n  \n      <!-- MAIN CONTENT-->\n      <div class=\"main-content\">\n          <div class=\"section__content section__content--p30\">\n            <div class=\"container-fluid\">\n              <div class=\"row\">\n                <div class=\"col-md-12\">\n  \n  \n                  <div class=\"card\">\n                    <div class=\"card-header\">\n                      <strong class=\"card-title\">Edit FAQ</strong>\n                    </div>\n                    <div class=\"table-data__tool-right\">\n  \n                    </div>\n  \n                    <div class=\"login-form\" style=\"padding: 50px;\">\n  \n                      <form>\n                          <div class=\"form-group\">\n                              <label>Question</label>\n                              <input maxlength=\"256\" class=\"au-input au-input--full\" type=\"text\" [(ngModel)]=\"question\" name=\"question\" placeholder=\"Question\">\n                            </div>\n                          <div class=\"form-group\">\n                              <label>Answer</label>\n                              <input class=\"au-input au-input--full\" maxlength=\"256\" type=\"text\" [(ngModel)]=\"answer\" name=\"answer\" placeholder=\"Answer\">\n                            </div>\n                            <div class=\"form-actions form-group\">\n                              <button type=\"submit\" (click)=\"editFAQ()\" [disabled]=\"!question || !answer\" class=\"btn btn-primary btn-sm\">Submit</button>\n                            </div>\n                      </form>\n                      \n                  </div>\n  \n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      <!-- END MAIN CONTENT-->\n      <!-- END PAGE CONTAINER-->\n    </div>\n  \n  </div>\n  "

/***/ }),

/***/ "./src/app/components/edit-faq/edit-faq.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditFaqComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_data_service__ = __webpack_require__("./src/app/services/data.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EditFaqComponent = /** @class */ (function () {
    function EditFaqComponent(activatedRoute, dataService, route) {
        var _this = this;
        this.activatedRoute = activatedRoute;
        this.dataService = dataService;
        this.route = route;
        this.route.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* NavigationEnd */]) {
                _this.currUrl = event.url.split('/')[1];
            }
        });
    }
    EditFaqComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (res) {
            _this.FAQ_id = res.faqId;
        });
        this.getFAQ();
    };
    EditFaqComponent.prototype.getFAQ = function () {
        var _this = this;
        if (navigator.onLine) {
            this.dataService.spinnerShow();
            var data = {
                "faq": this.FAQ_id
            };
            this.dataService.post("admin/viewFaqId", data, 1).subscribe(function (res) {
                _this.dataService.spinnerHide();
                if (res.response_code == 200) {
                    _this.question = res.obj.question;
                    _this.answer = res.obj.answer;
                }
                else if (res.response_code == 403 || res.response_code == 409 || res.response_code == 404 || res.response_code == 401) {
                    _this.dataService.errorToastr(res.response_message);
                    _this.dataService.logOut();
                }
                else {
                    _this.dataService.errorToastr(res.response_message);
                }
            }, function (err) {
                _this.dataService.spinnerHide();
                _this.dataService.errorToastr("Something went wrong");
            });
        }
        else {
            this.dataService.errorToastr("Your internet connection seems to be lost!");
        }
    };
    EditFaqComponent.prototype.editFAQ = function () {
        var _this = this;
        if (navigator.onLine) {
            this.dataService.spinnerShow();
            var data = {
                "_id": this.FAQ_id,
                "type": "FAQ",
                "question": this.question,
                "answer": this.answer
            };
            this.dataService.post("admin/updateFaq", data, 1).subscribe(function (res) {
                _this.dataService.spinnerHide();
                if (res.response_code == 200) {
                    _this.dataService.successToastr(res.response_message);
                    window.history.back();
                }
                else if (res.response_code == 403 || res.response_code == 409 || res.response_code == 404 || res.response_code == 401) {
                    _this.dataService.errorToastr(res.response_message);
                    _this.dataService.logOut();
                }
                else {
                    _this.dataService.errorToastr(res.response_message);
                }
            }, function (err) {
                _this.dataService.spinnerHide();
                _this.dataService.errorToastr("Something went wrong");
            });
        }
        else {
            this.dataService.errorToastr("Your internet connection seems to be lost!");
        }
    };
    EditFaqComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-edit-faq',
            template: __webpack_require__("./src/app/components/edit-faq/edit-faq.component.html"),
            styles: [__webpack_require__("./src/app/components/edit-faq/edit-faq.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_2__services_data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]])
    ], EditFaqComponent);
    return EditFaqComponent;
}());



/***/ }),

/***/ "./src/app/components/edit-profile/edit-profile.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/edit-profile/edit-profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"page-wrapper\">\n  <!-- HEADER MOBILE-->\n  <app-sidebar></app-sidebar>\n  <!-- PAGE CONTAINER-->\n  <div class=\"page-container\">\n    <!-- HEADER DESKTOP-->\n    <header class=\"header-desktop\">\n      <div class=\"section__content section__content--p30\">\n        <div class=\"container-fluid\">\n        </div>\n      </div>\n      <nav class=\"navbar-sidebar\" style=\"display:none\">\n        <div class=\"nav\" id=\"nav-tab\" role=\"tablist\">\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'dashboard')}\" [routerLink]=\"('/dashboard')\">Dashboard</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'user-management')}\" [routerLink]=\"('/user-management')\">User Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'vendor-management')}\" [routerLink]=\"('/vendor-management')\">Vendor Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'transaction-management')}\" [routerLink]=\"('/transaction-management')\">Transaction Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'branch-management')}\" [routerLink]=\"('/branch-management')\">Branch Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'settings')}\" [routerLink]=\"('/settings')\">Settings</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'edit-profile')}\" [routerLink]=\"('/edit-profile')\">Edit Profile</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'view-faqs')}\" [routerLink]=\"('/view-faqs')\">FAQ</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'terms-conditions')}\" [routerLink]=\"('/terms-conditions')\">Terms and Conditions</a>\n          <a class=\"nav-item nav-link\" data-toggle=\"modal\" style=\"cursor: pointer; color: #007bff\" data-target=\"#logoutModal\">Logout</a>\n        </div>\n      </nav>\n    </header>\n    <!-- HEADER DESKTOP-->\n<app-spinner></app-spinner>\n    <!-- MAIN CONTENT-->\n    <div class=\"main-content\">\n      <div class=\"section__content section__content--p30\">\n        <div class=\"container-fluid\">\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              <!-- DATA TABLE -->\n              <h3 class=\"title-5 m-b-35\">Edit Profile</h3>\n              <div class=\"row\">\n                <div class=\"col-lg-12\">\n                  <div class=\"au-card recent-report\">\n                    <div class=\"au-card-inner\">\n                      <div>\n                          <div style=\"display: flex;justify-content: center;border-radius: 50%;\">\n                            <img [src]=\"(profilePic)?(profilePic):('assets/images/icon/avatar-01.jpg')\" alt=\"...\" class=\"img-circle profile_img maxHeight\">\n                            <label class=\"upload-label\">\n                                <input type=\"file\" (change)=\"changeImage($event)\" accept=\"image/*\">\n                                <i class=\"fas fa-camera\"></i>\n                            </label>\n                            <!-- <input type='file'/>\n                            <i class=\"fas fa-edit editPicture\"></i> -->\n                          </div>\n                          <hr/>\n                          <div class=\"table-responsive table-responsive-data2\">\n                            <form [formGroup]=\"editProfile\">\n                            <table class=\"table table-data2\">\n                              <tbody>\n                                  <tr>\n                                      <td>\n                                        <strong>Username:</strong>\n                                      </td>\n                                      <td>\n                                         {{userName}}\n                                      </td>\n                                    </tr>\n                                    <tr class=\"spacer\"></tr>\n                                <tr>\n                                  <td>\n                                    <strong>First Name*:</strong>\n                                  </td>\n                                  <td>\n                                      <input class=\"au-input au-input--full\" maxlength=\"256\" formControlName=\"firstName\" type=\"text\" name=\"firstName\" placeholder=\"First Name\">\n                                      <span class=\"error-msg\" *ngIf=\"editProfile.get('firstName').hasError('required') && editProfile.get('firstName').dirty\" >Please enter the first name</span>\n                                      <span class=\"error-msg\" *ngIf=\"editProfile.get('firstName').hasError('pattern') && editProfile.get('firstName').dirty\" >Please enter valid first name</span>\n                                  </td>\n                                </tr>\n                                <tr class=\"spacer\"></tr>\n                                <tr>\n                                    <td>\n                                      <strong>Last Name:</strong>\n                                    </td>\n                                    <td>\n                                        <input class=\"au-input au-input--full\" maxlength=\"256\" formControlName=\"lastName\" type=\"text\" name=\"lastName\" placeholder=\"Last Name\">\n                                        <span class=\"error-msg\" *ngIf=\"editProfile.get('lastName').hasError('pattern') && editProfile.get('lastName').dirty\" >Please enter valid last name</span>\n                                    </td>\n                                  </tr>\n                                  <tr class=\"spacer\"></tr>\n                                <tr>\n                                  <td>\n                                    <strong>Email*:</strong>\n                                  </td>\n                                  <td>\n                                      <input class=\"au-input au-input--full\" maxlength=\"256\" formControlName=\"email\" type=\"email\" name=\"email\" placeholder=\"Email\">\n                                      <span class=\"error-msg\" *ngIf=\"editProfile.get('email').hasError('required')\" >Please enter the email id</span>\n                                      <span class=\"error-msg\" *ngIf=\"editProfile.get('email').hasError('pattern')\" >Please enter the email id</span>\n                                  </td>\n\n                                </tr>\n                                <tr class=\"spacer\"></tr>\n                               \n                              </tbody>\n                            </table>\n                          </form>\n                          </div>\n                      </div>\n                      <div class=\"form-actions form-group\">\n                        <button type=\"submit\" (click)=\"updateProfile()\" [disabled]=\"!editProfile.valid\" class=\"btn btn-primary btn-sm\" >Submit</button>\n                      </div>\n\n\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n          \n        </div>\n      </div>\n    </div>\n    <!-- END MAIN CONTENT-->\n    <!-- END PAGE CONTAINER-->\n  </div>\n\n</div>\n<div class=\"modal fade global-modal reset-modal\" id=\"otp\">\n    <div class=\"modal-dialog max-WT-500\">\n      <form class=\"change_password\">\n        <div class=\"modal-content\">\n          <div>\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\"></button>\n  \n            <div class=\"modal-body\">\n              <div class=\"text-center modal_flax_height d-flex align-items-center justify-content-center\">\n                <div class=\"w-100\">\n                  <p>An OTP has been sent to your new email id. Kindly enter that to confirm the email change.</p>\n                  <div>\n                    <input type=\"text\" class=\"form-control\" placeholder=\"Enter OTP\" maxlength=\"4\" [(ngModel)]=\"otp\" [ngModelOptions]=\"{standalone: true}\"\n                      required/>\n                    <button type=\"button\" class=\"btn btn-danger\" style=\"margin-top:10px;\" (click)=\"verify()\" [disabled]=\"!otp\">Ok</button>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n<footer>\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <div class=\"copyright\">\n        <p>Copyright © 2019 Remittance - A digital Wallet. All rights reserved.</p>\n      </div>\n    </div>\n  </div>\n</footer>\n"

/***/ }),

/***/ "./src/app/components/edit-profile/edit-profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_data_service__ = __webpack_require__("./src/app/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EditProfileComponent = /** @class */ (function () {
    function EditProfileComponent(dataService, route) {
        var _this = this;
        this.dataService = dataService;
        this.route = route;
        this.editProfile = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormGroup */]({
            firstName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required
            ])),
            lastName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required
            ])),
            email: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)
            ]))
        });
        this.route.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* NavigationEnd */]) {
                _this.currUrl = event.url.split('/')[1];
            }
        });
    }
    EditProfileComponent.prototype.ngOnInit = function () {
        this.getProfile();
    };
    EditProfileComponent.prototype.getProfile = function () {
        var _this = this;
        if (navigator.onLine) {
            this.dataService.spinnerShow();
            this.dataService.post('admin/viewAdmin', { adminId: JSON.parse(localStorage.getItem('remittance')).id }, 1).subscribe(function (response) {
                _this.dataService.spinnerHide();
                if (response['response_code'] == 200) {
                    _this.editProfile.setValue({
                        firstName: (response.result.firstName) ? (response.result.firstName) : '',
                        lastName: (response.result.lastName) ? (response.result.lastName) : '',
                        email: response.result.email
                    });
                    _this.userName = response.result.userName;
                    _this.profilePic = response.result.profilePic;
                }
                else if (response.response_code == 403 || response.response_code == 409 || response.response_code == 401 || response.response_code == 404) {
                    _this.dataService.errorToastr(response.response_message);
                    _this.dataService.logOut();
                }
                else {
                    _this.dataService.errorToastr(response["response_message"]);
                }
            }, function (err) {
                _this.dataService.spinnerHide();
                _this.dataService.errorToastr('Something went wrong');
            });
        }
        else
            this.dataService.errorToastr('Your internet connection seems to be lost');
    };
    //----------------------------------------- CHANGE IMAGE FUNCTIONALITY STARTS -----------------------------------------//
    EditProfileComponent.prototype.changeImage = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            var img = event.target.files[0].type.split("/");
            if (img[1] == 'PNG' || img[1] == 'png' || img[1] == 'jpg' || img[1] == 'JPG' || img[1] == 'JPEG' || img[1] == 'jpeg') {
                var reader = new FileReader();
                reader.onload = function (event) {
                    _this.profilePic = event.target.result;
                };
                reader.readAsDataURL(event.target.files[0]);
            }
            else
                this.dataService.errorToastr('Please select a valid image file. Images with type png, jpg and jpeg are allowed only.');
        }
    };
    //----------------------------------------- CHANGE IMAGE FUNCTIONALITY ENDS -----------------------------------------//
    EditProfileComponent.prototype.verify = function () {
        var _this = this;
        if (navigator.onLine) {
            this.dataService.spinnerShow();
            var data = {
                "adminId": JSON.parse(localStorage.getItem('remittance')).id,
                "otp": this.otp,
                "email": this.editProfile.value.email
            };
            this.dataService.post('admin/verifyOtpAdmin', { adminId: JSON.parse(localStorage.getItem('remittance')).id }, 1).subscribe(function (response) {
                _this.dataService.spinnerHide();
                if (response['response_code'] == 200) {
                    $('#otp').modal('hide');
                    _this.dataService.successToastr(response.response_message);
                }
                else if (response.response_code == 403 || response.response_code == 409 || response.response_code == 401) {
                    _this.dataService.errorToastr(response.response_message);
                    _this.dataService.logOut();
                }
                else {
                    _this.dataService.errorToastr(response["response_message"]);
                }
            }, function (err) {
                _this.dataService.spinnerHide();
                _this.dataService.errorToastr('Something went wrong');
            });
        }
        else
            this.dataService.errorToastr('Your internet connection seems to be lost');
    };
    EditProfileComponent.prototype.updateProfile = function () {
        var _this = this;
        if (navigator.onLine) {
            this.dataService.spinnerShow();
            var data = {
                "adminId": JSON.parse(localStorage.getItem('remittance')).id,
                "lastName": this.editProfile.value.lastName,
                "firstName": this.editProfile.value.firstName
            };
            this.dataService.post('admin/updateAdmin', { adminId: JSON.parse(localStorage.getItem('remittance')).id }, 1).subscribe(function (response) {
                _this.dataService.spinnerHide();
                if (response['response_code'] == 200) {
                    _this.getProfile();
                }
                else if (response['response_code'] == 201) {
                    $('#otp').modal('show');
                }
                else if (response.response_code == 403 || response.response_code == 409 || response.response_code == 401) {
                    _this.dataService.errorToastr(response.response_message);
                    _this.dataService.logOut();
                }
                else {
                    _this.dataService.errorToastr(response["response_message"]);
                }
            }, function (err) {
                _this.dataService.spinnerHide();
                _this.dataService.errorToastr('Something went wrong');
            });
        }
        else
            this.dataService.errorToastr('Your internet connection seems to be lost');
    };
    EditProfileComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-edit-profile',
            template: __webpack_require__("./src/app/components/edit-profile/edit-profile.component.html"),
            styles: [__webpack_require__("./src/app/components/edit-profile/edit-profile.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */]])
    ], EditProfileComponent);
    return EditProfileComponent;
}());



/***/ }),

/***/ "./src/app/components/forgot-password/forgot-password.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/forgot-password/forgot-password.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"page-wrapper\">\n        <div class=\"page-content--bge5\">\n            <div class=\"container\">\n                <div class=\"login-wrap\">\n                    <div class=\"login-content\">\n                        <div class=\"login-logo\">\n                            <a>\n                                <img src=\"assets/images/icon/logo.png\" alt=\"CoolAdmin\">\n                            </a>\n                        </div>\n                        <div class=\"login-form\">\n                          <p text-center>Enter your registered email id here and an OTP will be sent to the email id.</p>\n                          <br>\n                            <form [formGroup]=\"forgotPasswordForm\">\n                                <div class=\"form-group\">\n                                    <label>Email Address<span class=\"error-msg\" *ngIf=\"forgotPasswordForm.get('email').hasError('required')\" >*</span></label>\n                                    <input class=\"au-input au-input--full\" formControlName=\"email\" type=\"email\" name=\"email\" placeholder=\"Email\">\n                                    <span class=\"error-msg\" *ngIf=\"forgotPasswordForm.get('email').hasError('pattern')\" >Please enter valid email (e.g. johnDoe@example.com).</span>\n                                </div>\n                                <button class=\"au-btn au-btn--block au-btn--green m-b-20\" [disabled]=\"!forgotPasswordForm.valid\" type=\"submit\" (click)=\"submit()\">submit</button>\n                            </form>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n      <div class=\"modal fade\" id=\"otpModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"otpModalLabel\" aria-hidden=\"true\"\n\t\t\t data-backdrop=\"static\">\n\t\t\t\t<div class=\"modal-dialog modal-sm\" role=\"document\">\n\t\t\t\t\t<div class=\"modal-content\">\n\t\t\t\t\t\t<div class=\"modal-header\">\n\t\t\t\t\t\t\t<h5 class=\"modal-title\" id=\"otpModalLabel\">Verify OTP</h5>\n\t\t\t\t\t\t\t<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n\t\t\t\t\t\t\t\t<span aria-hidden=\"true\">&times;</span>\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"modal-body\">\n\t\t\t\t\t\t\t<p style=\"text-align: center;\">\n\t\t\t\t\t\t\t\tAn OTP has been sent to your email address. Please enter that OTP to continue.\n                            </p>\n                            <form [formGroup]=\"forgotPasswordForm\">\n                                <div class=\"form-group\">\n                                    <input class=\"au-input au-input--full\" [(ngModel)]=\"otp\" [ngModelOptions]=\"{standalone: true}\" type=\"text\" name=\"otp\" placeholder=\"OTP\" title=\"otp\" maxlength=\"4\">\n                                    <span class=\"error-msg\" *ngIf=\"forgotPasswordForm.get('email').hasError('pattern')\" >Please enter valid email (e.g. johnDoe@example.com).</span>\n                                </div>\n                            </form>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"modal-footer\">\n\t\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Cancel</button>\n\t\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"verifyOTP()\">Confirm</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>"

/***/ }),

/***/ "./src/app/components/forgot-password/forgot-password.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotPasswordComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_data_service__ = __webpack_require__("./src/app/services/data.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ForgotPasswordComponent = /** @class */ (function () {
    function ForgotPasswordComponent(route, dataService) {
        this.route = route;
        this.dataService = dataService;
        this.arrayg = [1, 2, 3, 4, 5, 6];
    }
    ForgotPasswordComponent.prototype.ngOnInit = function () {
        this.forgotPasswordForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormGroup */]({
            email: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)
            ]))
        });
    };
    ForgotPasswordComponent.prototype.submit = function () {
        var _this = this;
        this.dataService.spinnerShow();
        var data = {
            "email": this.forgotPasswordForm.value.email
        };
        this.dataService.post("admin/forgotPasswordAdmin", data, 0)
            .subscribe(function (res) {
            _this.dataService.spinnerHide();
            console.log("response", res);
            if (res.response_code == 201 || res.response_code == 200) {
                _this.otp = '';
                $('#otpModal').modal('show');
                _this.forgotPasswordForm.reset();
                _this.userid = res.result[0];
            }
            else
                _this.dataService.errorToastr(res.response_message);
        }, function (err) {
            _this.dataService.spinnerHide();
            _this.dataService.errorToastr("Please try again later.");
        });
    };
    ForgotPasswordComponent.prototype.verifyOTP = function () {
        var _this = this;
        this.dataService.spinnerShow();
        var data = {
            "userId": this.userid,
            "otp": this.otp
        };
        this.dataService.post("admin/verifyOtp", data, 0)
            .subscribe(function (res) {
            _this.dataService.spinnerHide();
            if (res.response_code == 200) {
                _this.dataService.successToastr(res.response_message);
                $('#otpModal').modal('hide');
                _this.route.navigate(['/reset-password/' + _this.userid]);
            }
            else
                _this.dataService.errorToastr(res.response_message);
        }, function (err) {
            _this.dataService.spinnerHide();
            _this.dataService.errorToastr("Please try again later.");
        });
    };
    ForgotPasswordComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-forgot-password',
            template: __webpack_require__("./src/app/components/forgot-password/forgot-password.component.html"),
            styles: [__webpack_require__("./src/app/components/forgot-password/forgot-password.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */], __WEBPACK_IMPORTED_MODULE_3__services_data_service__["a" /* DataService */]])
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
}());



/***/ }),

/***/ "./src/app/components/login/login.component.css":
/***/ (function(module, exports) {

module.exports = ".diabled-btn{\n    background-color: white;\n    cursor: not-allowed\n}"

/***/ }),

/***/ "./src/app/components/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"page-wrapper\">\n    <div class=\"page-content--bge5\">\n        <div class=\"container\">\n            <div class=\"login-wrap\">\n                <div class=\"login-content\">\n                    <div class=\"login-logo\">\n                        <!-- <a> -->\n                        <img src=\"assets/images/icon/logo.png\" alt=\"CoolAdmin\">\n                        <!-- </a> -->\n                    </div>\n                    <div class=\"login-form\">\n\n                        <form [formGroup]=\"adminLoginForm\">\n                            <div class=\"form-group\">\n\n                                <label>Email Address<span class=\"error-msg\"\n                                        *ngIf=\"adminLoginForm.get('email').hasError('required')\">*</span></label>\n\n                                <input formControlName=\"email\" (keydown)=\"onKeydown($event)\" maxlength=\"64\"\n                                    class=\"au-input au-input--full\" type=\"email\" name=\"email\" placeholder=\"Email\">\n                                <span class=\"error-msg\" *ngIf=\"errorMsg\">{{errorMsg}}</span>\n                            </div>\n\n\n                            <div class=\"form-group\">\n                                <label>Password<span class=\"error-msg\"\n                                        *ngIf=\"adminLoginForm.get('password').hasError('required')\">*</span></label>\n                                <input class=\"au-input au-input--full\" (keydown)=\"onKeydown($event)\" maxlength=\"16\"\n                                    formControlName=\"password\" type=\"password\" name=\"password\" placeholder=\"Password\">\n                                <!-- <span class=\"error-msg\" *ngIf=\"adminLoginForm.get('password').hasError('minlength')\" >Weak password. Password length should be 8-16 in range.</span> -->\n                            </div>\n\n\n                            <div class=\"login-checkbox\">\n                                <label>\n                                    <input type=\"checkbox\" formControlName=\"rememberMe\" name=\"remember\">Remember Me\n                                </label>\n                                <label>\n                                    <a [routerLink]=\"['/forgot-password']\">Forgot Password?</a>\n                                </label>\n                            </div>\n\n                            \n                            <button class=\"au-btn au-btn--block au-btn--green m-b-20\" type=\"submit\" (click)=\"openModal()\"\n                                [disabled]='!adminLoginForm.valid'>sign in</button>\n                        </form>\n                        <app-spinner></app-spinner>\n                        <!-- <div class=\"register-link\">\n                                <p>\n                                    Don't you have account?\n                                    <a>Sign Up Here</a>\n                                </p>\n                            </div> -->\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<footer>\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <div class=\"copyright\">\n                <p>Copyright © 2019 Remittance - A digital Wallet. All rights reserved.</p>\n            </div>\n        </div>\n    </div>\n</footer>\n<!-- otp modal -->\n<div class=\"modal fade\" id=\"otpModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"otpModalLabel\"\n    aria-hidden=\"true\" data-backdrop=\"static\">\n    <div class=\"modal-dialog modal-sm\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h5 class=\"modal-title\" id=\"otpModalLabel\">2 Factor Authentication</h5>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                    <span aria-hidden=\"true\">&times;</span>\n                </button>\n            </div>\n            <div class=\"modal-body\">\n                <p>\n                    Enter the otp to accept the request\n                </p>\n                <input class=\"au-input\" type=\"text\" name=\"otp\" [(ngModel)]=\"otp\" id=\"otp\" placeholder=\"OTP\"\n                    maxlength=\"4\"/>\n\n            </div>\n            <span class=\"error-msg\" *ngIf=\"errormessage\" style=\"    padding-left: 3rem;\">{{errormessage}}</span>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Cancel</button>\n                <button type=\"button\" (click)=\"signIn()\" class=\"btn btn-seagreen\">Confirm</button>\n            </div>\n        </div>\n    </div>\n</div>\n<!-- end otp modal -->"

/***/ }),

/***/ "./src/app/components/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_data_service__ = __webpack_require__("./src/app/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng6_toastr_notifications__ = __webpack_require__("./node_modules/ng6-toastr-notifications/fesm5/ng6-toastr-notifications.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginComponent = /** @class */ (function () {
    function LoginComponent(route, dataService, toaster) {
        this.route = route;
        this.dataService = dataService;
        this.toaster = toaster;
        this.errorMsg = "";
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.adminLoginForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormGroup */]({
            email: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required,
            ])),
            password: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required])),
            rememberMe: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]()
        });
        if (localStorage.getItem("rememberMe")) {
            var admin = JSON.parse(localStorage.getItem('rememberMe'));
            this.adminLoginForm.patchValue({
                email: this.dataService.decryptData(admin.email),
                password: this.dataService.decryptData(admin.password)
            });
        }
    };
    LoginComponent.prototype.onKeydown = function (event) {
        // console.log(event);
        if (event.keyCode == 32) {
            return false;
        }
    };
    LoginComponent.prototype.openModal = function () {
        var _this = this;
        if (this.adminLoginForm.valid) {
            if (!this.adminLoginForm.value.email.match(this.dataService.emailRegex)) {
                this.errorMsg = "Please enter valid email (e.g. johndoe@example.com)";
                // console.log(this.adminLoginForm)
                this.adminLoginForm.get('email').reset();
            }
            else {
                if (navigator.onLine) {
                    this.dataService.spinnerShow();
                    this.dataService.post("admin/adminLogin", {
                        "userType": "ADMIN", "email": this.adminLoginForm.value.email, "password": this.adminLoginForm.value.password
                    }, 0)
                        .subscribe(function (res) {
                        _this.dataService.spinnerHide();
                        if (res.response_code == 200) {
                            _this.userId = res.result.adminId;
                            $('#otpModal').modal('show');
                        }
                        else {
                            _this.toaster.dismissAllToastr();
                            _this.toaster.errorToastr(res.response_message);
                        }
                    }, function (err) {
                        _this.dataService.spinnerHide();
                        _this.toaster.dismissAllToastr();
                        _this.toaster.errorToastr("Please try again later.", "Unable to sign you in.", {
                            toastTimeout: 3000
                        });
                        // console.log("error",err)
                    });
                }
                else {
                    this.toaster.errorToastr("Your internet connection seems to be lost!");
                }
            }
        }
        else {
            this.toaster.dismissAllToastr();
            this.toaster.errorToastr("Please your valid credentials.");
        }
    };
    LoginComponent.prototype.signIn = function () {
        var _this = this;
        var reg = new RegExp(/^\d+$/);
        if (reg.test(this.otp)) {
            if (!this.adminLoginForm.value.email.match(this.dataService.emailRegex)) {
                this.errorMsg = "Please enter valid email (e.g. johndoe@example.com)";
                // console.log(this.adminLoginForm)
                this.adminLoginForm.get('email').reset();
            }
            else {
                if (navigator.onLine) {
                    this.dataService.spinnerShow();
                    this.dataService.post("admin/adminVerifyOtp", {
                        "adminId": this.userId, "otp": this.otp
                    }, 0)
                        .subscribe(function (res) {
                        _this.dataService.spinnerHide();
                        if (res.response_code == 200) {
                            $('#otpModal').modal('hide');
                            if (_this.adminLoginForm.value.rememberMe) {
                                localStorage.setItem("rememberMe", JSON.stringify({
                                    email: _this.dataService.encryptData(_this.adminLoginForm.value.email),
                                    password: _this.dataService.encryptData(_this.adminLoginForm.value.password)
                                }));
                            }
                            else {
                                localStorage.removeItem("rememberMe");
                            }
                            localStorage.setItem("remittance", JSON.stringify({
                                id: res.result._id,
                                token: res.result.token,
                                username: _this.dataService.encryptData(res.result.userName)
                            }));
                            _this.route.navigate(['/dashboard']);
                            _this.toaster.dismissAllToastr();
                            _this.toaster.successToastr(res.response_message);
                        }
                        else {
                            _this.toaster.dismissAllToastr();
                            _this.toaster.errorToastr(res.response_message);
                        }
                    }, function (err) {
                        _this.dataService.spinnerHide();
                        _this.toaster.dismissAllToastr();
                        _this.toaster.errorToastr("Please try again later.", "Unable to sign you in.");
                        // console.log("error",err)
                    });
                }
                else {
                    this.toaster.errorToastr("Your internet connection seems to be lost!");
                }
            }
        }
        else {
            this.toaster.dismissAllToastr();
            this.toaster.errorToastr("Please enter valid otp");
        }
    };
    LoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
            selector: 'app-login',
            template: __webpack_require__("./src/app/components/login/login.component.html"),
            styles: [__webpack_require__("./src/app/components/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */], __WEBPACK_IMPORTED_MODULE_0__services_data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_4_ng6_toastr_notifications__["a" /* ToastrManager */]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/components/page-not-found/page-not-found.component.css":
/***/ (function(module, exports) {

module.exports = "*\n{\n  font-family: 'PT Sans Caption', sans-serif, 'arial', 'Times New Roman';\n}\n/* Error Page */\n.error .clip .shadow\n    {\n        height: 180px;  /*Contrall*/\n    }\n.error .clip:nth-of-type(2) .shadow\n    {\n        width: 130px;   /*Contrall play with javascript*/\n    }\n.error .clip:nth-of-type(1) .shadow, .error .clip:nth-of-type(3) .shadow\n    {\n        width: 250px; /*Contrall*/\n    }\n.error .digit\n    {\n        width: 150px;   /*Contrall*/\n        height: 150px;  /*Contrall*/\n        line-height: 150px; /*Contrall*/\n        font-size: 120px;\n        font-weight: bold;\n    }\n.error h2   /*Contrall*/\n    {\n        font-size: 32px;\n    }\n.error .msg /*Contrall*/\n    {\n        top: -190px;\n        left: 30%;\n        width: 80px;\n        height: 80px;\n        line-height: 80px;\n        font-size: 32px;\n    }\n.error span.triangle    /*Contrall*/\n    {\n        top: 70%;\n        right: 0%;\n        border-left: 20px solid #535353;\n        border-top: 15px solid transparent;\n        border-bottom: 15px solid transparent;\n    }\n.error .container-error-404\n    {\n      margin-top: 10%;\n        position: relative;\n        height: 250px;\n        padding-top: 40px;\n    }\n.error .container-error-404 .clip\n    {\n        display: inline-block;\n        -webkit-transform: skew(-45deg);\n                transform: skew(-45deg);\n    }\n.error .clip .shadow\n    {\n\n        overflow: hidden;\n    }\n.error .clip:nth-of-type(2) .shadow\n    {\n        overflow: hidden;\n        position: relative;\n        -webkit-box-shadow: inset 20px 0px 20px -15px rgba(150, 150, 150,0.8), 20px 0px 20px -15px rgba(150, 150, 150,0.8);\n                box-shadow: inset 20px 0px 20px -15px rgba(150, 150, 150,0.8), 20px 0px 20px -15px rgba(150, 150, 150,0.8);\n    }\n.error .clip:nth-of-type(3) .shadow:after, .error .clip:nth-of-type(1) .shadow:after\n    {\n        content: \"\";\n        position: absolute;\n        right: -8px;\n        bottom: 0px;\n        z-index: 9999;\n        height: 100%;\n        width: 10px;\n        background: -webkit-gradient(linear, left top, right top, from(transparent), color-stop(rgba(173,173,173, 0.8)), to(transparent));\n        background: linear-gradient(90deg, transparent, rgba(173,173,173, 0.8), transparent);\n        border-radius: 50%;\n    }\n.error .clip:nth-of-type(3) .shadow:after\n    {\n        left: -8px;\n    }\n.error .digit\n    {\n        position: relative;\n        top: 8%;\n        color: white;\n        background: #4272d7;\n        border-radius: 50%;\n        display: inline-block;\n        -webkit-transform: skew(45deg);\n                transform: skew(45deg);\n    }\n.error .clip:nth-of-type(2) .digit\n    {\n        left: -10%;\n    }\n.error .clip:nth-of-type(1) .digit\n    {\n        right: -20%;\n    }\n.error .clip:nth-of-type(3) .digit\n    {\n        left: -20%;\n    }\n.error h2\n    {\n        color: #A2A2A2;\n        font-weight: bold;\n        padding-bottom: 20px;\n    }\n.error .msg\n    {\n        position: relative;\n        z-index: 9999;\n        display: block;\n        background: #535353;\n        color: #A2A2A2;\n        border-radius: 50%;\n        font-style: italic;\n    }\n.error .triangle\n    {\n        position: absolute;\n        z-index: 999;\n        -webkit-transform: rotate(45deg);\n                transform: rotate(45deg);\n        content: \"\";\n        width: 0;\n        height: 0;\n    }\n/* Error Page */\n@media(max-width: 767px)\n{\n    /* Error Page */\n            .error .clip .shadow\n            {\n                height: 100px;  /*Contrall*/\n            }\n            .error .clip:nth-of-type(2) .shadow\n            {\n                width: 80px;   /*Contrall play with javascript*/\n            }\n            .error .clip:nth-of-type(1) .shadow, .error .clip:nth-of-type(3) .shadow\n            {\n                width: 100px; /*Contrall*/\n            }\n            .error .digit\n            {\n                width: 80px;   /*Contrall*/\n                height: 80px;  /*Contrall*/\n                line-height: 80px; /*Contrall*/\n                font-size: 52px;\n            }\n            .error h2   /*Contrall*/\n            {\n                font-size: 24px;\n            }\n            .error .msg /*Contrall*/\n            {\n                top: -110px;\n                left: 15%;\n                width: 40px;\n                height: 40px;\n                line-height: 40px;\n                font-size: 18px;\n            }\n            .error span.triangle    /*Contrall*/\n            {\n                top: 70%;\n                right: -3%;\n                border-left: 10px solid #535353;\n                border-top: 8px solid transparent;\n                border-bottom: 8px solid transparent;\n            }\n.error .container-error-404\n  {\n    height: 150px;\n  }\n        /* Error Page */\n}\n/*--------------------------------------------Framework --------------------------------*/\n.overlay { position: relative; z-index: 20; }\n/*done*/\n.ground-color { background: white; }\n/*done*/\n.item-bg-color { background: #EAEAEA }\n/*done*/\n/* Padding Section*/\n.padding-top { padding-top: 10px; }\n/*done*/\n.padding-bottom { padding-bottom: 10px; }\n/*done*/\n.padding-vertical { padding-top: 10px; padding-bottom: 10px; }\n.padding-horizontal { padding-left: 10px; padding-right: 10px; }\n.padding-all { padding: 10px; }\n/*done*/\n.no-padding-left { padding-left: 0px; }\n/*done*/\n.no-padding-right { padding-right: 0px; }\n/*done*/\n.no-vertical-padding { padding-top: 0px; padding-bottom: 0px; }\n.no-horizontal-padding { padding-left: 0px; padding-right: 0px; }\n.no-padding { padding: 0px; }\n/*done*/\n/* Padding Section*/\n/* Margin section */\n.margin-top { margin-top: 10px; }\n/*done*/\n.margin-bottom { margin-bottom: 10px; }\n/*done*/\n.margin-right { margin-right: 10px; }\n/*done*/\n.margin-left { margin-left: 10px; }\n/*done*/\n.margin-horizontal { margin-left: 10px; margin-right: 10px; }\n/*done*/\n.margin-vertical { margin-top: 10px; margin-bottom: 10px; }\n/*done*/\n.margin-all { margin: 10px; }\n/*done*/\n.no-margin { margin: 0px; }\n/*done*/\n.no-vertical-margin { margin-top: 0px; margin-bottom: 0px; }\n.no-horizontal-margin { margin-left: 0px; margin-right: 0px; }\n.inside-col-shrink { margin: 0px 20px; }\n/*done - For the inside sections that has also Title section*/\n/* Margin section */\nhr\n    { margin: 0px; padding: 0px; border-top: 1px dashed #999; }\n/*--------------------------------------------FrameWork------------------------*/\n"

/***/ }),

/***/ "./src/app/components/page-not-found/page-not-found.component.html":
/***/ (function(module, exports) {

module.exports = "<link href='https://fonts.googleapis.com/css?family=Anton|Passion+One|PT+Sans+Caption' rel='stylesheet' type='text/css'>\n<body>\n\n        <!-- Error Page -->\n            <div class=\"error\">\n                <div class=\"container-floud\">\n                    <div class=\"col-xs-12 ground-color text-center\">\n                        <div class=\"container-error-404\">\n                            <div class=\"clip\"><div class=\"shadow\"><span class=\"digit thirdDigit\">{{digit?.one}}</span></div></div>\n                            <div class=\"clip\"><div class=\"shadow\"><span class=\"digit secondDigit\">{{digit?.two}}</span></div></div>\n                            <div class=\"clip\"><div class=\"shadow\"><span class=\"digit firstDigit\">{{digit?.three}}</span></div></div>\n                            <div class=\"msg\">OH!<span class=\"triangle\"></span></div>\n                        </div>\n                        <h2 class=\"h1\">Sorry! Page not found</h2>\n                    </div>\n                </div>\n            </div>\n        <!-- Error Page -->\n</body>\n"

/***/ }),

/***/ "./src/app/components/page-not-found/page-not-found.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageNotFoundComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageNotFoundComponent = /** @class */ (function () {
    function PageNotFoundComponent() {
        var _this = this;
        this.time = 30;
        this.i = 0;
        this.digit = {
            one: 1,
            two: 2,
            three: 3
        };
        this.loop3 = setInterval(function () {
            if (_this.i > 5) {
                clearInterval(_this.loop3);
                _this.digit.one = 4;
            }
            else {
                _this.digit.one = _this.randomNum();
                _this.i++;
            }
        }, this.time);
        this.loop2 = setInterval(function () {
            if (_this.i > 80) {
                clearInterval(_this.loop2);
                _this.digit.two = 0;
            }
            else {
                _this.digit.two = _this.randomNum();
                _this.i++;
            }
        }, this.time);
        this.loop1 = setInterval(function () {
            if (_this.i > 100) {
                clearInterval(_this.loop1);
                _this.digit.three = 4;
            }
            else {
                _this.digit.three = _this.randomNum();
                _this.i++;
            }
        }, this.time);
    }
    PageNotFoundComponent.prototype.randomNum = function () {
        "use strict";
        return Math.floor(Math.random() * 9) + 1;
    };
    PageNotFoundComponent.prototype.ngOnInit = function () {
    };
    PageNotFoundComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-page-not-found',
            template: __webpack_require__("./src/app/components/page-not-found/page-not-found.component.html"),
            styles: [__webpack_require__("./src/app/components/page-not-found/page-not-found.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], PageNotFoundComponent);
    return PageNotFoundComponent;
}());



/***/ }),

/***/ "./src/app/components/reset-password/reset-password.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/reset-password/reset-password.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"page-wrapper\">\n  <div class=\"page-content--bge5\">\n    <div class=\"container\">\n      <div class=\"login-wrap\">\n        <div class=\"login-content\">\n          <div class=\"login-logo\">\n            <a>\n              <img src=\"assets/images/icon/logo.png\" alt=\"CoolAdmin\">\n            </a>\n          </div>\n          <div class=\"login-form\">\n            <form [formGroup]=\"resetPasswordForm\">\n              <div class=\"form-group\">\n                <label>Enter new password<span class=\"error-msg\" *ngIf=\"resetPasswordForm.get('password').hasError('required')\" >*</span></label>\n                <input class=\"au-input au-input--full\" formControlName=\"password\" maxlength=\"16\" type=\"password\" name=\"email\" placeholder=\"New Password\">\n                <span class=\"error-msg\" *ngIf=\"resetPasswordForm.get('password').hasError('minlength')\" >Weak password. Password should be 8-16 in length.</span>\n              </div>\n              <div class=\"form-group\">\n                <label>Confirm password<span class=\"error-msg\" *ngIf=\"resetPasswordForm.get('confirmPassword').hasError('required')\" >*</span></label>\n                <input class=\"au-input au-input--full\" formControlName=\"confirmPassword\" maxlength=\"{{resetPasswordForm.value.password.length}}\" type=\"password\" name=\"email\" placeholder=\"Confirm Password\">\n                <span class=\"error-msg\" *ngIf=\"resetPasswordForm.get('password').value != resetPasswordForm.get('confirmPassword').value && resetPasswordForm.get('confirmPassword').dirty\" >Password do not match.</span>\n              </div>\n              <button class=\"au-btn au-btn--block au-btn--green m-b-20\" [disabled]=\"!resetPasswordForm.valid && (resetPasswordForm.get('password').value != resetPasswordForm.get('confirmPassword').value)\" type=\"submit\" (click)=\"submit()\">submit</button>\n            </form>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/components/reset-password/reset-password.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPasswordComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_data_service__ = __webpack_require__("./src/app/services/data.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent(route, dataService, activatedRoute) {
        this.route = route;
        this.dataService = dataService;
        this.activatedRoute = activatedRoute;
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.resetPasswordForm = new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["b" /* FormGroup */]({
            password: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].minLength(8), __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].maxLength(16)])),
            confirmPassword: new __WEBPACK_IMPORTED_MODULE_0__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].required)
        });
        this.activatedRoute.params.subscribe(function (userid) {
            return _this.userid = userid.userid;
        });
    };
    ResetPasswordComponent.prototype.submit = function () {
        var _this = this;
        this.dataService.spinnerShow();
        var data = {
            "userId": this.userid,
            "password": this.resetPasswordForm.value.password
        };
        this.dataService.post("admin/resetPasswordAdmin", data, 0)
            .subscribe(function (res) {
            _this.dataService.spinnerHide();
            if (res.response_code == 200) {
                _this.dataService.successToastr(res.response_message);
                _this.route.navigate(['/login']);
            }
            else
                _this.dataService.errorToastr(res.response_message);
        }, function (err) {
            _this.dataService.spinnerHide();
            _this.dataService.errorToastr("Please try again later.");
        });
    };
    ResetPasswordComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'app-reset-password',
            template: __webpack_require__("./src/app/components/reset-password/reset-password.component.html"),
            styles: [__webpack_require__("./src/app/components/reset-password/reset-password.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */], __WEBPACK_IMPORTED_MODULE_3__services_data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());



/***/ }),

/***/ "./src/app/components/settings/settings.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/settings/settings.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"page-wrapper\">\n  <!-- HEADER MOBILE-->\n  <app-sidebar></app-sidebar>\n  <!-- PAGE CONTAINER-->\n  <div class=\"page-container\">\n    <!-- HEADER DESKTOP-->\n    <header class=\"header-desktop\">\n      <div class=\"section__content section__content--p30\">\n        <div class=\"container-fluid\">\n        </div>\n      </div>\n      <nav class=\"navbar-sidebar\" style=\"display:none\">\n        <div class=\"nav\" id=\"nav-tab\" role=\"tablist\">\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'dashboard')}\"\n            [routerLink]=\"('/dashboard')\">Dashboard</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'user-management')}\"\n            [routerLink]=\"('/user-management')\">User Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'vendor-management')}\"\n            [routerLink]=\"('/vendor-management')\">Vendor Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'transaction-management')}\"\n            [routerLink]=\"('/transaction-management')\">Transaction Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'branch-management')}\"\n            [routerLink]=\"('/branch-management')\">Branch Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'settings')}\"\n            [routerLink]=\"('/settings')\">Settings</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'edit-profile')}\"\n            [routerLink]=\"('/edit-profile')\">Edit Profile</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'view-faqs')}\"\n            [routerLink]=\"('/view-faqs')\">FAQ</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'terms-conditions')}\"\n            [routerLink]=\"('/terms-conditions')\">Terms and Conditions</a>\n          <a class=\"nav-item nav-link\" data-toggle=\"modal\" style=\"cursor: pointer; color: #007bff\"\n            data-target=\"#logoutModal\">Logout</a>\n        </div>\n      </nav>\n    </header>\n    <!-- HEADER DESKTOP-->\n\n    <!-- MAIN CONTENT-->\n    <div class=\"main-content\">\n      <div class=\"section__content section__content--p30\">\n        <div class=\"container-fluid\">\n          <div class=\"row\">\n            <div class=\"col-lg-12\">\n              <div class=\"card\">\n                <div class=\"card-header\">\n                  <h4>Settings</h4>\n                </div>\n                <div class=\"card-body\">\n                  <div class=\"default-tab\">\n                    <nav>\n                      <div class=\"nav nav-tabs\" id=\"nav-tab\" role=\"tablist\">\n                        <!-- <a class=\"nav-item nav-link active\" id=\"nav-change-email-tab\" data-toggle=\"tab\" href=\"#nav-change-email\" role=\"tab\" aria-controls=\"nav-change-email\"\n                          aria-selected=\"true\" (click)=\"update('email')\">Change email id</a> -->\n                        <a class=\"nav-item nav-link\" id=\"nav-change-password-tab\" data-toggle=\"tab\"\n                          href=\"#nav-change-password\" role=\"tab\" aria-controls=\"nav-change-password\"\n                          aria-selected=\"false\">Change password</a>\n                        <a class=\"nav-item nav-link\" id=\"nav-set-transaction-password-tab\" data-toggle=\"tab\"\n                          href=\"#nav-transaction-password\" role=\"tab\" aria-controls=\"nav-transaction-password\"\n                          aria-selected=\"false\" (click)=\"update('fees')\">Set Transaction Interest</a>\n                      </div>\n                    </nav>\n                    <div class=\"tab-content pl-3 pt-2\" id=\"nav-tabContent\">\n                      <div class=\"tab-pane fade\" id=\"nav-change-email\" role=\"tabpanel\"\n                        aria-labelledby=\"nav-change-email-tab\">\n                        <div class=\"card-body card-block\">\n                          <form [formGroup]=\"changeEmail\">\n                            <div class=\"form-group\">\n                              <div class=\"input-group\">\n                                <div class=\"input-group-addon\">\n                                  <i class=\"fa fa-envelope\"></i>\n                                </div>\n                                <input type=\"email\" formControlName=\"email\" id=\"email\" name=\"email\" placeholder=\"Email\"\n                                  class=\"form-control\">\n                              </div>\n                              <span class=\"error-msg\" *ngIf=\"changeEmail.get('email').hasError('pattern')\">Please enter\n                                a valid email (e.g. johnDoe@ewxample.com).</span>\n                            </div>\n                            <div class=\"form-actions form-group\">\n                              <button type=\"submit\" [disabled]=\"!changeEmail.valid\" (click)=\"changeEmailAdmin()\"\n                                class=\"btn btn-primary btn-sm\">Submit</button>\n                            </div>\n                          </form>\n                        </div>\n                      </div>\n                      <div class=\"tab-pane fade show active\" id=\"nav-change-password\" role=\"tabpanel\"\n                        aria-labelledby=\"nav-change-password-tab\">\n                        <div class=\"card-body card-block\">\n                          <form [formGroup]=\"changePassword\">\n                            <div class=\"form-group\">\n                              <div class=\"input-group\">\n                                <div class=\"input-group-addon\">\n                                  <i class=\"fa fa-unlock\"></i>\n                                </div>\n                                <input type=\"password\" formControlName=\"oldPassword\" maxlength=\"16\"\n                                  placeholder=\"Old Password\" class=\"form-control\">\n                              </div>\n                            </div>\n                            <div class=\"form-group\">\n                              <div class=\"input-group\">\n                                <div class=\"input-group-addon\">\n                                  <i class=\"fa fa-lock\"></i>\n                                </div>\n                                <input type=\"password\" formControlName=\"newPassword\" maxlength=\"16\"\n                                  placeholder=\"New Password\" class=\"form-control\">\n                              </div>\n                              <span class=\"error-msg\"\n                                *ngIf=\"changePassword.get('newPassword').hasError('minlength') || changePassword.get('newPassword').hasError('maxlength')\">Password\n                                must be 8-16 in length.</span>\n                            </div>\n                            <div class=\"form-group\">\n                              <div class=\"input-group\">\n                                <div class=\"input-group-addon\">\n                                  <i class=\"fa fa-lock\"></i>\n                                </div>\n                                <input type=\"password\" placeholder=\"Confirm Password\" maxlength=\"16\"\n                                  formControlName=\"confirmPassword\" class=\"form-control\">\n                              </div>\n                              <span class=\"error-msg\" *ngIf=\"changePassword.get('confirmPassword').value != changePassword.get('newPassword').value\n                               && changePassword.get('confirmPassword').dirty\">Password do not match.</span>\n                            </div>\n                            <div class=\"form-actions form-group\">\n                              <button type=\"submit\"\n                                [disabled]=\"!changePassword.valid || changePassword.get('confirmPassword').value != changePassword.get('newPassword').value\"\n                                class=\"btn btn-primary btn-sm\" (click)=\"changePasswordFunction()\">Submit</button>\n                            </div>\n                          </form>\n                        </div>\n                      </div>\n\n\n\n\n                      \n                      <div class=\"tab-pane fade\" id=\"nav-transaction-password\" role=\"tabpanel\"\n                        aria-labelledby=\"nav-transaction-password-tab\">\n                        <div class=\"card-body card-block\">\n                          <form [formGroup]=\"setTransactionInterest\">\n                            <div class=\"form-group\">\n                              <label>Transaction Fee</label>\n                              <div class=\"input-group\">\n                                <div class=\"input-group-addon\">\n                                  <i class=\"fa fa-percent\"></i>\n                                </div>\n                                <input type=\"text\" id=\"transactionFee\" formControlName=\"transactionFee\"\n                                  placeholder=\"Transaction Fee\" class=\"form-control\" title=\"Transaction Fee\">\n                              </div>\n                              <span class=\"error-msg\" *ngIf=\"setTransactionInterest.get('transactionFee').hasError('required')\n                               && setTransactionInterest.get('transactionFee').dirty\">Enter Transaction Fee</span>\n                              <span class=\"error-msg\" *ngIf=\"setTransactionInterest.get('transactionFee').hasError('pattern')\n                               && setTransactionInterest.get('transactionFee').dirty\">Enter Valid Amount</span>\n                              <br />\n\n                              <label>Conversion Fee</label>\n                              <div class=\"input-group\">\n                                <div class=\"input-group-addon\">\n                                  <i class=\"fa fa-percent\"></i>\n                                </div>\n                                <input type=\"text\" id=\"conversionFee\" formControlName=\"conversionFee\"\n                                  placeholder=\"Conversion Fee\" class=\"form-control\" title=\"Conversion Fee\">\n                              </div>\n                              <span class=\"error-msg\" *ngIf=\"setTransactionInterest.get('conversionFee').hasError('required')\n                               && setTransactionInterest.get('conversionFee').dirty\">Enter Conversion Fee</span>\n                              <span class=\"error-msg\" *ngIf=\"setTransactionInterest.get('conversionFee').hasError('pattern')\n                               && setTransactionInterest.get('conversionFee').dirty\">Enter Valid Amount</span>\n                            </div>\n                            <div class=\"form-actions form-group\">\n                              <button type=\"submit\" [disabled]=\"!setTransactionInterest.valid\"\n                                (click)=\"setTransactionIntrst()\" class=\"btn btn-primary btn-sm\">Submit</button>\n                            </div>\n                          </form>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <!-- END MAIN CONTENT-->\n    <!-- END PAGE CONTAINER-->\n  </div>\n\n</div>\n<div class=\"modal fade\" id=\"otpModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"otpModalLabel\" aria-hidden=\"true\"\n  data-backdrop=\"static\">\n  <div class=\"modal-dialog modal-sm\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"otpModalLabel\">Verify OTP</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <p style=\"text-align: center;\">\n          An OTP has been sent to your email address. Please enter that OTP to continue.\n        </p>\n        <!-- <form [formGroup]=\"forgotPasswordForm\"> -->\n        <div class=\"form-group\">\n          <input class=\"au-input au-input--full\" [(ngModel)]=\"otp\" [ngModelOptions]=\"{standalone: true}\" type=\"text\"\n            name=\"otp\" placeholder=\"OTP\" title=\"otp\" maxlength=\"4\">\n          <!-- <span class=\"error-msg\" *ngIf=\"forgotPasswordForm.get('email').hasError('pattern')\" >Please enter valid email (e.g. johnDoe@example.com).</span> -->\n        </div>\n        <!-- </form> -->\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Cancel</button>\n        <button type=\"button\" class=\"btn btn-primary\">Confirm</button>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/components/settings/settings.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_data_service__ = __webpack_require__("./src/app/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(dataService, route) {
        var _this = this;
        this.dataService = dataService;
        this.route = route;
        this.route.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* NavigationEnd */]) {
                _this.currUrl = event.url.split('/')[1];
            }
        });
    }
    SettingsComponent.prototype.ngOnInit = function () {
        this.changeEmail = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormGroup */]({
            email: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern(this.dataService.emailRegex)
            ]))
        });
        this.changePassword = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormGroup */]({
            oldPassword: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]("", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required
            ])),
            newPassword: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]("", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(8),
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(16)
            ])),
            confirmPassword: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]("", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required)
        });
        this.setTransactionInterest = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormGroup */]({
            transactionFee: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]("", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern(/^(?=.*[1-9])\d+(\.\d{1,3})?$/)
            ])),
            conversionFee: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormControl */]("", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern(/^(?=.*[1-9])\d+(\.\d{1,50})?$/)
            ]))
        });
        this.getCurrentEmail();
        this.getCurrentFees();
    };
    SettingsComponent.prototype.update = function (param) {
        if (param == 'fees')
            this.getCurrentFees();
        else if (param == 'email')
            this.getCurrentEmail();
    };
    SettingsComponent.prototype.changeEmailAdmin = function () {
        var _this = this;
        this.dataService.spinnerShow();
        this.dataService.post("admin/changeEmailAdmin", {
            userId: JSON.parse(localStorage.getItem('remittance')).id,
            email: this.changeEmail.value.email
        }, 1).subscribe(function (res) {
            _this.dataService.spinnerHide();
            if (res.response_code == 201) {
                $('#otpModal').modal('show');
                // this.dataService.toaster.dismissAllToastr();
                // this.dataService.toaster.successToastr("OTP sent to your mentioned email.");
                // this.changeEmail.reset();
            }
            else {
                _this.dataService.toaster.dismissAllToastr();
                _this.dataService.errorToastr(res.response_message);
            }
        }, function (err) {
            _this.dataService.spinnerHide();
            _this.dataService.errorToastr('Something went wrong');
        });
    };
    SettingsComponent.prototype.getCurrentEmail = function () {
        var _this = this;
        this.dataService.spinnerShow();
        this.dataService.post("admin/viewEmail", {
            _id: JSON.parse(localStorage.getItem('remittance')).id,
        }, 1).subscribe(function (res) {
            _this.dataService.spinnerHide();
            if (res.response_code == 200) {
                _this.changeEmail.setValue({
                    email: res.email
                });
                // this.dataService.toaster.dismissAllToastr();
                // this.dataService.toaster.successToastr("OTP sent to your mentioned email.");
                // this.changeEmail.reset();
            }
            else {
                _this.dataService.toaster.dismissAllToastr();
                _this.dataService.errorToastr(res.response_message);
            }
        }, function (err) {
            _this.dataService.spinnerHide();
            _this.dataService.errorToastr('Something went wrong');
        });
    };
    SettingsComponent.prototype.getCurrentFees = function () {
        var _this = this;
        this.dataService.spinnerShow();
        this.dataService.post("admin/currentTransactionFee", {
            _id: JSON.parse(localStorage.getItem('remittance')).id,
        }, 1).subscribe(function (res) {
            _this.dataService.spinnerHide();
            if (res.response_code == 200) {
                _this.setTransactionInterest.setValue({
                    transactionFee: res.details.transactionFee,
                    conversionFee: res.details.conversionFee
                });
            }
            else {
                _this.dataService.toaster.dismissAllToastr();
                _this.dataService.errorToastr(res.response_message);
            }
        }, function (err) {
            _this.dataService.spinnerHide();
            _this.dataService.errorToastr('Something went wrong');
        });
    };
    SettingsComponent.prototype.changePasswordFunction = function () {
        var _this = this;
        this.dataService.spinnerShow();
        var data = {
            "userId": JSON.parse(localStorage.getItem('remittance')).id,
            "password": this.changePassword.value.oldPassword,
            "newPassword": this.changePassword.value.newPassword
        };
        this.dataService.post("admin/changePasswordAdmin", data, 1)
            .subscribe(function (res) {
            _this.dataService.spinnerHide();
            // console.log("response",res);
            if (res.response_code == 200) {
                _this.dataService.successToastr(res.response_message);
                _this.changePassword.reset();
            }
            else
                _this.dataService.errorToastr(res.response_message);
        }, function (err) {
            _this.dataService.spinnerHide();
            _this.dataService.errorToastr("Please try again later.");
        });
    };
    SettingsComponent.prototype.setTransactionIntrst = function () {
        var _this = this;
        this.dataService.post('admin/setTransactionInterest', {
            "userId": JSON.parse(localStorage.getItem('remittance')).id,
            "conversionFee": this.setTransactionInterest.value.conversionFee,
            "transactionFee": this.setTransactionInterest.value.transactionFee
        }, 1).subscribe(function (res) {
            if (res.response_code == 200) {
                _this.dataService.toaster.dismissAllToastr();
                _this.dataService.successToastr(res.response_message);
            }
            else {
                _this.dataService.toaster.dismissAllToastr();
                _this.dataService.errorToastr(res.response_message);
            }
        }, function (err) {
            console.log("Error", err);
        });
    };
    SettingsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
            selector: 'app-settings',
            template: __webpack_require__("./src/app/components/settings/settings.component.html"),
            styles: [__webpack_require__("./src/app/components/settings/settings.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__services_data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */]])
    ], SettingsComponent);
    return SettingsComponent;
}());



/***/ }),

/***/ "./src/app/components/sidebar/sidebar.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/sidebar/sidebar.component.html":
/***/ (function(module, exports) {

module.exports = "<header class=\"header-mobile d-block d-lg-none\">\n  <div class=\"header-mobile__bar\">\n    <div class=\"container-fluid\">\n      <div class=\"header-mobile-inner\">\n        <a class=\"logo\">\n          <img src=\"assets/images/icon/logo.png\" alt=\"CoolAdmin\" />\n        </a>\n        <button class=\"hamburger hamburger--slider js-sidebar-btn\" type=\"button\" data-toggle=\"sidebar-show\">\n          <span class=\"hamburger-box\">\n            <span class=\"hamburger-inner\"></span>\n          </span>\n        </button>\n      </div>\n    </div>\n  </div>\n</header>\n\n<!-- END HEADER MOBILE-->\n\n<!-- MENU SIDEBAR-->\n<aside class=\"menu-sidebar d-none d-lg-block\">\n  <div class=\"logo\">\n    <a>\n      <img src=\"assets/images/icon/logo.png\" alt=\"Cool Admin\" />\n    </a>\n  </div>\n  <div class=\"menu-sidebar__content js-scrollbar1\">\n    <nav class=\"navbar-sidebar\">\n      <div class=\"profile clearfix\">\n        <div class=\"profile_pic\">\n          <img [src]=\"(profilePic)?(profilePic):('assets/images/icon/avatar-01.jpg')\" alt=\"...\"\n            class=\"img-circle profile_img\">\n        </div>\n        <div class=\"profile_info\">\n          <span>Welcome,</span>\n          <h2>{{username}}</h2>\n        </div>\n      </div>\n      <ul class=\"list-unstyled navbar__list\">\n        <li [ngClass]=\"{'active has-sub': (currUrl == 'dashboard')}\">\n          <a [routerLink]=\"('/dashboard')\">\n            <i class=\"fas fa-tachometer-alt\"></i>Dashboard</a>\n        </li>\n        <li [ngClass]=\"{'active has-sub': (currUrl == 'user-management')}\">\n          <a [routerLink]=\"('/user-management')\">\n            <i class=\"fas fa-user\"></i>User Management</a>\n        </li>\n        <li [ngClass]=\"{'active has-sub': (currUrl == 'vendor-management' || currUrl == 'add-vendor')}\">\n          <a [routerLink]=\"('/vendor-management')\">\n            <i class=\"fas fa-user\"></i>Vendor Management</a>\n        </li>\n        <li [ngClass]=\"{'active has-sub': (currUrl == 'transaction-management')}\">\n          <a [routerLink]=\"('/transaction-management')\">\n            <i class=\"fa fa-usd\"></i>Transaction Management</a>\n        </li>\n        <!-- <li [ngClass]=\"{'active has-sub': (currUrl == 'branch-management')}\">\n          <a>\n            <i class=\"fas fa-code-branch\"></i>Branch Management</a>\n        </li> -->\n        <li [ngClass]=\"{'active has-sub': (currUrl == 'settings')}\">\n          <a [routerLink]=\"('/settings')\">\n            <i class=\"fas fa-cogs\"></i>Settings</a>\n        </li>\n        <li [ngClass]=\"{'active has-sub': (currUrl == 'edit-profile')}\">\n          <a [routerLink]=\"('/edit-profile')\">\n            <i class=\"fas fa-edit\"></i>Edit Profile</a>\n        </li>\n        <li [ngClass]=\"{'active has-sub': (currUrl == 'view-faqs')}\">\n          <a [routerLink]=\"('/view-faqs')\">\n            <i class=\"fas fa-question\"></i>FAQ</a>\n        </li>\n        <li [ngClass]=\"{'active has-sub': (currUrl == 'terms-conditions')}\">\n          <a [routerLink]=\"('/terms-conditions')\">\n            <i class=\"fas fa-asterisk\"></i>Terms and Conditions</a>\n        </li>\n        <li>\n          <a data-toggle=\"modal\" style=\"cursor: pointer;\" data-target=\"#logoutModal\">\n            <i class=\"fas fa-sign-out-alt\"></i>Logout</a>\n        </li>\n      </ul>\n    </nav>\n  </div>\n</aside>\n<!-- END MENU SIDEBAR-->\n<!-- modal medium -->\n<div class=\"modal fade\" id=\"logoutModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"logoutModalLabel\"\n  aria-hidden=\"true\" data-backdrop=\"static\">\n  <div class=\"modal-dialog modal-sm\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"logoutModalLabel\">Logout</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <p>\n          Are you sure you want to Logout?\n        </p>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Cancel</button>\n        <button type=\"button\" (click)=\"logOut()\" data-dismiss=\"modal\" class=\"btn btn-primary\">Confirm</button>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- end modal medium -->"

/***/ }),

/***/ "./src/app/components/sidebar/sidebar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidebarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_data_service__ = __webpack_require__("./src/app/services/data.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(route, dataService) {
        var _this = this;
        this.route = route;
        this.dataService = dataService;
        this.route.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* NavigationEnd */]) {
                _this.currUrl = event.url.split('/')[1];
            }
        });
    }
    SidebarComponent.prototype.ngOnInit = function () {
        this.username = this.dataService.decryptData((JSON.parse(localStorage.getItem("remittance"))).username);
        $('.hamburger').on('click', function () {
            console.log('clicked');
            $(this).toggleClass('is-active');
            $('.navbar-sidebar').slideToggle('500');
        });
        $('.navbar__list li.has-dropdown > a').on('click', function () {
            var dropdown = $(this).siblings('ul.navbar-sidebar__dropdown');
            $(this).toggleClass('active');
            $(dropdown).slideToggle('500');
            return false;
        });
        this.getProfile();
    };
    SidebarComponent.prototype.logOut = function () {
        localStorage.removeItem("remittance");
        this.route.navigate(['/login']);
    };
    SidebarComponent.prototype.getProfile = function () {
        var _this = this;
        if (navigator.onLine) {
            this.dataService.spinnerShow();
            this.dataService.post('admin/viewAdmin', { adminId: JSON.parse(localStorage.getItem('remittance')).id }, 1).subscribe(function (response) {
                _this.dataService.spinnerHide();
                if (response['response_code'] == 200) {
                    _this.userName = response.result.userName;
                    _this.profilePic = response.result.profilePic;
                }
                else if (response.response_code == 403 || response.response_code == 409 || response.response_code == 401 || response.response_code == 404) {
                    _this.dataService.errorToastr(response.response_message);
                    _this.dataService.logOut();
                }
                else {
                    _this.dataService.errorToastr(response["response_message"]);
                }
            }, function (err) {
                _this.dataService.spinnerHide();
                _this.dataService.errorToastr('Something went wrong');
            });
        }
        else
            this.dataService.errorToastr('Your internet connection seems to be lost');
    };
    SidebarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-sidebar',
            template: __webpack_require__("./src/app/components/sidebar/sidebar.component.html"),
            styles: [__webpack_require__("./src/app/components/sidebar/sidebar.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */], __WEBPACK_IMPORTED_MODULE_2__services_data_service__["a" /* DataService */]])
    ], SidebarComponent);
    return SidebarComponent;
}());



/***/ }),

/***/ "./src/app/components/spinner/spinner.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/spinner/spinner.component.html":
/***/ (function(module, exports) {

module.exports = "<ngx-spinner\n  bdOpacity = 0.2\n  size = \"large\"\n  color = \"#EFE8E8\"\n  type = \"ball-scale-multiple\"\n  fullScreen = \"true\"\n  >  <p style=\"color: white;\" > Loading... </p>\n  </ngx-spinner>\n"

/***/ }),

/***/ "./src/app/components/spinner/spinner.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpinnerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SpinnerComponent = /** @class */ (function () {
    function SpinnerComponent() {
    }
    SpinnerComponent.prototype.ngOnInit = function () {
    };
    SpinnerComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-spinner',
            template: __webpack_require__("./src/app/components/spinner/spinner.component.html"),
            styles: [__webpack_require__("./src/app/components/spinner/spinner.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], SpinnerComponent);
    return SpinnerComponent;
}());



/***/ }),

/***/ "./src/app/components/terms-conditions-editor/terms-conditions-editor.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/terms-conditions-editor/terms-conditions-editor.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"page-wrapper\">\n  <!-- HEADER MOBILE-->\n  <app-sidebar></app-sidebar>\n  <!-- PAGE CONTAINER-->\n  <div class=\"page-container\">\n    <!-- HEADER DESKTOP-->\n    <header class=\"header-desktop\">\n      <div class=\"section__content section__content--p30\">\n        <div class=\"container-fluid\">\n        </div>\n      </div>\n      <nav class=\"navbar-sidebar\" style=\"display:none\">\n        <div class=\"nav\" id=\"nav-tab\" role=\"tablist\">\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'dashboard')}\" [routerLink]=\"('/dashboard')\">Dashboard</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'user-management')}\" [routerLink]=\"('/user-management')\">User Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'vendor-management')}\" [routerLink]=\"('/vendor-management')\">Vendor Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'transaction-management')}\" [routerLink]=\"('/transaction-management')\">Transaction Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'branch-management')}\" [routerLink]=\"('/branch-management')\">Branch Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'settings')}\" [routerLink]=\"('/settings')\">Settings</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'edit-profile')}\" [routerLink]=\"('/edit-profile')\">Edit Profile</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'view-faqs')}\" [routerLink]=\"('/view-faqs')\">FAQ</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'terms-conditions')}\" [routerLink]=\"('/terms-conditions')\">Terms and Conditions</a>\n          <a class=\"nav-item nav-link\" data-toggle=\"modal\" style=\"cursor: pointer; color: #007bff\" data-target=\"#logoutModal\">Logout</a>\n        </div>\n      </nav>\n    </header>\n    <!-- HEADER DESKTOP-->\n\n    <!-- MAIN CONTENT-->\n    <div class=\"main-content\">\n        <div class=\"section__content section__content--p30\">\n          <div class=\"container-fluid\">\n            <div class=\"row\">\n              <div class=\"col-md-12\">\n\n\n                <div class=\"card\">\n                  <div class=\"card-header\">\n                    <strong class=\"card-title\">Terms and Conditions</strong>\n                  </div>\n                  <div class=\"table-data__tool-right\">\n\n                  </div>\n                  <div class=\"card-body\">\n                    <div class=\"typo-headers\">\n                      <h2 class=\"pb-2 display-5\">Heading</h2>\n                    </div>\n                    <ckeditor [editor]=\"Editor\" [(ngModel)]=\"model.editorData\" data=\"{{model.editorData}}\"></ckeditor>\n\n                  </div>\n                  <div class=\"form-actions form-group\">\n                      <button type=\"submit\" [routerLink]=\"['/terms-conditions']\" class=\"btn btn-secondary btn-sm\">Cancel</button>\n                     <button type=\"submit\" (click)=\"submit()\" class=\"btn btn-primary btn-sm\">Submit</button>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    <!-- END MAIN CONTENT-->\n    <!-- END PAGE CONTAINER-->\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/components/terms-conditions-editor/terms-conditions-editor.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TermsConditionsEditorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_data_service__ = __webpack_require__("./src/app/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ckeditor_ckeditor5_build_classic__ = __webpack_require__("./node_modules/@ckeditor/ckeditor5-build-classic/build/ckeditor.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ckeditor_ckeditor5_build_classic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__ckeditor_ckeditor5_build_classic__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TermsConditionsEditorComponent = /** @class */ (function () {
    function TermsConditionsEditorComponent(dataService, router) {
        var _this = this;
        this.dataService = dataService;
        this.router = router;
        this.Editor = __WEBPACK_IMPORTED_MODULE_3__ckeditor_ckeditor5_build_classic__;
        this.model = {
            editorData: '<p>What is Lorem Ipsum?</p>'
        };
        this.router.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* NavigationEnd */]) {
                _this.currUrl = event.url.split('/')[1];
            }
        });
    }
    TermsConditionsEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        var headers = {
            "Authorization": "Basic " + btoa("walletapp:SFDSA78FSA7FFDSAFJRE32DSF98DSGFDGFDSH9H8FDSGFR4R549898DFDS"),
        };
        // console.log("headers", headers)
        this.dataService.get("staticContent/getStaticContent/term_condition", headers).subscribe(function (res) {
            if (res.response_code == 200) {
                _this.model.editorData = res.result.description;
            }
        }, function (err) {
            console.log("error", err);
        });
    };
    TermsConditionsEditorComponent.prototype.submit = function () {
        var _this = this;
        console.log("userid", (JSON.parse(localStorage.getItem("remittance"))).id);
        this.dataService.post("staticContent/updateStaticContent", {
            "staticId": (JSON.parse(localStorage.getItem("staticId"))),
            "type": "term_condition",
            "title": "Terms&Conditions",
            "description": this.model.editorData
        }, '').subscribe(function (res) {
            console.log("Response", res);
            if (res.response_code == 200) {
                _this.dataService.toaster.dismissAllToastr();
                _this.dataService.successToastr(res.response_message);
                _this.router.navigate(['/terms-conditions']);
            }
            else {
                _this.dataService.toaster.dismissAllToastr();
                _this.dataService.errorToastr(res.response_message);
            }
        }, function (err) {
            console.log("Error", err);
            _this.dataService.toaster.dismissAllToastr();
            _this.dataService.errorToastr("Please try again later!!");
        });
    };
    TermsConditionsEditorComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
            selector: 'app-terms-conditions-editor',
            template: __webpack_require__("./src/app/components/terms-conditions-editor/terms-conditions-editor.component.html"),
            styles: [__webpack_require__("./src/app/components/terms-conditions-editor/terms-conditions-editor.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* Router */]])
    ], TermsConditionsEditorComponent);
    return TermsConditionsEditorComponent;
}());



/***/ }),

/***/ "./src/app/components/terms-conditions/terms-conditions.component.css":
/***/ (function(module, exports) {

module.exports = ".table-data__tool .table-data__tool-right > button {\n    margin-right: 12px;\n}\n@media (max-width: 991px) {\n    .table-data__tool {\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n        flex-direction: column;\n    }\n\n    .table-data__tool .table-data__tool-right {\n        margin-top: 10px;\n    }\n\n    .table-data__tool .table-data__tool-right > button {\n        margin-right: 0;\n        margin-bottom: 10px;\n    }\n}"

/***/ }),

/***/ "./src/app/components/terms-conditions/terms-conditions.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"page-wrapper\">\n  <!-- HEADER MOBILE-->\n  <app-sidebar></app-sidebar>\n  <!-- PAGE CONTAINER-->\n  <div class=\"page-container\">\n    <!-- HEADER DESKTOP-->\n    <header class=\"header-desktop\">\n      <div class=\"section__content section__content--p30\">\n        <div class=\"container-fluid\">\n        </div>\n      </div>\n      <nav class=\"navbar-sidebar\" style=\"display:none\">\n        <div class=\"nav\" id=\"nav-tab\" role=\"tablist\">\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'dashboard')}\" [routerLink]=\"('/dashboard')\">Dashboard</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'user-management')}\" [routerLink]=\"('/user-management')\">User Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'vendor-management')}\" [routerLink]=\"('/vendor-management')\">Vendor Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'transaction-management')}\" [routerLink]=\"('/transaction-management')\">Transaction Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'branch-management')}\" [routerLink]=\"('/branch-management')\">Branch Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'settings')}\" [routerLink]=\"('/settings')\">Settings</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'edit-profile')}\" [routerLink]=\"('/edit-profile')\">Edit Profile</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'view-faqs')}\" [routerLink]=\"('/view-faqs')\">FAQ</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'terms-conditions')}\" [routerLink]=\"('/terms-conditions')\">Terms and Conditions</a>\n          <a class=\"nav-item nav-link\" data-toggle=\"modal\" style=\"cursor: pointer; color: #007bff\" data-target=\"#logoutModal\">Logout</a>\n        </div>\n      </nav>\n    </header>\n    <!-- HEADER DESKTOP-->\n\n    <!-- MAIN CONTENT-->\n    <div class=\"main-content\">\n        <div class=\"section__content section__content--p30\">\n          <div class=\"container-fluid\">\n            <div class=\"row\">\n              <div class=\"col-md-12\">\n\n\n                <div class=\"card\">\n                  <div class=\"card-header\">\n                    <strong class=\"card-title\">Terms and Conditions</strong>\n                    <button class=\"btn btn-secondary btn-sm\" [routerLink]=\"('/terms-conditions-edit')\">\n                                            <i class=\"zmdi zmdi-edit\"></i> edit</button>\n                  </div>\n                  <div class=\"table-data__tool-right\">\n\n                  </div>\n                  <div class=\"card-body\">\n                    <!-- <div class=\"typo-headers\">\n                      <h2 class=\"pb-2 display-5\">Heading</h2>\n                    </div> -->\n                    <div class=\"typo-articles\" style=\"text-align: justify;\" id=\"terms_conditions\">\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    <!-- END MAIN CONTENT-->\n    <!-- END PAGE CONTAINER-->\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/components/terms-conditions/terms-conditions.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TermsConditionsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_data_service__ = __webpack_require__("./src/app/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng6_toastr_notifications__ = __webpack_require__("./node_modules/ng6-toastr-notifications/fesm5/ng6-toastr-notifications.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TermsConditionsComponent = /** @class */ (function () {
    function TermsConditionsComponent(dataService, toaster, route) {
        var _this = this;
        this.dataService = dataService;
        this.toaster = toaster;
        this.route = route;
        this.route.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* NavigationEnd */]) {
                _this.currUrl = event.url.split('/')[1];
            }
        });
    }
    TermsConditionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (navigator.onLine) {
            var headers = {
                "Authorization": "Basic " + btoa("walletapp:SFDSA78FSA7FFDSAFJRE32DSF98DSGFDGFDSH9H8FDSGFR4R549898DFDS"),
            };
            // console.log("headers", headers)
            this.dataService.get("staticContent/getStaticContent/term_condition", headers).subscribe(function (res) {
                if (res.response_code == 200) {
                    console.log("Response", res);
                    document.getElementById("terms_conditions").innerHTML = res.result.description;
                    localStorage.setItem("staticId", JSON.stringify(res.result._id));
                }
                else if (res.response_code == 403 || res.response_code == 409 || res.response_code == 404 || res.response_code == 401) {
                    _this.toaster.errorToastr(res.response_message);
                    _this.dataService.logOut();
                }
                else {
                    _this.toaster.dismissAllToastr();
                    _this.toaster.errorToastr("Cannot get terms&conditons.");
                }
            }, function (err) {
                _this.dataService.errorToastr("Cannot get terms&conditions.");
                console.log("Error", err);
            });
        }
        else {
            this.toaster.dismissAllToastr();
            this.toaster.errorToastr("Your internet connection seems to be lost!");
        }
        // document.getElementById('terms_conditions').innerHTML = this.dataService.model.editorData;
    };
    TermsConditionsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'app-terms-conditions',
            template: __webpack_require__("./src/app/components/terms-conditions/terms-conditions.component.html"),
            styles: [__webpack_require__("./src/app/components/terms-conditions/terms-conditions.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__services_data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_2_ng6_toastr_notifications__["a" /* ToastrManager */], __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */]])
    ], TermsConditionsComponent);
    return TermsConditionsComponent;
}());



/***/ }),

/***/ "./src/app/components/user-management/user-management.component.css":
/***/ (function(module, exports) {

module.exports = ".inlineTag{\n    display:-webkit-box;\n    display:-ms-flexbox;\n    display:flex;\n}\n.twoBtn{\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n.table.table-data2 thead{\n    background: #fff;\n}\n.table.table-data2.custom-dtd th{\n    padding:14px;\n    padding-bottom: 8px;\n    text-align: center;\n    }\n.table.table-data2.custom-dtd .tr-shadow td{\n        padding:14px;\n        padding-bottom: 8px;\n        text-align: center;\n        }\n"

/***/ }),

/***/ "./src/app/components/user-management/user-management.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"page-wrapper\">\n  <!-- HEADER MOBILE-->\n  <app-sidebar></app-sidebar>\n  <!-- PAGE CONTAINER-->\n  <div class=\"page-container\">\n    <!-- HEADER DESKTOP-->\n    <header class=\"header-desktop\">\n      <div class=\"section__content section__content--p30\">\n        <div class=\"container-fluid\">\n        </div>\n      </div>\n      <nav class=\"navbar-sidebar\" style=\"display:none\">\n        <div class=\"nav\" id=\"nav-tab\" role=\"tablist\">\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'dashboard')}\"\n            [routerLink]=\"('/dashboard')\">Dashboard</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'user-management')}\"\n            [routerLink]=\"('/user-management')\">User Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'vendor-management')}\"\n            [routerLink]=\"('/vendor-management')\">Vendor Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'transaction-management')}\"\n            [routerLink]=\"('/transaction-management')\">Transaction Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'branch-management')}\"\n            [routerLink]=\"('/branch-management')\">Branch Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'settings')}\"\n            [routerLink]=\"('/settings')\">Settings</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'edit-profile')}\"\n            [routerLink]=\"('/edit-profile')\">Edit Profile</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'view-faqs')}\"\n            [routerLink]=\"('/view-faqs')\">FAQ</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'terms-conditions')}\"\n            [routerLink]=\"('/terms-conditions')\">Terms and Conditions</a>\n          <a class=\"nav-item nav-link\" data-toggle=\"modal\" style=\"cursor: pointer; color: #007bff\"\n            data-target=\"#logoutModal\">Logout</a>\n        </div>\n      </nav>\n    </header>\n    <!-- HEADER DESKTOP-->\n    <app-spinner></app-spinner>\n    <!-- MAIN CONTENT-->\n    <div class=\"main-content\">\n      <div class=\"section__content section__content--p30\">\n        <div class=\"container-fluid\">\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              <!-- DATA TABLE -->\n              <h3 class=\"title-5 m-b-35\">User Management</h3>\n              <div class=\"table-data__tool\">\n                <div class=\"table-data__tool-left\">\n                  <div class=\"rs-select2--light rs-select2--md inlineTag\">\n                    <!-- <form class=\"form-header\" action=\"\" method=\"POST\"> -->\n                    <input class=\"au-input au-input--xl\" type=\"text\" name=\"search\" [(ngModel)]=\"searchKey\"\n                      (keydown)=\"searchOnKeydown($event)\" (keyup)=\"searchAfterDebounceTime()\" id=\"search\"\n                      placeholder=\"Search by username\" />\n                      <div class=\"twoBtn mt-2 ml-4\">\n               <button (click)=\"search()\" class=\"au-btn--submit\" type=\"submit\">\n                      <i class=\"zmdi zmdi-search\"></i>\n                    </button>\n                    <button (click)=\"refresh()\" class=\"au-btn--submit ml-2\">\n                      <i class=\"zmdi zmdi-refresh\"></i>\n                    </button>\n                    <!-- </form> -->\n                  </div>\n                </div>\n                </div>\n                <div class=\"table-data__tool-right\">\n                  <!-- <button class=\"au-btn au-btn-icon au-btn--green au-btn--small\">\n                                            <i class=\"zmdi zmdi-plus\"></i>add item</button>\n                  <div class=\"rs-select2--dark rs-select2--sm rs-select2--dark2\">\n                    <select class=\"js-select2\" name=\"type\">\n                                                <option selected=\"selected\">Export</option>\n                                                <option value=\"\">Option 1</option>\n                                                <option value=\"\">Option 2</option>\n                                            </select>\n                    <div class=\"dropDownSelect2\"></div>\n                  </div> -->\n                </div>\n              </div>\n              <div class=\"table-responsive table-responsive-data2\">\n                <table class=\"table table-data2 custom-dtd\">\n                  <thead>\n                    <tr>\n                      <th>S. No.</th>\n                      <th>Username</th>\n                      <th>Email Address</th>\n                      <th>Contact No.</th>\n                      <th>Actions</th>\n                    </tr>\n                  </thead>\n                  <tr *ngIf=\"users == null\">\n                    <td colspan=\"5\">\n                      <h3>No users found.</h3>\n                    </td>\n                  </tr>\n                  <tr *ngIf=\"users?.length == 0\">\n                    <td colspan=\"5\">\n                      <h3>No users found for keyword \"{{searchKey}}\".</h3>\n                    </td>\n                  </tr>\n                  <tbody *ngFor=\"let item of users | paginate:{\n                  itemsPerPage: limit,\n                  currentPage: page,\n                  totalItems: totalUsers }; let i = index\">\n                    <tr class=\"tr-shadow\">\n                      <td>{{limit * (page - 1) + i + 1}}</td>\n                      <td>{{item?.userName}}</td>\n                      <td>\n                        <span class=\"block-email\">{{item?.email}}</span>\n                      </td>\n                      <td class=\"desc\">{{item?.mobileNumber}}</td>\n                      <td>\n                        <div class=\"table-data-feature\" style=\"justify-content: center !important;\">\n                          <button class=\"item\" [routerLink]=\"['/view-user/',item?._id]\" data-toggle=\"tooltip\"\n                            data-placement=\"top\" title=\"View Details\">\n                            <i class=\"zmdi zmdi-view-web\"></i>\n                          </button>\n                          <button *ngIf=\"item?.status == 'ACTIVE'\" (click)=\"userStatus(item?.status, item?._id)\"\n                            class=\"item\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Block\">\n                            <i class=\"zmdi zmdi-block\"></i>\n                          </button>\n                          <button *ngIf=\"item?.status == 'BLOCKED'\" (click)=\"userStatus(item?.status, item?._id)\"\n                            class=\"item\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Block\">\n                            <i style=\"color: red;\" class=\"zmdi zmdi-block\"></i>\n                          </button>\n                          <button class=\"item\" (click)=\"deleteUserModal(item)\"  data-toggle=\"tooltip\"\n                            data-placement=\"top\" title=\"Delete User\">\n                            <i class=\"zmdi zmdi-delete\"></i>\n                          </button>\n                        </div>\n                      </td>\n                    </tr>\n                    <tr class=\"spacer\"></tr>\n                  </tbody>\n                </table>\n              </div>\n              <div style=\"text-align: center; margin-top: 5px;\">\n                <pagination-controls (pageChange)=\"pageChange($event)\" responsive=\"true\" autoHide=\"true\"\n                  responsive=\"true\" previousLabel=\"Previous\" nextLabel=\"Next\">\n                </pagination-controls>\n              </div>\n              <!-- END DATA TABLE -->\n            </div>\n          </div>\n\n        </div>\n      </div>\n    </div>\n    <!-- END MAIN CONTENT-->\n    <!-- END PAGE CONTAINER-->\n  </div>\n\n</div>\n<footer>\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <div class=\"copyright\">\n        <p>Copyright © 2019 Remittance - A digital Wallet. All rights reserved.</p>\n      </div>\n    </div>\n  </div>\n</footer>\n\n\n\n<!-- modal medium -->\n<div class=\"modal fade\" id=\"deleteModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"deleteModalLabel\" aria-hidden=\"true\" data-backdrop=\"static\">\n  <div class=\"modal-dialog modal-sm\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"deleteModalLabel\">Delete</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <p>\n          Are you sure you want to delete this user?\n        </p>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Cancel</button>\n        <button type=\"button\" (click)=\"deleteUser()\" data-dismiss=\"modal\" class=\"btn btn-primary\">Confirm</button>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- end modal medium -->"

/***/ }),

/***/ "./src/app/components/user-management/user-management.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserManagementComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_data_service__ = __webpack_require__("./src/app/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserManagementComponent = /** @class */ (function () {
    function UserManagementComponent(dataService, route) {
        var _this = this;
        this.dataService = dataService;
        this.route = route;
        this.users = [];
        this.searchKey = null;
        this.page = 1;
        this.route.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* NavigationEnd */]) {
                _this.currUrl = event.url.split('/')[1];
            }
        });
    }
    UserManagementComponent.prototype.ngOnInit = function () {
        this.refresh();
    };
    UserManagementComponent.prototype.searchAfterDebounceTime = function () {
        // Observable.fromEvent(document.getElementById("search"), "keyup").debounceTime(1000).distinctUntilChanged().subscribe(
        //   ()=>{
        //       if(this.searchKey == ""){
        //         this.refresh();
        //       }else{
        //         this.search();
        //       }
        //   }
        // );
    };
    UserManagementComponent.prototype.refresh = function () {
        this.searchKey = "";
        this.search();
        this.searchKey = "";
    };
    UserManagementComponent.prototype.searchOnKeydown = function (event) {
        if (event.keyCode == 13) {
            // console.log("Keydown event=>>", event);
            if (this.searchKey == "") {
                this.refresh();
            }
            else {
                this.search();
            }
        }
    };
    UserManagementComponent.prototype.pageChange = function (currentPage) {
        var _this = this;
        this.dataService.spinnerShow();
        this.dataService.post("admin/listUserSearch", {
            search: "",
            limit: 10,
            page: currentPage
        }, 1).subscribe(function (res) {
            _this.dataService.spinnerHide();
            if (res.response_code == 200) {
                _this.users = res.result.docs;
                _this.limit = res.result.limit;
                _this.pages = res.result.pages;
                _this.page = res.result.page;
                _this.totalUsers = res.result.total;
            }
            else if (res.response_code == 403 || res.response_code == 409 || res.response_code == 404 || res.response_code == 401) {
                _this.dataService.errorToastr(res.response_message);
                _this.dataService.logOut();
            }
            else {
                _this.dataService.errorToastr("Cannot get the users.");
            }
        }, function (err) {
            _this.dataService.spinnerHide();
            _this.dataService.errorToastr("Cannot get the users.");
        });
    };
    UserManagementComponent.prototype.search = function () {
        var _this = this;
        if (navigator.onLine) {
            this.dataService.spinnerShow();
            this.dataService.post("admin/listUserSearch", {
                "search": this.searchKey,
                "limit": 10
            }, 1).subscribe(function (res) {
                _this.dataService.spinnerHide();
                if (res.response_code == 200) {
                    _this.users = res.result.docs;
                    _this.limit = res.result.limit;
                    _this.pages = res.result.pages;
                    _this.page = res.result.page;
                    _this.totalUsers = res.result.total;
                }
                else if (res.response_code == 403 || res.response_code == 409 || res.response_code == 404 || res.response_code == 401) {
                    _this.dataService.errorToastr(res.response_message);
                    _this.dataService.logOut();
                }
                else {
                    _this.dataService.errorToastr("Cannot get the users.");
                }
            }, function (err) {
                _this.dataService.spinnerHide();
                _this.dataService.errorToastr("Cannot get the users.");
            });
        }
        else {
            this.dataService.errorToastr("Your internet connection seems to be lost!");
        }
    };
    UserManagementComponent.prototype.userStatus = function (status, userId) {
        var _this = this;
        this.dataService.spinnerShow();
        var newStatus = status == "ACTIVE" ? "BLOCKED" : "ACTIVE";
        // console.log("userid=>>", userId, "\nstatus==>>", status, "\nnew status==>>", newStatus);
        this.dataService.post("admin/actionToUser", {
            "userId": userId,
            "status": newStatus
        }, 1).subscribe(function (res) {
            _this.dataService.spinnerHide();
            if (res.response_code == 200) {
                newStatus == 'ACTIVE' ?
                    _this.dataService.successToastr("User active now!") :
                    _this.dataService.errorToastr("User blocked!");
                _this.refresh();
            }
            else if (res.response_code == 403 || res.response_code == 409 || res.response_code == 404 || res.response_code == 401) {
                _this.dataService.errorToastr(res.response_message);
                _this.dataService.logOut();
            }
            else {
                _this.dataService.errorToastr("Cannot get the users.");
            }
        }, function (err) {
            _this.dataService.spinnerHide();
            _this.dataService.errorToastr('Something went wrong');
        });
    };
    UserManagementComponent.prototype.deleteUserModal = function (user) {
        this.userId = user._id;
        $('#deleteModal').modal('show');
    };
    UserManagementComponent.prototype.deleteUser = function () {
        var _this = this;
        this.dataService.spinnerShow();
        this.dataService.post("admin/actionToUser", {
            "userId": this.userId,
            "status": 'DELETED'
        }, 1).subscribe(function (res) {
            _this.dataService.spinnerHide();
            if (res.response_code == 200) {
                _this.refresh();
            }
            else if (res.response_code == 403 || res.response_code == 409 || res.response_code == 404 || res.response_code == 401) {
                _this.dataService.errorToastr(res.response_message);
                _this.dataService.logOut();
            }
            else {
                _this.dataService.errorToastr("Cannot get the users.");
            }
        }, function (err) {
            _this.dataService.spinnerHide();
            _this.dataService.errorToastr('Something went wrong');
        });
    };
    UserManagementComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'app-user-management',
            template: __webpack_require__("./src/app/components/user-management/user-management.component.html"),
            styles: [__webpack_require__("./src/app/components/user-management/user-management.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__services_data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]])
    ], UserManagementComponent);
    return UserManagementComponent;
}());



/***/ }),

/***/ "./src/app/components/vendor-management/vendor-management.component.css":
/***/ (function(module, exports) {

module.exports = ".inlineTag{\n    display:-webkit-box;\n    display:-ms-flexbox;\n    display:flex;\n}\n.twoBtn{\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n.table.table-data2 thead{\n    background: #fff;\n}\n.tr-shadow td{\n    word-break: break-all;\n}\n.table.table-data2.custom-dtd th{\n    padding:14px;\n    padding-bottom: 8px;\n    text-align: center;\n    }\n.table.table-data2.custom-dtd .tr-shadow td{\n        padding:14px;\n        padding-bottom: 8px;\n        text-align: center;\n        }\n\n\n\n\n\n\n"

/***/ }),

/***/ "./src/app/components/vendor-management/vendor-management.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"page-wrapper\">\n  <!-- HEADER MOBILE-->\n  <app-sidebar></app-sidebar>\n  <!-- PAGE CONTAINER-->\n  <div class=\"page-container\">\n    <!-- HEADER DESKTOP-->\n    <header class=\"header-desktop\">\n      <div class=\"section__content section__content--p30\">\n        <div class=\"container-fluid\">\n        </div>\n      </div>\n      <nav class=\"navbar-sidebar\" style=\"display:none\">\n        <div class=\"nav\" id=\"nav-tab\" role=\"tablist\">\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'dashboard')}\"\n            [routerLink]=\"('/dashboard')\">Dashboard</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'user-management')}\"\n            [routerLink]=\"('/user-management')\">User Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'vendor-management')}\"\n            [routerLink]=\"('/vendor-management')\">Vendor Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'transaction-management')}\"\n            [routerLink]=\"('/transaction-management')\">Transaction Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'branch-management')}\"\n            [routerLink]=\"('/branch-management')\">Branch Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'settings')}\"\n            [routerLink]=\"('/settings')\">Settings</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'edit-profile')}\"\n            [routerLink]=\"('/edit-profile')\">Edit Profile</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'view-faqs')}\"\n            [routerLink]=\"('/view-faqs')\">FAQ</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'terms-conditions')}\"\n            [routerLink]=\"('/terms-conditions')\">Terms and Conditions</a>\n          <a class=\"nav-item nav-link\" data-toggle=\"modal\" style=\"cursor: pointer; color: #007bff\"\n            data-target=\"#logoutModal\">Logout</a>\n        </div>\n      </nav>\n    </header>\n    <!-- HEADER DESKTOP-->\n    <app-spinner></app-spinner>\n    <!-- MAIN CONTENT-->\n    <div class=\"main-content\">\n      <div class=\"section__content section__content--p30\">\n        <div class=\"container-fluid\">\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              <!-- DATA TABLE -->\n              <h3 class=\"title-5 m-b-35\">Vendor Management</h3>\n              <div class=\"table-data__tool\">\n                <div class=\"table-data__tool-left\">\n                  <div class=\"rs-select2--light rs-select2--md inlineTag\">\n                    <!-- <form class=\"form-header\" action=\"\" method=\"POST\"> -->\n                    <input class=\"au-input au-input--xl\" type=\"text\" name=\"search\" [(ngModel)]=\"searchKey\" id=\"search\"\n                      placeholder=\"Search by username\" />\n                      <div class=\"twoBtn mt-2 ml-4\">\n                    <button (click)=\"pageChange()\" class=\"au-btn--submit ml-2\" type=\"submit\">\n                      <i class=\"zmdi zmdi-search\"></i>\n                    </button>\n                    <button (click)=\"refresh()\" class=\"au-btn--submit ml-2\">\n                      <i class=\"zmdi zmdi-refresh\"></i>\n                    </button>\n                    <button (click)=\"addVendor()\" class=\"au-btn--submit ml-2\">\n                      <i class=\"zmdi zmdi-plus\"></i>\n                    </button>\n                    <!-- </form> -->\n                  </div>\n                </div>\n                </div>\n                <div class=\"table-data__tool-right\">\n                </div>\n              </div>\n              <div class=\"table-responsive table-responsive-data2\">\n                <table class=\"table table-data2 custom-dtd\">\n                  <thead>\n                    <tr>\n                      <th>S. No.</th>\n                      <th>User Name</th>\n                      <th>Name</th>\n                      <th>Address</th>\n                      <th>Email</th>\n                      <th>Contact No.</th>\n                      <th>Actions</th>\n                    </tr>\n                  </thead>\n                  <tr *ngIf=\"vendors == null\">\n                    <td colspan=\"5\">\n                      <h3>No vendor found.</h3>\n                    </td>\n                  </tr>\n                  <tr *ngIf=\"vendors?.length == 0\">\n                    <td colspan=\"5\">\n                      <h3>No vendor found for keyword \"{{searchKey}}\".</h3>\n                    </td>\n                  </tr>\n\n                  <tbody *ngFor=\"let item of vendors | paginate:{\n                  itemsPerPage: limit,\n                  currentPage: page,\n                  totalItems: totalvendors }; let i = index\">\n                    <tr class=\"tr-shadow\">\n                      <td>{{limit * (page - 1) + i + 1}}</td>\n                      <td>{{item?.userName}}</td>\n                      <td>{{item?.firstName}}&nbsp;{{item.middleName}}&nbsp;{{item.lastName}}</td>\n                      <td>\n                          {{item.storeNo}},&nbsp;{{item?.area}},&nbsp;{{item.city}},&nbsp;{{item.country}},&nbsp;{{item.pin}}\n                        <!-- <span class=\"block-email\"></span> -->\n                      </td>\n                      <td>{{item?.email}}</td>\n                      <td class=\"desc\">{{item?.countryCode}}{{item?.mobileNumber}}</td>\n                      <td>\n                      <div class=\"table-data-feature\">\n                        <!-- <button class=\"item\" [routerLink]=\"['/vendor-profile/',item?._id]\" data-toggle=\"tooltip\"\n                          data-placement=\"top\" title=\"View Details\">\n                          <i class=\"zmdi zmdi-view-web\"></i>\n                        </button> -->\n                        <button *ngIf=\"item?.status == 'ACTIVE'\" (click)=\"userStatus(item?.status, item?._id)\"\n                          class=\"item\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Block\">\n                          <i class=\"zmdi zmdi-block\"></i>\n                        </button>\n                        <button *ngIf=\"item?.status == 'Block'\" (click)=\"userStatus(item?.status, item?._id)\"\n                          class=\"item\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Block\">\n                          <i style=\"color: red;\" class=\"zmdi zmdi-block\"></i>\n                        </button>\n                        <button class=\"item\" (click)=\"deleteUserModal(item)\"  data-toggle=\"tooltip\"\n                          data-placement=\"top\" title=\"Delete User\">\n                          <i class=\"zmdi zmdi-delete\"></i>\n                        </button>\n                      </div>\n                    </td>\n                    </tr>\n                    <!-- <tr class=\"spacer\"></tr> -->\n                    \n                  </tbody>\n                </table>\n              </div>\n              \n              <div style=\"text-align: center; margin-top: 5px;\">\n                <pagination-controls (pageChange)=\"pageChange($event)\" responsive=\"true\" autoHide=\"true\"\n                  responsive=\"true\" previousLabel=\"Previous\" nextLabel=\"Next\">\n                </pagination-controls>\n              </div>\n              <!-- END DATA TABLE -->\n            </div>\n          </div>\n\n        </div>\n      </div>\n    </div>\n    <!-- END MAIN CONTENT-->\n    <!-- END PAGE CONTAINER-->\n  </div>\n\n</div>\n<footer>\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <div class=\"copyright\">\n        <p>Copyright © 2019 Remittance - A digital Wallet. All rights reserved.</p>\n      </div>\n    </div>\n  </div>\n</footer>\n<!-- modal medium -->\n<div class=\"modal fade\" id=\"deleteModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"deleteModalLabel\" aria-hidden=\"true\" data-backdrop=\"static\">\n  <div class=\"modal-dialog modal-sm\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"deleteModalLabel\">Delete</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <p>\n          Are you sure you want to delete this vendor user?\n        </p>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Cancel</button>\n        <button type=\"button\" (click)=\"deleteUser()\" data-dismiss=\"modal\" class=\"btn btn-primary\">Confirm</button>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- end modal medium -->"

/***/ }),

/***/ "./src/app/components/vendor-management/vendor-management.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VendorManagementComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_data_service__ = __webpack_require__("./src/app/services/data.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var VendorManagementComponent = /** @class */ (function () {
    function VendorManagementComponent(dataService, route) {
        var _this = this;
        this.dataService = dataService;
        this.route = route;
        this.vendors = [];
        this.searchKey = null;
        this.page = 1;
        this.route.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* NavigationEnd */]) {
                _this.currUrl = event.url.split('/')[1];
            }
        });
    }
    VendorManagementComponent.prototype.ngOnInit = function () {
        this.refresh();
    };
    VendorManagementComponent.prototype.refresh = function () {
        this.searchKey = "";
        this.pageChange(1);
        this.searchKey = "";
    };
    VendorManagementComponent.prototype.pageChange = function (currentPage) {
        var _this = this;
        this.dataService.spinnerShow();
        this.dataService.post("admin/searchVendors", {
            search: this.searchKey,
            limit: 10,
            page: currentPage
        }, 1).subscribe(function (res) {
            _this.dataService.spinnerHide();
            if (res.response_code == 200) {
                _this.vendors = res.result.docs;
                _this.limit = res.result.limit;
                _this.pages = res.result.pages;
                _this.page = res.result.page;
                _this.totalvendors = res.result.total;
                console.log('pagination =======>>', _this.limit, _this.page, _this.pages, _this.totalvendors);
            }
            else if (res.response_code == 403 || res.response_code == 409 || res.response_code == 404 || res.response_code == 401) {
                _this.dataService.errorToastr(res.response_message);
                // this.dataService.logOut();
            }
            else {
                _this.dataService.errorToastr("Cannot get the users.");
            }
        }, function (err) {
            _this.dataService.spinnerHide();
            _this.dataService.errorToastr("Cannot get the users.");
        });
    };
    // searchAPI() {
    //   if (navigator.onLine) {
    //     if (this.searchKey == '')
    //       this.pageChange(1);
    //     else {
    //       this.dataService.spinnerShow();
    //       this.dataService.post("admin/searchVendors", {
    //         "search": this.searchKey,
    //         "limit": 10
    //       }, 1).subscribe(
    //         (res: any) => {
    //           this.dataService.spinnerHide();
    //           if (res.response_code == 200) {
    //             this.vendors = res.result.docs;
    //             this.limit = res.result.limit;
    //             this.pages = res.result.pages;
    //             this.page = res.result.page;
    //             this.totalvendors = res.result.total;
    //           } else if (res.response_code == 403 || res.response_code == 409 || res.response_code == 404 || res.response_code == 401) {
    //             this.dataService.errorToastr(res.response_message);
    //             // this.dataService.logOut();
    //           } else {
    //             this.dataService.errorToastr("Cannot get the users.");
    //           }
    //         },
    //         (err: any) => {
    //           this.dataService.spinnerHide();
    //           this.dataService.errorToastr("Cannot get the users.");
    //         }
    //       );
    //     }
    //   } else {
    //     this.dataService.errorToastr("Your internet connection seems to be lost!");
    //   }
    // }
    // block , activaed 
    VendorManagementComponent.prototype.addVendor = function () {
        this.route.navigate(['/add-vendor']);
    };
    VendorManagementComponent.prototype.userStatus = function (status, userId) {
        var _this = this;
        this.dataService.spinnerShow();
        var newStatus = status == "ACTIVE" ? "Block" : "ACTIVE";
        // console.log("userid=>>", userId, "\nstatus==>>", status, "\nnew status==>>", newStatus);
        this.dataService.post("admin/blockUnblockVendor", {
            "vendorId": userId,
            "status": newStatus
        }, 1).subscribe(function (res) {
            _this.dataService.spinnerHide();
            if (res.response_code == 200) {
                newStatus == 'ACTIVE' ?
                    _this.dataService.successToastr("User active now!") :
                    _this.dataService.errorToastr("User blocked!");
                _this.refresh();
            }
            else if (res.response_code == 403 || res.response_code == 409 || res.response_code == 404 || res.response_code == 401) {
                _this.dataService.errorToastr(res.response_message);
                _this.dataService.logOut();
            }
            else {
                _this.dataService.errorToastr("Cannot get the users.");
            }
        }, function (err) {
            _this.dataService.spinnerHide();
            _this.dataService.errorToastr('Something went wrong');
        });
    };
    VendorManagementComponent.prototype.deleteUserModal = function (user) {
        this.userId = user._id;
        $('#deleteModal').modal('show');
    };
    VendorManagementComponent.prototype.deleteUser = function () {
        var _this = this;
        this.dataService.spinnerShow();
        this.dataService.post("admin/deleteVendor", {
            "vendorId": this.userId,
        }, 1).subscribe(function (res) {
            _this.dataService.spinnerHide();
            if (res.response_code == 200) {
                _this.refresh();
            }
            else if (res.response_code == 403 || res.response_code == 409 || res.response_code == 404 || res.response_code == 401) {
                _this.dataService.errorToastr(res.response_message);
                _this.dataService.logOut();
            }
            else {
                _this.dataService.errorToastr("Cannot get the users.");
            }
        }, function (err) {
            _this.dataService.spinnerHide();
            _this.dataService.errorToastr('Something went wrong');
        });
    };
    VendorManagementComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-vendor-management',
            template: __webpack_require__("./src/app/components/vendor-management/vendor-management.component.html"),
            styles: [__webpack_require__("./src/app/components/vendor-management/vendor-management.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]])
    ], VendorManagementComponent);
    return VendorManagementComponent;
}());



/***/ }),

/***/ "./src/app/components/view-faq/view-faq.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/view-faq/view-faq.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"page-wrapper\">\n  <!-- HEADER MOBILE-->\n  <app-sidebar></app-sidebar>\n  <!-- PAGE CONTAINER-->\n  <div class=\"page-container\">\n    <!-- HEADER DESKTOP-->\n    <header class=\"header-desktop\">\n      <div class=\"section__content section__content--p30\">\n        <div class=\"container-fluid\">\n        </div>\n      </div>\n      <nav class=\"navbar-sidebar\" style=\"display:none\">\n        <div class=\"nav\" id=\"nav-tab\" role=\"tablist\">\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'dashboard')}\" [routerLink]=\"('/dashboard')\">Dashboard</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'user-management')}\" [routerLink]=\"('/user-management')\">User Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'vendor-management')}\" [routerLink]=\"('/vendor-management')\">Vendor Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'transaction-management')}\" [routerLink]=\"('/transaction-management')\">Transaction Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'branch-management')}\" [routerLink]=\"('/branch-management')\">Branch Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'settings')}\" [routerLink]=\"('/settings')\">Settings</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'edit-profile')}\" [routerLink]=\"('/edit-profile')\">Edit Profile</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'view-faqs')}\" [routerLink]=\"('/view-faqs')\">FAQ</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'terms-conditions')}\" [routerLink]=\"('/terms-conditions')\">Terms and Conditions</a>\n          <a class=\"nav-item nav-link\" data-toggle=\"modal\" style=\"cursor: pointer; color: #007bff\" data-target=\"#logoutModal\">Logout</a>\n        </div>\n      </nav>\n    </header>\n    <!-- HEADER DESKTOP-->\n\n    <!-- MAIN CONTENT-->\n    <div class=\"main-content\">\n        <div class=\"section__content section__content--p30\">\n          <div class=\"container-fluid\">\n            <div class=\"row\">\n              <div class=\"col-md-12\">\n\n\n                <div class=\"card\">\n                  <div class=\"card-header\">\n                    <strong class=\"card-title\">FAQs (Frequently Asked Questions)</strong>\n                    <button class=\"btn btn-secondary btn-sm\" [routerLink]=\"('/add-faq')\">\n                    <i class=\"zmdi zmdi-collection-plus\"></i> ADD</button>\n                  </div>\n                  <div class=\"table-data__tool-right\">\n\n                  </div>\n                  <div class=\"card-body\" *ngFor=\"let faq of FAQ.FAQ\">\n                      <div class=\"row m-t-25\">\n                          <div class=\"col-sm-6 col-lg-10\">\n                    <div class=\"typo-headers\">\n                      <h4 class=\"pb-2 display-5\">{{faq?.question}}</h4>\n                    </div>\n                    <div class=\"typo-articles\" style=\"text-align: justify;\">\n                      <p>{{faq?.answer}}</p>\n                    </div>\n                          </div>\n                          <div class=\"col-sm-6 col-lg-2\">\n                        <button class=\"btn btn-secondary btn-sm\" [routerLink]=\"('/edit-faq/'+faq._id)\">\n                          <i class=\"zmdi zmdi-edit\"></i></button>\n                          </div>\n                      </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    <!-- END MAIN CONTENT-->\n    <!-- END PAGE CONTAINER-->\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/components/view-faq/view-faq.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewFaqComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_data_service__ = __webpack_require__("./src/app/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ViewFaqComponent = /** @class */ (function () {
    function ViewFaqComponent(dataService, route) {
        var _this = this;
        this.dataService = dataService;
        this.route = route;
        this.FAQ = [];
        this.route.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* NavigationEnd */]) {
                _this.currUrl = event.url.split('/')[1];
            }
        });
    }
    ViewFaqComponent.prototype.ngOnInit = function () {
        this.getFAQs();
    };
    ViewFaqComponent.prototype.getFAQs = function () {
        var _this = this;
        if (navigator.onLine) {
            this.dataService.spinnerShow();
            this.dataService.post("admin/viewFaq", {
                "_id": JSON.parse(localStorage.getItem('remittance')).id
            }, 1).subscribe(function (res) {
                _this.dataService.spinnerHide();
                if (res.response_code == 200) {
                    _this.FAQ = res.success;
                }
                else if (res.response_code == 403 || res.response_code == 409 || res.response_code == 404 || res.response_code == 401) {
                    _this.dataService.errorToastr(res.response_message);
                    _this.dataService.logOut();
                }
                else {
                    _this.dataService.errorToastr(res.response_message);
                }
            }, function (err) {
                _this.dataService.spinnerHide();
                _this.dataService.errorToastr("Something went wrong");
            });
        }
        else {
            this.dataService.errorToastr("Your internet connection seems to be lost!");
        }
    };
    ViewFaqComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-view-faq',
            template: __webpack_require__("./src/app/components/view-faq/view-faq.component.html"),
            styles: [__webpack_require__("./src/app/components/view-faq/view-faq.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]])
    ], ViewFaqComponent);
    return ViewFaqComponent;
}());



/***/ }),

/***/ "./src/app/components/view-user-details/view-user-details.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/view-user-details/view-user-details.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"page-wrapper\">\n  <!-- HEADER MOBILE-->\n  <app-sidebar></app-sidebar>\n  <!-- PAGE CONTAINER-->\n  <div class=\"page-container\">\n    <!-- HEADER DESKTOP-->\n    <header class=\"header-desktop\">\n      <div class=\"section__content section__content--p30\">\n        <div class=\"container-fluid\">\n        </div>\n      </div>\n      <nav class=\"navbar-sidebar\" style=\"display:none\">\n        <div class=\"nav\" id=\"nav-tab\" role=\"tablist\">\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'dashboard')}\" [routerLink]=\"('/dashboard')\">Dashboard</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'user-management')}\" [routerLink]=\"('/user-management')\">User Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'vendor-management')}\" [routerLink]=\"('/vendor-management')\">Vendor Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'transaction-management')}\" [routerLink]=\"('/transaction-management')\">Transaction Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'branch-management')}\" [routerLink]=\"('/branch-management')\">Branch Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'settings')}\" [routerLink]=\"('/settings')\">Settings</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'edit-profile')}\" [routerLink]=\"('/edit-profile')\">Edit Profile</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'view-faqs')}\" [routerLink]=\"('/view-faqs')\">FAQ</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'terms-conditions')}\" [routerLink]=\"('/terms-conditions')\">Terms and Conditions</a>\n          <a class=\"nav-item nav-link\" data-toggle=\"modal\" style=\"cursor: pointer; color: #007bff\" data-target=\"#logoutModal\">Logout</a>\n        </div>\n      </nav>\n    </header>\n    <!-- HEADER DESKTOP-->\n<app-spinner></app-spinner>\n    <!-- MAIN CONTENT-->\n    <div class=\"main-content\">\n      <div class=\"section__content section__content--p30\">\n        <div class=\"container-fluid\">\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              <!-- DATA TABLE -->\n              <h3 class=\"title-5 m-b-35\">User Details</h3>\n              <div class=\"row\">\n                <div class=\"col-lg-12\">\n                  <div class=\"au-card recent-report\">\n                    <div class=\"au-card-inner\">\n                      <button [routerLink]=\"['/user-management']\" type=\"submit\" class=\"btn btn-primary btn-sm\">Back</button><hr/>\n                      <div *ngIf=\"user\" >\n                          <div class=\"profile_pic\" style=\"display: flex;justify-content: center;\">\n                            <img src=\"assets/images/icon/avatar-05.jpg\" alt=\"...\" class=\"img-circle profile_img\">\n                          </div>\n                          <hr/>\n                          <div class=\"table-responsive table-responsive-data2\">\n                            <table class=\"table table-data2\">\n                              <tbody>\n                                <tr>\n                                  <td>\n                                    <strong>Username:</strong>\n                                  </td>\n                                  <td>\n                                    {{user?.userName}}\n                                  </td>\n                                </tr>\n                                <tr class=\"spacer\"></tr>\n                                <tr>\n                                  <td>\n                                    <strong>First name:</strong>\n                                  </td>\n                                  <td>\n                                    {{user?.firstName}}\n                                  </td>\n                                </tr>\n                                <tr class=\"spacer\"></tr>\n                                <tr>\n                                  <td>\n                                    <strong>Middle Name:</strong>\n                                  </td>\n                                  <td>\n                                    {{user?.middleName}}\n                                  </td>\n                                </tr>\n                                <tr class=\"spacer\"></tr>\n                                <tr>\n                                  <td>\n                                    <strong>Last name:</strong>\n                                  </td>\n                                  <td>\n                                    {{user?.lastName}}\n                                  </td>\n                                </tr>\n                                <tr class=\"spacer\"></tr>\n                                <tr>\n                                  <td>\n                                    <strong>Email:</strong>\n                                  </td>\n                                  <td>\n                                    {{user?.email}}\n                                  </td>\n                                </tr>\n                                <tr class=\"spacer\"></tr>\n                                <tr>\n                                  <td>\n                                    <strong>Mobile number:</strong>\n                                  </td>\n                                  <td>\n                                    {{user?.mobileNumber}}\n                                  </td>\n                                </tr>\n                                <tr class=\"spacer\"></tr>\n                                <tr>\n                                  <td>\n                                    <strong>Country:</strong>\n                                  </td>\n                                  <td>\n                                    {{user?.country}}\n                                  </td>\n                                </tr>\n                                <tr class=\"spacer\"></tr>\n                              </tbody>\n                            </table>\n                          </div>\n                      </div>\n                      <div *ngIf=\"!user\" style=\"text-align: center;\">\n                        <br/>\n                        <h3>No user exist.</h3>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n          \n        </div>\n      </div>\n    </div>\n    <!-- END MAIN CONTENT-->\n    <!-- END PAGE CONTAINER-->\n  </div>\n\n</div>\n<footer>\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <div class=\"copyright\">\n        <p>Copyright © 2019 Remittance - A digital Wallet. All rights reserved.</p>\n      </div>\n    </div>\n  </div>\n</footer>\n"

/***/ }),

/***/ "./src/app/components/view-user-details/view-user-details.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewUserDetailsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ng6_toastr_notifications__ = __webpack_require__("./node_modules/ng6-toastr-notifications/fesm5/ng6-toastr-notifications.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_data_service__ = __webpack_require__("./src/app/services/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ViewUserDetailsComponent = /** @class */ (function () {
    function ViewUserDetailsComponent(actRoute, dataService, toaster, route) {
        var _this = this;
        this.actRoute = actRoute;
        this.dataService = dataService;
        this.toaster = toaster;
        this.route = route;
        this.route.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* NavigationEnd */]) {
                _this.currUrl = event.url.split('/')[1];
            }
        });
    }
    ViewUserDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (navigator.onLine) {
            this.userId = this.actRoute.params;
            // console.log(this.userId._value.id);
            var url = "admin/viewUser/" + this.userId._value.id;
            // console.log(url);
            this.dataService.get(url, 1).subscribe(function (res) {
                // console.log("Response", res);
                if (res.response_code === 200) {
                    _this.user = res.result.result;
                }
                else if (res.response_code == 403 || res.response_code == 409 || res.response_code == 404 || res.response_code == 401) {
                    _this.toaster.dismissAllToastr();
                    _this.toaster.errorToastr(res.response_message);
                    _this.dataService.logOut();
                }
                else {
                    _this.toaster.dismissAllToastr();
                    _this.toaster.errorToastr(res.response_message);
                }
            }, function (err) {
                console.log("Error", err);
            });
        }
        else {
            this.toaster.dismissAllToastr();
            this.toaster.errorToastr("Your internet connection seems to be lost!");
        }
    };
    ViewUserDetailsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Component"])({
            selector: 'app-view-user-details',
            template: __webpack_require__("./src/app/components/view-user-details/view-user-details.component.html"),
            styles: [__webpack_require__("./src/app/components/view-user-details/view-user-details.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_1__services_data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_0_ng6_toastr_notifications__["a" /* ToastrManager */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]])
    ], ViewUserDetailsComponent);
    return ViewUserDetailsComponent;
}());



/***/ }),

/***/ "./src/app/guard/auth.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthGuard = /** @class */ (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (next, state) {
        if (localStorage.getItem('remittance')) {
            if (state.url == "/login" || state.url == "/reset-password" || state.url == "/forgot-password") {
                this.router.navigate(["/dashboard"]);
            }
            return true;
        }
        else {
            console.log(state.url);
            if (state.url == "/login" || (state.url).match("/reset-password") || state.url == "/forgot-password") {
                return true;
            }
            else {
                this.router.navigate(['']);
                return false;
            }
        }
    };
    AuthGuard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/services/data.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ngx_spinner__ = __webpack_require__("./node_modules/ngx-spinner/ngx-spinner.umd.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ngx_spinner___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ngx_spinner__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_crypto_js__ = __webpack_require__("./node_modules/crypto-js/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_crypto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng6_toastr_notifications__ = __webpack_require__("./node_modules/ng6-toastr-notifications/fesm5/ng6-toastr-notifications.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DataService = /** @class */ (function () {
    function DataService(http, toaster, route, spinner) {
        this.http = http;
        this.toaster = toaster;
        this.route = route;
        this.spinner = spinner;
        // baseUrl: string = "http://172.16.6.74:1406/api/v1/"; // LOCAL PRAMOD
        this.baseUrl = "http://dev.udir.io:1524/api/v1/"; //STAGING
        // baseUrl: string = "http://ec2-35-176-66-190.eu-west-2.compute.amazonaws.com:1522/api/v1/"; //EC2
        // baseUrl: string = "http://192.168.0.101:1522/api/v1/"; //wakar
        // baseUrl: String = 'http://172.16.16.232:1600/api/v1/'//Rajat Pathak
        // baseUrl: string = "http://172.16.1.122:1600/api/v1/"; //ABHAY LOCAL
        // baseUrl: string = "http://172.16.6.254:1600/api/v1/"; //MANSI LOCAL
        // baseUrl: string = "http://172.16.2.3:1600/api/v1/"; //najmu LOCAL
        this.emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
        this.encryptSecretKey = "123";
    }
    DataService.prototype.post = function (url, data, header) {
        if (header == 1) {
            var localData = JSON.parse(localStorage.getItem('remittance'));
            var headerss = { 'token': localData.token, 'userid': localData.id };
            return this.http.post(this.baseUrl + url, data, { headers: headerss });
        }
        else
            return this.http.post(this.baseUrl + url, data);
    };
    DataService.prototype.get = function (url, header) {
        if (header == 1) {
            var localData = JSON.parse(localStorage.getItem('remittance'));
            var headerss = { 'token': localData.token, 'userid': localData.id };
            return this.http.get(this.baseUrl + url, { headers: headerss });
        }
        else if (header == 2) {
            return this.http.get(this.baseUrl + url);
        }
        else {
            if (header) {
                var localData = JSON.parse(localStorage.getItem('remittance'));
                header.token = localData.token;
                header.userid = localData.id;
                return this.http.get(this.baseUrl + url, { headers: header });
            }
            else {
                return this.http.get(this.baseUrl + url);
            }
        }
    };
    DataService.prototype.encryptData = function (data) {
        return __WEBPACK_IMPORTED_MODULE_4_crypto_js__["AES"].encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
    };
    DataService.prototype.decryptData = function (data) {
        try {
            var bytes = __WEBPACK_IMPORTED_MODULE_4_crypto_js__["AES"].decrypt(data, this.encryptSecretKey);
            if (bytes.toString()) {
                return JSON.parse(bytes.toString(__WEBPACK_IMPORTED_MODULE_4_crypto_js__["enc"].Utf8));
            }
            return data;
        }
        catch (e) {
        }
    };
    DataService.prototype.logOut = function () {
        localStorage.removeItem("remittance");
        this.route.navigate(['/login']);
    };
    DataService.prototype.spinnerShow = function () {
        this.spinner.show();
    };
    DataService.prototype.spinnerHide = function () {
        this.spinner.hide();
    };
    DataService.prototype.successToastr = function (msg) {
        this.toaster.successToastr(msg, '', {
            toastTimeout: 3000
        });
    };
    DataService.prototype.errorToastr = function (msg) {
        this.toaster.errorToastr(msg, '', {
            toastTimeout: 3000
        });
    };
    //------------------------------ GET LIST OF COUNTRIES ------------------------------//
    DataService.prototype.getJson = function () {
        return this.http.get('assets/json/countries.json');
    };
    DataService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_5_ng6_toastr_notifications__["a" /* ToastrManager */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */], __WEBPACK_IMPORTED_MODULE_0_ngx_spinner__["NgxSpinnerService"]])
    ], DataService);
    return DataService;
}());



/***/ }),

/***/ "./src/app/transaction-management/transaction-management.component.css":
/***/ (function(module, exports) {

module.exports = ".class-button{\n    min-width: 120px;;\n    border: 1px solid #e5e5e5;\n    border-radius: 3px;\n    background: #4272d7;\n    margin-left: -3px;\n    height: 30px;\n    color: white;\n}\n.inlineTag{\n    display:-webkit-box;\n    display:-ms-flexbox;\n    display:flex;\n}\n.twoBtn{\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n.table.table-data2 thead{\n    background: #fff;\n}\n.inlineTag input [type=text]{\n    width:100%;\n    min-width:350px;\n}\n.au-input--xl{\n    widows: 100% !important;\n    min-width:350px!important;\n}\n.table-data2.table thead th{\n    padding:14px!important;\n}\n.table-data2.table tbody td{\n    padding:14px!important;\n}\n.table.table-data2.custom-dtd th{\n    padding:14px;\n    padding-bottom: 8px;\n    text-align: center;\n    }\n.table.table-data2.custom-dtd .tr-shadow td{\n        padding:14px;\n        padding-bottom: 8px;\n        text-align: center;\n        }"

/***/ }),

/***/ "./src/app/transaction-management/transaction-management.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"page-wrapper\">\n  <!-- HEADER MOBILE-->\n  <app-sidebar></app-sidebar>\n  <!-- PAGE CONTAINER-->\n  <div class=\"page-container\">\n    <!-- HEADER DESKTOP-->\n    <header class=\"header-desktop\">\n      <div class=\"section__content section__content--p30\">\n        <div class=\"container-fluid\">\n        </div>\n      </div>\n      <nav class=\"navbar-sidebar\" style=\"display:none\">\n        <div class=\"nav\" id=\"nav-tab\" role=\"tablist\">\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'dashboard')}\"\n            [routerLink]=\"('/dashboard')\">Dashboard</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'user-management')}\"\n            [routerLink]=\"('/user-management')\">User Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'vendor-management')}\"\n            [routerLink]=\"('/vendor-management')\">Vendor Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'transaction-management')}\"\n            [routerLink]=\"('/transaction-management')\">Transaction Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'branch-management')}\"\n            [routerLink]=\"('/branch-management')\">Branch Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'settings')}\"\n            [routerLink]=\"('/settings')\">Settings</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'edit-profile')}\"\n            [routerLink]=\"('/edit-profile')\">Edit Profile</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'view-faqs')}\"\n            [routerLink]=\"('/view-faqs')\">FAQ</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'terms-conditions')}\"\n            [routerLink]=\"('/terms-conditions')\">Terms and Conditions</a>\n          <a class=\"nav-item nav-link\" data-toggle=\"modal\" style=\"cursor: pointer; color: #007bff\"\n            data-target=\"#logoutModal\">Logout</a>\n        </div>\n      </nav>\n    </header>\n    <!-- HEADER DESKTOP-->\n    <app-spinner></app-spinner>\n    <!-- MAIN CONTENT-->\n    <div class=\"main-content\">\n      <div class=\"section__content section__content--p30\">\n        <div class=\"container-fluid\">\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              <!-- DATA TABLE -->\n              <h3 class=\"title-5 m-b-35\">Transaction Management</h3>\n              <div class=\"table-data__tool\">\n                <div class=\"table-data__tool-left\">\n                  <div class=\"rs-select2--light inlineTag\" >\n                    <!-- <form class=\"form-header\" action=\"\" method=\"POST\"> -->\n                    <input class=\"au-input au-input--xl\" type=\"text\" name=\"search\" [(ngModel)]=\"searchKey\" id=\"search\"\n                      placeholder=\"Search by transcation type\" />\n                    <div class=\"twoBtn mt-2 ml-4\">\n                      <button (click)=\"pageChange()\" class=\"au-btn--submit\" type=\"submit\" >\n                        <i class=\"zmdi zmdi-search\"></i>\n                      </button>\n                      <button (click)=\"refresh()\" class=\"au-btn--submit ml-2\" >\n                        <i class=\"zmdi zmdi-refresh\"></i>\n                      </button>\n                      <div style=\"display: flex;\" >\n                        <button class=\"class-button ml-2\" (click)=\"searchStatus('RECEIVE') \" >\n                          RECEIVE\n                        </button>\n                        <button class=\"class-button ml-2\" (click)=\"searchStatus('SEND')\" >\n                          SEND\n                        </button>\n                        <button class=\"class-button ml-2\" (click)=\"searchStatus('WITHDRAW')\" >\n                          WITHDRAW\n                        </button>\n                      </div>\n                    </div>\n                    <!-- </form> -->\n                  </div>\n                </div>\n                <div class=\"table-data__tool-right\">\n                </div>\n              </div>\n              <div class=\"table-responsive table-responsive-data2\">\n                <table class=\"table table-data2 custom-dtd\">\n                  <thead>\n                    <tr>\n                      <th>S. No.</th>\n                      <th>User Name</th>\n                      <!-- <th>Wallet Address</th> -->\n                      <th>Transaction ID</th>\n                      <th>Email</th>\n                      <th>Phone No.</th>\n                      <th>Date & Time</th>\n                      <th>Type</th>\n                      <th>Transaction Status</th>\n                      <th>Amount</th>\n                    </tr>\n                  </thead>\n                  <tr *ngIf=\"transaction == null\">\n                    <td colspan=\"8\">\n                      <h3>No vendor found.</h3>\n                    </td>\n                  </tr>\n                  <tr *ngIf=\"transaction?.length == 0\">\n                    <td colspan=\"8\">\n                      <h3>No vendor found for keyword \"{{searchKey}}\".</h3>\n                    </td>\n                  </tr>\n\n                  <tbody *ngFor=\"let item of transaction | paginate:{\n                  itemsPerPage: limit,\n                  currentPage: page,\n                  totalItems: totalvendors }; let i = index\">\n                    <tr class=\"tr-shadow\">\n                      <td>{{limit * (page - 1) + i + 1}}</td>\n                      <td>{{item?.toFirstName}}</td>\n                      <td>{{item?._id}}</td>\n                      <td>{{item?.toEmail}}</td>\n                      <td>{{item?.toMobileNumber}}</td>\n                      <td>{{item?.updatedAt | date : \"medium\"}}</td>\n                      <td>{{item?.transactionType}}</td>\n                      <td>{{item?.transactionStatus || 'ACCEPTED'}}</td>\n                      <td>{{item?.senderCurrency}}&nbsp;{{item?.senderAmount}}</td>\n                    </tr>\n                    <tr class=\"spacer\"></tr>\n                  </tbody>\n                </table>\n              </div>\n              \n              <div style=\"text-align: center; margin-top: 5px;\">\n                <pagination-controls (pageChange)=\"pageChange($event)\" responsive=\"true\" autoHide=\"true\"\n                  responsive=\"true\" previousLabel=\"Previous\" nextLabel=\"Next\">\n                </pagination-controls>\n              </div>\n              <!-- END DATA TABLE -->\n            </div>\n          </div>\n\n        </div>\n      </div>\n    </div>\n    <!-- END MAIN CONTENT-->\n    <!-- END PAGE CONTAINER-->\n  </div>\n\n</div>\n<footer>\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <div class=\"copyright\">\n        <p>Copyright © 2019 Remittance - A digital Wallet. All rights reserved.</p>\n      </div>\n    </div>\n  </div>\n</footer>"

/***/ }),

/***/ "./src/app/transaction-management/transaction-management.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransactionManagementComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_data_service__ = __webpack_require__("./src/app/services/data.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TransactionManagementComponent = /** @class */ (function () {
    function TransactionManagementComponent(dataService, route) {
        var _this = this;
        this.dataService = dataService;
        this.route = route;
        this.searchKey = null;
        this.page = 1;
        this.transaction = [];
        this.route.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* NavigationEnd */]) {
                _this.currUrl = event.url.split('/')[1];
            }
        });
    }
    TransactionManagementComponent.prototype.ngOnInit = function () {
        this.refresh();
    };
    TransactionManagementComponent.prototype.refresh = function () {
        this.searchKey = "";
        this.pageChange(1);
        this.searchKey = "";
    };
    TransactionManagementComponent.prototype.pageChange = function (currentPage) {
        var _this = this;
        this.dataService.spinnerShow();
        this.dataService.post("admin/transactionHistory", {
            search: this.searchKey,
            limit: 10,
            page: currentPage
        }, 1).subscribe(function (res) {
            _this.dataService.spinnerHide();
            if (res.response_code == 200) {
                _this.transaction = res.result.docs;
                _this.limit = res.result.limit;
                _this.pages = res.result.pages;
                _this.page = res.result.page;
                _this.totalvendors = res.result.total;
            }
            else if (res.response_code == 403 || res.response_code == 409 || res.response_code == 404 || res.response_code == 401) {
                _this.dataService.errorToastr(res.response_message);
                // this.dataService.logOut();
            }
            else {
                _this.dataService.errorToastr("Cannot get the users.");
            }
        }, function (err) {
            _this.dataService.spinnerHide();
            _this.dataService.errorToastr("Cannot get the users.");
        });
    };
    TransactionManagementComponent.prototype.searchStatus = function (value) {
        this.searchKey = value;
        this.pageChange(1);
    };
    TransactionManagementComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-transaction-management',
            template: __webpack_require__("./src/app/transaction-management/transaction-management.component.html"),
            styles: [__webpack_require__("./src/app/transaction-management/transaction-management.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]])
    ], TransactionManagementComponent);
    return TransactionManagementComponent;
}());



/***/ }),

/***/ "./src/app/vendor-profile/vendor-profile.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/vendor-profile/vendor-profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"page-wrapper\">\n  <!-- HEADER MOBILE-->\n  <app-sidebar></app-sidebar>\n  <!-- PAGE CONTAINER-->\n  <div class=\"page-container\">\n    <!-- HEADER DESKTOP-->\n    <header class=\"header-desktop\">\n      <div class=\"section__content section__content--p30\">\n        <div class=\"container-fluid\">\n        </div>\n      </div>\n      <nav class=\"navbar-sidebar\" style=\"display:none\">\n        <div class=\"nav\" id=\"nav-tab\" role=\"tablist\">\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'dashboard')}\" [routerLink]=\"('/dashboard')\">Dashboard</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'user-management')}\" [routerLink]=\"('/user-management')\">User Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'vendor-management')}\" [routerLink]=\"('/vendor-management')\">Vendor Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'transaction-management')}\" [routerLink]=\"('/transaction-management')\">Transaction Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'branch-management')}\" [routerLink]=\"('/branch-management')\">Branch Management</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'settings')}\" [routerLink]=\"('/settings')\">Settings</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'edit-profile')}\" [routerLink]=\"('/edit-profile')\">Edit Profile</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'view-faqs')}\" [routerLink]=\"('/view-faqs')\">FAQ</a>\n          <a class=\"nav-item nav-link\" [ngClass]=\"{'active': (currUrl == 'terms-conditions')}\" [routerLink]=\"('/terms-conditions')\">Terms and Conditions</a>\n          <a class=\"nav-item nav-link\" data-toggle=\"modal\" style=\"cursor: pointer; color: #007bff\" data-target=\"#logoutModal\">Logout</a>\n        </div>\n      </nav>\n    </header>\n    <!-- HEADER DESKTOP-->\n<app-spinner></app-spinner>\n    <!-- MAIN CONTENT-->\n    <div class=\"main-content\">\n      <div class=\"section__content section__content--p30\">\n        <div class=\"container-fluid\">\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              <!-- DATA TABLE -->\n              <h3 class=\"title-5 m-b-35\">User Details</h3>\n              <div class=\"row\">\n                <div class=\"col-lg-12\">\n                  <div class=\"au-card recent-report\">\n                    <div class=\"au-card-inner\">\n                      <button [routerLink]=\"['/vendor-management']\" type=\"submit\" class=\"btn btn-primary btn-sm\">Back</button><hr/>\n                      <div *ngIf=\"user\" >\n                          <div class=\"profile_pic\" style=\"display: flex;justify-content: center;\">\n                            <img src=\"assets/images/icon/avatar-05.jpg\" alt=\"...\" class=\"img-circle profile_img\">\n                          </div>\n                          <hr/>\n                          <div class=\"table-responsive table-responsive-data2\">\n                            <table class=\"table table-data2\">\n                              <tbody>\n                                <tr>\n                                  <td>\n                                    <strong>Username:</strong>\n                                  </td>\n                                  <td>\n                                    {{user?.userName}}\n                                  </td>\n                                </tr>\n                                <tr class=\"spacer\"></tr>\n                                <tr>\n                                  <td>\n                                    <strong>First name:</strong>\n                                  </td>\n                                  <td>\n                                    {{user?.firstName}}\n                                  </td>\n                                </tr>\n                                <tr class=\"spacer\"></tr>\n                                <tr>\n                                  <td>\n                                    <strong>Middle Name:</strong>\n                                  </td>\n                                  <td>\n                                    {{user?.middleName}}\n                                  </td>\n                                </tr>\n                                <tr class=\"spacer\"></tr>\n                                <tr>\n                                  <td>\n                                    <strong>Last name:</strong>\n                                  </td>\n                                  <td>\n                                    {{user?.lastName}}\n                                  </td>\n                                </tr>\n                                <tr class=\"spacer\"></tr>\n                                <tr>\n                                  <td>\n                                    <strong>Email:</strong>\n                                  </td>\n                                  <td>\n                                    {{user?.email}}\n                                  </td>\n                                </tr>\n                                <tr class=\"spacer\"></tr>\n                                <tr>\n                                  <td>\n                                    <strong>Mobile number:</strong>\n                                  </td>\n                                  <td>\n                                    {{user?.mobileNumber}}\n                                  </td>\n                                </tr>\n                                <tr class=\"spacer\"></tr>\n                                <tr>\n                                  <td>\n                                    <strong>Country:</strong>\n                                  </td>\n                                  <td>\n                                    {{user?.country}}\n                                  </td>\n                                </tr>\n                                <tr class=\"spacer\"></tr>\n                              </tbody>\n                            </table>\n                          </div>\n                      </div>\n                      <div *ngIf=\"!user\" style=\"text-align: center;\">\n                        <br/>\n                        <h3>No user exist.</h3>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n          \n        </div>\n      </div>\n    </div>\n    <!-- END MAIN CONTENT-->\n    <!-- END PAGE CONTAINER-->\n  </div>\n\n</div>\n<footer>\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <div class=\"copyright\">\n        <p>Copyright © 2019 Remittance - A digital Wallet. All rights reserved.</p>\n      </div>\n    </div>\n  </div>\n</footer>\n"

/***/ }),

/***/ "./src/app/vendor-profile/vendor-profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VendorProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng6_toastr_notifications__ = __webpack_require__("./node_modules/ng6-toastr-notifications/fesm5/ng6-toastr-notifications.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_data_service__ = __webpack_require__("./src/app/services/data.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var VendorProfileComponent = /** @class */ (function () {
    function VendorProfileComponent(actRoute, dataService, toaster, route) {
        var _this = this;
        this.actRoute = actRoute;
        this.dataService = dataService;
        this.toaster = toaster;
        this.route = route;
        this.route.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* NavigationEnd */]) {
                _this.currUrl = event.url.split('/')[1];
            }
        });
    }
    VendorProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (navigator.onLine) {
            this.userId = this.actRoute.params;
            console.log(this.userId._value.id);
            var url = "admin/viewVendor";
            // console.log(url);
            this.dataService.get(url, 2).subscribe(function (res) {
                // console.log("Response", res);
                if (res.response_code === 200) {
                    _this.user = res.result.result;
                }
                // else if(res.response_code == 403 || res.response_code == 409 || res.response_code == 404 || res.response_code == 401){
                //   this.toaster.dismissAllToastr();
                //   this.toaster.errorToastr(res.response_message);
                //   this.dataService.logOut();
                // }else{
                //   this.toaster.dismissAllToastr();
                //   this.toaster.errorToastr(res.response_message);
                // }
            }, function (err) {
                console.log("Error", err);
            });
        }
        else {
            this.toaster.dismissAllToastr();
            this.toaster.errorToastr("Your internet connection seems to be lost!");
        }
    };
    VendorProfileComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-vendor-profile',
            template: __webpack_require__("./src/app/vendor-profile/vendor-profile.component.html"),
            styles: [__webpack_require__("./src/app/vendor-profile/vendor-profile.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_3__services_data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_2_ng6_toastr_notifications__["a" /* ToastrManager */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]])
    ], VendorProfileComponent);
    return VendorProfileComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map