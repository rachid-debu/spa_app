"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var PetForm_1 = __importDefault(require("./components/PetForm"));
var PetList_1 = __importDefault(require("./containers/PetList"));
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return (<react_router_dom_1.BrowserRouter>
				<div className='App'>
					<react_router_dom_1.Route exact path={'/'} component={PetList_1.default}/>
					<react_router_dom_1.Route exact path={'/details'} component={PetForm_1.default}/>
					<react_router_dom_1.Route exact path={'/details/:rfid'} component={PetForm_1.default}/>
				</div>
			</react_router_dom_1.BrowserRouter>);
    };
    return App;
}(react_1.Component));
exports.default = App;
//# sourceMappingURL=App.js.map