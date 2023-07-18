System.register(["jimu-core","jimu-ui/advanced/setting-components","jimu-ui"], function(__WEBPACK_DYNAMIC_EXPORT__, __system_context__) {
	var __WEBPACK_EXTERNAL_MODULE_jimu_core__ = {};
	var __WEBPACK_EXTERNAL_MODULE_jimu_ui_advanced_setting_components__ = {};
	var __WEBPACK_EXTERNAL_MODULE_jimu_ui__ = {};
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_jimu_core__, "__esModule", { value: true });
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_jimu_ui_advanced_setting_components__, "__esModule", { value: true });
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_jimu_ui__, "__esModule", { value: true });
	return {
		setters: [
			function(module) {
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE_jimu_core__[key] = module[key];
				});
			},
			function(module) {
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE_jimu_ui_advanced_setting_components__[key] = module[key];
				});
			},
			function(module) {
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE_jimu_ui__[key] = module[key];
				});
			}
		],
		execute: function() {
			__WEBPACK_DYNAMIC_EXPORT__(
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "jimu-core":
/*!****************************!*\
  !*** external "jimu-core" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_jimu_core__;

/***/ }),

/***/ "jimu-ui":
/*!**************************!*\
  !*** external "jimu-ui" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_jimu_ui__;

/***/ }),

/***/ "jimu-ui/advanced/setting-components":
/*!******************************************************!*\
  !*** external "jimu-ui/advanced/setting-components" ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_jimu_ui_advanced_setting_components__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!******************************************!*\
  !*** ./jimu-core/lib/set-public-path.ts ***!
  \******************************************/
/**
 * Webpack will replace __webpack_public_path__ with __webpack_require__.p to set the public path dynamically.
 * The reason why we can't set the publicPath in webpack config is: we change the publicPath when download.
 * */
// eslint-disable-next-line
// @ts-ignore
__webpack_require__.p = window.jimuConfig.baseUrl;

})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***************************************************************************!*\
  !*** ./your-extensions/widgets/tmsdatasetsviewer/src/setting/setting.tsx ***!
  \***************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Setting)
/* harmony export */ });
/* harmony import */ var jimu_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jimu-core */ "jimu-core");
/* harmony import */ var jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jimu-ui/advanced/setting-components */ "jimu-ui/advanced/setting-components");
/* harmony import */ var jimu_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jimu-ui */ "jimu-ui");




class Setting extends jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.PureComponent {
    constructor() {
        super(...arguments);
        this.onMapSelected = (useMapWidgetIds) => {
            this.props.onSettingChange({
                id: this.props.id,
                useMapWidgetIds: useMapWidgetIds
            });
        };
        this.onTextInputChange = (e) => {
            this.props.onSettingChange({
                id: this.props.id,
                config: this.props.config.setIn(['url'], e.target.value)
            });
        };
        this.onNumberInputChange = (e) => {
            this.props.onSettingChange({
                id: this.props.id,
                config: this.props.config.setIn(['backgroundIndex'], e.target.value)
            });
        };
        this.onToggleChange = (e) => {
            this.props.onSettingChange({
                id: this.props.id,
                config: this.props.config.setIn(['moveImageryToBackgroung'], e.target.checked)
            });
            console.log(this.props.config);
        };
        this.onTextAreaChange = (e) => {
            console.log(e.target.value);
            console.log(JSON.parse(e.target.value));
            this.props.onSettingChange({
                id: this.props.id,
                config: this.props.config.setIn(['mapping'], JSON.parse(e.target.value))
            });
        };
    }
    /* onSelectChange = e => {
      this.props.onSettingChange({
        id: this.props.id,
        config: this.props.config.setIn(['functionConfig'], e.target.value)
      })
  
      console.log(e.target.value)
    } */
    render() {
        return jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", { className: "sample-use-map-view-setting p-2" },
            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_1__.SettingRow, { flow: 'wrap', label: "Map" },
                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_1__.MapWidgetSelector, { onSelect: this.onMapSelected, useMapWidgetIds: this.props.useMapWidgetIds })),
            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_1__.SettingRow, { flow: 'wrap', label: "Url of the Alteia data service" },
                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(jimu_ui__WEBPACK_IMPORTED_MODULE_2__.TextInput, { className: "w-100", onChange: this.onTextInputChange, value: this.props.config.url })),
            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_1__.SettingRow, { flow: 'wrap', label: "Desired background index" },
                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(jimu_ui__WEBPACK_IMPORTED_MODULE_2__.TextInput, { className: "w-1", onChange: this.onNumberInputChange, value: this.props.config.backgroundIndex })),
            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_1__.SettingRow, { flow: 'wrap', label: "Field mapping" },
                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(jimu_ui__WEBPACK_IMPORTED_MODULE_2__.TextArea, { onChange: this.onTextAreaChange, height: 300, className: 'w-100', spellCheck: false, placeholder: "d", defaultValue: JSON.stringify(this.props.config.mapping, null, "\t") })),
            jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_1__.SettingRow, { flow: 'no-wrap', label: "Move imagery to background" },
                jimu_core__WEBPACK_IMPORTED_MODULE_0__.React.createElement(jimu_ui__WEBPACK_IMPORTED_MODULE_2__.Switch, { checked: this.props.config.moveImageryToBackgroung, onChange: this.onToggleChange })));
    }
}

})();

/******/ 	return __webpack_exports__;
/******/ })()

			);
		}
	};
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0cy90bXNkYXRhc2V0c3ZpZXdlci9kaXN0L3NldHRpbmcvc2V0dGluZy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7Ozs7Ozs7O0FDQUE7OztLQUdLO0FBQ0wsMkJBQTJCO0FBQzNCLGFBQWE7QUFDYixxQkFBdUIsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTGpCO0FBRXNDO0FBQ1o7QUFDSTtBQUVqRCxNQUFNLE9BQVEsU0FBUSwwREFBa0Q7SUFBdkY7O1FBRUUsa0JBQWEsR0FBRyxDQUFDLGVBQXlCLEVBQUUsRUFBRTtZQUU1QyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQztnQkFDekIsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDakIsZUFBZSxFQUFFLGVBQWU7YUFDakMsQ0FBQztRQUVKLENBQUM7UUFFRCxzQkFBaUIsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBRXhCLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDO2dCQUN6QixFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENB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LEtBQUssRUFDakIsV0FBVyxFQUFDLEdBQUcsRUFDZixZQUFZLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUNuRSxDQUNTO1lBQ2IsMkRBQUMsMkVBQVUsSUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFHLEtBQUssRUFBQyw0QkFBNEI7Z0JBQzNELDJEQUFDLDJDQUFNLElBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLHVCQUF1QixFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsY0FBYyxHQUFJLENBQ2xGLENBQ1g7SUFDUixDQUFDO0NBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leGItY2xpZW50L2V4dGVybmFsIHN5c3RlbSBcImppbXUtY29yZVwiIiwid2VicGFjazovL2V4Yi1jbGllbnQvZXh0ZXJuYWwgc3lzdGVtIFwiamltdS11aVwiIiwid2VicGFjazovL2V4Yi1jbGllbnQvZXh0ZXJuYWwgc3lzdGVtIFwiamltdS11aS9hZHZhbmNlZC9zZXR0aW5nLWNvbXBvbmVudHNcIiIsIndlYnBhY2s6Ly9leGItY2xpZW50L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2V4Yi1jbGllbnQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2V4Yi1jbGllbnQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9leGItY2xpZW50L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vamltdS1jb3JlL2xpYi9zZXQtcHVibGljLXBhdGgudHMiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC8uL3lvdXItZXh0ZW5zaW9ucy93aWRnZXRzL3Rtc2RhdGFzZXRzdmlld2VyL3NyYy9zZXR0aW5nL3NldHRpbmcudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9qaW11X2NvcmVfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfamltdV91aV9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9qaW11X3VpX2FkdmFuY2VkX3NldHRpbmdfY29tcG9uZW50c19fOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjsiLCIvKipcclxuICogV2VicGFjayB3aWxsIHJlcGxhY2UgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gd2l0aCBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgdG8gc2V0IHRoZSBwdWJsaWMgcGF0aCBkeW5hbWljYWxseS5cclxuICogVGhlIHJlYXNvbiB3aHkgd2UgY2FuJ3Qgc2V0IHRoZSBwdWJsaWNQYXRoIGluIHdlYnBhY2sgY29uZmlnIGlzOiB3ZSBjaGFuZ2UgdGhlIHB1YmxpY1BhdGggd2hlbiBkb3dubG9hZC5cclxuICogKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbi8vIEB0cy1pZ25vcmVcclxuX193ZWJwYWNrX3B1YmxpY19wYXRoX18gPSB3aW5kb3cuamltdUNvbmZpZy5iYXNlVXJsXHJcbiIsIlxuaW1wb3J0IHsgUmVhY3QgfSBmcm9tICdqaW11LWNvcmUnO1xuaW1wb3J0IHsgQWxsV2lkZ2V0U2V0dGluZ1Byb3BzIH0gZnJvbSAnamltdS1mb3ItYnVpbGRlcic7XG5pbXBvcnQgeyBNYXBXaWRnZXRTZWxlY3RvciB9IGZyb20gJ2ppbXUtdWkvYWR2YW5jZWQvc2V0dGluZy1jb21wb25lbnRzJztcbmltcG9ydCB7IFRleHRJbnB1dCwgU2VsZWN0LCBUZXh0QXJlYSwgU3dpdGNofSBmcm9tICdqaW11LXVpJ1xuaW1wb3J0IHsgU2V0dGluZ1JvdyB9IGZyb20gJ2ppbXUtdWkvYWR2YW5jZWQvc2V0dGluZy1jb21wb25lbnRzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXR0aW5nIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudDxBbGxXaWRnZXRTZXR0aW5nUHJvcHM8e30+LCB7fT57XG5cbiAgb25NYXBTZWxlY3RlZCA9ICh1c2VNYXBXaWRnZXRJZHM6IHN0cmluZ1tdKSA9PiB7XG5cbiAgICB0aGlzLnByb3BzLm9uU2V0dGluZ0NoYW5nZSh7XG4gICAgICBpZDogdGhpcy5wcm9wcy5pZCxcbiAgICAgIHVzZU1hcFdpZGdldElkczogdXNlTWFwV2lkZ2V0SWRzXG4gICAgfSlcblxuICB9XG5cbiAgb25UZXh0SW5wdXRDaGFuZ2UgPSAoZSkgPT4ge1xuXG4gICAgdGhpcy5wcm9wcy5vblNldHRpbmdDaGFuZ2Uoe1xuICAgICAgaWQ6IHRoaXMucHJvcHMuaWQsXG4gICAgICBjb25maWc6IHRoaXMucHJvcHMuY29uZmlnLnNldEluKFsndXJsJ10sIGUudGFyZ2V0LnZhbHVlKVxuICAgIH0pXG5cblxuICB9XG4gIG9uTnVtYmVySW5wdXRDaGFuZ2UgPSAoZSkgPT4ge1xuXG4gICAgdGhpcy5wcm9wcy5vblNldHRpbmdDaGFuZ2Uoe1xuICAgICAgaWQ6IHRoaXMucHJvcHMuaWQsXG4gICAgICBjb25maWc6IHRoaXMucHJvcHMuY29uZmlnLnNldEluKFsnYmFja2dyb3VuZEluZGV4J10sIGUudGFyZ2V0LnZhbHVlKVxuICAgIH0pXG47XG5cbiAgfVxuICBvblRvZ2dsZUNoYW5nZSA9IChlKSA9PiB7XG5cbiAgICB0aGlzLnByb3BzLm9uU2V0dGluZ0NoYW5nZSh7XG4gICAgICBpZDogdGhpcy5wcm9wcy5pZCxcbiAgICAgIGNvbmZpZzogdGhpcy5wcm9wcy5jb25maWcuc2V0SW4oWydtb3ZlSW1hZ2VyeVRvQmFja2dyb3VuZyddLCBlLnRhcmdldC5jaGVja2VkKVxuICAgIH0pXG5cblxuICAgIGNvbnNvbGUubG9nKHRoaXMucHJvcHMuY29uZmlnKVxuXG4gIH1cblxuICBvblRleHRBcmVhQ2hhbmdlID0gKGUpID0+IHtcblxuICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LnZhbHVlKVxuXG4gICAgY29uc29sZS5sb2coSlNPTi5wYXJzZShlLnRhcmdldC52YWx1ZSkpXG5cbiAgICB0aGlzLnByb3BzLm9uU2V0dGluZ0NoYW5nZSh7XG4gICAgICBpZDogdGhpcy5wcm9wcy5pZCxcbiAgICAgIGNvbmZpZzogdGhpcy5wcm9wcy5jb25maWcuc2V0SW4oWydtYXBwaW5nJ10sIEpTT04ucGFyc2UoZS50YXJnZXQudmFsdWUpKVxuICAgIH0pXG5cblxuICB9XG5cbiAgLyogb25TZWxlY3RDaGFuZ2UgPSBlID0+IHtcbiAgICB0aGlzLnByb3BzLm9uU2V0dGluZ0NoYW5nZSh7XG4gICAgICBpZDogdGhpcy5wcm9wcy5pZCxcbiAgICAgIGNvbmZpZzogdGhpcy5wcm9wcy5jb25maWcuc2V0SW4oWydmdW5jdGlvbkNvbmZpZyddLCBlLnRhcmdldC52YWx1ZSlcbiAgICB9KVxuXG4gICAgY29uc29sZS5sb2coZS50YXJnZXQudmFsdWUpXG4gIH0gKi9cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwic2FtcGxlLXVzZS1tYXAtdmlldy1zZXR0aW5nIHAtMlwiPlxuICAgICAgPFNldHRpbmdSb3cgZmxvdz0nd3JhcCcgIGxhYmVsPVwiTWFwXCI+XG4gICAgICAgIDxNYXBXaWRnZXRTZWxlY3RvciBvblNlbGVjdD17dGhpcy5vbk1hcFNlbGVjdGVkfSB1c2VNYXBXaWRnZXRJZHM9e3RoaXMucHJvcHMudXNlTWFwV2lkZ2V0SWRzfSAvPlxuICAgICAgPC9TZXR0aW5nUm93PlxuICAgICAgPFNldHRpbmdSb3cgZmxvdz0nd3JhcCcgIGxhYmVsPVwiVXJsIG9mIHRoZSBBbHRlaWEgZGF0YSBzZXJ2aWNlXCI+XG4gICAgICAgIDxUZXh0SW5wdXQgY2xhc3NOYW1lPVwidy0xMDBcIiBvbkNoYW5nZT17dGhpcy5vblRleHRJbnB1dENoYW5nZX0gdmFsdWU9e3RoaXMucHJvcHMuY29uZmlnLnVybH0gLz5cbiAgICAgIDwvU2V0dGluZ1Jvdz5cbiAgICAgIDxTZXR0aW5nUm93IGZsb3c9J3dyYXAnICBsYWJlbD1cIkRlc2lyZWQgYmFja2dyb3VuZCBpbmRleFwiPlxuICAgICAgICA8VGV4dElucHV0IGNsYXNzTmFtZT1cInctMVwiIG9uQ2hhbmdlPXt0aGlzLm9uTnVtYmVySW5wdXRDaGFuZ2V9IHZhbHVlPXt0aGlzLnByb3BzLmNvbmZpZy5iYWNrZ3JvdW5kSW5kZXh9IC8+XG4gICAgICA8L1NldHRpbmdSb3c+XG4gICAgICB7LyogPFNldHRpbmdSb3c+XG4gICAgICAgIDxTZWxlY3Qgb25DaGFuZ2U9e3RoaXMub25TZWxlY3RDaGFuZ2V9IHNpemU9J3NtJz5cblxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJmXCIga2V5PVwiZlwiPmY8L29wdGlvbj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiclwiIGtleT1cImZyXCI+cjwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJyXCIga2V5PVwiZWZcIj5yPC9vcHRpb24+XG5cbiAgICAgICAgPC9TZWxlY3Q+XG4gICAgICA8L1NldHRpbmdSb3c+ICovfVxuICAgICAgPFNldHRpbmdSb3cgZmxvdz0nd3JhcCcgIGxhYmVsPVwiRmllbGQgbWFwcGluZ1wiPlxuICAgICAgICA8VGV4dEFyZWFcbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vblRleHRBcmVhQ2hhbmdlfVxuICAgICAgICAgIGhlaWdodD17MzAwfVxuICAgICAgICAgIGNsYXNzTmFtZT0ndy0xMDAnXG4gICAgICAgICAgc3BlbGxDaGVjaz17ZmFsc2V9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJkXCJcbiAgICAgICAgICBkZWZhdWx0VmFsdWU9e0pTT04uc3RyaW5naWZ5KHRoaXMucHJvcHMuY29uZmlnLm1hcHBpbmcsIG51bGwsIFwiXFx0XCIpfVxuICAgICAgICAvPlxuICAgICAgPC9TZXR0aW5nUm93PlxuICAgICAgPFNldHRpbmdSb3cgZmxvdz0nbm8td3JhcCcgICBsYWJlbD1cIk1vdmUgaW1hZ2VyeSB0byBiYWNrZ3JvdW5kXCI+XG4gICAgICAgICAgPFN3aXRjaCBjaGVja2VkPXt0aGlzLnByb3BzLmNvbmZpZy5tb3ZlSW1hZ2VyeVRvQmFja2dyb3VuZ30gb25DaGFuZ2U9e3RoaXMub25Ub2dnbGVDaGFuZ2V9IC8+XG4gICAgICAgIDwvU2V0dGluZ1Jvdz5cbiAgICA8L2Rpdj5cbiAgfVxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==