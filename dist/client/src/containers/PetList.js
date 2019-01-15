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
var PetItem_1 = __importDefault(require("../components/PetItem"));
var core_1 = require("@material-ui/core");
var petService_1 = __importDefault(require("../services/petService"));
var Header_1 = __importDefault(require("../components/Header"));
var react_router_dom_1 = require("react-router-dom");
var PetList = /** @class */ (function (_super) {
    __extends(PetList, _super);
    function PetList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetList.prototype.componentWillMount = function () {
        this.setState({
            loading: true,
            error: undefined,
            pets: []
        });
    };
    PetList.prototype.componentDidMount = function () {
        var _this = this;
        petService_1.default.fetchPets()
            .then(function (data) {
            return _this.setState({ pets: data, loading: false });
        })
            .catch(function (error) {
            return _this.setState({ error: error, loading: false });
        });
    };
    PetList.prototype.render = function () {
        // will contain the dynamic part of this view
        var element;
        // Data is still being fetched
        if (this.state.loading) {
            element = <core_1.Icon>loader</core_1.Icon>;
        }
        // An error has occured while fetching data
        else if (this.state.error) {
            element = <div>An error has occured while fetching data</div>;
        }
        // Data has been loaded but is empty
        else if (!this.state.pets.length) {
            element = (<div>
					No pets found, you can add some by clicking here :{' '}
					<react_router_dom_1.NavLink to='/details'>
						<core_1.Icon>add</core_1.Icon>
					</react_router_dom_1.NavLink>
				</div>);
        }
        // We can display data
        else {
            element = (<div className='container'>
					{this.state.pets.map(function (pet, i) {
                return <PetItem_1.default key={pet.rfid} pet={pet}/>;
            })}
				</div>);
        }
        return (<div>
				<Header_1.default isHome={true}/>
				{element}
			</div>);
    };
    return PetList;
}(react_1.Component));
exports.default = PetList;
//# sourceMappingURL=PetList.js.map