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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var core_1 = require("@material-ui/core");
var react_router_1 = require("react-router");
var PetItem = /** @class */ (function (_super) {
    __extends(PetItem, _super);
    function PetItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetItem.prototype.onCardClick = function () {
        this.props.history.push('/details/' + this.props.pet.rfid);
    };
    PetItem.prototype.render = function () {
        // Save the pet to use it quickly
        var pet = this.props.pet;
        // We want a nicer Date format to display
        var entryDate = new Date(pet.entryDate).toLocaleDateString('en-US');
        return (<core_1.Card onClick={this.onCardClick.bind(this)} className='card width60'>
				<core_1.CardHeader title={pet.species} subheader={entryDate}/>
				<core_1.CardContent>
					{pet.description
            ? pet.description
            : 'No description provided'}
				</core_1.CardContent>
			</core_1.Card>);
    };
    return PetItem;
}(react_1.Component));
exports.default = react_router_1.withRouter(PetItem);
//# sourceMappingURL=PetItem.js.map