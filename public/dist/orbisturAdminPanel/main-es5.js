function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
  /***/
  "./$$_lazy_route_resource lazy recursive":
  /*!******************************************************!*\
    !*** ./$$_lazy_route_resource lazy namespace object ***!
    \******************************************************/

  /*! no static exports found */

  /***/
  function $$_lazy_route_resourceLazyRecursive(module, exports) {
    function webpackEmptyAsyncContext(req) {
      // Here Promise.resolve().then() is used instead of new Promise() to prevent
      // uncaught exception popping up in devtools
      return Promise.resolve().then(function () {
        var e = new Error("Cannot find module '" + req + "'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
      });
    }

    webpackEmptyAsyncContext.keys = function () {
      return [];
    };

    webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
    module.exports = webpackEmptyAsyncContext;
    webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/add-customer/add-customer.component.html":
  /*!************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/add-customer/add-customer.component.html ***!
    \************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppAddCustomerAddCustomerComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-sidebar></app-sidebar>\n<div class=\"content-wrapper\">\n    <section class=\"content-header\">\n            <h3 class=\"box-title\">Customer Management / Add</h3>\n        <div class=\"box box-warning wr\">\n        \n            <div class=\"box-header with-border\">\n                    <label for=\"file-input\">\n                <img  class=\"imgs\" [src]=\"profile?profile:'assets/adminLTE/dist/img/editUser.png'\">\n               <!-- <img class=\"imgs\" src=\"assets/adminLTE/dist/img/editUser.png\"> -->\n               <input id=\"file-input\" type=\"file\" name=\"imageUrl\" accept=\"image/*\" (change)=\"handleInputChange($event)\" style=\"display: none;\" />\n                        </label>\n            </div>\n        \n            <!-- /.box-header -->\n            <div class=\"box-body bd\">\n                <form role=\"form\" [formGroup]=\"addCustomerForm\">\n                    <!-- text input -->\n                    <img>\n                    <div class=\"form-group\">\n                        <input type=\"text\" class=\"form-control\" formControlName=\"name\" placeholder=\"Please enter name\" (keypress)=\"service.preventSpace($event)\">\n                        <span *ngIf=\"addCustomerForm.get('name').hasError('required') && addCustomerForm.get('name').touched\"><span\n                            style=\"color:red;\">*Please enter your name.</span></span>\n                    <span *ngIf=\"addCustomerForm.controls['name'].hasError('minlength')\"><span\n                            style=\"color:red;\">*Minlength should\n                            be 2 characters.</span></span>\n    \n                    <span *ngIf=\"addCustomerForm.controls['name'].hasError('maxlength')\"><span\n                            style=\"color:red;\">*Maxlength should\n                            be 60 characters.</span></span>\n                    <span *ngIf=\"addCustomerForm.controls['name'].hasError('pattern')\"><span\n                            style=\"color:red;\">*Don't use Special characters.</span></span>\n                    </div>\n                  \n                    <div class=\"form-group\">\n                        <input type=\"text\" class=\"form-control\"  formControlName=\"email\" placeholder=\"Please enter email id\">\n                        <span *ngIf=\"addCustomerForm.get('email').hasError('required') && addCustomerForm.get('email').touched\">\n                                <span style=\"color:red;\">*Please enter email id.</span></span>\n        \n                            <span *ngIf=\"addCustomerForm.controls['email'].hasError('maxlength')\"><span\n                                    style=\"color:red;\">*Maxlength should be 60 characters.</span></span>\n                            <span *ngIf=\"addCustomerForm.controls['email'].hasError('pattern')\"><span\n                                    style=\"color:red;\">*Please enter valid email id.</span>\n        \n                            </span>\n                    </div>\n                   \n                    \n\n                    <!-- textarea -->\n                    <div class=\"form-group\">\n                \n                                <input type=\"tel\" class=\"form-control mob\" placeholder=\"\" id=\"phoneNumber\" formControlName=\"number\" maxlength=\"20\" (keyup)=\"toCheckSpaceChar()\">\n                                <div *ngIf=\"addCustomerForm.get('number').errors && addCustomerForm.get('number').touched || addCustomerForm.get('number').dirty\">\n                                    <div *ngIf=\"addCustomerForm.get('number').hasError('required'); else elseBlock\" style=\"color: red\">*Phone number is required.</div>\n                                    <ng-template #elseBlock>\n                                        <div *ngIf=\"isValidNumber == false\" style=\"color: red\">*Please enter valid number.\n                                        </div>\n                                    </ng-template>\n                                </div>\n    \n                    </div>\n                   \n                    <div class=\"form-group\">\n                        <input type=\"password\" class=\"form-control\"  formControlName=\"password\" placeholder=\"Password\">\n                        <span\n                        *ngIf=\"addCustomerForm.get('password').hasError('required') && addCustomerForm.get('password').touched\">\n                        <span style=\"color:red;\">*Password is required</span></span>\n                    <span *ngIf=\"addCustomerForm.controls['password'].hasError('minlength')\"><span\n                            style=\"color:red;\">*Maxlength should be 8 characters.</span></span>\n    \n                    <span *ngIf=\"addCustomerForm.controls['password'].hasError('maxlength')\"><span\n                            style=\"color:red;\">*Maxlength should be 16 characters.</span></span>\n    \n                    <span *ngIf=\"addCustomerForm.get('password').hasError('pattern') && addCustomerForm.get('password').dirty\">\n                        <span style=\"color:red;\"> *Password must contain characters, digits and one\n                            special character(Min character-8).</span>\n                    </span>\n                    </div>\n                  \n                    <div class=\"form-group\">\n                        <input type=\"password\" class=\"form-control\"  formControlName=\"confirmPassword\" placeholder=\"Confirm Password\">\n                        <span\n                        *ngIf=\"addCustomerForm.get('confirmPassword').hasError('required') && addCustomerForm.get('confirmPassword').touched\">\n                        <span style=\"color:red;\">*Confirm Password is required.</span></span>\n                    <span\n                        *ngIf=\"(addCustomerForm.value.password != addCustomerForm.value.confirmPassword) && addCustomerForm.get('confirmPassword').dirty\">\n                        <span style=\"color:red;\">*Confirm password & new password should be\n                            same.</span></span>\n                    </div> \n                  \n                    <div class=\"form-group\">\n                            <textarea class=\"form-control\" rows=\"3\" (keypress)=\"service.preventSpace($event)\"  formControlName=\"address\" placeholder=\"Address...\"></textarea>\n                            <span\n                            *ngIf=\"addCustomerForm.get('address').hasError('required') && addCustomerForm.get('address').touched\">\n                            <span style=\"color:red;\">*Address is required.</span></span>\n                            <span *ngIf=\"addCustomerForm.controls['address'].hasError('maxlength')\"><span\n                                style=\"color:red;\">*Maxlength should be 256 characters.</span></span>\n                      \n                          </div>\n                    \n            \n             \n             \n              \n                <!-- [disabled]=\"!addaddCustomerForm.valid\" -->\n                          <div class=\"form-group add\">\n                        <button class=\"btn btn-success btn\" (click)=\"addCustomer()\" [disabled]=\"!addCustomerForm.valid\" >ADD</button>                              \n                </div>\n                </form>\n\n\n            </div>\n    \n            <!-- /.box-body -->\n        </div>\n    </section>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/add-package-management/add-package-management.component.html":
  /*!********************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/add-package-management/add-package-management.component.html ***!
    \********************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppAddPackageManagementAddPackageManagementComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-sidebar></app-sidebar>\n<div class=\"content-wrapper\">\n    <section class=\"content-header\">\n        <h3 class=\"box-title\">Package Management / Add</h3>\n        <div class=\"box box-warning wr\">\n               \n            <div class=\"box-header with-border\">\n               \n              \n            </div>\n            <!-- <div class=\"image-upload\" style=\"display: flex;justify-content: center;padding: 60px;\">\n                    <label for=\"file-input\">\n                      <img class=\"imgg\" [src]=\"profile\" src=\"assets/i18n/ak.png\" />\n                      <img class=\"immgs\" src=\"assets/i18n/editimage.png\" />\n                    </label>\n              \n                    <input id=\"file-input\" type=\"file\" name=\"imageUrl\" accept=\"image/*\" (change)=\"handleInputChange($event)\" />\n                  </div> -->\n\n            <!-- /.box-header -->\n            <div class=\"box-body bd\">\n                    <div>\n                            <label for=\"file-input\">\n                                    <img class=\"imgs\" [src]=\"profile?profile:'assets/i18n/images (5).jpeg'\">\n                            </label>\n                          \n                            <input id=\"file-input\" type=\"file\" name=\"imageUrl\"  accept=\"image/*\"\n                            (change)=\"handleInputChange($event)\" />\n    \n                    </div>\n                <form role=\"form\" [formGroup]=\"addpackageForm\">\n                    <!-- text input -->\n                   \n                    <div class=\"form-group\">\n                        <label>Country:</label>\n                        <select class=\"form-control selectCountry\" formControlName=\"country\">\n                            <option value=\"\">Select country</option>\n                            <option value=\"{{item._id}}\" *ngFor=\"let item of countryList\">{{item.country}}</option>\n                        </select>\n                      \n                    </div>\n\n                    <div class=\"form-group\">\n                        <label>Destination:</label>\n                        <select class=\"form-control selectCountry\" formControlName=\"destination\">\n                            <option value=\"\">Select destination</option>\n                            <option value=\"{{item._id}}\" *ngFor=\"let item of destinationLists\">{{item.destination}}</option>\n                        </select>\n                      \n                    </div>\n\n\n                    <div class=\"form-group\">\n                        <label>Package Type:</label>\n                        <select class=\"form-control selectCountry\" formControlName=\"packagetype\">\n                            <option value=\"\">--Choose--</option>\n                            <option value=\"{{item._id}}\" *ngFor=\"let item of packageLists\">{{item.type}}</option>\n                        </select>\n                      \n                    </div>\n                  \n                    <div class=\"form-group\">\n                            <label>Package Name:</label>\n                        <input type=\"text\" class=\"form-control\" formControlName=\"packagename\" (keypress)=\"service.preventSpace($event)\" placeholder=\"Please enter package name\"\n                            (keypress)=\"service.preventSpace($event)\">\n\n                            <!-- <span *ngIf=\"addSubAdminForm.get('packagename').hasError('required') && addSubAdminForm.get('packagename').touched\">\n                        <span style=\"color:red;\">*Please enter your package name.</span></span> -->\n                    <!-- <span *ngIf=\"addSubAdminForm.controls['packagename'].hasError('minlength')\">\n                            style=\"color:red;\">*Minlength should\n                            be 2 characters.</span>\n\n                    <span *ngIf=\"addSubAdminForm.controls['packagename'].hasError('maxlength')\"><span\n                            style=\"color:red;\">*Maxlength should\n                            be 60 characters.</span></span>\n                    <span *ngIf=\"addSubAdminForm.controls['packagename'].hasError('pattern')\"><span style=\"color:red;\">*Don't\n                            use Special characters.</span></span> -->\n\n                    </div>\n\n                    <div class=\"form-group\">\n                            <label>Package Days:</label>\n                            <select class=\"form-control selectCountry\" formControlName=\"packagedays\">\n                                    <option value=\"\">--Choose--</option>\n                                    <option value=\"0\">0</option>\n                                    <option value=\"1\">1</option>\n                                    <option value=\"2\">2</option>\n                                    <option value=\"3\">3</option>\n                                    <option value=\"4\">4</option>\n                                    <option value=\"5\">5</option>\n                                    <option value=\"6\">6</option>\n                                    <option value=\"7\">7</option>\n                                    <option value=\"8\">8</option>\n                                    <option value=\"9\">9</option>\n                                    <option value=\"10\">10</option>\n                               \n                               \n                            </select>\n                          \n                        </div>\n\n                        <div class=\"form-group\">\n                                <label>Package Nights:</label>\n                                <select class=\"form-control selectCountry\" formControlName=\"packagenight\">\n                                        <option value=\"\">--Choose--</option>\n                                        <option value=\"\">--Choose--</option>\n                                        <option value=\"0\">0</option>\n                                        <option value=\"1\">1</option>\n                                        <option value=\"2\">2</option>\n                                        <option value=\"3\">3</option>\n                                        <option value=\"4\">4</option>\n                                        <option value=\"5\">5</option>\n                                        <option value=\"6\">6</option>\n                                        <option value=\"7\">7</option>\n                                        <option value=\"8\">8</option>\n                                        <option value=\"9\">9</option>\n                                        <option value=\"10\">10</option>                                </select>\n                              \n                            </div>\n\n\n\n                            \n\n                            <label>Package description:</label>\n                            <ck-editor name=\"editor1\" [config] = \"config\" [(ngModel)]=\"editorValue\" [ngModelOptions]=\"{standalone: true}\" language=\"en\" ></ck-editor>\n                            <br>\n                            <br>\n\n                            <!-- <div class=\"form-group\">\n                                <div class=\"row\"> -->\n                                    <!-- <div class=\"col-md-2\">\n                                        <input type=\"text\" class=\"form-control\" >\n\n                                    </div> -->\n                                    <!-- <ul>\n                                        <li>\n                                                ITINERY\n                                        </li>\n                                    </ul>\n\n                                    <div class=\"col-md-10\" style=\"width: 115%;\">\n                                        <input type=\"text\"  class=\"form-control\">\n                                    </div>\n\n                                </div>\n\n\n\n\n                            </div>\n\n                             -->\n\n                                    <!-- <h2 class=\"margin\">Itinery</h2>\n                                    <div class=\"outer_box\">\n                                        <input type=\"text\" formContorlName=\"itenery\"  class=\"outer_box\">\n                                    </div>  -->\n\n\n\n\n                                     \n                    <div class=\"form-group\">\n                            <label>Itenery:</label>\n                        <textarea type=\"text\" cols=\"30\" rows=\"10\" class=\"outer_box\" formControlName=\"Itinery\" (keypress)=\"service.preventSpace($event)\" placeholder=\"Please enter itenery\"\n                            (keypress)=\"service.preventSpace($event)\">\n                            </textarea>\n                    </div>\n\n\n\n                    <div class=\"form-group\">\n                            <label>Package Inclusion:</label>\n                        <textarea type=\"text\" cols=\"30\" rows=\"10\" class=\"outer_box\" formControlName=\"Packageinclusions\" (keypress)=\"service.preventSpace($event)\" placeholder=\"Please enter itenery\"\n                            (keypress)=\"service.preventSpace($event)\">\n                            </textarea>\n                    </div>\n\n                                   \n\n\n                    <div class=\"form-group\">\n                            <label>Exclusion:</label>\n                        <textarea type=\"text\" cols=\"30\" rows=\"10\" class=\"outer_box\" formControlName=\"Exclusions\" (keypress)=\"service.preventSpace($event)\" placeholder=\"Please enter itenery\"\n                            (keypress)=\"service.preventSpace($event)\">\n                            </textarea>\n                    </div>\n\n\n                   \n\n                    <div class=\"form-group\">\n                            <label>Terms & Condition:</label>\n                        <textarea type=\"text\" cols=\"30\" rows=\"10\" class=\"outer_box\" formControlName=\"Terms\" (keypress)=\"service.preventSpace($event)\" placeholder=\"Please enter itenery\"\n                            (keypress)=\"service.preventSpace($event)\">\n                            </textarea>\n                    </div>\n\n\n\n                    <div class=\"form-group\">\n                            <label>Package Cost:</label>\n                        <textarea type=\"text\" cols=\"30\" rows=\"10\" class=\"outer_box\" formControlName=\"Packagecost\" (keypress)=\"service.preventSpace($event)\" placeholder=\"Please enter itenery\"\n                            (keypress)=\"service.preventSpace($event)\">\n                            </textarea>\n                    </div>\n\n\n\n\n\n           \n\n\n\n                                    \n                                   \n                                \n                \n\n                    <div class=\"form-group\">\n                            <label>Cancellation Charges:</label>\n                        <textarea type=\"text\" cols=\"30\" rows=\"10\" class=\"outer_box\" formControlName=\"Cancellationcharges\" (keypress)=\"service.preventSpace($event)\" placeholder=\"Please enter itenery\"\n                            (keypress)=\"service.preventSpace($event)\">\n                            </textarea>\n                    </div>\n\n\n                                 <div class=\"form-group\">\n                                        <label>Flights Included:</label>\n                                        <select class=\"form-control selectCountry\" formControlName=\"flightsincluded\">\n                                            <option value=\"\">--Choose--</option>\n                                            <option value=\"YES\">Yes</option>\n                                                <option value=\"NO\">No</option\n>                                        </select>\n                                      \n                                    </div>\n\n                                    <div class=\"form-group\">\n                                            <label>Hotels Included:</label>\n                                            <select class=\"form-control selectCountry\" formControlName=\"Hotelsincluded\">\n                                                <option value=\"\">--Choose--</option>\n                                                <option value=\"YES\">Yes</option>\n                                                <option value=\"NO\">No</option>\n                                            </select>\n                                          \n                                        </div>\n\n\n\n\n\n                                        <div class=\"form-group\">\n                                                <label>Transfers Included:</label>\n                                                <select class=\"form-control selectCountry\" formControlName=\"Transfersincluded\">\n                                                        <option value=\"\">--Choose--</option>\n                                                        <option value=\"YES\">Yes</option>\n                                                        <option value=\"NO\">No</option>\n                                                </select>\n                                              \n                                            </div>\n                                            <div class=\"form-group\">\n                                                    <label>Transfers Category:</label>\n                                                    <select class=\"form-control selectCountry\" formControlName=\"Transferscategory\">\n                                                            <option value=\"\">--Choose--</option>\n                                                            <option value=\"{{item._id}}\" *ngFor=\"let item of transferLists\">{{item.category}}</option>\n\n                                                    </select>\n                                                  \n                                                </div>\n                                                <div class=\"form-group\">\n                                                        <label>Transfers Type:</label>\n                                                        <select class=\"form-control selectCountry\" formControlName=\"Transferstype\">\n                                                                <option value=\"\">--Choose--</option>\n                                                                <option value=\"{{item._id}}\" *ngFor=\"let item of transferTypeLists\">{{item.type}}</option>\n\n                                                        </select>\n                                                      \n                                                    </div>\n                                                    <!-- <div class=\"form-group row\">\n                                                           <div class=\"col-md-3\">\n                                                               <label for=\"\">Car Type</label>\n                                                           </div>\n                                                           <div class=\"col-md-7\" style=\"display: flex;\n                                                           justify-content: space-evenly;\">\n                                                                <input type=\"checkbox\"  formControlName=\"Cartype\">\n                                                                <label>Sedan</label>\n                                                                <input type=\"checkbox\"  formControlName=\"Cartype\">\n                                                                <label>Hatch Back</label>\n                                                                <input type=\"checkbox\"  formControlName=\"Cartype\">\n                                                                <label>SUV</label>\n                                                           </div>\n                                                           \n                                                        </div> -->\n                                                        <div class=\"form-group\">\n                                                                <label>Car Type:</label>\n                                                                <select class=\"form-control selectCountry\" formControlName=\"Cartype\">\n                                                                        <option value=\"\">--Choose--</option>\n                                                                        <option value=\"{{item._id}}\" *ngFor=\"let item of cartTypeLists\">{{item.carType}}</option>\n        \n                                                                </select>\n                                                              \n                                                            </div>\n                                  \n                                \n                                \n\n                                                    <div class=\"form-group\">\n                                                            <label>Sightseeing Included:</label>\n                                                            <select class=\"form-control selectCountry\" formControlName=\"Sightseeingincluded\">\n                                                                    <option value=\"\">--Choose--</option>\n                                                                    <option value=\"YES\">Yes</option>\n                                                                    <option value=\"NO\">No</option>\n                                                            </select>\n                                                          \n                                                        </div>\n\n\n                                                        <div class=\"form-group\">\n                                                                <label>Owner Name:</label>\n                                                            <input type=\"text\" class=\"form-control\" formControlName=\"Ownername\" (keypress)=\"service.preventSpace($event)\" placeholder=\"Please enter package name\"\n                                                                (keypress)=\"service.preventSpace($event)\">\n                                                        </div>\n\n                                                        <div class=\"form-group\">\n                                                                <label>Owner Contact:</label>\n                                                            <input type=\"text\" class=\"form-control\" formControlName=\"Ownercontact\" (keypress)=\"service.preventSpace($event)\" placeholder=\"Please enter package name\"\n                                                                (keypress)=\"service.preventSpace($event)\">\n                                                        </div>\n                                    \n\n                                                        <div class=\"form-group\">\n                                                                <label>Price Per Night:</label>\n                                                            <input type=\"text\" class=\"form-control\" formControlName=\"Pricepernight\" (keypress)=\"service.preventSpace($event)\" placeholder=\"Please enter package name\"\n                                                                (keypress)=\"service.preventSpace($event)\">\n                                                        </div>\n\n                                                        <div class=\"form-group\">\n                                                        <div class=\"activeinactiv\" style=\"margin-left: 8px;padding-top: 20px;\">\n                                                                <input type=\"radio\" class=\"activradio\" name=\"active\" value=\"ACTIVE\" [checked]=\"true\"\n                                                                    formControlName=\"active\" style=\"margin-left: 11%;\">\n                                                                <label>Active</label>\n                                                                <input type=\"radio\" name=\"Inactive\" value=\"INACTIVE\" formControlName=\"Inactive\"\n                                                                    style=\"margin-left: 41px;;\">\n                                                                <label>Inactive</label>\n                                                            </div>\n                                                        </div>\n                                    \n                                    \n                                    \n                                    \n                                    \n                                    \n                    \n\n\n        \n                 \n                    <!-- [disabled]=\"!addaddSubAdminForm.valid\" [disabled]=\"!addSubAdminForm.valid\"-->\n                    <div class=\"form-group add\">\n                        <button class=\"btn btn-success btn\" (click)=\"addpackage()\" [routerLink]=\"['/package-management']\"\n                            >ADD</button>\n                    </div>\n                </form>\n\n\n            </div>\n\n            <!-- /.box-body -->\n        </div>\n    </section>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/add-sub-admin-management/add-sub-admin-management.component.html":
  /*!************************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/add-sub-admin-management/add-sub-admin-management.component.html ***!
    \************************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppAddSubAdminManagementAddSubAdminManagementComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-sidebar></app-sidebar>\n<div class=\"content-wrapper\">\n    <section class=\"content-header\">\n        <h3 class=\"box-title\">Sub-Admin Management / Add</h3>\n        <div class=\"box box-warning wr\">\n\n            <div class=\"box-header with-border\">\n                <label for=\"file-input\">\n                    <img class=\"imgs\" [src]=\"profile?profile:'assets/adminLTE/dist/img/editUser.png'\">\n                    <!-- <img class=\"imgs\" src=\"assets/adminLTE/dist/img/editUser.png\"> -->\n                    <input id=\"file-input\" type=\"file\" name=\"imageUrl\" accept=\"image/*\"\n                        (change)=\"handleInputChange($event)\" style=\"display: none;\" />\n                </label>\n            </div>\n\n            <!-- /.box-header -->\n            <div class=\"box-body bd\">\n                <form role=\"form\" [formGroup]=\"addSubAdminForm\">\n                    <!-- text input -->\n                    <img>\n                    <div class=\"form-group\">\n                        <input type=\"text\" class=\"form-control\" formControlName=\"name\" (keypress)=\"service.preventSpace($event)\" placeholder=\"Please enter name\"\n                            (keypress)=\"service.preventSpace($event)\">\n\n                            <span\n                        *ngIf=\"addSubAdminForm.get('name').hasError('required') && addSubAdminForm.get('name').touched\">\n                        <span style=\"color:red;\">*Please enter your name.</span></span>\n                    <span *ngIf=\"addSubAdminForm.controls['name'].hasError('minlength')\">\n                            style=\"color:red;\">*Minlength should\n                            be 2 characters.</span>\n\n                    <span *ngIf=\"addSubAdminForm.controls['name'].hasError('maxlength')\"><span\n                            style=\"color:red;\">*Maxlength should\n                            be 60 characters.</span></span>\n                    <span *ngIf=\"addSubAdminForm.controls['name'].hasError('pattern')\"><span style=\"color:red;\">*Don't\n                            use Special characters.</span></span>\n\n                    </div>\n                    \n\n\n                    <div class=\"form-group\">\n                        <input type=\"text\" class=\"form-control\" formControlName=\"email\"\n                            placeholder=\"Please enter email id\">\n\n                            <span\n                        *ngIf=\"addSubAdminForm.get('email').hasError('required') && addSubAdminForm.get('email').touched\">\n                        <span style=\"color:red;\">*Please enter email id.</span></span>\n\n                    <span *ngIf=\"addSubAdminForm.controls['email'].hasError('maxlength')\"><span\n                            style=\"color:red;\">*Maxlength should be 60 characters.</span></span>\n                    <span *ngIf=\"addSubAdminForm.controls['email'].hasError('pattern')\"><span style=\"color:red;\">*Please\n                            enter valid email id.</span>\n\n                    </span>\n\n                    </div>\n                    \n\n\n\n                    <!-- textarea -->\n                    <div class=\"form-group\">\n                   \n                                <input type=\"tel\" class=\"form-control mob\" placeholder=\"\" id=\"phoneNumber\" formControlName=\"number\" maxlength=\"20\" (keyup)=\"toCheckSpaceChar()\">\n                                <div *ngIf=\"addSubAdminForm.get('number').errors && addSubAdminForm.get('number').touched || addSubAdminForm.get('number').dirty\">\n                                    <div *ngIf=\"addSubAdminForm.get('number').hasError('required'); else elseBlock\" style=\"color: red\">*Phone number is required.</div>\n                                    <ng-template #elseBlock>\n                                        <div *ngIf=\"isValidNumber == false\" style=\"color: red\">*Please enter valid number.\n                                        </div>\n                                    </ng-template>\n                                </div>\n    \n                    </div>\n                   \n\n                    <div class=\"form-group\">\n                        <input type=\"password\" class=\"form-control\" formControlName=\"password\" placeholder=\"Password\">\n\n                        <span\n                        *ngIf=\"addSubAdminForm.get('password').hasError('required') && addSubAdminForm.get('password').touched\">\n                        <span style=\"color:red;\">*Password is required</span></span>\n                    <span *ngIf=\"addSubAdminForm.controls['password'].hasError('minlength')\"><span\n                            style=\"color:red;\">*Maxlength should be 8 characters.</span></span>\n\n                    <span *ngIf=\"addSubAdminForm.controls['password'].hasError('maxlength')\"><span\n                            style=\"color:red;\">*Maxlength should be 16 characters.</span></span>\n\n                    <span\n                        *ngIf=\"addSubAdminForm.get('password').hasError('pattern') && addSubAdminForm.get('password').dirty\">\n                        <span style=\"color:red;\"> *Password must contain characters, digits and one\n                            special character(Min character-8).</span>\n                    </span>\n                    </div>\n                   \n\n\n\n                    <div class=\"form-group\">\n                        <input type=\"password\" class=\"form-control\" formControlName=\"confirmPassword\"\n                            placeholder=\"Confirm Password\">\n                            <span\n                            *ngIf=\"addSubAdminForm.get('confirmPassword').hasError('required') && addSubAdminForm.get('confirmPassword').touched\">\n                            <span style=\"color:red;\">*Confirm Password is required.</span></span>\n                        <span\n                            *ngIf=\"(addSubAdminForm.value.password != addSubAdminForm.value.confirmPassword) && addSubAdminForm.get('confirmPassword').dirty\">\n                            <span style=\"color:red;\">*Confirm password & new password should be.\n                                same.</span></span>\n    \n                    </div>\n                  \n\n\n                    <div class=\"form-group\">\n                        <textarea class=\"form-control\" rows=\"3\" formControlName=\"address\"\n                            placeholder=\"Address...\"></textarea>\n                            <span\n                            *ngIf=\"addSubAdminForm.get('address').hasError('required') && addSubAdminForm.get('address').touched\">\n                            <span style=\"color:red;\">*Address is required.</span></span>\n                            <span *ngIf=\"addSubAdminForm.controls['address'].hasError('maxlength')\"><span\n                                style=\"color:red;\">*Maxlength should be 256 characters.</span></span>\n    \n                    </div>\n                  \n\n                    <div class=\"form-group\">\n                        <label style=\"font-size: 20px;\">Access Right & Permissions :</label>\n                    </div>\n                    <div class=\"userEvent\">\n                        <input type=\"checkbox\" formControlName=\"dashboard\">\n                        <label>Dashboard </label>\n                    </div>\n                    <div class=\"userEvent\">\n                        <input type=\"checkbox\" formControlName=\"customerManagement\">\n                        <label>Customer Management </label>\n                        <input type=\"checkbox\" formControlName=\"subAdminManagement\" class=\"event1\">\n                        <label>SubAdmin Management</label>\n                    </div>\n                    <div class=\"userEvent\">\n                        <input type=\"checkbox\" formControlName=\"packageManagement\">\n                        <label>Package Management </label>\n                        <input type=\"checkbox\" formControlName=\"bookingManagement\" class=\"event2\">\n                        <label>Booking Management</label>\n                    </div>\n                    <div class=\"userEvent\">\n                        <input type=\"checkbox\" formControlName=\"transferManagement\">\n                        <label>Transfer Management </label>\n                        <input type=\"checkbox\" class=\"event3\" formControlName=\"sightseeingManagement\">\n                        <label>Sightseeing Management</label>\n                    </div>\n                    <div class=\"userEvent\">\n                        <input type=\"checkbox\" formControlName=\"transactionManagement\">\n                        <label>Transaction Management </label>\n                        <input type=\"checkbox\" class=\"event4\" formControlName=\"visaManagement\">\n                        <label>Visa Management</label>\n                    </div>\n                    <div class=\"userEvent\">\n                        <input type=\"checkbox\" formControlName=\"contentManagement\">\n                        <label>Content Management </label>\n                        <input type=\"checkbox\" class=\"event5\" formControlName=\"inquiryManagement\">\n                        <label>Inquiry Management</label>\n                    </div>\n                    <div class=\"userEvent\">\n                        <input type=\"checkbox\" formControlName=\"supportManagement\">\n                        <label>Support Management </label>\n                        <input type=\"checkbox\" class=\"event6\" formControlName=\"settingManagement\">\n                        <label>Setting Management</label>\n                    </div>\n\n                    <!-- [disabled]=\"!addaddSubAdminForm.valid\" [disabled]=\"!addSubAdminForm.valid\"-->\n                    <div class=\"form-group add\">\n                        <button class=\"btn btn-success btn\" [disabled]=\"!addSubAdminForm.valid\" (click)=\"addSubAdmin()\"\n                            >ADD</button>\n                    </div>\n                </form>\n\n\n            </div>\n\n            <!-- /.box-body -->\n        </div>\n    </section>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
  /*!**************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
    \**************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppAppComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n\n  <ngx-spinner\n  bdOpacity = 0.9\n  size = \"medium\"\n  color = \"e8ae0cde\"\n  type = \"square-jelly-box\"\n  [fullScreen] = \"true\"\n  >\n  <p style=\"color: white\" > Please wait.....</p>\n  </ngx-spinner>\n<router-outlet></router-outlet>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/change-password/change-password.component.html":
  /*!******************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/change-password/change-password.component.html ***!
    \******************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppChangePasswordChangePasswordComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<p>change-password works!</p>\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/content-destination/content-destination.component.html":
  /*!**************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/content-destination/content-destination.component.html ***!
    \**************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppContentDestinationContentDestinationComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-sidebar></app-sidebar>\n<div class=\"content-wrapper\">\n    <div class=\"container con\" style=\"padding: 8px;\">\n\n        <div class=\"tab-margin\">\n\n            <ul class=\"nav nav-tabs tabs4col des_c3\" id=\"myTab\" role=\"tablist\">\n                <li class=\"nav-item destion_cs3\">\n                    <a class=\"nav-link active show ashow1\" [ngClass]=\"{'active': tab== 'Destination'}\"\n                        (click)='tabChangedFunc(0)' data-toggle=\"tab\" role=\"tab\" aria-controls=\"home\"\n                        aria-selected=\"true\">\n                        Destination\n                    </a>\n                </li>\n                <li class=\"nav-item destion_cs3\">\n                    <a class=\"nav-link active show ashow1\" [ngClass]=\"{'active': tab== 'Website'}\"\n                        (click)='tabChangedFunc(1)' data-toggle=\"tab\" role=\"tab\" aria-controls=\"home\"\n                        aria-selected=\"false\">\n                        Website Pages\n                    </a>\n                </li>\n                <li class=\"nav-item destion_cs3\">\n                    <a class=\"nav-link active show ashow1\" [ngClass]=\"{'active': tab== 'Banners'}\"\n                        (click)='tabChangedFunc(2)' data-toggle=\"tab\" role=\"tab\" aria-controls=\"profile\"\n                        aria-selected=\"false\">\n                        Banners\n                    </a>\n                </li>\n\n            </ul>\n\n        </div>\n    </div>\n\n\n\n    <div class=\"upper_tab show active\" [ngClass]=\"{'active': tab =='Destination'}\" *ngIf=\"(tab == 'Destination')\"\n        role=\"tabpanel\" aria-labelledby=\"favourite-tab\">\n        <form [formGroup]=\"destinationForm\">\n            <div class=\"container con\" style=\"padding: 8px;\">\n                <label>Add destination</label>\n                <div class=\"destination\">\n                    <label>Country</label>\n\n                    <select formControlName=\"country\" class=\"form-control\" style=\"margin-left: 19px;\">\n                        <option value=\"\">Select country</option>\n                        <option value=\"{{item._id}}\" *ngFor=\"let item of countryList\">{{item.country}}</option>\n                    </select>\n\n                    <!-- <div *ngIf=\"destinationForm.get('country').hasError('required') && destinationForm.get('country').touched\">\n                        <span style=\"color:red;float:right;\">*country is required.</span></div> -->\n\n                    <label class=\"\">Destination</label>\n                    <input type=\"text\" formControlName=\"destination\"  class=\"form-control destinations\"  (keypress)=\"service.preventSpace($event)\"\n                    >\n                </div>\n                <div\n                    *ngIf=\"destinationForm.get('destination').hasError('required') && destinationForm.get('destination').touched\">\n                    <span style=\"color:red;float:right;margin-right: 45%;\">*Destination is required.</span></div>\n                     <div *ngIf=\"destinationForm.controls['destination'].hasError('maxlength')\"><span\n                    style=\"color:red;margin-left: 40%;\">*Minlength should\n                    be 60 characters.</span></div>\n\n                <div class=\"divInsure\">\n\n                    <label>Insurance</label>\n                    <input type=\"text\" formControlName=\"insurance\" class=\"form-control insurance\" placeholder=\"INR\"\n                        (keydown.space)=\"$event.preventDefault();\"\n                        >\n                    <!-- <div *ngIf=\"destinationForm.controls['insurance'].hasError('minlength')\"><span\n                    style=\"color:red;margin-left: 27%;\">*Minlength should\n                    be  characters.</span></div> -->\n\n                  \n\n                    <!-- <div *ngIf=\"0>=destinationForm.value.insurance\"><span style=\"color:red;margin-left: 27%;\">*Don't use zero value</span></div> -->\n                </div>\n                <div *ngIf=\"destinationForm.controls['insurance'].hasError('maxlength')\"><span\n                    style=\"color:red;margin-left: 8%;\">*Maxlength should\n                    be 20 numbers.</span></div>\n            <div *ngIf=\"destinationForm.controls['insurance'].hasError('pattern')\"><span\n                    style=\"color:red;margin-left: 8%;\">*Don't\n                    use small, capital letter and special characters.</span></div>\n                <label class=\"optionals\">Optional</label>\n                <div class=\"activeinactiv\" style=\"margin-left: 9px;\">\n                    <input type=\"radio\" name=\"activeInsurance\"  value=\"ACTIVE\" [checked]=\"true\"\n                        formControlName=\"activeInsurance\" >\n                    <label>Active</label>\n                    <input type=\"radio\" name=\"activeInsurance\" value=\"INACTIVE\" formControlName=\"activeInsurance\"\n                        style=\"margin-left: 7%;\">\n                    <label>Inactive</label>\n                </div>\n                <div>\n                    <button type=\"button\" class=\"btn btn-success btnss\" [disabled]=\"!destinationForm.valid\"\n                        (click)=\"addDestination()\">Add</button>\n                </div>\n            </div>\n        </form>\n        <div class=\"container\" style=\"border-style: ridge;width: 83%;\">\n            <section style=\"padding-top: 22px;\">\n\n                <input type=\"search\" class=\"srch\" [(ngModel)]=\"filterName\" maxlength=\"50\"\n                    (keyup)=\"searchValue($event.target.value)\" placeholder=\"Search by country\">\n                <select class=\"selects1\" (change)=\"selectStatus($event.target.value)\">\n                    <option value=\"\">Select status</option>\n                    <option value=\"ALL\">All</option>\n                    <option value=\"ACTIVE\">Active</option>\n                    <option value=\"INACTIVE\">Inactive</option>\n                </select>\n            </section>\n            <section class=\"content\">\n                <div class=\"row\">\n                    <div class=\"col-xs-12\">\n                        <div class=\"box\">\n                            <!-- /.box-header -->\n                            <div class=\"box-body\">\n                                <table id=\"customers\" class=\"table table-bordered table-hover\">\n                                    <thead>\n                                        <tr class=\"trt\">\n                                            <th class=\"tdt\">S.No.<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                            <th class=\"tdt\">Country<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                            <th class=\"tdt\">Destination<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                            <th class=\"tdt\">Status<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                            <th class=\"tdt\">Actions</th>\n\n                                        </tr>\n                                    </thead>\n                                    <tbody *ngIf=\"destnList\">\n                                        <!-- | paginate : {itemsPerPage: 7, currentPage:page, totalItems:total}; let i=index -->\n                                        <tr\n                                            *ngFor=\"let items of destnList | paginate : {itemsPerPage:10, currentPage:page, totalItems:total}; let i=index\">\n                                            <td class=\"tdt\">{{limit * (page-1)+i+1}}</td>\n                                            <td class=\"tdt\">{{items.countryName || '--'}}</td>\n                                            <td class=\"tdt\">{{items.destination || '--'}}</td>\n                                            <!-- <td>{{items.name}}</td> [routerLink]=\"['/edit-destination',items?._id]\"-->\n                                            <td class=\"tdt \" *ngIf=\"items.status=='ACTIVE'\">Active</td>\n                                            <td class=\"tdt\" *ngIf=\"items.status!='ACTIVE'\">Inactive</td>\n                                            <td class=\"d-flex text-center\">\n                                                <span style=\"display: flex;justify-content: center;\">\n                                                    <!-- <a class=\"btn btn-app edt\"\n                                                    [routerLink]=\"['/edit-destination/',items?._id]\">\n                                                    <i class=\"fa fa-edit\"></i> Edit\n                                                </a> -->\n                                                    <a class=\"btn btn-app edt\" style=\"border: none;\"\n                                                        [routerLink]=\"['/edit-destination',items?._id,0]\">\n                                                        <i class=\"fa fa-edit\"></i>\n                                                    </a>\n                                                    <a class=\"btn btn-app dlt\" data-toggle=\"modal\" style=\"border: none;\"\n                                                        data-target=\"#exampdelete\" (click)=\"deleteFunction(items?._id)\">\n                                                        <i class=\"fa fa-trash\"></i>\n                                                    </a>\n                                                </span>\n                                            </td>\n                                        </tr>\n\n\n                                    </tbody>\n\n                                </table>\n                                <h3 *ngIf=\"destnList?.length==0\" style=\"text-align:center\">Data not Found!</h3>\n                            </div>\n\n                            <pagination-controls (pageChange)=\"changePage($event) \" style=\"float:right;\"\n                                *ngIf=\"destnList?.length != 0\">\n                            </pagination-controls>\n                        </div>\n\n                    </div>\n                </div>\n            </section>\n        </div>\n\n\n    </div>\n    <div class=\"upper_tab show active\" [ngClass]=\"{'active': tab =='Website'}\" *ngIf=\"(tab == 'Website')\"\n        role=\"tabpanel\" aria-labelledby=\"favourite-tab\">\n        <!-- <label>Add Website</label> -->\n        <div class=\"container\" style=\"border-style: ridge;width: 83%;\">\n            <section style=\"padding-top: 22px;display: flex;\">\n\n                <input type=\"search\"  style=\"width: 100%;max-width: 24%;border-radius: 13px;\" [(ngModel)]=\"filterName\" maxlength=\"50\"\n                    (keyup)=\"searchValue($event.target.value)\" placeholder=\"Search by title\" class=\"\">\n                <select (change)=\"selectStatus($event.target.value)\" class=\"form-control selects1\">\n                    <option value=\"\">Select status</option>\n                    <option value=\"ALL\">All</option>\n                    <option value=\"ACTIVE\">Active</option>\n                    <option value=\"INACTIVE\">Inactive</option>\n                </select>\n            </section>\n            <section class=\"content\">\n                <div class=\"row\">\n                    <div class=\"col-xs-12\">\n                        <div class=\"box\">\n                            <!-- /.box-header -->\n                            <div class=\"box-body\">\n                                <table id=\"customers\" class=\"table table-bordered table-hover\">\n                                    <thead>\n                                        <tr class=\"trt\">\n                                            <th class=\"tdt\">S.No.<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                            <th class=\"tdt\">Title<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                            <th class=\"tdt\">Description<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                            <th class=\"tdt\">Status<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                            <th class=\"tdt\">Actions</th>\n\n                                        </tr>\n                                    </thead>\n                                    <tbody *ngIf=\"contentList\">\n                                        <!-- | paginate : {itemsPerPage: 7, currentPage:page, totalItems:total}; let i=index -->\n                                        <tr\n                                            *ngFor=\"let items of contentList | paginate : {itemsPerPage: 7, currentPage:page, totalItems:total}; let i=index\">\n                                            <td class=\"tdt \">{{limit * (page-1)+i+1}}</td>\n                                            <td class=\"tdt\">{{items.title || '--'}}</td>\n                                            <td class=\"tdt\" class=\"\" [innerHTML]=\"items.description | sanitizeHtmlPipe\"\n                                                title=\"{{items.description || '--'}}\"\n                                                style=\"width: 50%;word-break: break-all;\">{{items.description || '--'}}\n                                            </td>\n                                            <td [ngClass]=\"active\" class=\"tdt\" *ngIf=\"items.status=='ACTIVE'\">Active\n                                            </td>\n                                            <td class=\"tdt\" *ngIf=\"items.status!='ACTIVE'\">Inactive</td>\n\n                                            <td class=\"tdt\">\n                                                <span style=\"display: flex;display: flex;\n                                                justify-content: center;\"> <a class=\"btn btn-app edt\"\n                                                        style=\"border: none;\"\n                                                        [routerLink]=\"['/edit-destination',items?._id,1]\">\n                                                        <i class=\"fa fa-edit\"></i>\n                                                    </a>\n\n                                                </span></td>\n                                        </tr>\n\n\n                                    </tbody>\n\n                                </table>\n                                <h3 *ngIf=\"contentList?.length==0\" style=\"text-align:center\">Dta not Found!</h3>\n                            </div>\n\n                            <pagination-controls (pageChange)=\"changePage($event) \" style=\"float:right;\"\n                                *ngIf=\"contentList?.length != 0\">\n                            </pagination-controls>\n                            <!-- /.box-body -->\n                        </div>\n                        <!-- /.box -->\n\n\n                        <!-- /.box -->\n                    </div>\n                    <!-- /.col -->\n                </div>\n                <!-- /.row -->\n            </section>\n        </div>\n\n    </div>\n    <div class=\"upper_tab show active\" [ngClass]=\"{'active': tab =='Banners'}\" *ngIf=\"(tab == 'Banners')\"\n        role=\"tabpanel\" aria-labelledby=\"favourite-tab\">\n        <!-- <label>Add Banners</label> -->\n        <div class=\"container con\">\n\n            <div>\n                <label class=\"\" style=\"font-size: 20px;\">Add Banners</label>\n            </div>\n            <!-- <input type=\"file\" class=\"inptdestination\"> -->\n\n            <div class=\"imageUpload\">\n                <!-- <label for=\"file-input\">\n                    <img class=\"imgg\" [src]=\"imageSrc?imageSrc:'assets/adminLTE/dist/img/uploadImage.png'\"\n                        src=\"assets/pic_trulli.jpg\" />\n               \n                </label> -->\n\n                <input id=\"file-input\" type=\"file\" class=\"imgs\" name=\"imageUrl\" [src]=\"imageSrc\" accept=\"image/*\" (change)=\"handleInputChange($event)\"\n                 />\n\n                <!-- <button type=\"button\" class=\"imagebtn\">Upload image</button> -->\n\n            </div>\n            <form [formGroup]=\"bannerForm\">\n                <div class=\"titles\">\n                    <label>Title</label>\n                    <input type=\"text\" name=\"title\" formControlName=\"title\" class=\"form-control ipt\" \n                        (keypress)=\"service.preventSpace($event)\">\n                </div>\n                <div *ngIf=\"bannerForm.get('title').hasError('required') && bannerForm.get('title').touched\">\n                    <span style=\"color:red;margin-right: -2.5%;    margin-left: 9.1%;\n                    \">*Title is required.</span>\n                     </div>\n                    <!-- <span *ngIf=\"bannerForm.controls['title'].hasError('minlength')\"><span\n                        style=\"color:red;margin-left: 15%;\">*Minlength should\n                        be 8 characters.</span></span> -->\n\n                    <span *ngIf=\"bannerForm.controls['title'].hasError('maxlength')\"><span\n                            style=\"color:red;margin-left: 15%;\">*Maxlength should\n                            be 20 characters.</span></span>\n               \n\n\n                <div class=\"activeinactiv\">\n                    <input type=\"radio\" value=\"ACTIVE\" name=\"activebanner\" [checked]=\"true\"\n                        formControlName=\"activebanner\" style=\"margin-left: 3%;;\">\n                    <label>Active</label>\n                    <input type=\"radio\" value=\"INACTIVE\" name=\"activebanner\" formControlName=\"activebanner\"\n                        style=\"margin-left: 6%;\">\n                    <label>Inactive</label>\n                </div>\n                <div>\n                    <button type=\"button\" class=\"btn btn-success btnss\" [disabled]=\"!bannerForm.valid\"\n                        (click)=\"addBanner()\">Add</button>\n                </div>\n            </form>\n        </div>\n        <div class=\"container\" style=\"border-style: ridge;width: 83%;\">\n            <section style=\"padding-top: 22px;\">\n\n                <!-- <input type=\"search\" class=\"srch\" [(ngModel)]=\"filterName\" maxlength=\"50\"\n                    (keyup)=\"searchValue($event.target.value)\" placeholder=\"Search by name\"> -->\n                <select class=\"form-control selects1\" (change)=\"selectStatus($event.target.value)\">\n                    <option value=\"\">Select status</option>\n                    <option value=\"ALL\">All</option>\n                    <option value=\"ACTIVE\">Active</option>\n                    <option value=\"INACTIVE\">Inactive</option>\n                </select>\n            </section>\n            <section class=\"content\">\n                <div class=\"row\">\n                    <div class=\"col-xs-12\">\n                        <div class=\"box\">\n                            <!-- /.box-header -->\n                            <div class=\"box-body\">\n                                <table id=\"customers\" class=\"table table-bordered table-hover\">\n                                    <thead>\n                                        <tr class=\"trt\">\n                                            <th class=\"tdt\">S.No.<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                            <th class=\"tdt\">Title<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                            <th class=\"tdt\">Image<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                            <th class=\"tdt\">Status<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                            <th class=\"tdt\">Action</th>\n\n                                        </tr>\n                                    </thead>\n                                    <tbody *ngIf=\"bannerList!=[]\">\n                                        <!-- | paginate : {itemsPerPage: 7, currentPage:page, totalItems:total}; let i=index -->\n                                        <tr\n                                            *ngFor=\"let items of bannerList | paginate : {itemsPerPage:10, currentPage:page, totalItems:total}; let i=index\">\n                                            <td class=\"table-width\">{{limit * (page-1)+i+1}}</td>\n                                            <td class=\"table-width\">{{items.title}}</td>\n                                            <td class=\"table-width\"><img class=\"tdImage\" [src]=\"items.bannerPic\"></td>\n                                            <td class=\"table-width\" *ngIf=\"items.status=='ACTIVE'\">Active</td>\n                                            <td class=\"table-width\" *ngIf=\"items.status!='ACTIVE'\">Inactive</td>\n                                            <td class=\"table-width\">\n                                                <div style=\"display: flex;justify-content: center;\"> <a\n                                                        class=\"btn btn-app edt\" style=\"border: none;\"\n                                                        [routerLink]=\"['/edit-destination',items?._id,2]\">\n                                                        <i class=\"fa fa-edit\"></i>\n                                                    </a>\n                                                    <a class=\"btn btn-app dlt\" data-toggle=\"modal\" style=\"border: none;\"\n                                                        data-target=\"#bannermodaldelete\"\n                                                        (click)=\"deletebanner(items?._id)\">\n                                                        <i class=\"fa fa-trash\"></i>\n                                                    </a>\n                                                </div>\n                                            </td>\n                                        </tr>\n\n\n                                    </tbody>\n                                    <tr>\n                                        <td *ngIf=\"bannerList==[]\">\n                                            <h3 style=\"text-align: center;\">Data not found!</h3>\n                                        </td>\n                                    </tr>\n                                </table>\n\n                            </div>\n\n                            <pagination-controls (pageChange)=\"changePage($event) \" style=\"float:right;\"\n                                *ngIf=\"bannerList?.length != 0\">\n                            </pagination-controls>\n                            <!-- /.box-body -->\n                        </div>\n                        <!-- /.box -->\n\n\n                        <!-- /.box -->\n                    </div>\n                    <!-- /.col -->\n                </div>\n                <!-- /.row -->\n            </section>\n        </div>\n\n    </div>\n</div>\n<div class=\"modal fade\" id=\"exampdelete\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\"\n    aria-hidden=\"true\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <H3 style=\"text-align:center;padding-top: 42px;\"> Delete Destination ?</H3>\n            <hr>\n            <div class=\"modal-body\" style=\"display: flex;justify-content: center;padding: 26px\">\n                <b style=\"font-size: 20px;font-weight: 500;\">Are you sure you want to delete this destination ?</b>\n            </div>\n            <div class=\"modal-footer\" style=\"display: flex;justify-content: space-between;\">\n                <button type=\"button\"\n                    style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: red;color: white;\"\n                    data-dismiss=\"modal\">No</button>\n                <button type=\"button\"\n                    style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: green;color: white;\"\n                    (click)=\"deleteFunctions()\" data-dismiss=\"modal\">Yes</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n\n\n\n<div class=\"modal fade\" id=\"bannermodaldelete\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\"\n    aria-hidden=\"true\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <H3 style=\"text-align:center;padding-top: 42px;\">Delete Banner?</H3>\n            <hr>\n            <div class=\"modal-body\" style=\"display: flex;justify-content: center;padding: 26px\">\n                <b style=\"font-size: 20px;font-weight: 500;\">Are you sure you want to delete this banner ?</b>\n            </div>\n            <div class=\"modal-footer\" style=\"display: flex;justify-content: space-between;\">\n                <button type=\"button\"\n                    style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: red;color: white;\"\n                    data-dismiss=\"modal\">No</button>\n                <button type=\"button\"\n                    style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: green;color: white;\"\n                    (click)=\"deletebanners()\" data-dismiss=\"modal\">Yes</button>\n            </div>\n        </div>\n    </div>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/customer-management/customer-management.component.html":
  /*!**************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/customer-management/customer-management.component.html ***!
    \**************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppCustomerManagementCustomerManagementComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-sidebar></app-sidebar>\n<div class=\"content-wrapper\">\n  <!-- Content Header (Page header) -->\n  <section class=\"content-header\">\n    <h1>\n      Customer Management\n\n    </h1>\n\n  </section>\n  <section style=\"padding-top: 22px;\">\n    <div class=\"mainbtn\" style=\"display: flex;\">\n      <input type=\"search\" class=\"srch\" [(ngModel)]=\"filterName\" maxlength=\"50\"\n        (keyup)=\"searchValue($event.target.value)\" placeholder=\"Search by name\">\n\n\n      <button class=\"resetbtn\" (click)=\"reset()\">Reset</button>\n      <button class=\"resetbtn\" (click)=\"selectRowdata()\">Select</button>\n\n      <button class=\"addbtn\" [routerLink]=\"['/add-customer']\">+Add</button>\n      <button class=\"exbtn\" (click)=\"download()\" *ngIf=\"customerLists?.length!=0\">Export into CSV</button>\n      <!-- <button class=\"exbtn\" (click)=\"download()\" *ngIf=\"customerLists?.length!=0\">Export into CSV</button>  -->\n    </div>\n\n  </section>\n  <section class=\"content\">\n    <div class=\"row\">\n      <div class=\"col-xs-12\">\n        <div class=\"box\">\n          <!-- /.box-header -->\n          <div class=\"box-body\">\n            <table id=\"customers\"  class=\"table table-bordered table-hover\">\n              <thead>\n                <tr class=\"trt\">\n                  <th class=\"tdt\">S.No.\n                      <i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                  <th class=\"tdt\">Name\n                      <i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                  <th class=\"tdt\">Email address\n                      <i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                  <th class=\"tdt\">Mobile number\n                      <i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                  <th class=\"tdt\">Registration on\n                      <i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                  <th class=\"tdt\">Actions</th>\n\n                </tr>\n              </thead>\n              <tbody *ngIf=\"customerLists\" >\n                <!-- | paginate : {itemsPerPage: 7, currentPage:page, totalItems:total}; let i=index -->\n                <tr\n                  *ngFor=\"let items of customerLists | paginate : {itemsPerPage:10, currentPage:page, totalItems:total}; let i=index\">\n                  <td class=\"table-width\"><input [checked]=\"items?.isChecked\" (change)=\"selectHandler(items)\" type=\"checkbox\"/>{{limit * (page-1)+i+1}}</td>\n                  <td class=\"table-width\">{{items.name || '--'}}</td>\n                  <td class=\"table-width\" title=\"{{items.email || '--'}}\">{{items.email || '--'}}</td>\n                  <td class=\"table-width\">{{items.mobileNumber || '--'}}</td>\n                  <td class=\"table-width\">{{(items.createdAt | date : 'd MMM , y') ||'N/A'}}</td>\n                  <!-- <td class=\"table-width\" *ngIf=\"items.status=='ACTIVE'\">Active</td>\n                            <td class=\"table-width\" *ngIf=\"items.status!='ACTIVE'\">Inactive</td> -->\n                  <td class=\"table-width\">\n                    <div style=\"display: flex;justify-content: center;\"> <a class=\"btn btn-app edt\"  style=\"border: none;\" \n                        [routerLink]=\"['/edit-customer',items?._id]\">\n                        <i class=\"fa fa-edit\"></i>\n                      </a>\n                      <a class=\"btn btn-app dlt\"  style=\"border: none;\"  data-toggle=\"modal\" data-target=\"#exampdelete\"\n                        (click)=\"deleteFunction(items?._id)\">\n                        <i class=\"fa fa-trash\"></i>\n                      </a>\n                    </div>\n                  </td>\n                </tr>\n\n\n              </tbody>\n\n\n\n\n            </table>\n            <h3 *ngIf=\"customerLists?.length==0\" style=\"text-align:center\">Data not Found!</h3>\n          </div>\n\n          <pagination-controls (pageChange)=\"changePage($event) \" style=\"float:right;\"\n            *ngIf=\"customerLists?.length != 0\">\n          </pagination-controls>\n          <!-- /.box-body -->\n        </div>\n        <!-- /.box -->\n\n\n        <!-- /.box -->\n      </div>\n      <!-- /.col -->\n    </div>\n    <!-- /.row -->\n  </section>\n\n  <!-- Main content -->\n\n  <!-- /.content -->\n</div>\n\n<div class=\"modal fade\" id=\"exampdelete\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\"\n  aria-hidden=\"true\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <H3 style=\"text-align:center;padding-top: 42px;\"> Delete Customer ?</H3>\n      <hr>\n      <div class=\"modal-body\" style=\"display: flex;justify-content: center;padding: 26px\">\n        <b style=\"font-size: 20px;font-weight: 500;\">Are you sure you want to delete this customer ?</b>\n      </div>\n      <div class=\"modal-footer\" style=\"display: flex;justify-content: space-between;\">\n        <button type=\"button\"\n          style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: red;color: white;\"\n          data-dismiss=\"modal\">No</button>\n        <button type=\"button\"\n          style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: green;color: white;\"\n          (click)=\"deleteFunctions()\" data-dismiss=\"modal\">Yes</button>\n      </div>\n    </div>\n  </div>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/dashboard/dashboard.component.html":
  /*!******************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/dashboard/dashboard.component.html ***!
    \******************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppDashboardDashboardComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-sidebar></app-sidebar>\n<div class=\"content-wrapper\">\n        <!-- Content Header (Page header) -->\n        <section class=\"content-header\">\n          <h1>\n            Dashboard\n         \n          </h1>\n       \n        </section>\n    \n        <!-- Main content -->\n        <section class=\"content\">\n          <!-- Small boxes (Stat box) -->\n          <div class=\"row\" style=\"width: 134%;\" style=\"width: 134%;\">\n            <div class=\"col-lg-3 col-xs-6\">\n              <!-- small box -->\n              <div class=\"small-box bg-aqua\">\n                <div class=\"inner\">\n                  <h3>10</h3>\n    \n                  <p>TOTAL CUSTOMERS</p>\n                </div>\n                <div class=\"icon\">\n                  <i class=\"ion ion-bag\"></i>\n                </div>\n              </div>\n            </div>\n            <!-- ./col -->\n            <div class=\"col-lg-3 col-xs-6\">\n              <!-- small box -->\n              <div class=\"small-box bg-green\">\n                <div class=\"inner\">\n                  <h3>10<sup style=\"font-size: 20px\"></sup></h3>\n    \n                  <p>TOTAL SUB ADMINS</p>\n                </div>\n                <div class=\"icon\">\n                  <i class=\"ion ion-stats-bars\"></i>\n                </div>\n              </div>\n            </div>\n            <!-- ./col -->\n            <div class=\"col-lg-3 col-xs-6\">\n              <!-- small box -->\n              <div class=\"small-box bg-yellow\">\n                <div class=\"inner\">\n                  <h3>10</h3>\n    \n                  <p>TOTAL BOOKINGS</p>\n                </div>\n                <div class=\"icon\">\n                  <i class=\"ion ion-person-add\"></i>\n                </div>\n              </div>\n            </div>\n  \n        \n   \n          </div>\n       \n    \n        </section>\n        <section class=\"content\">\n                <!-- Small boxes (Stat box) -->\n                <div class=\"row\" style=\"width: 134%;\">\n                  <div class=\"col-lg-3 col-xs-6\">\n                    <!-- small box -->\n                    <div class=\"small-box bg-aqua\">\n                      <div class=\"inner\">\n                        <h3>10</h3>\n          \n                        <p>TOTAL PACKAGES</p>\n                      </div>\n                      <div class=\"icon\">\n                        <i class=\"ion ion-bag\"></i>\n                      </div>\n                    </div>\n                  </div>\n                  <!-- ./col -->\n                  <div class=\"col-lg-3 col-xs-6\">\n                    <!-- small box -->\n                    <div class=\"small-box bg-green\">\n                      <div class=\"inner\">\n                        <h3>10<sup style=\"font-size: 20px\"></sup></h3>\n          \n                        <p>TOTAL TRANSFERS</p>\n                      </div>\n                      <div class=\"icon\">\n                        <i class=\"ion ion-stats-bars\"></i>\n                      </div>\n                    </div>\n                  </div>\n                  <!-- ./col -->\n                  <div class=\"col-lg-3 col-xs-6\">\n                    <!-- small box -->\n                    <div class=\"small-box bg-yellow\">\n                      <div class=\"inner\">\n                        <h3>10</h3>\n          \n                        <p>TOTAL SIGHTSEEING</p>\n                      </div>\n                      <div class=\"icon\">\n                        <i class=\"ion ion-person-add\"></i>\n                      </div>\n                    </div>\n                  </div>\n        \n              \n         \n                </div>\n             \n          \n              </section>\n              <section class=\"content\">\n                    <!-- Small boxes (Stat box) -->\n                    <div class=\"row\" style=\"width: 134%;\">\n                      <div class=\"col-lg-3 col-xs-6\">\n                        <!-- small box -->\n                        <div class=\"small-box bg-aqua\">\n                          <div class=\"inner\">\n                            <h3>10</h3>\n              \n                            <p>TOTAL TRANSACTIONS</p>\n                          </div>\n                          <div class=\"icon\">\n                            <i class=\"ion ion-bag\"></i>\n                          </div>\n                            </div>\n                      </div>\n                      <!-- ./col -->\n                      <div class=\"col-lg-3 col-xs-6\">\n                        <!-- small box -->\n                        <div class=\"small-box bg-green\">\n                          <div class=\"inner\">\n                            <h3>10<sup style=\"font-size: 20px\"></sup></h3>\n              \n                            <p>TOTAL COUNTRIES</p>\n                          </div>\n                          <div class=\"icon\">\n                            <i class=\"ion ion-stats-bars\"></i>\n                          </div>\n                            </div>\n                      </div>\n                      <!-- ./col -->\n                      <div class=\"col-lg-3 col-xs-6\">\n                        <!-- small box -->\n                        <div class=\"small-box bg-yellow\">\n                          <div class=\"inner\">\n                            <h3>10</h3>\n              \n                            <p>TOTAL ENQUIRIES</p>\n                          </div>\n                          <div class=\"icon\">\n                            <i class=\"ion ion-person-add\"></i>\n                          </div>\n                            </div>\n                      </div>\n            \n                  \n             \n                    </div>\n                 \n              \n                  </section>\n        <!-- /.content -->\n      </div>\n      <footer class=\"main-footer\">\n        <div class=\"pull-right hidden-xs\">\n        </div>\n        <strong>Copyright &copy; 2020 <a href=\"https://adminlte.io\">Orbistur.com,</a>.</strong> All rights\n        reserved.\n      </footer>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/edit-customer/edit-customer.component.html":
  /*!**************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/edit-customer/edit-customer.component.html ***!
    \**************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppEditCustomerEditCustomerComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-sidebar></app-sidebar>\n<div class=\"content-wrapper\">\n    <section class=\"content-header\">\n        <h3 class=\"box-title\">Customer Management / Edit</h3>\n        <div class=\"box box-warning wr\">\n\n            <div class=\"box-header with-border\">\n                <label for=\"file-input\">\n                    <img class=\"imgs\" [src]=\"profile?profile:'assets/adminLTE/dist/img/editUser.png'\">\n                    <!-- <img class=\"imgs\" src=\"assets/adminLTE/dist/img/editUser.png\"> -->\n                    <input id=\"file-input\" type=\"file\" name=\"imageUrl\" accept=\"image/*\"\n                        (change)=\"handleInputChange($event)\" style=\"display: none;\" />\n                </label>\n            </div>\n\n            <!-- /.box-header -->\n            <div class=\"box-body bd\">\n                <form role=\"form\" [formGroup]=\"editCustomerForm\">\n                    <!-- text input -->\n                    <img>\n                    <div class=\"form-group\">\n                        <input type=\"text\" class=\"form-control\" formControlName=\"name\" placeholder=\"Please enter name\"\n                            (keypress)=\"service.preventSpace($event)\">\n                    </div>\n                    <div\n                        *ngIf=\"editCustomerForm.get('name').hasError('required') && editCustomerForm.get('name').touched\">\n                        <span style=\"color:red;\">*Please enter your name.</span></div>\n                    <div *ngIf=\"editCustomerForm.controls['name'].hasError('minlength')\"><span\n                            style=\"color:red;\">*Minlength should\n                            be 2 characters.</span></div>\n\n                    <div *ngIf=\"editCustomerForm.controls['name'].hasError('maxlength')\"><span\n                            style=\"color:red;\">*Maxlength should\n                            be 60 characters.</span></div>\n                    <div *ngIf=\"editCustomerForm.controls['name'].hasError('pattern')\"><span style=\"color:red;\">*Don't\n                            use Special characters.</span></div>\n                    <div class=\"form-group\">\n                        <input type=\"text\" class=\"form-control\" formControlName=\"email\"\n                            placeholder=\"Please enter email id\">\n                    </div>\n                    <div\n                        *ngIf=\"editCustomerForm.get('email').hasError('required') && editCustomerForm.get('email').touched\">\n                        <span style=\"color:red;\">*Please enter email id.</span></div>\n\n                    <div *ngIf=\"editCustomerForm.controls['email'].hasError('maxlength')\"><span\n                            style=\"color:red;\">*Maxlength should be 60 characters.</span></div>\n                    <div *ngIf=\"editCustomerForm.controls['email'].hasError('pattern')\"><span style=\"color:red;\">*Please\n                            enter valid email id.</span>\n\n                    </div>\n\n\n                    <!-- textarea -->\n                    <div class=\"form-group\">\n                \n                        <input type=\"tel\" class=\"form-control mob\" placeholder=\"\" id=\"phoneNumber\" formControlName=\"number\" maxlength=\"20\" (keyup)=\"toCheckSpaceChar()\">\n                        <div *ngIf=\"editCustomerForm.get('number').errors && editCustomerForm.get('number').touched || editCustomerForm.get('number').dirty\">\n                            <div *ngIf=\"editCustomerForm.get('number').hasError('required'); else elseBlock\" style=\"color: red\">*Phone number is required.</div>\n                            <ng-template #elseBlock>\n                                <div *ngIf=\"isValidNumber == false\" style=\"color: red\">*Please enter valid number.\n                                </div>\n                            </ng-template>\n                        </div>\n                        </div>\n                    <div class=\"form-group\">\n                        <input type=\"password\" class=\"form-control\" formControlName=\"password\" placeholder=\"Password\">\n                    </div>\n                    <!-- <div\n                        *ngIf=\"editCustomerForm.get('password').hasError('required') && editCustomerForm.get('password').touched\">\n                        <span style=\"color:red;\">*Password is required</span></div> -->\n                    <div *ngIf=\"editCustomerForm.controls['password'].hasError('minlength')\"><span\n                            style=\"color:red;\">*Maxlength should be 8 characters.</span></div>\n\n                    <div *ngIf=\"editCustomerForm.controls['password'].hasError('maxlength')\"><span\n                            style=\"color:red;\">*Maxlength should be 16 characters.</span></div>\n\n                    <div\n                        *ngIf=\"editCustomerForm.get('password').hasError('pattern') && editCustomerForm.get('password').dirty\">\n                        <span style=\"color:red;\"> *Password must contain characters, digits and one\n                            special character(Min character-8).</span>\n                    </div>\n                    <div class=\"form-group\">\n                        <input type=\"password\" class=\"form-control\" formControlName=\"confirmPassword\"\n                            placeholder=\"Confirm Password\">\n                    </div>\n                    <!-- <div\n                        *ngIf=\"editCustomerForm.get('confirmPassword').hasError('required') && editCustomerForm.get('confirmPassword').touched\">\n                        <span style=\"color:red;\">*Confirm Password is required.</span></div> -->\n                    <div\n                        *ngIf=\"(editCustomerForm.value.password != editCustomerForm.value.confirmPassword) && editCustomerForm.get('confirmPassword').dirty\">\n                        <span style=\"color:red;\">*Confirm password & new password should be\n                            same.</span></div>\n                    <div class=\"form-group\">\n                        <textarea class=\"form-control\" rows=\"3\" formControlName=\"address\"\n                            placeholder=\"Address...\"></textarea>\n                    </div>\n                    <div\n                        *ngIf=\"editCustomerForm.get('address').hasError('required') && editCustomerForm.get('address').touched\">\n                        <span style=\"color:red;\">*Address is required.</span></div>\n                    <span *ngIf=\"editCustomerForm.controls['address'].hasError('maxlength')\"><span\n                            style=\"color:red;\">*Maxlength should be 256 characters.</span></span>\n                    <!-- [disabled]=\"!addeditCustomerForm.valid\" -->\n                    <div class=\"form-group add\">\n                        <button class=\"btn btn-success btn\" (click)=\"editCustomer()\"\n                            [disabled]=\"!editCustomerForm.valid\">UPDATE</button>\n                    </div>\n                </form>\n\n\n            </div>\n\n            <!-- /.box-body -->\n        </div>\n    </section>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/edit-destination/edit-destination.component.html":
  /*!********************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/edit-destination/edit-destination.component.html ***!
    \********************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppEditDestinationEditDestinationComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-sidebar></app-sidebar>\n\n<div class=\"content-wrapper\">\n\n\n    <div class=\"tab-margin \">\n        <div class=\"container con\">\n            <ul class=\"nav nav-tabs tabs4col\" id=\"myTab\" role=\"tablist\" style=\"text-align: center;\">\n                <li class=\"nav-item website_c3\">\n                    <a class=\"nav-link active show ashow1\" style=\"cursor: pointer;\"\n                        [ngClass]=\"{'active': tab== 'Destination'}\" (click)='tabChangedFunc(0)' data-toggle=\"tab\"\n                        role=\"tab\" aria-controls=\"home\" aria-selected=\"true\">\n                        Destination\n                    </a>\n                </li>\n                <li class=\"nav-item website_c3\">\n                    <a class=\"nav-link active show ashow1\" style=\"cursor: pointer;\"\n                        [ngClass]=\"{'active': tab== 'Website'}\" (click)='tabChangedFunc(1)' data-toggle=\"tab\" role=\"tab\"\n                        aria-controls=\"home\" aria-selected=\"false\">\n                        Website Pages\n                    </a>\n                </li>\n                <li class=\"nav-item website_c3\">\n                    <a class=\"nav-link active show ashow1\" style=\"cursor: pointer;\"\n                        [ngClass]=\"{'active': tab== 'Banners'}\" (click)='tabChangedFunc(2)' data-toggle=\"tab\" role=\"tab\"\n                        aria-controls=\"profile\" aria-selected=\"false\">\n                        Banners\n                    </a>\n                </li>\n\n            </ul>\n\n        </div>\n    </div>\n    <div class=\"upper_tab show active\" [ngClass]=\"{'active': tab =='Destination'}\" *ngIf=\"(tab == 'Destination')\"\n        role=\"tabpanel\" aria-labelledby=\"favourite-tab\">\n        <div class=\"collapse\" id=\"collapseExample\">\n            <form [formGroup]=\"destinationForm\">\n                <div class=\"container con\">\n                    <label>Edit Destination</label>\n                    <div class=\"destination\">\n                        <label>Country</label>\n                        <select class=\"form-control selects\" formControlName=\"country\">\n                            <option value=\"\">Select country</option>\n                            <option value=\"{{item._id}}\" *ngFor=\"let item of countryList\">{{item.country}}</option>\n                        </select>\n\n                        <label class=\"\">Destination</label>\n                        <input type=\"text\" formControlName=\"destination\" class=\"form-control inptdestination\"\n                            (keypress)=\"service.preventSpace($event)\">\n\n                    </div>\n                    <div\n                                *ngIf=\"destinationForm.get('destination').hasError('required') && destinationForm.get('destination').touched\">\n                                <span style=\"color:red;float:right;margin-right: 51.5%;\">*Destination is required.</span></div>\n                                <span *ngIf=\"destinationForm.controls['destination'].hasError('maxlength')\"><span\n                                    style=\"color:red;margin-left: 184px;\">*Maxlength should\n                                    be 60 characters.</span></span>\n\n                    <div class=\"divInsure\">\n\n                        <label>Insurance</label>\n                        <input type=\"text\" class=\"form-control insur\" formControlName=\"insurance\" placeholder=\"INR\"\n                            >\n                    </div>\n\n\n                    <div *ngIf=\"destinationForm.controls['insurance'].hasError('maxlength')\"><span\n                            style=\"color:red;margin-left: 8%;\">*Maxlength should\n                            be 20 numbers.</span></div>\n                    <div *ngIf=\"destinationForm.controls['insurance'].hasError('pattern')\"><span\n                            style=\"color:red;margin-left: 123px;\">*Don't\n                            use small and capital letter and special characters.</span></div>\n\n                    <label class=\"optionals\">Optional</label>\n                    <div class=\"activeinactiv\">\n                        <input type=\"radio\" name=\"activeInsurance\" value=\"ACTIVE\" [checked]=\"true\"\n                            formControlName=\"activeInsurance\" style=\"margin-left: 9px;\">\n                        <label>Active</label>\n                        <input type=\"radio\" name=\"activeInsurance\" value=\"INACTIVE\" formControlName=\"activeInsurance\"\n                            style=\"margin-left: 8%;\">\n                        <label>Inactive</label>\n                    </div>\n                    <div class=\"btn\">\n                        <button type=\"button\" class=\"btn btn-success\" [disabled]=\"!destinationForm.valid\"\n                            (click)=\"updateDestination()\">UPDATE</button>\n                    </div>\n                </div>\n            </form>\n        </div>\n        <div *ngIf=\"val==0\">\n                <form [formGroup]=\"destinationForm\">\n                        <div class=\"container con\">\n                            <label>Edit Destination</label>\n                            <div class=\"destination\">\n                                <label>Country</label>\n                                <select class=\"form-control selects\" formControlName=\"country\">\n                                    <option value=\"\">Select country</option>\n                                    <option value=\"{{item._id}}\" *ngFor=\"let item of countryList\">{{item.country}}</option>\n                                </select>\n        \n                                <label class=\"\">Destination</label>\n                                <input type=\"text\" formControlName=\"destination\" class=\"form-control inptdestination\"\n                                    (keypress)=\"service.preventSpace($event)\">\n        \n                            </div>\n                            <div\n                                *ngIf=\"destinationForm.get('destination').hasError('required') && destinationForm.get('destination').touched\">\n                                <span style=\"color:red;float:right;margin-right: 51.5%;\">*Destination is required.</span></div>\n                                <span *ngIf=\"destinationForm.controls['destination'].hasError('maxlength')\"><span\n                                    style=\"color:red;margin-left: 184px;\">*Maxlength should\n                                    be 60 characters.</span></span>\n        \n                            <div class=\"divInsure\">\n        \n                                <label>Insurance</label>\n                                <input type=\"text\" class=\"form-control insur\" formControlName=\"insurance\" placeholder=\"INR\">\n                            </div>\n        \n        \n                            <div *ngIf=\"destinationForm.controls['insurance'].hasError('maxlength')\"><span\n                                    style=\"color:red;margin-left: 8%;\">*Maxlength should\n                                    be 20 numbers.</span></div>\n                            <div *ngIf=\"destinationForm.controls['insurance'].hasError('pattern')\"><span\n                                    style=\"color:red;margin-left: 123px;\">*Don't\n                                    use small and capital letter and special characters.</span></div>\n        \n                            <label class=\"optionals\">Optional</label>\n                            <div class=\"activeinactiv\">\n                                <input type=\"radio\" name=\"activeInsurance\" value=\"ACTIVE\" [checked]=\"true\"\n                                    formControlName=\"activeInsurance\" style=\"margin-left: 9px;\">\n                                <label>Active</label>\n                                <input type=\"radio\" name=\"activeInsurance\" value=\"INACTIVE\" formControlName=\"activeInsurance\"\n                                    style=\"margin-left: 8%;\">\n                                <label>Inactive</label>\n                            </div>\n                            <div class=\"btn\">\n                                <button type=\"button\" class=\"btn btn-success\" [disabled]=\"!destinationForm.valid\"\n                                    (click)=\"updateDestination()\">UPDATE</button>\n                            </div>\n                        </div>\n                    </form>\n        </div>\n        <div *ngIf=\"val!=0\">\n            <div class=\"container\" style=\"border-style: ridge;width: 83%;\">\n                <section style=\"padding-top: 22px;\">\n\n                    <input type=\"search\" class=\"srch\" [(ngModel)]=\"filterName\" maxlength=\"50\"\n                        (keyup)=\"searchValues($event.target.value)\" placeholder=\"Search by country\">\n                    <select class=\"selects1\" (change)=\"selectStatuss($event.target.value)\">\n                        <option value=\"\">Select status</option>\n                        <option value=\"ALL\">All</option>\n                        <option value=\"ACTIVE\">Active</option>\n                        <option value=\"INACTIVE\">Inactive</option>\n                    </select>\n                </section>\n                <section class=\"content\">\n                    <div class=\"row\">\n                        <div class=\"col-xs-12\">\n                            <div class=\"box\">\n                                <!-- /.box-header -->\n                                <div class=\"box-body\">\n                                    <table id=\"customers\" class=\"table table-bordered table-hover\">\n                                        <thead>\n                                            <tr class=\"trt\">\n                                                <th class=\"tdt\">S.No.<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                                <th class=\"tdt\">Country<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                                <th class=\"tdt\">Destination<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                                <th class=\"tdt\">Status<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                                <th class=\"tdt\">Actions<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n\n                                            </tr>\n                                        </thead>\n                                        <tbody *ngIf=\"destnList\">\n                                            <!-- | paginate : {itemsPerPage: 7, currentPage:page, totalItems:total}; let i=index -->\n                                            <tr\n                                                *ngFor=\"let items of destnList | paginate : {itemsPerPage:10, currentPage:page, totalItems:total}; let i=index\">\n                                                <td class=\"tdt\">{{limit * (page-1)+i+1}}</td>\n                                                <td class=\"tdt\">{{items.countryName || '--'}}</td>\n                                                <td class=\"tdt\">{{items.destination || '--'}}</td>\n                                                <!-- <td>{{items.name}}</td> [routerLink]=\"['/edit-destination',items?._id]\"-->\n                                                <td class=\"tdt \" *ngIf=\"items.status=='ACTIVE'\">Active</td>\n                                                <td class=\"tdt\" *ngIf=\"items.status!='ACTIVE'\">Inactive</td>\n                                                <td class=\"d-flex text-center\">\n                                                    <span style=\"display: flex;justify-content: center;\">\n                                                        <!-- <a class=\"btn btn-app edt\"\n                                                    [routerLink]=\"['/edit-destination/',items?._id]\">\n                                                    <i class=\"fa fa-edit\"></i> Edit\n                                                </a> -->\n                                                        <a class=\"btn btn-app edt\" style=\"border: none;\"\n                                                            data-toggle=\"collapse\" href=\"#collapseExample\" role=\"button\"\n                                                            aria-expanded=\"false\" aria-controls=\"collapseExample\"\n                                                            (click)=\"editIdWebsite(items?._id)\">\n                                                            <i class=\"fa fa-edit\"></i>\n                                                        </a>\n                                                        <a class=\"btn btn-app dlt\" data-toggle=\"modal\"\n                                                            style=\"border: none;\" data-target=\"#exampdelete\"\n                                                            (click)=\"deleteFunction(items?._id)\">\n                                                            <i class=\"fa fa-trash\"></i>\n                                                        </a>\n                                                    </span>\n                                                </td>\n                                            </tr>\n\n\n                                        </tbody>\n\n                                    </table>\n                                    <h3 *ngIf=\"destnList?.length==0\" style=\"text-align:center\">Data not Found!</h3>\n                                </div>\n\n                                <pagination-controls (pageChange)=\"changePage($event) \" style=\"float:right;\"\n                                    *ngIf=\"destnList?.length != 0\">\n                                </pagination-controls>\n                            </div>\n\n                        </div>\n                    </div>\n                </section>\n            </div>\n        </div>\n\n\n\n    </div>\n    <div class=\"upper_tab show active\" [ngClass]=\"{'active': tab =='Website'}\" *ngIf=\"(tab == 'Website')\"\n        role=\"tabpanel\" aria-labelledby=\"favourite-tab\">\n        <!-- <label>Add Website</label> -->\n        <div class=\"collapse\" id=\"collapseExample\">\n            <div class=\"container\" style=\"border-style: ridge;width: 83%;\">\n                <form [formGroup]=\"editorForm\" style=\"padding: 9px;\">\n                    <label>Page Title</label>\n                    <input type=\"text\" name=\"title\" formControlName=\"title\" placeholder=\"About as\"\n                        style=\"margin-left: 2.5%;\">\n                    <div *ngIf=\"editorForm.get('title').hasError('required') && editorForm.get('title').touched\">\n                        <span style=\"color:red;margin-left: 182px;;\">*Title is required.</span></div>\n\n                    <div *ngIf=\"editorForm.controls['title'].hasError('maxlength')\"><span\n                            style=\"color:red;margin-left: 182px;\">*Maxlength should\n                            be 20 characters.</span></div>\n                    <div class=\"description\">\n                        <label >Description</label>\n                        <ck-editor name=\"editor1\" maxlength=\"256\" id=\"editors\"\n                            style=\"margin-top: 9px;margin-left: 22px;border: 2px solid gray;\"\n                            formControlName=\"description\" maxlength=\"512\" skin=\"moono-lisa\" language=\"en\"\n                            [fullPage]=\"true\" [config]=\"config\"></ck-editor>\n                        <!-- <div *ngIf=\"editorForm.get('description').hasError('required') && editorForm.get('description').touched\">\n                        <span style=\"color:red;margin-left: 138px;;\">*Description is required.</span></div> -->\n\n                    </div>\n                    <span *ngIf=\"editorForm.controls['description'].hasError('maxlength')\"><span\n                            style=\"color:red;margin-left: 184px;\">*Maxlength should\n                            be 256 characters.</span></span>\n                    <div class=\"updateBtn\">\n                        <button class=\"btn btn-success upd\" type=\"submit\" (click)=\"updatewebsite()\"\n                            [disabled]=\"!editorForm.valid || editors==''\">UPDATE</button>\n                    </div>\n\n                </form>\n            </div>\n        </div>\n\n\n        <div *ngIf=\"val==1\">\n            <div class=\"container\" style=\"border-style: ridge;width: 83%;\">\n                <form [formGroup]=\"editorForm\" style=\"padding: 9px;\">\n                    <label style=\"margin-left: 78px;\">Page Title</label>\n                    <input type=\"text\" name=\"title\" formControlName=\"title\" placeholder=\"About as\"\n                        style=\"margin-left: 2.5%;\">\n                    <div *ngIf=\"editorForm.get('title').hasError('required') && editorForm.get('title').touched\">\n                        <span style=\"color:red;margin-left: 182px;;\">*Title is required.</span></div>\n\n                    <div *ngIf=\"editorForm.controls['title'].hasError('maxlength')\"><span\n                            style=\"color:red;margin-left: 182px;\">*Maxlength should\n                            be 20 characters.</span></div>\n                    <div class=\"description\">\n                        <label style=\"margin-left: 78px;\">Description</label>\n                        <ck-editor name=\"editor1\" maxlength=\"256\" id=\"editors\"\n                            style=\"margin-top: 9px;margin-left: 22px;border: 2px solid gray;\"\n                            formControlName=\"description\" maxlength=\"512\" skin=\"moono-lisa\" language=\"en\"\n                            [fullPage]=\"true\" [config]=\"config\"></ck-editor>\n                        <!-- <div *ngIf=\"editorForm.get('description').hasError('required') && editorForm.get('description').touched\">\n                                <span style=\"color:red;margin-left: 138px;;\">*Description is required.</span></div> -->\n\n                    </div>\n                    <span *ngIf=\"editorForm.controls['description'].hasError('maxlength')\"><span\n                            style=\"color:red;margin-left: 184px;\">*Maxlength should\n                            be 256 characters.</span></span>\n                    <div class=\"updateBtn\">\n                        <button class=\"btn btn-success upd\" type=\"submit\" (click)=\"updatewebsite()\"\n                            [disabled]=\"!editorForm.valid || editors==''\">UPDATE</button>\n                    </div>\n\n                </form>\n            </div>\n        </div>\n        <div class=\"container\" style=\"border-style: ridge;width: 83%;\" *ngIf=\"val!=1\">\n            <section style=\"padding-top: 22px;\">\n\n                <input type=\"search\" class=\"srch\" [(ngModel)]=\"filterName\" maxlength=\"50\"\n                    (keyup)=\"searchValue($event.target.value)\" placeholder=\"Search by title\">\n                <select class=\"selects1\" (change)=\"selectStatus($event.target.value)\">\n                    <option value=\"\">Select status</option>\n                    <option value=\"ALL\">All</option>\n                    <option value=\"ACTIVE\">Active</option>\n                    <option value=\"INACTIVE\">Inactive</option>\n                </select>\n            </section>\n            <section class=\"content\">\n                <div class=\"row\">\n                    <div class=\"col-xs-12\">\n                        <div class=\"box\">\n                            <!-- /.box-header -->\n                            <div class=\"box-body\">\n                                <table id=\"customers\" class=\"table table-bordered table-hover\">\n                                    <thead>\n                                        <tr class=\"trt\">\n                                            <th class=\"tdt\">S.No.<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                            <th class=\"tdt\">Title<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                            <th class=\"tdt\">Description<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                            <th class=\"tdt\">Status<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                            <th class=\"tdt\">Actions</th>\n\n                                        </tr>\n                                    </thead>\n                                    <tbody *ngIf=\"contentList\">\n                                        <!-- | paginate : {itemsPerPage: 7, currentPage:page, totalItems:total}; let i=index -->\n                                        <tr\n                                            *ngFor=\"let items of contentList | paginate : {itemsPerPage: 7, currentPage:page, totalItems:total}; let i=index\">\n                                            <td class=\"tdt \">{{limit * (page-1)+i+1}}</td>\n                                            <td class=\"tdt\">{{items.title || '--'}}</td>\n                                            <td class=\"tdt\" class=\"\" [innerHTML]=\"items.description | sanitizeHtmlPipe\"\n                                                title=\"{{items.description || '--'}}\"\n                                                style=\"width: 50%;word-break: break-all;\">{{items.description || '--'}}\n                                            </td>\n                                            <td [ngClass]=\"active\" class=\"tdt\" *ngIf=\"items.status=='ACTIVE'\">Active\n                                            </td>\n                                            <td class=\"tdt\" *ngIf=\"items.status!='ACTIVE'\">Inactive</td>\n\n                                            <td class=\"tdt\">\n                                                <span style=\"display: flex;display: flex;\n                                                    justify-content: center;\"> <a class=\"btn btn-app edt\"\n                                                        style=\"border: none;\" data-toggle=\"collapse\"\n                                                        href=\"#collapseExample\" role=\"button\" aria-expanded=\"false\"\n                                                        aria-controls=\"collapseExample\">\n                                                        <i class=\"fa fa-edit\" (click)=\"editIdWebsite(items?._id)\"></i>\n                                                    </a>\n\n                                                </span></td>\n                                        </tr>\n\n\n                                    </tbody>\n\n                                </table>\n                                <h3 *ngIf=\"contentList?.length==0\" style=\"text-align:center\">Dta not Found!</h3>\n                            </div>\n\n                            <pagination-controls (pageChange)=\"changePage($event) \" style=\"float:right;\"\n                                *ngIf=\"contentList?.length != 0\">\n                            </pagination-controls>\n                            <!-- /.box-body -->\n                        </div>\n                        <!-- /.box -->\n\n\n                        <!-- /.box -->\n                    </div>\n                    <!-- /.col -->\n                </div>\n                <!-- /.row -->\n            </section>\n        </div>\n\n    </div>\n    <div class=\"upper_tab show active\" [ngClass]=\"{'active': tab =='Banners'}\" *ngIf=\"(tab == 'Banners')\"\n        role=\"tabpanel\" aria-labelledby=\"favourite-tab\">\n        <!-- <label>Add Banners</label> -->\n        <div class=\"collapse\" id=\"collapseExample\" *ngIf=\"val!=2\">\n            <div class=\"container con\">\n                <div>\n                    <label class=\"\" style=\"font-size: 20px;\">Edit Banners</label>\n                </div>\n                <!-- <input type=\"file\" class=\"inptdestination\"> -->\n\n                <div class=\"image-upload\">\n                    <label for=\"file-input\">\n                        <img class=\"imgg\" [src]=\"bannerImage?bannerImage:'assets/adminLTE/dist/img/uploadImage.png'\"\n                            src=\"assets/pic_trulli.jpg\" />\n                        <!-- <img class=\"immgs\" src=\"assets/i18n/pll.png\" /> -->\n                    </label>\n\n                    <input id=\"file-input\" type=\"file\" name=\"imageUrl\" accept=\"image/*\"\n                        (change)=\"handleInputChange($event)\" style=\"display:none;\" />\n\n                    <!-- <button type=\"button\" class=\"imagebtn\">Upload image</button> -->\n\n                </div>\n                <form [formGroup]=\"bannerForm\">\n                    <div class=\"titles\">\n                        <label>Title</label>\n                        <input type=\"text\" formControlName=\"title\" class=\"form-control ipt\" style=\"margin-left: 8%;\">\n                    </div>\n                    <div *ngIf=\"bannerForm.get('title').hasError('required') && bannerForm.get('title').touched\">\n                        <span style=\"color:red;margin-right: -2.5%;    margin-left:178px;\n                    \">*Title is required.</span>   </div>\n                        <!-- <span *ngIf=\"bannerForm.controls['title'].hasError('minlength')\"><span\n                        style=\"color:red;    margin-left: 15%;\">*Minlength should\n                        be 8 characters.</span></span> -->\n\n                        <span *ngIf=\"bannerForm.controls['title'].hasError('maxlength')\"><span\n                                style=\"color:red; margin-left: 15%;\">*Maxlength should\n                                be 20 characters.</span></span>\n                 \n\n                    <div *ngIf=\"bannerForm.controls['title'].hasError('maxlength')\"><span\n                            style=\"color:red;margin-left: 30%;\">*Maxlength should\n                            be 20 characters.</span></div>\n                    <div class=\"activeinactiv\">\n                        <input type=\"radio\" name=\"activeInsurance\" value=\"ACTIVE\" formControlName=\"activeInsurance\"\n                            style=\"margin-left: 2%;\">\n                        <label>Active</label>\n                        <input type=\"radio\" name=\"activeInsurance\" value=\"INACTIVE\" formControlName=\"activeInsurance\"\n                            style=\"margin-left: 5%;\">\n                        <label>Inactive</label>\n                    </div>\n                    <div class=\"btn\">\n                        <button type=\"button\" class=\"btn btn-success\" [disabled]=\"!bannerForm.valid || imageSrc==''\"\n                            (click)=\"updatebanner()\">UPDATE</button>\n                    </div>\n                </form>\n            </div>\n        </div>\n        <div *ngIf=\"val==2\">\n                <div class=\"container con\">\n                        <div>\n                            <label class=\"\" style=\"font-size: 20px;\">Edit Banners</label>\n                        </div>\n                        <!-- <input type=\"file\" class=\"inptdestination\"> -->\n        \n                        <div class=\"image-upload\">\n                            <label for=\"file-input\">\n                                <img class=\"imgg\" [src]=\"bannerImage?bannerImage:'assets/adminLTE/dist/img/uploadImage.png'\"\n                                    src=\"assets/pic_trulli.jpg\" />\n                                <!-- <img class=\"immgs\" src=\"assets/i18n/pll.png\" /> -->\n                            </label>\n        \n                            <input id=\"file-input\" type=\"file\" name=\"imageUrl\" accept=\"image/*\"\n                                (change)=\"handleInputChange($event)\" style=\"display:none;\" />\n        \n                            <!-- <button type=\"button\" class=\"imagebtn\">Upload image</button> -->\n        \n                        </div>\n                        <form [formGroup]=\"bannerForm\">\n                            <div class=\"titles\">\n                                <label>Title</label>\n                                <input type=\"text\" formControlName=\"title\" class=\"form-control ipt\" style=\"margin-left: 8%;\">\n                            </div>\n                            <div *ngIf=\"bannerForm.get('title').hasError('required') && bannerForm.get('title').touched\">\n                                <span style=\"color:red;margin-right: -2.5%;    margin-left:178px;\n                            \">*Title is required.</span>\n                                <!-- <span *ngIf=\"bannerForm.controls['title'].hasError('minlength')\"><span\n                                style=\"color:red;    margin-left: 15%;\">*Minlength should\n                                be 8 characters.</span></span> -->\n        \n                                <span *ngIf=\"bannerForm.controls['title'].hasError('maxlength')\"><span\n                                        style=\"color:red;    margin-left: 15%;\">*Maxlength should\n                                        be 20 characters.</span></span>\n                            </div>\n        \n                            <div *ngIf=\"bannerForm.controls['title'].hasError('maxlength')\"><span\n                                    style=\"color:red;margin-left: 30%;\">*Maxlength should\n                                    be 20 characters.</span></div>\n                            <div class=\"activeinactiv\">\n                                <input type=\"radio\" name=\"activeInsurance\" value=\"ACTIVE\" formControlName=\"activeInsurance\"\n                                    style=\"margin-left: 2%;\">\n                                <label>Active</label>\n                                <input type=\"radio\" name=\"activeInsurance\" value=\"INACTIVE\" formControlName=\"activeInsurance\"\n                                    style=\"margin-left: 5%;\">\n                                <label>Inactive</label>\n                            </div>\n                            <div class=\"btn\">\n                                <button type=\"button\" class=\"btn btn-success\" [disabled]=\"!bannerForm.valid || imageSrc==''\"\n                                    (click)=\"updatebanner()\">UPDATE</button>\n                            </div>\n                        </form>\n                    </div>\n        </div>\n        <div class=\"container\" style=\"border-style: ridge;width: 83%;\" *ngIf=\"val!=2\">\n            <section style=\"padding-top: 22px;\">\n\n                <!-- <input type=\"search\" class=\"srch\" [(ngModel)]=\"filterName\" maxlength=\"50\"\n                        (keyup)=\"searchValue($event.target.value)\" placeholder=\"Search by name\"> -->\n                <select class=\"selects1\" (change)=\"selectStatus($event.target.value)\">\n                    <option value=\"\">Select status</option>\n                    <option value=\"ALL\">All</option>\n                    <option value=\"ACTIVE\">Active</option>\n                    <option value=\"INACTIVE\">Inactive</option>\n                </select>\n            </section>\n            <section class=\"content\">\n                <div class=\"row\">\n                    <div class=\"col-xs-12\">\n                        <div class=\"box\">\n                            <!-- /.box-header -->\n                            <div class=\"box-body\">\n                                <table id=\"customers\" class=\"table table-bordered table-hover\">\n                                    <thead>\n                                        <tr class=\"trt\">\n                                            <th class=\"tdt\">S.No.<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                            <th class=\"tdt\">Title<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                            <th class=\"tdt\">Image<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                            <th class=\"tdt\">Status<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                            <th class=\"tdt\">Action</th>\n\n                                        </tr>\n                                    </thead>\n                                    <tbody *ngIf=\"bannerList!=[]\">\n                                        <!-- | paginate : {itemsPerPage: 7, currentPage:page, totalItems:total}; let i=index -->\n                                        <tr\n                                            *ngFor=\"let items of bannerList | paginate : {itemsPerPage:10, currentPage:page, totalItems:total}; let i=index\">\n                                            <td class=\"table-width\">{{limit * (page-1)+i+1}}</td>\n                                            <td class=\"table-width\">{{items.title}}</td>\n                                            <td class=\"table-width\"><img class=\"tdImage\" [src]=\"items.bannerPic\"></td>\n                                            <td class=\"table-width\" *ngIf=\"items.status=='ACTIVE'\">Active</td>\n                                            <td class=\"table-width\" *ngIf=\"items.status!='ACTIVE'\">Inactive</td>\n                                            <td class=\"table-width\">\n                                                <div style=\"display: flex;justify-content: center;\"> <a\n                                                        class=\"btn btn-app edt\" style=\"border: none;\"\n                                                        data-toggle=\"collapse\" href=\"#collapseExample\" role=\"button\"\n                                                        aria-expanded=\"false\" aria-controls=\"collapseExample\"\n                                                        (click)=\"editIdWebsite(items?._id)\">\n                                                        <i class=\"fa fa-edit\"></i>\n                                                    </a>\n                                                    <a class=\"btn btn-app dlt\" data-toggle=\"modal\" style=\"border: none;\"\n                                                        data-target=\"#bannermodaldelete\"\n                                                        (click)=\"deletebanner(items?._id)\">\n                                                        <i class=\"fa fa-trash\"></i>\n                                                    </a>\n                                                </div>\n                                            </td>\n                                        </tr>\n\n\n                                    </tbody>\n                                    <tr>\n                                        <td *ngIf=\"bannerList==[]\">\n                                            <h3 style=\"text-align: center;\">Data not found!</h3>\n                                        </td>\n                                    </tr>\n                                </table>\n\n                            </div>\n\n                            <pagination-controls (pageChange)=\"changePage($event) \" style=\"float:right;\"\n                                *ngIf=\"bannerList?.length != 0\">\n                            </pagination-controls>\n                            <!-- /.box-body -->\n                        </div>\n                        <!-- /.box -->\n\n\n                        <!-- /.box -->\n                    </div>\n                    <!-- /.col -->\n                </div>\n                <!-- /.row -->\n            </section>\n        </div>\n\n\n    </div>\n</div>\n\n<div class=\"modal fade\" id=\"bannermodaldelete\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\"\n    aria-hidden=\"true\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <H3 style=\"text-align:center;padding-top: 42px;\">Delete Banner?</H3>\n            <hr>\n            <div class=\"modal-body\" style=\"display: flex;justify-content: center;padding: 26px\">\n                <b style=\"font-size: 20px;font-weight: 500;\">Are you sure you want to delete this banner ?</b>\n            </div>\n            <div class=\"modal-footer\" style=\"display: flex;justify-content: space-between;\">\n                <button type=\"button\"\n                    style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: red;color: white;\"\n                    data-dismiss=\"modal\">No</button>\n                <button type=\"button\"\n                    style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: green;color: white;\"\n                    (click)=\"deletebanners()\" data-dismiss=\"modal\">Yes</button>\n            </div>\n        </div>\n    </div>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/edit-package-management/edit-package-management.component.html":
  /*!**********************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/edit-package-management/edit-package-management.component.html ***!
    \**********************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppEditPackageManagementEditPackageManagementComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-sidebar></app-sidebar>\n<div class=\"content-wrapper\">\n    <section class=\"content-header\">\n        <h3 class=\"box-title\">Package Management / Edit\n\n        </h3>\n        <div class=\"box box-warning wr\">\n               \n            <div class=\"box-header with-border\">\n               \n              \n            </div>\n            <!-- <div class=\"image-upload\" style=\"display: flex;justify-content: center;padding: 60px;\">\n                    <label for=\"file-input\">\n                      <img class=\"imgg\" [src]=\"profile\" src=\"assets/i18n/ak.png\" />\n                      <img class=\"immgs\" src=\"assets/i18n/editimage.png\" />\n                    </label>\n              \n                    <input id=\"file-input\" type=\"file\" name=\"imageUrl\" accept=\"image/*\" (change)=\"handleInputChange($event)\" />\n                  </div> -->\n\n            <!-- /.box-header -->\n            <div class=\"box-body bd\">\n                    <div>\n                            <label for=\"file-input\">\n                                    <img class=\"imgs\" [src]=\"profile?profile:'assets/i18n/images (5).jpeg'\">\n                            </label>\n                          \n                            <input id=\"file-input\" type=\"file\" name=\"imageUrl\"  accept=\"image/*\"\n                            (change)=\"handleInputChange($event)\" />\n    \n                    </div>\n                <form role=\"form\" [formGroup]=\"addpackageForm\">\n                    <!-- text input -->\n                   \n                    <div class=\"form-group\">\n                        <label>Country:</label>\n                        <select class=\"form-control selectCountry\" formControlName=\"country\">\n                            <option value=\"\">Select country</option>\n                            <option value=\"{{item._id}}\" *ngFor=\"let item of countryList\">{{item.country}}</option>\n                        </select>\n                      \n                    </div>\n\n                    <div class=\"form-group\">\n                        <label>Destination:</label>\n                        <select class=\"form-control selectCountry\" formControlName=\"destination\">\n                            <option value=\"\">Select destination</option>\n                            <option value=\"{{item._id}}\" *ngFor=\"let item of destinationLists\">{{item.destination}}</option>\n                        </select>\n                      \n                    </div>\n\n\n                    <div class=\"form-group\">\n                        <label>Package Type:</label>\n                        <select class=\"form-control selectCountry\" formControlName=\"packagetype\">\n                            <option value=\"\">--Choose--</option>\n                            <option value=\"{{item._id}}\" *ngFor=\"let item of packageLists\">{{item.type}}</option>\n                        </select>\n                      \n                    </div>\n                  \n                    <div class=\"form-group\">\n                            <label>Package Name:</label>\n                        <input type=\"text\" class=\"form-control\" formControlName=\"packagename\" (keypress)=\"service.preventSpace($event)\" placeholder=\"Please enter package name\"\n                            (keypress)=\"service.preventSpace($event)\">\n\n                            <!-- <span *ngIf=\"addSubAdminForm.get('packagename').hasError('required') && addSubAdminForm.get('packagename').touched\">\n                        <span style=\"color:red;\">*Please enter your package name.</span></span> -->\n                    <!-- <span *ngIf=\"addSubAdminForm.controls['packagename'].hasError('minlength')\">\n                            style=\"color:red;\">*Minlength should\n                            be 2 characters.</span>\n\n                    <span *ngIf=\"addSubAdminForm.controls['packagename'].hasError('maxlength')\"><span\n                            style=\"color:red;\">*Maxlength should\n                            be 60 characters.</span></span>\n                    <span *ngIf=\"addSubAdminForm.controls['packagename'].hasError('pattern')\"><span style=\"color:red;\">*Don't\n                            use Special characters.</span></span> -->\n\n                    </div>\n\n                    <div class=\"form-group\">\n                            <label>Package Days:</label>\n                            <select class=\"form-control selectCountry\" formControlName=\"packagedays\">\n                                    <option value=\"\">--Choose--</option>\n                                    <option value=\"0\">0</option>\n                                    <option value=\"1\">1</option>\n                                    <option value=\"2\">2</option>\n                                    <option value=\"3\">3</option>\n                                    <option value=\"4\">4</option>\n                                    <option value=\"5\">5</option>\n                                    <option value=\"6\">6</option>\n                                    <option value=\"7\">7</option>\n                                    <option value=\"8\">8</option>\n                                    <option value=\"9\">9</option>\n                                    <option value=\"10\">10</option>\n                               \n                               \n                            </select>\n                          \n                        </div>\n\n                        <div class=\"form-group\">\n                                <label>Package Nights:</label>\n                                <select class=\"form-control selectCountry\" formControlName=\"packagenight\">\n                                        <option value=\"\">--Choose--</option>\n                                        <option value=\"\">--Choose--</option>\n                                        <option value=\"0\">0</option>\n                                        <option value=\"1\">1</option>\n                                        <option value=\"2\">2</option>\n                                        <option value=\"3\">3</option>\n                                        <option value=\"4\">4</option>\n                                        <option value=\"5\">5</option>\n                                        <option value=\"6\">6</option>\n                                        <option value=\"7\">7</option>\n                                        <option value=\"8\">8</option>\n                                        <option value=\"9\">9</option>\n                                        <option value=\"10\">10</option>                                </select>\n                              \n                            </div>\n\n\n\n                            \n\n                            <label>Package description:</label>\n                            <ck-editor name=\"editor1\" [config] = \"config\" [(ngModel)]=\"editorValue\" [ngModelOptions]=\"{standalone: true}\" language=\"en\" ></ck-editor>\n                            <br>\n                            <br>\n\n                            <!-- <div class=\"form-group\">\n                                <div class=\"row\"> -->\n                                    <!-- <div class=\"col-md-2\">\n                                        <input type=\"text\" class=\"form-control\" >\n\n                                    </div> -->\n                                    <!-- <ul>\n                                        <li>\n                                                ITINERY\n                                        </li>\n                                    </ul>\n\n                                    <div class=\"col-md-10\" style=\"width: 115%;\">\n                                        <input type=\"text\"  class=\"form-control\">\n                                    </div>\n\n                                </div>\n\n\n\n\n                            </div>\n\n                             -->\n\n                                    <!-- <h2 class=\"margin\">Itinery</h2>\n                                    <div class=\"outer_box\">\n                                        <input type=\"text\" formContorlName=\"itenery\"  class=\"outer_box\">\n                                    </div>  -->\n\n\n\n\n                                     \n                    <div class=\"form-group\">\n                            <label>Itenery:</label>\n                        <textarea type=\"text\" cols=\"30\" rows=\"10\" class=\"outer_box\" formControlName=\"Itinery\" (keypress)=\"service.preventSpace($event)\" placeholder=\"Please enter itenery\"\n                            (keypress)=\"service.preventSpace($event)\">\n                            </textarea>\n                    </div>\n\n\n\n                    <div class=\"form-group\">\n                            <label>Package Inclusion:</label>\n                        <textarea type=\"text\" cols=\"30\" rows=\"10\" class=\"outer_box\" formControlName=\"Packageinclusions\" (keypress)=\"service.preventSpace($event)\" placeholder=\"Please enter itenery\"\n                            (keypress)=\"service.preventSpace($event)\">\n                            </textarea>\n                    </div>\n\n                                   \n\n\n                    <div class=\"form-group\">\n                            <label>Exclusion:</label>\n                        <textarea type=\"text\" cols=\"30\" rows=\"10\" class=\"outer_box\" formControlName=\"Exclusions\" (keypress)=\"service.preventSpace($event)\" placeholder=\"Please enter itenery\"\n                            (keypress)=\"service.preventSpace($event)\">\n                            </textarea>\n                    </div>\n\n\n                   \n\n                    <div class=\"form-group\">\n                            <label>Terms & Condition:</label>\n                        <textarea type=\"text\" cols=\"30\" rows=\"10\" class=\"outer_box\" formControlName=\"Terms\" (keypress)=\"service.preventSpace($event)\" placeholder=\"Please enter itenery\"\n                            (keypress)=\"service.preventSpace($event)\">\n                            </textarea>\n                    </div>\n\n\n\n                    <div class=\"form-group\">\n                            <label>Package Cost:</label>\n                        <textarea type=\"text\" cols=\"30\" rows=\"10\" class=\"outer_box\" formControlName=\"Packagecost\" (keypress)=\"service.preventSpace($event)\" placeholder=\"Please enter itenery\"\n                            (keypress)=\"service.preventSpace($event)\">\n                            </textarea>\n                    </div>\n\n\n\n\n\n           \n\n\n\n                                    \n                                   \n                                \n                \n\n                    <div class=\"form-group\">\n                            <label>Cancellation Charges:</label>\n                        <textarea type=\"text\" cols=\"30\" rows=\"10\" class=\"outer_box\" formControlName=\"Cancellationcharges\" (keypress)=\"service.preventSpace($event)\" placeholder=\"Please enter itenery\"\n                            (keypress)=\"service.preventSpace($event)\">\n                            </textarea>\n                    </div>\n\n\n                                 <div class=\"form-group\">\n                                        <label>Flights Included:</label>\n                                        <select class=\"form-control selectCountry\" formControlName=\"flightsincluded\">\n                                            <option value=\"\">--Choose--</option>\n                                            <option value=\"YES\">Yes</option>\n                                                <option value=\"NO\">No</option\n>                                        </select>\n                                      \n                                    </div>\n\n                                    <div class=\"form-group\">\n                                            <label>Hotels Included:</label>\n                                            <select class=\"form-control selectCountry\" formControlName=\"Hotelsincluded\">\n                                                <option value=\"\">--Choose--</option>\n                                                <option value=\"YES\">Yes</option>\n                                                <option value=\"NO\">No</option>\n                                            </select>\n                                          \n                                        </div>\n\n\n\n\n\n                                        <div class=\"form-group\">\n                                                <label>Transfers Included:</label>\n                                                <select class=\"form-control selectCountry\" formControlName=\"Transfersincluded\">\n                                                        <option value=\"\">--Choose--</option>\n                                                        <option value=\"YES\">Yes</option>\n                                                        <option value=\"NO\">No</option>\n                                                </select>\n                                              \n                                            </div>\n                                            <div class=\"form-group\">\n                                                    <label>Transfers Category:</label>\n                                                    <select class=\"form-control selectCountry\" formControlName=\"Transferscategory\">\n                                                            <option value=\"\">--Choose--</option>\n                                                            <option value=\"{{item._id}}\" *ngFor=\"let item of transferLists\">{{item.category}}</option>\n\n                                                    </select>\n                                                  \n                                                </div>\n                                                <div class=\"form-group\">\n                                                        <label>Transfers Type:</label>\n                                                        <select class=\"form-control selectCountry\" formControlName=\"Transferstype\">\n                                                                <option value=\"\">--Choose--</option>\n                                                                <option value=\"{{item._id}}\" *ngFor=\"let item of transferTypeLists\">{{item.type}}</option>\n\n                                                        </select>\n                                                      \n                                                    </div>\n                                                    <!-- <div class=\"form-group row\">\n                                                           <div class=\"col-md-3\">\n                                                               <label for=\"\">Car Type</label>\n                                                           </div>\n                                                           <div class=\"col-md-7\" style=\"display: flex;\n                                                           justify-content: space-evenly;\">\n                                                                <input type=\"checkbox\"  formControlName=\"Cartype\">\n                                                                <label>Sedan</label>\n                                                                <input type=\"checkbox\"  formControlName=\"Cartype\">\n                                                                <label>Hatch Back</label>\n                                                                <input type=\"checkbox\"  formControlName=\"Cartype\">\n                                                                <label>SUV</label>\n                                                           </div>\n                                                           \n                                                        </div> -->\n                                                        <div class=\"form-group\">\n                                                                <label>Car Type:</label>\n                                                                <select class=\"form-control selectCountry\" formControlName=\"Cartype\">\n                                                                        <option value=\"\">--Choose--</option>\n                                                                        <option value=\"{{item._id}}\" *ngFor=\"let item of cartTypeLists\">{{item.carType}}</option>\n        \n                                                                </select>\n                                                              \n                                                            </div>\n                                  \n                                \n                                \n\n                                                    <div class=\"form-group\">\n                                                            <label>Sightseeing Included:</label>\n                                                            <select class=\"form-control selectCountry\" formControlName=\"Sightseeingincluded\">\n                                                                    <option value=\"\">--Choose--</option>\n                                                                    <option value=\"YES\">Yes</option>\n                                                                    <option value=\"NO\">No</option>\n                                                            </select>\n                                                          \n                                                        </div>\n\n\n                                                        <div class=\"form-group\">\n                                                                <label>Owner Name:</label>\n                                                            <input type=\"text\" class=\"form-control\" formControlName=\"Ownername\" (keypress)=\"service.preventSpace($event)\" placeholder=\"Please enter package name\"\n                                                                (keypress)=\"service.preventSpace($event)\">\n                                                        </div>\n\n                                                        <div class=\"form-group\">\n                                                                <label>Owner Contact:</label>\n                                                            <input type=\"text\" class=\"form-control\" formControlName=\"Ownercontact\" (keypress)=\"service.preventSpace($event)\" placeholder=\"Please enter package name\"\n                                                                (keypress)=\"service.preventSpace($event)\">\n                                                        </div>\n                                    \n\n                                                        <div class=\"form-group\">\n                                                                <label>Price Per Night:</label>\n                                                            <input type=\"text\" class=\"form-control\" formControlName=\"Pricepernight\" (keypress)=\"service.preventSpace($event)\" placeholder=\"Please enter package name\"\n                                                                (keypress)=\"service.preventSpace($event)\">\n                                                        </div>\n\n                                                        <div class=\"form-group\">\n                                                        <div class=\"activeinactiv\" style=\"margin-left: 8px;padding-top: 20px;\">\n                                                                <input type=\"radio\" class=\"activradio\" name=\"active\" value=\"ACTIVE\" [checked]=\"true\"\n                                                                    formControlName=\"active\" style=\"margin-left: 11%;\">\n                                                                <label>Active</label>\n                                                                <input type=\"radio\" name=\"Inactive\" value=\"INACTIVE\" formControlName=\"Inactive\"\n                                                                    style=\"margin-left: 41px;;\">\n                                                                <label>Inactive</label>\n                                                            </div>\n                                                        </div>\n                                    \n                                    \n                                    \n                                    \n                                    \n                                    \n                    \n\n\n        \n                 \n                    <!-- [disabled]=\"!addaddSubAdminForm.valid\" [disabled]=\"!addSubAdminForm.valid\"-->\n                    <div class=\"form-group add\">\n                        <button class=\"btn btn-success btn\" (click)=\"addpackage()\" [routerLink]=\"['/package-management']\"\n                            >ADD</button>\n                    </div>\n                </form>\n\n\n            </div>\n\n            <!-- /.box-body -->\n        </div>\n    </section>\n</div>\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/edit-setting/edit-setting.component.html":
  /*!************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/edit-setting/edit-setting.component.html ***!
    \************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppEditSettingEditSettingComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-sidebar></app-sidebar>\n<div class=\"content-wrapper\">\n    <section >\n        <div class=\"container con\">\n           \n                <ul class=\"nav nav-tabs tabs4col\" id=\"myTab\" role=\"tablist\" style=\"text-align: center;\">\n                    <li class=\"nav-item packes_c3\">\n                        <a class=\"nav-link active show ashow1\" style=\"cursor: pointer;\"\n                            [ngClass]=\"{'active': tab== 'PackageTypes'}\" (click)='tabChangedFunc(0)' data-toggle=\"tab\"\n                            role=\"tab\" aria-controls=\"home\" aria-selected=\"true\">\n                            Package Types\n                        </a>\n                    </li>\n                    <li class=\"nav-item packes_c3\">\n                        <a class=\"nav-link active show ashow1\" style=\"cursor: pointer;\"\n                            [ngClass]=\"{'active': tab== 'Transfer'}\" (click)='tabChangedFunc(1)' data-toggle=\"tab\"\n                            role=\"tab\" aria-controls=\"home\" aria-selected=\"false\">\n                            Transfer\n                        </a>\n                    </li>\n\n                    <li class=\"nav-item packes_c3\">\n                        <a class=\"nav-link active show ashow1\" style=\"cursor: pointer;\"\n                            [ngClass]=\"{'active': tab== 'CarType'}\" (click)='tabChangedFunc(2)' data-toggle=\"tab\"\n                            role=\"tab\" aria-controls=\"profile\" aria-selected=\"false\">\n                            Car Type\n                        </a>\n                    </li>\n                    <li class=\"nav-item packes_c3\">\n                        <a class=\"nav-link active show ashow1\" style=\"cursor: pointer;\"\n                            [ngClass]=\"{'active': tab== 'Countries'}\" (click)='tabChangedFunc(3)' data-toggle=\"tab\"\n                            role=\"tab\" aria-controls=\"profile\" aria-selected=\"false\">\n                            Countries\n                        </a>\n                    </li>\n                </ul>\n            </div>\n        \n     \n    </section>\n\n    <div class=\"upper_tab show active\" [ngClass]=\"{'active': tab =='PackageTypes'}\" *ngIf=\"(tab == 'PackageTypes')\"\n        role=\"tabpanel\" aria-labelledby=\"favourite-tab\">\n        <div class=\"collapse\" id=\"collapseExample\" >\n        <form [formGroup]=\"packageForm\">\n            <div class=\"container con\" style=\"padding: 8px;\">\n                <label>Edit Package Type</label>\n                <div class=\"destinations\">\n                    <label>Country</label>\n                    <select class=\"form-control selectCountry\" formControlName=\"country\">\n                        <option value=\"\">Select country</option>\n                        <option value=\"{{item._id}}\" *ngFor=\"let item of countryList\">{{item.country}}</option>\n                    </select>\n                    <div *ngIf=\"packageForm.get('country').hasError('required') && packageForm.get('country').touched\">\n                        <span style=\"color:red;float:right;margin-right:13.5%;\">*Country is required.</span></div>\n                    <label style=\"margin-left: 10%;\">Type</label>\n                    <input type=\"text\" class=\"types\" formControlName=\"type\" class=\"inptdestination\">\n                    \n\n                </div>\n                <div *ngIf=\"packageForm.get('type').hasError('required') && packageForm.get('type').touched\">\n                <span style=\"color:red;float:right;margin-right: 36%;\">*Type is required.</span></div>\n                <div *ngIf=\"packageForm.get('type').hasError('maxlength') && packageForm.get('type').touched\">\n                <span style=\"color:red;float:right;margin-right:28%;\">*Maxlength should be 20  characters.</span></div>\n\n                <div class=\"activeinactiv\" style=\"margin-left: 2%;\">\n                    <input type=\"radio\" class=\"activradio\" name=\"activeInsurance\" value=\"ACTIVE\" [checked]=\"true\"\n                        formControlName=\"activeInsurance\" style=\"margin-left: 11%;\">\n                    <label>Active</label>\n                    <input type=\"radio\" name=\"activeInsurance\" value=\"INACTIVE\" formControlName=\"activeInsurance\"\n                        style=\"margin-left: 9%;\">\n                    <label>Inactive</label>\n                </div>\n                <div >\n                    <button type=\"button\" class=\"btn btn-success btnss\" [disabled]=\"!packageForm.valid\"\n                        (click)=\"UpadePackage()\">UPDATE</button>\n                </div>\n            </div>\n        </form>\n        </div>\n        <div *ngIf=\"val==0\">\n            <form [formGroup]=\"packageForm\">\n                <div class=\"container con\" style=\"padding: 8px;\">\n                    <label>Edit Package Type</label>\n                    <div class=\"destinations\">\n                        <label>Country</label>\n                        <select class=\"selectCountry\" formControlName=\"country\">\n                            <option value=\"\">Select country</option>\n                            <option value=\"{{item._id}}\" *ngFor=\"let item of countryList\">{{item.country}}</option>\n                        </select>\n                        <div *ngIf=\"packageForm.get('country').hasError('required') && packageForm.get('country').touched\">\n                            <span style=\"color:red;float:right;margin-right:13.5%;\">*Country is required.</span></div>\n                        <label style=\"margin-left: 10%;\">Type</label>\n                        <input type=\"text\" class=\"types\" formControlName=\"type\" class=\"inptdestination\">\n                        \n    \n                    </div>\n                    <div *ngIf=\"packageForm.get('type').hasError('required') && packageForm.get('type').touched\">\n                    <span style=\"color:red;float:right;margin-right: 36%;\">*Type is required.</span></div>\n                    <div *ngIf=\"packageForm.get('type').hasError('maxlength') && packageForm.get('type').touched\">\n                    <span style=\"color:red;float:right;margin-right:28%;\">*Maxlength should be 20  characters.</span></div>\n    \n                    <div class=\"activeinactiv\" style=\"margin-left: 2%;\">\n                        <input type=\"radio\" class=\"activradio\" name=\"activeInsurance\" value=\"ACTIVE\" [checked]=\"true\"\n                            formControlName=\"activeInsurance\" style=\"margin-left: 11%;\">\n                        <label>Active</label>\n                        <input type=\"radio\" name=\"activeInsurance\" value=\"INACTIVE\" formControlName=\"activeInsurance\"\n                            style=\"margin-left: 9%;\">\n                        <label>Inactive</label>\n                    </div>\n                    <div >\n                        <button type=\"button\" class=\"btn btn-success btnss\" [disabled]=\"!packageForm.valid\"\n                            (click)=\"UpadePackage()\">UPDATE</button>\n                    </div>\n                </div>\n            </form>\n        </div>\n    <div *ngIf=\"val!=0\">\n        <div class=\"container\" style=\"border-style: ridge;width: 83%;\">\n            <section style=\"padding-top: 22px;\">\n                <input type=\"search\" class=\"srch\" [(ngModel)]=\"filterName\" maxlength=\"50\"\n                    (keyup)=\"searchValue($event.target.value)\" placeholder=\"Search by name\">\n                <select class=\"selects1\" (change)=\"selectStatuss($event.target.value)\">\n                    <option value=\"\">Select status</option>\n                    <option value=\"ALL\">All</option>\n                    <option value=\"ACTIVE\">Active</option>\n                    <option value=\"INACTIVE\">Inactive</option>\n                </select>\n            </section>\n            <section class=\"content\">\n                <div class=\"row\">\n                    <div class=\"col-xs-12\">\n                        <div class=\"box\">\n                            <!-- /.box-header -->\n                            <div class=\"box-body\">\n                                <table id=\"customers\" class=\"table table-bordered table-hover\">\n                                    <thead>\n                                        <tr class=\"trt\">\n                                            <th class=\"tdt\">S.No.<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                            <th class=\"tdt\">Country<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                            <th class=\"tdt\">Type<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                            <th class=\"tdt\">Status<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                            <th class=\"tdt\">Actions</th>\n                                        </tr>\n                                    </thead>\n                                    <tbody *ngIf=\"packageLists\">\n                                        <!-- | paginate : {itemsPerPage: 7, currentPage:page, totalItems:total}; let i=index -->\n                                        <tr\n                                            *ngFor=\"let items of packageLists | paginate : {itemsPerPage:10, currentPage:page, totalItems:total}; let i=index\">\n                                            <td class=\"tdt\">{{limit * (page-1)+i+1}}</td>\n                                            <td class=\"tdt\">{{items.countryName || '--'}}</td>\n                                            <td class=\"tdt\">{{items.type || '--'}}</td>\n                                            <!-- <td>{{items.name}}</td> [routerLink]=\"['/edit-destination',items?._id]\"-->\n                                            <td class=\"tdt\" *ngIf=\"items.status=='ACTIVE'\">Active</td>\n                                            <td class=\"tdt\" *ngIf=\"items.status!='ACTIVE'\">Inactive</td>\n                                            <td class=\"tdt\">\n                                                <div style=\"display: flex;justify-content: center;\"> <a\n                                                        class=\"btn btn-app edt\" style=\"border: none;\"\n                                                        data-toggle=\"collapse\" href=\"#collapseExample\" role=\"button\" aria-expanded=\"false\" aria-controls=\"collapseExample\"\n                                                    (click)=\"editIdWebsite(items?._id)\">\n                                                        <i class=\"fa fa-edit\"></i>\n                                                    </a>\n                                                    <a class=\"btn btn-app dlt\" style=\"border: none;\" data-toggle=\"modal\"\n                                                        data-target=\"#exampdelete\" (click)=\"deleteFunction(items?._id,'packageType')\">\n                                                        <i class=\"fa fa-trash\"></i>\n                                                    </a>\n                                                </div>\n                                            </td>\n                                        </tr>\n                                    </tbody>\n                                </table>\n                                <h3 *ngIf=\"packageLists?.length==0\" style=\"text-align: center;\">Data not found!</h3>\n                            </div>\n                            <pagination-controls (pageChange)=\"changePage($event) \" style=\"float:right;\"\n                                *ngIf=\"packageLists?.length != 0\">\n                            </pagination-controls>\n                        </div>\n                    </div>\n                </div>\n            </section>\n        </div>\n        </div>\n\n    </div>\n    <div class=\"upper_tab show active\" [ngClass]=\"{'active': tab =='Transfer'}\" *ngIf=\"(tab == 'Transfer')\"\n        role=\"tabpanel\" aria-labelledby=\"favourite-tab\">\n        <!-- <label>Add Website</label> -->\n        <div class=\"container acti_cs3\">\n           \n                <section >\n                    \n                            <div class=\"container categery_c3\">\n                                <ul class=\"nav nav-tabs tabs4col\" id=\"myTab\" role=\"tablist\" style=\"text-align: center;\">\n                                    <li class=\"nav-item trans_c3\">\n                                        <a class=\"nav-link active show ashow1\" style=\"cursor: pointer;\"\n                                            [ngClass]=\"{'active': tabs== 'TransferCategory'}\" (click)='tabChangedFuncs(0)' data-toggle=\"tab\"\n                                            role=\"tab\" aria-controls=\"home\" aria-selected=\"true\">\n                                            Transfer Category\n                                        </a>\n                                    </li>\n                                    <li class=\"nav-item trans_c3\">\n                                        <a class=\"nav-link active show ashow1\" style=\"cursor: pointer;\"\n                                            [ngClass]=\"{'active': tabs== 'TransferType'}\" (click)='tabChangedFuncs(1)' data-toggle=\"tab\"\n                                            role=\"tab\" aria-controls=\"home\" aria-selected=\"false\">\n                                            Transfer Type\n                                        </a>\n                                    </li>\n                                </ul>\n                            </div>\n                       \n                    </section>\n                    <div class=\"upper_tab show active\" [ngClass]=\"{'active': tabs =='TransferCategory'}\" *ngIf=\"(tabs == 'TransferCategory')\"\n                    role=\"tabpanel\" aria-labelledby=\"favourite-tab\" style=\"padding: 17px;\">\n                    <div class=\"collapse\" id=\"collapseExample\">\n                    <form [formGroup]=\"transfrForm\">\n                        <div class=\"container con\" style=\"padding: 8px;\">\n                            <label>Edit Transfer Category</label>\n                            <div class=\"destinations\">\n                                <label>Category</label>\n                                <input type=\"text\" class=\"selectCountry\"  formControlName=\"category\" (keypress)=\"service.preventSpace($event)\">\n                            </div>\n                            <div *ngIf=\"transfrForm.get('category').hasError('required') && transfrForm.get('category').touched\">\n                                    <span style=\"color:red;margin-left: 19%;;\">*Category is required.</span></div>\n                                <div *ngIf=\"transfrForm.controls['category'].hasError('maxlength')\"><span\n                                    style=\"color:red;margin-left: 19%;\">*Maxlength should\n                                        be 50 characters.</span></div>\n                            <div class=\"activeinactiv\" style=\"margin-left: 28px;\">\n                                <input type=\"radio\" class=\"activradio\" name=\"activeInsurance\" value=\"ACTIVE\" [checked]=\"true\"\n                                    formControlName=\"activeInsurance\" style=\"margin-left: 27px\">\n                                <label>Active</label>\n                                <input type=\"radio\" name=\"activeInsurance\" value=\"INACTIVE\" formControlName=\"activeInsurance\"\n                                    style=\"margin-left: 102px;\">\n                                <label>Inactive</label>\n                            </div>\n                            <div>\n                                <button type=\"button\" class=\"btn btn-success btnss\" [disabled]=\"!transfrForm.valid\"\n                                    (click)=\"UpadeTrancsfr()\">UPDATE</button>\n                            </div>\n                        </div>\n                    </form>\n                    </div>\n                    <div *ngIf=\"value==0\">\n                        <form [formGroup]=\"transfrForm\">\n                            <div class=\"container con\" style=\"padding: 8px;\">\n                                <label>Edit Transfer Category</label>\n                                <div class=\"destinations\">\n                                    <label>Category</label>\n                                    <input type=\"text\" class=\"selectCountry\"  formControlName=\"category\" (keypress)=\"service.preventSpace($event)\">\n                                </div>\n                                <div *ngIf=\"transfrForm.get('category').hasError('required') && transfrForm.get('category').touched\">\n                                        <span style=\"color:red;margin-left: 19%;;\">*Category is required.</span></div>\n                                    <div *ngIf=\"transfrForm.controls['category'].hasError('maxlength')\"><span\n                                        style=\"color:red;margin-left: 19%;\">*Maxlength should\n                                            be 50 characters.</span></div>\n                                <div class=\"activeinactiv\" style=\"margin-left: 28px;\">\n                                    <input type=\"radio\" class=\"activradio\" name=\"activeInsurance\" value=\"ACTIVE\" [checked]=\"true\"\n                                        formControlName=\"activeInsurance\" style=\"margin-left: 27px\">\n                                    <label>Active</label>\n                                    <input type=\"radio\" name=\"activeInsurance\" value=\"INACTIVE\" formControlName=\"activeInsurance\"\n                                        style=\"margin-left: 102px;\">\n                                    <label>Inactive</label>\n                                </div>\n                                <div>\n                                    <button type=\"button\" class=\"btn btn-success btnss\" [disabled]=\"!transfrForm.valid\"\n                                        (click)=\"UpadeTrancsfr()\">UPDATE</button>\n                                </div>\n                            </div>\n                        </form>\n                        </div>\n                        <div *ngIf=\"value!=0\">\n                    <div class=\"upper_tab show active\" [ngClass]=\"{'active': tabs =='TransferCategory'}\"\n                    *ngIf=\"(tabs == 'TransferCategory')\" role=\"tabpanel\" aria-labelledby=\"favourite-tab\"\n                    style=\"padding: 17px;\">\n                    <div class=\"container catey_cs3\">\n                        <section style=\"padding-top: 22px;\">\n                            <input type=\"search\" class=\"srch\" [(ngModel)]=\"filterName\" maxlength=\"50\"\n                                (keyup)=\"searchValue($event.target.value)\" placeholder=\"Search by category name\">\n                            <select class=\"selects1\" (change)=\"selectStatuss($event.target.value)\">\n                                <option value=\"\">Select status</option>\n                                <option value=\"ALL\">All</option>\n                                <option value=\"ACTIVE\">Active</option>\n                                <option value=\"INACTIVE\">Inactive</option>\n                            </select>\n                        </section>\n                        <section class=\"content\">\n                            <div class=\"row\">\n                                <div class=\"col-xs-12\">\n                                    <div class=\"box\">\n                                        <!-- /.box-header -->\n                                        <div class=\"box-body\">\n                                            <table id=\"customers\" class=\"table table-bordered table-hover\">\n                                                <thead>\n                                                    <tr class=\"trt\">\n                                                        <th class=\"tdt\">S.No.<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                                        <th class=\"tdt\">Transfer Category<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                                        <th class=\"tdt\">Status<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                                        <th class=\"tdt\">Actions</th>\n    \n                                                    </tr>\n                                                </thead>\n                                                <tbody *ngIf=\"transferLists\">\n                                                    <!-- | paginate : {itemsPerPage: 7, currentPage:page, totalItems:total}; let i=index -->\n                                                    <tr\n                                                        *ngFor=\"let items of transferLists | paginate : {itemsPerPage:10, currentPage:page, totalItems:total}; let i=index\">\n                                                        <td class=\"tdt\">{{limit * (page-1)+i+1}}</td>\n                                                        <td class=\"tdt\">{{items.category || '--'}}</td>\n                                                        <!-- <td>{{items.name}}</td> [routerLink]=\"['/edit-destination',items?._id]\"-->\n                                                        <td class=\"tdt\" *ngIf=\"items.status=='ACTIVE'\">Active</td>\n                                                        <td class=\"tdt\" *ngIf=\"items.status!='ACTIVE'\">Inactive</td>\n                                                        <td class=\"tdt\">\n                                                            <!-- [routerLink]=\"['/edit-destination',items?._id,2]\" -->\n                                                            <div style=\"display: flex;justify-content: center;\"> <a\n                                                                    class=\"btn btn-app edt\" style=\"border: none;\"\n                                                                    data-toggle=\"collapse\" href=\"#collapseExample\" role=\"button\" aria-expanded=\"false\" aria-controls=\"collapseExample\"\n                                                                    (click)=\"editIdWebsite(items?._id)\">\n                                                                    <i class=\"fa fa-edit\"></i>\n                                                                </a>\n                                                                <a class=\"btn btn-app dlt\" style=\"border: none;\"\n                                                                    data-toggle=\"modal\" data-target=\"#transfrexampdelete\"\n                                                                    (click)=\"deleteFunction(items?._id,'tranceFerCategory')\">\n                                                                    <i class=\"fa fa-trash\"></i>\n                                                                </a>\n                                                            </div>\n                                                        </td>\n                                                    </tr>\n                                                </tbody>\n                                            </table>\n                                            <h3 *ngIf=\"transferLists?.length==0\" style=\"text-align: center;\">Data not found!\n                                            </h3>\n                                        </div>\n                                        <pagination-controls (pageChange)=\"changePage($event) \" style=\"float:right;\"\n                                            *ngIf=\"transferLists?.length != 0\">\n                                        </pagination-controls>\n                                    </div>\n                                </div>\n                            </div>\n                        </section>\n                    </div>\n                </div>\n                </div>\n\n             \n                </div>\n\n                <div class=\"upper_tab show active catey_cs3\" [ngClass]=\"{'active': tabs =='TransferType'}\" *ngIf=\"(tabs == 'TransferType')\"\n                role=\"tabpanel\" aria-labelledby=\"favourite-tab\" style=\"padding: 17px;\">\n                <div class=\"collapse\" id=\"collapseExample\">\n                <form [formGroup]=\"TransferTypeForm\">\n                    <div class=\"container catey_cs3\" style=\"padding: 8px;\">\n                        <label>Edit Transfer Type</label>\n                        <div class=\"destinations\">\n                            <label>Type</label>\n                            <input type=\"text\" class=\"selectCountry\" formControlName=\"type\">\n                        </div>\n                        <div *ngIf=\"TransferTypeForm.get('type').hasError('required') && TransferTypeForm.get('type').touched\">\n                                <span style=\"color:red;margin-left: 186px;\">*Type is required.</span></div>\n                                <div *ngIf=\"TransferTypeForm.controls['type'].hasError('maxlength')\"><span\n                                    style=\"color:red;margin-left: 186px;\">*Maxlength should\n                                        be 50 numbers.</span></div>\n        \n                        <label class=\"optionals\">Optional</label>\n                        <div class=\"activeinactiv\" style=\"margin-left: 27px;\">\n                            <input type=\"radio\" class=\"activradio\" name=\"activeInsurance\" value=\"ACTIVE\" [checked]=\"true\"\n                                formControlName=\"activeInsurance\" style=\"margin-left: 11%;\">\n                            <label>Active</label>\n                            <input type=\"radio\" name=\"activeInsurance\" value=\"INACTIVE\" formControlName=\"activeInsurance\"\n                                style=\"margin-left: 71px;\">\n                            <label>Inactive</label>\n                        </div>\n                        <div>\n                            <button type=\"button\" class=\"btn btn-success btnss\" [disabled]=\"!TransferTypeForm.valid\"\n                                (click)=\"UpadeTrancsfrType()\">UPDATE</button>\n                        </div>\n                    </div>\n                </form>\n                </div>\n                <div *ngIf=\"value==1\">\n                    <form [formGroup]=\"TransferTypeForm\">\n                        <div class=\"container con\" style=\"padding: 8px;\">\n                            <label>Edit Transfer Type</label>\n                            <div class=\"destinations\">\n                                <label>Type</label>\n                                <input type=\"text\" class=\"selectCountry\" formControlName=\"type\">\n                            </div>\n                            <div *ngIf=\"TransferTypeForm.get('type').hasError('required') && TransferTypeForm.get('type').touched\">\n                                    <span style=\"color:red;margin-left: 186px;\">*Type is required.</span></div>\n                                    <div *ngIf=\"TransferTypeForm.controls['type'].hasError('maxlength')\"><span\n                                        style=\"color:red;margin-left: 186px;\">*Maxlength should\n                                            be 50 numbers.</span></div>\n            \n                            <label class=\"optionals\">Optional</label>\n                            <div class=\"activeinactiv\" style=\"margin-left: 27px;\">\n                                <input type=\"radio\" class=\"activradio\" name=\"activeInsurance\" value=\"ACTIVE\" [checked]=\"true\"\n                                    formControlName=\"activeInsurance\" style=\"margin-left: 11%;\">\n                                <label>Active</label>\n                                <input type=\"radio\" name=\"activeInsurance\" value=\"INACTIVE\" formControlName=\"activeInsurance\"\n                                    style=\"margin-left: 71px;\">\n                                <label>Inactive</label>\n                            </div>\n                            <div>\n                                <button type=\"button\" class=\"btn btn-success btnss\" [disabled]=\"!TransferTypeForm.valid\"\n                                    (click)=\"UpadeTrancsfrType()\">UPDATE</button>\n                            </div>\n                        </div>\n                    </form>\n                    </div>\n                <div *ngIf=\"value!=1\">\n                <div class=\"upper_tab show active\" [ngClass]=\"{'active': tabs =='TransferType'}\"\n                *ngIf=\"(tabs == 'TransferType')\" role=\"tabpanel\" aria-labelledby=\"favourite-tab\" style=\"padding: 17px;\">\n\n                <div class=\"container catey_cs3\">\n                    <section style=\"padding-top: 22px;\">\n                        <input type=\"search\" class=\"srch\" [(ngModel)]=\"filterName\" maxlength=\"50\"\n                            (keyup)=\"searchValue($event.target.value)\" placeholder=\"Search by name\">\n                        <select class=\"selects1\" (change)=\"selectStatuss($event.target.value)\">\n                            <option value=\"\">Select status</option>\n                            <option value=\"ALL\">All</option>\n                            <option value=\"ACTIVE\">Active</option>\n                            <option value=\"INACTIVE\">Inactive</option>\n                        </select>\n                    </section>\n                    <section class=\"content\">\n                        <div class=\"row\">\n                            <div class=\"col-xs-12\">\n                                <div class=\"box\">\n                                    <!-- /.box-header -->\n                                    <div class=\"box-body\">\n                                        <table id=\"customers\" class=\"table table-bordered table-hover\">\n                                            <thead>\n                                                <tr class=\"trt\">\n                                                    <th class=\"tdt\">S.No.<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                                    <th class=\"tdt\">Transfer Type<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                                    <th class=\"tdt\">Status<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                                    <th class=\"tdt\">Actions</th>\n                                                </tr>\n                                            </thead>\n                                            <tbody *ngIf=\"transferTypeLists\">\n                                                <!-- | paginate : {itemsPerPage: 7, currentPage:page, totalItems:total}; let i=index -->\n                                                <tr\n                                                    *ngFor=\"let items of transferTypeLists | paginate : {itemsPerPage:10, currentPage:page, totalItems:total}; let i=index\">\n                                                    <td class=\"tdt\">{{limit * (page-1)+i+1}}</td>\n                                                    <td class=\"tdt\">{{items.type || '--'}}</td>\n                                                    <!-- <td>{{items.name}}</td> [routerLink]=\"['/edit-destination',items?._id]\"-->\n                                                    <td class=\"tdt\" *ngIf=\"items.status=='ACTIVE'\">Active</td>\n                                                    <td class=\"tdt\" *ngIf=\"items.status!='ACTIVE'\">Inactive</td>\n                                                    <td class=\"tdt\">\n                                                        <div style=\"display: flex;justify-content: center;\"> <a\n                                                                class=\"btn btn-app edt\" style=\"border: none;\"\n                                                                data-toggle=\"collapse\" href=\"#collapseExample\" role=\"button\" aria-expanded=\"false\" aria-controls=\"collapseExample\"\n                                                                (click)=\"editIdWebsite(items?._id)\">\n                                                                <i class=\"fa fa-edit\"></i>\n                                                            </a>\n                                                            <a class=\"btn btn-app dlt\" style=\"border: none;\"\n                                                                data-toggle=\"modal\" data-target=\"#transfertype\"\n                                                                (click)=\"deleteFunction(items?._id,'tranceFerType')\">\n                                                                <i class=\"fa fa-trash\"></i>\n                                                            </a>\n                                                        </div>\n                                                    </td>\n                                                </tr>\n                                            </tbody>\n                                        </table>\n                                        <h3 *ngIf=\"transferTypeLists?.length==0\" style=\"text-align: center;\">Data not\n                                            found!</h3>\n                                    </div>\n                                    <pagination-controls (pageChange)=\"changePage($event) \" style=\"float:right;\"\n                                        *ngIf=\"transferTypeLists?.length != 0\">\n                                    </pagination-controls>\n                                </div>\n                            </div>\n                        </div>\n                    </section>\n                </div>\n            </div>\n            </div>\n             \n            </div>\n\n        </div>\n\n    </div>\n    <div class=\"upper_tab show active\" [ngClass]=\"{'active': tab =='CarType'}\" *ngIf=\"(tab == 'CarType')\"\n        role=\"tabpanel\" aria-labelledby=\"favourite-tab\">\n        <div class=\"collapse\" id=\"collapseExample\">\n            <form [formGroup]=\"carTypeForm\">\n                <div class=\"container con\">\n                    <label>Edit Car Type</label>\n                    <div class=\"destinations\">\n                        <label>Country</label>\n                        <select class=\"selectCountry\" formControlName=\"country\" style=\"margin-left: 106px;\">\n                            <!-- <option value=\"\">Select country</option> -->\n                            <option value=\"{{item._id}}\" *ngFor=\"let item of countryList\">{{item.country}}</option>\n                        </select>\n                        <!-- <div\n                        *ngIf=\"carTypeForm.get('country').hasError('required') && carTypeForm.get('country').touched\">\n                        <span style=\"float:right;margin-right:13.5%;\">*Country is required.</span></div> -->\n                    </div>\n                    <div class=\"destinations\">\n                        <label>Destination</label>\n                        <select class=\"selectsdestination\" formControlName=\"destination\" style=\"margin-left: 80px;\">\n                            <option value=\"\">Select destination</option>\n                            <option value=\"{{item._id}}\" *ngFor=\"let item of destinationLists\">{{item.destination}}</option>\n                        </select>\n                        <!-- <div\n                        *ngIf=\"carTypeForm.get('country').hasError('required') && carTypeForm.get('country').touched\">\n                        <span style=\"color:red;float:right;margin-right:13.5%;\">*Destination is required.</span></div> -->\n                    </div>\n    \n                    <div class=\"destinations\">\n                        <label>Type</label>\n                        <input type=\"text\" class=\"types\" formControlName=\"type\" class=\"inptdestination\">\n                    </div>\n                    <div *ngIf=\"carTypeForm.get('type').hasError('required') && carTypeForm.get('type').touched\">\n                        <span style=\"color:red;margin-left: 16.5%;\">*Type is required.</span></div>\n                        <div *ngIf=\"carTypeForm.controls['type'].hasError('maxlength')\"><span\n                            style=\"color:red;margin-left: 16.5%;\">*Maxlength should\n                                be 50 characters.</span></div>\n                                \n                \n                    <div class=\"destinations\">\n                        <label>Price</label>\n                        <input type=\"text\" class=\"destinationprice\" formControlName=\"price\" class=\"inptdestination\">\n                    </div>\n                    <div *ngIf=\"carTypeForm.get('price').hasError('required') && carTypeForm.get('price').touched\">\n                        <span style=\"color:red;float:right;margin-right:13.5%;\">*Price is required.</span></div>\n                        <div *ngIf=\"carTypeForm.controls['price'].hasError('maxlength')\"><span\n                            style=\"color:red;margin-left: 16.5%;\">*Maxlength should\n                                be 20 numbers.</span></div>\n                                <div *ngIf=\"carTypeForm.controls['price'].hasError('pattern')\"><span style=\"color:red;margin-left: 193px;;\">*Don't\n                                        use small, capital letter and special characters.</span></div>\n                    <label class=\"optionals\">Optional</label>\n                    <div class=\"activeinactiv\" style=\"    margin-left: 2%;\">\n                        <input type=\"radio\" class=\"activradio\" name=\"activeInsurance\" value=\"ACTIVE\" [checked]=\"true\"\n                            formControlName=\"activeInsurance\" style=\"margin-left: 11%;\">\n                        <label>Active</label>\n                        <input type=\"radio\" name=\"activeInsurance\" value=\"INACTIVE\" formControlName=\"activeInsurance\"\n                            style=\"margin-left: 12%;\">\n                        <label>Inactive</label>\n                    </div>\n                    <div >\n                        <button type=\"button\" class=\"btn btn-success btnss\" [disabled]=\"!carTypeForm.valid\"\n                            (click)=\"updateCarType()\">UPDATE</button>\n                    </div>\n                </div>\n            </form>\n        </div>\n        <div *ngIf=\"val==2\">\n        <form [formGroup]=\"carTypeForm\">\n            <div class=\"container con\">\n                <label>Edit Car Type</label>\n                <div class=\"destinations\">\n                    <label>Country</label>\n                    <select class=\"selectCountry\" formControlName=\"country\" style=\"margin-left: 106px;\">\n                        <!-- <option value=\"\">Select country</option> -->\n                        <option value=\"{{item._id}}\" *ngFor=\"let item of countryList\">{{item.country}}</option>\n                    </select>\n                    <!-- <div\n                    *ngIf=\"carTypeForm.get('country').hasError('required') && carTypeForm.get('country').touched\">\n                    <span style=\"float:right;margin-right:13.5%;\">*Country is required.</span></div> -->\n                </div>\n                <div class=\"destinations\">\n                    <label>Destination</label>\n                    <select class=\"selectsdestination\" formControlName=\"destination\" style=\"margin-left: 80px;\">\n                        <option value=\"\">Select destination</option>\n                        <option value=\"{{item._id}}\" *ngFor=\"let item of destinationLists\">{{item.destination}}</option>\n                    </select>\n                    <!-- <div\n                    *ngIf=\"carTypeForm.get('country').hasError('required') && carTypeForm.get('country').touched\">\n                    <span style=\"color:red;float:right;margin-right:13.5%;\">*Destination is required.</span></div> -->\n                </div>\n\n                <div class=\"destinations\">\n                    <label>Type</label>\n                    <input type=\"text\" class=\"types\" formControlName=\"type\" class=\"inptdestination\">\n                </div>\n                <div *ngIf=\"carTypeForm.get('type').hasError('required') && carTypeForm.get('type').touched\">\n                    <span style=\"color:red;margin-left: 16.5%;\">*Type is required.</span></div>\n                    <div *ngIf=\"carTypeForm.controls['type'].hasError('maxlength')\"><span\n                        style=\"color:red;margin-left: 16.5%;\">*Maxlength should\n                            be 50 characters.</span></div>\n                            \n            \n                <div class=\"destinations\">\n                    <label>Price</label>\n                    <input type=\"text\" class=\"destinationprice\" formControlName=\"price\" class=\"inptdestination\">\n                </div>\n                <div *ngIf=\"carTypeForm.get('price').hasError('required') && carTypeForm.get('price').touched\">\n                    <span style=\"color:red;float:right;margin-right:13.5%;\">*Price is required.</span></div>\n                    <div *ngIf=\"carTypeForm.controls['price'].hasError('maxlength')\"><span\n                        style=\"color:red;margin-left: 16.5%;\">*Maxlength should\n                            be 20 numbers.</span></div>\n                            <div *ngIf=\"carTypeForm.controls['price'].hasError('pattern')\"><span style=\"color:red;margin-left: 193px;;\">*Don't\n                                    use small, capital letter and special characters.</span></div>\n                <label class=\"optionals\">Optional</label>\n                <div class=\"activeinactiv\" style=\"    margin-left: 2%;\">\n                    <input type=\"radio\" class=\"activradio\" name=\"activeInsurance\" value=\"ACTIVE\" [checked]=\"true\"\n                        formControlName=\"activeInsurance\" style=\"margin-left: 11%;\">\n                    <label>Active</label>\n                    <input type=\"radio\" name=\"activeInsurance\" value=\"INACTIVE\" formControlName=\"activeInsurance\"\n                        style=\"margin-left: 12%;\">\n                    <label>Inactive</label>\n                </div>\n                <div >\n                    <button type=\"button\" class=\"btn btn-success btnss\" [disabled]=\"!carTypeForm.valid\"\n                        (click)=\"updateCarType()\">UPDATE</button>\n                </div>\n            </div>\n        </form>\n        </div>\n        <div *ngIf=\"val!=2\">\n        <div class=\"container\" style=\"border-style: ridge;width: 83%;\">\n            <section style=\"padding-top: 22px;\">\n                <input type=\"search\" class=\"srch\" [(ngModel)]=\"filterName\" maxlength=\"50\"\n                    (keyup)=\"searchValue($event.target.value)\" placeholder=\"Search by name\">\n                <select class=\"selects1\" (change)=\"selectStatuss($event.target.value)\">\n                    <option value=\"\">Select status</option>\n                    <option value=\"ALL\">All</option>\n                    <option value=\"ACTIVE\">Active</option>\n                    <option value=\"INACTIVE\">Inactive</option>\n                </select>\n            </section>\n            <section class=\"content\">\n                <div class=\"row\">\n                    <div class=\"col-xs-12\">\n                        <div class=\"box\">\n                            <!-- /.box-header -->\n                            <div class=\"box-body\">\n                                <table id=\"customers\" class=\"table table-bordered table-hover\">\n                                    <thead>\n                                        <tr class=\"trt\">\n                                            <th class=\"tdt\">S.No.<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                            <th class=\"tdt\">Car type<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                            <th class=\"tdt\">Price<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                            <th class=\"tdt\">Status<i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                            <th class=\"tdt\">Actions</th>\n\n                                        </tr>\n                                    </thead>\n                                    <tbody *ngIf=\"cartTypeLists\">\n                                        <!-- | paginate : {itemsPerPage: 7, currentPage:page, totalItems:total}; let i=index -->\n                                        <tr\n                                            *ngFor=\"let items of cartTypeLists | paginate : {itemsPerPage:10, currentPage:page, totalItems:total}; let i=index\">\n                                            <td class=\"tdt\">{{limit * (page-1)+i+1}}</td>\n                                            <td class=\"tdt\">{{items.carType || '--'}}</td>\n                                            <td class=\"tdt\">{{items.price || '--'}}</td>\n                                            <!-- <td>{{items.name}}</td> [routerLink]=\"['/edit-destination',items?._id]\"-->\n                                            <td class=\"tdt\" *ngIf=\"items.status=='ACTIVE'\">Active</td>\n                                            <td class=\"tdt\" *ngIf=\"items.status!='ACTIVE'\">Inactive</td>\n                                            <td class=\"tdt\">\n                                                <div style=\"display: flex;justify-content: center;\"> <a\n                                                        class=\"btn btn-app edt\" style=\"border: none;\"\n                                                        data-toggle=\"collapse\" href=\"#collapseExample\" role=\"button\" aria-expanded=\"false\" aria-controls=\"collapseExample\"\n                                                    (click)=\"editIdWebsite(items?._id)\">\n                                                        <i class=\"fa fa-edit\"></i>\n                                                    </a>\n                                                    <a class=\"btn btn-app dlt\" style=\"border: none;\" data-toggle=\"modal\"\n                                                        data-target=\"#deletetCartype\"\n                                                        (click)=\"deleteFunction(items?._id,'carType')\">\n                                                        <i class=\"fa fa-trash\"></i>\n                                                    </a>\n                                                </div>\n                                            </td>\n                                        </tr>\n                                    </tbody>\n                                </table>\n                                <h3 *ngIf=\"cartTypeLists?.length==0\" style=\"text-align: center;\">Data not found!</h3>\n                            </div>\n                            <pagination-controls (pageChange)=\"changePage($event) \" style=\"float:right;\"\n                                *ngIf=\"cartTypeLists?.length != 0\">\n                            </pagination-controls>\n                        </div>\n                    </div>\n                </div>\n            </section>\n        </div>\n    </div>\n   \n</div>\n<div class=\"upper_tab show active\" [ngClass]=\"{'active': tab =='Countries'}\" *ngIf=\"(tab == 'Countries')\"\nrole=\"tabpanel\" aria-labelledby=\"favourite-tab\">\n<div class=\"collapse\" id=\"collapseExample\">\n<form [formGroup]=\"countryForm\">\n    <div class=\"container con\">\n        <label>Edit Country</label>\n        <div class=\"destinations\">\n            <label>Country</label>\n            <input type=\"text\" class=\"destinationprice\" formControlName=\"country\">\n        </div>\n        <div class=\"activeinactiv\">\n            <input type=\"radio\" class=\"activradio\" name=\"activeInsurance\" value=\"ACTIVE\" [checked]=\"true\"\n                formControlName=\"activeInsurance\" style=\"margin-left: 11%;\">\n            <label>Active</label>\n            <input type=\"radio\" name=\"activeInsurance\" value=\"INACTIVE\" formControlName=\"activeInsurance\"\n                style=\"margin-left: 12%;\">\n            <label>Inactive</label>\n        </div>\n        <div> \n            <button type=\"button\" class=\"btn btn-success btnss\" [disabled]=\"!countryForm.valid\"\n                (click)=\"UpadeCountry()\">UPDATE</button>\n        </div>\n    </div>\n</form>\n</div>\n<div *ngIf=\"val==3\">\n    <form [formGroup]=\"countryForm\">\n        <div class=\"container con\">\n            <label>Edit Country</label>\n            <div class=\"destinations\">\n                <label>Country</label>\n                <input type=\"text\" class=\"destinationprice\" formControlName=\"country\">\n            </div>\n            <div class=\"activeinactiv\">\n                <input type=\"radio\" class=\"activradio\" name=\"activeInsurance\" value=\"ACTIVE\" [checked]=\"true\"\n                    formControlName=\"activeInsurance\" style=\"margin-left: 11%;\">\n                <label>Active</label>\n                <input type=\"radio\" name=\"activeInsurance\" value=\"INACTIVE\" formControlName=\"activeInsurance\"\n                    style=\"margin-left: 12%;\">\n                <label>Inactive</label>\n            </div>\n            <div> \n                <button type=\"button\" class=\"btn btn-success btnss\" [disabled]=\"!countryForm.valid\"\n                    (click)=\"UpadeCountry()\">UPDATE</button>\n            </div>\n        </div>\n    </form>\n</div>\n<div *ngIf=\"val!=3\">\n<div class=\"container\" style=\"border-style: ridge;width: 83%;\">\n    <section style=\"padding-top: 22px;\">\n        <input type=\"search\" class=\"srch\" [(ngModel)]=\"filterName\" maxlength=\"50\"\n            (keyup)=\"searchValue($event.target.value)\" placeholder=\"Search by name\">\n        <select class=\"selects1\" (change)=\"selectStatuss($event.target.value)\">\n            <option value=\"\">Select status</option>\n            <option value=\"ALL\">All</option>\n            <option value=\"ACTIVE\">Active</option>\n            <option value=\"INACTIVE\">Inactive</option>\n        </select>\n    </section>\n    <section class=\"content\">\n        <div class=\"row\">\n            <div class=\"col-xs-12\">\n                <div class=\"box\">\n                    <!-- /.box-header -->\n                    <div class=\"box-body\">\n                        <table id=\"customers\" class=\"table table-bordered table-hover\">\n                            <thead>\n                                <tr class=\"trt\">\n                                    <th class=\"tdt\">S.No.</th>\n                                    <th class=\"tdt\">Country Name</th>\n                                    <th class=\"tdt\">Status</th>\n                                    <th class=\"tdt\">Actions</th>\n\n                                </tr>\n                            </thead>\n                            <tbody *ngIf=\"countryData\">\n                                <!-- | paginate : {itemsPerPage: 7, currentPage:page, totalItems:total}; let i=index -->\n                                <tr\n                                    *ngFor=\"let items of countryData | paginate : {itemsPerPage:10, currentPage:page, totalItems:total}; let i=index\">\n                                    <td class=\"tdt\">{{limit * (page-1)+i+1}}</td>\n                                    <td class=\"tdt\">{{items.country || '--'}}</td>\n                                    <!-- <td>{{items.name}}</td> [routerLink]=\"['/edit-destination',items?._id]\"-->\n                                    <td class=\"tdt\" *ngIf=\"items.status=='ACTIVE'\">Active</td>\n                                    <td class=\"tdt\" *ngIf=\"items.status!='ACTIVE'\">Inactive</td>\n                                    <td class=\"tdt\">\n                                        <div style=\"display: flex;justify-content: center;\"> <a\n                                                class=\"btn btn-app edt\" style=\"border: none;\" data-toggle=\"collapse\" href=\"#collapseExample\" role=\"button\" aria-expanded=\"false\" aria-controls=\"collapseExample\"\n                                                (click)=\"editIdWebsite(items?._id)\">\n                                                <i class=\"fa fa-edit\"></i>\n                                            </a>\n                                            <a class=\"btn btn-app dlt\" style=\"border: none;\" data-toggle=\"modal\"\n                                                        data-target=\"#deletetCountries\"\n                                                        (click)=\"deleteFunction(items?._id,'countries')\">\n                                                <i class=\"fa fa-trash\"></i>\n                                            </a>\n                                        </div>\n                                    </td>\n                                </tr>\n                            </tbody>\n                        </table>\n                        <h3 *ngIf=\"countryData?.length==0\" style=\"text-align: center;\">Data not found!</h3>\n                    </div>\n                    <pagination-controls (pageChange)=\"changePage($event) \" style=\"float:right;\"\n                        *ngIf=\"countryData?.length != 0\">\n                    </pagination-controls>\n                </div>\n            </div>\n        </div>\n    </section>\n</div>\n</div>\n\n\n\n</div>\n\n\n<div class=\"modal fade\" id=\"exampdelete\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\"\n    aria-hidden=\"true\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <H3 style=\"text-align:center;padding-top: 42px;\"> Delete package type?</H3>\n            <hr>\n            <div class=\"modal-body\" style=\"display: flex;justify-content: center;padding: 26px\">\n                <b style=\"font-size: 20px;font-weight: 500;\">Are you sure you want to delete this package type?</b>\n            </div>\n            <div class=\"modal-footer\" style=\"display: flex;justify-content: space-between;\">\n                <button type=\"button\"\n                    style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: red;color: white;\"\n                    data-dismiss=\"modal\">No</button>\n                <button type=\"button\"\n                    style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: green;color: white;\"\n                    (click)=\"deleteFunctions()\" data-dismiss=\"modal\">Yes</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"modal fade\" id=\"transfertype\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\"\n    aria-hidden=\"true\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <H3 style=\"text-align:center;padding-top: 42px;\"> Delete transfer type?</H3>\n            <hr>\n            <div class=\"modal-body\" style=\"display: flex;justify-content: center;padding: 26px\">\n                <b style=\"font-size: 20px;font-weight: 500;\">Are you sure you want to delete this transfer type ?</b>\n            </div>\n            <div class=\"modal-footer\" style=\"display: flex;justify-content: space-between;\">\n                <button type=\"button\"\n                    style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: red;color: white;\"\n                    data-dismiss=\"modal\">No</button>\n                <button type=\"button\"\n                    style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: green;color: white;\"\n                    (click)=\"deleteFunctions()\" data-dismiss=\"modal\">Yes</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n\n<div class=\"modal fade\" id=\"transfrexampdelete\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\"\n    aria-hidden=\"true\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <H3 style=\"text-align:center;padding-top: 42px;\"> Delete transfer category ?</H3>\n            <hr>\n            <div class=\"modal-body\" style=\"display: flex;justify-content: center;padding: 26px\">\n                <b style=\"font-size: 20px;font-weight: 500;\">Are you sure you want to delete this transfer category ?</b>\n            </div>\n            <div class=\"modal-footer\" style=\"display: flex;justify-content: space-between;\">\n                <button type=\"button\"\n                    style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: red;color: white;\"\n                    data-dismiss=\"modal\">No</button>\n                <button type=\"button\"\n                    style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: green;color: white;\"\n                    (click)=\"deleteFunctions()\" data-dismiss=\"modal\">Yes</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n<div class=\"modal fade\" id=\"deletetCartype\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\"\n    aria-hidden=\"true\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <H3 style=\"text-align:center;padding-top: 42px;\"> Delete  car type ?</H3>\n            <hr>\n            <div class=\"modal-body\" style=\"display: flex;justify-content: center;padding: 26px\">\n                <b style=\"font-size: 20px;font-weight: 500;\">Are you sure you want to delete this car type ?</b>\n            </div>\n            <div class=\"modal-footer\" style=\"display: flex;justify-content: space-between;\">\n                <button type=\"button\"\n                    style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: red;color: white;\"\n                    data-dismiss=\"modal\">No</button>\n                <button type=\"button\"\n                    style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: green;color: white;\"\n                    (click)=\"deleteFunctions()\" data-dismiss=\"modal\">Yes</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n\n<div class=\"modal fade\" id=\"deletetCountries\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\"\n    aria-hidden=\"true\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <H3 style=\"text-align:center;padding-top: 42px;\"> Delete country ?</H3>\n            <hr>\n            <div class=\"modal-body\" style=\"display: flex;justify-content: center;padding: 26px\">\n                <b style=\"font-size: 20px;font-weight: 500;\">Are you sure you want to delete this country ?</b>\n            </div>\n            <div class=\"modal-footer\" style=\"display: flex;justify-content: space-between;\">\n                <button type=\"button\"\n                    style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: red;color: white;\"\n                    data-dismiss=\"modal\">No</button>\n                <button type=\"button\"\n                    style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: green;color: white;\"\n                    (click)=\"deleteFunctions()\" data-dismiss=\"modal\">Yes</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n<div class=\"modal fade\" id=\"bannermodaldelete\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\"\n    aria-hidden=\"true\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <H3 style=\"text-align:center;padding-top: 42px;\">Delete Banner ?</H3>\n            <hr>\n            <div class=\"modal-body\" style=\"display: flex;justify-content: center;padding: 26px\">\n                <b style=\"font-size: 20px;font-weight: 500;\">Are you sure you want to delete this banner ?</b>\n            </div>\n            <div class=\"modal-footer\" style=\"display: flex;justify-content: space-between;\">\n                <button type=\"button\"\n                    style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: red;color: white;\"\n                    data-dismiss=\"modal\">No</button>\n                <button type=\"button\"\n                    style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: green;color: white;\"\n                    (click)=\"deletebanners()\" data-dismiss=\"modal\">Yes</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/edit-sub-admin/edit-sub-admin.component.html":
  /*!****************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/edit-sub-admin/edit-sub-admin.component.html ***!
    \****************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppEditSubAdminEditSubAdminComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-sidebar></app-sidebar>\n<div class=\"content-wrapper\">\n    <section class=\"content-header\">\n            <h3 class=\"box-title\">Sub-Admin Management  / Edit</h3>\n        <div class=\"box box-warning wr\">\n        \n            <div class=\"box-header with-border\">\n                    <label for=\"file-input\">\n                <img  class=\"imgs\" [src]=\"profile?profile:'assets/adminLTE/dist/img/editUser.png'\">\n               <!-- <img class=\"imgs\" src=\"assets/adminLTE/dist/img/editUser.png\"> -->\n               <input id=\"file-input\" type=\"file\" name=\"imageUrl\" accept=\"image/*\" (change)=\"handleInputChange($event)\" style=\"display: none;\" />\n                        </label>\n            </div>\n        \n            <!-- /.box-header -->\n            <div class=\"box-body bd\">\n                <form role=\"form\" [formGroup]=\"editSubAdminForm\">\n                    <!-- text input -->\n                    <img>\n                    <div class=\"form-group\">\n                        <input type=\"text\" class=\"form-control\" formControlName=\"name\" placeholder=\"Please enter name\" (keypress)=\"service.preventSpace($event)\">\n                        <span *ngIf=\"editSubAdminForm.get('name').hasError('required') && editSubAdminForm.get('name').touched\"><span\n                            style=\"color:red;\">*Please enter your name.</span></span>\n                    <span *ngIf=\"editSubAdminForm.controls['name'].hasError('minlength')\"><span\n                            style=\"color:red;\">*Minlength should\n                            be 2 characters.</span></span>\n    \n                    <span *ngIf=\"editSubAdminForm.controls['name'].hasError('maxlength')\"><span\n                            style=\"color:red;\">*Maxlength should\n                            be 60 characters.</span></span>\n                    <span *ngIf=\"editSubAdminForm.controls['name'].hasError('pattern')\"><span\n                            style=\"color:red;\">*Don't use special characters.</span></span>\n                        </div>\n                        <div class=\"form-group\">\n                            <input type=\"text\" class=\"form-control\"  formControlName=\"email\" placeholder=\"Please enter email id\">\n                            <span *ngIf=\"editSubAdminForm.get('email').hasError('required') && editSubAdminForm.get('email').touched\">\n                                    <span style=\"color:red;\">*Please enter email id.</span></span>\n            \n                                <span *ngIf=\"editSubAdminForm.controls['email'].hasError('maxlength')\"><span\n                                        style=\"color:red;\">*Maxlength should be 60 characters.</span></span>\n                                <span *ngIf=\"editSubAdminForm.controls['email'].hasError('pattern')\"><span\n                                        style=\"color:red;\">*Please enter valid email id.</span>\n            \n                                </span>\n                        </div>\n                    <!-- textarea -->\n                    <div class=\"form-group\">\n                \n                        <input type=\"tel\" class=\"form-control mob\" placeholder=\"\" id=\"phoneNumber\" formControlName=\"number\" maxlength=\"20\" (keyup)=\"toCheckSpaceChar()\">\n                        <div *ngIf=\"editSubAdminForm.get('number').errors && editSubAdminForm.get('number').touched || editSubAdminForm.get('number').dirty\">\n                            <div *ngIf=\"editSubAdminForm.get('number').hasError('required'); else elseBlock\" style=\"color: red\">*Phone number is required.</div>\n                            <ng-template #elseBlock>\n                                <div *ngIf=\"isValidNumber == false\" style=\"color: red\">*Please enter valid number.\n                                </div>\n                            </ng-template>\n                        </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <input type=\"password\" class=\"form-control\"  formControlName=\"password\" placeholder=\"Password\">\n                            <span\n                            *ngIf=\"editSubAdminForm.get('password').hasError('required') && editSubAdminForm.get('password').touched\">\n                            <span style=\"color:red;\">*Password is required</span></span>\n                        <span *ngIf=\"editSubAdminForm.controls['password'].hasError('minlength')\"><span\n                                style=\"color:red;\">*Maxlength should be 8 characters.</span></span>\n        \n                        <span *ngIf=\"editSubAdminForm.controls['password'].hasError('maxlength')\"><span\n                                style=\"color:red;\">*Maxlength should be 16 characters.</span></span>\n        \n                        <span *ngIf=\"editSubAdminForm.get('password').hasError('pattern') && editSubAdminForm.get('password').dirty\">\n                            <span style=\"color:red;\"> *Password must contain characters, digits and one\n                                special character(Min character-8).</span>\n                        </span>\n                        </div>\n                      \n                   \n                 \n                    <div class=\"form-group\">\n                        <input type=\"password\" class=\"form-control\"  formControlName=\"confirmPassword\" placeholder=\"Confirm Password\">\n                        <span\n                        *ngIf=\"editSubAdminForm.get('confirmPassword').hasError('required') && editSubAdminForm.get('confirmPassword').touched\">\n                        <span style=\"color:red;\">*Confirm password is required.</span></span>\n                    <span\n                        *ngIf=\"(editSubAdminForm.value.password != editSubAdminForm.value.confirmPassword) && editSubAdminForm.get('confirmPassword').dirty\">\n                        <span style=\"color:red;\">*Confirm password & new password should be\n                            same.</span></span>\n                    </div> \n                 \n                    <div class=\"form-group\">\n                            <textarea class=\"form-control\" rows=\"3\"  formControlName=\"address\" placeholder=\"address...\"></textarea>\n                            <span\n                            *ngIf=\"editSubAdminForm.get('address').hasError('required') && editSubAdminForm.get('address').touched\">\n                            <span style=\"color:red;\">*Address is required.</span></span>\n                        <span class=\"form-group\">\n                            <label>Access Right & Permissions :-</label>\n                        </span>\n                          </div>\n                       \n                <div class=\"userEvent\">\n                    <input type=\"checkbox\" formControlName=\"dashboard\">\n                    <label>Dashboard </label>\n                </div>\n                <div class=\"userEvent\">\n                    <input type=\"checkbox\" formControlName=\"customerManagement\">\n                    <label>Customer Management </label>\n                    <input type=\"checkbox\" formControlName=\"subAdminManagement\" class=\"event1\">\n                    <label>SubAdmin Management</label>\n                </div>\n                <div class=\"userEvent\">\n                    <input type=\"checkbox\" formControlName=\"packageManagement\">\n                    <label>Package Management </label>\n                    <input type=\"checkbox\" formControlName=\"bookingManagement\" class=\"event2\">\n                    <label>Booking Management</label>\n                </div>\n                <div class=\"userEvent\">\n                    <input type=\"checkbox\" formControlName=\"transferManagement\">\n                    <label>Transfer Management </label>\n                    <input type=\"checkbox\" class=\"event3\" formControlName=\"sightseeingManagement\">\n                    <label>Sightseeing Management</label>\n                </div>\n                <div class=\"userEvent\">\n                    <input type=\"checkbox\" formControlName=\"transactionManagement\">\n                    <label>Transaction Management </label>\n                    <input type=\"checkbox\" class=\"event4\" formControlName=\"visaManagement\">\n                    <label>Visa Management</label>\n                </div>\n                <div class=\"userEvent\">\n                    <input type=\"checkbox\" formControlName=\"contentManagement\">\n                    <label>Content Management </label>\n                    <input type=\"checkbox\" class=\"event5\" formControlName=\"inquiryManagement\">\n                    <label>Inquiry Management</label>\n                </div>\n                <div class=\"userEvent\">\n                    <input type=\"checkbox\" formControlName=\"supportManagement\">\n                    <label>Support Management </label>\n                    <input type=\"checkbox\" class=\"event6\" formControlName=\"settingManagement\">\n                    <label>Setting Management</label>\n                </div>\n              \n                <!-- [disabled]=\"!addeditSubAdminForm.valid\" -->\n                          <div class=\"form-group add\">\n                        <button class=\"btn btn-success btn\" (click)=\"editSubAdmin()\" [disabled]=\"!editSubAdminForm.valid\">UPDATE</button>                              \n                </div>\n                </form>\n\n\n            </div>\n    \n            <!-- /.box-body -->\n        </div>\n    </section>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/enquries/enquries.component.html":
  /*!****************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/enquries/enquries.component.html ***!
    \****************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppEnquriesEnquriesComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n<app-sidebar></app-sidebar>\n<div class=\"content-wrapper\">\n        <!-- Content Header (Page header) -->\n        <section class=\"content-header\">\n          <h1>\n               Enquiries\n          </h1>\n       \n        </section>\n        <section style=\"padding-top: 22px;\">\n         <div style=\"display: flex\">\n            <input type=\"search\" class=\"srch\" maxlength=\"50\" [(ngModel)]=\"search\" (keyup)=\"Searchvaluechange($event.target.value)\" style=\"margin-left: 1%\" placeholder=\"Search by Customer name & country\">\n            <button class=\"btn btn-primary bt\" (click)=\"reset()\">Reset</button>\n         </div>\n        \n      \n     \n        </section>\n        <section class=\"content\">\n                <div class=\"row\">\n                  <div class=\"col-xs-12\">\n                    <div class=\"box\">\n                      <!-- /.box-header -->\n                      <div class=\"box-body\" >\n                        <table id=\"customers\" class=\"table table-bordered table-hover\">\n                          <thead>\n                          <tr class=\"trt\">\n                            <th class=\"tdt\">S.No.</th>\n                                <!-- <i class=\"fa fa-sort\" aria-hidden=\"true\"></i></th> -->\n                            <th class=\"tdt\">Customer Name</th>\n                                <!-- <i class=\"fa fa-sort\" aria-hidden=\"true\"></i></th> -->\n                            <th class=\"tdt\">Email ID</th>\n                                <!-- <i class=\"fa fa-sort\" aria-hidden=\"true\"></i></th> -->\n                            <th class=\"tdt\">Country</th>\n                                <!-- <i class=\"fa fa-sort\" aria-hidden=\"true\"></i></th> -->\n                            <th class=\"tdt\">Message</th>\n                                <!-- <i class=\"fa fa-sort\" aria-hidden=\"true\"></i></th> -->\n                            <th class=\"tdt\">Submission Date</th>\n                            <th class=\"tdt\">Actions</th>\n                            \n                          </tr>\n                          </thead>\n                          <tbody *ngIf=\"enquiryList\">\n                            \n                           <tr   *ngFor=\"let items of enquiryList | paginate : {itemsPerPage:10, currentPage:page, totalItems:total}; let i=index\"> \n                            <td class=\"tdt\">{{limit * (page-1)+i+1}}</td>\n                            <td class=\"tdt\">{{items.name || '--'}}</td>\n                            <td class=\"tdt\" >{{items.email || '--'}}</td>\n                            <td class=\"tdt\">{{items.countryName || '--'}}</td>\n                            <td class=\"tdt\">{{items.message || '--'}}</td>\n                            <td class=\"tdt\">{{items.createdAt | date}}</td>  \n            \n                            <!-- <td class=\"tdt\"><div style=\"display: flex; margin-top: -21px\" >  <a class=\"btn btn-app view\" [routerLink]=\"['/view-enquries',items?._id]\">\n                                <i class=\"fa fa-eye\" aria-hidden=\"true\"></i> \n                              </a>\n                              <a class=\"btn btn-app dlt\" data-toggle=\"modal\" data-target=\"#exampdelete\"\n                              (click)=\"deleteFunction(items?._id)\">\n                                  <i class=\"fa fa-trash\" ></i> \n                                </a>\n                            </div></td> -->\n\n                            <td class=\"table-width\">\n                                <div style=\"display: flex;justify-content: center;\"> \n                                  <a class=\"btn btn-app edt\"  style=\"border: none;\" \n                                    [routerLink]=\"['/view-enquries',items?._id]\">\n                                    <i class=\"fa fa-eye\" aria-hidden=\"true\"></i>\n                                  </a>\n                                  <a class=\"btn btn-app dlt\"  style=\"border: none;\"  data-toggle=\"modal\" data-target=\"#exampdelete\"\n                                    (click)=\"deleteFunction(items?._id)\">\n                                    <i class=\"fa fa-trash\"></i>\n                                  </a>\n                                </div>\n                              </td>\n                          </tr>\n                       \n                          <!-- <tr>\n                            <td>\n                              \n                            </td>\n                          </tr> -->\n                          </tbody>\n                       \n                        </table>\n\n                            <h3 *ngIf=\"enquiryList?.length==0\" style=\"text-align:center\">Data not Found!</h3>\n                      </div>\n                     \n                      <pagination-controls (pageChange)=\"changePage($event) \" style=\"float:right;\" *ngIf=\"enquiryList?.length != 0\">\n                      </pagination-controls>\n                      <!-- /.box-body -->\n                    </div>\n                    <!-- /.box -->\n          \n                 \n                    <!-- /.box -->\n                  </div>\n                  <!-- /.col -->\n                </div>\n                <!-- /.row -->\n              </section>\n    \n        <!-- Main content -->\n       \n        <!-- /.content -->\n      </div>\n\n      <div class=\"modal fade\" id=\"exampdelete\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\"\n  aria-hidden=\"true\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n<H3 style=\"text-align:center;padding-top: 42px;\"> Delete Enquries ?</H3>\n<hr>\n      <div class=\"modal-body\" style=\"display: flex;justify-content: center;padding: 26px\">\n        <b style=\"font-size: 20px;font-weight: 500;\">Are you sure you want to delete this enquiry?  </b>\n\n          \n      </div>\n      <div class=\"modal-footer\" style=\"display: flex;justify-content: space-between;\">\n        <button type=\"button\"\n          style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: red;color: white;\"\n          data-dismiss=\"modal\">No</button>\n        <button type=\"button\"\n          style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: green;color: white;\"\n          (click)=\"deleteFunctions()\" data-dismiss=\"modal\">Yes</button>\n      </div>\n    </div>\n  </div>\n</div>\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/forgot-password/forgot-password.component.html":
  /*!******************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/forgot-password/forgot-password.component.html ***!
    \******************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppForgotPasswordForgotPasswordComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<header class=\"main-header\">\n  <!-- Logo -->\n  <a href=\"index2.html\" class=\"logo\" style=\"background-color: #3c8dbc;\">\n    <!-- mini logo for sidebar mini 50x50 pixels -->\n    <!-- <span class=\"logo-mini\"><b>O</b>AP</span> -->\n    <!-- logo for regular state and mobile devices -->\n    <!-- <span class=\"logo-lg\"><b>Orbistur</b>Admin Panel</span> -->\n  </a>\n  <!-- Header Navbar: style can be found in header.less -->\n  <nav class=\"navbar navbar-static-top\">\n    <!-- Sidebar toggle button-->\n    <!-- <a href=\"#\" class=\"sidebar-toggle\" data-toggle=\"push-menu\" role=\"button\">\n      <span class=\"sr-only\">Toggle navigation</span>\n    </a> -->\n\n    <div class=\"navbar-custom-menu\">\n      <ul class=\"nav navbar-nav\">\n        <!-- Messages: style can be found in dropdown.less-->\n      \n        <!-- Notifications: style can be found in dropdown.less -->\n     \n        <!-- Tasks: style can be found in dropdown.less -->\n    \n        <!-- User Account: style can be found in dropdown.less -->\n      \n        <!-- Control Sidebar Toggle Button -->\n       \n      </ul>\n    </div>\n  </nav>\n</header>\n<section class=\"content footer-div\">\n    <div class=\"login-box\" style=\"width:628px!important;\">\n    \n      <!-- /.login-logo -->\n      <!-- please enter your registered email - Traduction française ... -->\n      <div class=\"login-box-body box-bdy\">\n          <h3 class=\"h33\">\n            Forgot Your Password</h3>\n        <h4 class=\"login-box-msg\" style=\"text-align:center\"><p>Enter your registered email address. We will help you to reset your password.</p></h4>\n    \n        <form  method=\"post\" [formGroup]=\"reserpasswordForm\">\n          <div class=\"form-group\">\n          <div class=\"has-feedback\">\n              <!-- <label>Email Address</label> -->\n            <input type=\"email\" class=\"form-control\" style=\"height: 40px;\" placeholder=\"Enter your email id \" formControlName=\"email\">\n            <span class=\"glyphicon glyphicon-envelope form-control-feedback\"></span>\n          </div>\n          <div\n          *ngIf=\"reserpasswordForm.get('email').hasError('required') && reserpasswordForm.get('email').touched\">\n          <span style=\"color:red\">*Email is required.</span></div>\n          <!-- <div *ngIf=\"reserpasswordForm.get('email').hasError('maxlength') && reserpasswordForm.get('email').dirty\"\n          style=\"color:red\">\n          *MaxLength should be 30.\n      </div> -->\n              <!-- <div *ngIf=\"reserpasswordForm.get('email').hasError('maxlength') && reserpasswordForm.get('email').dirty\"\n              style=\"color:red\">\n              *Email maxlength 254.\n          </div> -->\n          <div *ngIf=\"reserpasswordForm.get('email').hasError('pattern') && reserpasswordForm.get('email').dirty\"\n                        style=\"color:red\">\n                        *Please enter valid email.\n    \n    \n                    </div>\n            </div>        \n          <div class=\"row\">\n           \n            <!-- /.col -->\n            <!-- <div class=\"col-xs-4 lognBrn\">\n              <button type=\"submit\" [disabled]=\"!loginForm.valid\" class=\"btn btn-block btn-flat\" (click)=\"forgetPassword()\">Reset my Password</button>\n            </div> -->\n            <div class=\"col-xs-4 lognBrn\">\n                <button type=\"submit\" class=\"btn btn-primary btn-block btn-flat\" [disabled]=\"!reserpasswordForm.valid\" (click)=\"forgotPassword()\">Reset</button>\n              </div>\n            <!-- /.col -->\n          </div>\n        </form>\n      </div>\n      <!-- /.login-box-body -->\n    </div>\n    <!-- /.login-box -->\n    </section>\n    <footer class=\"main-footer\" style=\"margin-left: 0px;text-align: center;\">\n      <div class=\"pull-right hidden-xs\">\n \n      </div>\n      <strong>Copyright &copy; 2020 <a href=\"https://adminlte.io\">Orbistur.com,</a></strong> All rights\n      reserved.\n    </footer>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/login/login.component.html":
  /*!**********************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/login/login.component.html ***!
    \**********************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppLoginLoginComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n    <header class=\"main-header\">\n      <!-- Logo -->\n      <a href=\"index2.html\" class=\"logo\" style=\"background-color: #3c8dbc;\">\n        <!-- mini logo for sidebar mini 50x50 pixels -->\n        <!-- <span class=\"logo-mini\"><b>O</b>AP</span> -->\n        <!-- logo for regular state and mobile devices -->\n        <!-- <span class=\"logo-lg\"><b>Orbistur</b>Admin Panel</span> -->\n      </a>\n      <!-- Header Navbar: style can be found in header.less -->\n      <nav class=\"navbar navbar-static-top\">\n        <!-- Sidebar toggle button-->\n        <!-- <a href=\"#\" class=\"sidebar-toggle\" data-toggle=\"push-menu\" role=\"button\">\n          <span class=\"sr-only\">Toggle navigation</span>\n        </a> -->\n  \n        <div class=\"navbar-custom-menu\">\n          <ul class=\"nav navbar-nav\">\n            <!-- Messages: style can be found in dropdown.less-->\n          \n            <!-- Notifications: style can be found in dropdown.less -->\n         \n            <!-- Tasks: style can be found in dropdown.less -->\n        \n            <!-- User Account: style can be found in dropdown.less -->\n          \n            <!-- Control Sidebar Toggle Button -->\n           \n          </ul>\n        </div>\n      </nav>\n    </header>\n<div class=\"login-box\">\n  \n        <!-- /.login-logo -->\n        <div class=\"login-box-body box-bdy\">\n          <h4 class=\"login-box-msg\" style=\"text-align:center\"><strong>LOGIN</strong></h4>\n      \n          <form  [formGroup]=\"loginForm\">\n            <div class=\"form-group\">\n         \n            <div class=\"has-feedback\">\n             \n              <input type=\"email\" class=\"form-control\" placeholder=\"Email\" formControlName=\"email\" (keydown.space)=\"$event.preventDefault();\" >\n              <span class=\"glyphicon glyphicon-envelope form-control-feedback\"></span>\n              <div *ngIf=\"loginForm.get('email').hasError('required') && loginForm.get('email').touched\"><span style=\"color:red\">*Please enter email id.</span></div>\n                <div *ngIf=\"loginForm.controls['email'].hasError('maxlength')\"><span style=\"color:red\">*Maxlength should be 60 characters</span></div>\n                <div *ngIf=\"loginForm.controls['email'].hasError('pattern')\"><span style=\"color:red\">*Please enter valid email id.</span>\n                \n            </div>\n            </div>\n     \n            </div>\n            <div class=\"form-group\">\n                    <!-- <label>Password</label> -->\n            <div class=\"has-feedback\" style=\"display: flex;align-items: center;justify-content: flex-end;\">\n                    \n              <input type=\"password\" class=\"form-control\" id=\"myInput\"  placeholder=\"Password\" formControlName=\"password\">\n              <!-- <a style=\"position: absolute;padding-right: 12px;\" (click)=\"toggleShow()\">\n                <i *ngIf=\"show == false\" class=\"fa fa-eye-slash\"></i>\n                <i *ngIf=\"show == true\" class=\"fa fa-eye\"></i>\n           </a> -->\n            </div>\n            <div *ngIf=\"loginForm.get('password').hasError('required') && loginForm.get('password').touched\">\n              <span style=\"color:red\">*Please enter password. </span></div>\n              <div *ngIf=\"loginForm.controls['password'].hasError('minlength')\"><span style=\"color:red\">*Minlength  should be 8 characters.</span></div>\n              <div *ngIf=\"loginForm.controls['password'].hasError('maxlength')\"><span style=\"color:red\">*Maxlength  should be 16 characters.</span></div>\n\n                <input type=\"checkbox\" name=\"remember\" formControlName=\"remember\"   style=\"margin-bottom:15px;\"> Remember Me\n                <p  style=\"cursor: pointer;color: #000;width: 100%;text-align: right; margin-top: -28px;\"><u class=\"p1\" [routerLink]=\"['/forgot-password']\" style=\"color: skyblue;\">Forgot your Password ?</u></p>\n    \n            <div class=\"\">\n            \n             </div>\n            </div>\n    \n            <div class=\"row\">\n             \n              <!-- /.col -->\n              <div class=\"col-xs-4 lognBrn\">\n                  <!-- [disabled]=\"!loginForm.valid\" -->\n                <button type=\"submit\"  class=\"btn btn-block btn-flat\" [disabled]=\"loginForm.invalid\"  (click)=\"login()\">LOGIN</button>\n              </div>\n              <!-- /.col -->\n            </div>\n          </form>\n        </div>\n        <!-- /.login-box-body -->\n      </div>\n      <footer class=\"main-footer\" style=\"margin-left: 0px;text-align: center;\">\n        <div class=\"pull-right hidden-xs\">\n   \n        </div>\n        <strong>Copyright &copy; 2020 <a href=\"https://adminlte.io\">Orbistur.com,</a></strong> All rights\n        reserved.\n      </footer>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/my-profile/my-profile.component.html":
  /*!********************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/my-profile/my-profile.component.html ***!
    \********************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppMyProfileMyProfileComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-sidebar></app-sidebar>\n<div class=\"content-wrapper\">\n    <section class=\"content-header\">\n            <h3 class=\"box-title\">MY PROFILE</h3>\n        <div class=\"box box-warning wr\">\n        \n            <div class=\"box-header with-border\">\n                    <label for=\"file-input\">\n                <img  class=\"imgs\" [src]=\" profile?.profilePic || 'assets/adminLTE/dist/img/editUser.png'\">\n               <!-- <img class=\"imgs\" src=\"assets/adminLTE/dist/img/editUser.png\"> -->\n               <input id=\"file-input\" type=\"file\" name=\"imageUrl\" accept=\"image/*\" (change)=\"handleInputChange($event)\" style=\"display: none;\" />\n                        </label>\n            </div>\n        \n            <!-- /.box-header -->\n            <div class=\"box-body bd\">\n                <form role=\"form\" [formGroup]=\"getprofileForm\">\n                    <!-- text input -->\n                    <img>\n                    <div class=\"form-group\">\n                        <input type=\"text\" class=\"form-control\" [ngModel]=\"name\" formControlName=\"name\" placeholder=\"Please enter name\" (keypress)=\"service.preventSpace($event)\">\n                        <span *ngIf=\"getprofileForm.get('name').hasError('required') && getprofileForm.get('name').touched\"><span\n                            style=\"color:red;\">*Please enter your name.</span></span>\n                    <span *ngIf=\"getprofileForm.controls['name'].hasError('minlength')\"><span\n                            style=\"color:red;\">*Minlength should\n                            be 2 characters.</span></span>\n    \n                    <span *ngIf=\"getprofileForm.controls['name'].hasError('maxlength')\"><span\n                            style=\"color:red;\">*Maxlength should\n                            be 60 characters.</span></span>\n                    <span *ngIf=\"getprofileForm.controls['name'].hasError('pattern')\"><span\n                            style=\"color:red;\">*Don't use Special characters.</span></span>\n                    </div>\n                  \n                    <div class=\"form-group\">\n                        <input type=\"text\" class=\"form-control\" [ngModel]=\"email\" formControlName=\"email\" placeholder=\"Please enter email id\">\n                        <span *ngIf=\"getprofileForm.get('email').hasError('required') && getprofileForm.get('email').touched\">\n                                <span style=\"color:red;\">*Please enter email id.</span></span>\n        \n                            <span *ngIf=\"getprofileForm.controls['email'].hasError('maxlength')\"><span\n                                    style=\"color:red;\">*Maxlength should be 60 characters.</span></span>\n                            <span *ngIf=\"getprofileForm.controls['email'].hasError('pattern')\"><span\n                                    style=\"color:red;\">*Please enter valid email id.</span>\n        \n                            </span>\n                    </div>\n                   \n                    \n\n                    <!-- textarea -->\n                    <div class=\"form-group\">\n                        <input type=\"text\" class=\"form-control\" [ngModel]=\"mobilenumber\" formControlName=\"mobileNumber\" placeholder=\"Please eneter mobile number\">\n                        <span *ngIf=\"getprofileForm.get('mobileNumber').hasError('required') && getprofileForm.get('mobileNumber').touched\">\n                                <span style=\"color:red;\">*Please enter mobile number id.</span></span>\n        \n                            <span *ngIf=\"getprofileForm.controls['mobileNumber'].hasError('maxlength')\"><span\n                                    style=\"color:red;\">*Maxlength should be 16 characters.</span></span>\n                            <span *ngIf=\"getprofileForm.controls['mobileNumber'].hasError('pattern')\"><span\n                                    style=\"color:red;\">*Please enter valid mobile number.</span></span>\n                    </div>\n                   \n                    <div class=\"form-group\">\n                        <!-- <input type=\"password\" class=\"form-control\"  formControlName=\"password\" placeholder=\"Password\"> -->\n\n                        <div class=\"has-feedback\" style=\"display: flex;align-items: center;justify-content: flex-end;\">\n                      \n                                <input type=\"{{type}}\" class=\"form-control\"  id=\"myInput\"  placeholder=\"Password\" formControlName=\"password\">\n                                <a style=\"position: absolute;padding-right: 12px;color: gray;\" (click)=\"toggleShow()\">\n                                  <i *ngIf=\"show == false\" class=\"fa fa-eye-slash\"></i>\n                                  <i *ngIf=\"show == true\" class=\"fa fa-eye\"></i>\n                             </a>\n                                <!-- <span class=\"glyphicon form-control-feedback\"  ><i class=\"fa fa-eye\" (click)=\"myFunction()\"></i></span> -->\n                              </div>\n                        \n                        <span\n                        *ngIf=\"getprofileForm.get('password').hasError('required') && getprofileForm.get('password').touched\">\n                        <span style=\"color:red;\">*Password is required</span></span>\n                    <span *ngIf=\"getprofileForm.controls['password'].hasError('minlength')\"><span\n                            style=\"color:red;\">*Maxlength should be 8 characters.</span></span>\n    \n                    <span *ngIf=\"getprofileForm.controls['password'].hasError('maxlength')\"><span\n                            style=\"color:red;\">*Maxlength should be 16 characters.</span></span>\n    \n                    <span *ngIf=\"getprofileForm.get('password').hasError('pattern') && getprofileForm.get('password').dirty\">\n                        <span style=\"color:red;\"> *Password must contain characters, digits and one\n                            special character(Min character-8).</span>\n                    </span>\n                    </div>\n                  \n                    <div class=\"form-group\">\n                        <!-- <input type=\"password\" class=\"form-control\"  formControlName=\"confirmPassword\" placeholder=\"Confirm Password\"> -->\n                        <div class=\"has-feedback\" style=\"display: flex;align-items: center;justify-content: flex-end;\">\n                      \n                                <input type=\"{{type}}\" class=\"form-control\" id=\"myInput\"  placeholder=\"Confirm password\" formControlName=\"confirmPassword\">\n                                <a style=\"position: absolute;padding-right: 12px;color: gray;\" (click)=\"toggleShow()\">\n                                  <i *ngIf=\"show == false\" class=\"fa fa-eye-slash\"></i>\n                                  <i *ngIf=\"show == true\" class=\"fa fa-eye\"></i>\n                             </a>\n                                <!-- <span class=\"glyphicon form-control-feedback\"  ><i class=\"fa fa-eye\" (click)=\"myFunction()\"></i></span> -->\n                              </div>\n\n\n\n\n\n\n                        <span\n                        *ngIf=\"getprofileForm.get('confirmPassword').hasError('required') && getprofileForm.get('confirmPassword').touched\">\n                        <span style=\"color:red;\">*Confirm Password is required.</span></span>\n                    <span\n                        *ngIf=\"(getprofileForm.value.password != getprofileForm.value.confirmPassword) && getprofileForm.get('confirmPassword').dirty\">\n                        <span style=\"color:red;\">*Confirm password & new password should be\n                            same.</span></span>\n                    </div> \n                  \n                    <div class=\"form-group\">\n                            <textarea class=\"form-control\"  [ngModel]=\"address\" rows=\"3\" (keypress)=\"service.preventSpace($event)\"  formControlName=\"address\" placeholder=\"Address...\"></textarea>\n                            <span\n                            *ngIf=\"getprofileForm.get('address').hasError('required') && getprofileForm.get('address').touched\">\n                            <span style=\"color:red;\">*Address is required.</span></span>\n                            <span *ngIf=\"getprofileForm.controls['address'].hasError('maxlength')\"><span\n                                style=\"color:red;\">*Maxlength should be 256 characters.</span></span>\n                      \n                          </div>\n                    \n            \n             \n             \n              \n                <!-- [disabled]=\"!addgetprofileForm.valid\" -->\n                          <div class=\"form-group add\">\n                        <button class=\"btn btn-success btn\" (click)=\"editProfile()\" [disabled]=\"!getprofileForm.valid\" >SUBMIT</button>                              \n                </div>\n                </form>\n\n\n            </div>\n    \n            <!-- /.box-body -->\n        </div>\n    </section>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/package-management/package-management.component.html":
  /*!************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/package-management/package-management.component.html ***!
    \************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPackageManagementPackageManagementComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-sidebar></app-sidebar>\n<div class=\"content-wrapper\">\n  <!-- Content Header (Page header) -->\n  <section class=\"content-header\">\n    <h1>\n        Package Management\n\n    </h1>\n\n  </section>\n  <section style=\"padding-top: 22px;\">\n\n    <!-- <input type=\"search\" class=\"srch\" maxlength=\"50\" [(ngModel)]=\"filterName\" (keyup)=\"searchValue($event.target.value)\"\n      placeholder=\"Search by name\">\n    <button class=\"btn btn-primary bt\" (click)=\"reset()\">Reset</button>\n    <div class=\"btnDive\">\n      <button class=\"addbtn\" [routerLink]=\"['/add-sub-admin-management']\">+Add</button>\n      <button class=\"expbtn\" (click)=\"download()\" *ngIf=\"packagelists?.length!=0\">Export into CSV</button>\n    </div> -->\n\n\n    <div class=\"mainbtn\" style=\"display: flex;\">\n        <input type=\"search\" class=\"srch\" maxlength=\"50\" [(ngModel)]=\"filterName\" (keyup)=\"searchValue($event.target.value)\"\n        placeholder=\"Search by name\">\n        \n      \n            <button class=\"resetbtn\"  (click)=\"reset()\">Reset</button>\n          <button class=\"addbtn\"  [routerLink]=\"['/add-package-management']\">+Add</button>\n          <button class=\"exbtn\"  (click)=\"download()\" *ngIf=\"packagelists?.length!=0\">Export into CSV</button>\n        </div>\n  </section>\n  <section class=\"content\">\n    <div class=\"row\">\n      <div class=\"col-xs-12\">\n        <div class=\"box\">\n          <!-- /.box-header -->\n          <div class=\"box-body\">\n            <table id=\"customers\"  class=\"table table-bordered table-hover\">\n              <thead>\n                <tr class=\"trt\">\n                  <th class=\"tdt\">S.No.\n                      <i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                  <th class=\"tdt\">Country\n                      <i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                  <th class=\"tdt\">Destination\n                      <i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                  <th class=\"tdt\">Package Type\n                      <i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                  <th class=\"tdt\">Package Name\n                      <i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                      <th class=\"tdt\">Flights Included\n                        <i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                        <th class=\"tdt\">Hotels Included\n                            <i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                            <th class=\"tdt\">Transfer Included\n                                <i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                <th class=\"tdt\">Sightseeing Included\n                                    <i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                    <th class=\"tdt\">Total Amount\n                                        <i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                                       \n                  <!-- (click)=\"statusblock()\" -->\n                  <th class=\"tdt\">Status <i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                  <th class=\"tdt\">Actions</th>\n\n                </tr>\n              </thead>\n              <tbody *ngIf=\"packagelists\">\n                <!-- | paginate : {itemsPerPage: 7, currentPage:page, totalItems:total}; let i=index -->\n                <tr\n                  *ngFor=\"let items of packagelists | paginate : {itemsPerPage:10, currentPage:page, totalItems:total}; let i=index\">\n                  <td class=\"table-width\"><input [checked]=\"items?.isChecked\" (change)=\"selectHandler(items)\" type=\"checkbox\"/>{{limit * (page-1)+i+1}}</td>\n                  <td class=\"table-width\">{{items.country || '--'}}</td>\n                  <td class=\"table-width\" title=\"{{items.destination || '--'}}\">{{items.destination || '--'}}</td>\n                  <td class=\"table-width\">{{items.packageTypeName || '--'}}</td>\n                  <td class=\"table-width\">{{items.packageName || '--'}}</td>\n                  <td class=\"table-width\">{{items.flightsIncluded || '--'}}</td>\n                 \n                  <td class=\"table-width\">{{items.hotelsIncluded || '--'}}</td>\n                  <td class=\"table-width\">{{items.transferIncluded || '--'}}</td>\n                  <td class=\"table-width\">{{items.sightseeingIncluded || '--'}}</td>\n                   <td class=\"table-width\">{{items.totalAmount || '--'}}</td> \n                   <td class=\"table-width\">{{items.status || '--'}}</td> \n\n\n                \n                  <!-- <td class=\"table-width\">{{(items.createdAt | date : 'd MMM , y') ||'N/A'}}</td> -->\n                  <!-- <td>{{items.name}}</td> -->\n                  <!-- <td class=\"table-width\" *ngIf=\"items.status=='ACTIVE'\">Active</td>\n                  <td class=\"table-width\" *ngIf=\"items.status!='ACTIVE'\">Blocked</td> -->\n                  <td class=\"table-width\"><div style=\"display:flex;justify-content: center;\">\n                    <a class=\"btn btn-app edt\"  style=\"border: none;\" \n                    [routerLink]=\"['/view-package-management',items?._id]\">\n                    <i class=\"fa fa-eye\" aria-hidden=\"true\"></i>\n                  </a>\n                     <a class=\"btn btn-app edt\" style=\"border: none;\"  [routerLink]=\"['/edit-package-management',items?._id]\">\n                      <i class=\"fa fa-edit\"></i> \n                    </a>\n                    <!-- <a class=\"btn btn-app\" style=\"border: none;\" *ngIf=\"items?.status !='ACTIVE'\" data-toggle=\"modal\" data-backdrop=\"static\"\n                      data-target=\"#modalblock\" data-keyboard=\"false\" (click)=\"block(items?._id,items?.status)\"\n                    >\n                      <i class=\"fa fa-ban blks\"></i>\n                    </a> -->\n                    <!-- <a class=\"btn btn-app\" style=\"border: none;\"  *ngIf=\"items?.status =='ACTIVE'\" data-toggle=\"modal\" data-backdrop=\"static\"\n                      data-target=\"#modalblock\" data-keyboard=\"false\" (click)=\"block(items?._id,items?.status)\"\n                     >\n                      <i class=\"fa fa-ban blk\"></i>\n                    </a> -->\n                    <a class=\"btn btn-app dlt\"  style=\"border: none;\"  data-toggle=\"modal\" data-target=\"#modaldelete\"\n                      (click)=\"deleteFunction(items?._id)\">\n                      <i class=\"fa fa-trash\"></i> \n                    </a></div>\n\n                  </td>\n                </tr>\n\n\n              </tbody>\n            \n            </table>\n             <h3 *ngIf=\"packagelists.length==0\" style=\"text-align:center\">Data not Found!</h3>\n            <!-- <h3 *ngIf=\"packagelists?.length==0\" style=\"text-align: center;\">Data not found!</h3> -->\n          </div>\n          <pagination-controls (pageChange)=\"changePage($event) \" style=\"float:right;\"\n            *ngIf=\"packagelists?.length != 0\">\n          </pagination-controls>\n          <!-- /.box-body -->\n        </div>\n        <!-- /.box -->\n\n\n        <!-- /.box -->\n      </div>\n      <!-- /.col -->\n    </div>\n    <!-- /.row -->\n  </section>\n\n  <!-- Main content -->\n\n  <!-- /.content -->\n</div>\n<div class=\"modal fade\" id=\"modaldelete\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\"\n  aria-hidden=\"true\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\" >\n      <H3 style=\"text-align:center;padding-top: 42px;\"> Delete Package?</H3>\n      <hr>\n      <div class=\"modal-body\" style=\"display: flex;justify-content: center;padding: 26px\">\n        <b style=\"font-size: 20px;font-weight: 500;\">Are you sure you want to delete this package ?</b>\n      </div>\n      <div class=\"modal-footer\" style=\"display: flex;justify-content: space-between;\">\n        <button type=\"button\"\n          style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: red;color: white;\"\n          data-dismiss=\"modal\">No</button>\n        <button type=\"button\"\n          style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: green;color: white;\"\n          (click)=\"deleteFunctions()\" data-dismiss=\"modal\">Yes</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n<!-- <div class=\"modal fade\" id=\"modalblock\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\"\n  aria-hidden=\"true\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\" >\n\n      <div class=\"modal-body\" style=\"display: flex;justify-content: center;padding: 69px\">\n        <b *ngIf=\"status =='BLOCK'\" style=\"font-size: 20px;font-weight: 500;\">Are you sure you want to Unblock this sub-admin?</b>\n\n        \n         \n        <b *ngIf=\"status =='ACTIVE'\" style=\"font-size: 20px;font-weight: 500;\">Are you sure you want to block this sub-admin?</b>\n          \n      </div>\n      <div class=\"modal-footer\" style=\"display: flex;justify-content: space-between;\">\n        <button type=\"button\"\n          style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: red;color: white;\"\n          data-dismiss=\"modal\">No</button>\n        <button type=\"button\"\n          style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: green;color: white;\"\n          (click)=\"blockFunction()\" data-dismiss=\"modal\">Yes</button>\n      </div>\n    </div>\n  </div>\n</div> -->\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/page-not-found/page-not-found.component.html":
  /*!****************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/page-not-found/page-not-found.component.html ***!
    \****************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPageNotFoundPageNotFoundComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<p>page-not-found works!</p>\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/reset-password/reset-password.component.html":
  /*!****************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/reset-password/reset-password.component.html ***!
    \****************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppResetPasswordResetPasswordComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n   <header class=\"main-header\">\n    <!-- Logo -->\n    <a href=\"index2.html\" class=\"logo\" style=\"background-color: #3c8dbc;\">\n      <!-- mini logo for sidebar mini 50x50 pixels -->\n      <!-- <span class=\"logo-mini\"><b>O</b>AP</span> -->\n      <!-- logo for regular state and mobile devices -->\n      <!-- <span class=\"logo-lg\"><b>Orbistur</b>Admin Panel</span> -->\n    </a>\n    <!-- Header Navbar: style can be found in header.less -->\n    <nav class=\"navbar navbar-static-top\">\n      <!-- Sidebar toggle button-->\n      <!-- <a href=\"#\" class=\"sidebar-toggle\" data-toggle=\"push-menu\" role=\"button\">\n        <span class=\"sr-only\">Toggle navigation</span>\n      </a> -->\n\n      <div class=\"navbar-custom-menu\">\n        <ul class=\"nav navbar-nav\">\n          <!-- Messages: style can be found in dropdown.less-->\n        \n          <!-- Notifications: style can be found in dropdown.less -->\n       \n          <!-- Tasks: style can be found in dropdown.less -->\n      \n          <!-- User Account: style can be found in dropdown.less -->\n        \n          <!-- Control Sidebar Toggle Button -->\n         \n        </ul>\n      </div>\n    </nav>\n  </header>\n<section class=\"content footer-div\">\n    <div class=\"topsp\">\n    \n        <div class=\"login-box\">\n           \n          <!-- /.login-logo -->\n          <div class=\"login-box-body change-box\">\n              <h4 class=\"login-box-msg\" style=\"text-align:center\"><strong class=\"reset\">Reset Password</strong></h4>\n            <!-- <h4 class=\"login-box-msg\" style=\"text-align:center\">Change Password</h4> -->\n           \n        \n            <form  [formGroup]=\"resetPasswordForm\">\n              <div class=\"form-group has-feedback input-eyes\" id=\"myInput\" style=\"align-items: center;justify-content: flex-end;\">\n                \n                <input type=\"{{type}}\" class=\"form-control \" placeholder=\"New Password\" formControlName=\"newPassword\">\n                <a class=\"eye-icon\" style=\"float: right;margin-top: -26px;margin-right: 10px;\" (click)=\"toggleShow1()\">\n                  <i *ngIf=\"show == false\" class=\"fa fa-eye-slash\"></i>\n                  <i *ngIf=\"show == true\" class=\"fa fa-eye\"></i>\n             </a>\n\n             <div\n             *ngIf=\"resetPasswordForm.get('newPassword').hasError('required') && resetPasswordForm.get('newPassword').touched\">\n             <span style=\"color:red\">*New Password is required</span></div>\n             <div\n             *ngIf=\"resetPasswordForm.get('newPassword').hasError('minlength') && resetPasswordForm.get('newPassword').touched\">\n             <span style=\"color:red\">*New Password minlength should be 8</span></div>\n             <div\n             *ngIf=\"resetPasswordForm.get('newPassword').hasError('maxlength') && resetPasswordForm.get('newPassword').touched\">\n             <span style=\"color:red\">*New Password maxlength should be 16</span></div>\n             <div\n             *ngIf=\"resetPasswordForm.get('newPassword').hasError('pattern') && resetPasswordForm.get('newPassword').dirty\">\n             <span style=\"color:red\"> *Password must contain characters, digits and one special character(Min character-8).</span>\n         </div>\n               \n               </div>\n              \n            \n\n              <div class=\"has-feedback\" id=\"myInput\" style=\"align-items: center;justify-content: flex-end;\">\n                  \n                  <input type=\"{{type2}}\" class=\"form-control\" placeholder=\"Confirm Password\" formControlName=\"confirmPassword\">\n                  <a class=\"eye-icon\"  style=\"float: right;margin-top: -26px;margin-right: 10px;\" (click)=\"toggleShow2()\">\n                    <i *ngIf=\"show2 == false\" class=\"fa fa-eye-slash\"></i>\n                    <i *ngIf=\"show2 == true\" class=\"fa fa-eye\"></i>\n               </a>\n               <div\n               *ngIf=\"resetPasswordForm.get('confirmPassword').hasError('required') && resetPasswordForm.get('confirmPassword').touched\">\n               <span style=\"color:red\">*Confirm Password is required</span></div>\n           <div  *ngIf=\"(resetPasswordForm.value.newPassword != resetPasswordForm.value.confirmPassword) && resetPasswordForm.get('confirmPassword').dirty\">\n               <span style=\"color:red\">*Confirm password & new password should be same.</span></div>\n                </div>\n               \n      \n                <!-- <button type=\"submit\" [disabled]=\"!resetPasswordForm.valid\" (click)=\"submit()\">Submit</button> -->\n           <!-- this for deseble -->\n             \n              <div class=\"row\">\n               \n                <!-- /.col -->\n                <div class=\"col-xs-4 lognBrn\">\n                  <button type=\"submit\" class=\"btn btn-primary btn-block btn-flat\" [disabled]=\"!resetPasswordForm.valid\" (click)=\"reserPassword()\">Update</button>\n                </div>\n                <!-- /.col -->\n              </div>\n            </form>\n        \n\n        \n          </div>\n          <!-- /.login-box-body -->\n        </div>\n        </div>\n\n        <!-- /.login-box -->\n        \n        <!-- jQuery 3 -->\n      \n      </section>\n      <footer class=\"main-footer\" style=\"margin-left: 0px;text-align: center;\">\n        <div class=\"pull-right hidden-xs\">\n   \n        </div>\n        <strong>Copyright &copy; 2020 <a href=\"https://adminlte.io\">Orbistur.com,</a></strong> All rights\n        reserved.\n      </footer>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/settings-page/settings-page.component.html":
  /*!**************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/settings-page/settings-page.component.html ***!
    \**************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppSettingsPageSettingsPageComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-sidebar></app-sidebar>\n<div class=\"content-wrapper\">\n    <div class=\"container con\">\n        <ul class=\"nav nav-tabs tabs4col\" id=\"myTab\" role=\"tablist\" style=\"text-align: center;\">\n            <li class=\"nav-item\">\n                <a class=\"nav-link active show ashow1\" style=\"cursor: pointer;\"\n                    [ngClass]=\"{'active': tab== 'PackageTypes'}\" (click)='tabChangedFunc(0)' data-toggle=\"tab\"\n                    role=\"tab\" aria-controls=\"home\" aria-selected=\"true\">\n                    Package Types\n                </a>\n            </li>\n            <li class=\"nav-item \">\n                <a class=\"nav-link active show ashow1\" style=\"cursor: pointer;\" [ngClass]=\"{'active': tab== 'Transfer'}\"\n                    (click)='tabChangedFunc(1)' data-toggle=\"tab\" role=\"tab\" aria-controls=\"home\" aria-selected=\"false\">\n                    Transfer\n                </a>\n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link active show ashow1\" style=\"cursor: pointer;\" [ngClass]=\"{'active': tab== 'CarType'}\"\n                    (click)='tabChangedFunc(2)' data-toggle=\"tab\" role=\"tab\" aria-controls=\"profile\"\n                    aria-selected=\"false\">\n                    Car Type\n                </a>\n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link active show ashow1\" style=\"cursor: pointer;\"\n                    [ngClass]=\"{'active': tab== 'Countries'}\" (click)='tabChangedFunc(3)' data-toggle=\"tab\" role=\"tab\"\n                    aria-controls=\"profile\" aria-selected=\"false\">\n                    Countries\n                </a>\n            </li>\n        </ul>\n    </div>\n\n\n    <div class=\"upper_tab show active\" [ngClass]=\"{'active': tab =='PackageTypes'}\" *ngIf=\"(tab == 'PackageTypes')\"\n        role=\"tabpanel\" aria-labelledby=\"favourite-tab\">\n        <form [formGroup]=\"packageForm\">\n            <div class=\"container con\" style=\"padding: 8px;\">\n                <label>Add Package Type</label>\n                <div class=\"destinations\">\n                    <label>Country</label>\n                    <select class=\"form-control selectCountry\" formControlName=\"country\">\n                        <option value=\"\">Select country</option>\n                        <option value=\"{{item._id}}\" *ngFor=\"let item of countryList\">{{item.country}}</option>\n                    </select>\n                    <!-- <div *ngIf=\"packageForm.get('country').hasError('required') && packageForm.get('country').touched\">\n                        <span style=\"color:red;float:right;margin-right:13.5%;\">*Country is required.</span></div> -->\n                    <label >Type</label>\n                    <input type=\"text\" class=\"form-control types\" formControlName=\"type\" class=\"inptdestination\"\n                        (keypress)=\"service.preventSpace($event)\">\n\n                </div>\n                <div *ngIf=\"packageForm.get('type').hasError('required') && packageForm.get('type').touched\">\n                    <span style=\"color:red;float:right;margin-right: 47.5%;;\">*Type is required.</span></div>\n                <div *ngIf=\"packageForm.get('type').hasError('maxlength') && packageForm.get('type').touched\">\n                    <span style=\"color:red;float:right;margin-right:36%;\">*Maxlength should be 20 characters.</span>\n                </div>\n\n                <div class=\"activeinactiv\" style=\"margin-left: 8px;padding-top: 22px;\">\n                    <input type=\"radio\" class=\"activradio\" name=\"activeInsurance\" value=\"ACTIVE\" [checked]=\"true\"\n                        formControlName=\"activeInsurance\" style=\"margin-left: 11%;\">\n                    <label>Active</label>\n                    <input type=\"radio\" name=\"activeInsurance\" value=\"INACTIVE\" formControlName=\"activeInsurance\"\n                        style=\"margin-left: 7%;\">\n                    <label>Inactive</label>\n                </div>\n                <div>\n                    <button type=\"button\" class=\"btn btn-success btnss\" [disabled]=\"!packageForm.valid\"\n                        (click)=\"addPackage()\">Add</button>\n                </div>\n            </div>\n        </form>\n        <div class=\"container\" style=\"border-style: ridge;width: 83%;\">\n            <section style=\"padding-top: 22px;\">\n                <input type=\"search\" class=\"srch\" [(ngModel)]=\"filterName\" maxlength=\"50\"\n                    (keyup)=\"searchValue($event.target.value)\" placeholder=\"Search by name\">\n                <select class=\"selects1\" (change)=\"selectStatus($event.target.value)\">\n                    <option value=\"\">Select status</option>\n                    <option value=\"ALL\">All</option>\n                    <option value=\"ACTIVE\">Active</option>\n                    <option value=\"INACTIVE\">Inactive</option>\n                </select>\n            </section>\n            <section class=\"content\">\n                <div class=\"row\">\n                    <div class=\"col-xs-12\">\n                        <div class=\"box\">\n                            <!-- /.box-header -->\n                            <div class=\"box-body\">\n                                <table id=\"customers\" class=\"table table-bordered table-hover\">\n                                    <thead>\n                                        <tr class=\"trt\">\n                                            <th class=\"tdt\">S.No.</th>\n                                            <th class=\"tdt\">Country</th>\n                                            <th class=\"tdt\">Type</th>\n                                            <th class=\"tdt\">Status</th>\n                                            <th class=\"tdt\">Actions</th>\n                                        </tr>\n                                    </thead>\n                                    <tbody *ngIf=\"packageLists\">\n                                        <!-- | paginate : {itemsPerPage: 7, currentPage:page, totalItems:total}; let i=index -->\n                                        <tr\n                                            *ngFor=\"let items of packageLists | paginate : {itemsPerPage:10, currentPage:page, totalItems:total}; let i=index\">\n                                            <td class=\"tdt\">{{limit * (page-1)+i+1}}</td>\n                                            <td class=\"tdt\">{{items.countryName || '--'}}</td>\n                                            <td class=\"tdt\">{{items.type || '--'}}</td>\n                                            <!-- <td>{{items.name}}</td> [routerLink]=\"['/edit-destination',items?._id]\"-->\n                                            <td class=\"tdt\" *ngIf=\"items.status=='ACTIVE'\">Active</td>\n                                            <td class=\"tdt\" *ngIf=\"items.status!='ACTIVE'\">Inactive</td>\n                                            <td class=\"tdt\">\n                                                <div style=\"display: flex;justify-content: center;\"> <a\n                                                        class=\"btn btn-app edt\" style=\"border: none;\"\n                                                        [routerLink]=\"['/edit-setting',items?._id,0,no]\">\n                                                        <i class=\"fa fa-edit\"></i>\n                                                    </a>\n                                                    <a class=\"btn btn-app dlt\" style=\"border: none;\" data-toggle=\"modal\"\n                                                        data-target=\"#exampdelete\" (click)=\"deleteFunction(items?._id)\">\n                                                        <i class=\"fa fa-trash\"></i>\n                                                    </a>\n                                                </div>\n                                            </td>\n                                        </tr>\n                                    </tbody>\n                                </table>\n                                <h3 *ngIf=\"packageLists?.length==0\" style=\"text-align: center;\">Data not found!</h3>\n                            </div>\n                            <pagination-controls (pageChange)=\"changePage($event) \" style=\"float:right;\"\n                                *ngIf=\"packageLists?.length != 0\">\n                            </pagination-controls>\n                        </div>\n                    </div>\n                </div>\n            </section>\n        </div>\n    </div>\n    <div class=\"upper_tab show active\" [ngClass]=\"{'active': tab =='Transfer'}\" *ngIf=\"(tab == 'Transfer')\"\n        role=\"tabpanel\" aria-labelledby=\"favourite-tab\">\n        <!-- <label>Add Website</label> -->\n        <div class=\"container\">\n            <section>\n              \n                    <div class=\"container con\">\n                        <ul class=\"nav nav-tabs tabs4col\" id=\"myTab\" role=\"tablist\" style=\"text-align: center;\">\n                            <li class=\"nav-item type_c3\">\n                                <a class=\"nav-link active show ashow1\" style=\"cursor: pointer;\"\n                                    [ngClass]=\"{'active': tabs== 'TransferCategory'}\" (click)='tabChangedFuncs(0)'\n                                    data-toggle=\"tab\" role=\"tab\" aria-controls=\"home\" aria-selected=\"true\">\n                                    Transfer Category\n                                </a>\n                            </li>\n                            <li class=\"nav-item type_c3\">\n                                <a class=\"nav-link active show ashow1\" style=\"cursor: pointer;\"\n                                    [ngClass]=\"{'active': tabs== 'TransferType'}\" (click)='tabChangedFuncs(1)'\n                                    data-toggle=\"tab\" role=\"tab\" aria-controls=\"home\" aria-selected=\"false\">\n                                    Transfer Type\n                                </a>\n                            </li>\n                        </ul>\n                    \n                </div>\n            </section>\n            <div class=\"upper_tab show active\" [ngClass]=\"{'active': tabs =='TransferCategory'}\"\n                *ngIf=\"(tabs == 'TransferCategory')\" role=\"tabpanel\" aria-labelledby=\"favourite-tab\"\n                style=\"padding: 17px;\">\n                <div class=\"container inactive_c3\">\n                    <section style=\"padding-top: 22px;\">\n                        <input type=\"search\" class=\"srch\" [(ngModel)]=\"filterName\" maxlength=\"50\"\n                            (keyup)=\"searchValue($event.target.value)\" placeholder=\"Search by name\">\n                        <select class=\"selects1\" (change)=\"selectStatus($event.target.value)\">\n                            <option value=\"\">Select status</option>\n                            <option value=\"ALL\">All</option>\n                            <option value=\"ACTIVE\">Active</option>\n                            <option value=\"INACTIVE\">Inactive</option>\n                        </select>\n                    </section>\n                    <section class=\"content\">\n                        <div class=\"row\">\n                            <div class=\"col-xs-12\">\n                                <div class=\"box\">\n                                    <!-- /.box-header -->\n                                    <div class=\"box-body\">\n                                        <table id=\"customers\" class=\"table table-bordered table-hover\">\n                                            <thead>\n                                                <tr class=\"trt\">\n                                                    <th class=\"tdt\">S.No.</th>\n                                                    <th class=\"tdt\">Transfer Category</th>\n                                                    <th class=\"tdt\">Status</th>\n                                                    <th class=\"tdt\">Actions</th>\n\n                                                </tr>\n                                            </thead>\n                                            <tbody *ngIf=\"transferLists\">\n                                                <!-- | paginate : {itemsPerPage: 7, currentPage:page, totalItems:total}; let i=index -->\n                                                <tr\n                                                    *ngFor=\"let items of transferLists | paginate : {itemsPerPage:10, currentPage:page, totalItems:total}; let i=index\">\n                                                    <td class=\"tdt\">{{limit * (page-1)+i+1}}</td>\n                                                    <td class=\"tdt\">{{items.category || '--'}}</td>\n                                                    <!-- <td>{{items.name}}</td> [routerLink]=\"['/edit-destination',items?._id]\"-->\n                                                    <td class=\"tdt\" *ngIf=\"items.status=='ACTIVE'\">Active</td>\n                                                    <td class=\"tdt\" *ngIf=\"items.status!='ACTIVE'\">Inactive</td>\n                                                    <td class=\"tdt\">\n                                                        <!-- [routerLink]=\"['/edit-destination',items?._id,2]\" -->\n                                                        <div style=\"display: flex;justify-content: center;\"> <a\n                                                                class=\"btn btn-app edt\" style=\"border: none;\"\n                                                                [routerLink]=\"['/edit-setting',items?._id,1,0]\">\n                                                                <i class=\"fa fa-edit\"></i>\n                                                            </a>\n                                                            <a class=\"btn btn-app dlt\" style=\"border: none;\"\n                                                                data-toggle=\"modal\" data-target=\"#transfrexampdelete\"\n                                                                (click)=\"deletetransfer(items?._id)\">\n                                                                <i class=\"fa fa-trash\"></i>\n                                                            </a>\n                                                        </div>\n                                                    </td>\n                                                </tr>\n                                            </tbody>\n                                        </table>\n                                        <h3 *ngIf=\"transferLists?.length==0\" style=\"text-align: center;\">Data not found!\n                                        </h3>\n                                    </div>\n                                    <pagination-controls (pageChange)=\"changePage($event) \" style=\"float:right;\"\n                                        *ngIf=\"transferLists?.length != 0\">\n                                    </pagination-controls>\n                                </div>\n                            </div>\n                        </div>\n                    </section>\n                </div>\n            </div>\n            <div class=\"upper_tab show active\" [ngClass]=\"{'active': tabs =='TransferType'}\"\n                *ngIf=\"(tabs == 'TransferType')\" role=\"tabpanel\" aria-labelledby=\"favourite-tab\" style=\"padding: 17px;\">\n\n                <div class=\"container\" class=\"inactiv_c2\">\n                    <section style=\"padding-top: 22px;\">\n                        <input type=\"search\" class=\"srch\" [(ngModel)]=\"filterName\" maxlength=\"50\"\n                            (keyup)=\"searchValue($event.target.value)\" placeholder=\"Search by name\">\n                        <select class=\"selects1\" (change)=\"selectStatus($event.target.value)\">\n                            <option value=\"\">Select status</option>\n                            <option value=\"ALL\">All</option>\n                            <option value=\"ACTIVE\">Active</option>\n                            <option value=\"INACTIVE\">Inactive</option>\n                        </select>\n                    </section>\n                    <section class=\"content\">\n                        <div class=\"row\">\n                            <div class=\"col-xs-12\">\n                                <div class=\"box\">\n                                    <!-- /.box-header -->\n                                    <div class=\"box-body\">\n                                        <table id=\"customers\" class=\"table table-bordered table-hover\">\n                                            <thead>\n                                                <tr class=\"trt\">\n                                                    <th class=\"tdt\">S.No.</th>\n                                                    <th class=\"tdt\">Transfer Type</th>\n                                                    <th class=\"tdt\">Status</th>\n                                                    <th class=\"tdt\">Actions</th>\n                                                </tr>\n                                            </thead>\n                                            <tbody *ngIf=\"transferTypeLists\">\n                                                <!-- | paginate : {itemsPerPage: 7, currentPage:page, totalItems:total}; let i=index -->\n                                                <tr\n                                                    *ngFor=\"let items of transferTypeLists | paginate : {itemsPerPage:10, currentPage:page, totalItems:total}; let i=index\">\n                                                    <td class=\"tdt\">{{limit * (page-1)+i+1}}</td>\n                                                    <td class=\"tdt\">{{items.type || '--'}}</td>\n                                                    <!-- <td>{{items.name}}</td> [routerLink]=\"['/edit-destination',items?._id]\"-->\n                                                    <td class=\"tdt\" *ngIf=\"items.status=='ACTIVE'\">Active</td>\n                                                    <td class=\"tdt\" *ngIf=\"items.status!='ACTIVE'\">Inactive</td>\n                                                    <td class=\"tdt\">\n                                                        <div style=\"display: flex;justify-content: center;\"> <a\n                                                                class=\"btn btn-app edt\" style=\"border: none;\"\n                                                                [routerLink]=\"['/edit-setting',items?._id,1,1]\">\n                                                                <i class=\"fa fa-edit\"></i>\n                                                            </a>\n                                                            <a class=\"btn btn-app dlt\" style=\"border: none;\"\n                                                                data-toggle=\"modal\" data-target=\"#transfertype\"\n                                                                (click)=\"tranceFertype(items?._id)\">\n                                                                <i class=\"fa fa-trash\"></i>\n                                                            </a>\n                                                        </div>\n                                                    </td>\n                                                </tr>\n                                            </tbody>\n                                        </table>\n                                        <h3 *ngIf=\"transferTypeLists?.length==0\" style=\"text-align: center;\">Data not\n                                            found!</h3>\n                                    </div>\n                                    <pagination-controls (pageChange)=\"changePage($event) \" style=\"float:right;\"\n                                        *ngIf=\"transferTypeLists?.length != 0\">\n                                    </pagination-controls>\n                                </div>\n                            </div>\n                        </div>\n                    </section>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"upper_tab show active\" [ngClass]=\"{'active': tab =='CarType'}\" *ngIf=\"(tab == 'CarType')\"\n        role=\"tabpanel\" aria-labelledby=\"favourite-tab\">\n        <form [formGroup]=\"carTypeForm\">\n            <div class=\"container con\">\n                <label>Add Car Type</label>\n                <div class=\"destinations\">\n                    <label>Country</label>\n                    <select class=\"form-control selectCountry\" formControlName=\"country\">\n                        <option value=\"\">Select country</option>\n                        <option value=\"{{item._id}}\" *ngFor=\"let item of countryList\">{{item.country}}</option>\n                    </select>\n                    <!-- <div\n                    *ngIf=\"carTypeForm.get('country').hasError('required') && carTypeForm.get('country').touched\">\n                    <span style=\"color:red;float:right;margin-right:13.5%;\">*Destination is required.</span></div> -->\n                </div>\n                <div class=\"destinations\">\n                    <label>Destination</label>\n                    <select class=\"form-control selectsdestination\" formControlName=\"destination\">\n                        <option value=\"\">Select destination</option>\n                        <option value=\"{{item._id}}\" *ngFor=\"let item of destinationLists\">{{item.destination}}</option>\n                    </select>\n                    <!-- <div\n                    *ngIf=\"carTypeForm.get('country').hasError('required') && carTypeForm.get('country').touched\">\n                    <span style=\"color:red;float:right;margin-right:13.5%;\">*Destination is required.</span></div> -->\n                </div>\n                <div class=\"destinations\">\n                    <label>Type</label>\n                    <input type=\"text\" class=\"form-control types\" formControlName=\"type\" class=\"inptdestination\">\n                </div>\n                <div *ngIf=\"carTypeForm.get('type').hasError('required') && carTypeForm.get('type').touched\">\n                    <span style=\"color:red;float:right;margin-right:13.5%;\">*Type is required.</span></div>\n                <!-- <div *ngIf=\"carTypeForm.get('price').hasError('required') && carTypeForm.get('price').touched\">\n                    <span style=\"color:red;float:right;margin-right:13.5%;\">*Price is required.</span></div> -->\n                <div class=\"destinations\">\n                    <label>Price</label>\n                    <input type=\"text\"class=\"form-control destinationprice\" formControlName=\"price\" class=\"inptdestination\">\n                </div>\n                <div *ngIf=\"carTypeForm.controls['price'].hasError('maxlength')\"><span\n                        style=\"color:red;margin-left:208px;\">*Maxlength should\n                        be 20 numbers.</span></div>\n                <div *ngIf=\"carTypeForm.controls['price'].hasError('pattern')\"><span\n                        style=\"color:red;margin-left: 208px;\">*Don't\n                        use small, capital letter and special characters.</span></div>\n                <!-- <label class=\"optionals\">Optional</label> -->\n                <div class=\"activeinactiv\" style=\"margin-left: 8px;padding-top: 20px;\">\n                    <input type=\"radio\" class=\"activradio\" name=\"activeInsurance\" value=\"ACTIVE\" [checked]=\"true\"\n                        formControlName=\"activeInsurance\" style=\"margin-left: 11%;\">\n                    <label>Active</label>\n                    <input type=\"radio\" name=\"activeInsurance\" value=\"INACTIVE\" formControlName=\"activeInsurance\"\n                        style=\"margin-left: 41px;;\">\n                    <label>Inactive</label>\n                </div>\n                <div>\n                    <button type=\"button\" class=\"btn btn-success btnss\" [disabled]=\"!carTypeForm.valid\"\n                        (click)=\"addCarType()\">Add</button>\n                </div>\n            </div>\n        </form>\n        <div class=\"container\" style=\"border-style: ridge;width: 83%;\">\n            <section style=\"padding-top: 22px;\">\n                <input type=\"search\" class=\"srch\" [(ngModel)]=\"filterName\" maxlength=\"50\"\n                    (keyup)=\"searchValue($event.target.value)\" placeholder=\"Search by name\">\n                <select class=\"selects1\" (change)=\"selectStatus($event.target.value)\">\n                    <option value=\"\">Select status</option>\n                    <option value=\"ALL\">All</option>\n                    <option value=\"ACTIVE\">Active</option>\n                    <option value=\"INACTIVE\">Inactive</option>\n                </select>\n            </section>\n            <section class=\"content\">\n                <div class=\"row\">\n                    <div class=\"col-xs-12\">\n                        <div class=\"box\">\n                            <!-- /.box-header -->\n                            <div class=\"box-body\">\n                                <table id=\"customers\" class=\"table table-bordered table-hover\">\n                                    <thead>\n                                        <tr class=\"trt\">\n                                            <th class=\"tdt\">S.No.</th>\n                                            <th class=\"tdt\">Car type</th>\n                                            <th class=\"tdt\">Price</th>\n                                            <th class=\"tdt\">Status</th>\n                                            <th class=\"tdt\">Actions</th>\n\n                                        </tr>\n                                    </thead>\n                                    <tbody *ngIf=\"cartTypeLists\">\n                                        <!-- | paginate : {itemsPerPage: 7, currentPage:page, totalItems:total}; let i=index -->\n                                        <tr\n                                            *ngFor=\"let items of cartTypeLists | paginate : {itemsPerPage:10, currentPage:page, totalItems:total}; let i=index\">\n                                            <td class=\"tdt\">{{limit * (page-1)+i+1}}</td>\n                                            <td class=\"tdt\">{{items.carType || '--'}}</td>\n                                            <td class=\"tdt\">{{items.price || '--'}}</td>\n                                            <!-- <td>{{items.name}}</td> [routerLink]=\"['/edit-destination',items?._id]\"-->\n                                            <td class=\"tdt\" *ngIf=\"items.status=='ACTIVE'\">Active</td>\n                                            <td class=\"tdt\" *ngIf=\"items.status!='ACTIVE'\">Inactive</td>\n                                            <td class=\"tdt\">\n                                                <div style=\"display: flex;justify-content: center;\"> <a\n                                                        class=\"btn btn-app edt\" style=\"border: none;\"\n                                                        [routerLink]=\"['/edit-setting',items?._id,2,no]\">\n                                                        <i class=\"fa fa-edit\"></i>\n                                                    </a>\n                                                    <a class=\"btn btn-app dlt\" style=\"border: none;\" data-toggle=\"modal\"\n                                                        data-target=\"#deletetCartype\"\n                                                        (click)=\"deletetCartype(items?._id)\">\n                                                        <i class=\"fa fa-trash\"></i>\n                                                    </a>\n                                                </div>\n                                            </td>\n                                        </tr>\n                                    </tbody>\n                                </table>\n                                <h3 *ngIf=\"cartTypeLists?.length==0\" style=\"text-align: center;\">Data not found!</h3>\n                            </div>\n                            <pagination-controls (pageChange)=\"changePage($event) \" style=\"float:right;\"\n                                *ngIf=\"cartTypeLists?.length != 0\">\n                            </pagination-controls>\n                        </div>\n                    </div>\n                </div>\n            </section>\n        </div>\n    </div>\n    <div class=\"upper_tab show active\" [ngClass]=\"{'active': tab =='Countries'}\" *ngIf=\"(tab == 'Countries')\"\n        role=\"tabpanel\" aria-labelledby=\"favourite-tab\">\n        <form [formGroup]=\"countryForm\">\n            <div class=\"container con\">\n                <label>Add Country</label>\n                <div class=\"destinations\">\n                    <label>Country</label>\n                    <input type=\"text\" class=\"form-control destinationprice\" formControlName=\"country\">\n                </div>\n                <div *ngIf=\"countryForm.get('country').hasError('required') && countryForm.get('country').touched\">\n                    <span style=\"color:red;margin-right: -2.5%;    margin-left:178px;\n                \">*Country is required.</span>   </div>\n                 <div *ngIf=\"countryForm.controls['country'].hasError('maxlength')\"><span\n                    style=\"color:red; margin-left: 15%;\">*Maxlength should\n                    be 16 characters.</span></div>\n\n                <div class=\"activeinactiv\" style=\"padding-top: 11px;margin-left: 9px;\">\n                    <input type=\"radio\" class=\"activradio\" name=\"activeInsurance\" value=\"ACTIVE\" [checked]=\"true\"\n                        formControlName=\"activeInsurance\" style=\"margin-left: 11%;\">\n                    <label>Active</label>\n                    <input type=\"radio\" name=\"activeInsurance\" value=\"INACTIVE\" formControlName=\"activeInsurance\"\n                        style=\"margin-left: 12%;\">\n                    <label>Inactive</label>\n                </div>\n                <div class=\"btn\">\n                    <button type=\"button\" class=\"btn btn-success btnss\" [disabled]=\"!countryForm.valid\"\n                        (click)=\"addCountry()\">Add</button>\n                </div>\n            </div>\n        </form>\n        <div class=\"container\" style=\"border-style: ridge;width: 83%;\">\n            <section style=\"padding-top: 22px;\">\n                <input type=\"search\" class=\"srch\" [(ngModel)]=\"filterName\" maxlength=\"50\"\n                    (keyup)=\"searchValue($event.target.value)\" placeholder=\"Search by name\">\n                <select class=\"selects1\" (change)=\"selectStatus($event.target.value)\">\n                    <option value=\"\">Select status</option>\n                    <option value=\"ALL\">All</option>\n                    <option value=\"ACTIVE\">Active</option>\n                    <option value=\"INACTIVE\">Inactive</option>\n                </select>\n            </section>\n            <section class=\"content\">\n                <div class=\"row\">\n                    <div class=\"col-xs-12\">\n                        <div class=\"box\">\n                            <!-- /.box-header -->\n                            <div class=\"box-body\">\n                                <table id=\"customers\" class=\"table table-bordered table-hover\">\n                                    <thead>\n                                        <tr class=\"trt\">\n                                            <th class=\"tdt\">S.No.</th>\n                                            <th class=\"tdt\">Country Name</th>\n                                            <th class=\"tdt\">Status</th>\n                                            <th class=\"tdt\">Actions</th>\n\n                                        </tr>\n                                    </thead>\n                                    <tbody *ngIf=\"countryData\">\n                                        <!-- | paginate : {itemsPerPage: 7, currentPage:page, totalItems:total}; let i=index -->\n                                        <tr\n                                            *ngFor=\"let items of countryData | paginate : {itemsPerPage:10, currentPage:page, totalItems:total}; let i=index\">\n                                            <td class=\"tdt\">{{limit * (page-1)+i+1}}</td>\n                                            <td class=\"tdt\">{{items.country || '--'}}</td>\n                                            <!-- <td>{{items.name}}</td> [routerLink]=\"['/edit-destination',items?._id]\"-->\n                                            <td class=\"tdt\" *ngIf=\"items.status=='ACTIVE'\">Active</td>\n                                            <td class=\"tdt\" *ngIf=\"items.status!='ACTIVE'\">Inactive</td>\n                                            <td class=\"tdt\">\n                                                <div style=\"display: flex;justify-content: center;\"> <a\n                                                        class=\"btn btn-app edt\" style=\"border: none;\"\n                                                        [routerLink]=\"['/edit-setting',items?._id,3,no]\">\n                                                        <i class=\"fa fa-edit\"></i>\n                                                    </a>\n                                                    <a class=\"btn btn-app dlt\" style=\"border: none;\" data-toggle=\"modal\"\n                                                        data-target=\"#deletetCountries\"\n                                                        (click)=\"deletetCountries(items?._id)\">\n                                                        <i class=\"fa fa-trash\"></i>\n                                                    </a>\n                                                </div>\n                                            </td>\n                                        </tr>\n                                    </tbody>\n                                </table>\n                                <h3 *ngIf=\"countryData?.length==0\" style=\"text-align: center;\">Data not found!</h3>\n                            </div>\n                            <pagination-controls (pageChange)=\"changePage($event) \" style=\"float:right;\"\n                                *ngIf=\"countryData?.length != 0\">\n                            </pagination-controls>\n                        </div>\n                    </div>\n                </div>\n            </section>\n        </div>\n    </div>\n</div>\n<div class=\"modal fade\" id=\"exampdelete\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\"\n    aria-hidden=\"true\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <H3 style=\"text-align:center;padding-top: 42px;\"> Delete package type?</H3>\n            <hr>\n            <div class=\"modal-body\" style=\"display: flex;justify-content: center;padding: 26px\">\n                <b style=\"font-size: 20px;font-weight: 500;\">Are you sure you want to delete this package type?</b>\n            </div>\n            <div class=\"modal-footer\" style=\"display: flex;justify-content: space-between;\">\n                <button type=\"button\"\n                    style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: red;color: white;\"\n                    data-dismiss=\"modal\">No</button>\n                <button type=\"button\"\n                    style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: green;color: white;\"\n                    (click)=\"deleteFunctions()\" data-dismiss=\"modal\">Yes</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"modal fade\" id=\"transfertype\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\"\n    aria-hidden=\"true\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <H3 style=\"text-align:center;padding-top: 42px;\"> Delete transfer type?</H3>\n            <hr>\n            <div class=\"modal-body\" style=\"display: flex;justify-content: center;padding: 26px\">\n                <b style=\"font-size: 20px;font-weight: 500;\">Are you sure you want to delete this transfer type ?</b>\n            </div>\n            <div class=\"modal-footer\" style=\"display: flex;justify-content: space-between;\">\n                <button type=\"button\"\n                    style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: red;color: white;\"\n                    data-dismiss=\"modal\">No</button>\n                <button type=\"button\"\n                    style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: green;color: white;\"\n                    (click)=\"deletetranceFertype()\" data-dismiss=\"modal\">Yes</button>\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"modal fade\" id=\"transfrexampdelete\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\"\n    aria-hidden=\"true\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <H3 style=\"text-align:center;padding-top: 42px;\"> Delete transfer category ?</H3>\n            <hr>\n            <div class=\"modal-body\" style=\"display: flex;justify-content: center;padding: 26px\">\n                <b style=\"font-size: 20px;font-weight: 500;\">Are you sure you want to delete this transfer category\n                    ?</b>\n            </div>\n            <div class=\"modal-footer\" style=\"display: flex;justify-content: space-between;\">\n                <button type=\"button\"\n                    style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: red;color: white;\"\n                    data-dismiss=\"modal\">No</button>\n                <button type=\"button\"\n                    style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: green;color: white;\"\n                    (click)=\"deletetransferdata()\" data-dismiss=\"modal\">Yes</button>\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"modal fade\" id=\"deletetCartype\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\"\n    aria-hidden=\"true\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <H3 style=\"text-align:center;padding-top: 42px;\"> Delete car type ?</H3>\n            <hr>\n            <div class=\"modal-body\" style=\"display: flex;justify-content: center;padding: 26px\">\n                <b style=\"font-size: 20px;font-weight: 500;\">Are you sure you want to delete this car type ?</b>\n            </div>\n            <div class=\"modal-footer\" style=\"display: flex;justify-content: space-between;\">\n                <button type=\"button\"\n                    style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: red;color: white;\"\n                    data-dismiss=\"modal\">No</button>\n                <button type=\"button\"\n                    style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: green;color: white;\"\n                    (click)=\"deletetCartypedata()\" data-dismiss=\"modal\">Yes</button>\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"modal fade\" id=\"deletetCountries\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\"\n    aria-hidden=\"true\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <H3 style=\"text-align:center;padding-top: 42px;\"> Delete country ?</H3>\n            <hr>\n            <div class=\"modal-body\" style=\"display: flex;justify-content: center;padding: 26px\">\n                <b style=\"font-size: 20px;font-weight: 500;\">Are you sure you want to delete this country ?</b>\n            </div>\n            <div class=\"modal-footer\" style=\"display: flex;justify-content: space-between;\">\n                <button type=\"button\"\n                    style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: red;color: white;\"\n                    data-dismiss=\"modal\">No</button>\n                <button type=\"button\"\n                    style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: green;color: white;\"\n                    (click)=\"deletetCountriesdata()\" data-dismiss=\"modal\">Yes</button>\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"modal fade\" id=\"bannermodaldelete\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\"\n    aria-hidden=\"true\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <H3 style=\"text-align:center;padding-top: 42px;\">Delete Banner ?</H3>\n            <hr>\n            <div class=\"modal-body\" style=\"display: flex;justify-content: center;padding: 26px\">\n                <b style=\"font-size: 20px;font-weight: 500;\">Are you sure you want to delete this banner ?</b>\n            </div>\n            <div class=\"modal-footer\" style=\"display: flex;justify-content: space-between;\">\n                <button type=\"button\"\n                    style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: red;color: white;\"\n                    data-dismiss=\"modal\">No</button>\n                <button type=\"button\"\n                    style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: green;color: white;\"\n                    (click)=\"deletebanners()\" data-dismiss=\"modal\">Yes</button>\n            </div>\n        </div>\n    </div>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/sidebar/sidebar.component.html":
  /*!**************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/sidebar/sidebar.component.html ***!
    \**************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppSidebarSidebarComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n    <header class=\"main-header\">\n      <!-- Logo -->\n      <a href=\"index2.html\" class=\"logo\" >\n        <!-- mini logo for sidebar mini 50x50 pixels -->\n        <span class=\"logo-mini\"><b>O</b>AP</span>\n        <!-- logo for regular state and mobile devices -->\n        <span class=\"logo-lg\"><b>Orbistur</b>Admin Panel</span>\n      </a>\n      <!-- Header Navbar: style can be found in header.less -->\n      <nav class=\"navbar navbar-static-top\">\n        <!-- Sidebar toggle button-->\n        <a href=\"#\" class=\"sidebar-toggle\" data-toggle=\"push-menu\" role=\"button\">\n          <span class=\"sr-only\">Toggle navigation</span>\n        </a>\n  \n        <div class=\"navbar-custom-menu\">\n          <ul class=\"nav navbar-nav\">\n            <!-- Messages: style can be found in dropdown.less-->\n          \n            <!-- Notifications: style can be found in dropdown.less -->\n         \n            <!-- Tasks: style can be found in dropdown.less -->\n        \n            <!-- User Account: style can be found in dropdown.less -->\n          \n            <!-- Control Sidebar Toggle Button -->\n            <li class=\"logouts\">\n           <img class=\"immgs\" src=\"assets/adminLTE/dist/img/avatar.png\">\n           <i class=\"treeview\" data-toggle=\"modal\" data-backdrop=\"static\" data-target=\"#modallogout\" data-keyboard=\"false\"  class='fas fa-sign-out-alt' style='padding-top: 21px;'>Logout</i>\n           </li>\n          </ul>\n        </div>\n      </nav>\n    </header>\n  <aside class=\"main-sidebar side\">\n        <!-- sidebar: style can be found in sidebar.less -->\n        <section class=\"sidebar\">\n        \n          <ul class=\"sidebar-menu\" data-widget=\"tree\">\n         \n            <li  class=\"treeview\" [routerLink]=\"['/dashboard']\" >\n              <a>\n                <i class=\"fa fa-files-o\"></i>\n                <span>Dashboard</span>\n                <span class=\"pull-right-container\">\n                  <!-- <span class=\"label label-primary pull-right\">4</span> -->\n                </span>\n              </a>\n             \n            </li>\n            <li class=\"treeview\" [routerLink]=\"['/customer-management']\">\n                <a>\n                  <i class=\"fa fa-files-o\"></i>\n                  <span>Customer Management</span>\n                  <span class=\"pull-right-container\">\n                    <!-- <span class=\"label label-primary pull-right\">4</span> -->\n                  </span>\n                </a>\n               \n              </li>\n              <li class=\"treeview\" [routerLink]=\"['/sub-admin-management']\">\n                <a>\n                  <i class=\"fa fa-files-o\"></i>\n                  <span>Sub Admin Management</span>\n                  <span class=\"pull-right-container\">\n                    <!-- <span class=\"label label-primary pull-right\">4</span> -->\n                  </span>\n                </a>\n               \n              </li>\n             \n             \n              <li class=\"treeview\" [routerLink]=\"['/package-management']\">\n                <a>\n                  <i class=\"fa fa-files-o\"></i>\n                  <span>Package Management</span>\n                  <span class=\"pull-right-container\">\n                    <!-- <span class=\"label label-primary pull-right\">4</span> -->\n                  </span>\n                </a>\n               \n              </li>\n              <li class=\"treeview\" [routerLink]=\"['/content-destination']\">\n                <a>\n                  <i class=\"fa fa-files-o\"></i>\n                  <span>Content </span>\n                  <span class=\"pull-right-container\">\n                    <!-- <span class=\"label label-primary pull-right\">4</span> content-destination-->\n                  </span>\n                </a>\n               \n              </li>\n              <!-- [routerLink]=\"['/settings-page']\" -->\n              <li class=\"treeview\" [routerLink]=\"['/settings-page']\">\n                  <a>\n                    <i class=\"fa fa-files-o\"></i>\n                    <span>Settings</span>\n                    <span class=\"pull-right-container\">\n                      <!-- <span class=\"label label-primary pull-right\">4</span> content-destination-->\n                    </span>\n                  </a>\n                 \n                </li>\n              <li class=\"treeview\" >\n                  <a>\n                    <i class=\"fa fa-files-o\"></i>\n                    <span>Booking Management</span>\n                    <span class=\"pull-right-container\">\n                      <!-- <span class=\"label label-primary pull-right\">4</span> content-destination-->\n                    </span>\n                  </a>\n                 \n                </li>\n              <li class=\"treeview\" >\n                <a>\n                  <i class=\"fa fa-files-o\"></i>\n                  <span>Transfer Management</span>\n                  <span class=\"pull-right-container\">\n                    <!-- <span class=\"label label-primary pull-right\">4</span> content-destination-->\n                  </span>\n                </a>\n               \n              </li>\n              <li class=\"treeview\" >\n                <a>\n                  <i class=\"fa fa-files-o\"></i>\n                  <span>Sightseeing Management</span>\n                  <span class=\"pull-right-container\">\n                    <!-- <span class=\"label label-primary pull-right\">4</span> content-destination-->\n                  </span>\n                </a>\n               \n              </li>\n              <li class=\"treeview\" >\n                <a>\n                  <i class=\"fa fa-files-o\"></i>\n                  <span>Transaction Management</span>\n                  <span class=\"pull-right-container\">\n                    <!-- <span class=\"label label-primary pull-right\">4</span> content-destination-->\n                  </span>\n                </a>\n               \n              </li>\n              <li class=\"treeview\" >\n                <a>\n                  <i class=\"fa fa-files-o\"></i>\n                  <span>Visa Management</span>\n                  <span class=\"pull-right-container\">\n                    <!-- <span class=\"label label-primary pull-right\">4</span> content-destination-->\n                  </span>\n                </a>\n               \n              </li>\n              <li class=\"treeview\" [routerLink]=\"['/enquries']\">\n                <a>\n                  <i class=\"fa fa-files-o\"></i>\n                  <span>Enquiries</span>\n                  <span class=\"pull-right-container\">\n                    <!-- <span class=\"label label-primary pull-right\">4</span> content-destination-->\n                  </span>\n                </a>\n              </li>\n\n              <li class=\"treeview\" [routerLink]=\"['/my-profile']\">\n                <a>\n                  <i class=\"fa fa-files-o\"></i>\n                  <span> My Profile</span>\n                  <span class=\"pull-right-container\">\n                    <!-- <span class=\"label label-primary pull-right\">4</span> content-destination-->\n                  </span>\n                </a>\n\n              </li>\n              <li class=\"treeview\" >\n                <a>\n                  <i class=\"fa fa-files-o\"></i>\n                  <span>Support</span>\n                  <span class=\"pull-right-container\">\n                    <!-- <span class=\"label label-primary pull-right\">4</span> content-destination-->\n                  </span>\n                </a>\n               \n              </li>\n              <!-- <li class=\"treeview\" data-toggle=\"modal\" data-backdrop=\"static\" data-target=\"#modallogout\" data-keyboard=\"false\">\n                  <a>\n                    <i class=\"fa fa-files-o\"></i>\n                    <span>Logout</span>\n                    <span class=\"pull-right-container\">\n                    </span>\n                  </a>\n                 \n                </li> -->\n          </ul>\n        </section>\n        <!-- /.sidebar -->\n      </aside>\n    \n    \n    \n      <div class=\"modal fade\" id=\"modallogout\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\n          <div class=\"modal-dialog\" role=\"document\">\n            <div class=\"modal-content\" >\n             \n              <div class=\"modal-body\" style=\"display: flex;justify-content: center;padding: 69px;\">\n                  <b style=\"font-size: 20px;font-weight: 500;\">Are you sure you want to logout ?</b>\n              </div>\n              <div class=\"modal-footer\" style=\"display: flex;justify-content: space-between;\">\n                <button type=\"button\" style=\"    border-radius: 3px;\n                box-shadow: none;\n                border: 1px solid #131111;\n                width: 100%;\n                max-width: 150px;height: 36px;background-color: red;color: white;\n    \" data-dismiss=\"modal\">No</button>\n                <button type=\"button\"  style=\"    border-radius: 3px;\n                box-shadow: none;\n                border: 1px solid #131111;\n                width: 100%;\n                max-width: 150px;height: 36px;background-color: green;color: white;\n    \" (click)=\"logout()\">Yes</button>\n              </div>\n            </div>\n          </div>\n        </div>\n    \n   \n     \n      ";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/sub-admin-management/sub-admin-management.component.html":
  /*!****************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/sub-admin-management/sub-admin-management.component.html ***!
    \****************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppSubAdminManagementSubAdminManagementComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-sidebar></app-sidebar>\n<div class=\"content-wrapper\">\n  <!-- Content Header (Page header) -->\n  <section class=\"content-header\">\n    <h1>\n      Sub-Admin Management\n\n    </h1>\n\n  </section>\n  <section style=\"padding-top: 22px;\">\n\n    <!-- <input type=\"search\" class=\"srch\" maxlength=\"50\" [(ngModel)]=\"filterName\" (keyup)=\"searchValue($event.target.value)\"\n      placeholder=\"Search by name\">\n    <button class=\"btn btn-primary bt\" (click)=\"reset()\">Reset</button>\n    <div class=\"btnDive\">\n      <button class=\"addbtn\" [routerLink]=\"['/add-sub-admin-management']\">+Add</button>\n      <button class=\"expbtn\" (click)=\"download()\" *ngIf=\"subAdminLists?.length!=0\">Export into CSV</button>\n    </div> -->\n\n\n    <div class=\"mainbtn\" style=\"display: flex;\">\n        <input type=\"search\" class=\"srch\" maxlength=\"50\" [(ngModel)]=\"filterName\" (keyup)=\"searchValue($event.target.value)\"\n        placeholder=\"Search by name\">\n        \n      \n            <button class=\"resetbtn\"  (click)=\"reset()\">Reset</button>\n          <button class=\"addbtn\"  [routerLink]=\"['/add-sub-admin-management']\">+Add</button>\n          <button class=\"exbtn\"  (click)=\"download()\" *ngIf=\"subAdminLists?.length!=0\">Export into CSV</button>\n        </div>\n  </section>\n  <section class=\"content\">\n    <div class=\"row\">\n      <div class=\"col-xs-12\">\n        <div class=\"box\">\n          <!-- /.box-header -->\n          <div class=\"box-body\">\n            <table id=\"customers\"  class=\"table table-bordered table-hover\">\n              <thead>\n                <tr class=\"trt\">\n                  <th class=\"tdt\">S.No.\n                      <i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                  <th class=\"tdt\">Name\n                      <i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                  <th class=\"tdt\">Email address\n                      <i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                  <th class=\"tdt\">Mobile number\n                      <i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                  <th class=\"tdt\">Registration on\n                      <i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                  <!-- (click)=\"statusblock()\" -->\n                  <th class=\"tdt\">Status <i class=\"fa fa-sort\" aria-hidden=\"true\" ></i></th>\n                  <th class=\"tdt\">Actions</th>\n\n                </tr>\n              </thead>\n              <tbody *ngIf=\"subAdminLists\">\n                <!-- | paginate : {itemsPerPage: 7, currentPage:page, totalItems:total}; let i=index -->\n                <tr\n                  *ngFor=\"let items of subAdminLists | paginate : {itemsPerPage:10, currentPage:page, totalItems:total}; let i=index\">\n                  <td class=\"table-width\">{{limit * (page-1)+i+1}}</td>\n                  <td class=\"table-width\">{{items.name || '--'}}</td>\n                  <td class=\"table-width\" title=\"{{items.email || '--'}}\">{{items.email || '--'}}</td>\n                  <td class=\"table-width\">{{items.mobileNumber || '--'}}</td>\n                  <td class=\"table-width\">{{(items.createdAt | date : 'd MMM , y') ||'N/A'}}</td>\n                  <!-- <td>{{items.name}}</td> -->\n                  <td class=\"table-width\" *ngIf=\"items.status=='ACTIVE'\">Active</td>\n                  <td class=\"table-width\" *ngIf=\"items.status!='ACTIVE'\">Blocked</td>\n                  <td class=\"table-width\"><div style=\"display:flex;justify-content: center;\"> <a class=\"btn btn-app edt\" style=\"border: none;\"  [routerLink]=\"['/edit-sub-admin',items?._id]\">\n                      <i class=\"fa fa-edit\"></i> \n                    </a>\n                    <a class=\"btn btn-app\" style=\"border: none;\" *ngIf=\"items?.status !='ACTIVE'\" data-toggle=\"modal\" data-backdrop=\"static\"\n                      data-target=\"#modalblock\" data-keyboard=\"false\" (click)=\"block(items?._id,items?.status)\"\n                    >\n                      <i class=\"fa fa-ban blks\"></i>\n                    </a>\n                    <a class=\"btn btn-app\" style=\"border: none;\"  *ngIf=\"items?.status =='ACTIVE'\" data-toggle=\"modal\" data-backdrop=\"static\"\n                      data-target=\"#modalblock\" data-keyboard=\"false\" (click)=\"block(items?._id,items?.status)\"\n                     >\n                      <i class=\"fa fa-ban blk\"></i>\n                    </a>\n                    <a class=\"btn btn-app dlt\"  style=\"border: none;\"  data-toggle=\"modal\" data-target=\"#modaldelete\"\n                      (click)=\"deleteFunction(items?._id)\">\n                      <i class=\"fa fa-trash\"></i> \n                    </a></div>\n\n                  </td>\n                </tr>\n\n\n              </tbody>\n            \n            </table>\n             <h3 *ngIf=\"subAdminLists.length==0\" style=\"text-align:center\">Data not Found!</h3>\n            <!-- <h3 *ngIf=\"subAdminLists?.length==0\" style=\"text-align: center;\">Data not found!</h3> -->\n          </div>\n          <pagination-controls (pageChange)=\"changePage($event) \" style=\"float:right;\"\n            *ngIf=\"subAdminLists?.length != 0\">\n          </pagination-controls>\n          <!-- /.box-body -->\n        </div>\n        <!-- /.box -->\n\n\n        <!-- /.box -->\n      </div>\n      <!-- /.col -->\n    </div>\n    <!-- /.row -->\n  </section>\n\n  <!-- Main content -->\n\n  <!-- /.content -->\n</div>\n<div class=\"modal fade\" id=\"modaldelete\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\"\n  aria-hidden=\"true\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\" >\n      <H3 style=\"text-align:center;padding-top: 42px;\"> Delete Sub-Admin ?</H3>\n      <hr>\n      <div class=\"modal-body\" style=\"display: flex;justify-content: center;padding: 26px\">\n        <b style=\"font-size: 20px;font-weight: 500;\">Are you sure you want to delete this sub-admin ?</b>\n      </div>\n      <div class=\"modal-footer\" style=\"display: flex;justify-content: space-between;\">\n        <button type=\"button\"\n          style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: red;color: white;\"\n          data-dismiss=\"modal\">No</button>\n        <button type=\"button\"\n          style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: green;color: white;\"\n          (click)=\"deleteFunctions()\" data-dismiss=\"modal\">Yes</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n<div class=\"modal fade\" id=\"modalblock\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\"\n  aria-hidden=\"true\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\" >\n\n      <div class=\"modal-body\" style=\"display: flex;justify-content: center;padding: 69px\">\n        <b *ngIf=\"status =='BLOCK'\" style=\"font-size: 20px;font-weight: 500;\">Are you sure you want to Unblock this sub-admin?</b>\n\n        \n         \n        <b *ngIf=\"status =='ACTIVE'\" style=\"font-size: 20px;font-weight: 500;\">Are you sure you want to block this sub-admin?</b>\n          \n      </div>\n      <div class=\"modal-footer\" style=\"display: flex;justify-content: space-between;\">\n        <button type=\"button\"\n          style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: red;color: white;\"\n          data-dismiss=\"modal\">No</button>\n        <button type=\"button\"\n          style=\"border-radius: 3px;box-shadow: none;border: 1px solid #131111;width: 100%;max-width: 150px;height: 36px;background-color: green;color: white;\"\n          (click)=\"blockFunction()\" data-dismiss=\"modal\">Yes</button>\n      </div>\n    </div>\n  </div>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/view-enquries/view-enquries.component.html":
  /*!**************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/view-enquries/view-enquries.component.html ***!
    \**************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppViewEnquriesViewEnquriesComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-sidebar></app-sidebar>\n<div class=\"content-wrapper\">\n    <!-- Content Header (Page header) -->\n    <section class=\"content-header\">\n        <h1>\n            Enquiries\n        </h1>\n\n    </section>\n    <hr>\n   <div class=\"outer-box\">\n        <div class=\"form-group row \" style=\"display: flex;\n        justify-content: center;\">\n                <div class=\"col-md-3\"> Customer Name</div>\n                <div class=\"col-md-3\"> {{store.name}}</div>\n            </div>\n            <div class=\"form-group row \" style=\"display: flex;\n            justify-content: center;\">\n                    <div class=\"col-md-3\"> Email ID</div>\n                    <div class=\"col-md-3\"> {{store.email}}</div>\n                </div>\n                <div class=\"form-group row \" style=\"display: flex;\n                justify-content: center;\">\n                        <div class=\"col-md-3\"> Country</div>\n                        <div class=\"col-md-3\"> {{store.countryName}}</div>\n                    </div>\n                    <div class=\"form-group row \" style=\"display: flex;\n                    justify-content: center;\">\n                            <div class=\"col-md-3\"> Message</div>\n                            <div class=\"col-md-3\"> {{store.message}}</div>\n                        </div>\n                        <div class=\"form-group row \" style=\"display: flex;\n                        justify-content: center;\">\n                                <div class=\"col-md-3\"> Submission Date</div>\n                                <div class=\"col-md-3\"> {{store.createdAt|date}}</div>\n                            </div>\n                </div>\n    <!-- <section class=\"content\">\n        <div class=\"container\" style=\"text-align: center\">\n            <div class=\"borders\" >\n                <div class=\"name\">\n                    <label>Customer Name</label>\n                    <p>{{store.name}}</p>\n                </div>\n                <div class=\"name\">\n                    <label>Email ID</label>\n                    <p>{{store.email}}</p>\n                </div>\n                <div class=\"name\">\n                    <label>Country</label>\n                    <p>{{store.countryName}}</p>\n                </div>\n                <div class=\"name\">\n                    <label>Message</label>\n                    <p>{{store.message}}</p>\n                </div>\n                <div class=\"name\">\n                    <label>Submission Date</label>\n                    <p>{{store.createdAt|date}}</p>\n                </div>\n\n\n\n            </div>\n        </div>\n        <!-- /.row -->\n    <!-- </section> --> \n\n    <!-- Main content -->\n\n    <!-- /.content -->\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/view-package-management/view-package-management.component.html":
  /*!**********************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/view-package-management/view-package-management.component.html ***!
    \**********************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppViewPackageManagementViewPackageManagementComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<app-sidebar></app-sidebar>\n<div class=\"content-wrapper\">\n    <!-- Content Header (Page header) -->\n    <section class=\"content-header\">\n        <h1>\n            Package-Management\n        </h1>\n\n    </section>\n    <img src=\"{{store.packagePicture}}\" alt=\"\">\n    <hr>\n   <div class=\"outer-box\">\n        <div class=\"form-group row \" style=\"display: flex;\n        justify-content: center;\">\n                <div class=\"col-md-3\"> Country</div>\n                <div class=\"col-md-3\"> {{store.country}}</div>\n            </div>\n            <div class=\"form-group row \" style=\"display: flex;\n            justify-content: center;\">\n                    <div class=\"col-md-3\"> Destination</div>\n                    <div class=\"col-md-3\"> {{store.destination}}</div>\n                </div>\n                <div class=\"form-group row \" style=\"display: flex;\n                justify-content: center;\">\n                        <div class=\"col-md-3\"> Package Name</div>\n                        <div class=\"col-md-3\"> {{store.packageName}}</div>\n                    </div>\n                    <div class=\"form-group row \" style=\"display: flex;\n                    justify-content: center;\">\n                            <div class=\"col-md-3\"> Flights Included</div>\n                            <div class=\"col-md-3\"> {{store.flightsIncluded}}</div>\n                        </div>\n                        <div class=\"form-group row \" style=\"display: flex;\n                        justify-content: center;\">\n                                <div class=\"col-md-3\"> Hotels Included</div>\n                                <div class=\"col-md-3\"> {{store.hotelsIncluded}}</div>\n                            </div>\n                            \n                            <div class=\"form-group row \" style=\"display: flex;\n                            justify-content: center;\">\n                                    <div class=\"col-md-3\"> Transfer Included</div>\n                                    <div class=\"col-md-3\"> {{store.transferIncluded}}</div>\n                                </div>\n                                <div class=\"form-group row \" style=\"display: flex;\n                                justify-content: center;\">\n                                        <div class=\"col-md-3\"> Sightseeing Included</div>\n                                        <div class=\"col-md-3\"> {{store.sightseeingIncluded}}</div>\n                                    </div>\n                                    <div class=\"form-group row \" style=\"display: flex;\n                                    justify-content: center;\">\n                                            <div class=\"col-md-3\"> Hotels Included</div>\n                                            <div class=\"col-md-3\"> {{store.hotelsIncluded}}</div>\n                                        </div>\n                </div>\n    <!-- <section class=\"content\">\n        <div class=\"container\" style=\"text-align: center\">\n            <div class=\"borders\" >\n                <div class=\"name\">\n                    <label>Customer Name</label>\n                    <p>{{store.name}}</p>\n                </div>\n                <div class=\"name\">\n                    <label>Email ID</label>\n                    <p>{{store.email}}</p>\n                </div>\n                <div class=\"name\">\n                    <label>Country</label>\n                    <p>{{store.countryName}}</p>\n                </div>\n                <div class=\"name\">\n                    <label>Message</label>\n                    <p>{{store.message}}</p>\n                </div>\n                <div class=\"name\">\n                    <label>Submission Date</label>\n                    <p>{{store.createdAt|date}}</p>\n                </div>\n\n\n\n            </div>\n        </div>\n        <!-- /.row -->\n    <!-- </section> --> \n\n    <!-- Main content -->\n\n    <!-- /.content -->\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/viewenquries/viewenquries.component.html":
  /*!************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/viewenquries/viewenquries.component.html ***!
    \************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppViewenquriesViewenquriesComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<p>viewenquries works!</p>\n";
    /***/
  },

  /***/
  "./node_modules/tslib/tslib.es6.js":
  /*!*****************************************!*\
    !*** ./node_modules/tslib/tslib.es6.js ***!
    \*****************************************/

  /*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */

  /***/
  function node_modulesTslibTslibEs6Js(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__extends", function () {
      return __extends;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__assign", function () {
      return _assign;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__rest", function () {
      return __rest;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__decorate", function () {
      return __decorate;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__param", function () {
      return __param;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__metadata", function () {
      return __metadata;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__awaiter", function () {
      return __awaiter;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__generator", function () {
      return __generator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__exportStar", function () {
      return __exportStar;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__values", function () {
      return __values;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__read", function () {
      return __read;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__spread", function () {
      return __spread;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__spreadArrays", function () {
      return __spreadArrays;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__await", function () {
      return __await;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function () {
      return __asyncGenerator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function () {
      return __asyncDelegator;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__asyncValues", function () {
      return __asyncValues;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function () {
      return __makeTemplateObject;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__importStar", function () {
      return __importStar;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "__importDefault", function () {
      return __importDefault;
    });
    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0
    
    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.
    
    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    /* global Reflect, Promise */


    var _extendStatics = function extendStatics(d, b) {
      _extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return _extendStatics(d, b);
    };

    function __extends(d, b) {
      _extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var _assign = function __assign() {
      _assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
        }

        return t;
      };

      return _assign.apply(this, arguments);
    };

    function __rest(s, e) {
      var t = {};

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
      }

      if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
      }
      return t;
    }

    function __decorate(decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      }
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
      return function (target, key) {
        decorator(target, key, paramIndex);
      };
    }

    function __metadata(metadataKey, metadataValue) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }

        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }

        function step(result) {
          result.done ? resolve(result.value) : new P(function (resolve) {
            resolve(result.value);
          }).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    }

    function __generator(thisArg, body) {
      var _ = {
        label: 0,
        sent: function sent() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
          f,
          y,
          t,
          g;
      return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
      }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;

      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }

      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");

        while (_) {
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];

            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;

              case 4:
                _.label++;
                return {
                  value: op[1],
                  done: false
                };

              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;

              case 7:
                op = _.ops.pop();

                _.trys.pop();

                continue;

              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }

                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }

                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }

                if (t && _.label < t[2]) {
                  _.label = t[2];

                  _.ops.push(op);

                  break;
                }

                if (t[2]) _.ops.pop();

                _.trys.pop();

                continue;
            }

            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        }

        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    }

    function __exportStar(m, exports) {
      for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
      }
    }

    function __values(o) {
      var m = typeof Symbol === "function" && o[Symbol.iterator],
          i = 0;
      if (m) return m.call(o);
      return {
        next: function next() {
          if (o && i >= o.length) o = void 0;
          return {
            value: o && o[i++],
            done: !o
          };
        }
      };
    }

    function __read(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o),
          r,
          ar = [],
          e;

      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
          ar.push(r.value);
        }
      } catch (error) {
        e = {
          error: error
        };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }

      return ar;
    }

    function __spread() {
      for (var ar = [], i = 0; i < arguments.length; i++) {
        ar = ar.concat(__read(arguments[i]));
      }

      return ar;
    }

    function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
        s += arguments[i].length;
      }

      for (var r = Array(s), k = 0, i = 0; i < il; i++) {
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
          r[k] = a[j];
        }
      }

      return r;
    }

    ;

    function __await(v) {
      return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var g = generator.apply(thisArg, _arguments || []),
          i,
          q = [];
      return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
        return this;
      }, i;

      function verb(n) {
        if (g[n]) i[n] = function (v) {
          return new Promise(function (a, b) {
            q.push([n, v, a, b]) > 1 || resume(n, v);
          });
        };
      }

      function resume(n, v) {
        try {
          step(g[n](v));
        } catch (e) {
          settle(q[0][3], e);
        }
      }

      function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
      }

      function fulfill(value) {
        resume("next", value);
      }

      function reject(value) {
        resume("throw", value);
      }

      function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
      }
    }

    function __asyncDelegator(o) {
      var i, p;
      return i = {}, verb("next"), verb("throw", function (e) {
        throw e;
      }), verb("return"), i[Symbol.iterator] = function () {
        return this;
      }, i;

      function verb(n, f) {
        i[n] = o[n] ? function (v) {
          return (p = !p) ? {
            value: __await(o[n](v)),
            done: n === "return"
          } : f ? f(v) : v;
        } : f;
      }
    }

    function __asyncValues(o) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var m = o[Symbol.asyncIterator],
          i;
      return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
        return this;
      }, i);

      function verb(n) {
        i[n] = o[n] && function (v) {
          return new Promise(function (resolve, reject) {
            v = o[n](v), settle(resolve, reject, v.done, v.value);
          });
        };
      }

      function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function (v) {
          resolve({
            value: v,
            done: d
          });
        }, reject);
      }
    }

    function __makeTemplateObject(cooked, raw) {
      if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", {
          value: raw
        });
      } else {
        cooked.raw = raw;
      }

      return cooked;
    }

    ;

    function __importStar(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k in mod) {
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
      }
      result.default = mod;
      return result;
    }

    function __importDefault(mod) {
      return mod && mod.__esModule ? mod : {
        default: mod
      };
    }
    /***/

  },

  /***/
  "./src/app/add-customer/add-customer.component.css":
  /*!*********************************************************!*\
    !*** ./src/app/add-customer/add-customer.component.css ***!
    \*********************************************************/

  /*! exports provided: default */

  /***/
  function srcAppAddCustomerAddCustomerComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".add{\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: center;\n            justify-content: center;\n}\n\n.btn{\n    width: 100%;\n    max-width: 183px;\n    border-radius: 18px;\n    height: 42px;\n    font-size: 24px;\n    padding: 0px;\n    background-color: #e8ae0cde!important;\n    border: navajowhite;\n}\n\n.wr{\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: center;\n            justify-content: center;\n    box-shadow: 5px 10px #888888;\n    border: 1px solid;\n}\n\n.bd{\n    width: 48%;\n}\n\n.imgs{\n    border-radius: 100px;\n    width: 150px;\n    height: 150px;\n}\n\n.input#file-input {\n    display: none;\n  }\n  \n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRkLWN1c3RvbWVyL2FkZC1jdXN0b21lci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksb0JBQWE7SUFBYixhQUFhO0lBQ2Isd0JBQXVCO1lBQXZCLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxnQkFBZ0I7SUFDaEIsbUJBQW1CO0lBQ25CLFlBQVk7SUFDWixlQUFlO0lBQ2YsWUFBWTtJQUNaLHFDQUFxQztJQUNyQyxtQkFBbUI7QUFDdkI7O0FBQ0E7SUFDSSxvQkFBYTtJQUFiLGFBQWE7SUFDYix3QkFBdUI7WUFBdkIsdUJBQXVCO0lBQ3ZCLDRCQUE0QjtJQUM1QixpQkFBaUI7QUFDckI7O0FBQ0E7SUFDSSxVQUFVO0FBQ2Q7O0FBQ0E7SUFDSSxvQkFBb0I7SUFDcEIsWUFBWTtJQUNaLGFBQWE7QUFDakI7O0FBQ0E7SUFDSSxhQUFhO0VBQ2YiLCJmaWxlIjoic3JjL2FwcC9hZGQtY3VzdG9tZXIvYWRkLWN1c3RvbWVyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYWRke1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi5idG57XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWF4LXdpZHRoOiAxODNweDtcbiAgICBib3JkZXItcmFkaXVzOiAxOHB4O1xuICAgIGhlaWdodDogNDJweDtcbiAgICBmb250LXNpemU6IDI0cHg7XG4gICAgcGFkZGluZzogMHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNlOGFlMGNkZSFpbXBvcnRhbnQ7XG4gICAgYm9yZGVyOiBuYXZham93aGl0ZTtcbn1cbi53cntcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGJveC1zaGFkb3c6IDVweCAxMHB4ICM4ODg4ODg7XG4gICAgYm9yZGVyOiAxcHggc29saWQ7XG59XG4uYmR7XG4gICAgd2lkdGg6IDQ4JTtcbn1cbi5pbWdze1xuICAgIGJvcmRlci1yYWRpdXM6IDEwMHB4O1xuICAgIHdpZHRoOiAxNTBweDtcbiAgICBoZWlnaHQ6IDE1MHB4O1xufVxuLmlucHV0I2ZpbGUtaW5wdXQge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbiAgIl19 */";
    /***/
  },

  /***/
  "./src/app/add-customer/add-customer.component.ts":
  /*!********************************************************!*\
    !*** ./src/app/add-customer/add-customer.component.ts ***!
    \********************************************************/

  /*! exports provided: AddCustomerComponent */

  /***/
  function srcAppAddCustomerAddCustomerComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AddCustomerComponent", function () {
      return AddCustomerComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _orbistur_service_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../orbistur-service.service */
    "./src/app/orbistur-service.service.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");

    var AddCustomerComponent =
    /*#__PURE__*/
    function () {
      function AddCustomerComponent(service, router, formbuilder, spinner) {
        _classCallCheck(this, AddCustomerComponent);

        this.service = service;
        this.router = router;
        this.formbuilder = formbuilder;
        this.spinner = spinner;
      }

      _createClass(AddCustomerComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.addCustomerForm = this.formbuilder.group({
            'name': ["", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(60), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(2), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern("[a-zA-Z ]*")])],
            'email': ["", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(60), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)])],
            'number': ["", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(16), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern(/^[1-9][0-9]{9}$/)])],
            'password': ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(8), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(16), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i)]],
            'confirmPassword': ["", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            'address': ["", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(256)])]
          });
          this.phoneCheckCountry();
        } // *************************mobile number method**************//

      }, {
        key: "phoneCheckCountry",
        value: function phoneCheckCountry() {
          $("#phoneNumber").intlTelInput({
            autoPlaceholder: false,
            autoFormat: false,
            autoHideDialCode: false,
            initialCountry: 'in',
            nationalMode: false,
            onlyCountries: [],
            // preferredCountries: ["us"],
            formatOnInit: true,
            separateDialCode: true,
            formatOnDisplay: false
          });
        }
      }, {
        key: "toCheckSpaceChar",
        value: function toCheckSpaceChar() {
          this.isValidNumber = $('#phoneNumber').intlTelInput('isValidNumber');
          var countryData = $('#phoneNumber').intlTelInput('getSelectedCountryData');
          this.myCode = "+" + countryData.dialCode;
        } // *************************Image upload event****************//

      }, {
        key: "handleInputChange",
        value: function handleInputChange(e) {
          var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
          var pattern = /image-*/;
          var reader = new FileReader();

          if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
          }

          reader.onload = this._handleReaderLoaded.bind(this);
          reader.readAsDataURL(file);
        }
      }, {
        key: "_handleReaderLoaded",
        value: function _handleReaderLoaded(e) {
          var reader = e.target;
          this.profile = reader.result;
          console.log("profile", this.profile);
        } // ********************Add Customer Api******************//

      }, {
        key: "addCustomer",
        value: function addCustomer() {
          var _this = this;

          console.log('addCustomerForm==>>>', this.addCustomerForm.valid);
          this.spinner.show();
          var coutomerObject = {
            'name': this.addCustomerForm.value.name,
            'email': this.addCustomerForm.value.email,
            'mobileNumber': this.addCustomerForm.value.number,
            'password': this.addCustomerForm.value.password,
            'confirmPassword': this.addCustomerForm.value.confirmPassword,
            'address': this.addCustomerForm.value.address,
            'profilePic': this.profile
          };
          this.service.postApi('admin/addCustomer', coutomerObject, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this.spinner.hide();

              _this.service.showSuccess("Customer has been added successfully.");

              _this.router.navigate(['customer-management']);
            } else {
              _this.spinner.hide();

              _this.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this.spinner.hide();

            _this.service.toastErr(error.response_message);
          });
        }
      }]);

      return AddCustomerComponent;
    }();

    AddCustomerComponent.ctorParameters = function () {
      return [{
        type: _orbistur_service_service__WEBPACK_IMPORTED_MODULE_3__["OrbisturServiceService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]
      }, {
        type: ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"]
      }];
    };

    AddCustomerComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-add-customer',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./add-customer.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/add-customer/add-customer.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./add-customer.component.css */
      "./src/app/add-customer/add-customer.component.css")).default]
    })], AddCustomerComponent);
    /***/
  },

  /***/
  "./src/app/add-package-management/add-package-management.component.css":
  /*!*****************************************************************************!*\
    !*** ./src/app/add-package-management/add-package-management.component.css ***!
    \*****************************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppAddPackageManagementAddPackageManagementComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".add{\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: center;\n            justify-content: center;\n    padding: 8%;\n}\n\n.btn{\n    width: 100%;\n    max-width: 183px;\n    border-radius: 18px;\n    height: 42px;\n    font-size: 24px;\n    padding: 0px;\n    background-color: #e8ae0cde!important;\n    border: navajowhite;\n}\n\n.wr{\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: center;\n            justify-content: center;\n    box-shadow: 5px 10px #888888;\n    border: 1px solid;\n}\n\n.bd{\n    width: 48%;\n}\n\n.imgs{\n    border-radius: 100px;\n    width: 150px;\n    height: 150px;\n}\n\n.input#file-input {\n    display: none;\n  }\n\n.event1{\n    margin-left: 71px;\n  }\n\n.event2{\n    margin-left: 80px;\n}\n\n.event3{\n    margin-left: 80px;\n}\n\n.event4{\n    margin-left: 54px;\n}\n\n.event5{\n    margin-left: 81px;\n}\n\n.event6{\n    margin-left: 80px;\n}\n\nul.skip-search {\n    padding: 0px;\n    margin: 0px;\n    list-style: none;\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n            justify-content: center;\n}\n\n.margin{\n    margin: 0;\n    margin-bottom: 3%;\n}\n\n.outer_box{\n    width: 100%;\n    height: 150px;\n    border: 1px solid rgb(193, 186, 186)\n}\n\n.title{\n    width: 100%;\n    text-align: center;\n}\n\n.table {\n    /* width: 100%;\n    margin-bottom: 1rem;\n    color: #212529;\n    max-width: 90%;\n    border: 1px solid; */\n    text-align: center;\n    /* margin-left: 34px; */\n}\n\ntd{\n    border: 1px solid lightgray\n}\n\n.table-responsive{\n    margin-left: 34px;\n    width: 100%;\n    max-width: 90%;\n}\n\ninput[type=file] {\n    display: none;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRkLXBhY2thZ2UtbWFuYWdlbWVudC9hZGQtcGFja2FnZS1tYW5hZ2VtZW50LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxvQkFBYTtJQUFiLGFBQWE7SUFDYix3QkFBdUI7WUFBdkIsdUJBQXVCO0lBQ3ZCLFdBQVc7QUFDZjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxnQkFBZ0I7SUFDaEIsbUJBQW1CO0lBQ25CLFlBQVk7SUFDWixlQUFlO0lBQ2YsWUFBWTtJQUNaLHFDQUFxQztJQUNyQyxtQkFBbUI7QUFDdkI7O0FBQ0E7SUFDSSxvQkFBYTtJQUFiLGFBQWE7SUFDYix3QkFBdUI7WUFBdkIsdUJBQXVCO0lBQ3ZCLDRCQUE0QjtJQUM1QixpQkFBaUI7QUFDckI7O0FBQ0E7SUFDSSxVQUFVO0FBQ2Q7O0FBQ0E7SUFDSSxvQkFBb0I7SUFDcEIsWUFBWTtJQUNaLGFBQWE7QUFDakI7O0FBQ0E7SUFDSSxhQUFhO0VBQ2Y7O0FBQ0E7SUFDRSxpQkFBaUI7RUFDbkI7O0FBQ0E7SUFDRSxpQkFBaUI7QUFDckI7O0FBQ0E7SUFDSSxpQkFBaUI7QUFDckI7O0FBQ0E7SUFDSSxpQkFBaUI7QUFDckI7O0FBQ0E7SUFDSSxpQkFBaUI7QUFDckI7O0FBQ0E7SUFDSSxpQkFBaUI7QUFDckI7O0FBR0E7SUFDSSxZQUFZO0lBQ1osV0FBVztJQUNYLGdCQUFnQjtJQUNoQixvQkFBYTtJQUFiLGFBQWE7SUFDYix5QkFBbUI7WUFBbkIsbUJBQW1CO0lBQ25CLHdCQUF1QjtZQUF2Qix1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxTQUFTO0lBQ1QsaUJBQWlCO0FBQ3JCOztBQUNBO0lBQ0ksV0FBVztJQUNYLGFBQWE7SUFDYjtBQUNKOztBQUVBO0lBQ0ksV0FBVztJQUNYLGtCQUFrQjtBQUN0Qjs7QUFDQTtJQUNJOzs7O3dCQUlvQjtJQUNwQixrQkFBa0I7SUFDbEIsdUJBQXVCO0FBQzNCOztBQUNBO0lBQ0k7QUFDSjs7QUFDQTtJQUNJLGlCQUFpQjtJQUNqQixXQUFXO0lBQ1gsY0FBYztBQUNsQjs7QUFDQTtJQUNJLGFBQWE7QUFDakIiLCJmaWxlIjoic3JjL2FwcC9hZGQtcGFja2FnZS1tYW5hZ2VtZW50L2FkZC1wYWNrYWdlLW1hbmFnZW1lbnQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hZGR7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBwYWRkaW5nOiA4JTtcbn1cblxuLmJ0bntcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXgtd2lkdGg6IDE4M3B4O1xuICAgIGJvcmRlci1yYWRpdXM6IDE4cHg7XG4gICAgaGVpZ2h0OiA0MnB4O1xuICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICBwYWRkaW5nOiAwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2U4YWUwY2RlIWltcG9ydGFudDtcbiAgICBib3JkZXI6IG5hdmFqb3doaXRlO1xufVxuLndye1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYm94LXNoYWRvdzogNXB4IDEwcHggIzg4ODg4ODtcbiAgICBib3JkZXI6IDFweCBzb2xpZDtcbn1cbi5iZHtcbiAgICB3aWR0aDogNDglO1xufVxuLmltZ3N7XG4gICAgYm9yZGVyLXJhZGl1czogMTAwcHg7XG4gICAgd2lkdGg6IDE1MHB4O1xuICAgIGhlaWdodDogMTUwcHg7XG59XG4uaW5wdXQjZmlsZS1pbnB1dCB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuICAuZXZlbnQxe1xuICAgIG1hcmdpbi1sZWZ0OiA3MXB4O1xuICB9XG4gIC5ldmVudDJ7XG4gICAgbWFyZ2luLWxlZnQ6IDgwcHg7XG59XG4uZXZlbnQze1xuICAgIG1hcmdpbi1sZWZ0OiA4MHB4O1xufVxuLmV2ZW50NHtcbiAgICBtYXJnaW4tbGVmdDogNTRweDtcbn1cbi5ldmVudDV7XG4gICAgbWFyZ2luLWxlZnQ6IDgxcHg7XG59XG4uZXZlbnQ2e1xuICAgIG1hcmdpbi1sZWZ0OiA4MHB4O1xufVxuXG5cbnVsLnNraXAtc2VhcmNoIHtcbiAgICBwYWRkaW5nOiAwcHg7XG4gICAgbWFyZ2luOiAwcHg7XG4gICAgbGlzdC1zdHlsZTogbm9uZTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi5tYXJnaW57XG4gICAgbWFyZ2luOiAwO1xuICAgIG1hcmdpbi1ib3R0b206IDMlO1xufVxuLm91dGVyX2JveHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDE1MHB4O1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYigxOTMsIDE4NiwgMTg2KVxufVxuXG4udGl0bGV7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLnRhYmxlIHtcbiAgICAvKiB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICAgIGNvbG9yOiAjMjEyNTI5O1xuICAgIG1heC13aWR0aDogOTAlO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkOyAqL1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAvKiBtYXJnaW4tbGVmdDogMzRweDsgKi9cbn1cbnRke1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheVxufVxuLnRhYmxlLXJlc3BvbnNpdmV7XG4gICAgbWFyZ2luLWxlZnQ6IDM0cHg7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWF4LXdpZHRoOiA5MCU7XG59XG5pbnB1dFt0eXBlPWZpbGVdIHtcbiAgICBkaXNwbGF5OiBub25lO1xufVxuIl19 */";
    /***/
  },

  /***/
  "./src/app/add-package-management/add-package-management.component.ts":
  /*!****************************************************************************!*\
    !*** ./src/app/add-package-management/add-package-management.component.ts ***!
    \****************************************************************************/

  /*! exports provided: AddPackageManagementComponent */

  /***/
  function srcAppAddPackageManagementAddPackageManagementComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AddPackageManagementComponent", function () {
      return AddPackageManagementComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _orbistur_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../orbistur-service.service */
    "./src/app/orbistur-service.service.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");

    var AddPackageManagementComponent =
    /*#__PURE__*/
    function () {
      function AddPackageManagementComponent(service, router, formbuilder, spinner) {
        _classCallCheck(this, AddPackageManagementComponent);

        this.service = service;
        this.router = router;
        this.formbuilder = formbuilder;
        this.spinner = spinner;
        this.countryList = [];
        this.editorValue = '';
        this.limit = 10;
        this.page = 1;
        this.p = 0;
        this.transfer_id = [];
        this.transferLists = [];
        this.transferTypeLists = [];
        this.cartTypeLists = [];
      }

      _createClass(AddPackageManagementComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.formvalidation();
          this.getCountry();
          this.destinationList();
          this.packageList();
          this.getTransferLiat();
          this.getTransferTypeLiat();
          this.cartypeList();
        }
      }, {
        key: "formvalidation",
        value: function formvalidation() {
          this.addpackageForm = this.formbuilder.group({
            'country': [''],
            'destination': [''],
            'packagetype': [''],
            'packagename': [''],
            'packagedays': [''],
            'packagenight': [''],
            'packagedescription': [''],
            'Itinery': [''],
            'Packageinclusions': [''],
            'Exclusions': [''],
            'Terms': [''],
            'Packagecost': [''],
            'Cancellationcharges': [''],
            'flightsincluded': [''],
            'Hotelsincluded': [''],
            'Transfersincluded': [''],
            'Transferscategory': [''],
            'Transferstype': [''],
            'Cartype': [''],
            'Sightseeingincluded': [''],
            'Ownername': [''],
            'Ownercontact': [''],
            'Pricepernight': [''],
            'Status': [''],
            'active': [''],
            'Inactive': ['']
          });
        } // *************************Image upload event****************//

      }, {
        key: "handleInputChange",
        value: function handleInputChange(e) {
          var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
          var pattern = /image-*/;
          var reader = new FileReader();

          if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
          }

          reader.onload = this._handleReaderLoaded.bind(this);
          reader.readAsDataURL(file);
        }
      }, {
        key: "_handleReaderLoaded",
        value: function _handleReaderLoaded(e) {
          var reader = e.target;
          this.profile = reader.result;
          console.log("profile", this.profile);
        } // **************************Add Sub Admin Api****************************//

      }, {
        key: "addpackage",
        value: function addpackage() {
          var _this2 = this;

          console.log(" this is the post api request -=-=-=-=-=-=-=image");
          this.spinner.show();
          var object = {
            "packagePicture": this.profile,
            "countryId": this.addpackageForm.value.country,
            "destinationId": this.addpackageForm.value.destination,
            "packageTypeId": this.addpackageForm.value.packagetype,
            "transferTypeId": [this.addpackageForm.value.Transferstype],
            "transferCategoryId": [this.addpackageForm.value.Transferscategory],
            "carTypeId": [this.addpackageForm.value.Cartype],
            "packageName": this.addpackageForm.value.packagename,
            "packageDays": this.addpackageForm.value.packagedays,
            "packageNights": this.addpackageForm.value.packagenight,
            "packageDescription": this.editorValue,
            "flightsIncluded": this.addpackageForm.value.flightsincluded,
            "hotelsIncluded": this.addpackageForm.value.Hotelsincluded,
            "transferIncluded": this.addpackageForm.value.Transfersincluded,
            "sightseeingIncluded": this.addpackageForm.value.Sightseeingincluded,
            "ownerName": this.addpackageForm.value.Ownername,
            "ownerContact": this.addpackageForm.value.Ownercontact,
            "pricePerNight": this.addpackageForm.value.Pricepernight,
            "itinery": [{
              'arrive': "9",
              'meal': "9",
              'description': 'jhb'
            }, {
              'arrive': "0",
              'meal': "9",
              'description': 'kjj'
            }],
            "exclusions": [this.addpackageForm.value.Exclusions],
            "packageInclusion": [this.addpackageForm.value.Packageinclusions],
            "termsAndConditions": this.addpackageForm.value.Terms,
            "packageCost": [{
              'hotelCategory': "9",
              'hotelName': 'ads',
              'pricePerAdult': 1950
            }, {
              'hotelCategory': "9",
              'hotelName': 'ads',
              'pricePerAdult': 1950
            }],
            "cancellationCharge": [this.addpackageForm.value.Cancellationcharges]
          }; // "countryId": this.addpackageForm.value.country,
          // "destinationId": this.addpackageForm.value.destination,
          // "packageTypeId": this.addpackageForm.value.packagetype,
          // "transferTypeId": [this.addpackageForm.value.Transferstype],
          // "transferCategoryId": [this.addpackageForm.value.Transferscategory],
          // "carTypeId": [this.addpackageForm.value.Cartype],
          // "packageName": this.addpackageForm.value.packagename,
          // "packageDays": this.addpackageForm.value.packagedays,
          // "packageNights": this.addpackageForm.value.packagenight,
          // "packageDescription": this.editorValue,
          // "flightsIncluded": this.addpackageForm.value.flightsincluded,
          // "hotelsIncluded": this.addpackageForm.value.Hotelsincluded,
          // "transferIncluded": this.addpackageForm.value.Transfersincluded,
          // "sightseeingIncluded": this.addpackageForm.value.Sightseeingincluded,
          // "ownerName": this.addpackageForm.value.Ownername,
          // "ownerContact": this.addpackageForm.value.Ownercontact,
          // "pricePerNight": this.addpackageForm.value.Pricepernight,
          // "itinery": [{ "arrive": "Arrive Australia (evening free for leisure )", "meal": "Dinner, Breakfast ", "description": "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book" }, { "arrive": "Australia (evening free for leisure", "meal": "Dinner", "description": "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book" }],
          // "exclusions": ["05 Nights Accommodation at Hotel", "Daily buffet breakfast at hotel", "05 Dinners at local Indian restaurant without transfer", "Singapore city tour with transfers", "Sentosa Island Tour with transfers "],
          // "packageInclusion": ["Any airfare", "Visa"],
          // "termsAndConditions": ["The above package cost is quoted in INR, Per Adult on Twin / Double Sharing basis", "Above rates are subject to change due to any additional taxes, road toll implemented by the Government without prior notice.", "All services included in the package are compulsory and non refundable & is valid for minimum 2 Adults travelling together", "Standard check in-15.00,Checkout -12.00.", "Peak Season charges are applicable if any."],
          // "packageCost": [{ "hotelCategory": "5", "hotelName": "Panache", "pricePerAdult": 3000 }, { "hotelCategory": "4", "hotelName": "Hotel Taj", "pricePerAdult": 3000 }],
          // "cancellationCharge": ["35 Days or more prior to Departure 15% of the Tour Cost", "34 Days to 15 Days prior to Departure 25% of the Tour Cost", "14 Days to 10 Days prior to Departure 50% of the Tour Cost"],
          // "itinery": [{'arrive':9,'meal':9,'description':'jhb'},{'arrive':0,'meal':9,'description':'kjj'}],
          // "exclusions": [this.addpackageForm.value.Exclusions],
          // "packageInclusion": [this.addpackageForm.value.Packageinclusions],
          // "termsAndConditions": this.addpackageForm.value.Terms,
          // "packageCost": [{'hotelCategory':9,'hotelName':'ads','pricePerAdult':''},{'hotelCategory':9,'hotelName':'ads','pricePerAdult':''}],
          // "cancellationCharge": [this.addpackageForm.value.Cancellationcharges],
          // "packagePicture": this.profile

          console.log('object==>>', object); // console.log('valid', this.addpackageForm.valid)

          this.service.postApi('admin/addPackage', object, 1).subscribe(function (res) {
            console.log(res);

            if (res.body.response_code == 200) {
              console.log(" this is the post api request -=-=-=-=-=-=-=", res);

              _this2.spinner.hide();

              _this2.service.showSuccess("Packages has been added successfully.");

              _this2.router.navigate(['package-management']);
            } else {
              _this2.spinner.hide();

              _this2.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this2.spinner.hide();

            _this2.service.toastErr("Internal server error");
          });
        } // *******************Country List ********************//

      }, {
        key: "getCountry",
        value: function getCountry() {
          var _this3 = this;

          var object = {
            "search": null
          };
          this.service.postApi('admin/countryList', object, 1).subscribe(function (res) {
            _this3.countryList = res.body.result.docs;
            console.log('countryListJson', _this3.countryList);
          });
        } // ***********************Destination List***************//

      }, {
        key: "destinationList",
        value: function destinationList() {
          var _this4 = this;

          var object = {};
          this.service.postApi('admin/destinationList', object, 1).subscribe(function (res) {
            _this4.destinationLists = res.body.result.docs;
            console.log('destinationLists==>>', _this4.destinationLists);
          });
        } // *********************package TypeList api*********************//

      }, {
        key: "packageList",
        value: function packageList() {
          var _this5 = this;

          var object = {
            'search': this.filterName,
            'status': this.status,
            'page': this.page,
            'limit': this.limit
          };
          this.service.postApi('admin/packageTypeList', object, 1).subscribe(function (res) {
            console.log('packagessss', res);

            if (res.body.response_code == 200) {
              _this5.spinner.hide(); // this.getName()


              _this5.packageLists = res.body.result.docs ? res.body.result.docs : res.body.result;
            }
          }, function (error) {
            _this5.spinner.hide();
          });
        }
      }, {
        key: "getTransferLiat",
        value: function getTransferLiat() {
          var _this6 = this;

          var object = {
            'search': this.filterName,
            'status': this.status,
            'page': this.page,
            'limit': this.limit
          };
          this.service.postApi('admin/transferCategoryList', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this6.spinner.hide(); // this.getName()


              _this6.transferLists = res.body.result.docs ? res.body.result.docs : res.body.result;
              console.log('transferLists==>>', _this6.transferLists);
            } else {
              _this6.spinner.hide();
            }
          }, function (error) {
            _this6.spinner.hide();
          });
        } // **************************Get transfer type api****************//

      }, {
        key: "getTransferTypeLiat",
        value: function getTransferTypeLiat() {
          var _this7 = this;

          var object = {
            'search': this.filterName,
            'status': this.status,
            'page': this.page,
            'limit': this.limit
          };
          this.service.postApi('admin/transferTypeList', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              console.log("this is the request id -=0-=-=-=-=", res);

              _this7.spinner.hide(); // this.getName()


              _this7.transferTypeLists = res.body.result.docs ? res.body.result.docs : res.body.result;
              console.log('transferTypeLists==>>', _this7.transferTypeLists);
            } else {
              _this7.spinner.hide();
            }
          }, function (error) {
            _this7.spinner.hide();
          });
        } // **********************Car type list*******************//

      }, {
        key: "cartypeList",
        value: function cartypeList() {
          var _this8 = this;

          var object = {
            'search': this.filterName,
            'status': this.status,
            'page': this.page,
            'limit': this.limit
          };
          this.service.postApi('admin/carTypeList', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this8.spinner.hide(); // this.getName()


              _this8.cartTypeLists = res.body.result.docs ? res.body.result.docs : res.body.result;
              console.log('cartTypeLists==>>', _this8.cartTypeLists);
            } else {
              _this8.spinner.hide();
            }
          }, function (error) {
            _this8.spinner.hide();
          });
        }
      }]);

      return AddPackageManagementComponent;
    }();

    AddPackageManagementComponent.ctorParameters = function () {
      return [{
        type: _orbistur_service_service__WEBPACK_IMPORTED_MODULE_2__["OrbisturServiceService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"]
      }, {
        type: ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"]
      }];
    };

    AddPackageManagementComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-add-package-management',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./add-package-management.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/add-package-management/add-package-management.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./add-package-management.component.css */
      "./src/app/add-package-management/add-package-management.component.css")).default]
    })], AddPackageManagementComponent);
    /***/
  },

  /***/
  "./src/app/add-sub-admin-management/add-sub-admin-management.component.css":
  /*!*********************************************************************************!*\
    !*** ./src/app/add-sub-admin-management/add-sub-admin-management.component.css ***!
    \*********************************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppAddSubAdminManagementAddSubAdminManagementComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".add{\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: center;\n            justify-content: center;\n    padding: 8%;\n}\n\n.btn{\n    width: 100%;\n    max-width: 183px;\n    border-radius: 18px;\n    height: 42px;\n    font-size: 24px;\n    padding: 0px;\n    background-color: #e8ae0cde!important;\n    border: navajowhite;\n}\n\n.wr{\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: center;\n            justify-content: center;\n    box-shadow: 5px 10px #888888;\n    border: 1px solid;\n}\n\n.bd{\n    width: 48%;\n}\n\n.imgs{\n    border-radius: 100px;\n    width: 150px;\n    height: 150px;\n}\n\n.input#file-input {\n    display: none;\n  }\n\n.event1{\n    margin-left: 71px;\n  }\n\n.event2{\n    margin-left: 80px;\n}\n\n.event3{\n    margin-left: 80px;\n}\n\n.event4{\n    margin-left: 54px;\n}\n\n.event5{\n    margin-left: 81px;\n}\n\n.event6{\n    margin-left: 80px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRkLXN1Yi1hZG1pbi1tYW5hZ2VtZW50L2FkZC1zdWItYWRtaW4tbWFuYWdlbWVudC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksb0JBQWE7SUFBYixhQUFhO0lBQ2Isd0JBQXVCO1lBQXZCLHVCQUF1QjtJQUN2QixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixZQUFZO0lBQ1osZUFBZTtJQUNmLFlBQVk7SUFDWixxQ0FBcUM7SUFDckMsbUJBQW1CO0FBQ3ZCOztBQUNBO0lBQ0ksb0JBQWE7SUFBYixhQUFhO0lBQ2Isd0JBQXVCO1lBQXZCLHVCQUF1QjtJQUN2Qiw0QkFBNEI7SUFDNUIsaUJBQWlCO0FBQ3JCOztBQUNBO0lBQ0ksVUFBVTtBQUNkOztBQUNBO0lBQ0ksb0JBQW9CO0lBQ3BCLFlBQVk7SUFDWixhQUFhO0FBQ2pCOztBQUNBO0lBQ0ksYUFBYTtFQUNmOztBQUNBO0lBQ0UsaUJBQWlCO0VBQ25COztBQUNBO0lBQ0UsaUJBQWlCO0FBQ3JCOztBQUNBO0lBQ0ksaUJBQWlCO0FBQ3JCOztBQUNBO0lBQ0ksaUJBQWlCO0FBQ3JCOztBQUNBO0lBQ0ksaUJBQWlCO0FBQ3JCOztBQUNBO0lBQ0ksaUJBQWlCO0FBQ3JCIiwiZmlsZSI6InNyYy9hcHAvYWRkLXN1Yi1hZG1pbi1tYW5hZ2VtZW50L2FkZC1zdWItYWRtaW4tbWFuYWdlbWVudC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmFkZHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIHBhZGRpbmc6IDglO1xufVxuXG4uYnRue1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1heC13aWR0aDogMTgzcHg7XG4gICAgYm9yZGVyLXJhZGl1czogMThweDtcbiAgICBoZWlnaHQ6IDQycHg7XG4gICAgZm9udC1zaXplOiAyNHB4O1xuICAgIHBhZGRpbmc6IDBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZThhZTBjZGUhaW1wb3J0YW50O1xuICAgIGJvcmRlcjogbmF2YWpvd2hpdGU7XG59XG4ud3J7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBib3gtc2hhZG93OiA1cHggMTBweCAjODg4ODg4O1xuICAgIGJvcmRlcjogMXB4IHNvbGlkO1xufVxuLmJke1xuICAgIHdpZHRoOiA0OCU7XG59XG4uaW1nc3tcbiAgICBib3JkZXItcmFkaXVzOiAxMDBweDtcbiAgICB3aWR0aDogMTUwcHg7XG4gICAgaGVpZ2h0OiAxNTBweDtcbn1cbi5pbnB1dCNmaWxlLWlucHV0IHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG4gIC5ldmVudDF7XG4gICAgbWFyZ2luLWxlZnQ6IDcxcHg7XG4gIH1cbiAgLmV2ZW50MntcbiAgICBtYXJnaW4tbGVmdDogODBweDtcbn1cbi5ldmVudDN7XG4gICAgbWFyZ2luLWxlZnQ6IDgwcHg7XG59XG4uZXZlbnQ0e1xuICAgIG1hcmdpbi1sZWZ0OiA1NHB4O1xufVxuLmV2ZW50NXtcbiAgICBtYXJnaW4tbGVmdDogODFweDtcbn1cbi5ldmVudDZ7XG4gICAgbWFyZ2luLWxlZnQ6IDgwcHg7XG59Il19 */";
    /***/
  },

  /***/
  "./src/app/add-sub-admin-management/add-sub-admin-management.component.ts":
  /*!********************************************************************************!*\
    !*** ./src/app/add-sub-admin-management/add-sub-admin-management.component.ts ***!
    \********************************************************************************/

  /*! exports provided: AddSubAdminManagementComponent */

  /***/
  function srcAppAddSubAdminManagementAddSubAdminManagementComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AddSubAdminManagementComponent", function () {
      return AddSubAdminManagementComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _orbistur_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../orbistur-service.service */
    "./src/app/orbistur-service.service.ts");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");

    var AddSubAdminManagementComponent =
    /*#__PURE__*/
    function () {
      function AddSubAdminManagementComponent(service, router, formbuilder, spinner) {
        _classCallCheck(this, AddSubAdminManagementComponent);

        this.service = service;
        this.router = router;
        this.formbuilder = formbuilder;
        this.spinner = spinner;
      }

      _createClass(AddSubAdminManagementComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.addSubAdminForm = this.formbuilder.group({
            'name': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(60), _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].minLength(2), _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern("[a-zA-Z ]*")])],
            'email': ["", _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(60), _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)])],
            'number': ["", _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern(/^[1-9][0-9]{9}$/)])],
            'password': ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].minLength(8), _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(16), _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i)]],
            'confirmPassword': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            'address': ["", _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(256)])],
            'dashboard': [false],
            'customerManagement': [false],
            'subAdminManagement': [false],
            'packageManagement': [false],
            'bookingManagement': [false],
            'transferManagement': [false],
            'sightseeingManagement': [false],
            'transactionManagement': [false],
            'visaManagement': [false],
            'contentManagement': [false],
            'inquiryManagement': [false],
            'supportManagement': [false],
            'settingManagement': [false]
          });
          this.phoneCheckCountry();
        }
      }, {
        key: "phoneCheckCountry",
        value: function phoneCheckCountry() {
          $("#phoneNumber").intlTelInput({
            autoPlaceholder: false,
            autoFormat: false,
            autoHideDialCode: false,
            initialCountry: 'in',
            nationalMode: false,
            onlyCountries: [],
            // preferredCountries: ["us"],
            formatOnInit: true,
            separateDialCode: true,
            formatOnDisplay: false
          });
        }
      }, {
        key: "toCheckSpaceChar",
        value: function toCheckSpaceChar() {
          this.isValidNumber = $('#phoneNumber').intlTelInput('isValidNumber');
          var countryData = $('#phoneNumber').intlTelInput('getSelectedCountryData');
          this.myCode = "+" + countryData.dialCode;
        } // *************************Image upload event****************//

      }, {
        key: "handleInputChange",
        value: function handleInputChange(e) {
          var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
          var pattern = /image-*/;
          var reader = new FileReader();

          if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
          }

          reader.onload = this._handleReaderLoaded.bind(this);
          reader.readAsDataURL(file);
        }
      }, {
        key: "_handleReaderLoaded",
        value: function _handleReaderLoaded(e) {
          var reader = e.target;
          this.profile = reader.result;
          console.log("profile", this.profile);
        } // **************************Add Sub Admin Api****************************//

      }, {
        key: "addSubAdmin",
        value: function addSubAdmin() {
          var _this9 = this;

          this.spinner.show();
          var object = {
            'name': this.addSubAdminForm.value.name,
            'email': this.addSubAdminForm.value.email,
            'mobileNumber': this.myCode + this.addSubAdminForm.value.number,
            'password': this.addSubAdminForm.value.password,
            'confirmPassword': this.addSubAdminForm.value.confirmPassword,
            'address': this.addSubAdminForm.value.address,
            'dashboard': this.addSubAdminForm.value.dashboard,
            'customerManagement': this.addSubAdminForm.value.customerManagement,
            'subAdminManagement': this.addSubAdminForm.value.subAdminManagement,
            'packageManagement': this.addSubAdminForm.value.packageManagement,
            'bookingManagement': this.addSubAdminForm.value.bookingManagement,
            'transferManagement': this.addSubAdminForm.value.transferManagement,
            'sightseeingManagement': this.addSubAdminForm.value.sightseeingManagement,
            'transactionManagement': this.addSubAdminForm.value.transactionManagement,
            'visaManagement': this.addSubAdminForm.value.visaManagement,
            'contentManagement': this.addSubAdminForm.value.contentManagement,
            'inquiryManagement': this.addSubAdminForm.value.inquiryManagement,
            'supportManagement': this.addSubAdminForm.value.supportManagement,
            'settingManagement': this.addSubAdminForm.value.settingManagement,
            'profilePic': this.profile
          };
          console.log('object==>>', object);
          console.log('valid', this.addSubAdminForm.valid);
          this.service.postApi('admin/addSubAdmin', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this9.spinner.hide();

              _this9.service.showSuccess("Sub-admin has been added successfully.");

              _this9.router.navigate(['sub-admin-management']);
            } else {
              _this9.spinner.hide();

              _this9.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this9.spinner.hide();

            _this9.service.toastErr("Internal server error");
          });
        }
      }]);

      return AddSubAdminManagementComponent;
    }();

    AddSubAdminManagementComponent.ctorParameters = function () {
      return [{
        type: _orbistur_service_service__WEBPACK_IMPORTED_MODULE_2__["OrbisturServiceService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"]
      }, {
        type: ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"]
      }];
    };

    AddSubAdminManagementComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-add-sub-admin-management',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./add-sub-admin-management.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/add-sub-admin-management/add-sub-admin-management.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./add-sub-admin-management.component.css */
      "./src/app/add-sub-admin-management/add-sub-admin-management.component.css")).default]
    })], AddSubAdminManagementComponent);
    /***/
  },

  /***/
  "./src/app/app-routing.module.ts":
  /*!***************************************!*\
    !*** ./src/app/app-routing.module.ts ***!
    \***************************************/

  /*! exports provided: AppRoutingModule */

  /***/
  function srcAppAppRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function () {
      return AppRoutingModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./login/login.component */
    "./src/app/login/login.component.ts");
    /* harmony import */


    var _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./sidebar/sidebar.component */
    "./src/app/sidebar/sidebar.component.ts");
    /* harmony import */


    var _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./forgot-password/forgot-password.component */
    "./src/app/forgot-password/forgot-password.component.ts");
    /* harmony import */


    var _reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./reset-password/reset-password.component */
    "./src/app/reset-password/reset-password.component.ts");
    /* harmony import */


    var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ./dashboard/dashboard.component */
    "./src/app/dashboard/dashboard.component.ts");
    /* harmony import */


    var _customer_management_customer_management_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ./customer-management/customer-management.component */
    "./src/app/customer-management/customer-management.component.ts");
    /* harmony import */


    var _sub_admin_management_sub_admin_management_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ./sub-admin-management/sub-admin-management.component */
    "./src/app/sub-admin-management/sub-admin-management.component.ts");
    /* harmony import */


    var _content_destination_content_destination_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! ./content-destination/content-destination.component */
    "./src/app/content-destination/content-destination.component.ts");
    /* harmony import */


    var _add_customer_add_customer_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! ./add-customer/add-customer.component */
    "./src/app/add-customer/add-customer.component.ts");
    /* harmony import */


    var _edit_customer_edit_customer_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! ./edit-customer/edit-customer.component */
    "./src/app/edit-customer/edit-customer.component.ts");
    /* harmony import */


    var _add_sub_admin_management_add_sub_admin_management_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
    /*! ./add-sub-admin-management/add-sub-admin-management.component */
    "./src/app/add-sub-admin-management/add-sub-admin-management.component.ts");
    /* harmony import */


    var _auth_guard__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
    /*! ./auth.guard */
    "./src/app/auth.guard.ts");
    /* harmony import */


    var _edit_sub_admin_edit_sub_admin_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
    /*! ./edit-sub-admin/edit-sub-admin.component */
    "./src/app/edit-sub-admin/edit-sub-admin.component.ts");
    /* harmony import */


    var _enquries_enquries_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
    /*! ./enquries/enquries.component */
    "./src/app/enquries/enquries.component.ts");
    /* harmony import */


    var _edit_destination_edit_destination_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
    /*! ./edit-destination/edit-destination.component */
    "./src/app/edit-destination/edit-destination.component.ts");
    /* harmony import */


    var _settings_page_settings_page_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
    /*! ./settings-page/settings-page.component */
    "./src/app/settings-page/settings-page.component.ts");
    /* harmony import */


    var _view_enquries_view_enquries_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
    /*! ./view-enquries/view-enquries.component */
    "./src/app/view-enquries/view-enquries.component.ts");
    /* harmony import */


    var _edit_setting_edit_setting_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
    /*! ./edit-setting/edit-setting.component */
    "./src/app/edit-setting/edit-setting.component.ts");
    /* harmony import */


    var _page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
    /*! ./page-not-found/page-not-found.component */
    "./src/app/page-not-found/page-not-found.component.ts");
    /* harmony import */


    var _my_profile_my_profile_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(
    /*! ./my-profile/my-profile.component */
    "./src/app/my-profile/my-profile.component.ts");
    /* harmony import */


    var _package_management_package_management_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(
    /*! ./package-management/package-management.component */
    "./src/app/package-management/package-management.component.ts");
    /* harmony import */


    var _add_package_management_add_package_management_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(
    /*! ./add-package-management/add-package-management.component */
    "./src/app/add-package-management/add-package-management.component.ts");
    /* harmony import */


    var _view_package_management_view_package_management_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(
    /*! ./view-package-management/view-package-management.component */
    "./src/app/view-package-management/view-package-management.component.ts");
    /* harmony import */


    var _edit_package_management_edit_package_management_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(
    /*! ./edit-package-management/edit-package-management.component */
    "./src/app/edit-package-management/edit-package-management.component.ts");

    var routes = [{
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    }, {
      path: 'login',
      component: _login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"]
    }, {
      path: 'sidebar',
      component: _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_4__["SidebarComponent"],
      canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_14__["AuthGuard"]]
    }, {
      path: 'forgot-password',
      component: _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_5__["ForgotPasswordComponent"]
    }, {
      path: 'reset-password/:_id',
      component: _reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_6__["ResetPasswordComponent"]
    }, {
      path: 'dashboard',
      component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_7__["DashboardComponent"],
      canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_14__["AuthGuard"]]
    }, {
      path: 'customer-management',
      component: _customer_management_customer_management_component__WEBPACK_IMPORTED_MODULE_8__["CustomerManagementComponent"],
      canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_14__["AuthGuard"]]
    }, {
      path: 'sub-admin-management',
      component: _sub_admin_management_sub_admin_management_component__WEBPACK_IMPORTED_MODULE_9__["SubAdminManagementComponent"],
      canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_14__["AuthGuard"]]
    }, {
      path: 'package-management',
      component: _package_management_package_management_component__WEBPACK_IMPORTED_MODULE_23__["PackageManagementComponent"],
      canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_14__["AuthGuard"]]
    }, {
      path: 'add-package-management',
      component: _add_package_management_add_package_management_component__WEBPACK_IMPORTED_MODULE_24__["AddPackageManagementComponent"],
      canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_14__["AuthGuard"]]
    }, {
      path: 'view-package-management/:id',
      component: _view_package_management_view_package_management_component__WEBPACK_IMPORTED_MODULE_25__["ViewPackageManagementComponent"],
      canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_14__["AuthGuard"]]
    }, {
      path: 'edit-package-management/:_id',
      component: _edit_package_management_edit_package_management_component__WEBPACK_IMPORTED_MODULE_26__["EditPackageManagementComponent"],
      canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_14__["AuthGuard"]]
    }, {
      path: 'content-destination',
      component: _content_destination_content_destination_component__WEBPACK_IMPORTED_MODULE_10__["ContentDestinationComponent"],
      canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_14__["AuthGuard"]]
    }, {
      path: 'add-customer',
      component: _add_customer_add_customer_component__WEBPACK_IMPORTED_MODULE_11__["AddCustomerComponent"],
      canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_14__["AuthGuard"]]
    }, {
      path: 'edit-customer/:_id',
      component: _edit_customer_edit_customer_component__WEBPACK_IMPORTED_MODULE_12__["EditCustomerComponent"],
      canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_14__["AuthGuard"]]
    }, {
      path: 'add-sub-admin-management',
      component: _add_sub_admin_management_add_sub_admin_management_component__WEBPACK_IMPORTED_MODULE_13__["AddSubAdminManagementComponent"],
      canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_14__["AuthGuard"]]
    }, {
      path: 'edit-sub-admin/:_id',
      component: _edit_sub_admin_edit_sub_admin_component__WEBPACK_IMPORTED_MODULE_15__["EditSubAdminComponent"],
      canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_14__["AuthGuard"]]
    }, {
      path: 'enquries',
      component: _enquries_enquries_component__WEBPACK_IMPORTED_MODULE_16__["EnquriesComponent"],
      canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_14__["AuthGuard"]]
    }, {
      path: 'edit-destination/:id/:val',
      component: _edit_destination_edit_destination_component__WEBPACK_IMPORTED_MODULE_17__["EditDestinationComponent"],
      canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_14__["AuthGuard"]]
    }, {
      path: 'settings-page',
      component: _settings_page_settings_page_component__WEBPACK_IMPORTED_MODULE_18__["SettingsPageComponent"],
      canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_14__["AuthGuard"]]
    }, {
      path: 'view-enquries/:id',
      component: _view_enquries_view_enquries_component__WEBPACK_IMPORTED_MODULE_19__["ViewEnquriesComponent"],
      canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_14__["AuthGuard"]]
    }, {
      path: 'edit-setting/:id/:val/:value',
      component: _edit_setting_edit_setting_component__WEBPACK_IMPORTED_MODULE_20__["EditSettingComponent"]
    }, {
      path: 'page-not-found',
      component: _page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_21__["PageNotFoundComponent"]
    }, {
      path: 'my-profile',
      component: _my_profile_my_profile_component__WEBPACK_IMPORTED_MODULE_22__["MyProfileComponent"]
    }];

    var AppRoutingModule = function AppRoutingModule() {
      _classCallCheck(this, AppRoutingModule);
    };

    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })], AppRoutingModule);
    /***/
  },

  /***/
  "./src/app/app.component.css":
  /*!***********************************!*\
    !*** ./src/app/app.component.css ***!
    \***********************************/

  /*! exports provided: default */

  /***/
  function srcAppAppComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */";
    /***/
  },

  /***/
  "./src/app/app.component.ts":
  /*!**********************************!*\
    !*** ./src/app/app.component.ts ***!
    \**********************************/

  /*! exports provided: AppComponent */

  /***/
  function srcAppAppComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
      return AppComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var AppComponent =
    /*#__PURE__*/
    function () {
      function AppComponent() {
        _classCallCheck(this, AppComponent);

        this.title = 'orbisturAdminPanel';
      }

      _createClass(AppComponent, [{
        key: "ngOninit",
        value: function ngOninit() {
          this.token = localStorage.getItem('token');
          console.log('token==>>', this.token);
        }
      }]);

      return AppComponent;
    }();

    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-root',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./app.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./app.component.css */
      "./src/app/app.component.css")).default]
    })], AppComponent);
    /***/
  },

  /***/
  "./src/app/app.module.ts":
  /*!*******************************!*\
    !*** ./src/app/app.module.ts ***!
    \*******************************/

  /*! exports provided: AppModule */

  /***/
  function srcAppAppModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppModule", function () {
      return AppModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ngx-toastr */
    "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");
    /* harmony import */


    var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/platform-browser/animations */
    "./node_modules/@angular/platform-browser/fesm2015/animations.js");
    /* harmony import */


    var ngx_pagination__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ngx-pagination */
    "./node_modules/ngx-pagination/dist/ngx-pagination.js");
    /* harmony import */


    var _app_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ./app-routing.module */
    "./src/app/app-routing.module.ts");
    /* harmony import */


    var ngx_ckeditor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ngx-ckeditor */
    "./node_modules/ngx-ckeditor/fesm2015/ngx-ckeditor.js");
    /* harmony import */


    var _app_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ./app.component */
    "./src/app/app.component.ts");
    /* harmony import */


    var _login_login_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! ./login/login.component */
    "./src/app/login/login.component.ts");
    /* harmony import */


    var _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! ./sidebar/sidebar.component */
    "./src/app/sidebar/sidebar.component.ts");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/fesm2015/http.js");
    /* harmony import */


    var _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
    /*! ./forgot-password/forgot-password.component */
    "./src/app/forgot-password/forgot-password.component.ts");
    /* harmony import */


    var _change_password_change_password_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
    /*! ./change-password/change-password.component */
    "./src/app/change-password/change-password.component.ts");
    /* harmony import */


    var _reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
    /*! ./reset-password/reset-password.component */
    "./src/app/reset-password/reset-password.component.ts");
    /* harmony import */


    var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
    /*! ./dashboard/dashboard.component */
    "./src/app/dashboard/dashboard.component.ts");
    /* harmony import */


    var _customer_management_customer_management_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
    /*! ./customer-management/customer-management.component */
    "./src/app/customer-management/customer-management.component.ts");
    /* harmony import */


    var _sub_admin_management_sub_admin_management_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
    /*! ./sub-admin-management/sub-admin-management.component */
    "./src/app/sub-admin-management/sub-admin-management.component.ts");
    /* harmony import */


    var _content_destination_content_destination_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
    /*! ./content-destination/content-destination.component */
    "./src/app/content-destination/content-destination.component.ts");
    /* harmony import */


    var _csv_service_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
    /*! ./csv-service.service */
    "./src/app/csv-service.service.ts");
    /* harmony import */


    var _add_customer_add_customer_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(
    /*! ./add-customer/add-customer.component */
    "./src/app/add-customer/add-customer.component.ts");
    /* harmony import */


    var _edit_customer_edit_customer_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(
    /*! ./edit-customer/edit-customer.component */
    "./src/app/edit-customer/edit-customer.component.ts");
    /* harmony import */


    var _add_sub_admin_management_add_sub_admin_management_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(
    /*! ./add-sub-admin-management/add-sub-admin-management.component */
    "./src/app/add-sub-admin-management/add-sub-admin-management.component.ts");
    /* harmony import */


    var _edit_sub_admin_edit_sub_admin_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(
    /*! ./edit-sub-admin/edit-sub-admin.component */
    "./src/app/edit-sub-admin/edit-sub-admin.component.ts");
    /* harmony import */


    var _enquries_enquries_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(
    /*! ./enquries/enquries.component */
    "./src/app/enquries/enquries.component.ts");
    /* harmony import */


    var _edit_destination_edit_destination_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(
    /*! ./edit-destination/edit-destination.component */
    "./src/app/edit-destination/edit-destination.component.ts");
    /* harmony import */


    var _settings_page_settings_page_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(
    /*! ./settings-page/settings-page.component */
    "./src/app/settings-page/settings-page.component.ts");
    /* harmony import */


    var _sanitize_html_pipe_pipe__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(
    /*! ./sanitize-html-pipe.pipe */
    "./src/app/sanitize-html-pipe.pipe.ts");
    /* harmony import */


    var _view_enquries_view_enquries_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(
    /*! ./view-enquries/view-enquries.component */
    "./src/app/view-enquries/view-enquries.component.ts");
    /* harmony import */


    var _viewenquries_viewenquries_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(
    /*! ./viewenquries/viewenquries.component */
    "./src/app/viewenquries/viewenquries.component.ts");
    /* harmony import */


    var _edit_setting_edit_setting_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(
    /*! ./edit-setting/edit-setting.component */
    "./src/app/edit-setting/edit-setting.component.ts");
    /* harmony import */


    var _page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(
    /*! ./page-not-found/page-not-found.component */
    "./src/app/page-not-found/page-not-found.component.ts");
    /* harmony import */


    var _my_profile_my_profile_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(
    /*! ./my-profile/my-profile.component */
    "./src/app/my-profile/my-profile.component.ts");
    /* harmony import */


    var _package_management_package_management_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(
    /*! ./package-management/package-management.component */
    "./src/app/package-management/package-management.component.ts");
    /* harmony import */


    var _add_package_management_add_package_management_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(
    /*! ./add-package-management/add-package-management.component */
    "./src/app/add-package-management/add-package-management.component.ts");
    /* harmony import */


    var _edit_package_management_edit_package_management_component__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(
    /*! ./edit-package-management/edit-package-management.component */
    "./src/app/edit-package-management/edit-package-management.component.ts");
    /* harmony import */


    var _view_package_management_view_package_management_component__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(
    /*! ./view-package-management/view-package-management.component */
    "./src/app/view-package-management/view-package-management.component.ts"); // *************************Components************************************//


    var AppModule = function AppModule() {
      _classCallCheck(this, AppModule);
    };

    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
      declarations: [_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"], _login_login_component__WEBPACK_IMPORTED_MODULE_10__["LoginComponent"], _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_11__["SidebarComponent"], _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_14__["ForgotPasswordComponent"], _change_password_change_password_component__WEBPACK_IMPORTED_MODULE_15__["ChangePasswordComponent"], _reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_16__["ResetPasswordComponent"], _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_17__["DashboardComponent"], _customer_management_customer_management_component__WEBPACK_IMPORTED_MODULE_18__["CustomerManagementComponent"], _sub_admin_management_sub_admin_management_component__WEBPACK_IMPORTED_MODULE_19__["SubAdminManagementComponent"], _content_destination_content_destination_component__WEBPACK_IMPORTED_MODULE_20__["ContentDestinationComponent"], _add_customer_add_customer_component__WEBPACK_IMPORTED_MODULE_22__["AddCustomerComponent"], _edit_customer_edit_customer_component__WEBPACK_IMPORTED_MODULE_23__["EditCustomerComponent"], _add_sub_admin_management_add_sub_admin_management_component__WEBPACK_IMPORTED_MODULE_24__["AddSubAdminManagementComponent"], _edit_sub_admin_edit_sub_admin_component__WEBPACK_IMPORTED_MODULE_25__["EditSubAdminComponent"], _enquries_enquries_component__WEBPACK_IMPORTED_MODULE_26__["EnquriesComponent"], _edit_destination_edit_destination_component__WEBPACK_IMPORTED_MODULE_27__["EditDestinationComponent"], _settings_page_settings_page_component__WEBPACK_IMPORTED_MODULE_28__["SettingsPageComponent"], _sanitize_html_pipe_pipe__WEBPACK_IMPORTED_MODULE_29__["SanitizeHtmlPipePipe"], _view_enquries_view_enquries_component__WEBPACK_IMPORTED_MODULE_30__["ViewEnquriesComponent"], _viewenquries_viewenquries_component__WEBPACK_IMPORTED_MODULE_31__["ViewenquriesComponent"], _edit_setting_edit_setting_component__WEBPACK_IMPORTED_MODULE_32__["EditSettingComponent"], _page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_33__["PageNotFoundComponent"], _my_profile_my_profile_component__WEBPACK_IMPORTED_MODULE_34__["MyProfileComponent"], _package_management_package_management_component__WEBPACK_IMPORTED_MODULE_35__["PackageManagementComponent"], _add_package_management_add_package_management_component__WEBPACK_IMPORTED_MODULE_36__["AddPackageManagementComponent"], _edit_package_management_edit_package_management_component__WEBPACK_IMPORTED_MODULE_37__["EditPackageManagementComponent"], _view_package_management_view_package_management_component__WEBPACK_IMPORTED_MODULE_38__["ViewPackageManagementComponent"]],
      imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_7__["AppRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["ReactiveFormsModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpClientModule"], ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrModule"].forRoot({
        maxOpened: 1,
        preventDuplicates: true
      }), ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"], ngx_pagination__WEBPACK_IMPORTED_MODULE_6__["NgxPaginationModule"], ngx_ckeditor__WEBPACK_IMPORTED_MODULE_8__["CKEditorModule"]],
      providers: [_csv_service_service__WEBPACK_IMPORTED_MODULE_21__["CsvServiceService"]],
      bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"]]
    })], AppModule);
    /***/
  },

  /***/
  "./src/app/auth.guard.ts":
  /*!*******************************!*\
    !*** ./src/app/auth.guard.ts ***!
    \*******************************/

  /*! exports provided: AuthGuard */

  /***/
  function srcAppAuthGuardTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AuthGuard", function () {
      return AuthGuard;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _orbistur_service_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./orbistur-service.service */
    "./src/app/orbistur-service.service.ts");

    var AuthGuard =
    /*#__PURE__*/
    function () {
      function AuthGuard(router, service) {
        _classCallCheck(this, AuthGuard);

        this.router = router;
        this.service = service;
      }

      _createClass(AuthGuard, [{
        key: "canActivate",
        value: function canActivate(next, state) {
          if (localStorage.getItem('token') == null) {
            //  console.log(this.service.id)
            // this.service.toastErr("You don't have permission");
            this.router.navigate(['login']);
            return false;
          } else {
            return true;
          }
        }
      }]);

      return AuthGuard;
    }();

    AuthGuard.ctorParameters = function () {
      return [{
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
      }, {
        type: _orbistur_service_service__WEBPACK_IMPORTED_MODULE_3__["OrbisturServiceService"]
      }];
    };

    AuthGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    })], AuthGuard);
    /***/
  },

  /***/
  "./src/app/change-password/change-password.component.css":
  /*!***************************************************************!*\
    !*** ./src/app/change-password/change-password.component.css ***!
    \***************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppChangePasswordChangePasswordComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NoYW5nZS1wYXNzd29yZC9jaGFuZ2UtcGFzc3dvcmQuY29tcG9uZW50LmNzcyJ9 */";
    /***/
  },

  /***/
  "./src/app/change-password/change-password.component.ts":
  /*!**************************************************************!*\
    !*** ./src/app/change-password/change-password.component.ts ***!
    \**************************************************************/

  /*! exports provided: ChangePasswordComponent */

  /***/
  function srcAppChangePasswordChangePasswordComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ChangePasswordComponent", function () {
      return ChangePasswordComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var ChangePasswordComponent =
    /*#__PURE__*/
    function () {
      function ChangePasswordComponent() {
        _classCallCheck(this, ChangePasswordComponent);
      }

      _createClass(ChangePasswordComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }]);

      return ChangePasswordComponent;
    }();

    ChangePasswordComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-change-password',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./change-password.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/change-password/change-password.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./change-password.component.css */
      "./src/app/change-password/change-password.component.css")).default]
    })], ChangePasswordComponent);
    /***/
  },

  /***/
  "./src/app/content-destination/content-destination.component.css":
  /*!***********************************************************************!*\
    !*** ./src/app/content-destination/content-destination.component.css ***!
    \***********************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppContentDestinationContentDestinationComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".imgg{\n    width: 150px;\n    height: 150px;\n    border-radius: 88px;\n}\n\n.imagebtn{\n    text-transform: none;\n    /* margin-left: 2%; */\n    width: 144px;\n    height: 36px;\n    border-radius: 21px;\n    background-color: #4db94d;\n    color: white;\n    \n}\n\n.optionals{\n    \n    font-weight: lighter;\n    font-size: 15px;\n    color: gray;\n}\n\n.btnss{\n    float: right;\n    width: 150px;\n    height: 34px;\n    color: white;\n    background-color: green;\n    border-radius: 18px;\n}\n\n.btn {\n    /* float: right; */\n    /* width: 120px; */\n    border: none;\n  \n}\n\n.btn-app {\n    border-radius: 3px;\n    /* position: relative; */\n    /* padding: 15px 5px; */\n    /* margin: 0 0 10px 10px; */\n    min-width: 80px;\n    height: 60px;\n    text-align: center;\n    color: #666;\n    /* border: 1px solid #ddd;\n    background-color: #f4f4f4; */\n    font-size: 12px;\n}\n\n.tbtbtb{\n    display: -webkit-box;\n    display: flex;\n    justify-content: space-around;\n}\n\n.imageUpload{\n        /* border: solid; */\n        height: 66px;\n        width: 26.5%;\n        border-style: inherit;\n        margin-left: 92px;\n}\n\n.imgs{\n    padding-top: 35px;\n    padding-left: 8px;\n}\n\nli.nav-item.destion_cs3 {\n    width: 33.33% !important;\n}\n\n.destinations{\n    margin-left: 6px;\n}\n\n.insurance{\n    width: 100%;\n    max-width: 23%;\n    margin-left: 10px;\n}\n\n.srch{\n    width: 100%;\n    max-width: 24%;\n    border-radius: 13px;\n}\n\n.titles{\n    display: -webkit-box;\n    display: flex;\n    margin-left: 32px;\n    padding-top: 23px;\n}\n\n.ipt{\n    width: 100%;\n    margin-left: 24px;\n    max-width: 255px;\n}\n\n.activeinactiv{\n    padding-top: 20px;\n    margin-left: 12px;\n\n}\n\n\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC1kZXN0aW5hdGlvbi9jb250ZW50LWRlc3RpbmF0aW9uLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxZQUFZO0lBQ1osYUFBYTtJQUNiLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLG9CQUFvQjtJQUNwQixxQkFBcUI7SUFDckIsWUFBWTtJQUNaLFlBQVk7SUFDWixtQkFBbUI7SUFDbkIseUJBQXlCO0lBQ3pCLFlBQVk7O0FBRWhCOztBQUNBOztJQUVJLG9CQUFvQjtJQUNwQixlQUFlO0lBQ2YsV0FBVztBQUNmOztBQUVBO0lBQ0ksWUFBWTtJQUNaLFlBQVk7SUFDWixZQUFZO0lBQ1osWUFBWTtJQUNaLHVCQUF1QjtJQUN2QixtQkFBbUI7QUFDdkI7O0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIsa0JBQWtCO0lBQ2xCLFlBQVk7O0FBRWhCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLHdCQUF3QjtJQUN4Qix1QkFBdUI7SUFDdkIsMkJBQTJCO0lBQzNCLGVBQWU7SUFDZixZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLFdBQVc7SUFDWDtnQ0FDNEI7SUFDNUIsZUFBZTtBQUNuQjs7QUFDQTtJQUNJLG9CQUFhO0lBQWIsYUFBYTtJQUNiLDZCQUE2QjtBQUNqQzs7QUFFQTtRQUNRLG1CQUFtQjtRQUNuQixZQUFZO1FBQ1osWUFBWTtRQUNaLHFCQUFxQjtRQUNyQixpQkFBaUI7QUFDekI7O0FBQ0E7SUFDSSxpQkFBaUI7SUFDakIsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksd0JBQXdCO0FBQzVCOztBQUVBO0lBQ0ksZ0JBQWdCO0FBQ3BCOztBQUNBO0lBQ0ksV0FBVztJQUNYLGNBQWM7SUFDZCxpQkFBaUI7QUFDckI7O0FBQ0E7SUFDSSxXQUFXO0lBQ1gsY0FBYztJQUNkLG1CQUFtQjtBQUN2Qjs7QUFDQTtJQUNJLG9CQUFhO0lBQWIsYUFBYTtJQUNiLGlCQUFpQjtJQUNqQixpQkFBaUI7QUFDckI7O0FBQ0E7SUFDSSxXQUFXO0lBQ1gsaUJBQWlCO0lBQ2pCLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLGlCQUFpQjtJQUNqQixpQkFBaUI7O0FBRXJCIiwiZmlsZSI6InNyYy9hcHAvY29udGVudC1kZXN0aW5hdGlvbi9jb250ZW50LWRlc3RpbmF0aW9uLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaW1nZ3tcbiAgICB3aWR0aDogMTUwcHg7XG4gICAgaGVpZ2h0OiAxNTBweDtcbiAgICBib3JkZXItcmFkaXVzOiA4OHB4O1xufVxuXG4uaW1hZ2VidG57XG4gICAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gICAgLyogbWFyZ2luLWxlZnQ6IDIlOyAqL1xuICAgIHdpZHRoOiAxNDRweDtcbiAgICBoZWlnaHQ6IDM2cHg7XG4gICAgYm9yZGVyLXJhZGl1czogMjFweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGRiOTRkO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBcbn1cbi5vcHRpb25hbHN7XG4gICAgXG4gICAgZm9udC13ZWlnaHQ6IGxpZ2h0ZXI7XG4gICAgZm9udC1zaXplOiAxNXB4O1xuICAgIGNvbG9yOiBncmF5O1xufVxuXG4uYnRuc3N7XG4gICAgZmxvYXQ6IHJpZ2h0O1xuICAgIHdpZHRoOiAxNTBweDtcbiAgICBoZWlnaHQ6IDM0cHg7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xuICAgIGJvcmRlci1yYWRpdXM6IDE4cHg7XG59XG4uYnRuIHtcbiAgICAvKiBmbG9hdDogcmlnaHQ7ICovXG4gICAgLyogd2lkdGg6IDEyMHB4OyAqL1xuICAgIGJvcmRlcjogbm9uZTtcbiAgXG59XG5cbi5idG4tYXBwIHtcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgLyogcG9zaXRpb246IHJlbGF0aXZlOyAqL1xuICAgIC8qIHBhZGRpbmc6IDE1cHggNXB4OyAqL1xuICAgIC8qIG1hcmdpbjogMCAwIDEwcHggMTBweDsgKi9cbiAgICBtaW4td2lkdGg6IDgwcHg7XG4gICAgaGVpZ2h0OiA2MHB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBjb2xvcjogIzY2NjtcbiAgICAvKiBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmNGY0ZjQ7ICovXG4gICAgZm9udC1zaXplOiAxMnB4O1xufVxuLnRidGJ0YntcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xufVxuXG4uaW1hZ2VVcGxvYWR7XG4gICAgICAgIC8qIGJvcmRlcjogc29saWQ7ICovXG4gICAgICAgIGhlaWdodDogNjZweDtcbiAgICAgICAgd2lkdGg6IDI2LjUlO1xuICAgICAgICBib3JkZXItc3R5bGU6IGluaGVyaXQ7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiA5MnB4O1xufVxuLmltZ3N7XG4gICAgcGFkZGluZy10b3A6IDM1cHg7XG4gICAgcGFkZGluZy1sZWZ0OiA4cHg7XG59XG5cbmxpLm5hdi1pdGVtLmRlc3Rpb25fY3MzIHtcbiAgICB3aWR0aDogMzMuMzMlICFpbXBvcnRhbnQ7XG59XG5cbi5kZXN0aW5hdGlvbnN7XG4gICAgbWFyZ2luLWxlZnQ6IDZweDtcbn1cbi5pbnN1cmFuY2V7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWF4LXdpZHRoOiAyMyU7XG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XG59XG4uc3JjaHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXgtd2lkdGg6IDI0JTtcbiAgICBib3JkZXItcmFkaXVzOiAxM3B4O1xufVxuLnRpdGxlc3tcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIG1hcmdpbi1sZWZ0OiAzMnB4O1xuICAgIHBhZGRpbmctdG9wOiAyM3B4O1xufVxuLmlwdHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW4tbGVmdDogMjRweDtcbiAgICBtYXgtd2lkdGg6IDI1NXB4O1xufVxuXG4uYWN0aXZlaW5hY3RpdntcbiAgICBwYWRkaW5nLXRvcDogMjBweDtcbiAgICBtYXJnaW4tbGVmdDogMTJweDtcblxufVxuXG5cbiJdfQ== */";
    /***/
  },

  /***/
  "./src/app/content-destination/content-destination.component.ts":
  /*!**********************************************************************!*\
    !*** ./src/app/content-destination/content-destination.component.ts ***!
    \**********************************************************************/

  /*! exports provided: ContentDestinationComponent */

  /***/
  function srcAppContentDestinationContentDestinationComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ContentDestinationComponent", function () {
      return ContentDestinationComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _orbistur_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../orbistur-service.service */
    "./src/app/orbistur-service.service.ts");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");

    var ContentDestinationComponent =
    /*#__PURE__*/
    function () {
      function ContentDestinationComponent(service, formBuilder, spinner, router, activate) {
        _classCallCheck(this, ContentDestinationComponent);

        this.service = service;
        this.formBuilder = formBuilder;
        this.spinner = spinner;
        this.router = router;
        this.activate = activate;
        this.tab = 'Destination';
        this.countryList = [];
        this.limit = 10;
        this.page = 1;
        this.p = 0;
        this.countryName = [];
      } // /^(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?$/i


      _createClass(ContentDestinationComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this10 = this;

          this.destinationForm = this.formBuilder.group({
            'country': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            'destination': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(60)])],
            'insurance': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(20), _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern(/^-?(?:0|[1-9]\d{0,2}(?:,?\d{3})*)(?:\.\d+)?$/)])],
            'activeInsurance': ['ACTIVE']
          });
          this.bannerForm = this.formBuilder.group({
            'activebanner': ['ACTIVE'],
            'title': ["", _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(20)])]
          });
          this.getCountry();
          this.destinationList();
          this.getContentList();
          this.addBannerList();
          this.activate.params.subscribe(function (res) {
            console.log('resss===>>>', res.val);
            _this10.val = Number(res.val);

            _this10.tabChangedFunc(_this10.val);
          });
        } // *******************Country List ********************//

      }, {
        key: "getCountry",
        value: function getCountry() {
          var _this11 = this;

          var object = {
            "search": null
          };
          this.service.postApi('admin/countryList', object, 1).subscribe(function (res) {
            _this11.countryList = res.body.result.docs;
            console.log('countryListJson', _this11.countryList);
          });
        } // ***********************Destination Add Api*****************//

      }, {
        key: "addDestination",
        value: function addDestination() {
          var _this12 = this;

          this.spinner.show();
          var object = {
            'countryId': this.destinationForm.value.country,
            'destination': this.destinationForm.value.destination,
            'insurance': this.destinationForm.value.insurance,
            'status': this.destinationForm.value.activeInsurance
          };
          console.log('object==>>', object);
          this.service.postApi('admin/addDestination', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this12.spinner.hide();

              _this12.service.showSuccess(res.body.response_message);

              _this12.destinationList();
            } else if (res.body.response_code == 209) {
              _this12.spinner.hide();

              _this12.service.toastErr(res.body.response_message);
            } else {
              _this12.spinner.hide();

              _this12.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this12.spinner.hide();

            _this12.service.toastErr(error.response_message);
          });
        }
      }, {
        key: "searchValue",
        value: function searchValue(value) {
          this.filterName = value;
          this.destnList = [];
          this.contentList = [];
          this.destinationList();
          this.getContentList();
        }
      }, {
        key: "selectStatus",
        value: function selectStatus(value) {
          var _this13 = this;

          this.status = value;
          console.log('staatus==>>', this.status);

          if (this.status == 'ACTIVE' || this.status == 'INACTIVE') {
            this.destinationList();
            this.getContentList();
            this.addBannerList();
          } else if (this.status == 'ALL') {
            // this.destinationList();
            this.filterName = '';
            this.page = 1;
            this.limit = 10;
            this.status = null;
            setTimeout(function () {
              _this13.destinationList();

              _this13.getContentList();

              _this13.addBannerList();
            }, 100);
          }
        } // *********************DestinationList api*********************//

      }, {
        key: "destinationList",
        value: function destinationList() {
          var _this14 = this;

          var object = {
            'search': this.filterName,
            'status': this.status,
            'page': this.page,
            'limit': this.limit
          };
          this.service.postApi('admin/destinationList', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this14.spinner.hide(); // this.getName()


              _this14.destnList = res.body.result.docs ? res.body.result.docs : res.body.result;
            } else {
              _this14.spinner.hide();
            }
          }, function (error) {
            _this14.spinner.hide();

            _this14.service.toastErr(error.response_message);
          });
        } // *************Pagination method**********//

      }, {
        key: "changePage",
        value: function changePage(page) {
          console.log('Page ', page);
          this.page = this.page;
          this.p = page - 1;
          this.destinationList();
          this.addBannerList();
        } // **************************Destination Get id method for delete customer*******************************//

      }, {
        key: "deleteFunction",
        value: function deleteFunction(id) {
          this.destination_id = id;
          console.log('user_id', this.destination_id);
          $('#modaldelete').modal({
            backdrop: 'static',
            keyboard: false
          });
        } // ***************************Delete method*******************************//

      }, {
        key: "deleteFunctions",
        value: function deleteFunctions() {
          var _this15 = this;

          this.service.deleteApi('admin/deleteDestination/' + this.destination_id, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this15.spinner.hide();

              _this15.destinationList();

              _this15.service.showSuccess(res.body.response_message);
            } else {
              _this15.spinner.hide();

              _this15.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this15.spinner.hide();

            _this15.service.toastErr("Internal server error");
          });
        } //***************************Static Content List ***********************//

      }, {
        key: "getContentList",
        value: function getContentList() {
          var _this16 = this;

          var object = {
            "search": this.filterName,
            "status": this.status
          };
          this.service.postApi('static/staticContentList', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this16.spinner.hide();

              _this16.contentList = res.body.result.docs ? res.body.result.docs : res.body.result;
              _this16._id = _this16.contentList.filter(function (x) {
                return x._id;
              }).map(function (x) {
                return x._id;
              });
              console.log('getContentList==>>>', _this16.contentList);
              console.log('this._id', _this16._id);
            } else {
              _this16.spinner.hide();
            }
          }, function (error) {
            _this16.spinner.hide();

            _this16.service.toastErr(error.response_message);
          });
        } // **************************banner id method for delete customer*******************************//

      }, {
        key: "deletebanner",
        value: function deletebanner(id) {
          this.banner_id = id;
          console.log('banner_id', this.banner_id);
          $('#bannermodaldelete').modal({
            backdrop: 'static',
            keyboard: false
          });
        } // ***************************Delete method*******************************//

      }, {
        key: "deletebanners",
        value: function deletebanners() {
          var _this17 = this;

          this.service.deleteApi('admin/deleteBanner/' + this.banner_id, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this17.spinner.hide();

              _this17.addBannerList();

              _this17.service.showSuccess(res.body.response_message);
            } else {
              _this17.spinner.hide();

              _this17.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this17.spinner.hide();

            _this17.service.toastErr("Internal server error");
          });
        } // getName(){
        //   this.countryName=[]
        //   this.countryList.filter(items=>{
        //     // console.log('name==>>',items.country)
        //     this.countryName.push(items.country)
        //   })
        //   this.destnList.putAll(this.countryName)
        //   console.log('countryName',this.destnList)
        // }
        // ***************************Image upload 64base******************//

      }, {
        key: "handleInputChange",
        value: function handleInputChange(e) {
          var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
          var pattern = /image-*/;
          var reader = new FileReader();

          if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
          }

          reader.onload = this._handleReaderLoaded.bind(this);
          reader.readAsDataURL(file);
        }
      }, {
        key: "_handleReaderLoaded",
        value: function _handleReaderLoaded(e) {
          var reader = e.target;
          this.imageSrc = reader.result;
        }
      }, {
        key: "tabChangedFunc",
        value: function tabChangedFunc(val) {
          switch (val) {
            case 0:
              this.tab = 'Destination'; // this.getactivejob();

              break;

            case 1:
              this.tab = 'Website'; // this.getappliedjob();

              break;

            case 2:
              this.tab = 'Banners'; // this.getpendingjob();

              break;
          }
        } // ****************************Add Banner Api***********************//

      }, {
        key: "addBanner",
        value: function addBanner() {
          var _this18 = this;

          this.spinner.show();

          if (this.imageSrc != null) {
            var object = {
              'title': this.bannerForm.value.title,
              'bannerPic': this.imageSrc,
              'status': this.bannerForm.value.activebanner
            };
            this.service.postApi('admin/addBanner', object, 1).subscribe(function (res) {
              if (res.body.response_code == 200) {
                _this18.spinner.hide();

                _this18.addBannerList();

                _this18.bannerForm.reset();

                _this18.imageSrc = '';

                _this18.service.showSuccess("Banner has been added successfully.");
              } else if (res.body.response_code == 209) {
                _this18.spinner.hide();

                _this18.service.toastErr(res.body.response_message);
              } else {
                _this18.spinner.hide();

                _this18.service.toastErr(res.body.response_message);
              }
            }, function (error) {
              _this18.spinner.hide();

              _this18.service.toastErr(error.response_message);
            });
          } else {
            this.spinner.hide();
            this.service.toastErr("Please upload banner image.");
          }
        } //*************************Add banner List******************************//

      }, {
        key: "addBannerList",
        value: function addBannerList() {
          var _this19 = this;

          this.spinner.show();
          var object = {
            'status': this.status,
            'pageNumber': this.page,
            'limit': this.limit
          };
          this.service.postApi('admin/bannerList', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this19.spinner.hide();

              _this19.bannerList = res.body.result.docs;
              console.log('bannerList', _this19.bannerList);
            } else {
              _this19.spinner.hide();

              _this19.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this19.spinner.hide();

            _this19.service.toastErr(error.response_message);
          });
        }
      }]);

      return ContentDestinationComponent;
    }();

    ContentDestinationComponent.ctorParameters = function () {
      return [{
        type: _orbistur_service_service__WEBPACK_IMPORTED_MODULE_2__["OrbisturServiceService"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"]
      }, {
        type: ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"]
      }];
    };

    ContentDestinationComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-content-destination',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./content-destination.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/content-destination/content-destination.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./content-destination.component.css */
      "./src/app/content-destination/content-destination.component.css")).default]
    })], ContentDestinationComponent);
    /***/
  },

  /***/
  "./src/app/csv-service.service.ts":
  /*!****************************************!*\
    !*** ./src/app/csv-service.service.ts ***!
    \****************************************/

  /*! exports provided: CsvServiceService */

  /***/
  function srcAppCsvServiceServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CsvServiceService", function () {
      return CsvServiceService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var CsvServiceService =
    /*#__PURE__*/
    function () {
      function CsvServiceService() {
        _classCallCheck(this, CsvServiceService);
      }

      _createClass(CsvServiceService, [{
        key: "downloadFile",
        value: function downloadFile(data) {
          var filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'data';
          var csvData = this.ConvertToCSV(data, ['Name', 'Email address', 'Mobile number', 'Registration on']);
          console.log(csvData);
          var blob = new Blob(["\uFEFF" + csvData], {
            type: 'text/csv;charset=utf-8;'
          });
          var dwldLink = document.createElement("a");
          var url = URL.createObjectURL(blob);
          var isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;

          if (isSafariBrowser) {
            //if Safari open in new window to save file with random filename.
            dwldLink.setAttribute("target", "_blank");
          }

          dwldLink.setAttribute("href", url);
          dwldLink.setAttribute("download", filename + ".csv");
          dwldLink.style.visibility = "hidden";
          document.body.appendChild(dwldLink);
          dwldLink.click();
          document.body.removeChild(dwldLink);
        }
      }, {
        key: "ConvertToCSV",
        value: function ConvertToCSV(objArray, headerList) {
          var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
          var str = '';
          var row = 'S.No,';

          for (var index in headerList) {
            row += headerList[index] + ',';
          }

          row = row.slice(0, -1);
          str += row + '\r\n';

          for (var i = 0; i < array.length; i++) {
            var line = i + 1 + '';

            for (var _index in headerList) {
              var head = headerList[_index];
              line += ',' + array[i][head];
            }

            str += line + '\r\n';
          }

          return str;
        }
      }]);

      return CsvServiceService;
    }();

    CsvServiceService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    })], CsvServiceService);
    /***/
  },

  /***/
  "./src/app/customer-management/customer-management.component.css":
  /*!***********************************************************************!*\
    !*** ./src/app/customer-management/customer-management.component.css ***!
    \***********************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppCustomerManagementCustomerManagementComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".bt{\n    margin-left: 54px;\n    width: 100%;\n    max-width: 157px;\n    border-radius: 19px;\n    background-color: gray;\n    border: none;\n}\n\n.mainbtn{\n    display: -webkit-box;\n    display: flex;\n}\n\n.resetbtn{\n    margin-left: 1%;\n    width: 150px;\n    /* margin-left: 1%; */\n    /* width: 150px; */\n    background-color: gray;\n    color: white;\n    border-radius: 19px;\n}\n\n.addbtn{\n    margin-left: 49%;width: 150px;\n}\n\n.exbtn{\n    margin-left: 1%;\n    width: 150px;\n    background-color: gray;\n    color: white;\n    border-radius: 19px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY3VzdG9tZXItbWFuYWdlbWVudC9jdXN0b21lci1tYW5hZ2VtZW50LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxpQkFBaUI7SUFDakIsV0FBVztJQUNYLGdCQUFnQjtJQUNoQixtQkFBbUI7SUFDbkIsc0JBQXNCO0lBQ3RCLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxvQkFBYTtJQUFiLGFBQWE7QUFDakI7O0FBQ0E7SUFDSSxlQUFlO0lBQ2YsWUFBWTtJQUNaLHFCQUFxQjtJQUNyQixrQkFBa0I7SUFDbEIsc0JBQXNCO0lBQ3RCLFlBQVk7SUFDWixtQkFBbUI7QUFDdkI7O0FBQ0E7SUFDSSxnQkFBZ0IsQ0FBQyxZQUFZO0FBQ2pDOztBQUNBO0lBQ0ksZUFBZTtJQUNmLFlBQVk7SUFDWixzQkFBc0I7SUFDdEIsWUFBWTtJQUNaLG1CQUFtQjtBQUN2QiIsImZpbGUiOiJzcmMvYXBwL2N1c3RvbWVyLW1hbmFnZW1lbnQvY3VzdG9tZXItbWFuYWdlbWVudC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJ0e1xuICAgIG1hcmdpbi1sZWZ0OiA1NHB4O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1heC13aWR0aDogMTU3cHg7XG4gICAgYm9yZGVyLXJhZGl1czogMTlweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5O1xuICAgIGJvcmRlcjogbm9uZTtcbn1cblxuLm1haW5idG57XG4gICAgZGlzcGxheTogZmxleDtcbn1cbi5yZXNldGJ0bntcbiAgICBtYXJnaW4tbGVmdDogMSU7XG4gICAgd2lkdGg6IDE1MHB4O1xuICAgIC8qIG1hcmdpbi1sZWZ0OiAxJTsgKi9cbiAgICAvKiB3aWR0aDogMTUwcHg7ICovXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgYm9yZGVyLXJhZGl1czogMTlweDtcbn1cbi5hZGRidG57XG4gICAgbWFyZ2luLWxlZnQ6IDQ5JTt3aWR0aDogMTUwcHg7XG59XG4uZXhidG57XG4gICAgbWFyZ2luLWxlZnQ6IDElO1xuICAgIHdpZHRoOiAxNTBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5O1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBib3JkZXItcmFkaXVzOiAxOXB4O1xufSJdfQ== */";
    /***/
  },

  /***/
  "./src/app/customer-management/customer-management.component.ts":
  /*!**********************************************************************!*\
    !*** ./src/app/customer-management/customer-management.component.ts ***!
    \**********************************************************************/

  /*! exports provided: CustomerManagementComponent */

  /***/
  function srcAppCustomerManagementCustomerManagementComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CustomerManagementComponent", function () {
      return CustomerManagementComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _orbistur_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../orbistur-service.service */
    "./src/app/orbistur-service.service.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _csv_service_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../csv-service.service */
    "./src/app/csv-service.service.ts");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");

    var CustomerManagementComponent =
    /*#__PURE__*/
    function () {
      function CustomerManagementComponent(service, router, formBuilder, csvServiceService, spinner) {
        _classCallCheck(this, CustomerManagementComponent);

        this.service = service;
        this.router = router;
        this.formBuilder = formBuilder;
        this.csvServiceService = csvServiceService;
        this.spinner = spinner;
        this.customerLists = [];
        this.limit = 10;
        this.page = 1;
        this.p = 0;
        this.dataArr = [];
        this.arrayData = [];
        this.order = 'info.name';
        this.reverse = false;
        this.checkBoxValue = true;
        this.checke = false;
        this.marked = false;
        this.theCheckbox = false;
        this.arryFilter = [];
        this.FilteredArray = [];
        this.customerList();
      }

      _createClass(CustomerManagementComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {} //********************Search by name event**************************//

      }, {
        key: "searchValue",
        value: function searchValue(value) {
          this.filterName = value;
          console.log('filterName==>>', this.filterName);
          this.customerLists = [];
          this.customerList();
        } //********************Reset Method******************************//

      }, {
        key: "reset",
        value: function reset() {
          this.filterName = '';
          this.customerList();
        } //********************Customer list Api**************************//

      }, {
        key: "customerList",
        value: function customerList() {
          var _this20 = this;

          this.spinner.show();
          var object = {
            "search": this.filterName,
            "pageNumber": this.page,
            "limit": this.limit
          };
          this.service.postApi('admin/listCustomers', object, 1).subscribe(function (res) {
            console.log('res==>>', res);

            if (res.body.response_code == 200) {
              _this20.spinner.hide();

              _this20.customerLists = res.body.result.docs.map(function (item) {
                var tempObj = item;
                tempObj["isChecked"] = false;
                return tempObj;
              }); // this.customerLists.forEach((ele,ind)=>{
              //   this.customerLists["status"]=false;
              // })

              console.log('customerLists==>>', _this20.customerLists);
              _this20.total = res.body.result.total;
              _this20.sortedCollection = [];
            } else {
              _this20.spinner.hide();
            }
          }, function (error) {
            _this20.spinner.hide();

            _this20.service.toastErr(error.response_message);
          });
        }
      }, {
        key: "changePage",
        value: function changePage(page) {
          console.log('Page ', page);
          this.page = this.page;
          this.p = page - 1;
          this.customerList();
        } // "KYC Submitdate":element.business!=null?element.business.kyc.created_at.slice(0,10):'N/A',
        // ***********************csv*********************//

      }, {
        key: "download",
        value: function download() {
          var dataArr = [];
          console.log('customerLists==>>>', this.customerLists);
          this.customerLists.forEach(function (element, ind) {
            dataArr.push({
              "S no": ind + 1,
              "Name": element.name ? element.name : '',
              "Email address": element.email ? element.email : 'N/A',
              "Mobile number": element.mobileNumber ? element.mobileNumber : 'N/A',
              // "Registration on":element.status=='ACTIVE'?'Active':'Inactive', 
              "Registration on": element.createdAt ? element.createdAt.slice(0, 10) : 'N/A'
            });
          });
          console.log('download=>', dataArr); // if(){
          // }else

          if (dataArr) {
            this.csvServiceService.downloadFile(dataArr, 'dataArr');
          }

          if (this.FilteredArray) {
            this.selectRowdata();
          }
        } // **************************Get id method for delete customer*******************************//

      }, {
        key: "deleteFunction",
        value: function deleteFunction(id) {
          this.user_id = id;
          console.log('user_id', this.user_id);
          $('#modaldelete').modal({
            backdrop: 'static',
            keyboard: false
          });
        } // ***************************Delete method*******************************//

      }, {
        key: "deleteFunctions",
        value: function deleteFunctions() {
          var _this21 = this;

          this.spinner.show();
          this.service.deleteApi('admin/deleteCustomer/' + this.user_id, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this21.customerList();

              _this21.spinner.hide();

              _this21.service.showSuccess("Customer has been deleted successfully.");

              _this21.customerList();
            } else {
              _this21.spinner.hide();

              _this21.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this21.spinner.hide();

            _this21.service.toastErr("Internal server error");
          });
        }
      }, {
        key: "check",
        value: function check(checked, items) {
          this.checke = checked;
          console.log('check', this.check);
          items["active"] = false;
          console.log('filter change called');
          this.items = items;
          this.arrayData.push(items);
          console.log('isChecked', this.arrayData);
        }
      }, {
        key: "selectHandler",
        value: function selectHandler(item) {
          console.log('items_isChecked', item, this.customerLists);
          var tempArray = this.customerLists.map(function (element) {
            if (element._id == item._id) {
              element.isChecked = !element.isChecked;
              return element;
            } else {
              return element;
            }
          });
          this.FilteredArray = tempArray.filter(function (ele) {
            return ele.isChecked;
          });
          console.log("adadfadfadsf", this.FilteredArray);
        } // FieldsChange(values:any,items){
        // //  console.log(values.currentTarget.checked)
        //  items["active"]=values.currentTarget.checked
        //  this.items=items
        //   console.log("this.item==>>",items)
        //   if(this.arrayData.length==0){
        //     this.arrayData.push(items)
        //   }
        //   else{
        //     this.arrayData.map((element,index)=>{
        //       if(element._id==items._id){
        //         // this.arrayData.splice(index,1)
        //         // this.dataArray.pop()
        //       }
        //       else{
        //         this.arrayData.push(items)
        //       }
        //     }
        //       )
        //   }
        //   console.log("this.item==>>>>>>",this.arrayData)
        // //  this.arrayData.push(this.items);
        // //  console.log('isChecked',this.arrayData)
        // //  if(values.currentTarget.checked === true){
        // //  }
        //   // items["active"]=values.currentTarget.checked
        //   // console.log('value',items);
        //   // this.items=items
        //   // this.arrayData.push(items);
        //   // console.log('valuevalue',this.arrayData.active)
        //   // this.arrayData.filter(element=>{
        //   //   if(element.active ===true){
        //   //     this.arryFilter.push(element)
        //   //   }else if(element.active === false){
        //   //     this.arryFilter.pop(element)
        //   //   }
        //   // })
        //   // console.log('arryFilter==>>',this.arryFilter)
        //   }
        // toggleVisibility(e,i){
        //   let marked= e.target.checked;
        //   console.log('marked',marked)
        //   this.customerLists.map((x,index)=>{
        //     if(index == i){
        //       x.theCheckbox = marked;
        //       console.log('customerLists',this.customerLists);
        //     }
        //   })
        // }
        // RowSelected(items){
        //   // console.log('value==>>',value)
        //   // console.log('checkBoxValue',this.checkBoxValue)
        // }

      }, {
        key: "selectRowdata",
        value: function selectRowdata() {
          var dataArry = [];
          console.log('dataArray==>>', this.FilteredArray);
          this.FilteredArray.forEach(function (element, ind) {
            dataArry.push({
              "S no": ind + 1,
              "Name": element.name ? element.name : 'N/A',
              "Email address": element.email ? element.email : 'N/A',
              "Mobile number": element.mobileNumber ? element.mobileNumber : 'N/A',
              // "Registration on":element.status=='ACTIVE'?'Active':'Inactive', 
              "Registration on": element.createdAt ? element.createdAt.slice(0, 10) : 'N/A'
            });
            console.log('download=>', dataArry);
          });
          this.csvServiceService.downloadFile(dataArry, 'dataArr');
        }
      }]);

      return CustomerManagementComponent;
    }();

    CustomerManagementComponent.ctorParameters = function () {
      return [{
        type: _orbistur_service_service__WEBPACK_IMPORTED_MODULE_2__["OrbisturServiceService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"]
      }, {
        type: _csv_service_service__WEBPACK_IMPORTED_MODULE_5__["CsvServiceService"]
      }, {
        type: ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerService"]
      }];
    };

    CustomerManagementComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-customer-management',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./customer-management.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/customer-management/customer-management.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./customer-management.component.css */
      "./src/app/customer-management/customer-management.component.css")).default]
    })], CustomerManagementComponent);
    /***/
  },

  /***/
  "./src/app/dashboard/dashboard.component.css":
  /*!***************************************************!*\
    !*** ./src/app/dashboard/dashboard.component.css ***!
    \***************************************************/

  /*! exports provided: default */

  /***/
  function srcAppDashboardDashboardComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LmNzcyJ9 */";
    /***/
  },

  /***/
  "./src/app/dashboard/dashboard.component.ts":
  /*!**************************************************!*\
    !*** ./src/app/dashboard/dashboard.component.ts ***!
    \**************************************************/

  /*! exports provided: DashboardComponent */

  /***/
  function srcAppDashboardDashboardComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DashboardComponent", function () {
      return DashboardComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var DashboardComponent =
    /*#__PURE__*/
    function () {
      function DashboardComponent() {
        _classCallCheck(this, DashboardComponent);
      }

      _createClass(DashboardComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          localStorage.removeItem('ok');
        }
      }]);

      return DashboardComponent;
    }();

    DashboardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-dashboard',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./dashboard.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/dashboard/dashboard.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./dashboard.component.css */
      "./src/app/dashboard/dashboard.component.css")).default]
    })], DashboardComponent);
    /***/
  },

  /***/
  "./src/app/edit-customer/edit-customer.component.css":
  /*!***********************************************************!*\
    !*** ./src/app/edit-customer/edit-customer.component.css ***!
    \***********************************************************/

  /*! exports provided: default */

  /***/
  function srcAppEditCustomerEditCustomerComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".add{\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: center;\n            justify-content: center;\n}\n\n.btn{\n    width: 100%;\n    max-width: 183px;\n    border-radius: 18px;\n    height: 42px;\n    font-size: 24px;\n    padding: 0px;\n    background-color: #e8ae0cde;\n    border: navajowhite;\n}\n\n.wr{\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: center;\n            justify-content: center;\n    box-shadow: 5px 10px #888888;\n    border: 1px solid;\n}\n\n.bd{\n    width: 48%;\n}\n\n.imgs{\n    border-radius: 100px;\n    width: 150px;\n    height: 150px;\n}\n\n.input#file-input {\n    display: none;\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZWRpdC1jdXN0b21lci9lZGl0LWN1c3RvbWVyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxvQkFBYTtJQUFiLGFBQWE7SUFDYix3QkFBdUI7WUFBdkIsdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksV0FBVztJQUNYLGdCQUFnQjtJQUNoQixtQkFBbUI7SUFDbkIsWUFBWTtJQUNaLGVBQWU7SUFDZixZQUFZO0lBQ1osMkJBQTJCO0lBQzNCLG1CQUFtQjtBQUN2Qjs7QUFDQTtJQUNJLG9CQUFhO0lBQWIsYUFBYTtJQUNiLHdCQUF1QjtZQUF2Qix1QkFBdUI7SUFDdkIsNEJBQTRCO0lBQzVCLGlCQUFpQjtBQUNyQjs7QUFDQTtJQUNJLFVBQVU7QUFDZDs7QUFDQTtJQUNJLG9CQUFvQjtJQUNwQixZQUFZO0lBQ1osYUFBYTtBQUNqQjs7QUFDQTtJQUNJLGFBQWE7RUFDZiIsImZpbGUiOiJzcmMvYXBwL2VkaXQtY3VzdG9tZXIvZWRpdC1jdXN0b21lci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmFkZHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4uYnRue1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1heC13aWR0aDogMTgzcHg7XG4gICAgYm9yZGVyLXJhZGl1czogMThweDtcbiAgICBoZWlnaHQ6IDQycHg7XG4gICAgZm9udC1zaXplOiAyNHB4O1xuICAgIHBhZGRpbmc6IDBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZThhZTBjZGU7XG4gICAgYm9yZGVyOiBuYXZham93aGl0ZTtcbn1cbi53cntcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGJveC1zaGFkb3c6IDVweCAxMHB4ICM4ODg4ODg7XG4gICAgYm9yZGVyOiAxcHggc29saWQ7XG59XG4uYmR7XG4gICAgd2lkdGg6IDQ4JTtcbn1cbi5pbWdze1xuICAgIGJvcmRlci1yYWRpdXM6IDEwMHB4O1xuICAgIHdpZHRoOiAxNTBweDtcbiAgICBoZWlnaHQ6IDE1MHB4O1xufVxuLmlucHV0I2ZpbGUtaW5wdXQge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH0iXX0= */";
    /***/
  },

  /***/
  "./src/app/edit-customer/edit-customer.component.ts":
  /*!**********************************************************!*\
    !*** ./src/app/edit-customer/edit-customer.component.ts ***!
    \**********************************************************/

  /*! exports provided: EditCustomerComponent */

  /***/
  function srcAppEditCustomerEditCustomerComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "EditCustomerComponent", function () {
      return EditCustomerComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _orbistur_service_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../orbistur-service.service */
    "./src/app/orbistur-service.service.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");

    var EditCustomerComponent =
    /*#__PURE__*/
    function () {
      function EditCustomerComponent(service, router, formbuilder, activate, spinner) {
        _classCallCheck(this, EditCustomerComponent);

        this.service = service;
        this.router = router;
        this.formbuilder = formbuilder;
        this.activate = activate;
        this.spinner = spinner;
      }

      _createClass(EditCustomerComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this22 = this;

          this.editCustomerForm = this.formbuilder.group({
            'name': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(60), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(2), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern("[a-zA-Z ]*")])],
            'email': ["", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(60), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)])],
            'number': ["", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(16), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern(/^[1-9][0-9]{9}$/)])],
            'password': ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(8), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(16), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i)]],
            'confirmPassword': [''],
            'address': ["", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(256)])]
          });
          this.activate.params.subscribe(function (res) {
            _this22.customer_id = res._id;
            console.log('customer_id==>>', _this22.customer_id);
          });
          this.viewCustomer();
          this.phoneCheckCountry();
        } // *************************mobile number method**************//

      }, {
        key: "phoneCheckCountry",
        value: function phoneCheckCountry() {
          $("#phoneNumber").intlTelInput({
            autoPlaceholder: false,
            autoFormat: false,
            autoHideDialCode: false,
            initialCountry: 'in',
            nationalMode: false,
            onlyCountries: [],
            // preferredCountries: ["us"],
            formatOnInit: true,
            separateDialCode: true,
            formatOnDisplay: false
          });
        }
      }, {
        key: "toCheckSpaceChar",
        value: function toCheckSpaceChar() {
          this.isValidNumber = $('#phoneNumber').intlTelInput('isValidNumber');
          var countryData = $('#phoneNumber').intlTelInput('getSelectedCountryData');
          this.myCode = "+" + countryData.dialCode;
        } // ****************************View customer id*************************//

      }, {
        key: "viewCustomer",
        value: function viewCustomer() {
          var _this23 = this;

          var object = {
            "customerId": this.customer_id
          };
          this.service.postApi('admin/viewCustomer', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this23.spinner.hide();

              _this23.patchvalues = res.body.result;
              console.log('patchvalues==>>', _this23.patchvalues.name);

              _this23.editCustomerForm.patchValue({
                'name': _this23.patchvalues.name,
                'email': _this23.patchvalues.email,
                'number': _this23.patchvalues.mobileNumber,
                'address': _this23.patchvalues.address
              });
            } else {
              _this23.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this23.service.toastErr("Internal server error");
          });
        } // ***********************Image upload event************************//

      }, {
        key: "handleInputChange",
        value: function handleInputChange(e) {
          var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
          var pattern = /image-*/;
          var reader = new FileReader();

          if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
          }

          reader.onload = this._handleReaderLoaded.bind(this);
          reader.readAsDataURL(file);
        }
      }, {
        key: "_handleReaderLoaded",
        value: function _handleReaderLoaded(e) {
          var reader = e.target;
          this.profile = reader.result;
          console.log("profile", this.profile);
        } // ***********************Edit Customer Api*************************//

      }, {
        key: "editCustomer",
        value: function editCustomer() {
          var _this24 = this;

          this.spinner.show();
          var object = {
            'customerId': this.customer_id,
            'name': this.editCustomerForm.value.name,
            'email': this.editCustomerForm.value.email,
            'mobileNumber': this.editCustomerForm.value.number,
            'password': this.editCustomerForm.value.password,
            'confirmPassword': this.editCustomerForm.value.confirmPassword,
            'address': this.editCustomerForm.value.address,
            'profilePic': this.profile
          };
          console.log('object==>>', object);
          this.service.putApi('admin/editCustomer', object, 1).subscribe(function (res) {
            console.log('resss==>>', res);

            if (res.body.response_code == 200) {
              _this24.spinner.hide();

              _this24.service.showSuccess("Customer has been updated successfully.");

              _this24.router.navigate(['customer-management']);
            } else {
              _this24.spinner.hide();

              _this24.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this24.spinner.hide();

            _this24.service.toastErr(error.response_message);
          });
        }
      }]);

      return EditCustomerComponent;
    }();

    EditCustomerComponent.ctorParameters = function () {
      return [{
        type: _orbistur_service_service__WEBPACK_IMPORTED_MODULE_3__["OrbisturServiceService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]
      }, {
        type: ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"]
      }];
    };

    EditCustomerComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-edit-customer',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./edit-customer.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/edit-customer/edit-customer.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./edit-customer.component.css */
      "./src/app/edit-customer/edit-customer.component.css")).default]
    })], EditCustomerComponent);
    /***/
  },

  /***/
  "./src/app/edit-destination/edit-destination.component.css":
  /*!*****************************************************************!*\
    !*** ./src/app/edit-destination/edit-destination.component.css ***!
    \*****************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppEditDestinationEditDestinationComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".imgg{\n    width: 150px;\n    height: 150px;\n    border-radius: 88px;\n}\n.btn{\n    float: right;\n}\n.btn-success{\n    width: 150px;\n    border-radius: 16px;\n}\n.imagebtn{\n    text-transform: none;\n    /* margin-left: 2%; */\n    width: 144px;\n    height: 36px;\n    border-radius: 21px;\n    background-color: #4db94d;\n    color: white;\n}\n.optionals{\n    font-weight: lighter;\n    font-size: 15px;\n    color: gray;\n}\n.updateBtn{\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: center;\n            justify-content: center;\n    /* padding-top: 17px; */\n    padding: 17px;\n}\n.upd{\n    width: 100%;\n    max-width: 150px;\n    height: 34px;\n    border-radius: 14px;\n    /* border-bottom-color: green; */\n    background-color: green;\n    color: white;\n}\n.description{\n    display: -webkit-box;\n    display: flex;\n}\n.tbtbtb{\n    display: -webkit-box;\n    display: flex;\n    justify-content: space-around;\n}\n.selects {\n    width: 100%;\n    max-width: 193px;\n    margin-left: 21px;\n}\n.inptdestination {\n    width: 100%;\n    max-width: 161px;\n    margin-left: 16px;\n}\n.insur{\n    margin-left: 12px;\n    width: 100%;\n    max-width: 194px;\n}\n.titles{\n    display: -webkit-box;\n    display: flex;\n    margin-left: 32px;\n    padding-top: 23px;\n}\n.ipt{\n    width: 100%;\n    margin-left: 24px;\n    max-width: 255px;\n}\n.activeinactiv{\n    margin-top: 20px;\n    margin-left: 20px;\n\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZWRpdC1kZXN0aW5hdGlvbi9lZGl0LWRlc3RpbmF0aW9uLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxZQUFZO0lBQ1osYUFBYTtJQUNiLG1CQUFtQjtBQUN2QjtBQUNBO0lBQ0ksWUFBWTtBQUNoQjtBQUNBO0lBQ0ksWUFBWTtJQUNaLG1CQUFtQjtBQUN2QjtBQUVBO0lBQ0ksb0JBQW9CO0lBQ3BCLHFCQUFxQjtJQUNyQixZQUFZO0lBQ1osWUFBWTtJQUNaLG1CQUFtQjtJQUNuQix5QkFBeUI7SUFDekIsWUFBWTtBQUNoQjtBQUNBO0lBQ0ksb0JBQW9CO0lBQ3BCLGVBQWU7SUFDZixXQUFXO0FBQ2Y7QUFDQTtJQUNJLG9CQUFhO0lBQWIsYUFBYTtJQUNiLHdCQUF1QjtZQUF2Qix1QkFBdUI7SUFDdkIsdUJBQXVCO0lBQ3ZCLGFBQWE7QUFDakI7QUFFQTtJQUNJLFdBQVc7SUFDWCxnQkFBZ0I7SUFDaEIsWUFBWTtJQUNaLG1CQUFtQjtJQUNuQixnQ0FBZ0M7SUFDaEMsdUJBQXVCO0lBQ3ZCLFlBQVk7QUFDaEI7QUFDQTtJQUNJLG9CQUFhO0lBQWIsYUFBYTtBQUNqQjtBQUNBO0lBQ0ksb0JBQWE7SUFBYixhQUFhO0lBQ2IsNkJBQTZCO0FBQ2pDO0FBRUE7SUFDSSxXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtBQUNyQjtBQUNBO0lBQ0ksV0FBVztJQUNYLGdCQUFnQjtJQUNoQixpQkFBaUI7QUFDckI7QUFDQTtJQUNJLGlCQUFpQjtJQUNqQixXQUFXO0lBQ1gsZ0JBQWdCO0FBQ3BCO0FBQ0E7SUFDSSxvQkFBYTtJQUFiLGFBQWE7SUFDYixpQkFBaUI7SUFDakIsaUJBQWlCO0FBQ3JCO0FBQ0E7SUFDSSxXQUFXO0lBQ1gsaUJBQWlCO0lBQ2pCLGdCQUFnQjtBQUNwQjtBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGlCQUFpQjs7QUFFckIiLCJmaWxlIjoic3JjL2FwcC9lZGl0LWRlc3RpbmF0aW9uL2VkaXQtZGVzdGluYXRpb24uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5pbWdne1xuICAgIHdpZHRoOiAxNTBweDtcbiAgICBoZWlnaHQ6IDE1MHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDg4cHg7XG59XG4uYnRue1xuICAgIGZsb2F0OiByaWdodDtcbn1cbi5idG4tc3VjY2Vzc3tcbiAgICB3aWR0aDogMTUwcHg7XG4gICAgYm9yZGVyLXJhZGl1czogMTZweDtcbn1cblxuLmltYWdlYnRue1xuICAgIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICAgIC8qIG1hcmdpbi1sZWZ0OiAyJTsgKi9cbiAgICB3aWR0aDogMTQ0cHg7XG4gICAgaGVpZ2h0OiAzNnB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDIxcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRkYjk0ZDtcbiAgICBjb2xvcjogd2hpdGU7XG59XG4ub3B0aW9uYWxze1xuICAgIGZvbnQtd2VpZ2h0OiBsaWdodGVyO1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICBjb2xvcjogZ3JheTtcbn1cbi51cGRhdGVCdG57XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAvKiBwYWRkaW5nLXRvcDogMTdweDsgKi9cbiAgICBwYWRkaW5nOiAxN3B4O1xufVxuXG4udXBke1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1heC13aWR0aDogMTUwcHg7XG4gICAgaGVpZ2h0OiAzNHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDE0cHg7XG4gICAgLyogYm9yZGVyLWJvdHRvbS1jb2xvcjogZ3JlZW47ICovXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW47XG4gICAgY29sb3I6IHdoaXRlO1xufVxuLmRlc2NyaXB0aW9ue1xuICAgIGRpc3BsYXk6IGZsZXg7XG59XG4udGJ0YnRie1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG59XG5cbi5zZWxlY3RzIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXgtd2lkdGg6IDE5M3B4O1xuICAgIG1hcmdpbi1sZWZ0OiAyMXB4O1xufVxuLmlucHRkZXN0aW5hdGlvbiB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWF4LXdpZHRoOiAxNjFweDtcbiAgICBtYXJnaW4tbGVmdDogMTZweDtcbn1cbi5pbnN1cntcbiAgICBtYXJnaW4tbGVmdDogMTJweDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXgtd2lkdGg6IDE5NHB4O1xufVxuLnRpdGxlc3tcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIG1hcmdpbi1sZWZ0OiAzMnB4O1xuICAgIHBhZGRpbmctdG9wOiAyM3B4O1xufVxuLmlwdHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW4tbGVmdDogMjRweDtcbiAgICBtYXgtd2lkdGg6IDI1NXB4O1xufVxuXG4uYWN0aXZlaW5hY3RpdntcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xuICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xuXG59Il19 */";
    /***/
  },

  /***/
  "./src/app/edit-destination/edit-destination.component.ts":
  /*!****************************************************************!*\
    !*** ./src/app/edit-destination/edit-destination.component.ts ***!
    \****************************************************************/

  /*! exports provided: EditDestinationComponent */

  /***/
  function srcAppEditDestinationEditDestinationComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "EditDestinationComponent", function () {
      return EditDestinationComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _orbistur_service_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../orbistur-service.service */
    "./src/app/orbistur-service.service.ts");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");

    var EditDestinationComponent =
    /*#__PURE__*/
    function () {
      // tab: string;
      // id: string;
      function EditDestinationComponent(service, formBuilder, spinner, router, activate) {
        _classCallCheck(this, EditDestinationComponent);

        this.service = service;
        this.formBuilder = formBuilder;
        this.spinner = spinner;
        this.router = router;
        this.activate = activate;
        this.tab = 'Destination';
        this.countryList = [];
        this.limit = 10;
        this.page = 1;
        this.p = 0;
        this.countryName = [];
      }

      _createClass(EditDestinationComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this25 = this;

          this.activate.params.subscribe(function (res) {
            console.log('res==>>', res);
            _this25.id = res.id, _this25.val = Number(res.val);
            _this25.val1 = Number(res.val1); // console.log('val1----->>>',this.val1)

            _this25.tabChangedFunc(_this25.val);

            console.log('val1----->>>', _this25.val);
          }); // ["",Validators.compose([Validators.required, Validators.maxLength(60),Validators.pattern(/^[A-CEGHJ-PR-TW-Z]{1}[A-CEGHJ-NPR-TW-Z]{1}[0-9]{6}[A-DFM]{0,1}$/)])],

          this.destinationForm = this.formBuilder.group({
            'country': [''],
            'destination': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(60)])],
            'insurance': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(20), _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern(/^-?(?:0|[1-9]\d{0,2}(?:,?\d{3})*)(?:\.\d+)?$/)])],
            'activeInsurance': ['ACTIVE']
          });
          this.bannerForm = this.formBuilder.group({
            'activeInsurance': ['ACTIVE'],
            'title': ["", _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(20)])]
          });
          this.editorForm = this.formBuilder.group({
            'title': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(20)])],
            'description': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(512)])]
          });
          this.getCountry();
          this.viewDestination();
          this.viewwebsite();
          this.viewbanner();
          this.getContentList();
          this.addBannerList();
          this.destinationList();
        } // *******************Country List ********************//

      }, {
        key: "getCountry",
        value: function getCountry() {
          var _this26 = this;

          var object = {
            "search": null
          };
          this.service.postApi('admin/countryList', object, 1).subscribe(function (res) {
            _this26.countryList = res.body.result.docs;
            console.log('countryListJson', _this26.countryList);
          });
        } // *************************get destination********************//

      }, {
        key: "viewDestination",
        value: function viewDestination() {
          var _this27 = this;

          this.service.getApi('admin/viewDestination/' + this.id, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this27.spinner.hide();

              _this27.viewdestinationData = res.body.result;
              console.log('ressview===>>>', _this27.viewdestinationData);

              _this27.destinationForm.patchValue({
                'country': _this27.viewdestinationData.countryId,
                'destination': _this27.viewdestinationData.destination,
                'insurance': _this27.viewdestinationData.insurance,
                'activeInsurance': _this27.viewdestinationData.status
              });
            } else {
              _this27.spinner.hide(); // this.service.toastErr(res.body.response_message)

            }
          }, function (error) {
            _this27.spinner.hide();

            _this27.service.toastErr(error.response_message);
          });
        } // ***********************Destination Add Api*****************//

      }, {
        key: "updateDestination",
        value: function updateDestination() {
          var _this28 = this;

          console.log('addDestination==>>', this.destinationForm.value.activeInsurance);
          this.spinner.show();
          var object = {
            'destinationId': this.viewdestinationData._id,
            'countryId': this.destinationForm.value.country,
            'destination': this.destinationForm.value.destination,
            'insurance': this.destinationForm.value.insurance,
            'status': this.destinationForm.value.activeInsurance
          };
          console.log('object==>>', object);
          this.service.putApi('admin/editDestination', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this28.spinner.hide();

              _this28.service.showSuccess("Destination has been updated successfully.");

              _this28.router.navigate(['content-destination']);
            } else {
              _this28.spinner.hide(); // this.service.toastErr(res.body.response_message)

            }
          }, function (error) {
            _this28.spinner.hide();

            _this28.service.toastErr(error.response_message);
          });
        } // *************************get viewwebsite********************//

      }, {
        key: "viewwebsite",
        value: function viewwebsite() {
          var _this29 = this;

          var object = {
            'staticId': this.id
          };
          this.service.postApi('static/viewStaticContent', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this29.spinner.hide();

              _this29.viewwebsiteData = res.body.result;
              console.log('viewwebsiteData===>>>', _this29.viewwebsiteData);

              _this29.editorForm.patchValue({
                'title': _this29.viewwebsiteData.title,
                'description': _this29.viewwebsiteData.description
              });
            } else {
              _this29.spinner.hide();
            }
          }, function (error) {
            _this29.spinner.hide();

            _this29.service.toastErr(error.response_message);
          });
        } // *************************get viewwebsite********************//

      }, {
        key: "updatewebsite",
        value: function updatewebsite() {
          var _this30 = this;

          var object = {
            'staticId': this.id,
            'title': this.editorForm.value.title,
            'description': this.editorForm.value.description
          };
          console.log('updatewebsite==>>', object);
          this.service.postApi('static/editStaticContent', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this30.spinner.hide();

              _this30.service.showSuccess("Destination has been updated successfully.");

              var tab = '1';

              _this30.router.navigate(['content-destination', {
                val: 1
              }]);
            } else {
              _this30.spinner.hide();

              _this30.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this30.spinner.hide();

            _this30.service.toastErr(error.response_message);
          });
        } // *************************get banner********************//

      }, {
        key: "viewbanner",
        value: function viewbanner() {
          var _this31 = this;

          this.service.getApi('admin/viewBanner/' + this.id, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this31.spinner.hide();

              _this31.viewbannerData = res.body.result;
              _this31.bannerImage = res.body.result.bannerPic;
              console.log('bannerImage===>>>', _this31.bannerImage);
              console.log('viewbannerData===>>>', _this31.viewbannerData);

              _this31.bannerForm.patchValue({
                'activeInsurance': _this31.viewbannerData.status,
                'title': _this31.viewbannerData.title
              });
            } else {
              _this31.spinner.hide();
            }
          }, function (error) {
            _this31.spinner.hide();

            _this31.service.toastErr(error.response_message);
          });
        } // *************************get viewwebsite********************//

      }, {
        key: "updatebanner",
        value: function updatebanner() {
          var _this32 = this;

          var object = {
            'bannerId': this.id,
            'title': this.bannerForm.value.title,
            'status': this.bannerForm.value.activeInsurance
          };
          console.log('objectbanner', object);
          this.service.putApi('admin/editBanner', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this32.spinner.hide();

              _this32.service.showSuccess("Banner has been updated successfully.");

              _this32.router.navigate(['content-destination', {
                val: 2
              }]);
            } else {
              _this32.spinner.hide();

              _this32.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this32.spinner.hide();

            _this32.service.toastErr(error.response_message);
          });
        }
      }, {
        key: "searchValue",
        value: function searchValue(value) {
          this.filterName = value;
        }
      }, {
        key: "selectStatus",
        value: function selectStatus(value) {
          this.status = value;
          console.log('staatus==>>', this.status);
        } // ***************************Image upload 64base******************//

      }, {
        key: "handleInputChange",
        value: function handleInputChange(e) {
          var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
          var pattern = /image-*/;
          var reader = new FileReader();

          if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
          }

          reader.onload = this._handleReaderLoaded.bind(this);
          reader.readAsDataURL(file);
        }
      }, {
        key: "_handleReaderLoaded",
        value: function _handleReaderLoaded(e) {
          var reader = e.target;
          this.imageSrc = reader.result;
        }
      }, {
        key: "tabChangedFunc",
        value: function tabChangedFunc(val) {
          // this.val = val
          switch (val) {
            case 0:
              this.tab = 'Destination'; // this.getactivejob();

              break;

            case 1:
              this.tab = 'Website'; // this.getappliedjob();

              break;

            case 2:
              this.tab = 'Banners'; // this.getpendingjob();

              break;
          }
        } // ****************************Add Banner Api***********************//

      }, {
        key: "addBanner",
        value: function addBanner() {
          var _this33 = this;

          this.spinner.show();
          var object = {
            'title': this.bannerForm.value.title,
            'bannerPic': this.imageSrc,
            'status': this.bannerForm.value.activebanner
          };
          this.service.postApi('admin/addBanner', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this33.spinner.hide();

              _this33.service.showSuccess(res.body.response_message);
            } else {
              _this33.spinner.hide();

              _this33.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this33.spinner.hide();

            _this33.service.toastErr(error.response_message);
          });
        }
      }, {
        key: "searchValues",
        value: function searchValues(value) {
          this.filterName = value;
          this.contentList = [];
          this.bannerList = [];
          this.destnList = [];
        }
      }, {
        key: "selectStatuss",
        value: function selectStatuss(value) {
          var _this34 = this;

          this.status = value;
          console.log('staatus==>>', this.status);

          if (this.status == 'ACTIVE' || this.status == 'INACTIVE') {
            this.getContentList();
            this.destinationList(); // this.getContentList();

            this.addBannerList();
          } else if (this.status == 'ALL') {
            // this.getContentList();
            this.filterName = '';
            this.page = 1;
            this.limit = 10;
            this.status = null;
            setTimeout(function () {
              _this34.getContentList(); // this.getContentList()


              _this34.addBannerList();

              _this34.destinationList();
            }, 100);
          }
        } //***************************Static Content List ***********************//

      }, {
        key: "getContentList",
        value: function getContentList() {
          var _this35 = this;

          var object = {
            "search": this.filterName,
            "status": this.status
          };
          this.service.postApi('static/staticContentList', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this35.spinner.hide();

              _this35.contentList = res.body.result.docs ? res.body.result.docs : res.body.result; //  this._id=this.contentList.filter(x=>x._id).map(x=>x._id)
              //  console.log('getContentList==>>>',this.contentList)
              //  console.log('this._id',this._id)
            } else {
              _this35.spinner.hide();
            }
          }, function (error) {
            _this35.spinner.hide();

            _this35.service.toastErr(error.response_message);
          });
        }
      }, {
        key: "changePage",
        value: function changePage(page) {
          console.log('Page ', page);
          this.page = this.page;
          this.p = page - 1;
          this.getContentList();
          this.destinationList(); // this.addBannerList()   
        } //*************************Add banner List******************************//

      }, {
        key: "addBannerList",
        value: function addBannerList() {
          var _this36 = this;

          this.spinner.show();
          var object = {
            'status': this.status,
            'pageNumber': this.page,
            'limit': this.limit
          };
          this.service.postApi('admin/bannerList', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this36.spinner.hide();

              _this36.bannerList = res.body.result.docs;
              console.log('bannerList', _this36.bannerList);
            } else {
              _this36.spinner.hide();

              _this36.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this36.spinner.hide();

            _this36.service.toastErr(error.response_message);
          });
        } // *********************DestinationList api*********************//

      }, {
        key: "destinationList",
        value: function destinationList() {
          var _this37 = this;

          var object = {
            'search': this.filterName,
            'status': this.status,
            'page': this.page,
            'limit': this.limit
          };
          this.service.postApi('admin/destinationList', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this37.spinner.hide(); // this.getName()


              _this37.destnList = res.body.result.docs ? res.body.result.docs : res.body.result;
            } else {
              _this37.spinner.hide();
            }
          }, function (error) {
            _this37.spinner.hide();

            _this37.service.toastErr(error.response_message);
          });
        } // **************************banner id method for delete customer*******************************//

      }, {
        key: "deletebanner",
        value: function deletebanner(id) {
          this.banner_id = id;
          console.log('banner_id', this.banner_id);
          $('#bannermodaldelete').modal({
            backdrop: 'static',
            keyboard: false
          });
        } // ***************************Delete method*******************************//

      }, {
        key: "deletebanners",
        value: function deletebanners() {
          var _this38 = this;

          this.service.deleteApi('admin/deleteBanner/' + this.banner_id, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this38.spinner.hide();

              _this38.addBannerList();

              _this38.service.showSuccess(res.body.response_message);
            } else {
              _this38.spinner.hide();

              _this38.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this38.spinner.hide();

            _this38.service.toastErr("Internal server error");
          });
        }
      }, {
        key: "editIdWebsite",
        value: function editIdWebsite(_id) {
          this.id = _id;
          this.viewwebsite();
          this.viewDestination();
          this.viewbanner();
          console.log('editIdWebsite==>>', this.id);
        }
      }]);

      return EditDestinationComponent;
    }();

    EditDestinationComponent.ctorParameters = function () {
      return [{
        type: _orbistur_service_service__WEBPACK_IMPORTED_MODULE_4__["OrbisturServiceService"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"]
      }, {
        type: ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]
      }];
    };

    EditDestinationComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-edit-destination',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./edit-destination.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/edit-destination/edit-destination.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./edit-destination.component.css */
      "./src/app/edit-destination/edit-destination.component.css")).default]
    })], EditDestinationComponent);
    /***/
  },

  /***/
  "./src/app/edit-package-management/edit-package-management.component.css":
  /*!*******************************************************************************!*\
    !*** ./src/app/edit-package-management/edit-package-management.component.css ***!
    \*******************************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppEditPackageManagementEditPackageManagementComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".add{\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: center;\n            justify-content: center;\n    padding: 8%;\n}\n\n.btn{\n    width: 100%;\n    max-width: 183px;\n    border-radius: 18px;\n    height: 42px;\n    font-size: 24px;\n    padding: 0px;\n    background-color: #e8ae0cde!important;\n    border: navajowhite;\n}\n\n.wr{\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: center;\n            justify-content: center;\n    box-shadow: 5px 10px #888888;\n    border: 1px solid;\n}\n\n.bd{\n    width: 48%;\n}\n\n.imgs{\n    border-radius: 100px;\n    width: 150px;\n    height: 150px;\n}\n\n.input#file-input {\n    display: none;\n  }\n\n.event1{\n    margin-left: 71px;\n  }\n\n.event2{\n    margin-left: 80px;\n}\n\n.event3{\n    margin-left: 80px;\n}\n\n.event4{\n    margin-left: 54px;\n}\n\n.event5{\n    margin-left: 81px;\n}\n\n.event6{\n    margin-left: 80px;\n}\n\nul.skip-search {\n    padding: 0px;\n    margin: 0px;\n    list-style: none;\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n            justify-content: center;\n}\n\n.margin{\n    margin: 0;\n    margin-bottom: 3%;\n}\n\n.outer_box{\n    width: 100%;\n    height: 150px;\n    border: 1px solid rgb(193, 186, 186)\n}\n\n.title{\n    width: 100%;\n    text-align: center;\n}\n\n.table {\n    /* width: 100%;\n    margin-bottom: 1rem;\n    color: #212529;\n    max-width: 90%;\n    border: 1px solid; */\n    text-align: center;\n    /* margin-left: 34px; */\n}\n\ntd{\n    border: 1px solid lightgray\n}\n\n.table-responsive{\n    margin-left: 34px;\n    width: 100%;\n    max-width: 90%;\n}\n\ninput[type=file] {\n    display: none;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZWRpdC1wYWNrYWdlLW1hbmFnZW1lbnQvZWRpdC1wYWNrYWdlLW1hbmFnZW1lbnQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLG9CQUFhO0lBQWIsYUFBYTtJQUNiLHdCQUF1QjtZQUF2Qix1QkFBdUI7SUFDdkIsV0FBVztBQUNmOztBQUVBO0lBQ0ksV0FBVztJQUNYLGdCQUFnQjtJQUNoQixtQkFBbUI7SUFDbkIsWUFBWTtJQUNaLGVBQWU7SUFDZixZQUFZO0lBQ1oscUNBQXFDO0lBQ3JDLG1CQUFtQjtBQUN2Qjs7QUFDQTtJQUNJLG9CQUFhO0lBQWIsYUFBYTtJQUNiLHdCQUF1QjtZQUF2Qix1QkFBdUI7SUFDdkIsNEJBQTRCO0lBQzVCLGlCQUFpQjtBQUNyQjs7QUFDQTtJQUNJLFVBQVU7QUFDZDs7QUFDQTtJQUNJLG9CQUFvQjtJQUNwQixZQUFZO0lBQ1osYUFBYTtBQUNqQjs7QUFDQTtJQUNJLGFBQWE7RUFDZjs7QUFDQTtJQUNFLGlCQUFpQjtFQUNuQjs7QUFDQTtJQUNFLGlCQUFpQjtBQUNyQjs7QUFDQTtJQUNJLGlCQUFpQjtBQUNyQjs7QUFDQTtJQUNJLGlCQUFpQjtBQUNyQjs7QUFDQTtJQUNJLGlCQUFpQjtBQUNyQjs7QUFDQTtJQUNJLGlCQUFpQjtBQUNyQjs7QUFHQTtJQUNJLFlBQVk7SUFDWixXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLG9CQUFhO0lBQWIsYUFBYTtJQUNiLHlCQUFtQjtZQUFuQixtQkFBbUI7SUFDbkIsd0JBQXVCO1lBQXZCLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLFNBQVM7SUFDVCxpQkFBaUI7QUFDckI7O0FBQ0E7SUFDSSxXQUFXO0lBQ1gsYUFBYTtJQUNiO0FBQ0o7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsa0JBQWtCO0FBQ3RCOztBQUNBO0lBQ0k7Ozs7d0JBSW9CO0lBQ3BCLGtCQUFrQjtJQUNsQix1QkFBdUI7QUFDM0I7O0FBQ0E7SUFDSTtBQUNKOztBQUNBO0lBQ0ksaUJBQWlCO0lBQ2pCLFdBQVc7SUFDWCxjQUFjO0FBQ2xCOztBQUNBO0lBQ0ksYUFBYTtBQUNqQiIsImZpbGUiOiJzcmMvYXBwL2VkaXQtcGFja2FnZS1tYW5hZ2VtZW50L2VkaXQtcGFja2FnZS1tYW5hZ2VtZW50LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYWRke1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgcGFkZGluZzogOCU7XG59XG5cbi5idG57XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWF4LXdpZHRoOiAxODNweDtcbiAgICBib3JkZXItcmFkaXVzOiAxOHB4O1xuICAgIGhlaWdodDogNDJweDtcbiAgICBmb250LXNpemU6IDI0cHg7XG4gICAgcGFkZGluZzogMHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNlOGFlMGNkZSFpbXBvcnRhbnQ7XG4gICAgYm9yZGVyOiBuYXZham93aGl0ZTtcbn1cbi53cntcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGJveC1zaGFkb3c6IDVweCAxMHB4ICM4ODg4ODg7XG4gICAgYm9yZGVyOiAxcHggc29saWQ7XG59XG4uYmR7XG4gICAgd2lkdGg6IDQ4JTtcbn1cbi5pbWdze1xuICAgIGJvcmRlci1yYWRpdXM6IDEwMHB4O1xuICAgIHdpZHRoOiAxNTBweDtcbiAgICBoZWlnaHQ6IDE1MHB4O1xufVxuLmlucHV0I2ZpbGUtaW5wdXQge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbiAgLmV2ZW50MXtcbiAgICBtYXJnaW4tbGVmdDogNzFweDtcbiAgfVxuICAuZXZlbnQye1xuICAgIG1hcmdpbi1sZWZ0OiA4MHB4O1xufVxuLmV2ZW50M3tcbiAgICBtYXJnaW4tbGVmdDogODBweDtcbn1cbi5ldmVudDR7XG4gICAgbWFyZ2luLWxlZnQ6IDU0cHg7XG59XG4uZXZlbnQ1e1xuICAgIG1hcmdpbi1sZWZ0OiA4MXB4O1xufVxuLmV2ZW50NntcbiAgICBtYXJnaW4tbGVmdDogODBweDtcbn1cblxuXG51bC5za2lwLXNlYXJjaCB7XG4gICAgcGFkZGluZzogMHB4O1xuICAgIG1hcmdpbjogMHB4O1xuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4ubWFyZ2lue1xuICAgIG1hcmdpbjogMDtcbiAgICBtYXJnaW4tYm90dG9tOiAzJTtcbn1cbi5vdXRlcl9ib3h7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxNTBweDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMTkzLCAxODYsIDE4Nilcbn1cblxuLnRpdGxle1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi50YWJsZSB7XG4gICAgLyogd2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbiAgICBjb2xvcjogIzIxMjUyOTtcbiAgICBtYXgtd2lkdGg6IDkwJTtcbiAgICBib3JkZXI6IDFweCBzb2xpZDsgKi9cbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgLyogbWFyZ2luLWxlZnQ6IDM0cHg7ICovXG59XG50ZHtcbiAgICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXlcbn1cbi50YWJsZS1yZXNwb25zaXZle1xuICAgIG1hcmdpbi1sZWZ0OiAzNHB4O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1heC13aWR0aDogOTAlO1xufVxuaW5wdXRbdHlwZT1maWxlXSB7XG4gICAgZGlzcGxheTogbm9uZTtcbn1cbiJdfQ== */";
    /***/
  },

  /***/
  "./src/app/edit-package-management/edit-package-management.component.ts":
  /*!******************************************************************************!*\
    !*** ./src/app/edit-package-management/edit-package-management.component.ts ***!
    \******************************************************************************/

  /*! exports provided: EditPackageManagementComponent */

  /***/
  function srcAppEditPackageManagementEditPackageManagementComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "EditPackageManagementComponent", function () {
      return EditPackageManagementComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");
    /* harmony import */


    var _orbistur_service_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../orbistur-service.service */
    "./src/app/orbistur-service.service.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _csv_service_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../csv-service.service */
    "./src/app/csv-service.service.ts");

    var EditPackageManagementComponent =
    /*#__PURE__*/
    function () {
      function EditPackageManagementComponent(service, router, formBuilder, csvServiceService, spinner, param) {
        var _this39 = this;

        _classCallCheck(this, EditPackageManagementComponent);

        this.service = service;
        this.router = router;
        this.formBuilder = formBuilder;
        this.csvServiceService = csvServiceService;
        this.spinner = spinner;
        this.param = param;
        this.store = [];
        this.editorValue = '';
        this.param.params.subscribe(function (success) {
          console.log("succeghdfgss", success);
          _this39.id = success._id;
        });
      }

      _createClass(EditPackageManagementComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.formvalidation();
          this.viewData();
        } // *************************Image upload event****************//

      }, {
        key: "handleInputChange",
        value: function handleInputChange(e) {
          var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
          var pattern = /image-*/;
          var reader = new FileReader();

          if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
          }

          reader.onload = this._handleReaderLoaded.bind(this);
          reader.readAsDataURL(file);
        }
      }, {
        key: "_handleReaderLoaded",
        value: function _handleReaderLoaded(e) {
          var reader = e.target;
          this.profile = reader.result;
          console.log("profile", this.profile);
        }
      }, {
        key: "formvalidation",
        value: function formvalidation() {
          this.addpackageForm = this.formBuilder.group({
            'country': [''],
            'destination': [''],
            'packagetype': [''],
            'packagename': [''],
            'packagedays': [''],
            'packagenight': [''],
            'packagedescription': [''],
            'Itinery': [''],
            'Packageinclusions': [''],
            'Exclusions': [''],
            'Terms': [''],
            'Packagecost': [''],
            'Cancellationcharges': [''],
            'flightsincluded': [''],
            'Hotelsincluded': [''],
            'Transfersincluded': [''],
            'Transferscategory': [''],
            'Transferstype': [''],
            'Cartype': [''],
            'Sightseeingincluded': [''],
            'Ownername': [''],
            'Ownercontact': [''],
            'Pricepernight': [''],
            'Status': [''],
            'active': [''],
            'Inactive': ['']
          });
        }
      }, {
        key: "viewData",
        value: function viewData() {
          var _this40 = this;

          this.service.getApi('admin/viewPackage/' + this.id, 1).subscribe(function (res) {
            console.log("hhhhhhhhh=======>", res);
            _this40.store = res.body.result; // console.log('ress===>>',this.store)

            if (res.body.response_code == 200) {
              _this40.spinner.hide();

              _this40.service.showSuccess(res.body.response_message);

              _this40.store = res.body.result;
              console.log('viewvalue===========>>', _this40.store);

              _this40.addpackageForm.patchValue({
                "packagePicture": _this40.profile,
                "country": _this40.store.country,
                "destinationId": _this40.store.countryId,
                "packageTypeId": _this40.store.packagetype,
                "transferTypeId": [_this40.store.Transferstype],
                "transferCategoryId": [_this40.store.Transferscategory],
                "carTypeId": [_this40.store.Cartype],
                "packagename": _this40.store.country,
                "packageDays": _this40.store.packagedays,
                "packageNights": _this40.store.packagenight,
                "packageDescription": _this40.editorValue,
                "flightsIncluded": _this40.store.value.flightsincluded,
                "hotelsIncluded": _this40.store.value.Hotelsincluded,
                "transferIncluded": _this40.store.value.Transfersincluded,
                "sightseeingIncluded": _this40.store.value.Sightseeingincluded,
                "ownerName": _this40.store.value.Ownername,
                "ownerContact": _this40.store.value.Ownercontact,
                "pricePerNight": _this40.store.value.Pricepernight,
                "itinery": [{
                  'arrive': "9",
                  'meal': "9",
                  'description': 'jhb'
                }, {
                  'arrive': "0",
                  'meal': "9",
                  'description': 'kjj'
                }],
                "exclusions": [_this40.store.value.Exclusions],
                "packageInclusion": [_this40.store.value.Packageinclusions],
                "termsAndConditions": _this40.store.value.Terms,
                "packageCost": [{
                  'hotelCategory': "9",
                  'hotelName': 'ads',
                  'pricePerAdult': 1950
                }, {
                  'hotelCategory': "9",
                  'hotelName': 'ads',
                  'pricePerAdult': 1950
                }],
                "cancellationCharge": [_this40.store.value.Cancellationcharges]
              });
            } else {
              _this40.spinner.hide();

              _this40.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this40.spinner.hide();

            _this40.service.toastErr("Internal server error");
          });
        } // **************************edit-package-management Api****************************//

      }, {
        key: "editpackage",
        value: function editpackage() {
          var _this41 = this;

          this.spinner.show();
          var object = {
            "packageId": this.id,
            "packagePicture": this.profile,
            "countryId": this.addpackageForm.value.country,
            "destinationId": this.addpackageForm.value.destination,
            "packageTypeId": this.addpackageForm.value.packagetype,
            "transferTypeId": [this.addpackageForm.value.Transferstype],
            "transferCategoryId": [this.addpackageForm.value.Transferscategory],
            "carTypeId": [this.addpackageForm.value.Cartype],
            "packageName": this.addpackageForm.value.packagename,
            "packageDays": this.addpackageForm.value.packagedays,
            "packageNights": this.addpackageForm.value.packagenight,
            "packageDescription": this.editorValue,
            "flightsIncluded": this.addpackageForm.value.flightsincluded,
            "hotelsIncluded": this.addpackageForm.value.Hotelsincluded,
            "transferIncluded": this.addpackageForm.value.Transfersincluded,
            "sightseeingIncluded": this.addpackageForm.value.Sightseeingincluded,
            "ownerName": this.addpackageForm.value.Ownername,
            "ownerContact": this.addpackageForm.value.Ownercontact,
            "pricePerNight": this.addpackageForm.value.Pricepernight,
            "itinery": [{
              'arrive': "9",
              'meal': "9",
              'description': 'jhb'
            }, {
              'arrive': "0",
              'meal': "9",
              'description': 'kjj'
            }],
            "exclusions": [this.addpackageForm.value.Exclusions],
            "packageInclusion": [this.addpackageForm.value.Packageinclusions],
            "termsAndConditions": this.addpackageForm.value.Terms,
            "packageCost": [{
              'hotelCategory': "9",
              'hotelName': 'ads',
              'pricePerAdult': 1950
            }, {
              'hotelCategory': "9",
              'hotelName': 'ads',
              'pricePerAdult': 1950
            }],
            "cancellationCharge": [this.addpackageForm.value.Cancellationcharges]
          }; // // console.log('dashboard==>>',object)
          // console.log('valid',this.editSubAdminForm.valid)

          this.service.postApi('​admin​/editPackage', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this41.spinner.hide();

              _this41.service.showSuccess("Package-Management has been updated successfully.");

              _this41.router.navigate(['package-management']);
            } else {
              _this41.spinner.hide();

              _this41.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this41.spinner.hide();

            _this41.service.toastErr("Internal server error");
          });
        }
      }]);

      return EditPackageManagementComponent;
    }();

    EditPackageManagementComponent.ctorParameters = function () {
      return [{
        type: _orbistur_service_service__WEBPACK_IMPORTED_MODULE_3__["OrbisturServiceService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"]
      }, {
        type: _csv_service_service__WEBPACK_IMPORTED_MODULE_6__["CsvServiceService"]
      }, {
        type: ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]
      }];
    };

    EditPackageManagementComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-edit-package-management',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./edit-package-management.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/edit-package-management/edit-package-management.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./edit-package-management.component.css */
      "./src/app/edit-package-management/edit-package-management.component.css")).default]
    })], EditPackageManagementComponent);
    /***/
  },

  /***/
  "./src/app/edit-setting/edit-setting.component.css":
  /*!*********************************************************!*\
    !*** ./src/app/edit-setting/edit-setting.component.css ***!
    \*********************************************************/

  /*! exports provided: default */

  /***/
  function srcAppEditSettingEditSettingComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".imgg{\n    width: 150px;\n    height: 150px;\n    border-radius: 88px;\n}\n\n.imagebtn{\n    text-transform: none;\n    /* margin-left: 2%; */\n    width: 144px;\n    height: 36px;\n    border-radius: 21px;\n    background-color: #4db94d;\n    color: white;\n}\n\n.optionals{\n    font-weight: lighter;\n    font-size: 15px;\n    color: gray;\n}\n\n.selectCountry{\n    margin-left: 11%;\n    width: 183px;\n    height: 32px;\n}\n\n.selectsdestination{\n    margin-left: 9%;\n    width: 183px;\n    height: 32px;\n}\n\n.types{\n    margin-left: 13%;\n    width: 27%;\n    height: 32px;\n}\n\n.destinationprice{\n    margin-left: 13%;\n    width: 169px;\n    height: 32px;\n}\n\n.destinations{\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: safe;\n            justify-content: safe;\n    padding-top: 12px;\n}\n\n.inptdestination {\n    width: 100%;\n    max-width: 180px;\n    margin-left: 130px;\n}\n\n.activradio{\n    margin-left:0px!important;\n}\n\n.btnss{\n    float: right;\n    width: 150px;\n    height: 34px;\n    color: white;\n    background-color: green;\n    border-radius: 18px;\n}\n\nli.nav-item.packes_c3 {\n    width: 25% !important;\n}\n\nli.nav-item.trans_c3 {\n    width: 50% !important;\n}\n\n.container.categery_c3 {\n    border-style: ridge;\n    margin-top: 11px;\n    width: 100%;\n    max-width: 83%;\n}\n\n.container.catey_cs3 {\n    width: 100%;\n    max-width: 87%;\n    border-style: ridge;\n}\n\n\n\n\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZWRpdC1zZXR0aW5nL2VkaXQtc2V0dGluZy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksWUFBWTtJQUNaLGFBQWE7SUFDYixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxvQkFBb0I7SUFDcEIscUJBQXFCO0lBQ3JCLFlBQVk7SUFDWixZQUFZO0lBQ1osbUJBQW1CO0lBQ25CLHlCQUF5QjtJQUN6QixZQUFZO0FBQ2hCOztBQUNBO0lBQ0ksb0JBQW9CO0lBQ3BCLGVBQWU7SUFDZixXQUFXO0FBQ2Y7O0FBQ0E7SUFDSSxnQkFBZ0I7SUFDaEIsWUFBWTtJQUNaLFlBQVk7QUFDaEI7O0FBQ0E7SUFDSSxlQUFlO0lBQ2YsWUFBWTtJQUNaLFlBQVk7QUFDaEI7O0FBQ0E7SUFDSSxnQkFBZ0I7SUFDaEIsVUFBVTtJQUNWLFlBQVk7QUFDaEI7O0FBQ0E7SUFDSSxnQkFBZ0I7SUFDaEIsWUFBWTtJQUNaLFlBQVk7QUFDaEI7O0FBQ0E7SUFDSSxvQkFBYTtJQUFiLGFBQWE7SUFDYixzQkFBcUI7WUFBckIscUJBQXFCO0lBQ3JCLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxnQkFBZ0I7SUFDaEIsa0JBQWtCO0FBQ3RCOztBQUNBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUNBO0lBQ0ksWUFBWTtJQUNaLFlBQVk7SUFDWixZQUFZO0lBQ1osWUFBWTtJQUNaLHVCQUF1QjtJQUN2QixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxxQkFBcUI7QUFDekI7O0FBQ0E7SUFDSSxtQkFBbUI7SUFDbkIsZ0JBQWdCO0lBQ2hCLFdBQVc7SUFDWCxjQUFjO0FBQ2xCOztBQUdBO0lBQ0ksV0FBVztJQUNYLGNBQWM7SUFDZCxtQkFBbUI7QUFDdkIiLCJmaWxlIjoic3JjL2FwcC9lZGl0LXNldHRpbmcvZWRpdC1zZXR0aW5nLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaW1nZ3tcbiAgICB3aWR0aDogMTUwcHg7XG4gICAgaGVpZ2h0OiAxNTBweDtcbiAgICBib3JkZXItcmFkaXVzOiA4OHB4O1xufVxuXG4uaW1hZ2VidG57XG4gICAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gICAgLyogbWFyZ2luLWxlZnQ6IDIlOyAqL1xuICAgIHdpZHRoOiAxNDRweDtcbiAgICBoZWlnaHQ6IDM2cHg7XG4gICAgYm9yZGVyLXJhZGl1czogMjFweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGRiOTRkO1xuICAgIGNvbG9yOiB3aGl0ZTtcbn1cbi5vcHRpb25hbHN7XG4gICAgZm9udC13ZWlnaHQ6IGxpZ2h0ZXI7XG4gICAgZm9udC1zaXplOiAxNXB4O1xuICAgIGNvbG9yOiBncmF5O1xufVxuLnNlbGVjdENvdW50cnl7XG4gICAgbWFyZ2luLWxlZnQ6IDExJTtcbiAgICB3aWR0aDogMTgzcHg7XG4gICAgaGVpZ2h0OiAzMnB4O1xufVxuLnNlbGVjdHNkZXN0aW5hdGlvbntcbiAgICBtYXJnaW4tbGVmdDogOSU7XG4gICAgd2lkdGg6IDE4M3B4O1xuICAgIGhlaWdodDogMzJweDtcbn1cbi50eXBlc3tcbiAgICBtYXJnaW4tbGVmdDogMTMlO1xuICAgIHdpZHRoOiAyNyU7XG4gICAgaGVpZ2h0OiAzMnB4O1xufVxuLmRlc3RpbmF0aW9ucHJpY2V7XG4gICAgbWFyZ2luLWxlZnQ6IDEzJTtcbiAgICB3aWR0aDogMTY5cHg7XG4gICAgaGVpZ2h0OiAzMnB4O1xufVxuLmRlc3RpbmF0aW9uc3tcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc2FmZTtcbiAgICBwYWRkaW5nLXRvcDogMTJweDtcbn1cblxuLmlucHRkZXN0aW5hdGlvbiB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWF4LXdpZHRoOiAxODBweDtcbiAgICBtYXJnaW4tbGVmdDogMTMwcHg7XG59XG4uYWN0aXZyYWRpb3tcbiAgICBtYXJnaW4tbGVmdDowcHghaW1wb3J0YW50O1xufVxuLmJ0bnNze1xuICAgIGZsb2F0OiByaWdodDtcbiAgICB3aWR0aDogMTUwcHg7XG4gICAgaGVpZ2h0OiAzNHB4O1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcbiAgICBib3JkZXItcmFkaXVzOiAxOHB4O1xufVxuXG5saS5uYXYtaXRlbS5wYWNrZXNfYzMge1xuICAgIHdpZHRoOiAyNSUgIWltcG9ydGFudDtcbn1cblxubGkubmF2LWl0ZW0udHJhbnNfYzMge1xuICAgIHdpZHRoOiA1MCUgIWltcG9ydGFudDtcbn1cbi5jb250YWluZXIuY2F0ZWdlcnlfYzMge1xuICAgIGJvcmRlci1zdHlsZTogcmlkZ2U7XG4gICAgbWFyZ2luLXRvcDogMTFweDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXgtd2lkdGg6IDgzJTtcbn1cblxuXG4uY29udGFpbmVyLmNhdGV5X2NzMyB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWF4LXdpZHRoOiA4NyU7XG4gICAgYm9yZGVyLXN0eWxlOiByaWRnZTtcbn1cblxuXG5cblxuIl19 */";
    /***/
  },

  /***/
  "./src/app/edit-setting/edit-setting.component.ts":
  /*!********************************************************!*\
    !*** ./src/app/edit-setting/edit-setting.component.ts ***!
    \********************************************************/

  /*! exports provided: EditSettingComponent */

  /***/
  function srcAppEditSettingEditSettingComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "EditSettingComponent", function () {
      return EditSettingComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _orbistur_service_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../orbistur-service.service */
    "./src/app/orbistur-service.service.ts");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");

    var EditSettingComponent =
    /*#__PURE__*/
    function () {
      function EditSettingComponent(service, formBuilder, spinner, router, activate) {
        _classCallCheck(this, EditSettingComponent);

        this.service = service;
        this.formBuilder = formBuilder;
        this.spinner = spinner;
        this.router = router;
        this.activate = activate;
        this.tab = 'PackageTypes';
        this.tabs = 'TransferCategory';
        this.countryList = [];
        this.limit = 10;
        this.page = 1;
        this.p = 0;
      }

      _createClass(EditSettingComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this42 = this;

          this.activate.params.subscribe(function (res) {
            _this42.id = res.id;
            _this42.val = Number(res.val);
            _this42.value = Number(res.value);

            _this42.tabChangedFunc(_this42.val);

            _this42.tabChangedFuncs(_this42.value);

            console.log('value', _this42.value);
          });
          this.packageForm = this.formBuilder.group({
            'country': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            'type': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(20)])],
            'activeInsurance': ['ACTIVE']
          });
          this.carTypeForm = this.formBuilder.group({
            'country': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            'destination': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            'type': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(50)])],
            'price': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(20), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern(/^-?(?:0|[1-9]\d{0,2}(?:,?\d{3})*)(?:\.\d+)?$/)])],
            'activeInsurance': ['ACTIVE']
          });
          this.countryForm = this.formBuilder.group({
            'country': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            'activeInsurance': ['ACTIVE']
          });
          this.transfrForm = this.formBuilder.group({
            'category': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(50)])],
            'activeInsurance': ['ACTIVE']
          });
          this.TransferTypeForm = this.formBuilder.group({
            'type': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(50)])],
            'activeInsurance': ['ACTIVE']
          });
          this.getViewPackage();
          this.getViewTransfer();
          this.getViewTransferType();
          this.getViewCarType();
          this.getViewCountry();
          this.destinationList();
          this.getCountry();
          this.packageList();
          this.cartypeList();
          this.countryDataList();
          this.getTransferLiat();
          this.getTransferTypeLiat();
        } // *******************Country List ********************//

      }, {
        key: "getCountry",
        value: function getCountry() {
          var _this43 = this;

          var object = {
            "search": null
          };
          this.service.postApi('admin/countryList', object, 1).subscribe(function (res) {
            _this43.countryList = res.body.result.docs;
            console.log('countryListJson', _this43.countryList);
          });
        } // ******************Destination List**************///

      }, {
        key: "destinationList",
        value: function destinationList() {
          var _this44 = this;

          var object = {};
          this.service.postApi('admin/destinationList', object, 1).subscribe(function (res) {
            _this44.destinationLists = res.body.result.docs;
            console.log('destinationLists==>>', _this44.destinationLists);
          });
        } // **********************View package api*************************//

      }, {
        key: "getViewPackage",
        value: function getViewPackage() {
          var _this45 = this;

          this.service.getApi('admin/viewPackageType/' + this.id, 1).subscribe(function (res) {
            _this45.viewPackage = res.body.result;
            console.log('viewPackage==>>', _this45.viewPackage);

            _this45.packageForm.patchValue({
              'country': _this45.viewPackage.countryId,
              'type': _this45.viewPackage.type,
              'activeInsurance': _this45.viewPackage.status
            });
          });
        } // ***********************Package Add Api*****************//

      }, {
        key: "UpadePackage",
        value: function UpadePackage() {
          var _this46 = this;

          this.spinner.show();
          var object = {
            'typeId': this.viewPackage._id,
            'countryId': this.packageForm.value.country,
            'type': this.packageForm.value.type,
            'status': this.packageForm.value.activeInsurance
          };
          console.log('object==>>', object);
          this.service.putApi('admin/editPackageType', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this46.spinner.hide();

              _this46.service.showSuccess("Package type has been updated successfully.");

              _this46.router.navigate(['settings-page', {
                val: 0
              }]);
            } else {
              _this46.spinner.hide(); // this.service.toastErr(res.body.response_message)

            }
          }, function (error) {
            _this46.spinner.hide();

            _this46.service.toastErr(error.response_message);
          });
        } // **********************View trancsfer api*************************//

      }, {
        key: "getViewTransfer",
        value: function getViewTransfer() {
          var _this47 = this;

          this.service.getApi('admin/viewTransferCategory/' + this.id, 1).subscribe(function (res) {
            _this47.viewTrancfer = res.body.result;
            console.log('viewTrancfer==>>', _this47.viewTrancfer);

            _this47.transfrForm.patchValue({
              'category': _this47.viewTrancfer.category,
              'activeInsurance': _this47.viewTrancfer.status
            });
          });
        } // ***********************Package Add Api*****************//

      }, {
        key: "UpadeTrancsfr",
        value: function UpadeTrancsfr() {
          var _this48 = this;

          this.spinner.show();
          var object = {
            'categoryId': this.viewTrancfer._id,
            'category': this.transfrForm.value.category,
            'status': this.transfrForm.value.activeInsurance
          };
          console.log('object==>>', object);
          this.service.putApi('admin/editTransferCategory', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this48.spinner.hide();

              _this48.router.navigate(['settings-page', {
                val: 1,
                value: 0
              }]);

              _this48.service.showSuccess("Transfer category has been updated successfully.");
            } else {
              _this48.spinner.hide(); // this.service.toastErr(res.body.response_message)

            }
          }, function (error) {
            _this48.spinner.hide();

            _this48.service.toastErr(error.response_message);
          });
        } // **********************View trancsfer type api*************************//

      }, {
        key: "getViewTransferType",
        value: function getViewTransferType() {
          var _this49 = this;

          this.service.getApi('admin/viewTransferType/' + this.id, 1).subscribe(function (res) {
            _this49.viewTrancferType = res.body.result;
            console.log('viewTrancferType==>>', _this49.viewTrancferType);

            _this49.TransferTypeForm.patchValue({
              'type': _this49.viewTrancferType.type,
              'activeInsurance': _this49.viewTrancferType.status
            });
          });
        } // ***********************update transfr type Api*****************//

      }, {
        key: "UpadeTrancsfrType",
        value: function UpadeTrancsfrType() {
          var _this50 = this;

          this.spinner.show();
          var object = {
            'typeId': this.id,
            'type': this.TransferTypeForm.value.type,
            'status': this.TransferTypeForm.value.activeInsurance
          };
          console.log('object==>>', object);
          this.service.putApi('admin/editTransferType', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this50.spinner.hide();

              _this50.service.showSuccess("Transfer type has been updated successfully.");

              _this50.router.navigate(['settings-page', {
                val: 1,
                value: 1
              }]);
            } else {
              _this50.spinner.hide(); // this.service.toastErr(res.body.response_message)

            }
          }, function (error) {
            _this50.spinner.hide();

            _this50.service.toastErr(error.response_message);
          });
        } // **********************View car type type api*************************//

      }, {
        key: "getViewCarType",
        value: function getViewCarType() {
          var _this51 = this;

          this.service.getApi('admin/viewCarType/' + this.id, 1).subscribe(function (res) {
            _this51.viewCarType = res.body.result;
            console.log('viewCarType==>>', _this51.viewCarType);

            _this51.carTypeForm.patchValue({
              'country': _this51.viewCarType.countryId,
              'destination': _this51.viewCarType.destinationId,
              'type': _this51.viewCarType.carType,
              'price': _this51.viewCarType.price,
              'activeInsurance': _this51.viewCarType.status
            });
          });
        } // ***********************Package Add Api*****************//

      }, {
        key: "updateCarType",
        value: function updateCarType() {
          var _this52 = this;

          console.log('addDestination==>>', this.carTypeForm.value.activeInsurance);
          this.spinner.show();
          var object = {
            'destinationId': this.carTypeForm.value.destination,
            'countryId': this.carTypeForm.value.country,
            'carType': this.carTypeForm.value.type,
            'pricePerKm': this.carTypeForm.value.price
          };
          console.log('object==>>', object);
          this.service.postApi('admin/addCarType', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this52.carType = res.body.result.docs;

              _this52.spinner.hide();

              _this52.router.navigate(['settings-page', {
                val: 2
              }]);

              _this52.service.showSuccess("Car type has been updated successfully.");
            } else {
              _this52.spinner.hide();

              _this52.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this52.spinner.hide();

            _this52.service.toastErr(error.response_message);
          });
        } // **********************View country  api*************************//

      }, {
        key: "getViewCountry",
        value: function getViewCountry() {
          var _this53 = this;

          console.log('activeInsurancesactiveInsurances==>>', this.countryForm.value.activeInsurances);
          this.service.getApi('admin/viewCountry/' + this.id, 1).subscribe(function (res) {
            _this53.viewcountry = res.body.result;
            console.log('viewcountry==>>', _this53.viewcountry);

            _this53.countryForm.patchValue({
              'country': _this53.viewcountry.country,
              'activeInsurances': _this53.viewcountry.status
            });
          });
        } // ************************edit country api******************//

      }, {
        key: "UpadeCountry",
        value: function UpadeCountry() {
          var _this54 = this;

          this.spinner.show();
          var object = {
            'countryId': this.id,
            'country': this.countryForm.value.country,
            'status': this.countryForm.value.activeInsurance
          };
          console.log('object==>>', object);
          this.service.putApi('admin/editCountry', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this54.spinner.hide();

              _this54.service.showSuccess("Country has been updated successfully.");

              _this54.router.navigate(['settings-page', {
                val: 3
              }]);
            } else {
              _this54.spinner.hide(); // this.service.toastErr(res.body.response_message)

            }
          }, function (error) {
            _this54.spinner.hide();

            _this54.service.toastErr(error.response_message);
          });
        } // ***********************update Country api*********************//

      }, {
        key: "updateCountry",
        value: function updateCountry() {
          var _this55 = this;

          this.spinner.show();
          var object = {
            'destinationId': this.carTypeForm.value.destination,
            'countryId': this.carTypeForm.value.country,
            'carType': this.carTypeForm.value.type,
            'pricePerKm': this.carTypeForm.value.price
          };
          console.log('object==>>', object);
          this.service.postApi('admin/addCarType', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this55.carType = res.body.result.docs;

              _this55.spinner.hide();

              _this55.service.showSuccess(res.body.response_message);

              _this55.router.navigate(['settings-page']);
            } else {
              _this55.spinner.hide();

              _this55.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this55.spinner.hide();

            _this55.service.toastErr(error.response_message);
          });
        } // ***************************Image upload 64base******************//

      }, {
        key: "handleInputChange",
        value: function handleInputChange(e) {
          var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
          var pattern = /image-*/;
          var reader = new FileReader();

          if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
          }

          reader.onload = this._handleReaderLoaded.bind(this);
          reader.readAsDataURL(file);
        }
      }, {
        key: "_handleReaderLoaded",
        value: function _handleReaderLoaded(e) {
          var reader = e.target;
          this.imageSrc = reader.result;
        }
      }, {
        key: "tabChangedFunc",
        value: function tabChangedFunc(val) {
          switch (val) {
            case 0:
              this.tab = 'PackageTypes'; // this.getactivejob();

              break;

            case 1:
              this.tab = 'Transfer'; // this.getappliedjob();

              break;

            case 2:
              this.tab = 'CarType'; // this.getpendingjob();

              break;

            case 3:
              this.tab = 'Countries';
          }
        }
      }, {
        key: "tabChangedFuncs",
        value: function tabChangedFuncs(value) {
          switch (value) {
            case 0:
              this.tabs = 'TransferCategory'; // this.getactivejob();

              break;

            case 1:
              this.tabs = 'TransferType'; // this.getappliedjob();

              break;
          }
        } // ********************************Select status************************************************//

      }, {
        key: "selectStatuss",
        value: function selectStatuss(value) {
          var _this56 = this;

          this.status = value;
          console.log('staatus==>>', this.status);

          if (this.status == 'ACTIVE' || this.status == 'INACTIVE') {
            this.packageList(); // this.getContentList();
            // this.addBannerList();

            this.cartypeList();
            this.countryDataList();
            this.getTransferLiat();
            this.getTransferTypeLiat();
          } else if (this.status == 'ALL') {
            // this.packageList();
            this.filterName = '';
            this.page = 1;
            this.limit = 10;
            this.status = null;
            setTimeout(function () {
              _this56.packageList(); // this.getContentList()
              // this.addBannerList();


              _this56.cartypeList();

              _this56.countryDataList();

              _this56.getTransferLiat();

              _this56.getTransferTypeLiat();
            }, 100);
          }
        } // *********************************Pagination event*********************************************//

      }, {
        key: "changePage",
        value: function changePage(page) {
          console.log('Page ', page);
          this.page = this.page;
          this.p = page - 1;
          this.packageList(); // this.getContentList()
          // this.addBannerList();

          this.cartypeList();
          this.countryDataList();
          this.getTransferLiat();
          this.getTransferTypeLiat();
        } // *************************************Search Value*************************************************//

      }, {
        key: "searchValue",
        value: function searchValue(value) {
          this.filterName = value;
          this.packageLists = [];
          this.cartTypeLists = [];
          this.countryData = [];
          this.transferLists = [];
          this.transferTypeLists = [];
        } // ******************************************Manage code****************************************//

      }, {
        key: "packageList",
        value: function packageList() {
          var _this57 = this;

          var object = {
            'search': this.filterName,
            'status': this.status,
            'page': this.page,
            'limit': this.limit
          };
          this.service.postApi('admin/packageTypeList', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this57.spinner.hide(); // this.getName()


              _this57.packageLists = res.body.result.docs ? res.body.result.docs : res.body.result;
            }
          }, function (error) {
            _this57.spinner.hide();
          });
        } // **********************Car type list*******************//

      }, {
        key: "cartypeList",
        value: function cartypeList() {
          var _this58 = this;

          var object = {
            'search': this.filterName,
            'status': this.status,
            'page': this.page,
            'limit': this.limit
          };
          this.service.postApi('admin/carTypeList', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this58.spinner.hide(); // this.getName()


              _this58.cartTypeLists = res.body.result.docs ? res.body.result.docs : res.body.result;
              console.log('cartTypeLists==>>', _this58.cartTypeLists);
            } else {
              _this58.spinner.hide();
            }
          }, function (error) {
            _this58.spinner.hide();
          });
        } // *********************Get country list****************//

      }, {
        key: "countryDataList",
        value: function countryDataList() {
          var _this59 = this;

          var object = {
            'search': this.filterName,
            'status': this.status,
            'page': this.page,
            'limit': this.limit
          };
          this.service.postApi('admin/countryList', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this59.spinner.hide(); // this.getName()


              _this59.countryData = res.body.result.docs ? res.body.result.docs : res.body.result;
              console.log('countryData==>>', _this59.countryData);
            } else {
              _this59.spinner.hide();
            }
          }, function (error) {
            _this59.spinner.hide();
          });
        } // **************************Transfer category api****************//

      }, {
        key: "getTransferLiat",
        value: function getTransferLiat() {
          var _this60 = this;

          var object = {
            'search': this.filterName,
            'status': this.status,
            'page': this.page,
            'limit': this.limit
          };
          this.service.postApi('admin/transferCategoryList', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this60.spinner.hide(); // this.getName()


              _this60.transferLists = res.body.result.docs;
              console.log('transferLists==>>', _this60.transferLists);
            } else {
              _this60.spinner.hide();
            }
          }, function (error) {
            _this60.spinner.hide();
          });
        } // **************************Get transfer type api****************//

      }, {
        key: "getTransferTypeLiat",
        value: function getTransferTypeLiat() {
          var _this61 = this;

          var object = {
            'search': this.filterName,
            'status': this.status,
            'page': this.page,
            'limit': this.limit
          };
          this.service.postApi('admin/transferTypeList', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this61.spinner.hide(); // this.getName()


              _this61.transferTypeLists = res.body.result.docs ? res.body.result.docs : res.body.result;
              console.log('transferTypeLists==>>', _this61.transferTypeLists);
            } else {
              _this61.spinner.hide();
            }
          }, function (error) {
            _this61.spinner.hide();
          });
        }
      }, {
        key: "editIdWebsite",
        value: function editIdWebsite(_id) {
          this.id = _id;
          this.getViewPackage();
          this.getViewTransfer();
          this.getViewTransferType();
          this.getViewCarType();
          this.getViewCountry();
          console.log('editIdWebsite==>>', this.id);
        } // **************************Destination Get id method for delete customer*******************************//

      }, {
        key: "deleteFunction",
        value: function deleteFunction(id, values) {
          this.destination_id = id;

          if (values === "packageType") {
            this.url = 'admin/deletePackageType/' + this.destination_id;
          } else if (values === "carType") {
            this.url = 'admin/deleteCarType/' + this.destination_id;
            $('#deletetCartype').modal({
              backdrop: 'static',
              keyboard: false
            });
          } else if (values === "countries") {
            console.log('dsdgasdhjsdghajs', 'qweqweqwewgqe');
            this.url = 'admin/deleteCountry/' + this.destination_id;
            $('#deletetCountries').modal({
              backdrop: 'static',
              keyboard: false
            });
          } else if (values === "tranceFerCategory") {
            this.url = 'admin/deleteTransferCategory/' + this.destination_id;
            $('#transfrexampdelete').modal({
              backdrop: 'static',
              keyboard: false
            });
          } else if (values === "tranceFerType") {
            this.url = 'admin/deleteTransferType/' + this.destination_id;
            $('#transfertype').modal({
              backdrop: 'static',
              keyboard: false
            });
          }
        } // ***************************Delete method*******************************//

      }, {
        key: "deleteFunctions",
        value: function deleteFunctions() {
          var _this62 = this;

          this.spinner.show();
          this.service.deleteApi(this.url, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this62.packageList();

              _this62.cartypeList();

              _this62.getCountry();

              _this62.countryDataList();

              _this62.getTransferLiat();

              _this62.getTransferTypeLiat();

              _this62.spinner.hide();

              _this62.service.showSuccess(res.body.response_message);
            } else {
              _this62.spinner.hide();

              _this62.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this62.spinner.hide();

            _this62.service.toastErr("Internal server error");
          });
        }
      }]);

      return EditSettingComponent;
    }();

    EditSettingComponent.ctorParameters = function () {
      return [{
        type: _orbistur_service_service__WEBPACK_IMPORTED_MODULE_3__["OrbisturServiceService"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]
      }, {
        type: ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"]
      }];
    };

    EditSettingComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-edit-setting',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./edit-setting.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/edit-setting/edit-setting.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./edit-setting.component.css */
      "./src/app/edit-setting/edit-setting.component.css")).default]
    })], EditSettingComponent);
    /***/
  },

  /***/
  "./src/app/edit-sub-admin/edit-sub-admin.component.css":
  /*!*************************************************************!*\
    !*** ./src/app/edit-sub-admin/edit-sub-admin.component.css ***!
    \*************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppEditSubAdminEditSubAdminComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".add{\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: center;\n            justify-content: center;\n    padding: 8%;\n}\n\n.btn{\n    width: 100%;\n    max-width: 183px;\n    border-radius: 18px;\n    height: 42px;\n    font-size: 24px;\n    padding: 0px;\n    background-color: #e8ae0cde!important;\n    border: navajowhite;\n}\n\n.wr{\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: center;\n            justify-content: center;\n    box-shadow: 5px 10px #888888;\n    border: 1px solid;\n}\n\n.bd{\n    width: 48%;\n}\n\n.imgs{\n    border-radius: 100px;\n    width: 150px;\n    height: 150px;\n}\n\n.input#file-input {\n    display: none;\n  }\n\n.event1{\n    margin-left: 71px;\n  }\n\n.event2{\n    margin-left: 80px;\n}\n\n.event3{\n    margin-left: 80px;\n}\n\n.event4{\n    margin-left: 55px;\n}\n\n.event5{\n    margin-left: 83px;\n}\n\n.event6{\n    margin-left: 82px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZWRpdC1zdWItYWRtaW4vZWRpdC1zdWItYWRtaW4uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLG9CQUFhO0lBQWIsYUFBYTtJQUNiLHdCQUF1QjtZQUF2Qix1QkFBdUI7SUFDdkIsV0FBVztBQUNmOztBQUVBO0lBQ0ksV0FBVztJQUNYLGdCQUFnQjtJQUNoQixtQkFBbUI7SUFDbkIsWUFBWTtJQUNaLGVBQWU7SUFDZixZQUFZO0lBQ1oscUNBQXFDO0lBQ3JDLG1CQUFtQjtBQUN2Qjs7QUFDQTtJQUNJLG9CQUFhO0lBQWIsYUFBYTtJQUNiLHdCQUF1QjtZQUF2Qix1QkFBdUI7SUFDdkIsNEJBQTRCO0lBQzVCLGlCQUFpQjtBQUNyQjs7QUFDQTtJQUNJLFVBQVU7QUFDZDs7QUFDQTtJQUNJLG9CQUFvQjtJQUNwQixZQUFZO0lBQ1osYUFBYTtBQUNqQjs7QUFDQTtJQUNJLGFBQWE7RUFDZjs7QUFDQTtJQUNFLGlCQUFpQjtFQUNuQjs7QUFDQTtJQUNFLGlCQUFpQjtBQUNyQjs7QUFDQTtJQUNJLGlCQUFpQjtBQUNyQjs7QUFDQTtJQUNJLGlCQUFpQjtBQUNyQjs7QUFDQTtJQUNJLGlCQUFpQjtBQUNyQjs7QUFDQTtJQUNJLGlCQUFpQjtBQUNyQiIsImZpbGUiOiJzcmMvYXBwL2VkaXQtc3ViLWFkbWluL2VkaXQtc3ViLWFkbWluLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYWRke1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgcGFkZGluZzogOCU7XG59XG5cbi5idG57XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWF4LXdpZHRoOiAxODNweDtcbiAgICBib3JkZXItcmFkaXVzOiAxOHB4O1xuICAgIGhlaWdodDogNDJweDtcbiAgICBmb250LXNpemU6IDI0cHg7XG4gICAgcGFkZGluZzogMHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNlOGFlMGNkZSFpbXBvcnRhbnQ7XG4gICAgYm9yZGVyOiBuYXZham93aGl0ZTtcbn1cbi53cntcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGJveC1zaGFkb3c6IDVweCAxMHB4ICM4ODg4ODg7XG4gICAgYm9yZGVyOiAxcHggc29saWQ7XG59XG4uYmR7XG4gICAgd2lkdGg6IDQ4JTtcbn1cbi5pbWdze1xuICAgIGJvcmRlci1yYWRpdXM6IDEwMHB4O1xuICAgIHdpZHRoOiAxNTBweDtcbiAgICBoZWlnaHQ6IDE1MHB4O1xufVxuLmlucHV0I2ZpbGUtaW5wdXQge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbiAgLmV2ZW50MXtcbiAgICBtYXJnaW4tbGVmdDogNzFweDtcbiAgfVxuICAuZXZlbnQye1xuICAgIG1hcmdpbi1sZWZ0OiA4MHB4O1xufVxuLmV2ZW50M3tcbiAgICBtYXJnaW4tbGVmdDogODBweDtcbn1cbi5ldmVudDR7XG4gICAgbWFyZ2luLWxlZnQ6IDU1cHg7XG59XG4uZXZlbnQ1e1xuICAgIG1hcmdpbi1sZWZ0OiA4M3B4O1xufVxuLmV2ZW50NntcbiAgICBtYXJnaW4tbGVmdDogODJweDtcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/edit-sub-admin/edit-sub-admin.component.ts":
  /*!************************************************************!*\
    !*** ./src/app/edit-sub-admin/edit-sub-admin.component.ts ***!
    \************************************************************/

  /*! exports provided: EditSubAdminComponent */

  /***/
  function srcAppEditSubAdminEditSubAdminComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "EditSubAdminComponent", function () {
      return EditSubAdminComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _orbistur_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../orbistur-service.service */
    "./src/app/orbistur-service.service.ts");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");

    var EditSubAdminComponent =
    /*#__PURE__*/
    function () {
      function EditSubAdminComponent(service, router, formbuilder, spinner, activate) {
        _classCallCheck(this, EditSubAdminComponent);

        this.service = service;
        this.router = router;
        this.formbuilder = formbuilder;
        this.spinner = spinner;
        this.activate = activate;
      }

      _createClass(EditSubAdminComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this63 = this;

          this.activate.params.subscribe(function (res) {
            _this63.ediradmin_id = res._id;
          });
          this.editSubAdminForm = this.formbuilder.group({
            'name': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(60), _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].minLength(2), _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern("[a-zA-Z ]*")])],
            'email': ["", _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(60), _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)])],
            'number': ["", _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            'password': ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].minLength(8), _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(16), _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i)]],
            'confirmPassword': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            'address': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            'dashboard': [false],
            'customerManagement': [false],
            'subAdminManagement': [false],
            'packageManagement': [false],
            'bookingManagement': [false],
            'transferManagement': [false],
            'sightseeingManagement': [false],
            'transactionManagement': [false],
            'visaManagement': [false],
            'contentManagement': [false],
            'inquiryManagement': [false],
            'supportManagement': [false],
            'settingManagement': [false]
          });
          this.viewAdmin();
          this.phoneCheckCountry();
        } // *************************mobile number method**************//

      }, {
        key: "phoneCheckCountry",
        value: function phoneCheckCountry() {
          $("#phoneNumber").intlTelInput({
            autoPlaceholder: false,
            autoFormat: false,
            autoHideDialCode: false,
            initialCountry: 'in',
            nationalMode: false,
            onlyCountries: [],
            // preferredCountries: ["us"],
            formatOnInit: true,
            separateDialCode: true,
            formatOnDisplay: false
          });
        }
      }, {
        key: "toCheckSpaceChar",
        value: function toCheckSpaceChar() {
          this.isValidNumber = $('#phoneNumber').intlTelInput('isValidNumber');
          var countryData = $('#phoneNumber').intlTelInput('getSelectedCountryData');
          this.myCode = "+" + countryData.dialCode;
        } // *************************Image upload event****************//

      }, {
        key: "handleInputChange",
        value: function handleInputChange(e) {
          var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
          var pattern = /image-*/;
          var reader = new FileReader();

          if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
          }

          reader.onload = this._handleReaderLoaded.bind(this);
          reader.readAsDataURL(file);
        }
      }, {
        key: "_handleReaderLoaded",
        value: function _handleReaderLoaded(e) {
          var reader = e.target;
          this.profile = reader.result;
          console.log("profile", this.profile);
        } // ***************************View Sub Admin Api***************************//

      }, {
        key: "viewAdmin",
        value: function viewAdmin() {
          var _this64 = this;

          this.service.getApi('admin/viewSubAdmin/' + this.ediradmin_id, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this64.spinner.hide();

              _this64.service.showSuccess(res.body.response_message);

              _this64.adminPatchvalues = res.body.result;
              console.log('adminPatchvalue==>>', _this64.adminPatchvalues);

              _this64.editSubAdminForm.patchValue({
                'name': _this64.adminPatchvalues.name,
                'email': _this64.adminPatchvalues.email,
                'number': _this64.adminPatchvalues.mobileNumber,
                'address': _this64.adminPatchvalues.address,
                'dashboard': _this64.adminPatchvalues.permissions[0].dashboard,
                'customerManagement': _this64.adminPatchvalues.permissions[0].customerManagement,
                'subAdminManagement': _this64.adminPatchvalues.permissions[0].subAdminManagement,
                'packageManagement': _this64.adminPatchvalues.permissions[0].packageManagement,
                'bookingManagement': _this64.adminPatchvalues.permissions[0].bookingManagement,
                'transferManagement': _this64.adminPatchvalues.permissions[0].transferManagement,
                'sightseeingManagement': _this64.adminPatchvalues.permissions[0].sightseeingManagement,
                'transactionManagement': _this64.adminPatchvalues.permissions[0].transactionManagement,
                'visaManagement': _this64.adminPatchvalues.permissions[0].visaManagement,
                'contentManagement': _this64.adminPatchvalues.permissions[0].contentManagement,
                'inquiryManagement': _this64.adminPatchvalues.permissions[0].inquiryManagement,
                'supportManagement': _this64.adminPatchvalues.permissions[0].supportManagement,
                'settingManagement': _this64.adminPatchvalues.permissions[0].settingManagement,
                'profilePic': _this64.adminPatchvalues.permissions[0].profilePic
              });
            } else {
              _this64.spinner.hide();

              _this64.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this64.spinner.hide();

            _this64.service.toastErr("Internal server error");
          });
        } // **************************Add Sub Admin Api****************************//

      }, {
        key: "editSubAdmin",
        value: function editSubAdmin() {
          var _this65 = this;

          this.spinner.show();
          var object = {
            'subAdminId': this.adminPatchvalues._id,
            'name': this.editSubAdminForm.value.name,
            'email': this.editSubAdminForm.value.email,
            'mobileNumber': this.editSubAdminForm.value.number,
            'password': this.editSubAdminForm.value.password,
            'confirmPassword': this.editSubAdminForm.value.confirmPassword,
            'address': this.editSubAdminForm.value.address,
            'dashboard': this.editSubAdminForm.value.dashboard,
            'customerManagement': this.editSubAdminForm.value.customerManagement,
            'subAdminManagement': this.editSubAdminForm.value.subAdminManagement,
            'packageManagement': this.editSubAdminForm.value.packageManagement,
            'bookingManagement': this.editSubAdminForm.value.bookingManagement,
            'transferManagement': this.editSubAdminForm.value.transferManagement,
            'sightseeingManagement': this.editSubAdminForm.value.sightseeingManagement,
            'transactionManagement': this.editSubAdminForm.value.transactionManagement,
            'visaManagement': this.editSubAdminForm.value.visaManagement,
            'contentManagement': this.editSubAdminForm.value.contentManagement,
            'inquiryManagement': this.editSubAdminForm.value.inquiryManagement,
            'supportManagement': this.editSubAdminForm.value.supportManagement,
            'settingManagement': this.editSubAdminForm.value.settingManagement,
            'profilePic': this.profile
          }; // console.log('dashboard==>>',object)

          console.log('valid', this.editSubAdminForm.valid);
          this.service.putApi('admin/editSubAdmin', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this65.spinner.hide();

              _this65.service.showSuccess("Sub-admin has been updated successfully.");

              _this65.router.navigate(['sub-admin-management']);
            } else {
              _this65.spinner.hide();

              _this65.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this65.spinner.hide();

            _this65.service.toastErr("Internal server error");
          });
        }
      }]);

      return EditSubAdminComponent;
    }();

    EditSubAdminComponent.ctorParameters = function () {
      return [{
        type: _orbistur_service_service__WEBPACK_IMPORTED_MODULE_2__["OrbisturServiceService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"]
      }, {
        type: ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]
      }];
    };

    EditSubAdminComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-edit-sub-admin',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./edit-sub-admin.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/edit-sub-admin/edit-sub-admin.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./edit-sub-admin.component.css */
      "./src/app/edit-sub-admin/edit-sub-admin.component.css")).default]
    })], EditSubAdminComponent);
    /***/
  },

  /***/
  "./src/app/enquries/enquries.component.css":
  /*!*************************************************!*\
    !*** ./src/app/enquries/enquries.component.css ***!
    \*************************************************/

  /*! exports provided: default */

  /***/
  function srcAppEnquriesEnquriesComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".bt{\n    margin-left: 7px;\n    width: 100%;\n    max-width: 157px;\n    border-radius: 19px;\n    background-color: gray;\n    border: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZW5xdXJpZXMvZW5xdXJpZXMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGdCQUFnQjtJQUNoQixXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixzQkFBc0I7SUFDdEIsWUFBWTtBQUNoQiIsImZpbGUiOiJzcmMvYXBwL2VucXVyaWVzL2VucXVyaWVzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYnR7XG4gICAgbWFyZ2luLWxlZnQ6IDdweDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXgtd2lkdGg6IDE1N3B4O1xuICAgIGJvcmRlci1yYWRpdXM6IDE5cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcbiAgICBib3JkZXI6IG5vbmU7XG59Il19 */";
    /***/
  },

  /***/
  "./src/app/enquries/enquries.component.ts":
  /*!************************************************!*\
    !*** ./src/app/enquries/enquries.component.ts ***!
    \************************************************/

  /*! exports provided: EnquriesComponent */

  /***/
  function srcAppEnquriesEnquriesComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "EnquriesComponent", function () {
      return EnquriesComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _orbistur_service_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../orbistur-service.service */
    "./src/app/orbistur-service.service.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _csv_service_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../csv-service.service */
    "./src/app/csv-service.service.ts");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");

    var EnquriesComponent =
    /*#__PURE__*/
    function () {
      function EnquriesComponent(service, router, formBuilder, csvServiceService, spinner) {
        _classCallCheck(this, EnquriesComponent);

        this.service = service;
        this.router = router;
        this.formBuilder = formBuilder;
        this.csvServiceService = csvServiceService;
        this.spinner = spinner;
        this.limit = 10;
        this.page = 1;
        this.p = 0;
        this.paginationData = {
          limit: 10,
          page: 1,
          total: 0
        };
        this.dataArr = [];
        this.searchname = [];
      }

      _createClass(EnquriesComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.enqList();
        }
      }, {
        key: "Searchvaluechange",
        value: function Searchvaluechange(searchdata) {
          this.searchname = searchdata;
          this.page = 1;
          console.log('searchName==>>', this.searchname);
          this.enqList();
        } //********************Reset Method******************************//

      }, {
        key: "reset",
        value: function reset() {
          this.searchname = '';
          this.search = '';
          this.enqList();
        } //********************Customer list Api**************************//

      }, {
        key: "enqList",
        value: function enqList() {
          var _this66 = this;

          console.log('in enqList');
          this.spinner.show();
          var object = {
            "search": this.searchname
          };
          this.service.postApi('admin/inquiryList', object, 1).subscribe(function (res) {
            // console.log('res==>>',res) 
            if (res.body.response_code == 200) {
              _this66.spinner.hide(); // this.service.showSuccess(res.body.response_message) 
              // this.enqLists=res.body.result.docs?res.body.result.docs:res.body.result  


              _this66.length = res.body.result;
              _this66.enquiryList = res.body.result.docs;
              _this66.paginationData.total = _this66.length.length;
              console.log("hsdfgdsfg", _this66.enquiryList);
              _this66.total = res.body.result.total;
            } else if (res.body.response_code == 404) {
              _this66.spinner.hide();

              _this66.enquiryList = res.body.result;
              console.log("asdasdasdasdas", _this66.enquiryList);
            } else {
              _this66.spinner.hide();

              _this66.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this66.spinner.hide();

            _this66.service.toastErr(error.response_message);
          });
        }
      }, {
        key: "changePage",
        value: function changePage(page) {
          console.log('Page ', page);
          this.page = this.page;
          this.p = page - 1;
          this.enqList();
        } // **************************Get id method for delete customer*******************************//

      }, {
        key: "deleteFunction",
        value: function deleteFunction(id) {
          this.user_id = id;
          console.log('user_id', this.user_id);
          $('#modaldelete').modal({
            backdrop: 'static',
            keyboard: false
          });
        } // ***************************Delete method*******************************//

      }, {
        key: "deleteFunctions",
        value: function deleteFunctions() {
          var _this67 = this;

          this.service.deleteApi('admin/deleteInquiry/' + this.user_id, 1).subscribe(function (res) {
            console.log("del", res);

            if (res.body.response_code == 200) {
              _this67.enqList();

              _this67.spinner.hide();

              _this67.service.showSuccess(res.body.response_message);

              _this67.enqList();
            } else {
              _this67.spinner.hide();

              _this67.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this67.spinner.hide();

            _this67.service.toastErr("Internal server error");
          });
        }
      }]);

      return EnquriesComponent;
    }();

    EnquriesComponent.ctorParameters = function () {
      return [{
        type: _orbistur_service_service__WEBPACK_IMPORTED_MODULE_3__["OrbisturServiceService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]
      }, {
        type: _csv_service_service__WEBPACK_IMPORTED_MODULE_5__["CsvServiceService"]
      }, {
        type: ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerService"]
      }];
    };

    EnquriesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-enquries',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./enquries.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/enquries/enquries.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./enquries.component.css */
      "./src/app/enquries/enquries.component.css")).default]
    })], EnquriesComponent);
    /***/
  },

  /***/
  "./src/app/forgot-password/forgot-password.component.css":
  /*!***************************************************************!*\
    !*** ./src/app/forgot-password/forgot-password.component.css ***!
    \***************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppForgotPasswordForgotPasswordComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".col-xs-4{\n    width: 100%;\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: center;\n            justify-content: center;\n}\n.login-box-body, .register-box-body{\nbackground: #fff;\npadding: 20px;\nborder-top: 0;\ncolor: #666;\nbox-shadow: 3px 3px 33px 13px #aba6a64a;}\n.lognBrn{\n    margin-top:12px;\n}\n.robot{\n    margin-top:18px;\n}\n.lognBrn button{\n    font-size: 22px;\n    line-height: 25px;\n    color: #ffffff;\n    font-family: \"Adelle\";\n    height: 53px;\n    border-radius: 4px;\n    background-color: #999999;\n    width: 100%;\n    max-width: 274px;\n    /* border-color: #999999; */\n    background-color: #e8ae0cde;\n    border-radius: 32px;\n    border: navajowhite;\n    color: black;\n    font-weight: 300;\n    max-width: 62%;\n}\n.login-box.register-box{\n    width: 683px!important;\n    margin: 13% auto!important;\n}\n.login-box-body[_ngcontent-ank-c1], .register-box-body[_ngcontent-ank-c1] {\n    background: #fff;\n    padding: 37px;\n    border-top: 0;\n    color: #666;\n    box-shadow: 3px 3px 33px 13px #aba6a64a;\n}\n.login-box{    padding: 0px;\n    /* width: 700px!important; */\n}\n.selct{\n    margin-right: 26px;\n    width: 118px;\n    margin-top: 10px;\n    height: 29px;\n    padding: 0px 10px;\n}\n.box-bdy{\n    padding:40px;\n}\n.logb{\n    width:100%;\n}\n.h33{\n    text-align: center;\n    color: black;\n}\n\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZm9yZ290LXBhc3N3b3JkL2ZvcmdvdC1wYXNzd29yZC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksV0FBVztJQUNYLG9CQUFhO0lBQWIsYUFBYTtJQUNiLHdCQUF1QjtZQUF2Qix1QkFBdUI7QUFDM0I7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixhQUFhO0FBQ2IsYUFBYTtBQUNiLFdBQVc7QUFDWCx1Q0FBdUMsQ0FBQztBQUN4QztJQUNJLGVBQWU7QUFDbkI7QUFDQTtJQUNJLGVBQWU7QUFDbkI7QUFDQTtJQUNJLGVBQWU7SUFDZixpQkFBaUI7SUFDakIsY0FBYztJQUNkLHFCQUFxQjtJQUNyQixZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLHlCQUF5QjtJQUN6QixXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLDJCQUEyQjtJQUMzQiwyQkFBMkI7SUFDM0IsbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQixZQUFZO0lBQ1osZ0JBQWdCO0lBQ2hCLGNBQWM7QUFDbEI7QUFDQTtJQUNJLHNCQUFzQjtJQUN0QiwwQkFBMEI7QUFDOUI7QUFDQTtJQUNJLGdCQUFnQjtJQUNoQixhQUFhO0lBQ2IsYUFBYTtJQUNiLFdBQVc7SUFDWCx1Q0FBdUM7QUFDM0M7QUFDQSxlQUFlLFlBQVk7SUFDdkIsNEJBQTRCO0FBQ2hDO0FBR0E7SUFDSSxrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLGdCQUFnQjtJQUNoQixZQUFZO0lBQ1osaUJBQWlCO0FBQ3JCO0FBQ0E7SUFDSSxZQUFZO0FBQ2hCO0FBQ0E7SUFDSSxVQUFVO0FBQ2Q7QUFDQTtJQUNJLGtCQUFrQjtJQUNsQixZQUFZO0FBQ2hCIiwiZmlsZSI6InNyYy9hcHAvZm9yZ290LXBhc3N3b3JkL2ZvcmdvdC1wYXNzd29yZC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbC14cy00e1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG4ubG9naW4tYm94LWJvZHksIC5yZWdpc3Rlci1ib3gtYm9keXtcbmJhY2tncm91bmQ6ICNmZmY7XG5wYWRkaW5nOiAyMHB4O1xuYm9yZGVyLXRvcDogMDtcbmNvbG9yOiAjNjY2O1xuYm94LXNoYWRvdzogM3B4IDNweCAzM3B4IDEzcHggI2FiYTZhNjRhO31cbi5sb2duQnJue1xuICAgIG1hcmdpbi10b3A6MTJweDtcbn1cbi5yb2JvdHtcbiAgICBtYXJnaW4tdG9wOjE4cHg7XG59XG4ubG9nbkJybiBidXR0b257XG4gICAgZm9udC1zaXplOiAyMnB4O1xuICAgIGxpbmUtaGVpZ2h0OiAyNXB4O1xuICAgIGNvbG9yOiAjZmZmZmZmO1xuICAgIGZvbnQtZmFtaWx5OiBcIkFkZWxsZVwiO1xuICAgIGhlaWdodDogNTNweDtcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzk5OTk5OTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXgtd2lkdGg6IDI3NHB4O1xuICAgIC8qIGJvcmRlci1jb2xvcjogIzk5OTk5OTsgKi9cbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZThhZTBjZGU7XG4gICAgYm9yZGVyLXJhZGl1czogMzJweDtcbiAgICBib3JkZXI6IG5hdmFqb3doaXRlO1xuICAgIGNvbG9yOiBibGFjaztcbiAgICBmb250LXdlaWdodDogMzAwO1xuICAgIG1heC13aWR0aDogNjIlO1xufVxuLmxvZ2luLWJveC5yZWdpc3Rlci1ib3h7XG4gICAgd2lkdGg6IDY4M3B4IWltcG9ydGFudDtcbiAgICBtYXJnaW46IDEzJSBhdXRvIWltcG9ydGFudDtcbn1cbi5sb2dpbi1ib3gtYm9keVtfbmdjb250ZW50LWFuay1jMV0sIC5yZWdpc3Rlci1ib3gtYm9keVtfbmdjb250ZW50LWFuay1jMV0ge1xuICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgcGFkZGluZzogMzdweDtcbiAgICBib3JkZXItdG9wOiAwO1xuICAgIGNvbG9yOiAjNjY2O1xuICAgIGJveC1zaGFkb3c6IDNweCAzcHggMzNweCAxM3B4ICNhYmE2YTY0YTtcbn1cbi5sb2dpbi1ib3h7ICAgIHBhZGRpbmc6IDBweDtcbiAgICAvKiB3aWR0aDogNzAwcHghaW1wb3J0YW50OyAqL1xufVxuXG5cbi5zZWxjdHtcbiAgICBtYXJnaW4tcmlnaHQ6IDI2cHg7XG4gICAgd2lkdGg6IDExOHB4O1xuICAgIG1hcmdpbi10b3A6IDEwcHg7XG4gICAgaGVpZ2h0OiAyOXB4O1xuICAgIHBhZGRpbmc6IDBweCAxMHB4O1xufVxuLmJveC1iZHl7XG4gICAgcGFkZGluZzo0MHB4O1xufVxuLmxvZ2J7XG4gICAgd2lkdGg6MTAwJTtcbn1cbi5oMzN7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGNvbG9yOiBibGFjaztcbn1cblxuIl19 */";
    /***/
  },

  /***/
  "./src/app/forgot-password/forgot-password.component.ts":
  /*!**************************************************************!*\
    !*** ./src/app/forgot-password/forgot-password.component.ts ***!
    \**************************************************************/

  /*! exports provided: ForgotPasswordComponent */

  /***/
  function srcAppForgotPasswordForgotPasswordComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ForgotPasswordComponent", function () {
      return ForgotPasswordComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _orbistur_service_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../orbistur-service.service */
    "./src/app/orbistur-service.service.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");

    var ForgotPasswordComponent =
    /*#__PURE__*/
    function () {
      function ForgotPasswordComponent(service, router, fb, spinner) {
        _classCallCheck(this, ForgotPasswordComponent);

        this.service = service;
        this.router = router;
        this.fb = fb;
        this.spinner = spinner;
      }

      _createClass(ForgotPasswordComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.reserpasswordForm = this.fb.group({
            "email": ["", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)])]
          });
        } // ******************Forgot Password Api****************//

      }, {
        key: "forgotPassword",
        value: function forgotPassword() {
          var _this68 = this;

          this.spinner.show();
          var object = {
            "url": this.service.websiteUrls + 'reset-password',
            "email": this.reserpasswordForm.value.email
          };
          console.log('object', object);
          this.service.postApi('admin/forgotPassword', object, 0).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this68.spinner.hide();

              _this68.service.showSuccess(res.body.response_message);

              _this68.router.navigate(['login']);
            } else {
              _this68.spinner.hide();

              _this68.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this68.spinner.hide();

            _this68.service.toastErr(error.response_message);
          });
        }
      }]);

      return ForgotPasswordComponent;
    }();

    ForgotPasswordComponent.ctorParameters = function () {
      return [{
        type: _orbistur_service_service__WEBPACK_IMPORTED_MODULE_3__["OrbisturServiceService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]
      }, {
        type: ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"]
      }];
    };

    ForgotPasswordComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-forgot-password',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./forgot-password.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/forgot-password/forgot-password.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./forgot-password.component.css */
      "./src/app/forgot-password/forgot-password.component.css")).default]
    })], ForgotPasswordComponent);
    /***/
  },

  /***/
  "./src/app/login/login.component.css":
  /*!*******************************************!*\
    !*** ./src/app/login/login.component.css ***!
    \*******************************************/

  /*! exports provided: default */

  /***/
  function srcAppLoginLoginComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".col-xs-4{\n    width: 100%;\n}\n.login-box-body, .register-box-body{\nbackground: #fff;\npadding: 20px;\nborder-top: 0;\ncolor: #666;\nbox-shadow: 3px 3px 33px 13px #aba6a64a;}\n.lognBrn{\n    margin-top: 12px;\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: center;\n            justify-content: center;\n}\n.robot{\n    margin-top:18px;\n}\n.lognBrn button{\n    font-size: 22px;\n    line-height: 25px;\n    color:black;\n    font-family: \"Adelle\";\n    font-weight: bold;\n    height: 53px;\n    border-radius: 4px;\n    background-color: #e8ae0cde;\n    width: 100%;\n    border-radius: 32px;\n    max-width: 63%;\n    font-size: 17px;\n    font-weight: unset;\n}\n.login-box.register-box{\n    width: 683px!important;\n    margin: 13% auto!important;\n}\n.login-box-body[_ngcontent-ank-c1], .register-box-body[_ngcontent-ank-c1] {\n    background: #fff;\n    padding: 37px;\n    border-top: 0;\n    color: #666;\n    box-shadow: 3px 3px 33px 13px #aba6a64a;\n}\n.login-box{    \n    padding: 27px;\n    width: 700px!important;\n    min-height: calc(100vh - 230px);\n}\n.selct{\n    margin-right: 26px;\n    width: 118px;\n    margin-top: 10px;\n    height: 29px;\n    padding: 0px 10px;\n}\n.box-bdy{\n    padding:40px;\n}\n.logb{\n    width:100%;\n}\n.custom-nav img{\n    border-radius: 50%;\n    height: 40px;\n    width: 40px;\n    \n}\n.custom-nav {\n    margin: 0px 15px 0px 0px;\n}\n.custom-navbar {\n    margin: 0px 15px 0px 0px;\n}\n.custom-nav img{\n    margin-right: 10px;\n}\n.custom-slct{\n    height: 29px;\n}\n.robot {\n    margin-top: 18px;\n    font-size: 18px;\n    font-weight: 600;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbG9naW4vbG9naW4uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFdBQVc7QUFDZjtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLGFBQWE7QUFDYixhQUFhO0FBQ2IsV0FBVztBQUNYLHVDQUF1QyxDQUFDO0FBQ3hDO0lBQ0ksZ0JBQWdCO0lBQ2hCLG9CQUFhO0lBQWIsYUFBYTtJQUNiLHdCQUF1QjtZQUF2Qix1QkFBdUI7QUFDM0I7QUFDQTtJQUNJLGVBQWU7QUFDbkI7QUFDQTtJQUNJLGVBQWU7SUFDZixpQkFBaUI7SUFDakIsV0FBVztJQUNYLHFCQUFxQjtJQUNyQixpQkFBaUI7SUFDakIsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQiwyQkFBMkI7SUFDM0IsV0FBVztJQUNYLG1CQUFtQjtJQUNuQixjQUFjO0lBQ2QsZUFBZTtJQUNmLGtCQUFrQjtBQUN0QjtBQUNBO0lBQ0ksc0JBQXNCO0lBQ3RCLDBCQUEwQjtBQUM5QjtBQUNBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYixhQUFhO0lBQ2IsV0FBVztJQUNYLHVDQUF1QztBQUMzQztBQUNBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QiwrQkFBK0I7QUFDbkM7QUFHQTtJQUNJLGtCQUFrQjtJQUNsQixZQUFZO0lBQ1osZ0JBQWdCO0lBQ2hCLFlBQVk7SUFDWixpQkFBaUI7QUFDckI7QUFDQTtJQUNJLFlBQVk7QUFDaEI7QUFDQTtJQUNJLFVBQVU7QUFDZDtBQUdBO0lBQ0ksa0JBQWtCO0lBQ2xCLFlBQVk7SUFDWixXQUFXOztBQUVmO0FBQ0E7SUFDSSx3QkFBd0I7QUFDNUI7QUFDQTtJQUNJLHdCQUF3QjtBQUM1QjtBQUNBO0lBQ0ksa0JBQWtCO0FBQ3RCO0FBQ0E7SUFDSSxZQUFZO0FBQ2hCO0FBQ0E7SUFDSSxnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLGdCQUFnQjtBQUNwQiIsImZpbGUiOiJzcmMvYXBwL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29sLXhzLTR7XG4gICAgd2lkdGg6IDEwMCU7XG59XG4ubG9naW4tYm94LWJvZHksIC5yZWdpc3Rlci1ib3gtYm9keXtcbmJhY2tncm91bmQ6ICNmZmY7XG5wYWRkaW5nOiAyMHB4O1xuYm9yZGVyLXRvcDogMDtcbmNvbG9yOiAjNjY2O1xuYm94LXNoYWRvdzogM3B4IDNweCAzM3B4IDEzcHggI2FiYTZhNjRhO31cbi5sb2duQnJue1xuICAgIG1hcmdpbi10b3A6IDEycHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cbi5yb2JvdHtcbiAgICBtYXJnaW4tdG9wOjE4cHg7XG59XG4ubG9nbkJybiBidXR0b257XG4gICAgZm9udC1zaXplOiAyMnB4O1xuICAgIGxpbmUtaGVpZ2h0OiAyNXB4O1xuICAgIGNvbG9yOmJsYWNrO1xuICAgIGZvbnQtZmFtaWx5OiBcIkFkZWxsZVwiO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGhlaWdodDogNTNweDtcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2U4YWUwY2RlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJvcmRlci1yYWRpdXM6IDMycHg7XG4gICAgbWF4LXdpZHRoOiA2MyU7XG4gICAgZm9udC1zaXplOiAxN3B4O1xuICAgIGZvbnQtd2VpZ2h0OiB1bnNldDtcbn1cbi5sb2dpbi1ib3gucmVnaXN0ZXItYm94e1xuICAgIHdpZHRoOiA2ODNweCFpbXBvcnRhbnQ7XG4gICAgbWFyZ2luOiAxMyUgYXV0byFpbXBvcnRhbnQ7XG59XG4ubG9naW4tYm94LWJvZHlbX25nY29udGVudC1hbmstYzFdLCAucmVnaXN0ZXItYm94LWJvZHlbX25nY29udGVudC1hbmstYzFdIHtcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgIHBhZGRpbmc6IDM3cHg7XG4gICAgYm9yZGVyLXRvcDogMDtcbiAgICBjb2xvcjogIzY2NjtcbiAgICBib3gtc2hhZG93OiAzcHggM3B4IDMzcHggMTNweCAjYWJhNmE2NGE7XG59XG4ubG9naW4tYm94eyAgICBcbiAgICBwYWRkaW5nOiAyN3B4O1xuICAgIHdpZHRoOiA3MDBweCFpbXBvcnRhbnQ7XG4gICAgbWluLWhlaWdodDogY2FsYygxMDB2aCAtIDIzMHB4KTtcbn1cblxuXG4uc2VsY3R7XG4gICAgbWFyZ2luLXJpZ2h0OiAyNnB4O1xuICAgIHdpZHRoOiAxMThweDtcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xuICAgIGhlaWdodDogMjlweDtcbiAgICBwYWRkaW5nOiAwcHggMTBweDtcbn1cbi5ib3gtYmR5e1xuICAgIHBhZGRpbmc6NDBweDtcbn1cbi5sb2die1xuICAgIHdpZHRoOjEwMCU7XG59XG5cblxuLmN1c3RvbS1uYXYgaW1ne1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBoZWlnaHQ6IDQwcHg7XG4gICAgd2lkdGg6IDQwcHg7XG4gICAgXG59XG4uY3VzdG9tLW5hdiB7XG4gICAgbWFyZ2luOiAwcHggMTVweCAwcHggMHB4O1xufVxuLmN1c3RvbS1uYXZiYXIge1xuICAgIG1hcmdpbjogMHB4IDE1cHggMHB4IDBweDtcbn1cbi5jdXN0b20tbmF2IGltZ3tcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG59XG4uY3VzdG9tLXNsY3R7XG4gICAgaGVpZ2h0OiAyOXB4O1xufVxuLnJvYm90IHtcbiAgICBtYXJnaW4tdG9wOiAxOHB4O1xuICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICBmb250LXdlaWdodDogNjAwO1xufSJdfQ== */";
    /***/
  },

  /***/
  "./src/app/login/login.component.ts":
  /*!******************************************!*\
    !*** ./src/app/login/login.component.ts ***!
    \******************************************/

  /*! exports provided: LoginComponent */

  /***/
  function srcAppLoginLoginComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LoginComponent", function () {
      return LoginComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _orbistur_service_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../orbistur-service.service */
    "./src/app/orbistur-service.service.ts");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");

    var LoginComponent =
    /*#__PURE__*/
    function () {
      function LoginComponent(service, fb, router, spinner) {
        _classCallCheck(this, LoginComponent);

        this.service = service;
        this.fb = fb;
        this.router = router;
        this.spinner = spinner;
        this.remembers = false;
      }

      _createClass(LoginComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          if (!localStorage.getItem('ok')) {
            this.router.navigate(['dashboard']);
          }

          this.loginForm = this.fb.group({
            "email": ["", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(60), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)])],
            "password": ["", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(8), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(16)])],
            "remember": [true]
          });

          if (JSON.parse(localStorage.getItem('remembers')) == true) {
            this.loginForm.patchValue({
              "email": window.atob(localStorage.getItem('email')),
              "password": window.atob(localStorage.getItem('password'))
            });
          } else {
            localStorage.clear();
            this.loginForm.reset();
          }
        } // ******************Login Api*******************//

      }, {
        key: "login",
        value: function login() {
          var _this69 = this;

          this.spinner.show();

          if (localStorage != null) {
            localStorage.setItem('email', window.btoa(this.loginForm.value.email));
            localStorage.setItem('password', window.btoa(this.loginForm.value.password));
          } else {
            this.loginForm.reset();
          }

          localStorage.setItem('remembers', JSON.stringify(this.loginForm.value.remember));
          var object = {
            "email": this.loginForm.value.email,
            "password": this.loginForm.value.password
          };
          console.log('object', object);
          this.service.postApi('admin/login', object, 0).subscribe(function (res) {
            if (res.body.response_code == 200) {
              localStorage.setItem('oka', 'ok');

              _this69.service.showSuccess(res.body.response_message);

              _this69.spinner.hide();

              _this69.token = res.body.result.token;
              localStorage.setItem('token', res.body.result.token);

              _this69.router.navigate(['dashboard']);
            } else {
              _this69.spinner.hide();

              _this69.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this69.spinner.hide();

            _this69.service.toastErr('Internal server error');
          });
        }
      }]);

      return LoginComponent;
    }();

    LoginComponent.ctorParameters = function () {
      return [{
        type: _orbistur_service_service__WEBPACK_IMPORTED_MODULE_4__["OrbisturServiceService"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]
      }, {
        type: ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"]
      }];
    };

    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-login',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./login.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/login/login.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./login.component.css */
      "./src/app/login/login.component.css")).default]
    })], LoginComponent);
    /***/
  },

  /***/
  "./src/app/my-profile/my-profile.component.css":
  /*!*****************************************************!*\
    !*** ./src/app/my-profile/my-profile.component.css ***!
    \*****************************************************/

  /*! exports provided: default */

  /***/
  function srcAppMyProfileMyProfileComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".add{\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: center;\n            justify-content: center;\n}\n\n.btn{\n    width: 100%;\n    max-width: 183px;\n    border-radius: 18px;\n    height: 42px;\n    font-size: 24px;\n    padding: 0px;\n    background-color: #e8ae0cde!important;\n    border: navajowhite;\n}\n\n.wr{\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: center;\n            justify-content: center;\n    box-shadow: 5px 10px #888888;\n    border: 1px solid;\n}\n\n.bd{\n    width: 48%;\n}\n\n.imgs{\n    border-radius: 100px;\n    width: 150px;\n    height: 150px;\n}\n\n.input#file-input {\n    display: none;\n  }\n  \n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbXktcHJvZmlsZS9teS1wcm9maWxlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxvQkFBYTtJQUFiLGFBQWE7SUFDYix3QkFBdUI7WUFBdkIsdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksV0FBVztJQUNYLGdCQUFnQjtJQUNoQixtQkFBbUI7SUFDbkIsWUFBWTtJQUNaLGVBQWU7SUFDZixZQUFZO0lBQ1oscUNBQXFDO0lBQ3JDLG1CQUFtQjtBQUN2Qjs7QUFDQTtJQUNJLG9CQUFhO0lBQWIsYUFBYTtJQUNiLHdCQUF1QjtZQUF2Qix1QkFBdUI7SUFDdkIsNEJBQTRCO0lBQzVCLGlCQUFpQjtBQUNyQjs7QUFDQTtJQUNJLFVBQVU7QUFDZDs7QUFDQTtJQUNJLG9CQUFvQjtJQUNwQixZQUFZO0lBQ1osYUFBYTtBQUNqQjs7QUFDQTtJQUNJLGFBQWE7RUFDZiIsImZpbGUiOiJzcmMvYXBwL215LXByb2ZpbGUvbXktcHJvZmlsZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmFkZHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4uYnRue1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1heC13aWR0aDogMTgzcHg7XG4gICAgYm9yZGVyLXJhZGl1czogMThweDtcbiAgICBoZWlnaHQ6IDQycHg7XG4gICAgZm9udC1zaXplOiAyNHB4O1xuICAgIHBhZGRpbmc6IDBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZThhZTBjZGUhaW1wb3J0YW50O1xuICAgIGJvcmRlcjogbmF2YWpvd2hpdGU7XG59XG4ud3J7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBib3gtc2hhZG93OiA1cHggMTBweCAjODg4ODg4O1xuICAgIGJvcmRlcjogMXB4IHNvbGlkO1xufVxuLmJke1xuICAgIHdpZHRoOiA0OCU7XG59XG4uaW1nc3tcbiAgICBib3JkZXItcmFkaXVzOiAxMDBweDtcbiAgICB3aWR0aDogMTUwcHg7XG4gICAgaGVpZ2h0OiAxNTBweDtcbn1cbi5pbnB1dCNmaWxlLWlucHV0IHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG4gICJdfQ== */";
    /***/
  },

  /***/
  "./src/app/my-profile/my-profile.component.ts":
  /*!****************************************************!*\
    !*** ./src/app/my-profile/my-profile.component.ts ***!
    \****************************************************/

  /*! exports provided: MyProfileComponent */

  /***/
  function srcAppMyProfileMyProfileComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MyProfileComponent", function () {
      return MyProfileComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _orbistur_service_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../orbistur-service.service */
    "./src/app/orbistur-service.service.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");

    var MyProfileComponent =
    /*#__PURE__*/
    function () {
      function MyProfileComponent(service, router, formbuilder, spinner) {
        _classCallCheck(this, MyProfileComponent);

        this.service = service;
        this.router = router;
        this.formbuilder = formbuilder;
        this.spinner = spinner;
        this.type = "password";
        this.show = false;
      }

      _createClass(MyProfileComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.getprofileForm = this.formbuilder.group({
            'name': ["", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(60), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(2), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern("[a-zA-Z ]*")])],
            'email': ["", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(60), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)])],
            'mobileNumber': ["", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(16), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern(/^[1-9][0-9]{9}$/)])],
            'password': ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(8), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(16), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i)]],
            'confirmPassword': ["", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            'address': ["", _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(256)])]
          });
          this.getProfile();
        } // *************************Image upload event****************//

      }, {
        key: "handleInputChange",
        value: function handleInputChange(e) {
          var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
          var pattern = /image-*/;
          var reader = new FileReader();

          if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
          }

          reader.onload = this._handleReaderLoaded.bind(this);
          reader.readAsDataURL(file);
        }
      }, {
        key: "_handleReaderLoaded",
        value: function _handleReaderLoaded(e) {
          var reader = e.target;
          this.profile = reader.result;
          console.log("profile", this.profile);
        } // ********************get profile Api******************//

      }, {
        key: "getProfile",
        value: function getProfile() {
          var _this70 = this;

          this.service.getApi('admin/getProfile', 1).subscribe(function (res) {
            if (res.status == 200) {
              // this.Service.showSuccess('Details have been fetched successfully')
              _this70.profile = res.body.result.profilePic;
              _this70.data = res.body.result, _this70.email = _this70.data.email, _this70.name = _this70.data.firstName, _this70.mobilenumber = _this70.data.mobileNumber, _this70.address = _this70.data.address;
              console.log("dfsgdfsgdsfg", _this70.name, _this70.mobilenumber);
              console.log('name', _this70.data);

              _this70.getprofileForm.patchValue({
                'name': _this70.getprofileForm.value.name,
                'email': _this70.getprofileForm.value.email,
                'mobileNumber': _this70.getprofileForm.value.mobileNumber,
                'password': _this70.getprofileForm.value.password,
                'confirmPassword': _this70.getprofileForm.value.confirmPassword,
                'address': _this70.getprofileForm.value.address,
                'profilePic': _this70.profile
              });
            }
          }, function (error) {
            _this70.service.toastErr('Internal server error');
          });
        }
      }, {
        key: "editProfile",
        value: function editProfile() {
          var _this71 = this;

          var object = {
            'name': this.getprofileForm.value.name,
            'email': this.getprofileForm.value.email,
            'mobileNumber': this.getprofileForm.value.mobileNumber,
            'password': this.getprofileForm.value.password,
            'confirmPassword': this.getprofileForm.value.confirmPassword,
            'address': this.getprofileForm.value.address,
            'profilePic': this.profile
          }; // console.log('value',this.myProfileForm.value.buddies)

          console.log('object', object);
          this.service.putApi('admin/editProfile', object, 1).subscribe(function (res) {
            console.log('resEdit===>>', res);

            if (res.body.response_code == 200) {
              _this71.profile = res.body.result.profilePic; // this.service.showSuccess(res.body.response_message)

              _this71.router.navigate(['dashboard']);

              console.log('profile===>>', _this71.profile);

              _this71.getProfile();
            } else _this71.service.toastErr(res.body.response_message);
          }, function (error) {
            _this71.service.toastErr("Internal server error");
          });
        } // ----------------fafa-icon----------///

      }, {
        key: "toggleShow",
        value: function toggleShow() {
          this.show = !this.show;

          if (this.show) {
            this.type = "text";
          } else {
            this.type = "password";
          }
        }
      }]);

      return MyProfileComponent;
    }();

    MyProfileComponent.ctorParameters = function () {
      return [{
        type: _orbistur_service_service__WEBPACK_IMPORTED_MODULE_3__["OrbisturServiceService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]
      }, {
        type: ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"]
      }];
    };

    MyProfileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-my-profile',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./my-profile.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/my-profile/my-profile.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./my-profile.component.css */
      "./src/app/my-profile/my-profile.component.css")).default]
    })], MyProfileComponent);
    /***/
  },

  /***/
  "./src/app/orbistur-service.service.ts":
  /*!*********************************************!*\
    !*** ./src/app/orbistur-service.service.ts ***!
    \*********************************************/

  /*! exports provided: OrbisturServiceService */

  /***/
  function srcAppOrbisturServiceServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "OrbisturServiceService", function () {
      return OrbisturServiceService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/fesm2015/http.js");
    /* harmony import */


    var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ngx-toastr */
    "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");

    var OrbisturServiceService =
    /*#__PURE__*/
    function () {
      function OrbisturServiceService(http, toastr) {
        _classCallCheck(this, OrbisturServiceService);

        this.http = http;
        this.toastr = toastr; // ********************Local base url**********************//
        //  baseUrl = "http://172.16.6.162:1800/api/v1/";  

        this.websiteUrls = "http://172.16.6.170:4205/"; // gfhasfhjashjasdshjas
        // ********************Stag base url**********************//

        this.baseUrl = "http://ec2-35-176-66-190.eu-west-2.compute.amazonaws.com:1505/api/v1/"; // ***********************Country Json***********************//

        this.countryListJson = [{
          "country": "Algeria",
          "states": ["Adrar", "Ain Defla", "Ain Temouchent", "Alger", "Annaba", "Batna", "Bechar", "Bejaia", "Biskra", "Blida", "Bordj Bou Arreridj", "Bouira", "Boumerdes", "Chlef", "Constantine", "Djelfa", "El Bayadh", "El Oued", "El Tarf", "Ghardaia", "Guelma", "Illizi", "Jijel", "Khenchela", "Laghouat", "Muaskar", "Medea", "Mila", "Mostaganem", "M'Sila", "Naama", "Oran", "Ouargla", "Oum el Bouaghi", "Relizane", "Saida", "Setif", "Sidi Bel Abbes", "Skikda", "Souk Ahras", "Tamanghasset", "Tebessa", "Tiaret", "Tindouf", "Tipaza", "Tissemsilt", "Tizi Ouzou", "Tlemcen"],
          "code": "+213"
        }, {
          "country": "Andorra",
          "states": ["Andorra la Vella", "Canillo", "Encamp", "Escaldes-Engordany", "La Massana", "Ordino", "Sant Julia de Loria"],
          "code": "+376"
        }, {
          "country": "Angola",
          "states": ["Bengo", "Benguela", "Bie", "Cabinda", "Cuando Cubango", "Cuanza Norte", "Cuanza Sul", "Cunene", "Huambo", "Huila", "Luanda", "Lunda Norte", "Lunda Sul", "Malanje", "Moxico", "Namibe", "Uige", "Zaire"],
          "code": "+244"
        }, {
          "country": "Anguilla",
          "states": ["Big Spring Cave", "East End Pond"],
          "code": "+1264"
        }, {
          "country": "Antigua & Barbuda",
          "states": ["St. John's"],
          "code": "+1268"
        }, {
          "country": "Argentina",
          "states": ["Buenos Aires", "Buenos Aires Capital", "Catamarca", "Chaco", "Chubut", "Cordoba", "Corrientes", "Entre Rios", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquen", "Rio Negro", "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucuman"],
          "code": "+54"
        }, {
          "country": "Armenia",
          "states": ["Aragatsotn", "Ararat", "Armavir", "Geghark'unik'", "Kotayk'", "Lorri", "Shirak", "Syunik'", "Tavush", "Vayots' Dzor", "Yerevan"],
          "code": "+374"
        }, {
          "country": "Aruba",
          "states": ["Oranjestad"],
          "code": "+297"
        }, {
          "country": "Australia",
          "states": ["New South Wales", "Queensland", "South Australia", "Tasmania", "Victoria"],
          "code": "+61"
        }, {
          "country": "Austria",
          "states": ["Burgenland", "Kaernten", "Niederoesterreich", "Oberoesterreich", "Salzburg", "Steiermark", "Tirol", "Vorarlberg", "Wien"],
          "code": "+43"
        }, {
          "country": "Azerbaijan",
          "states": ["Abseron Rayonu", "Agcabadi Rayonu", "Agdam Rayonu", "Agdas Rayonu", "Agstafa Rayonu", "Agsu Rayonu", "Astara Rayonu", "Balakan Rayonu", "Barda Rayonu", "Beylaqan Rayonu", "Bilasuvar Rayonu", "Cabrayil Rayonu", "Calilabad Rayonu", "Daskasan Rayonu", "Davaci Rayonu", "Fuzuli Rayonu", "Gadabay Rayonu", "Goranboy Rayonu", "Goycay Rayonu", "Haciqabul Rayonu", "Imisli Rayonu", "Ismayilli Rayonu", "Kalbacar Rayonu", "Kurdamir Rayonu", "Lacin Rayonu", "Lankaran Rayonu", "Lerik Rayonu", "Masalli Rayonu", "Neftcala Rayonu", "Oguz Rayonu", "Qabala Rayonu", "Qax Rayonu", "Qazax Rayonu", "Qobustan Rayonu", "Quba Rayonu", "Qubadli Rayonu", "Qusar Rayonu", "Saatli Rayonu", "Sabirabad Rayonu", "Saki Rayonu", "Salyan Rayonu", "Samaxi Rayonu", "Samkir Rayonu", "Samux Rayonu", "Siyazan Rayonu", "Susa Rayonu", "Tartar Rayonu", "Tovuz Rayonu", "Ucar Rayonu", "Xacmaz Rayonu", "Xanlar Rayonu", "Xizi Rayonu", "Xocali Rayonu", "Xocavand Rayonu", "Yardimli Rayonu", "Yevlax Rayonu", "Zangilan Rayonu", "Zaqatala Rayonu", "Zardab Rayonu", "Ali Bayramli Sahari", "Baki Sahari", "Ganca Sahari", "Lankaran Sahari", "Mingacevir Sahari", "Naftalan Sahari", "Saki Sahari", "Sumqayit Sahari", "Susa Sahari", "Xankandi Sahari", "Yevlax Sahari", "Naxcivan Muxtar"],
          "code": "+994"
        }, {
          "country": "Bahamas",
          "states": ["Acklins and Crooked Islands", "Bimini", "Cat Island", "Exuma", "Freeport", "Fresh Creek", "Governor's Harbour", "Green Turtle Cay", "Harbour Island", "High Rock", "Inagua", "Kemps Bay", "Long Island", "Marsh Harbour", "Mayaguana", "New Providence", "Nichollstown and Berry Islands", "Ragged Island", "Rock Sound", "Sandy Point", "San Salvador and Rum Cay"],
          "code": "+1242"
        }, {
          "country": "Bahrain",
          "states": ["Al Hadd", "Al Manamah", "Al Mintaqah al Gharbiyah", "Al Mintaqah al Wusta", "Al Mintaqah ash Shamaliyah", "Al Muharraq", "Ar Rifa' wa al Mintaqah al Janubiyah", "Jidd Hafs", "Madinat Hamad", "Madinat 'Isa", "Juzur Hawar", "Sitrah"],
          "code": "+973"
        }, {
          "country": "Bangladesh",
          "states": ["Barisal", "Chittagong", "Dhaka", "Khulna", "Rajshahi", "Sylhet"],
          "code": "+880"
        }, {
          "country": "Barbados",
          "states": ["Christ Church", "Saint Andrew", "Saint George", "Saint James", "Saint John", "Saint Joseph", "Saint Lucy", "Saint Michael", "Saint Peter", "Saint Philip", "Saint Thomas"],
          "code": "+1246"
        }, {
          "country": "Belarus",
          "states": ["Brest", "Homyel", "Horad Minsk", "Hrodna", "Mahilyow", "Minsk", "Vitsyebsk"],
          "code": "+375"
        }, {
          "country": "Belgium",
          "states": ["Antwerpen", "Brabant Wallon", "Brussels", "Flanders", "Hainaut", "Liege", "Limburg", "Luxembourg", "Namur", "Oost-Vlaanderen", "Vlaams-Brabant", "Wallonia", "West-Vlaanderen"],
          "code": "+32"
        }, {
          "country": "Belize",
          "states": ["Belize", "Cayo", "Corozal", "Orange Walk", "Stann Creek", "Toledo"],
          "code": "+501"
        }, {
          "country": "Benin",
          "states": ["Alibori", "Atakora", "Atlantique", "Borgou", "Collines", "Donga", "Kouffo", "Littoral", "Mono", "Oueme", "Plateau", "Zou"],
          "code": "+229"
        }, {
          "country": "Bermuda",
          "states": ["Devonshire", "Hamilton", "Hamilton", "Paget", "Pembroke", "Saint George", "Saint George's", "Sandys", "Smith's", "Southampton", "Warwick"],
          "code": "+1441"
        }, {
          "country": "Bhutan",
          "states": ["Bumthang", "Chukha", "Dagana", "Gasa", "Haa", "Lhuntse", "Mongar", "Paro", "Pemagatshel", "Punakha", "Samdrup Jongkhar", "Samtse", "Sarpang", "Thimphu", "Trashigang", "Trashiyangste", "Trongsa", "Tsirang", "Wangdue Phodrang", "Zhemgang"],
          "code": "+975"
        }, {
          "country": "Bolivia",
          "states": ["Chuquisaca", "Cochabamba", "Beni", "La Paz", "Oruro", "Pando", "Potosi", "Santa Cruz", "Tarija"],
          "code": "+591"
        }, {
          "country": "Bosnia Herzegovina",
          "states": ["Una-Sana [Federation]", "Posavina [Federation]", "Tuzla [Federation]", "Zenica-Doboj [Federation]", "Bosnian Podrinje [Federation]", "Central Bosnia [Federation]", "Herzegovina-Neretva [Federation]", "West Herzegovina [Federation]", "Sarajevo [Federation]", " West Bosnia [Federation]", "Banja Luka [RS]", "Bijeljina [RS]", "Doboj [RS]", "Fo?a [RS]", "Sarajevo-Romanija [RS]", "Trebinje [RS]", "Vlasenica [RS]"],
          "code": "+387"
        }, {
          "country": "Botswana",
          "states": ["Central", "Ghanzi", "Kgalagadi", "Kgatleng", "Kweneng", "North East", "North West", "South East", "Southern"],
          "code": "+261"
        }, {
          "country": "Brazil",
          "states": ["Acre", "Alagoas", "Amapa", "Amazonas", "Bahia", "Ceara", "Distrito Federal", "Espirito Santo", "Goias", "Maranhao", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Para", "Paraiba", "Parana", "Pernambuco", "Piaui", "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondonia", "Roraima", "Santa Catarina", "Sao Paulo", "Sergipe", "Tocantins"],
          "code": "+55"
        }, {
          "country": "Brunei",
          "states": ["Belait", "Brunei and Muara", "Temburong", "Tutong"],
          "code": "+673"
        }, {
          "country": "Bulgaria",
          "states": ["Blagoevgrad", "Burgas", "Dobrich", "Gabrovo", "Khaskovo", "Kurdzhali", "Kyustendil", "Lovech", "Montana", "Pazardzhik", "Pernik", "Pleven", "Plovdiv", "Razgrad", "Ruse", "Shumen", "Silistra", "Sliven", "Smolyan", "Sofiya", "Sofiya-Grad", "Stara Zagora", "Turgovishte", "Varna", "Veliko Turnovo", "Vidin", "Vratsa", "Yambol"],
          "code": "+359"
        }, {
          "country": "Burkina Faso",
          "states": ["Bale", "Bam", "Banwa", "Bazega", "Bougouriba", "Boulgou", "Boulkiemde", "Comoe", "Ganzourgou", "Gnagna", "Gourma", "Houet", "Ioba", "Kadiogo", "Kenedougou", "Komondjari", "Kompienga", "Kossi", "Koulpelogo", "Kouritenga", "Kourweogo", "Leraba", "Loroum", "Mouhoun", "Namentenga", "Nahouri", "Nayala", "Noumbiel", "Oubritenga", "Oudalan", "Passore", "Poni", "Sanguie", "Sanmatenga", "Seno", "Sissili", "Soum", "Sourou", "Tapoa", "Tuy", "Yagha", "Yatenga", "Ziro", "Zondoma", "Zoundweogo"],
          "code": "+226"
        }, {
          "country": "Burundi",
          "states": ["Bubanza", "Bujumbura Mairie", "Bujumbura Rural", "Bururi", "Cankuzo", "Cibitoke", "Gitega", "Karuzi", "Kayanza", "Kirundo", "Makamba", "Muramvya", "Muyinga", "Mwaro", "Ngozi", "Rutana", "Ruyigi"],
          "code": "+257"
        }, {
          "country": "Cambodia",
          "states": ["Banteay Mean Chey", "Batdambang", "Kampong Cham", "Kampong Chhnang", "Kampong Spoe", "Kampong Thum", "Kampot", "Kandal", "Koh Kong", "Kracheh", "Mondol Kiri", "Otdar Mean Chey", "Pouthisat", "Preah Vihear", "Prey Veng", "Rotanakir", "Siem Reab", "Stoeng Treng", "Svay Rieng", "Takao", "Keb", "Pailin", "Phnom Penh", "Preah Seihanu"],
          "code": "+855"
        }, {
          "country": "Cameroon",
          "states": ["Adamaoua", "Centre", "Est", "Extreme-Nord", "Littoral", "Nord", "Nord-Ouest", "Ouest", "Sud", "Sud-Ouest"],
          "code": "+237"
        }, {
          "country": "Canada",
          "states": ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon Territory"],
          "code": "+1"
        }, {
          "country": "Cape Verde Islands",
          "states": ["Barlavento", "Santo Antão", "São Vicente", "Santa Luzia", "São Nicolau", "Boa Vista", "Sal"],
          "code": "+238"
        }, {
          "country": "Central African Republic",
          "states": ["Bamingui-Bangoran", "Bangui", "Basse-Kotto", "Haute-Kotto", "Haut-Mbomou", "Kemo", "Lobaye", "Mambere-Kadei", "Mbomou", "Nana-Grebizi", "Nana-Mambere", "Ombella-Mpoko", "Ouaka", "Ouham", "Ouham-Pende", "Sangha-Mbaere", "Vakaga"],
          "code": "+236"
        }, {
          "country": "Chile",
          "states": ["Aysen", "Antofagasta", "Araucania", "Atacama", "Bio-Bio", "Coquimbo", "O'Higgins", "Los Lagos", "Magallanes y la Antartica Chilena", "Maule", "Santiago Region Metropolitana", "Tarapaca", "Valparaiso"],
          "code": "+56"
        }, {
          "country": "China",
          "states": ["Anhui", "Fujian", "Gansu", "Guangdong", "Guizhou", "Hainan", "Hebei", "Heilongjiang", "Henan", "Hubei", "Hunan", "Jiangsu", "Jiangxi", "Jilin", "Liaoning", "Qinghai", "Shaanxi", "Shandong", "Shanxi", "Sichuan", "Yunnan", "Zhejiang", "Guangxi", "Nei Mongol", "Ningxia", "Xinjiang", "Xizang (Tibet)", "Beijing", "Chongqing", "Shanghai", "Tianjin"],
          "code": "+86"
        }, {
          "country": "Colombia",
          "states": ["Amazonas", "Antioquia", "Arauca", "Atlantico", "Bogota District Capital", "Bolivar", "Boyaca", "Caldas", "Caqueta", "Casanare", "Cauca", "Cesar", "Choco", "Cordoba", "Cundinamarca", "Guainia", "Guaviare", "Huila", "La Guajira", "Magdalena", "Meta", "Narino", "Norte de Santander", "Putumayo", "Quindio", "Risaralda", "San Andres & Providencia", "Santander", "Sucre", "Tolima", "Valle del Cauca", "Vaupes", "Vichada"],
          "code": "+57"
        }, {
          "country": "Comoros",
          "states": ["Grande Comore (Njazidja)", "Anjouan (Nzwani)", "Moheli (Mwali)"],
          "code": "+269"
        }, {
          "country": "Congo",
          "states": ["Bandundu", "Bas-Congo", "Equateur", "Kasai-Occidental", "Kasai-Oriental", "Katanga", "Kinshasa", "Maniema", "Nord-Kivu", "Orientale", "Sud-Kivu"],
          "code": "+242"
        }, {
          "country": "Costa Rica",
          "states": ["Alajuela", "Cartago", "Guanacaste", "Heredia", "Limon", "Puntarenas", "San Jose"],
          "code": "+506"
        }, {
          "country": "Croatia",
          "states": ["Bjelovarsko-Bilogorska", "Brodsko-Posavska", "Dubrovacko-Neretvanska", "Istarska", "Karlovacka", "Koprivnicko-Krizevacka", "Krapinsko-Zagorska", "Licko-Senjska", "Medimurska", "Osjecko-Baranjska", "Pozesko-Slavonska", "Primorsko-Goranska", "Sibensko-Kninska", "Sisacko-Moslavacka", "Splitsko-Dalmatinska", "Varazdinska", "Viroviticko-Podravska", "Vukovarsko-Srijemska", "Zadarska", "Zagreb", "Zagrebacka"],
          "code": "+385"
        }, {
          "country": "Cuba",
          "states": ["Camaguey", "Ciego de Avila", "Cienfuegos", "Ciudad de La Habana", "Granma", "Guantanamo", "Holguin", "Isla de la Juventud", "La Habana", "Las Tunas", "Matanzas", "Pinar del Rio", "Sancti Spiritus", "Santiago de Cuba", "Villa Clara"],
          "code": "+53"
        }, {
          "country": "Cyprus North",
          "states": ["Famagusta", "Kyrenia", "Larnaca", "Limassol", "Nicosia", "Paphos"],
          "code": "+90392"
        }, {
          "country": "Cyprus South",
          "states": ["Famagusta", "Kyrenia", "Larnaca", "Limassol", "Nicosia", "Paphos"],
          "code": "+357"
        }, {
          "country": "Czech Republic",
          "states": ["Jihocesky Kraj", "Jihomoravsky Kraj", "Karlovarsky Kraj", "Kralovehradecky Kraj", "Liberecky Kraj", "Moravskoslezsky Kraj", "Olomoucky Kraj", "Pardubicky Kraj", "Plzensky Kraj", "Praha", "Stredocesky Kraj", "Ustecky Kraj", "Vysocina", "Zlinsky Kraj"],
          "code": "+42"
        }, {
          "country": "Denmark",
          "states": ["Arhus", "Bornholm", "Frederiksberg", "Frederiksborg", "Fyn", "Kobenhavn", "Kobenhavns", "Nordjylland", "Ribe", "Ringkobing", "Roskilde", "Sonderjylland", "Storstrom", "Vejle", "Vestsjalland", "Viborg"],
          "code": "+45"
        }, {
          "country": "Djibouti",
          "states": ["Ali Sabih", "Dikhil", "Djibouti", "Obock", "Tadjoura"],
          "code": "+253"
        }, {
          "country": "Dominica",
          "states": ["Saint Andrew", "Saint David", "Saint George", "Saint John", "Saint Joseph", "Saint Luke", "Saint Mark", "Saint Patrick", "Saint Paul", "Saint Peter"],
          "code": "+1809"
        }, {
          "country": "Dominican Republic",
          "states": ["Azua", "Baoruco", "Barahona", "Dajabon", "Distrito Nacional", "Duarte", "Elias Pina", "El Seibo", "Espaillat", "Hato Mayor", "Independencia", "La Altagracia", "La Romana", "La Vega", "Maria Trinidad Sanchez", "Monsenor Nouel", "Monte Cristi", "Monte Plata", "Pedernales", "Peravia", "Puerto Plata", "Salcedo", "Samana", "Sanchez Ramirez", "San Cristobal", "San Jose de Ocoa", "San Juan", "San Pedro de Macoris", "Santiago", "Santiago Rodriguez", "Santo Domingo", "Valverde"],
          "code": "+1809"
        }, {
          "country": "Ecuador",
          "states": ["Azuay", "Bolivar", "Canar", "Carchi", "Chimborazo", "Cotopaxi", "El Oro", "Esmeraldas", "Galapagos", "Guayas", "Imbabura", "Loja", "Los Rios", "Manabi", "Morona-Santiago", "Napo", "Orellana", "Pastaza", "Pichincha", "Sucumbios", "Tungurahua", "Zamora-Chinchipe"],
          "code": "+593"
        }, {
          "country": "Egypt",
          "states": ["Ad Daqahliyah", "Al Bahr al Ahmar", "Al Buhayrah", "Al Fayyum", "Al Gharbiyah", "Al Iskandariyah", "Al Isma'iliyah", "Al Jizah", "Al Minufiyah", "Al Minya", "Al Qahirah", "Al Qalyubiyah", "Al Wadi al Jadid", "Ash Sharqiyah", "As Suways", "Aswan", "Asyut", "Bani Suwayf", "Bur Sa'id", "Dumyat", "Janub Sina'", "Kafr ash Shaykh", "Matruh", "Qina", "Shamal Sina'", "Suhaj"],
          "code": "+20"
        }, {
          "country": "El Salvador",
          "states": ["Ahuachapan", "Cabanas", "Chalatenango", "Cuscatlan", "La Libertad", "La Paz", "La Union", "Morazan", "San Miguel", "San Salvador", "Santa Ana", "San Vicente", "Sonsonate", "Usulutan"],
          "code": "+503"
        }, {
          "country": "Equatorial Guinea",
          "states": ["Annobon", "Bioko Norte", "Bioko Sur", "Centro Sur", "Kie-Ntem", "Litoral", "Wele-Nzas"],
          "code": "+240"
        }, {
          "country": "Eritrea",
          "states": ["Anseba", "Debub", "Debubawi K'eyih Bahri", "Gash Barka", "Ma'akel", "Semenawi Keyih Bahri"],
          "code": "+291"
        }, {
          "country": "Estonia",
          "states": ["Harjumaa (Tallinn)", "Hiiumaa (Kardla)", "Ida-Virumaa (Johvi)", "Jarvamaa (Paide)", "Jogevamaa (Jogeva)", "Laanemaa (Haapsalu)", "Laane-Virumaa (Rakvere)", "Parnumaa (Parnu)", "Polvamaa (Polva)", "Raplamaa (Rapla)", "Saaremaa (Kuressaare)", "Tartumaa (Tartu)", "Valgamaa (Valga)", "Viljandimaa (Viljandi)", "Vorumaa (Voru)"],
          "code": "+372"
        }, {
          "country": "Ethiopia",
          "states": ["Addis Ababa", "Afar", "Amhara", "Binshangul Gumuz", "Dire Dawa", "Gambela Hizboch", "Harari", "Oromia", "Somali", "Tigray", "Southern Nations, Nationalities, and Peoples Region"],
          "code": "+251"
        }, {
          "country": "Fiji",
          "states": ["Central (Suva)", "Eastern (Levuka)", "Northern (Labasa)", "Rotuma", "Western (Lautoka)"],
          "code": "+679"
        }, {
          "country": "Finland",
          "states": ["Aland", "Etela-Suomen Laani", "Ita-Suomen Laani", "Lansi-Suomen Laani", "Lappi", "Oulun Laani"],
          "code": "+358"
        }, {
          "country": "France",
          "states": ["Alsace", "Aquitaine", "Auvergne", "Basse-Normandie", "Bourgogne", "Bretagne", "Centre", "Champagne-Ardenne", "Corse", "Franche-Comte", "Haute-Normandie", "Ile-de-France", "Languedoc-Roussillon", "Limousin", "Lorraine", "Midi-Pyrenees", "Nord-Pas-de-Calais", "Pays de la Loire", "Picardie", "Poitou-Charentes", "Provence-Alpes-Cote d'Azur", "Rhone-Alpes"],
          "code": "+33"
        }, {
          "country": "Gabon",
          "states": ["Estuaire", "Haut-Ogooue", "Moyen-Ogooue", "Ngounie", "Nyanga", "Ogooue-Ivindo", "Ogooue-Lolo", "Ogooue-Maritime", "Woleu-Ntem"],
          "code": "+241"
        }, {
          "country": "Gambia",
          "states": ["Banjul", "Central River", "Lower River", "North Bank", "Upper River", "Western"],
          "code": "+220"
        }, {
          "country": "Georgia",
          "states": ["Macon–Bibb County", "Georgetown–Quitman County"],
          "code": "+7880"
        }, {
          "country": "Germany",
          "states": ["Baden-Wuerttemberg", "Bayern", "Berlin", "Brandenburg", "Bremen", "Hamburg", "Hessen", "Mecklenburg-Vorpommern", "Niedersachsen", "Nordrhein-Westfalen", "Rheinland-Pfalz", "Saarland", "Sachsen", "Sachsen-Anhalt", "Schleswig-Holstein", "Thueringen"],
          "code": "+49"
        }, {
          "country": "Ghana",
          "states": ["Ashanti", "Brong-Ahafo", "Central", "Eastern", "Greater Accra", "Northern", "Upper East", "Upper West", "Volta", "Western"],
          "code": "+233"
        }, {
          "country": "Greece",
          "states": ["Agion Oros", "Achaia", "Aitolia kai Akarmania", "Argolis", "Arkadia", "Arta", "Attiki", "Chalkidiki", "Chanion", "Chios", "Dodekanisos", "Drama", "Evros", "Evrytania", "Evvoia", "Florina", "Fokidos", "Fthiotis", "Grevena", "Ileia", "Imathia", "Ioannina", "Irakleion", "Karditsa", "Kastoria", "Kavala", "Kefallinia", "Kerkyra", "Kilkis", "Korinthia", "Kozani", "Kyklades", "Lakonia", "Larisa", "Lasithi", "Lefkas", "Lesvos", "Magnisia", "Messinia", "Pella", "Pieria", "Preveza", "Rethynnis", "Rodopi", "Samos", "Serrai", "Thesprotia", "Thessaloniki", "Trikala", "Voiotia", "Xanthi", "Zakynthos"],
          "code": "+30"
        }, {
          "country": "Greenland",
          "states": ["Avannaa (Nordgronland)", "Tunu (Ostgronland)", "Kitaa (Vestgronland)"],
          "code": "+299"
        }, {
          "country": "Grenada",
          "states": ["Carriacou and Petit Martinique", "Saint Andrew", "Saint David", "Saint George", "Saint John", "Saint Mark", "Saint Patrick"],
          "code": "+1473"
        }, {
          "country": "Guatemala",
          "states": ["Alta Verapaz", "Baja Verapaz", "Chimaltenango", "Chiquimula", "El Progreso", "Escuintla", "Guatemala", "Huehuetenango", "Izabal", "Jalapa", "Jutiapa", "Peten", "Quetzaltenango", "Quiche", "Retalhuleu", "Sacatepequez", "San Marcos", "Santa Rosa", "Solola", "Suchitepequez", "Totonicapan", "Zacapa"],
          "code": "+502"
        }, {
          "country": "Guinea",
          "states": ["Beyla", "Boffa", "Boke", "Conakry", "Coyah", "Dabola", "Dalaba", "Dinguiraye", "Dubreka", "Faranah", "Forecariah", "Fria", "Gaoual", "Gueckedou", "Kankan", "Kerouane", "Kindia", "Kissidougou", "Koubia", "Koundara", "Kouroussa", "Labe", "Lelouma", "Lola", "Macenta", "Mali", "Mamou", "Mandiana", "Nzerekore", "Pita", "Siguiri", "Telimele", "Tougue", "Yomou"],
          "code": "+224"
        }, {
          "country": "Guinea - Bissau",
          "states": ["Bafata", "Biombo", "Bissau", "Bolama", "Cacheu", "Gabu", "Oio", "Quinara", "Tombali"],
          "code": "+245"
        }, {
          "country": "Guyana",
          "states": ["Barima-Waini", "Cuyuni-Mazaruni", "Demerara-Mahaica", "East Berbice-Corentyne", "Essequibo Islands-West Demerara", "Mahaica-Berbice", "Pomeroon-Supenaam", "Potaro-Siparuni", "Upper Demerara-Berbice", "Upper Takutu-Upper Essequibo"],
          "code": "+592"
        }, {
          "country": "Haiti",
          "states": ["Artibonite", "Centre", "Grand 'Anse", "Nord", "Nord-Est", "Nord-Ouest", "Ouest", "Sud", "Sud-Est"],
          "code": "+509"
        }, {
          "country": "Honduras",
          "states": ["Atlantida", "Choluteca", "Colon", "Comayagua", "Copan", "Cortes", "El Paraiso", "Francisco Morazan", "Gracias a Dios", "Intibuca", "Islas de la Bahia", "La Paz", "Lempira", "Ocotepeque", "Olancho", "Santa Barbara", "Valle", "Yoro"],
          "code": "+504"
        }, {
          "country": "Hong Kong",
          "states": ["Wan Chai", "Sham Shui Po", "Kowloon City", "Kwun Tong"],
          "code": "+852"
        }, {
          "country": "Hungary",
          "states": ["Bacs-Kiskun", "Baranya", "Bekes", "Borsod-Abauj-Zemplen", "Csongrad", "Fejer", "Gyor-Moson-Sopron", "Hajdu-Bihar", "Heves", "Jasz-Nagykun-Szolnok", "Komarom-Esztergom", "Nograd", "Pest", "Somogy", "Szabolcs-Szatmar-Bereg", "Tolna", "Vas", "Veszprem", "Zala", "Bekescsaba", "Debrecen", "Dunaujvaros", "Eger", "Gyor", "Hodmezovasarhely", "Kaposvar", "Kecskemet", "Miskolc", "Nagykanizsa", "Nyiregyhaza", "Pecs", "Sopron", "Szeged", "Szekesfehervar", "Szolnok", "Szombathely", "Tatabanya", "Veszprem", "Zalaegerszeg"],
          "code": "+36"
        }, {
          "country": "Iceland",
          "states": ["Austurland", "Hofudhborgarsvaedhi", "Nordhurland Eystra", "Nordhurland Vestra", "Sudhurland", "Sudhurnes", "Vestfirdhir", "Vesturland"],
          "code": "+354"
        }, {
          "country": "India",
          "states": ["Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttaranchal", "Uttar Pradesh", "West Bengal"],
          "code": "+91"
        }, {
          "country": "Indonesia",
          "states": ["Aceh", "Bali", "Banten", "Bengkulu", "Gorontalo", "Irian Jaya Barat", "Jakarta Raya", "Jambi", "Jawa Barat", "Jawa Tengah", "Jawa Timur", "Kalimantan Barat", "Kalimantan Selatan", "Kalimantan Tengah", "Kalimantan Timur", "Kepulauan Bangka Belitung", "Kepulauan Riau", "Lampung", "Maluku", "Maluku Utara", "Nusa Tenggara Barat", "Nusa Tenggara Timur", "Papua", "Riau", "Sulawesi Barat", "Sulawesi Selatan", "Sulawesi Tengah", "Sulawesi Tenggara", "Sulawesi Utara", "Sumatera Barat", "Sumatera Selatan", "Sumatera Utara", "Yogyakarta"],
          "code": "+62"
        }, {
          "country": "Iran",
          "states": ["Ardabil", "Azarbayjan-e Gharbi", "Azarbayjan-e Sharqi", "Bushehr", "Chahar Mahall va Bakhtiari", "Esfahan", "Fars", "Gilan", "Golestan", "Hamadan", "Hormozgan", "Ilam", "Kerman", "Kermanshah", "Khorasan-e Janubi", "Khorasan-e Razavi", "Khorasan-e Shemali", "Khuzestan", "Kohgiluyeh va Buyer Ahmad", "Kordestan", "Lorestan", "Markazi", "Mazandaran", "Qazvin", "Qom", "Semnan", "Sistan va Baluchestan", "Tehran", "Yazd", "Zanjan"],
          "code": "+98"
        }, {
          "country": "Iraq",
          "states": ["Al Anbar", "Al Basrah", "Al Muthanna", "Al Qadisiyah", "An Najaf", "Arbil", "As Sulaymaniyah", "At Ta'mim", "Babil", "Baghdad", "Dahuk", "Dhi Qar", "Diyala", "Karbala'", "Maysan", "Ninawa", "Salah ad Din", "Wasit"],
          "code": "+964"
        }, {
          "country": "Ireland",
          "states": ["Carlow", "Cavan", "Clare", "Cork", "Donegal", "Dublin", "Galway", "Kerry", "Kildare", "Kilkenny", "Laois", "Leitrim", "Limerick", "Longford", "Louth", "Mayo", "Meath", "Monaghan", "Offaly", "Roscommon", "Sligo", "Tipperary", "Waterford", "Westmeath", "Wexford", "Wicklow"],
          "code": "+353"
        }, {
          "country": "Israel",
          "states": ["Central", "Haifa", "Jerusalem", "Northern", "Southern", "Tel Aviv"],
          "code": "+972"
        }, {
          "country": "Italy",
          "states": ["Abruzzo", "Basilicata", "Calabria", "Campania", "Emilia-Romagna", "Friuli-Venezia Giulia", "Lazio", "Liguria", "Lombardia", "Marche", "Molise", "Piemonte", "Puglia", "Sardegna", "Sicilia", "Toscana", "Trentino-Alto Adige", "Umbria", "Valle d'Aosta", "Veneto"],
          "code": "+39"
        }, {
          "country": "Jamaica",
          "states": ["Clarendon", "Hanover", "Kingston", "Manchester", "Portland", "Saint Andrew", "Saint Ann", "Saint Catherine", "Saint Elizabeth", "Saint James", "Saint Mary", "Saint Thomas", "Trelawny", "Westmoreland"],
          "code": "+1876"
        }, {
          "country": "Japan",
          "states": ["Aichi", "Akita", "Aomori", "Chiba", "Ehime", "Fukui", "Fukuoka", "Fukushima", "Gifu", "Gumma", "Hiroshima", "Hokkaido", "Hyogo", "Ibaraki", "Ishikawa", "Iwate", "Kagawa", "Kagoshima", "Kanagawa", "Kochi", "Kumamoto", "Kyoto", "Mie", "Miyagi", "Miyazaki", "Nagano", "Nagasaki", "Nara", "Niigata", "Oita", "Okayama", "Okinawa", "Osaka", "Saga", "Saitama", "Shiga", "Shimane", "Shizuoka", "Tochigi", "Tokushima", "Tokyo", "Tottori", "Toyama", "Wakayama", "Yamagata", "Yamaguchi", "Yamanashi"],
          "code": "+81"
        }, {
          "country": "Jordan",
          "states": ["Ajlun", "Al 'Aqabah", "Al Balqa'", "Al Karak", "Al Mafraq", "'Amman", "At Tafilah", "Az Zarqa'", "Irbid", "Jarash", "Ma'an", "Madaba"],
          "code": "+962"
        }, {
          "country": "Kazakhstan",
          "states": ["Almaty Oblysy", "Almaty Qalasy", "Aqmola Oblysy", "Aqtobe Oblysy", "Astana Qalasy", "Atyrau Oblysy", "Batys Qazaqstan Oblysy", "Bayqongyr Qalasy", "Mangghystau Oblysy", "Ongtustik Qazaqstan Oblysy", "Pavlodar Oblysy", "Qaraghandy Oblysy", "Qostanay Oblysy", "Qyzylorda Oblysy", "Shyghys Qazaqstan Oblysy", "Soltustik Qazaqstan Oblysy", "Zhambyl Oblysy"],
          "code": "+7"
        }, {
          "country": "Kenya",
          "states": ["Central", "Coast", "Eastern", "Nairobi Area", "North Eastern", "Nyanza", "Rift Valley", "Western"],
          "code": "+254"
        }, {
          "country": "Kiribati",
          "states": ["South Tarawa", "Ocenia"],
          "code": "+686"
        }, {
          "country": "Korea North",
          "states": ["Chagang", "North Hamgyong", "South Hamgyong", "North Hwanghae", "South Hwanghae", "Kangwon", "North P'yongan", "South P'yongan", "Yanggang", "Kaesong", "Najin", "Namp'o", "Pyongyang"],
          "code": "+850"
        }, {
          "country": "Korea South",
          "states": ["Seoul", "Busan City", "Daegu City", "Incheon City", "Gwangju City", "Daejeon City", "Ulsan", "Gyeonggi Province", "Gangwon Province", "North Chungcheong Province", "South Chungcheong Province", "North Jeolla Province", "South Jeolla Province", "North Gyeongsang Province", "South Gyeongsang Province", "Jeju"],
          "code": "+82"
        }, {
          "country": "Kuwait",
          "states": ["Al Ahmadi", "Al Farwaniyah", "Al Asimah", "Al Jahra", "Hawalli", "Mubarak Al-Kabeer"],
          "code": "+965"
        }, {
          "country": "Kyrgyzstan",
          "states": ["Batken Oblasty", "Bishkek Shaary", "Chuy Oblasty", "Jalal-Abad Oblasty", "Naryn Oblasty", "Osh Oblasty", "Talas Oblasty", "Ysyk-Kol Oblasty"],
          "code": "+996"
        }, {
          "country": "Laos",
          "states": ["Attapu", "Bokeo", "Bolikhamxai", "Champasak", "Houaphan", "Khammouan", "Louangnamtha", "Louangphrabang", "Oudomxai", "Phongsali", "Salavan", "Savannakhet", "Viangchan", "Viangchan", "Xaignabouli", "Xaisomboun", "Xekong", "Xiangkhoang"],
          "code": "+856"
        }, {
          "country": "Latvia",
          "states": ["Aizkraukles Rajons", "Aluksnes Rajons", "Balvu Rajons", "Bauskas Rajons", "Cesu Rajons", "Daugavpils", "Daugavpils Rajons", "Dobeles Rajons", "Gulbenes Rajons", "Jekabpils Rajons", "Jelgava", "Jelgavas Rajons", "Jurmala", "Kraslavas Rajons", "Kuldigas Rajons", "Liepaja", "Liepajas Rajons", "Limbazu Rajons", "Ludzas Rajons", "Madonas Rajons", "Ogres Rajons", "Preilu Rajons", "Rezekne", "Rezeknes Rajons", "Riga", "Rigas Rajons", "Saldus Rajons", "Talsu Rajons", "Tukuma Rajons", "Valkas Rajons", "Valmieras Rajons", "Ventspils", "Ventspils Rajons"],
          "code": "+371"
        }, {
          "country": "Lebanon",
          "states": ["Beyrouth", "Beqaa", "Liban-Nord", "Liban-Sud", "Mont-Liban", "Nabatiye"],
          "code": "+961"
        }, {
          "country": "Lesotho",
          "states": ["Berea", "Butha-Buthe", "Leribe", "Mafeteng", "Maseru", "Mohale's Hoek", "Mokhotlong", "Qacha's Nek", "Quthing", "Thaba-Tseka"],
          "code": "+266"
        }, {
          "country": "Liberia",
          "states": ["Bomi", "Bong", "Gbarpolu", "Grand Bassa", "Grand Cape Mount", "Grand Gedeh", "Grand Kru", "Lofa", "Margibi", "Maryland", "Montserrado", "Nimba", "River Cess", "River Gee", "Sinoe"],
          "code": "+231"
        }, {
          "country": "Libya",
          "states": ["Ajdabiya", "Al 'Aziziyah", "Al Fatih", "Al Jabal al Akhdar", "Al Jufrah", "Al Khums", "Al Kufrah", "An Nuqat al Khams", "Ash Shati'", "Awbari", "Az Zawiyah", "Banghazi", "Darnah", "Ghadamis", "Gharyan", "Misratah", "Murzuq", "Sabha", "Sawfajjin", "Surt", "Tarabulus", "Tarhunah", "Tubruq", "Yafran", "Zlitan"],
          "code": "+218"
        }, {
          "country": "Liechtenstein",
          "states": ["Balzers", "Eschen", "Gamprin", "Mauren", "Planken", "Ruggell", "Schaan", "Schellenberg", "Triesen", "Triesenberg", "Vaduz"],
          "code": "+417"
        }, {
          "country": "Lithuania",
          "states": ["Alytaus", "Kauno", "Klaipedos", "Marijampoles", "Panevezio", "Siauliu", "Taurages", "Telsiu", "Utenos", "Vilniaus"],
          "code": "+370"
        }, {
          "country": "Luxembourg",
          "states": ["Diekirch", "Grevenmacher", "Luxembourg"],
          "code": "+352"
        }, {
          "country": "Macedonia",
          "states": ["Aerodrom", "Aracinovo", "Berovo", "Bitola", "Bogdanci", "Bogovinje", "Bosilovo", "Brvenica", "Butel", "Cair", "Caska", "Centar", "Centar Zupa", "Cesinovo", "Cucer-Sandevo", "Debar", "Debartsa", "Delcevo", "Demir Hisar", "Demir Kapija", "Dojran", "Dolneni", "Drugovo", "Gazi Baba", "Gevgelija", "Gjorce Petrov", "Gostivar", "Gradsko", "Ilinden", "Jegunovce", "Karbinci", "Karpos", "Kavadarci", "Kicevo", "Kisela Voda", "Kocani", "Konce", "Kratovo", "Kriva Palanka", "Krivogastani", "Krusevo", "Kumanovo", "Lipkovo", "Lozovo", "Makedonska Kamenica", "Makedonski Brod", "Mavrovo i Rastusa", "Mogila", "Negotino", "Novaci", "Novo Selo", "Ohrid", "Oslomej", "Pehcevo", "Petrovec", "Plasnica", "Prilep", "Probistip", "Radovis", "Rankovce", "Resen", "Rosoman", "Saraj", "Skopje", "Sopiste", "Staro Nagoricane", "Stip", "Struga", "Strumica", "Studenicani", "Suto Orizari", "Sveti Nikole", "Tearce", "Tetovo", "Valandovo", "Vasilevo", "Veles", "Vevcani", "Vinica", "Vranestica", "Vrapciste", "Zajas", "Zelenikovo", "Zelino", "Zrnovci"],
          "code": "+389"
        }, {
          "country": "Madagascar",
          "states": ["Antananarivo", "Antsiranana", "Fianarantsoa", "Mahajanga", "Toamasina", "Toliara"],
          "code": "+261"
        }, {
          "country": "Malawi",
          "states": ["Balaka", "Blantyre", "Chikwawa", "Chiradzulu", "Chitipa", "Dedza", "Dowa", "Karonga", "Kasungu", "Likoma", "Lilongwe", "Machinga", "Mangochi", "Mchinji", "Mulanje", "Mwanza", "Mzimba", "Ntcheu", "Nkhata Bay", "Nkhotakota", "Nsanje", "Ntchisi", "Phalombe", "Rumphi", "Salima", "Thyolo", "Zomba"],
          "code": "+265"
        }, {
          "country": "Malaysia",
          "states": ["Johor", "Kedah", "Kelantan", "Kuala Lumpur", "Labuan", "Malacca", "Negeri Sembilan", "Pahang", "Perak", "Perlis", "Penang", "Sabah", "Sarawak", "Selangor", "Terengganu"],
          "code": "+60"
        }, {
          "country": "Maldives",
          "states": ["Alifu", "Baa", "Dhaalu", "Faafu", "Gaafu Alifu", "Gaafu Dhaalu", "Gnaviyani", "Haa Alifu", "Haa Dhaalu", "Kaafu", "Laamu", "Lhaviyani", "Maale", "Meemu", "Noonu", "Raa", "Seenu", "Shaviyani", "Thaa", "Vaavu"],
          "code": "+960"
        }, {
          "country": "Mali",
          "states": ["Bamako (Capital)", "Gao", "Kayes", "Kidal", "Koulikoro", "Mopti", "Segou", "Sikasso", "Tombouctou"],
          "code": "+223"
        }, {
          "country": "Malta",
          "states": ["Rabat", "Senglea"],
          "code": "+356"
        }, {
          "country": "Marshall Islands",
          "states": ["Majuro"],
          "code": "+692"
        }, {
          "country": "Mauritania",
          "states": ["Adrar", "Assaba", "Brakna", "Dakhlet Nouadhibou", "Gorgol", "Guidimaka", "Hodh Ech Chargui", "Hodh El Gharbi", "Inchiri", "Nouakchott", "Tagant", "Tiris Zemmour", "Trarza"],
          "code": "+222"
        }, {
          "country": "Mexico",
          "states": ["Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua", "Coahuila de Zaragoza", "Colima", "Distrito Federal", "Durango", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "Mexico", "Michoacan de Ocampo", "Morelos", "Nayarit", "Nuevo Leon", "Oaxaca", "Puebla", "Queretaro de Arteaga", "Quintana Roo", "San Luis Potosi", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz-Llave", "Yucatan", "Zacatecas"],
          "code": "+52"
        }, {
          "country": "Micronesia",
          "states": ["Palau", "Nauru", "Guam"],
          "code": "+691"
        }, {
          "country": "Moldova",
          "states": ["Anenii Noi", "Basarabeasca", "Briceni", "Cahul", "Cantemir", "Calarasi", "Causeni", "Cimislia", "Criuleni", "Donduseni", "Drochia", "Dubasari", "Edinet", "Falesti", "Floresti", "Glodeni", "Hincesti", "Ialoveni", "Leova", "Nisporeni", "Ocnita", "Orhei", "Rezina", "Riscani", "Singerei", "Soldanesti", "Soroca", "Stefan-Voda", "Straseni", "Taraclia", "Telenesti", "Ungheni", "Balti", "Bender", "Chisinau", "Gagauzia", "Stinga Nistrului"],
          "code": "+373"
        }, {
          "country": "Monaco",
          "states": ["Monaco-Ville", "Monte Carlo"],
          "code": "+377"
        }, {
          "country": "Mongolia",
          "states": ["Arhangay", "Bayanhongor", "Bayan-Olgiy", "Bulgan", "Darhan Uul", "Dornod", "Dornogovi", "Dundgovi", "Dzavhan", "Govi-Altay", "Govi-Sumber", "Hentiy", "Hovd", "Hovsgol", "Omnogovi", "Orhon", "Ovorhangay", "Selenge", "Suhbaatar", "Tov", "Ulaanbaatar", "Uvs"],
          "code": "+976"
        }, {
          "country": "Morocco",
          "states": ["Agadir", "Al Hoceima", "Azilal", "Beni Mellal", "Ben Slimane", "Boulemane", "Casablanca", "Chaouen", "El Jadida", "El Kelaa des Sraghna", "Er Rachidia", "Essaouira", "Fes", "Figuig", "Guelmim", "Ifrane", "Kenitra", "Khemisset", "Khenifra", "Khouribga", "Laayoune", "Larache", "Marrakech", "Meknes", "Nador", "Ouarzazate", "Oujda", "Rabat-Sale", "Safi", "Settat", "Sidi Kacem", "Tangier", "Tan-Tan", "Taounate", "Taroudannt", "Tata", "Taza", "Tetouan", "Tiznit"],
          "code": "+212"
        }, {
          "country": "Mozambique",
          "states": ["Cabo Delgado", "Gaza", "Inhambane", "Manica", "Maputo", "Cidade de Maputo", "Nampula", "Niassa", "Sofala", "Tete", "Zambezia"],
          "code": "+258"
        }, {
          "country": "Namibia",
          "states": ["Caprivi", "Erongo", "Hardap", "Karas", "Khomas", "Kunene", "Ohangwena", "Okavango", "Omaheke", "Omusati", "Oshana", "Oshikoto", "Otjozondjupa"],
          "code": "+264"
        }, {
          "country": "Nauru",
          "states": ["Abab", "Abwaw", "Adibor", "Amet", "Anabar"],
          "code": "+674"
        }, {
          "country": "Nepal",
          "states": ["Bagmati", "Bheri", "Dhawalagiri", "Gandaki", "Janakpur", "Karnali", "Kosi", "Lumbini", "Mahakali", "Mechi", "Narayani", "Rapti", "Sagarmatha", "Seti"],
          "code": "+977"
        }, {
          "country": "Netherlands",
          "states": ["Drenthe", "Flevoland", "Friesland", "Gelderland", "Groningen", "Limburg", "Noord-Brabant", "Noord-Holland", "Overijssel", "Utrecht", "Zeeland", "Zuid-Holland"],
          "code": "+31"
        }, {
          "country": "New Zealand",
          "states": ["Auckland", "Bay of Plenty", "Canterbury", "Chatham Islands", "Gisborne", "Hawke's Bay", "Manawatu-Wanganui", "Marlborough", "Nelson", "Northland", "Otago", "Southland", "Taranaki", "Tasman", "Waikato", "Wellington", "West Coast"],
          "code": "+64"
        }, {
          "country": "Nicaragua",
          "states": ["Atlantico Norte", "Atlantico Sur", "Boaco", "Carazo", "Chinandega", "Chontales", "Esteli", "Granada", "Jinotega", "Leon", "Madriz", "Managua", "Masaya", "Matagalpa", "Nueva Segovia", "Rio San Juan", "Rivas"],
          "code": "+505"
        }, {
          "country": "Niger",
          "states": ["Agadez", "Diffa", "Dosso", "Maradi", "Niamey", "Tahoua", "Tillaberi", "Zinder"],
          "code": "+227"
        }, {
          "country": "Nigeria",
          "states": ["Abia", "Abuja Federal Capital", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nassarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"],
          "code": "+234"
        }, {
          "country": "Norway",
          "states": ["Akershus", "Aust-Agder", "Buskerud", "Finnmark", "Hedmark", "Hordaland", "More og Romsdal", "Nordland", "Nord-Trondelag", "Oppland", "Oslo", "Ostfold", "Rogaland", "Sogn og Fjordane", "Sor-Trondelag", "Telemark", "Troms", "Vest-Agder", "Vestfold"],
          "code": "+47"
        }, {
          "country": "Oman",
          "states": ["Ad Dakhiliyah", "Al Batinah", "Al Wusta", "Ash Sharqiyah", "Az Zahirah", "Masqat", "Musandam", "Dhofar"],
          "code": "+968"
        }, {
          "country": "Pakistan",
          "states": ["Balochistan", "North-West Frontier Province", "Punjab", "Sindh", "Islamabad Capital Territory", "Federally Administered Tribal Areas"],
          "code": "+92"
        }, {
          "country": "Panama",
          "states": ["Bocas del Toro", "Chiriqui", "Cocle", "Colon", "Darien", "Herrera", "Los Santos", "Panama", "San Blas", "Veraguas"],
          "code": "+507"
        }, {
          "country": "Papua New Guinea",
          "states": ["Bougainville", "Central", "Chimbu", "Eastern Highlands", "East New Britain", "East Sepik", "Enga", "Gulf", "Madang", "Manus", "Milne Bay", "Morobe", "National Capital", "New Ireland", "Northern", "Sandaun", "Southern Highlands", "Western", "Western Highlands", "West New Britain"],
          "code": "+675"
        }, {
          "country": "Paraguay",
          "states": ["Alto Paraguay", "Alto Parana", "Amambay", "Asuncion", "Boqueron", "Caaguazu", "Caazapa", "Canindeyu", "Central", "Concepcion", "Cordillera", "Guaira", "Itapua", "Misiones", "Neembucu", "Paraguari", "Presidente Hayes", "San Pedro"],
          "code": "+595"
        }, {
          "country": "Peru",
          "states": ["Amazonas", "Ancash", "Apurimac", "Arequipa", "Ayacucho", "Cajamarca", "Callao", "Cusco", "Huancavelica", "Huanuco", "Ica", "Junin", "La Libertad", "Lambayeque", "Lima", "Loreto", "Madre de Dios", "Moquegua", "Pasco", "Piura", "Puno", "San Martin", "Tacna", "Tumbes", "Ucayali"],
          "code": "+51"
        }, {
          "country": "Philippines",
          "states": ["Abra", "Agusan del Norte", "Agusan del Sur", "Aklan", "Albay", "Antique", "Apayao", "Aurora", "Basilan", "Bataan", "Batanes", "Batangas", "Biliran", "Benguet", "Bohol", "Bukidnon", "Bulacan", "Cagayan", "Camarines Norte", "Camarines Sur", "Camiguin", "Capiz", "Catanduanes", "Cavite", "Cebu", "Compostela", "Davao del Norte", "Davao del Sur", "Davao Oriental", "Eastern Samar", "Guimaras", "Ifugao", "Ilocos Norte", "Ilocos Sur", "Iloilo", "Isabela", "Kalinga", "Laguna", "Lanao del Norte", "Lanao del Sur", "La Union", "Leyte", "Maguindanao", "Marinduque", "Masbate", "Mindoro Occidental", "Mindoro Oriental", "Misamis Occidental", "Misamis Oriental", "Mountain Province", "Negros Occidental", "Negros Oriental", "North Cotabato", "Northern Samar", "Nueva Ecija", "Nueva Vizcaya", "Palawan", "Pampanga", "Pangasinan", "Quezon", "Quirino", "Rizal", "Romblon", "Samar", "Sarangani", "Siquijor", "Sorsogon", "South Cotabato", "Southern Leyte", "Sultan Kudarat", "Sulu", "Surigao del Norte", "Surigao del Sur", "Tarlac", "Tawi-Tawi", "Zambales", "Zamboanga del Norte", "Zamboanga del Sur", "Zamboanga Sibugay"],
          "code": "+63"
        }, {
          "country": "Poland",
          "states": ["Greater Poland (Wielkopolskie)", "Kuyavian-Pomeranian (Kujawsko-Pomorskie)", "Lesser Poland (Malopolskie)", "Lodz (Lodzkie)", "Lower Silesian (Dolnoslaskie)", "Lublin (Lubelskie)", "Lubusz (Lubuskie)", "Masovian (Mazowieckie)", "Opole (Opolskie)", "Podlasie (Podlaskie)", "Pomeranian (Pomorskie)", "Silesian (Slaskie)", "Subcarpathian (Podkarpackie)", "Swietokrzyskie (Swietokrzyskie)", "Warmian-Masurian (Warminsko-Mazurskie)", "West Pomeranian (Zachodniopomorskie)"],
          "code": "+48"
        }, {
          "country": "Portugal",
          "states": ["Aveiro", "Acores", "Beja", "Braga", "Braganca", "Castelo Branco", "Coimbra", "Evora", "Faro", "Guarda", "Leiria", "Lisboa", "Madeira", "Portalegre", "Porto", "Santarem", "Setubal", "Viana do Castelo", "Vila Real", "Viseu"],
          "code": "+351"
        }, {
          "country": "Qatar",
          "states": ["Ad Dawhah", "Al Ghuwayriyah", "Al Jumayliyah", "Al Khawr", "Al Wakrah", "Ar Rayyan", "Jarayan al Batinah", "Madinat ash Shamal", "Umm Sa'id", "Umm Salal"],
          "code": "+974"
        }, {
          "country": "Romania",
          "states": ["Alba", "Arad", "Arges", "Bacau", "Bihor", "Bistrita-Nasaud", "Botosani", "Braila", "Brasov", "Bucuresti", "Buzau", "Calarasi", "Caras-Severin", "Cluj", "Constanta", "Covasna", "Dimbovita", "Dolj", "Galati", "Gorj", "Giurgiu", "Harghita", "Hunedoara", "Ialomita", "Iasi", "Ilfov", "Maramures", "Mehedinti", "Mures", "Neamt", "Olt", "Prahova", "Salaj", "Satu Mare", "Sibiu", "Suceava", "Teleorman", "Timis", "Tulcea", "Vaslui", "Vilcea", "Vrancea"],
          "code": "+40"
        }, {
          "country": "Russia",
          "states": ["Amur", "Arkhangel'sk", "Astrakhan'", "Belgorod", "Bryansk", "Chelyabinsk", "Chita", "Irkutsk", "Ivanovo", "Kaliningrad", "Kaluga", "Kamchatka", "Kemerovo", "Kirov", "Kostroma", "Kurgan", "Kursk", "Leningrad", "Lipetsk", "Magadan", "Moscow", "Murmansk", "Nizhniy Novgorod", "Novgorod", "Novosibirsk", "Omsk", "Orenburg", "Orel", "Penza", "Perm'", "Pskov", "Rostov", "Ryazan'", "Sakhalin", "Samara", "Saratov", "Smolensk", "Sverdlovsk", "Tambov", "Tomsk", "Tula", "Tver'", "Tyumen'", "Ul'yanovsk", "Vladimir", "Volgograd", "Vologda", "Voronezh", "Yaroslavl'", "Adygeya", "Altay", "Bashkortostan", "Buryatiya", "Chechnya", "Chuvashiya", "Dagestan", "Ingushetiya", "Kabardino-Balkariya", "Kalmykiya", "Karachayevo-Cherkesiya", "Kareliya", "Khakasiya", "Komi", "Mariy-El", "Mordoviya", "Sakha", "North Ossetia", "Tatarstan", "Tyva", "Udmurtiya", "Aga Buryat", "Chukotka", "Evenk", "Khanty-Mansi", "Komi-Permyak", "Koryak", "Nenets", "Taymyr", "Ust'-Orda Buryat", "Yamalo-Nenets", "Altay", "Khabarovsk", "Krasnodar", "Krasnoyarsk", "Primorskiy", "Stavropol'", "Moscow", "St. Petersburg", "Yevrey"],
          "code": "+7"
        }, {
          "country": "Rwanda",
          "states": ["Butare", "Byumba", "Cyangugu", "Gikongoro", "Gisenyi", "Gitarama", "Kibungo", "Kibuye", "Kigali Rurale", "Kigali-ville", "Umutara", "Ruhengeri"],
          "code": "+250"
        }, {
          "country": "San Marino",
          "states": ["Acquaviva", "Borgo Maggiore", "Chiesanuova", "Domagnano", "Faetano", "Fiorentino", "Montegiardino", "San Marino Citta", "Serravalle"],
          "code": "+378"
        }, {
          "country": "Sao Tome Principe",
          "states": ["Santo Amaro", "Neves", "Santana"],
          "code": "+239"
        }, {
          "country": "Saudi Arabia",
          "states": ["Al Bahah", "Al Hudud ash Shamaliyah", "Al Jawf", "Al Madinah", "Al Qasim", "Ar Riyad", "Ash Sharqiyah", "'Asir", "Ha'il", "Jizan", "Makkah", "Najran", "Tabuk"],
          "code": "+966"
        }, {
          "country": "Senegal",
          "states": ["Dakar", "Diourbel", "Fatick", "Kaolack", "Kolda", "Louga", "Matam", "Saint-Louis", "Tambacounda", "Thies", "Ziguinchor"],
          "code": "+221"
        }, {
          "country": "Serbia",
          "states": ["Kosovo", "Montenegro", "Serbia", "Vojvodina"],
          "code": "+381"
        }, {
          "country": "Seychelles",
          "states": ["Anse aux Pins", "Anse Boileau", "Anse Etoile", "Anse Louis", "Anse Royale", "Baie Lazare", "Baie Sainte Anne", "Beau Vallon", "Bel Air", "Bel Ombre", "Cascade", "Glacis", "Grand' Anse", "Grand' Anse", "La Digue", "La Riviere Anglaise", "Mont Buxton", "Mont Fleuri", "Plaisance", "Pointe La Rue", "Port Glaud", "Saint Louis", "Takamaka"],
          "code": "+248"
        }, {
          "country": "Singapore",
          "states": ["Alexandra", "Bishan", "Chinatown", "Kallang"],
          "code": "+65"
        }, {
          "country": "Slovak Republic",
          "states": ["Banskobystricky", "Bratislavsky", "Kosicky", "Nitriansky", "Presovsky", "Trenciansky", "Trnavsky", "Zilinsky"],
          "code": "+421"
        }, {
          "country": "Slovenia",
          "states": ["Ajdovscina", "Beltinci", "Benedikt", "Bistrica ob Sotli", "Bled", "Bloke", "Bohinj", "Borovnica", "Bovec", "Braslovce", "Brda", "Brezice", "Brezovica", "Cankova", "Celje", "Cerklje na Gorenjskem", "Cerknica", "Cerkno", "Cerkvenjak", "Crensovci", "Crna na Koroskem", "Crnomelj", "Destrnik", "Divaca", "Dobje", "Dobrepolje", "Dobrna", "Dobrova-Horjul-Polhov Gradec", "Dobrovnik-Dobronak", "Dolenjske Toplice", "Dol pri Ljubljani", "Domzale", "Dornava", "Dravograd", "Duplek", "Gorenja Vas-Poljane", "Gorisnica", "Gornja Radgona", "Gornji Grad", "Gornji Petrovci", "Grad", "Grosuplje", "Hajdina", "Hoce-Slivnica", "Hodos-Hodos", "Horjul", "Hrastnik", "Hrpelje-Kozina", "Idrija", "Ig", "Ilirska Bistrica", "Ivancna Gorica", "Izola-Isola", "Jesenice", "Jezersko", "Jursinci", "Kamnik", "Kanal", "Kidricevo", "Kobarid", "Kobilje", "Kocevje", "Komen", "Komenda", "Koper-Capodistria", "Kostel", "Kozje", "Kranj", "Kranjska Gora", "Krizevci", "Krsko", "Kungota", "Kuzma", "Lasko", "Lenart", "Lendava-Lendva", "Litija", "Ljubljana", "Ljubno", "Ljutomer", "Logatec", "Loska Dolina", "Loski Potok", "Lovrenc na Pohorju", "Luce", "Lukovica", "Majsperk", "Maribor", "Markovci", "Medvode", "Menges", "Metlika", "Mezica", "Miklavz na Dravskem Polju", "Miren-Kostanjevica", "Mirna Pec", "Mislinja", "Moravce", "Moravske Toplice", "Mozirje", "Murska Sobota", "Muta", "Naklo", "Nazarje", "Nova Gorica", "Novo Mesto", "Odranci", "Oplotnica", "Ormoz", "Osilnica", "Pesnica", "Piran-Pirano", "Pivka", "Podcetrtek", "Podlehnik", "Podvelka", "Polzela", "Postojna", "Prebold", "Preddvor", "Prevalje", "Ptuj", "Puconci", "Race-Fram", "Radece", "Radenci", "Radlje ob Dravi", "Radovljica", "Ravne na Koroskem", "Razkrizje", "Ribnica", "Ribnica na Pohorju", "Rogasovci", "Rogaska Slatina", "Rogatec", "Ruse", "Salovci", "Selnica ob Dravi", "Semic", "Sempeter-Vrtojba", "Sencur", "Sentilj", "Sentjernej", "Sentjur pri Celju", "Sevnica", "Sezana", "Skocjan", "Skofja Loka", "Skofljica", "Slovenj Gradec", "Slovenska Bistrica", "Slovenske Konjice", "Smarje pri Jelsah", "Smartno ob Paki", "Smartno pri Litiji", "Sodrazica", "Solcava", "Sostanj", "Starse", "Store", "Sveta Ana", "Sveti Andraz v Slovenskih Goricah", "Sveti Jurij", "Tabor", "Tisina", "Tolmin", "Trbovlje", "Trebnje", "Trnovska Vas", "Trzic", "Trzin", "Turnisce", "Velenje", "Velika Polana", "Velike Lasce", "Verzej", "Videm", "Vipava", "Vitanje", "Vodice", "Vojnik", "Vransko", "Vrhnika", "Vuzenica", "Zagorje ob Savi", "Zalec", "Zavrc", "Zelezniki", "Zetale", "Ziri", "Zirovnica", "Zuzemberk", "Zrece"],
          "code": "+386"
        }, {
          "country": "Solomon Islands",
          "states": ["Central", "Choiseul", "Guadalcanal", "Honiara", "Isabel", "Makira", "Malaita", "Rennell and Bellona", "Temotu", "Western"],
          "code": "+677"
        }, {
          "country": "Somalia",
          "states": ["Awdal", "Bakool", "Banaadir", "Bari", "Bay", "Galguduud", "Gedo", "Hiiraan", "Jubbada Dhexe", "Jubbada Hoose", "Mudug", "Nugaal", "Sanaag", "Shabeellaha Dhexe", "Shabeellaha Hoose", "Sool", "Togdheer", "Woqooyi Galbeed"],
          "code": "+252"
        }, {
          "country": "South Africa",
          "states": ["Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", "Limpopo", "Mpumalanga", "North-West", "Northern Cape", "Western Cape"],
          "code": "+27"
        }, {
          "country": "Spain",
          "states": ["Andalucia", "Aragon", "Asturias", "Baleares", "Ceuta", "Canarias", "Cantabria", "Castilla-La Mancha", "Castilla y Leon", "Cataluna", "Comunidad Valenciana", "Extremadura", "Galicia", "La Rioja", "Madrid", "Melilla", "Murcia", "Navarra", "Pais Vasco"],
          "code": "+34"
        }, {
          "country": "Sri Lanka",
          "states": ["Central", "North Central", "North Eastern", "North Western", "Sabaragamuwa", "Southern", "Uva", "Western"],
          "code": "+94"
        }, {
          "country": "Sudan",
          "states": ["A'ali an Nil", "Al Bahr al Ahmar", "Al Buhayrat", "Al Jazirah", "Al Khartum", "Al Qadarif", "Al Wahdah", "An Nil al Abyad", "An Nil al Azraq", "Ash Shamaliyah", "Bahr al Jabal", "Gharb al Istiwa'iyah", "Gharb Bahr al Ghazal", "Gharb Darfur", "Gharb Kurdufan", "Janub Darfur", "Janub Kurdufan", "Junqali", "Kassala", "Nahr an Nil", "Shamal Bahr al Ghazal", "Shamal Darfur", "Shamal Kurdufan", "Sharq al Istiwa'iyah", "Sinnar", "Warab"],
          "code": "+249"
        }, {
          "country": "Suriname",
          "states": ["Brokopondo", "Commewijne", "Coronie", "Marowijne", "Nickerie", "Para", "Paramaribo", "Saramacca", "Sipaliwini", "Wanica"],
          "code": "+597"
        }, {
          "country": "Swaziland",
          "states": ["Hhohho", "Lubombo", "Manzini", "Shiselweni"],
          "code": "+268"
        }, {
          "country": "Sweden",
          "states": ["Blekinge", "Dalarnas", "Gavleborgs", "Gotlands", "Hallands", "Jamtlands", "Jonkopings", "Kalmar", "Kronobergs", "Norrbottens", "Orebro", "Ostergotlands", "Skane", "Sodermanlands", "Stockholms", "Uppsala", "Varmlands", "Vasterbottens", "Vasternorrlands", "Vastmanlands", "Vastra Gotalands"],
          "code": "+46"
        }, {
          "country": "Switzerland",
          "states": ["Aargau", "Appenzell Ausser-Rhoden", "Appenzell Inner-Rhoden", "Basel-Landschaft", "Basel-Stadt", "Bern", "Fribourg", "Geneve", "Glarus", "Graubunden", "Jura", "Luzern", "Neuchatel", "Nidwalden", "Obwalden", "Sankt Gallen", "Schaffhausen", "Schwyz", "Solothurn", "Thurgau", "Ticino", "Uri", "Valais", "Vaud", "Zug", "Zurich"],
          "code": "+41"
        }, {
          "country": "Syria",
          "states": ["Al Hasakah", "Al Ladhiqiyah", "Al Qunaytirah", "Ar Raqqah", "As Suwayda'", "Dar'a", "Dayr az Zawr", "Dimashq", "Halab", "Hamah", "Hims", "Idlib", "Rif Dimashq", "Tartus"],
          "code": "+963"
        }, {
          "country": "Taiwan",
          "states": ["Chang-hua", "Chia-i", "Hsin-chu", "Hua-lien", "I-lan", "Kao-hsiung", "Kin-men", "Lien-chiang", "Miao-li", "Nan-t'ou", "P'eng-hu", "P'ing-tung", "T'ai-chung", "T'ai-nan", "T'ai-pei", "T'ai-tung", "T'ao-yuan", "Yun-lin", "Chia-i", "Chi-lung", "Hsin-chu", "T'ai-chung", "T'ai-nan", "Kao-hsiung city", "T'ai-pei city"],
          "code": "+886"
        }, {
          "country": "Tajikstan",
          "states": ["Dushanbe", "Khujand", "Qurghonteppa", "Tursunzoda"],
          "code": "+7"
        }, {
          "country": "Thailand",
          "states": ["Amnat Charoen", "Ang Thong", "Buriram", "Chachoengsao", "Chai Nat", "Chaiyaphum", "Chanthaburi", "Chiang Mai", "Chiang Rai", "Chon Buri", "Chumphon", "Kalasin", "Kamphaeng Phet", "Kanchanaburi", "Khon Kaen", "Krabi", "Krung Thep Mahanakhon", "Lampang", "Lamphun", "Loei", "Lop Buri", "Mae Hong Son", "Maha Sarakham", "Mukdahan", "Nakhon Nayok", "Nakhon Pathom", "Nakhon Phanom", "Nakhon Ratchasima", "Nakhon Sawan", "Nakhon Si Thammarat", "Nan", "Narathiwat", "Nong Bua Lamphu", "Nong Khai", "Nonthaburi", "Pathum Thani", "Pattani", "Phangnga", "Phatthalung", "Phayao", "Phetchabun", "Phetchaburi", "Phichit", "Phitsanulok", "Phra Nakhon Si Ayutthaya", "Phrae", "Phuket", "Prachin Buri", "Prachuap Khiri Khan", "Ranong", "Ratchaburi", "Rayong", "Roi Et", "Sa Kaeo", "Sakon Nakhon", "Samut Prakan", "Samut Sakhon", "Samut Songkhram", "Sara Buri", "Satun", "Sing Buri", "Sisaket", "Songkhla", "Sukhothai", "Suphan Buri", "Surat Thani", "Surin", "Tak", "Trang", "Trat", "Ubon Ratchathani", "Udon Thani", "Uthai Thani", "Uttaradit", "Yala", "Yasothon"],
          "code": "+66"
        }, {
          "country": "Togo",
          "states": ["Kara", "Plateaux", "Savanes", "Centrale", "Maritime"],
          "code": "+228"
        }, {
          "country": "Tonga",
          "states": ["Tongatapu", "Nuku'alofa", "Ha'amonga ʻa Maui"],
          "code": "+676"
        }, {
          "country": "Trinidad & Tobago",
          "states": ["Couva", "Diego Martin", "Mayaro", "Penal", "Princes Town", "Sangre Grande", "San Juan", "Siparia", "Tunapuna", "Port-of-Spain", "San Fernando", "Arima", "Point Fortin", "Chaguanas", "Tobago"],
          "code": "+1868"
        }, {
          "country": "Tunisia",
          "states": ["Ariana (Aryanah)", "Beja (Bajah)", "Ben Arous (Bin 'Arus)", "Bizerte (Banzart)", "Gabes (Qabis)", "Gafsa (Qafsah)", "Jendouba (Jundubah)", "Kairouan (Al Qayrawan)", "Kasserine (Al Qasrayn)", "Kebili (Qibili)", "Kef (Al Kaf)", "Mahdia (Al Mahdiyah)", "Manouba (Manubah)", "Medenine (Madanin)", "Monastir (Al Munastir)", "Nabeul (Nabul)", "Sfax (Safaqis)", "Sidi Bou Zid (Sidi Bu Zayd)", "Siliana (Silyanah)", "Sousse (Susah)", "Tataouine (Tatawin)", "Tozeur (Tawzar)", "Tunis", "Zaghouan (Zaghwan)"],
          "code": "+216"
        }, {
          "country": "Turkey",
          "states": ["Adana", "Adiyaman", "Afyonkarahisar", "Agri", "Aksaray", "Amasya", "Ankara", "Antalya", "Ardahan", "Artvin", "Aydin", "Balikesir", "Bartin", "Batman", "Bayburt", "Bilecik", "Bingol", "Bitlis", "Bolu", "Burdur", "Bursa", "Canakkale", "Cankiri", "Corum", "Denizli", "Diyarbakir", "Duzce", "Edirne", "Elazig", "Erzincan", "Erzurum", "Eskisehir", "Gaziantep", "Giresun", "Gumushane", "Hakkari", "Hatay", "Igdir", "Isparta", "Istanbul", "Izmir", "Kahramanmaras", "Karabuk", "Karaman", "Kars", "Kastamonu", "Kayseri", "Kilis", "Kirikkale", "Kirklareli", "Kirsehir", "Kocaeli", "Konya", "Kutahya", "Malatya", "Manisa", "Mardin", "Mersin", "Mugla", "Mus", "Nevsehir", "Nigde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Sanliurfa", "Siirt", "Sinop", "Sirnak", "Sivas", "Tekirdag", "Tokat", "Trabzon", "Tunceli", "Usak", "Van", "Yalova", "Yozgat", "Zonguldak"],
          "code": "+90"
        }, {
          "country": "Turkmenistan",
          "states": ["Ahal Welayaty (Ashgabat)", "Balkan Welayaty (Balkanabat)", "Dashoguz Welayaty", "Lebap Welayaty (Turkmenabat)", "Mary Welayaty"],
          "code": "+993"
        }, {
          "country": "Uganda",
          "states": ["Adjumani", "Apac", "Arua", "Bugiri", "Bundibugyo", "Bushenyi", "Busia", "Gulu", "Hoima", "Iganga", "Jinja", "Kabale", "Kabarole", "Kaberamaido", "Kalangala", "Kampala", "Kamuli", "Kamwenge", "Kanungu", "Kapchorwa", "Kasese", "Katakwi", "Kayunga", "Kibale", "Kiboga", "Kisoro", "Kitgum", "Kotido", "Kumi", "Kyenjojo", "Lira", "Luwero", "Masaka", "Masindi", "Mayuge", "Mbale", "Mbarara", "Moroto", "Moyo", "Mpigi", "Mubende", "Mukono", "Nakapiripirit", "Nakasongola", "Nebbi", "Ntungamo", "Pader", "Pallisa", "Rakai", "Rukungiri", "Sembabule", "Sironko", "Soroti", "Tororo", "Wakiso", "Yumbe"],
          "code": "+256"
        }, {
          "country": "Ukraine",
          "states": ["Cherkasy", "Chernihiv", "Chernivtsi", "Crimea", "Dnipropetrovs'k", "Donets'k", "Ivano-Frankivs'k", "Kharkiv", "Kherson", "Khmel'nyts'kyy", "Kirovohrad", "Kiev", "Kyyiv", "Luhans'k", "L'viv", "Mykolayiv", "Odesa", "Poltava", "Rivne", "Sevastopol'", "Sumy", "Ternopil'", "Vinnytsya", "Volyn'", "Zakarpattya", "Zaporizhzhya", "Zhytomyr"],
          "code": "+380"
        }, {
          "country": "United Arab Emirates",
          "states": ["Abu Dhabi", "'Ajman", "Al Fujayrah", "Sharjah", "Dubai", "Ra's al Khaymah", "Umm al Qaywayn"],
          "code": "+971"
        }, {
          "country": "Uruguay",
          "states": ["Artigas", "Canelones", "Cerro Largo", "Colonia", "Durazno", "Flores", "Florida", "Lavalleja", "Maldonado", "Montevideo", "Paysandu", "Rio Negro", "Rivera", "Rocha", "Salto", "San Jose", "Soriano", "Tacuarembo", "Treinta y Tres"],
          "code": "+598"
        }, {
          "country": "Uzbekistan",
          "states": ["Andijon Viloyati", "Buxoro Viloyati", "Farg'ona Viloyati", "Jizzax Viloyati", "Namangan Viloyati", "Navoiy Viloyati", "Qashqadaryo Viloyati", "Qaraqalpog'iston Respublikasi", "Samarqand Viloyati", "Sirdaryo Viloyati", "Surxondaryo Viloyati", "Toshkent Shahri", "Toshkent Viloyati", "Xorazm Viloyati"],
          "code": "+7"
        }, {
          "country": "Vanuatu",
          "states": ["Malampa", "Penama", "Sanma", "Shefa", "Tafea", "Torba"],
          "code": "+678"
        }, {
          "country": "Venezuela",
          "states": ["Amazonas", "Anzoategui", "Apure", "Aragua", "Barinas", "Bolivar", "Carabobo", "Cojedes", "Delta Amacuro", "Dependencias Federales", "Distrito Federal", "Falcon", "Guarico", "Lara", "Merida", "Miranda", "Monagas", "Nueva Esparta", "Portuguesa", "Sucre", "Tachira", "Trujillo", "Vargas", "Yaracuy", "Zulia"],
          "code": "+58"
        }, {
          "country": "Vietnam",
          "states": ["An Giang", "Bac Giang", "Bac Kan", "Bac Lieu", "Bac Ninh", "Ba Ria-Vung Tau", "Ben Tre", "Binh Dinh", "Binh Duong", "Binh Phuoc", "Binh Thuan", "Ca Mau", "Cao Bang", "Dac Lak", "Dac Nong", "Dien Bien", "Dong Nai", "Dong Thap", "Gia Lai", "Ha Giang", "Hai Duong", "Ha Nam", "Ha Tay", "Ha Tinh", "Hau Giang", "Hoa Binh", "Hung Yen", "Khanh Hoa", "Kien Giang", "Kon Tum", "Lai Chau", "Lam Dong", "Lang Son", "Lao Cai", "Long An", "Nam Dinh", "Nghe An", "Ninh Binh", "Ninh Thuan", "Phu Tho", "Phu Yen", "Quang Binh", "Quang Nam", "Quang Ngai", "Quang Ninh", "Quang Tri", "Soc Trang", "Son La", "Tay Ninh", "Thai Binh", "Thai Nguyen", "Thanh Hoa", "Thua Thien-Hue", "Tien Giang", "Tra Vinh", "Tuyen Quang", "Vinh Long", "Vinh Phuc", "Yen Bai", "Can Tho", "Da Nang", "Hai Phong", "Hanoi", "Ho Chi Minh"],
          "code": "+84"
        }, {
          "country": "Yemen (North)",
          "states": ["Abyan", "'Adan", "Ad Dali'", "Al Bayda'", "Al Hudaydah", "Al Jawf", "Al Mahrah", "Al Mahwit", "'Amran", "Dhamar", "Hadramawt", "Hajjah", "Ibb", "Lahij", "Ma'rib", "Sa'dah", "San'a'", "Shabwah", "Ta'izz"],
          "code": "+969"
        }, {
          "country": "Yemen (South)",
          "states": ["Abyan", "'Adan", "Ad Dali'", "Al Bayda'", "Al Hudaydah", "Al Jawf", "Al Mahrah", "Al Mahwit", "'Amran", "Dhamar", "Hadramawt", "Hajjah", "Ibb", "Lahij", "Ma'rib", "Sa'dah", "San'a'", "Shabwah", "Ta'izz"],
          "code": "+967"
        }, {
          "country": "Zambia",
          "states": ["Central", "Copperbelt", "Eastern", "Luapula", "Lusaka", "Northern", "North-Western", "Southern", "Western"],
          "code": "+260"
        }, {
          "country": "Zimbabwe",
          "states": ["Bulawayo", "Harare", "Manicaland", "Mashonaland Central", "Mashonaland East", "Mashonaland West", "Masvingo", "Matabeleland North", "Matabeleland South", "Midlands"],
          "code": "+263"
        }];
      }

      _createClass(OrbisturServiceService, [{
        key: "postApi",
        value: function postApi(url, data, isHeader) {
          if (isHeader == 1) {
            var httpOptions;
            httpOptions = {
              headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                "Content-Type": "application/json",
                // "JWT "
                "token": localStorage.getItem('token')
              }),
              observe: 'response'
            };
          } else if (isHeader == 2) {
            var httpOptions;
            httpOptions = {
              headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                // "JWT "+
                "token": JSON.parse(localStorage.getItem('token'))
              }),
              observe: 'response'
            };
          } else {
            var httpOptions;
            httpOptions = {
              headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                "Content-Type": "application/json"
              }),
              observe: 'response'
            };
          }

          return this.http.post(this.baseUrl + url, data, httpOptions);
        }
      }, {
        key: "deleteApi",
        value: function deleteApi(url, isHeader) {
          if (isHeader == 1) {
            var httpOptions;
            httpOptions = {
              headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                "Content-Type": "application/json",
                // "JWT "
                "token": localStorage.getItem('token')
              }),
              observe: 'response'
            }; // console.log("hjhjhjhjewrew",localStorage.getItem('token'));
          } else if (isHeader == 2) {
            var httpOptions;
            httpOptions = {
              headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                // "JWT "+
                "token": JSON.parse(localStorage.getItem('token'))
              }),
              observe: 'response'
            };
          } else {
            var httpOptions;
            httpOptions = {
              headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                "Content-Type": "application/json"
              }),
              observe: 'response'
            };
          }

          return this.http.delete(this.baseUrl + url, httpOptions);
        }
      }, {
        key: "getApi",
        value: function getApi(url, isHeader) {
          if (isHeader == 1) {
            var httpOptions;
            httpOptions = {
              headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                "Content-Type": "application/json",
                // "JWT "+
                "token": localStorage.getItem('token')
              }),
              observe: 'response'
            }; // console.log("hjhjhjhj",JSON.parse(localStorage.getItem('token')));
          } else {
            var httpOptions;
            httpOptions = {
              headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                "Content-Type": "application/json"
              }),
              observe: 'response'
            };
          }

          return this.http.get(this.baseUrl + url, httpOptions);
        }
      }, {
        key: "showSuccess",
        value: function showSuccess(msg) {
          var maxShown = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '1';
          this.toastr.success(msg);
        }
      }, {
        key: "toastErr",
        value: function toastErr(msg) {
          this.toastr.error(msg);
        }
      }, {
        key: "putApi",
        value: function putApi(url, data, isHeader) {
          if (isHeader == 1) {
            var httpOptions;
            httpOptions = {
              headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                "Content-Type": "application/json",
                // "JWT "
                "token": localStorage.getItem('token')
              }),
              observe: 'response'
            }; // console.log("hjhjhjhjewrew",localStorage.getItem('token'));
          } else if (isHeader == 2) {
            var httpOptions;
            httpOptions = {
              headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                // "JWT "+
                "token": localStorage.getItem('token')
              }),
              observe: 'response'
            };
          } else {
            var httpOptions;
            httpOptions = {
              headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                "Content-Type": "application/json"
              }),
              observe: 'response'
            };
          }

          return this.http.put(this.baseUrl + url, data, httpOptions);
        }
      }, {
        key: "preventSpace",
        value: function preventSpace(event) {
          if ((event.charCode == 32 || event.charCode == 64) && !event.target.value) {
            event.preventDefault();
          } else {} // console.log(event)
          // console.log('event charCode check', event.charCode)

        }
      }]);

      return OrbisturServiceService;
    }();

    OrbisturServiceService.ctorParameters = function () {
      return [{
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]
      }, {
        type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"]
      }];
    };

    OrbisturServiceService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    })], OrbisturServiceService);
    /***/
  },

  /***/
  "./src/app/package-management/package-management.component.css":
  /*!*********************************************************************!*\
    !*** ./src/app/package-management/package-management.component.css ***!
    \*********************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppPackageManagementPackageManagementComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".bt{\n    margin-left: 27px;\n    width: 100%;\n    max-width: 148px;\n    border-radius: 18px;\n    background-color: gray;\n    border: none;\n}\n\n.mainbtn{\n    display: -webkit-box;\n    display: flex;\n}\n\n.resetbtn{\n    margin-left: 1%;\n    width: 150px;\n    /* margin-left: 1%; */\n    /* width: 150px; */\n    background-color: gray;\n    color: white;\n    border-radius: 19px;\n}\n\n.addbtn{\n    margin-left: 49%;width: 150px;\n}\n\n.exbtn{\n    margin-left: 1%;\n    width: 150px;\n    background-color: gray;\n    color: white;\n    border-radius: 19px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFja2FnZS1tYW5hZ2VtZW50L3BhY2thZ2UtbWFuYWdlbWVudC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksaUJBQWlCO0lBQ2pCLFdBQVc7SUFDWCxnQkFBZ0I7SUFDaEIsbUJBQW1CO0lBQ25CLHNCQUFzQjtJQUN0QixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksb0JBQWE7SUFBYixhQUFhO0FBQ2pCOztBQUNBO0lBQ0ksZUFBZTtJQUNmLFlBQVk7SUFDWixxQkFBcUI7SUFDckIsa0JBQWtCO0lBQ2xCLHNCQUFzQjtJQUN0QixZQUFZO0lBQ1osbUJBQW1CO0FBQ3ZCOztBQUNBO0lBQ0ksZ0JBQWdCLENBQUMsWUFBWTtBQUNqQzs7QUFDQTtJQUNJLGVBQWU7SUFDZixZQUFZO0lBQ1osc0JBQXNCO0lBQ3RCLFlBQVk7SUFDWixtQkFBbUI7QUFDdkIiLCJmaWxlIjoic3JjL2FwcC9wYWNrYWdlLW1hbmFnZW1lbnQvcGFja2FnZS1tYW5hZ2VtZW50LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYnR7XG4gICAgbWFyZ2luLWxlZnQ6IDI3cHg7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWF4LXdpZHRoOiAxNDhweDtcbiAgICBib3JkZXItcmFkaXVzOiAxOHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XG4gICAgYm9yZGVyOiBub25lO1xufVxuXG4ubWFpbmJ0bntcbiAgICBkaXNwbGF5OiBmbGV4O1xufVxuLnJlc2V0YnRue1xuICAgIG1hcmdpbi1sZWZ0OiAxJTtcbiAgICB3aWR0aDogMTUwcHg7XG4gICAgLyogbWFyZ2luLWxlZnQ6IDElOyAqL1xuICAgIC8qIHdpZHRoOiAxNTBweDsgKi9cbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5O1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBib3JkZXItcmFkaXVzOiAxOXB4O1xufVxuLmFkZGJ0bntcbiAgICBtYXJnaW4tbGVmdDogNDklO3dpZHRoOiAxNTBweDtcbn1cbi5leGJ0bntcbiAgICBtYXJnaW4tbGVmdDogMSU7XG4gICAgd2lkdGg6IDE1MHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGJvcmRlci1yYWRpdXM6IDE5cHg7XG59Il19 */";
    /***/
  },

  /***/
  "./src/app/package-management/package-management.component.ts":
  /*!********************************************************************!*\
    !*** ./src/app/package-management/package-management.component.ts ***!
    \********************************************************************/

  /*! exports provided: PackageManagementComponent */

  /***/
  function srcAppPackageManagementPackageManagementComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PackageManagementComponent", function () {
      return PackageManagementComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _orbistur_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../orbistur-service.service */
    "./src/app/orbistur-service.service.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _csv_service_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../csv-service.service */
    "./src/app/csv-service.service.ts");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");

    var PackageManagementComponent =
    /*#__PURE__*/
    function () {
      function PackageManagementComponent(service, router, formBuilder, csvServiceService, spinner) {
        _classCallCheck(this, PackageManagementComponent);

        this.service = service;
        this.router = router;
        this.formBuilder = formBuilder;
        this.csvServiceService = csvServiceService;
        this.spinner = spinner;
        this.limit = 10;
        this.page = 1;
        this.p = 0;
        this.dataArr = [];
        this.packagelists = [];
        this.packageList();
      }

      _createClass(PackageManagementComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.packageList();
        } // ngOnChanges(){
        //   this.packageList()
        // }
        // ngAfterViewInit(){
        //   this.packageList()
        // }
        //********************Search by name event**************************//

      }, {
        key: "searchValue",
        value: function searchValue(value) {
          this.filterName = value;
          console.log('filterName==>>', this.filterName);
          this.packagelists = [];
          this.packageList();
        } //********************Reset Method******************************//

      }, {
        key: "reset",
        value: function reset() {
          this.filterName = '';
          this.packageList();
        } //********************Sub Admin list Api**************************//

      }, {
        key: "packageList",
        value: function packageList() {
          var _this72 = this;

          this.spinner.show();
          var object = {
            "search": this.filterName,
            "page": this.page,
            "limit": this.limit
          };
          this.service.postApi('admin/packageList', object, 1).subscribe(function (res) {
            console.log('res==>>', res);

            if (res.body.response_code == 200) {
              _this72.spinner.hide(); // this.subAdminLists=res.body.result.docs?res.body.result.docs:res.body.result  


              _this72.packagelists = res.body.result.docs;
              console.log('packagelistspackagelists==>>>', _this72.packagelists);
              _this72.total = res.body.result.total;
              console.log('total==>>>', _this72.total);
            } else {
              _this72.spinner.hide(); // this.service.toastErr(res.body.response_message)          

            }
          }, function (error) {
            _this72.spinner.hide();

            _this72.service.toastErr(error.response_message);
          });
        }
      }, {
        key: "changePage",
        value: function changePage(page) {
          console.log('Page ', page);
          this.page = page;
          this.p = page - 1;
          this.packageList();
        } // statusblock(){
        //   this.subAdminLists =[];
        //   // console.log('subAdminLists',this.subAdminLists)
        //   this.subAdminLists.forEach(items=>{
        //     if(items.status=="ACTIVE"){
        //       this.subAdminLists.push(items)
        //     }
        //     console.log('subAdminListsItems',this.subAdminLists)
        //   })
        // }
        // ***********************csv*********************//

      }, {
        key: "download",
        value: function download() {
          var dataArr = [];
          console.log('packagelistsd==>>', this.packagelists);
          this.packagelists.forEach(function (element, ind) {
            dataArr.push({
              "S.No.": ind + 1,
              "Country": element.country ? element.country : '',
              "Destination": element.destination ? element.destination : 'N/A',
              "Package Type": element.packageTypeName ? element.packageTypeName : 'N/A',
              "Package Name": element.packageName ? element.packageName : 'N/A',
              "Flights Included": element.flightsIncluded ? element.flightsIncluded : 'N/A',
              "Hotels Include": element.hotelsIncluded ? element.hotelsIncluded : 'N/A',
              "Transfer Included": element.transferIncluded ? element.transferIncluded : 'N/A',
              "Sightseeing Included": element.sightseeingIncluded ? element.sightseeingIncluded : 'N/A',
              "Total Amount": element.email ? element.email : 'N/A',
              "Status": element.email ? element.email : 'N/A'
            });
          });
          console.log('download=>', dataArr);
          this.csvServiceService.downloadFile(dataArr, 'dataArr');
        } // **************************Get id method for delete Sub Admin*******************************//

      }, {
        key: "deleteFunction",
        value: function deleteFunction(id) {
          this.user_id = id;
          console.log('user_id', this.user_id);
          $('#modaldelete').modal({
            backdrop: 'static',
            keyboard: false
          });
        } // ***************************Delete method*******************************//

      }, {
        key: "deleteFunctions",
        value: function deleteFunctions() {
          var _this73 = this;

          this.spinner.show();
          this.service.deleteApi('admin/deletePackage/' + this.user_id, 1).subscribe(function (res) {
            console.log('delete id=========', res);

            if (res.body.response_code == 200) {
              _this73.packageList();

              _this73.spinner.hide();

              _this73.service.showSuccess("Package-Management has been deleted successfully.");

              _this73.packageList();
            } else {
              _this73.spinner.hide();

              _this73.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this73.spinner.hide();

            _this73.service.toastErr("Internal server error");
          });
        }
      }]);

      return PackageManagementComponent;
    }();

    PackageManagementComponent.ctorParameters = function () {
      return [{
        type: _orbistur_service_service__WEBPACK_IMPORTED_MODULE_2__["OrbisturServiceService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"]
      }, {
        type: _csv_service_service__WEBPACK_IMPORTED_MODULE_5__["CsvServiceService"]
      }, {
        type: ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerService"]
      }];
    };

    PackageManagementComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-package-management',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./package-management.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/package-management/package-management.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./package-management.component.css */
      "./src/app/package-management/package-management.component.css")).default]
    })], PackageManagementComponent);
    /***/
  },

  /***/
  "./src/app/page-not-found/page-not-found.component.css":
  /*!*************************************************************!*\
    !*** ./src/app/page-not-found/page-not-found.component.css ***!
    \*************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppPageNotFoundPageNotFoundComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2Utbm90LWZvdW5kL3BhZ2Utbm90LWZvdW5kLmNvbXBvbmVudC5jc3MifQ== */";
    /***/
  },

  /***/
  "./src/app/page-not-found/page-not-found.component.ts":
  /*!************************************************************!*\
    !*** ./src/app/page-not-found/page-not-found.component.ts ***!
    \************************************************************/

  /*! exports provided: PageNotFoundComponent */

  /***/
  function srcAppPageNotFoundPageNotFoundComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PageNotFoundComponent", function () {
      return PageNotFoundComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var PageNotFoundComponent =
    /*#__PURE__*/
    function () {
      function PageNotFoundComponent() {
        _classCallCheck(this, PageNotFoundComponent);
      }

      _createClass(PageNotFoundComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }]);

      return PageNotFoundComponent;
    }();

    PageNotFoundComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-page-not-found',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./page-not-found.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/page-not-found/page-not-found.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./page-not-found.component.css */
      "./src/app/page-not-found/page-not-found.component.css")).default]
    })], PageNotFoundComponent);
    /***/
  },

  /***/
  "./src/app/reset-password/reset-password.component.css":
  /*!*************************************************************!*\
    !*** ./src/app/reset-password/reset-password.component.css ***!
    \*************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppResetPasswordResetPasswordComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n.col-xs-4{\n    width: 100%;\n}\n.login-box-body, .register-box-body{\nbackground: #fff;\npadding: 20px;\nborder-top: 0;\ncolor: #666;\nbox-shadow: 3px 3px 33px 13px #aba6a64a;}\n.lognBrn{\n    margin-top:12px;\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: center;\n            justify-content: center;\n}\n.robot{\n    margin-top:18px;\n}\n.lognBrn button{\nfont-size: 22px;\nline-height: 25px;\ncolor: #ffffff;\nfont-family: \"Adelle\";\nfont-weight: bold;\nheight: 53px;\nborder-radius: 4px;\nbackground-color: #999999;\nwidth: 100%;\nbackground-color: #e8ae0cde;\nborder-radius: 32px;\nborder: navajowhite;\ncolor: black;\nfont-weight: 300;\nmax-width: 62%;\n}\n.login-box.register-box{\n    width: 683px!important;\n    margin: 13% auto!important;\n}\n.login-box-body[_ngcontent-ank-c1], .register-box-body[_ngcontent-ank-c1] {\n    background: #fff;\n    padding: 37px;\n    border-top: 0;\n    color: #666;\n    box-shadow: 3px 3px 33px 13px #aba6a64a;\n}\n.login-box{    \n    padding: 27px;\n    width: 700px!important;\n    min-height: calc(100vh - 230px);\n}\n.selct{\n    margin-right: 26px;\n    width: 118px;\n    margin-top: 10px;\n    height: 29px;\n    padding: 0px 10px;\n}\n.box-bdy{\n    padding:40px;\n}\n.logb{\n    width:100%;\n}\n.custom-nav img{\n    border-radius: 50%;\n    height: 40px;\n    width: 40px;\n    \n}\n.custom-nav {\n    margin: 0px 15px 0px 0px;\n}\n.custom-navbar {\n    margin: 0px 15px 0px 0px;\n}\n.custom-nav img{\n    margin-right: 10px;\n}\n.custom-slct{\n    height: 29px;\n}\n@media(max-width:1048px){\n            .login-box{\n                width: 600px;\n                margin: 7% !important;\n                margin-left: 24%!important;\n            }\n        }\n@media(max-width:1024px){\n            .login-box{\n                width: 600px;\n                margin: 7% !important;\n                margin-left: 24%!important;\n            }\n        }\n.login-box{\n            margin: 50px auto;\n        }\nstrong.reset{\n            font-size: 20px;\n            font-family: '';\n        }\n.pp{\n    width: 52%;\n    text-align: center;\n    color: black;\n}\n.divs{\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: center;\n            justify-content: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcmVzZXQtcGFzc3dvcmQvcmVzZXQtcGFzc3dvcmQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7SUFDSSxXQUFXO0FBQ2Y7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixhQUFhO0FBQ2IsYUFBYTtBQUNiLFdBQVc7QUFDWCx1Q0FBdUMsQ0FBQztBQUN4QztJQUNJLGVBQWU7SUFDZixvQkFBYTtJQUFiLGFBQWE7SUFDYix3QkFBdUI7WUFBdkIsdUJBQXVCO0FBQzNCO0FBQ0E7SUFDSSxlQUFlO0FBQ25CO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsaUJBQWlCO0FBQ2pCLGNBQWM7QUFDZCxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCLFlBQVk7QUFDWixrQkFBa0I7QUFDbEIseUJBQXlCO0FBQ3pCLFdBQVc7QUFDWCwyQkFBMkI7QUFDM0IsbUJBQW1CO0FBQ25CLG1CQUFtQjtBQUNuQixZQUFZO0FBQ1osZ0JBQWdCO0FBQ2hCLGNBQWM7QUFDZDtBQUNBO0lBQ0ksc0JBQXNCO0lBQ3RCLDBCQUEwQjtBQUM5QjtBQUNBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYixhQUFhO0lBQ2IsV0FBVztJQUNYLHVDQUF1QztBQUMzQztBQUNBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QiwrQkFBK0I7QUFDbkM7QUFHQTtJQUNJLGtCQUFrQjtJQUNsQixZQUFZO0lBQ1osZ0JBQWdCO0lBQ2hCLFlBQVk7SUFDWixpQkFBaUI7QUFDckI7QUFDQTtJQUNJLFlBQVk7QUFDaEI7QUFDQTtJQUNJLFVBQVU7QUFDZDtBQUdBO0lBQ0ksa0JBQWtCO0lBQ2xCLFlBQVk7SUFDWixXQUFXOztBQUVmO0FBQ0E7SUFDSSx3QkFBd0I7QUFDNUI7QUFDQTtJQUNJLHdCQUF3QjtBQUM1QjtBQUNBO0lBQ0ksa0JBQWtCO0FBQ3RCO0FBQ0E7SUFDSSxZQUFZO0FBQ2hCO0FBQ1E7WUFDSTtnQkFDSSxZQUFZO2dCQUNaLHFCQUFxQjtnQkFDckIsMEJBQTBCO1lBQzlCO1FBQ0o7QUFDQTtZQUNJO2dCQUNJLFlBQVk7Z0JBQ1oscUJBQXFCO2dCQUNyQiwwQkFBMEI7WUFDOUI7UUFDSjtBQUNBO1lBQ0ksaUJBQWlCO1FBQ3JCO0FBQ0E7WUFDSSxlQUFlO1lBQ2YsZUFBZTtRQUNuQjtBQUNSO0lBQ0ksVUFBVTtJQUNWLGtCQUFrQjtJQUNsQixZQUFZO0FBQ2hCO0FBQ0E7SUFDSSxvQkFBYTtJQUFiLGFBQWE7SUFDYix3QkFBdUI7WUFBdkIsdUJBQXVCO0FBQzNCIiwiZmlsZSI6InNyYy9hcHAvcmVzZXQtcGFzc3dvcmQvcmVzZXQtcGFzc3dvcmQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLmNvbC14cy00e1xuICAgIHdpZHRoOiAxMDAlO1xufVxuLmxvZ2luLWJveC1ib2R5LCAucmVnaXN0ZXItYm94LWJvZHl7XG5iYWNrZ3JvdW5kOiAjZmZmO1xucGFkZGluZzogMjBweDtcbmJvcmRlci10b3A6IDA7XG5jb2xvcjogIzY2NjtcbmJveC1zaGFkb3c6IDNweCAzcHggMzNweCAxM3B4ICNhYmE2YTY0YTt9XG4ubG9nbkJybntcbiAgICBtYXJnaW4tdG9wOjEycHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cbi5yb2JvdHtcbiAgICBtYXJnaW4tdG9wOjE4cHg7XG59XG4ubG9nbkJybiBidXR0b257XG5mb250LXNpemU6IDIycHg7XG5saW5lLWhlaWdodDogMjVweDtcbmNvbG9yOiAjZmZmZmZmO1xuZm9udC1mYW1pbHk6IFwiQWRlbGxlXCI7XG5mb250LXdlaWdodDogYm9sZDtcbmhlaWdodDogNTNweDtcbmJvcmRlci1yYWRpdXM6IDRweDtcbmJhY2tncm91bmQtY29sb3I6ICM5OTk5OTk7XG53aWR0aDogMTAwJTtcbmJhY2tncm91bmQtY29sb3I6ICNlOGFlMGNkZTtcbmJvcmRlci1yYWRpdXM6IDMycHg7XG5ib3JkZXI6IG5hdmFqb3doaXRlO1xuY29sb3I6IGJsYWNrO1xuZm9udC13ZWlnaHQ6IDMwMDtcbm1heC13aWR0aDogNjIlO1xufVxuLmxvZ2luLWJveC5yZWdpc3Rlci1ib3h7XG4gICAgd2lkdGg6IDY4M3B4IWltcG9ydGFudDtcbiAgICBtYXJnaW46IDEzJSBhdXRvIWltcG9ydGFudDtcbn1cbi5sb2dpbi1ib3gtYm9keVtfbmdjb250ZW50LWFuay1jMV0sIC5yZWdpc3Rlci1ib3gtYm9keVtfbmdjb250ZW50LWFuay1jMV0ge1xuICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgcGFkZGluZzogMzdweDtcbiAgICBib3JkZXItdG9wOiAwO1xuICAgIGNvbG9yOiAjNjY2O1xuICAgIGJveC1zaGFkb3c6IDNweCAzcHggMzNweCAxM3B4ICNhYmE2YTY0YTtcbn1cbi5sb2dpbi1ib3h7ICAgIFxuICAgIHBhZGRpbmc6IDI3cHg7XG4gICAgd2lkdGg6IDcwMHB4IWltcG9ydGFudDtcbiAgICBtaW4taGVpZ2h0OiBjYWxjKDEwMHZoIC0gMjMwcHgpO1xufVxuXG5cbi5zZWxjdHtcbiAgICBtYXJnaW4tcmlnaHQ6IDI2cHg7XG4gICAgd2lkdGg6IDExOHB4O1xuICAgIG1hcmdpbi10b3A6IDEwcHg7XG4gICAgaGVpZ2h0OiAyOXB4O1xuICAgIHBhZGRpbmc6IDBweCAxMHB4O1xufVxuLmJveC1iZHl7XG4gICAgcGFkZGluZzo0MHB4O1xufVxuLmxvZ2J7XG4gICAgd2lkdGg6MTAwJTtcbn1cblxuXG4uY3VzdG9tLW5hdiBpbWd7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIGhlaWdodDogNDBweDtcbiAgICB3aWR0aDogNDBweDtcbiAgICBcbn1cbi5jdXN0b20tbmF2IHtcbiAgICBtYXJnaW46IDBweCAxNXB4IDBweCAwcHg7XG59XG4uY3VzdG9tLW5hdmJhciB7XG4gICAgbWFyZ2luOiAwcHggMTVweCAwcHggMHB4O1xufVxuLmN1c3RvbS1uYXYgaW1ne1xuICAgIG1hcmdpbi1yaWdodDogMTBweDtcbn1cbi5jdXN0b20tc2xjdHtcbiAgICBoZWlnaHQ6IDI5cHg7XG59XG4gICAgICAgIEBtZWRpYShtYXgtd2lkdGg6MTA0OHB4KXtcbiAgICAgICAgICAgIC5sb2dpbi1ib3h7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDYwMHB4O1xuICAgICAgICAgICAgICAgIG1hcmdpbjogNyUgIWltcG9ydGFudDtcbiAgICAgICAgICAgICAgICBtYXJnaW4tbGVmdDogMjQlIWltcG9ydGFudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBAbWVkaWEobWF4LXdpZHRoOjEwMjRweCl7XG4gICAgICAgICAgICAubG9naW4tYm94e1xuICAgICAgICAgICAgICAgIHdpZHRoOiA2MDBweDtcbiAgICAgICAgICAgICAgICBtYXJnaW46IDclICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDI0JSFpbXBvcnRhbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLmxvZ2luLWJveHtcbiAgICAgICAgICAgIG1hcmdpbjogNTBweCBhdXRvO1xuICAgICAgICB9XG4gICAgICAgIHN0cm9uZy5yZXNldHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAnJztcbiAgICAgICAgfVxuLnBwe1xuICAgIHdpZHRoOiA1MiU7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGNvbG9yOiBibGFjaztcbn1cbi5kaXZze1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59Il19 */";
    /***/
  },

  /***/
  "./src/app/reset-password/reset-password.component.ts":
  /*!************************************************************!*\
    !*** ./src/app/reset-password/reset-password.component.ts ***!
    \************************************************************/

  /*! exports provided: ResetPasswordComponent */

  /***/
  function srcAppResetPasswordResetPasswordComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ResetPasswordComponent", function () {
      return ResetPasswordComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _orbistur_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../orbistur-service.service */
    "./src/app/orbistur-service.service.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");

    var ResetPasswordComponent =
    /*#__PURE__*/
    function () {
      function ResetPasswordComponent(service, router, activeRouter, fb, spinner) {
        _classCallCheck(this, ResetPasswordComponent);

        this.service = service;
        this.router = router;
        this.activeRouter = activeRouter;
        this.fb = fb;
        this.spinner = spinner;
        this.show2 = false;
        this.show1 = false;
        this.type = "password";
        this.show = false;
        this.type2 = "password";
        this.type1 = "password";
      }

      _createClass(ResetPasswordComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this74 = this;

          this.activeRouter.params.subscribe(function (res) {
            _this74.id = res._id;
            console.log('id=>', _this74.id);
          });
          this.resetPasswordForm = this.fb.group({
            'newPassword': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(8), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].maxLength(16)])],
            'confirmPassword': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]
          });
        } // ********************Reset Password Api****************************//

      }, {
        key: "reserPassword",
        value: function reserPassword() {
          var _this75 = this;

          this.spinner.show();
          var object = {
            "newPassword": this.resetPasswordForm.value.newPassword,
            "confirmPassword": this.resetPasswordForm.value.confirmPassword
          };
          this.service.postApi('admin/resetPassword/' + this.id, object, 0).subscribe(function (res) {
            if (res.status == 200) {
              _this75.spinner.hide();

              _this75.service.showSuccess(res.body.response_message);

              _this75.router.navigate(['login']);
            } else {
              _this75.spinner.hide();

              _this75.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this75.spinner.hide();

            _this75.service.toastErr(error.response_message);
          });
        }
      }, {
        key: "toggleShow1",
        value: function toggleShow1() {
          this.show = !this.show;

          if (this.show) {
            this.type = "text";
          } else {
            this.type = "password";
          }
        }
      }, {
        key: "toggleShow2",
        value: function toggleShow2() {
          this.show2 = !this.show2;

          if (this.show2) {
            this.type2 = "text";
          } else {
            this.type2 = "password";
          }
        }
      }]);

      return ResetPasswordComponent;
    }();

    ResetPasswordComponent.ctorParameters = function () {
      return [{
        type: _orbistur_service_service__WEBPACK_IMPORTED_MODULE_2__["OrbisturServiceService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"]
      }, {
        type: ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"]
      }];
    };

    ResetPasswordComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-reset-password',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./reset-password.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/reset-password/reset-password.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./reset-password.component.css */
      "./src/app/reset-password/reset-password.component.css")).default]
    })], ResetPasswordComponent);
    /***/
  },

  /***/
  "./src/app/sanitize-html-pipe.pipe.ts":
  /*!********************************************!*\
    !*** ./src/app/sanitize-html-pipe.pipe.ts ***!
    \********************************************/

  /*! exports provided: SanitizeHtmlPipePipe */

  /***/
  function srcAppSanitizeHtmlPipePipeTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SanitizeHtmlPipePipe", function () {
      return SanitizeHtmlPipePipe;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");

    var SanitizeHtmlPipePipe =
    /*#__PURE__*/
    function () {
      // transform(value: any, ...args: any[]): any {
      //   return null;
      // }
      function SanitizeHtmlPipePipe(_sanitizer) {
        _classCallCheck(this, SanitizeHtmlPipePipe);

        this._sanitizer = _sanitizer;
      }

      _createClass(SanitizeHtmlPipePipe, [{
        key: "transform",
        value: function transform(v) {
          return this._sanitizer.bypassSecurityTrustHtml(v);
        }
      }]);

      return SanitizeHtmlPipePipe;
    }();

    SanitizeHtmlPipePipe.ctorParameters = function () {
      return [{
        type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"]
      }];
    };

    SanitizeHtmlPipePipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
      name: 'sanitizeHtmlPipe'
    })], SanitizeHtmlPipePipe);
    /***/
  },

  /***/
  "./src/app/settings-page/settings-page.component.css":
  /*!***********************************************************!*\
    !*** ./src/app/settings-page/settings-page.component.css ***!
    \***********************************************************/

  /*! exports provided: default */

  /***/
  function srcAppSettingsPageSettingsPageComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".imgg{\n    width: 150px;\n    height: 150px;\n    border-radius: 88px;\n}\n\n.imagebtn{\n    text-transform: none;\n    /* margin-left: 2%; */\n    width: 144px;\n    height: 36px;\n    border-radius: 21px;\n    background-color: #4db94d;\n    color: white;\n}\n\n.optionals{\n    font-weight: lighter;\n    font-size: 15px;\n    color: gray;\n}\n\n.selectCountry{\n    margin-left: 50px;\n    width: 183px;\n    height: 32px;\n}\n\n.selectsdestination{\n    margin-left: 29px;\n    width: 183px;\n    height: 32px;\n}\n\n.types{\n    margin-left: 13%;\n    width: 27%;\n    height: 32px;\n}\n\n.destinationprice{\n    margin-left: 31px;\n    width: 169px;\n    height: 32px;\n}\n\n.destinations{\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: safe;\n            justify-content: safe;\n    padding-top: 12px;\n}\n\n.inptdestination {\n    width: 100%;\n    max-width: 183px;\n    margin-left: 70px;\n}\n\n.activradio{\n    margin-left:0px!important;\n}\n\n.btn{\n    float: right;\n}\n\n.btnss{\n    float: right;\n    width: 150px;\n    height: 34px;\n    color: white;\n    background-color: green;\n    border-radius: 18px;\n}\n\nli.nav-item.type_c3 {\n    width: 50% !important;\n}\n\n.container.inactive_c3 {\n    width: 100%;\n    max-width: 85%;\n    border-style: ridge;\n}\n\n.inactiv_c2{\n    width: 100%;\n    max-width: 85%;\n    border-style: ridge;\n    margin: 0 auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2V0dGluZ3MtcGFnZS9zZXR0aW5ncy1wYWdlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxZQUFZO0lBQ1osYUFBYTtJQUNiLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLG9CQUFvQjtJQUNwQixxQkFBcUI7SUFDckIsWUFBWTtJQUNaLFlBQVk7SUFDWixtQkFBbUI7SUFDbkIseUJBQXlCO0lBQ3pCLFlBQVk7QUFDaEI7O0FBQ0E7SUFDSSxvQkFBb0I7SUFDcEIsZUFBZTtJQUNmLFdBQVc7QUFDZjs7QUFDQTtJQUNJLGlCQUFpQjtJQUNqQixZQUFZO0lBQ1osWUFBWTtBQUNoQjs7QUFDQTtJQUNJLGlCQUFpQjtJQUNqQixZQUFZO0lBQ1osWUFBWTtBQUNoQjs7QUFDQTtJQUNJLGdCQUFnQjtJQUNoQixVQUFVO0lBQ1YsWUFBWTtBQUNoQjs7QUFDQTtJQUNJLGlCQUFpQjtJQUNqQixZQUFZO0lBQ1osWUFBWTtBQUNoQjs7QUFDQTtJQUNJLG9CQUFhO0lBQWIsYUFBYTtJQUNiLHNCQUFxQjtZQUFyQixxQkFBcUI7SUFDckIsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksV0FBVztJQUNYLGdCQUFnQjtJQUNoQixpQkFBaUI7QUFDckI7O0FBQ0E7SUFDSSx5QkFBeUI7QUFDN0I7O0FBQ0E7SUFDSSxZQUFZO0FBQ2hCOztBQUNBO0lBQ0ksWUFBWTtJQUNaLFlBQVk7SUFDWixZQUFZO0lBQ1osWUFBWTtJQUNaLHVCQUF1QjtJQUN2QixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsY0FBYztJQUNkLG1CQUFtQjtBQUN2Qjs7QUFDQTtJQUNJLFdBQVc7SUFDWCxjQUFjO0lBQ2QsbUJBQW1CO0lBQ25CLGNBQWM7QUFDbEIiLCJmaWxlIjoic3JjL2FwcC9zZXR0aW5ncy1wYWdlL3NldHRpbmdzLXBhZ2UuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5pbWdne1xuICAgIHdpZHRoOiAxNTBweDtcbiAgICBoZWlnaHQ6IDE1MHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDg4cHg7XG59XG5cbi5pbWFnZWJ0bntcbiAgICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgICAvKiBtYXJnaW4tbGVmdDogMiU7ICovXG4gICAgd2lkdGg6IDE0NHB4O1xuICAgIGhlaWdodDogMzZweDtcbiAgICBib3JkZXItcmFkaXVzOiAyMXB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICM0ZGI5NGQ7XG4gICAgY29sb3I6IHdoaXRlO1xufVxuLm9wdGlvbmFsc3tcbiAgICBmb250LXdlaWdodDogbGlnaHRlcjtcbiAgICBmb250LXNpemU6IDE1cHg7XG4gICAgY29sb3I6IGdyYXk7XG59XG4uc2VsZWN0Q291bnRyeXtcbiAgICBtYXJnaW4tbGVmdDogNTBweDtcbiAgICB3aWR0aDogMTgzcHg7XG4gICAgaGVpZ2h0OiAzMnB4O1xufVxuLnNlbGVjdHNkZXN0aW5hdGlvbntcbiAgICBtYXJnaW4tbGVmdDogMjlweDtcbiAgICB3aWR0aDogMTgzcHg7XG4gICAgaGVpZ2h0OiAzMnB4O1xufVxuLnR5cGVze1xuICAgIG1hcmdpbi1sZWZ0OiAxMyU7XG4gICAgd2lkdGg6IDI3JTtcbiAgICBoZWlnaHQ6IDMycHg7XG59XG4uZGVzdGluYXRpb25wcmljZXtcbiAgICBtYXJnaW4tbGVmdDogMzFweDtcbiAgICB3aWR0aDogMTY5cHg7XG4gICAgaGVpZ2h0OiAzMnB4O1xufVxuLmRlc3RpbmF0aW9uc3tcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc2FmZTtcbiAgICBwYWRkaW5nLXRvcDogMTJweDtcbn1cblxuLmlucHRkZXN0aW5hdGlvbiB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWF4LXdpZHRoOiAxODNweDtcbiAgICBtYXJnaW4tbGVmdDogNzBweDtcbn1cbi5hY3RpdnJhZGlve1xuICAgIG1hcmdpbi1sZWZ0OjBweCFpbXBvcnRhbnQ7XG59XG4uYnRue1xuICAgIGZsb2F0OiByaWdodDtcbn1cbi5idG5zc3tcbiAgICBmbG9hdDogcmlnaHQ7XG4gICAgd2lkdGg6IDE1MHB4O1xuICAgIGhlaWdodDogMzRweDtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW47XG4gICAgYm9yZGVyLXJhZGl1czogMThweDtcbn1cblxubGkubmF2LWl0ZW0udHlwZV9jMyB7XG4gICAgd2lkdGg6IDUwJSAhaW1wb3J0YW50O1xufVxuXG4uY29udGFpbmVyLmluYWN0aXZlX2MzIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXgtd2lkdGg6IDg1JTtcbiAgICBib3JkZXItc3R5bGU6IHJpZGdlO1xufVxuLmluYWN0aXZfYzJ7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWF4LXdpZHRoOiA4NSU7XG4gICAgYm9yZGVyLXN0eWxlOiByaWRnZTtcbiAgICBtYXJnaW46IDAgYXV0bztcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/settings-page/settings-page.component.ts":
  /*!**********************************************************!*\
    !*** ./src/app/settings-page/settings-page.component.ts ***!
    \**********************************************************/

  /*! exports provided: SettingsPageComponent */

  /***/
  function srcAppSettingsPageSettingsPageComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SettingsPageComponent", function () {
      return SettingsPageComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _orbistur_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../orbistur-service.service */
    "./src/app/orbistur-service.service.ts");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");

    var SettingsPageComponent =
    /*#__PURE__*/
    function () {
      function SettingsPageComponent(service, formBuilder, spinner, router, activate) {
        _classCallCheck(this, SettingsPageComponent);

        this.service = service;
        this.formBuilder = formBuilder;
        this.spinner = spinner;
        this.router = router;
        this.activate = activate;
        this.tab = 'PackageTypes';
        this.tabs = 'TransferCategory';
        this.countryList = [];
        this.limit = 10;
        this.page = 1;
        this.p = 0;
        this.countryName = [];
        this.countryLists = [];
      }

      _createClass(SettingsPageComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this76 = this;

          this.activate.params.subscribe(function (res) {
            console.log('resss===>>>', res.val);
            _this76.val = Number(res.val);
            _this76.value = Number(res.value);

            _this76.tabChangedFunc(_this76.val);

            _this76.tabChangedFuncs(_this76.value);

            console.log('value===>>>', _this76.value);
          });
          this.packageForm = this.formBuilder.group({
            'country': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            'type': ["", _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(20)])],
            'activeInsurance': ['ACTIVE']
          });
          this.bannerForm = this.formBuilder.group({
            'activebanner': ['ACTIVE'],
            'title': ["", _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].minLength(8), _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(20)])]
          });
          this.carTypeForm = this.formBuilder.group({
            'country': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            'destination': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            'type': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            'price': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(20), _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern(/^-?(?:0|[1-9]\d{0,2}(?:,?\d{3})*)(?:\.\d+)?$/)])],
            'activeInsurance': ['ACTIVE']
          });
          this.countryForm = this.formBuilder.group({
            'country': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(16)])],
            'activeInsurance': ['ACTIVE']
          });
          this.getCountry();
          this.packageList();
          this.getContentList();
          this.addBannerList();
          this.destinationList();
          this.cartypeList(); // this.getCountrys()

          this.countryDataList();
          this.getTransferLiat();
          this.getTransferTypeLiat();
        } // *************Get Contry json*************************//
        // getCountrys(){
        //   this.countryLists=this.service.countryListJson
        // console.log('countrys==>>',this.countryLists)
        // }
        // *******************Country List ********************//

      }, {
        key: "getCountry",
        value: function getCountry() {
          var _this77 = this;

          var object = {
            "search": null
          };
          this.service.postApi('admin/countryList', object, 1).subscribe(function (res) {
            _this77.countryList = res.body.result.docs;
            console.log('countryListJson', _this77.countryList);
          });
        } // ***********************Destination List***************//

      }, {
        key: "destinationList",
        value: function destinationList() {
          var _this78 = this;

          var object = {};
          this.service.postApi('admin/destinationList', object, 1).subscribe(function (res) {
            _this78.destinationLists = res.body.result.docs;
            console.log('destinationLists==>>', _this78.destinationLists);
          });
        } // ***********************Package Add Api*****************//

      }, {
        key: "addPackage",
        value: function addPackage() {
          var _this79 = this;

          this.spinner.show();
          var object = {
            'countryId': this.packageForm.value.country,
            'type': this.packageForm.value.type,
            'status': this.packageForm.value.activeInsurance
          };
          console.log('object==>>', object);
          this.service.postApi('admin/addPackageType', object, 1).subscribe(function (res) {
            console.log('resaddpac==>>', res);

            if (res.body.response_code == 200) {
              _this79.spinner.hide();

              _this79.service.showSuccess("Package type has been added successfully.");

              _this79.packageList();

              _this79.packageForm.reset(); // this.countryList=["";
              // setTimeout(function(){
              //   this.packageForm.reset()
              // },1000);

            } else {
              _this79.spinner.hide();

              _this79.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this79.spinner.hide();

            _this79.service.toastErr(error.response_message);
          });
        } // ***********************Package Add Api*****************//

      }, {
        key: "addCarType",
        value: function addCarType() {
          var _this80 = this;

          console.log('addDestination==>>', this.carTypeForm.value.activeInsurance);
          this.spinner.show();
          var object = {
            'destinationId': this.carTypeForm.value.destination,
            'countryId': this.carTypeForm.value.country,
            'carType': this.carTypeForm.value.type,
            'price': this.carTypeForm.value.price,
            'status': this.carTypeForm.value.activeInsurance
          };
          console.log('object==>>', object);
          this.service.postApi('admin/addCarType', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this80.carType = res.body.result.docs;

              _this80.spinner.hide();

              _this80.service.showSuccess(res.body.response_message);

              _this80.cartypeList();

              _this80.carTypeForm.reset();
            } else {
              _this80.spinner.hide();

              _this80.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this80.spinner.hide();

            _this80.service.toastErr(error.response_message);
          });
        } // **********************Add country*********************//

      }, {
        key: "addCountry",
        value: function addCountry() {
          var _this81 = this;

          console.log('addDestination==>>', this.carTypeForm.value.activeInsurance);
          this.spinner.show();
          var object = {
            'country': this.countryForm.value.country,
            'status': this.countryForm.value.activeInsurance
          };
          console.log('object==>>', object);
          this.service.postApi('admin/addCountry', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this81.countrydata = res.body.result.docs;

              _this81.spinner.hide();

              _this81.service.showSuccess(res.body.response_message);

              _this81.countryDataList();
            } else {
              _this81.spinner.hide();

              _this81.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this81.spinner.hide();

            _this81.service.toastErr(error.response_message);
          });
        } // *********************Get country list****************//

      }, {
        key: "countryDataList",
        value: function countryDataList() {
          var _this82 = this;

          var object = {
            'search': this.filterName,
            'status': this.status,
            'page': this.page,
            'limit': this.limit
          };
          this.service.postApi('admin/countryList', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this82.spinner.hide(); // this.getName()


              _this82.countryData = res.body.result.docs ? res.body.result.docs : res.body.result;
              console.log('countryData==>>', _this82.countryData);
            } else {
              _this82.spinner.hide();
            }
          }, function (error) {
            _this82.spinner.hide();
          });
        } // **********************Car type list*******************//

      }, {
        key: "cartypeList",
        value: function cartypeList() {
          var _this83 = this;

          var object = {
            'search': this.filterName,
            'status': this.status,
            'page': this.page,
            'limit': this.limit
          };
          this.service.postApi('admin/carTypeList', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this83.spinner.hide(); // this.getName()


              _this83.cartTypeLists = res.body.result.docs ? res.body.result.docs : res.body.result;
              console.log('cartTypeLists==>>', _this83.cartTypeLists);
            } else {
              _this83.spinner.hide();
            }
          }, function (error) {
            _this83.spinner.hide();
          });
        }
      }, {
        key: "searchValue",
        value: function searchValue(value) {
          this.filterName = value;
          this.packageLists = [];
          this.cartTypeLists = [];
          this.countryData = [];
          this.countryData = [];
          this.transferLists = [];
          this.transferTypeLists = [];
          this.transferLists = [];
          this.packageList();
          this.getContentList();
          this.countryDataList();
          this.getTransferLiat();
          this.getTransferTypeLiat();
        }
      }, {
        key: "selectStatus",
        value: function selectStatus(value) {
          var _this84 = this;

          this.status = value;
          console.log('staatus==>>', this.status);

          if (this.status == 'ACTIVE' || this.status == 'INACTIVE') {
            this.packageList();
            this.getContentList();
            this.addBannerList();
            this.cartypeList();
            this.countryDataList();
            this.getTransferLiat();
            this.getTransferTypeLiat();
          } else if (this.status == 'ALL') {
            // this.packageList();
            this.filterName = '';
            this.page = 1;
            this.limit = 10;
            this.status = null;
            setTimeout(function () {
              _this84.packageList();

              _this84.getContentList();

              _this84.addBannerList();

              _this84.cartypeList();

              _this84.countryDataList();

              _this84.getTransferLiat();

              _this84.getTransferTypeLiat();
            }, 100);
          }
        } // *********************package TypeList api*********************//

      }, {
        key: "packageList",
        value: function packageList() {
          var _this85 = this;

          var object = {
            'search': this.filterName,
            'status': this.status,
            'page': this.page,
            'limit': this.limit
          };
          this.service.postApi('admin/packageTypeList', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this85.spinner.hide(); // this.getName()


              _this85.packageLists = res.body.result.docs ? res.body.result.docs : res.body.result;
            }
          }, function (error) {
            _this85.spinner.hide();
          });
        } // *************Pagination method**********//

      }, {
        key: "changePage",
        value: function changePage(page) {
          console.log('Page ', page);
          this.page = this.page;
          this.p = page - 1;
          this.packageList();
          this.getContentList();
          this.addBannerList();
          this.cartypeList();
          this.countryDataList();
          this.getTransferLiat();
          this.getTransferTypeLiat();
        } // **************************Destination Get id method for delete customer*******************************//

      }, {
        key: "deleteFunction",
        value: function deleteFunction(id) {
          this.destination_id = id;
          console.log('user_id', this.destination_id);
          $('#exampdelete').modal({
            backdrop: 'static',
            keyboard: false
          });
        } // ***************************Delete method*******************************//

      }, {
        key: "deleteFunctions",
        value: function deleteFunctions() {
          var _this86 = this;

          this.service.deleteApi('admin/deletePackageType/' + this.destination_id, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this86.packageList();

              _this86.spinner.hide();

              _this86.service.showSuccess(res.body.response_message);
            } else {
              _this86.spinner.hide();

              _this86.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this86.spinner.hide();

            _this86.service.toastErr("Internal server error");
          });
        } // **************************Destination Get id method for delete customer*******************************//

      }, {
        key: "tranceFertype",
        value: function tranceFertype(id) {
          this.destination_id = id;
          console.log('user_id', this.destination_id);
          $('#transfertype').modal({
            backdrop: 'static',
            keyboard: false
          });
        } // ***************************Delete method*******************************//

      }, {
        key: "deletetranceFertype",
        value: function deletetranceFertype() {
          var _this87 = this;

          this.service.deleteApi('admin/deleteTransferType/' + this.destination_id, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this87.spinner.hide();

              _this87.getTransferTypeLiat();

              _this87.service.showSuccess(res.body.response_message);
            } else {
              _this87.spinner.hide();

              _this87.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this87.spinner.hide();

            _this87.service.toastErr("Internal server error");
          });
        } // ****************************Transfer delete api***********************//

      }, {
        key: "deletetransfer",
        value: function deletetransfer(id) {
          this.destination_id = id;
          console.log('user_id', this.destination_id);
          $('#transfrexampdelete').modal({
            backdrop: 'static',
            keyboard: false
          });
        } // ***************************Delete method*******************************//

      }, {
        key: "deletetransferdata",
        value: function deletetransferdata() {
          var _this88 = this;

          this.service.deleteApi('admin/deleteTransferCategory/' + this.destination_id, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this88.spinner.hide();

              _this88.getTransferLiat();

              _this88.service.showSuccess(res.body.response_message);
            } else {
              _this88.spinner.hide();

              _this88.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this88.spinner.hide();

            _this88.service.toastErr("Internal server error");
          });
        } // ****************************Car type delete api***********************//

      }, {
        key: "deletetCartype",
        value: function deletetCartype(id) {
          this.destination_id = id;
          console.log('user_id', this.destination_id);
          $('#deletetCartype').modal({
            backdrop: 'static',
            keyboard: false
          });
        } // ***************************Delete method*******************************//

      }, {
        key: "deletetCartypedata",
        value: function deletetCartypedata() {
          var _this89 = this;

          this.service.deleteApi('admin/deleteCarType/' + this.destination_id, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this89.cartypeList();

              _this89.spinner.hide();

              _this89.service.showSuccess(res.body.response_message);
            } else {
              _this89.spinner.hide();

              _this89.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this89.spinner.hide();

            _this89.service.toastErr("Internal server error");
          });
        } // ****************************Car type delete api***********************//

      }, {
        key: "deletetCountries",
        value: function deletetCountries(id) {
          this.destination_id = id;
          console.log('user_id', this.destination_id);
          $('#deletetCountries').modal({
            backdrop: 'static',
            keyboard: false
          });
        } // ***************************Delete method*******************************//

      }, {
        key: "deletetCountriesdata",
        value: function deletetCountriesdata() {
          var _this90 = this;

          this.service.deleteApi('admin/deleteCountry/' + this.destination_id, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this90.spinner.hide();

              _this90.countryDataList();

              _this90.service.showSuccess(res.body.response_message);
            } else {
              _this90.spinner.hide();

              _this90.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this90.spinner.hide();

            _this90.service.toastErr("Internal server error");
          });
        } //***************************Static Content List ***********************//

      }, {
        key: "getContentList",
        value: function getContentList() {
          var _this91 = this;

          var object = {
            "search": this.filterName,
            "status": this.status
          };
          this.service.postApi('static/staticContentList', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this91.spinner.hide();

              _this91.contentList = res.body.result.docs ? res.body.result.docs : res.body.result;
              console.log('getContentList==>>>', _this91.contentList);
            } else {
              _this91.spinner.hide();
            }
          }, function (error) {
            _this91.spinner.hide();
          });
        } // **************************banner id method for delete customer*******************************//

      }, {
        key: "deletebanner",
        value: function deletebanner(id) {
          this.banner_id = id;
          console.log('banner_id', this.banner_id);
          $('#bannermodaldelete').modal({
            backdrop: 'static',
            keyboard: false
          });
        } // ***************************Delete method*******************************//

      }, {
        key: "deletebanners",
        value: function deletebanners() {
          var _this92 = this;

          this.service.deleteApi('admin/deleteBanner/' + this.banner_id, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this92.spinner.hide();

              _this92.addBannerList();

              _this92.service.showSuccess(res.body.response_message);
            } else {
              _this92.spinner.hide();

              _this92.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this92.spinner.hide();

            _this92.service.toastErr("Internal server error");
          });
        } // getName(){
        //   this.countryName=[]
        //   this.countryList.filter(items=>{
        //     // console.log('name==>>',items.country)
        //     this.countryName.push(items.country)
        //   })
        //   this.destnList.putAll(this.countryName)
        //   console.log('countryName',this.destnList)
        // }
        // **************************Transfer category api****************//

      }, {
        key: "getTransferLiat",
        value: function getTransferLiat() {
          var _this93 = this;

          var object = {
            'search': this.filterName,
            'status': this.status,
            'page': this.page,
            'limit': this.limit
          };
          this.service.postApi('admin/transferCategoryList', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this93.spinner.hide(); // this.getName()


              _this93.transferLists = res.body.result.docs ? res.body.result.docs : res.body.result;
              console.log('transferLists==>>', _this93.transferLists);
            } else {
              _this93.spinner.hide();
            }
          }, function (error) {
            _this93.spinner.hide();
          });
        } // **************************Get transfer type api****************//

      }, {
        key: "getTransferTypeLiat",
        value: function getTransferTypeLiat() {
          var _this94 = this;

          var object = {
            'search': this.filterName,
            'status': this.status,
            'page': this.page,
            'limit': this.limit
          };
          this.service.postApi('admin/transferTypeList', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this94.spinner.hide(); // this.getName()


              _this94.transferTypeLists = res.body.result.docs ? res.body.result.docs : res.body.result;
              console.log('transferTypeLists==>>', _this94.transferTypeLists);
            } else {
              _this94.spinner.hide();
            }
          }, function (error) {
            _this94.spinner.hide();
          });
        } // ***************************Image upload 64base******************//

      }, {
        key: "handleInputChange",
        value: function handleInputChange(e) {
          var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
          var pattern = /image-*/;
          var reader = new FileReader();

          if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
          }

          reader.onload = this._handleReaderLoaded.bind(this);
          reader.readAsDataURL(file);
        }
      }, {
        key: "_handleReaderLoaded",
        value: function _handleReaderLoaded(e) {
          var reader = e.target;
          this.imageSrc = reader.result;
        }
      }, {
        key: "tabChangedFunc",
        value: function tabChangedFunc(val) {
          switch (val) {
            case 0:
              this.tab = 'PackageTypes'; // this.getactivejob();

              break;

            case 1:
              this.tab = 'Transfer'; // this.getappliedjob();

              break;

            case 2:
              this.tab = 'CarType'; // this.getpendingjob();

              break;

            case 3:
              this.tab = 'Countries';
          }
        }
      }, {
        key: "tabChangedFuncs",
        value: function tabChangedFuncs(val) {
          switch (val) {
            case 0:
              this.tabs = 'TransferCategory'; // this.getactivejob();

              break;

            case 1:
              this.tabs = 'TransferType'; // this.getappliedjob();

              break;
          }
        } // ****************************Add Banner Api***********************//

      }, {
        key: "addBanner",
        value: function addBanner() {
          var _this95 = this;

          this.spinner.show();
          var object = {
            'title': this.bannerForm.value.title,
            'bannerPic': this.imageSrc,
            'status': this.bannerForm.value.activebanner
          };
          this.service.postApi('admin/addBanner', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this95.spinner.hide();

              _this95.addBannerList();

              _this95.service.showSuccess(res.body.response_message);
            } else {
              _this95.spinner.hide();

              _this95.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this95.spinner.hide();

            _this95.service.toastErr(error.response_message);
          });
        } //*************************Add banner List******************************//

      }, {
        key: "addBannerList",
        value: function addBannerList() {
          var _this96 = this;

          this.spinner.show();
          var object = {
            'status': this.status,
            'pageNumber': this.page,
            'limit': this.limit
          };
          this.service.postApi('admin/bannerList', object, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this96.spinner.hide();

              _this96.bannerList = res.body.result.docs;
              console.log('bannerList', _this96.bannerList);
            } else {
              _this96.spinner.hide();
            }
          }, function (error) {
            _this96.spinner.hide();
          });
        }
      }]);

      return SettingsPageComponent;
    }();

    SettingsPageComponent.ctorParameters = function () {
      return [{
        type: _orbistur_service_service__WEBPACK_IMPORTED_MODULE_2__["OrbisturServiceService"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"]
      }, {
        type: ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"]
      }];
    };

    SettingsPageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-settings-page',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./settings-page.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/settings-page/settings-page.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./settings-page.component.css */
      "./src/app/settings-page/settings-page.component.css")).default]
    })], SettingsPageComponent);
    /***/
  },

  /***/
  "./src/app/sidebar/sidebar.component.css":
  /*!***********************************************!*\
    !*** ./src/app/sidebar/sidebar.component.css ***!
    \***********************************************/

  /*! exports provided: default */

  /***/
  function srcAppSidebarSidebarComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "a:hover, a:active, a:focus{\n    outline:none;\n}\na{\n    outline:none;\n}\nli{\n    cursor: pointer;\n}\n.profile{\n    display: -webkit-box;\n    display: flex;\n    justify-content: space-around;\n}\n.proImg img{\n    width: 100%;\n    border: 1px solid white;\n    width: 100%;\n    max-width: 200px;\n}\n.main-header .logo .logo-lg img{\n    width: 100%;\n    max-width: 185px;\n}\nbody.skin-blue.sidebar-mini.sidebar-collapse{\nfont-size:10px;\n}\nbody.skin-blue.sidebar-mini.sidebar-collapse .proImg img{\n    display: none;\n}\n.proImg p{\n    color:white;\n    font-size:20px;\n}\n/* Style the buttons */\nli.active{\n    background-color: aquamarine!important;\n}\n.side{\n    min-height: 200%;\n}\n.immgs{\n    height: 26px;\n    width: 26px;\n    padding-top: 4px;\n    margin-top: 13px;\n    border-radius: 15px;\n    margin-left: -42%;\n}\n.logouts{\n    display: -webkit-box;\n    display: flex;\n    justify-content: space-around;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2lkZWJhci9zaWRlYmFyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxZQUFZO0FBQ2hCO0FBQ0E7SUFDSSxZQUFZO0FBQ2hCO0FBRUE7SUFDSSxlQUFlO0FBQ25CO0FBQ0E7SUFDSSxvQkFBYTtJQUFiLGFBQWE7SUFDYiw2QkFBNkI7QUFDakM7QUFDQTtJQUNJLFdBQVc7SUFDWCx1QkFBdUI7SUFDdkIsV0FBVztJQUNYLGdCQUFnQjtBQUNwQjtBQUNBO0lBQ0ksV0FBVztJQUNYLGdCQUFnQjtBQUNwQjtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7SUFDSSxhQUFhO0FBQ2pCO0FBQ0E7SUFDSSxXQUFXO0lBQ1gsY0FBYztBQUNsQjtBQUNBLHNCQUFzQjtBQUN0QjtJQUNJLHNDQUFzQztBQUMxQztBQUNBO0lBQ0ksZ0JBQWdCO0FBQ3BCO0FBRUE7SUFDSSxZQUFZO0lBQ1osV0FBVztJQUNYLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsbUJBQW1CO0lBQ25CLGlCQUFpQjtBQUNyQjtBQUNBO0lBQ0ksb0JBQWE7SUFBYixhQUFhO0lBQ2IsNkJBQTZCO0FBQ2pDIiwiZmlsZSI6InNyYy9hcHAvc2lkZWJhci9zaWRlYmFyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJhOmhvdmVyLCBhOmFjdGl2ZSwgYTpmb2N1c3tcbiAgICBvdXRsaW5lOm5vbmU7XG59XG5he1xuICAgIG91dGxpbmU6bm9uZTtcbn1cblxubGl7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xufVxuLnByb2ZpbGV7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbn1cbi5wcm9JbWcgaW1ne1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1heC13aWR0aDogMjAwcHg7XG59XG4ubWFpbi1oZWFkZXIgLmxvZ28gLmxvZ28tbGcgaW1ne1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1heC13aWR0aDogMTg1cHg7XG59XG5ib2R5LnNraW4tYmx1ZS5zaWRlYmFyLW1pbmkuc2lkZWJhci1jb2xsYXBzZXtcbmZvbnQtc2l6ZToxMHB4O1xufVxuYm9keS5za2luLWJsdWUuc2lkZWJhci1taW5pLnNpZGViYXItY29sbGFwc2UgLnByb0ltZyBpbWd7XG4gICAgZGlzcGxheTogbm9uZTtcbn1cbi5wcm9JbWcgcHtcbiAgICBjb2xvcjp3aGl0ZTtcbiAgICBmb250LXNpemU6MjBweDtcbn1cbi8qIFN0eWxlIHRoZSBidXR0b25zICovXG5saS5hY3RpdmV7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogYXF1YW1hcmluZSFpbXBvcnRhbnQ7XG59XG4uc2lkZXtcbiAgICBtaW4taGVpZ2h0OiAyMDAlO1xufVxuXG4uaW1tZ3N7XG4gICAgaGVpZ2h0OiAyNnB4O1xuICAgIHdpZHRoOiAyNnB4O1xuICAgIHBhZGRpbmctdG9wOiA0cHg7XG4gICAgbWFyZ2luLXRvcDogMTNweDtcbiAgICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICAgIG1hcmdpbi1sZWZ0OiAtNDIlO1xufVxuLmxvZ291dHN7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbn1cbiJdfQ== */";
    /***/
  },

  /***/
  "./src/app/sidebar/sidebar.component.ts":
  /*!**********************************************!*\
    !*** ./src/app/sidebar/sidebar.component.ts ***!
    \**********************************************/

  /*! exports provided: SidebarComponent */

  /***/
  function srcAppSidebarSidebarComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SidebarComponent", function () {
      return SidebarComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _orbistur_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../orbistur-service.service */
    "./src/app/orbistur-service.service.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");

    var SidebarComponent =
    /*#__PURE__*/
    function () {
      function SidebarComponent(router, service, spinner) {
        _classCallCheck(this, SidebarComponent);

        this.router = router;
        this.service = service;
        this.spinner = spinner;
      }

      _createClass(SidebarComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }, {
        key: "logout",
        value: function logout() {
          this.spinner.show(); // $("#modallogout").modal("hide");

          $('#modallogout').modal({
            backdrop: 'static',
            keyboard: false
          });
          localStorage.removeItem('token');
          this.service.showSuccess('Logout successfully');
          setTimeout(function () {
            window.location.reload();
            this.spinner.hide();
          }, 100);
          this.router.navigate(['login']);
        }
      }]);

      return SidebarComponent;
    }();

    SidebarComponent.ctorParameters = function () {
      return [{
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]
      }, {
        type: _orbistur_service_service__WEBPACK_IMPORTED_MODULE_2__["OrbisturServiceService"]
      }, {
        type: ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerService"]
      }];
    };

    SidebarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-sidebar',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./sidebar.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/sidebar/sidebar.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./sidebar.component.css */
      "./src/app/sidebar/sidebar.component.css")).default]
    })], SidebarComponent);
    /***/
  },

  /***/
  "./src/app/sub-admin-management/sub-admin-management.component.css":
  /*!*************************************************************************!*\
    !*** ./src/app/sub-admin-management/sub-admin-management.component.css ***!
    \*************************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppSubAdminManagementSubAdminManagementComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".bt{\n    margin-left: 27px;\n    width: 100%;\n    max-width: 148px;\n    border-radius: 18px;\n    background-color: gray;\n    border: none;\n}\n\n.mainbtn{\n    display: -webkit-box;\n    display: flex;\n}\n\n.resetbtn{\n    margin-left: 1%;\n    width: 150px;\n    /* margin-left: 1%; */\n    /* width: 150px; */\n    background-color: gray;\n    color: white;\n    border-radius: 19px;\n}\n\n.addbtn{\n    margin-left: 49%;width: 150px;\n}\n\n.exbtn{\n    margin-left: 1%;\n    width: 150px;\n    background-color: gray;\n    color: white;\n    border-radius: 19px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc3ViLWFkbWluLW1hbmFnZW1lbnQvc3ViLWFkbWluLW1hbmFnZW1lbnQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGlCQUFpQjtJQUNqQixXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixzQkFBc0I7SUFDdEIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLG9CQUFhO0lBQWIsYUFBYTtBQUNqQjs7QUFDQTtJQUNJLGVBQWU7SUFDZixZQUFZO0lBQ1oscUJBQXFCO0lBQ3JCLGtCQUFrQjtJQUNsQixzQkFBc0I7SUFDdEIsWUFBWTtJQUNaLG1CQUFtQjtBQUN2Qjs7QUFDQTtJQUNJLGdCQUFnQixDQUFDLFlBQVk7QUFDakM7O0FBQ0E7SUFDSSxlQUFlO0lBQ2YsWUFBWTtJQUNaLHNCQUFzQjtJQUN0QixZQUFZO0lBQ1osbUJBQW1CO0FBQ3ZCIiwiZmlsZSI6InNyYy9hcHAvc3ViLWFkbWluLW1hbmFnZW1lbnQvc3ViLWFkbWluLW1hbmFnZW1lbnQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5idHtcbiAgICBtYXJnaW4tbGVmdDogMjdweDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXgtd2lkdGg6IDE0OHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDE4cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcbiAgICBib3JkZXI6IG5vbmU7XG59XG5cbi5tYWluYnRue1xuICAgIGRpc3BsYXk6IGZsZXg7XG59XG4ucmVzZXRidG57XG4gICAgbWFyZ2luLWxlZnQ6IDElO1xuICAgIHdpZHRoOiAxNTBweDtcbiAgICAvKiBtYXJnaW4tbGVmdDogMSU7ICovXG4gICAgLyogd2lkdGg6IDE1MHB4OyAqL1xuICAgIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGJvcmRlci1yYWRpdXM6IDE5cHg7XG59XG4uYWRkYnRue1xuICAgIG1hcmdpbi1sZWZ0OiA0OSU7d2lkdGg6IDE1MHB4O1xufVxuLmV4YnRue1xuICAgIG1hcmdpbi1sZWZ0OiAxJTtcbiAgICB3aWR0aDogMTUwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgYm9yZGVyLXJhZGl1czogMTlweDtcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/sub-admin-management/sub-admin-management.component.ts":
  /*!************************************************************************!*\
    !*** ./src/app/sub-admin-management/sub-admin-management.component.ts ***!
    \************************************************************************/

  /*! exports provided: SubAdminManagementComponent */

  /***/
  function srcAppSubAdminManagementSubAdminManagementComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SubAdminManagementComponent", function () {
      return SubAdminManagementComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _orbistur_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../orbistur-service.service */
    "./src/app/orbistur-service.service.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ngx-spinner */
    "./node_modules/ngx-spinner/fesm2015/ngx-spinner.js");
    /* harmony import */


    var _csv_service_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../csv-service.service */
    "./src/app/csv-service.service.ts");

    var SubAdminManagementComponent =
    /*#__PURE__*/
    function () {
      function SubAdminManagementComponent(service, router, formBuilder, csvServiceService, spinner) {
        _classCallCheck(this, SubAdminManagementComponent);

        this.service = service;
        this.router = router;
        this.formBuilder = formBuilder;
        this.csvServiceService = csvServiceService;
        this.spinner = spinner;
        this.limit = 10;
        this.page = 1;
        this.p = 0;
        this.dataArr = [];
        this.subAdminLists = [];
        this.subAdminList();
      }

      _createClass(SubAdminManagementComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {} // *******************Mobile number methods*************************//
        //********************Search by name event**************************//

      }, {
        key: "searchValue",
        value: function searchValue(value) {
          this.filterName = value;
          console.log('filterName==>>', this.filterName);
          this.subAdminLists = [];
          this.subAdminList();
        } //********************Reset Method******************************//

      }, {
        key: "reset",
        value: function reset() {
          this.filterName = '';
          this.subAdminList();
        } //********************Sub Admin list Api**************************//

      }, {
        key: "subAdminList",
        value: function subAdminList() {
          var _this97 = this;

          this.spinner.show();
          var object = {
            "search": this.filterName,
            "page": this.page,
            "limit": this.limit
          };
          this.service.postApi('admin/subAdminList', object, 1).subscribe(function (res) {
            console.log('res==>>', res);

            if (res.body.response_code == 200) {
              _this97.spinner.hide(); // this.subAdminLists=res.body.result.docs?res.body.result.docs:res.body.result  


              _this97.subAdminLists = res.body.result.docs;
              _this97.total = res.body.result.total;
              console.log('total==>>>', _this97.total);
            } else {
              _this97.spinner.hide(); // this.service.toastErr(res.body.response_message)          

            }
          }, function (error) {
            _this97.spinner.hide();

            _this97.service.toastErr(error.response_message);
          });
        }
      }, {
        key: "changePage",
        value: function changePage(page) {
          console.log('Page ', page);
          this.page = page;
          this.p = page - 1;
          this.subAdminList();
        }
      }, {
        key: "statusblock",
        value: function statusblock() {
          var _this98 = this;

          this.subAdminLists = []; // console.log('subAdminLists',this.subAdminLists)

          this.subAdminLists.forEach(function (items) {
            if (items.status == "ACTIVE") {
              _this98.subAdminLists.push(items);
            }

            console.log('subAdminListsItems', _this98.subAdminLists);
          });
        } // ***********************csv*********************//

      }, {
        key: "download",
        value: function download() {
          var dataArr = [];
          this.subAdminLists.forEach(function (element, ind) {
            dataArr.push({
              "S no": ind + 1,
              "Name": element.name ? element.name : '',
              "Email address": element.email ? element.email : 'N/A',
              "Mobile number": element.mobileNumber ? element.mobileNumber : 'N/A',
              "Registration on": element.createdAt ? element.createdAt.slice(0, 10) : 'N/A',
              "Status": element.status == 'ACTIVE' ? 'Active' : 'Inactive'
            });
          });
          console.log('download=>', dataArr);
          this.csvServiceService.downloadFile(dataArr, 'dataArr');
        } // **************************Get id method for delete Sub Admin*******************************//

      }, {
        key: "deleteFunction",
        value: function deleteFunction(id) {
          this.user_id = id;
          console.log('user_id', this.user_id);
          $('#modaldelete').modal({
            backdrop: 'static',
            keyboard: false
          });
        } // ***************************Delete method*******************************//

      }, {
        key: "deleteFunctions",
        value: function deleteFunctions() {
          var _this99 = this;

          this.spinner.show();
          this.service.deleteApi('admin/deleteSubAdmin/' + this.user_id, 1).subscribe(function (res) {
            if (res.body.response_code == 200) {
              _this99.subAdminList();

              _this99.spinner.hide();

              _this99.service.showSuccess("Sub-admin has been deleted successfully.");

              _this99.subAdminList();
            } else {
              _this99.spinner.hide();

              _this99.service.toastErr(res.body.response_message);
            }
          }, function (error) {
            _this99.spinner.hide();

            _this99.service.toastErr("Internal server error");
          });
        } // +***************************Sub-Admin Block and Unblock Method*******************//

      }, {
        key: "block",
        value: function block(_id, status) {
          this.block_id = _id;
          this.status = status;
          console.log('block_id==>>', this.block_id);
          console.log('status==>>', this.status);
          console.log('block_id', this.block_id, status);
          $('#modalblock').modal({
            backdrop: 'static',
            keyboard: false
          });
        }
      }, {
        key: "blockFunction",
        value: function blockFunction() {
          var _this100 = this;

          var object = {
            "subAdminId": this.block_id
          };
          console.log('hhhhhhh======>', this.block_id);
          this.service.postApi('admin/blockUnblockSubAdmin', object, 1).subscribe(function (res) {
            console.log('res_block', res);

            if (res.body.response_code == 200) {
              _this100.service.showSuccess(res.body.response_message);

              _this100.subAdminList();
            } else {
              _this100.service.toastErr(res.body.response_message);
            }
          });
        }
      }]);

      return SubAdminManagementComponent;
    }();

    SubAdminManagementComponent.ctorParameters = function () {
      return [{
        type: _orbistur_service_service__WEBPACK_IMPORTED_MODULE_2__["OrbisturServiceService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"]
      }, {
        type: _csv_service_service__WEBPACK_IMPORTED_MODULE_6__["CsvServiceService"]
      }, {
        type: ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"]
      }];
    };

    SubAdminManagementComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-sub-admin-management',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./sub-admin-management.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/sub-admin-management/sub-admin-management.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./sub-admin-management.component.css */
      "./src/app/sub-admin-management/sub-admin-management.component.css")).default]
    })], SubAdminManagementComponent);
    /***/
  },

  /***/
  "./src/app/view-enquries/view-enquries.component.css":
  /*!***********************************************************!*\
    !*** ./src/app/view-enquries/view-enquries.component.css ***!
    \***********************************************************/

  /*! exports provided: default */

  /***/
  function srcAppViewEnquriesViewEnquriesComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".name{\n    display: -webkit-box;\n    display: flex;\n    -webkit-box-pack: space-evenly;\n            justify-content: space-evenly;\n    float: inherit;\n    text-align: center\n   \n}\n.borders{\n    border-style: ridge;\n}\n.outer-box{\n    box-shadow: 0 0 3px grey;\n    width: 80%;\n    margin: auto;\n    height: 214px;\n    margin-top: 16px;\n    padding-top: 19px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlldy1lbnF1cmllcy92aWV3LWVucXVyaWVzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxvQkFBYTtJQUFiLGFBQWE7SUFDYiw4QkFBNkI7WUFBN0IsNkJBQTZCO0lBQzdCLGNBQWM7SUFDZDs7QUFFSjtBQUNBO0lBQ0ksbUJBQW1CO0FBQ3ZCO0FBQ0E7SUFDSSx3QkFBd0I7SUFDeEIsVUFBVTtJQUNWLFlBQVk7SUFDWixhQUFhO0lBQ2IsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtBQUNyQiIsImZpbGUiOiJzcmMvYXBwL3ZpZXctZW5xdXJpZXMvdmlldy1lbnF1cmllcy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm5hbWV7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcbiAgICBmbG9hdDogaW5oZXJpdDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXJcbiAgIFxufVxuLmJvcmRlcnN7XG4gICAgYm9yZGVyLXN0eWxlOiByaWRnZTtcbn1cbi5vdXRlci1ib3h7XG4gICAgYm94LXNoYWRvdzogMCAwIDNweCBncmV5O1xuICAgIHdpZHRoOiA4MCU7XG4gICAgbWFyZ2luOiBhdXRvO1xuICAgIGhlaWdodDogMjE0cHg7XG4gICAgbWFyZ2luLXRvcDogMTZweDtcbiAgICBwYWRkaW5nLXRvcDogMTlweDtcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/view-enquries/view-enquries.component.ts":
  /*!**********************************************************!*\
    !*** ./src/app/view-enquries/view-enquries.component.ts ***!
    \**********************************************************/

  /*! exports provided: ViewEnquriesComponent */

  /***/
  function srcAppViewEnquriesViewEnquriesComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ViewEnquriesComponent", function () {
      return ViewEnquriesComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _orbistur_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../orbistur-service.service */
    "./src/app/orbistur-service.service.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");

    var ViewEnquriesComponent =
    /*#__PURE__*/
    function () {
      function ViewEnquriesComponent(service, activate, route, formBuilder) {
        _classCallCheck(this, ViewEnquriesComponent);

        this.service = service;
        this.activate = activate;
        this.route = route;
        this.formBuilder = formBuilder;
        this.store = [];
      }

      _createClass(ViewEnquriesComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this101 = this;

          this.activate.params.subscribe(function (params) {
            _this101.id = params.id;
            console.log("jnujnojk ", _this101.id);
          });
          this.viewenquiry();
        }
      }, {
        key: "viewenquiry",
        value: function viewenquiry() {
          var _this102 = this;

          this.service.getApi('admin/viewInquiry/' + this.id, 1).subscribe(function (res) {
            console.log("hhhhhhhhh=======>", res);
            _this102.store = res.body.result;
            console.log('ress===>>', _this102.store);
          });
        }
      }]);

      return ViewEnquriesComponent;
    }();

    ViewEnquriesComponent.ctorParameters = function () {
      return [{
        type: _orbistur_service_service__WEBPACK_IMPORTED_MODULE_2__["OrbisturServiceService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"]
      }];
    };

    ViewEnquriesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-view-enquries',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./view-enquries.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/view-enquries/view-enquries.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./view-enquries.component.css */
      "./src/app/view-enquries/view-enquries.component.css")).default]
    })], ViewEnquriesComponent);
    /***/
  },

  /***/
  "./src/app/view-package-management/view-package-management.component.css":
  /*!*******************************************************************************!*\
    !*** ./src/app/view-package-management/view-package-management.component.css ***!
    \*******************************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppViewPackageManagementViewPackageManagementComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXctcGFja2FnZS1tYW5hZ2VtZW50L3ZpZXctcGFja2FnZS1tYW5hZ2VtZW50LmNvbXBvbmVudC5jc3MifQ== */";
    /***/
  },

  /***/
  "./src/app/view-package-management/view-package-management.component.ts":
  /*!******************************************************************************!*\
    !*** ./src/app/view-package-management/view-package-management.component.ts ***!
    \******************************************************************************/

  /*! exports provided: ViewPackageManagementComponent */

  /***/
  function srcAppViewPackageManagementViewPackageManagementComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ViewPackageManagementComponent", function () {
      return ViewPackageManagementComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _orbistur_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../orbistur-service.service */
    "./src/app/orbistur-service.service.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");

    var ViewPackageManagementComponent =
    /*#__PURE__*/
    function () {
      function ViewPackageManagementComponent(service, activate, route, formBuilder) {
        _classCallCheck(this, ViewPackageManagementComponent);

        this.service = service;
        this.activate = activate;
        this.route = route;
        this.formBuilder = formBuilder;
        this.store = [];
      }

      _createClass(ViewPackageManagementComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this103 = this;

          this.activate.params.subscribe(function (params) {
            _this103.id = params.id;
            console.log("jnujnojk ", _this103.id);
          });
          this.viewenquiry();
        }
      }, {
        key: "viewenquiry",
        value: function viewenquiry() {
          var _this104 = this;

          this.service.getApi('admin/viewPackage/' + this.id, 1).subscribe(function (res) {
            console.log("hhhhhhhhh=======>", res);
            _this104.store = res.body.result;
            console.log('ress===>>', _this104.store);
          });
        }
      }]);

      return ViewPackageManagementComponent;
    }();

    ViewPackageManagementComponent.ctorParameters = function () {
      return [{
        type: _orbistur_service_service__WEBPACK_IMPORTED_MODULE_2__["OrbisturServiceService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]
      }, {
        type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"]
      }];
    };

    ViewPackageManagementComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-view-package-management',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./view-package-management.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/view-package-management/view-package-management.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./view-package-management.component.css */
      "./src/app/view-package-management/view-package-management.component.css")).default]
    })], ViewPackageManagementComponent);
    /***/
  },

  /***/
  "./src/app/viewenquries/viewenquries.component.css":
  /*!*********************************************************!*\
    !*** ./src/app/viewenquries/viewenquries.component.css ***!
    \*********************************************************/

  /*! exports provided: default */

  /***/
  function srcAppViewenquriesViewenquriesComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdlbnF1cmllcy92aWV3ZW5xdXJpZXMuY29tcG9uZW50LmNzcyJ9 */";
    /***/
  },

  /***/
  "./src/app/viewenquries/viewenquries.component.ts":
  /*!********************************************************!*\
    !*** ./src/app/viewenquries/viewenquries.component.ts ***!
    \********************************************************/

  /*! exports provided: ViewenquriesComponent */

  /***/
  function srcAppViewenquriesViewenquriesComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ViewenquriesComponent", function () {
      return ViewenquriesComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var ViewenquriesComponent =
    /*#__PURE__*/
    function () {
      function ViewenquriesComponent() {
        _classCallCheck(this, ViewenquriesComponent);
      }

      _createClass(ViewenquriesComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }]);

      return ViewenquriesComponent;
    }();

    ViewenquriesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-viewenquries',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./viewenquries.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/viewenquries/viewenquries.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./viewenquries.component.css */
      "./src/app/viewenquries/viewenquries.component.css")).default]
    })], ViewenquriesComponent);
    /***/
  },

  /***/
  "./src/environments/environment.ts":
  /*!*****************************************!*\
    !*** ./src/environments/environment.ts ***!
    \*****************************************/

  /*! exports provided: environment */

  /***/
  function srcEnvironmentsEnvironmentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "environment", function () {
      return environment;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js"); // This file can be replaced during build by using the `fileReplacements` array.
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

    /***/
  },

  /***/
  "./src/main.ts":
  /*!*********************!*\
    !*** ./src/main.ts ***!
    \*********************/

  /*! no exports provided */

  /***/
  function srcMainTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/platform-browser-dynamic */
    "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
    /* harmony import */


    var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./app/app.module */
    "./src/app/app.module.ts");
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./environments/environment */
    "./src/environments/environment.ts");

    if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
      Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
    }

    Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"]).catch(function (err) {
      return console.error(err);
    });
    /***/
  },

  /***/
  0:
  /*!***************************!*\
    !*** multi ./src/main.ts ***!
    \***************************/

  /*! no static exports found */

  /***/
  function _(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(
    /*! /Users/mobiloitteuser/Desktop/Orbistur-sprint-2/orbistur-travel-website-design-development-19123647-angular/src/main.ts */
    "./src/main.ts");
    /***/
  }
}, [[0, "runtime", "vendor"]]]);
//# sourceMappingURL=main-es5.js.map