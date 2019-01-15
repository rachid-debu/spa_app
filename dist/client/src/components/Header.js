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
var petService_1 = __importDefault(require("../services/petService"));
var core_1 = require("@material-ui/core");
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            dialogOpen: false,
            rfid: '',
            errorMessage: ''
        };
        return _this;
    }
    Header.prototype.goBack = function () {
        this.props.history.goBack();
    };
    Header.prototype.openDialog = function () {
        this.setState({
            dialogOpen: true,
            rfid: '',
            errorMessage: ''
        });
    };
    Header.prototype.closeSearchDialog = function () {
        this.setState({
            dialogOpen: false,
            rfid: '',
            errorMessage: ''
        });
    };
    // Submit the search dialog
    Header.prototype.handleSearchDialogSubmit = function () {
        var _this = this;
        // if rfid has been provided
        if (this.state.rfid.length) {
            // we send a fetch request
            petService_1.default.fetchPet(this.state.rfid)
                .then(function (pet) {
                // if we found, we redirect to details page of this rfid. else we show an error message
                pet != null
                    ? _this.props.history.push('/details/' + pet.rfid)
                    : _this.setState({
                        errorMessage: 'No pet found with this RFID'
                    });
            })
                .catch(function (err) {
                // we display the error message
                _this.setState({ errorMessage: err.message });
            });
        }
        // if rfid is not provided we show an error message
        else {
            this.setState({ errorMessage: 'Please fill the RFID' });
        }
    };
    Header.prototype.handleSearchDialogTextfieldChange = function (event) {
        // we set the rfid provided
        this.setState({
            rfid: event.target.value
        });
    };
    // RIGHT : Add button / nothing
    Header.prototype.renderToolbarRightButton = function () {
        var _this = this;
        // on home page
        if (this.props.isHome) {
            // we show a '+' button
            return (<core_1.IconButton color='inherit' onClick={function () { return _this.props.history.push('/details'); }}>
					<core_1.Icon>add</core_1.Icon>
				</core_1.IconButton>);
        }
        else {
            // invisible button (trick)
            return (<core_1.IconButton color='primary'>
					<core_1.Icon>add</core_1.Icon>
				</core_1.IconButton>);
        }
    };
    // LEFT : Search button / Go back button
    Header.prototype.renderToolbarLeftButton = function () {
        var _this = this;
        if (this.props.isHome) {
            return (<core_1.IconButton color='inherit' onClick={function () { return _this.openDialog(); }}>
					<core_1.Icon>search</core_1.Icon>
				</core_1.IconButton>);
        }
        else {
            return (<core_1.IconButton color='inherit' onClick={function () { return _this.goBack(); }}>
					<core_1.Icon>arrow_back</core_1.Icon>
				</core_1.IconButton>);
        }
    };
    Header.prototype.render = function () {
        var _this = this;
        return (<core_1.AppBar color='primary' position='sticky'>
				<core_1.Toolbar style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
        }}>
					{this.renderToolbarLeftButton()}
					<core_1.IconButton color='inherit' onClick={function () { return _this.props.history.push('/'); }}>
						SPA
					</core_1.IconButton>
					{this.renderToolbarRightButton()}
				</core_1.Toolbar>

				
				<core_1.Dialog open={this.state.dialogOpen} onClose={function () { return _this.closeSearchDialog(); }} aria-labelledby='form-dialog-title'>
					<core_1.DialogTitle id='form-dialog-title'>Find a Pet</core_1.DialogTitle>
					<core_1.DialogContent>
						<form onSubmit={function (event) {
            event.preventDefault();
            _this.handleSearchDialogSubmit();
        }}>
							<core_1.TextField autoFocus id='rfid' label='RFID chip number' type='text' fullWidth onChange={function (event) {
            return _this.handleSearchDialogTextfieldChange(event);
        }} helperText={this.state.errorMessage.length
            ? this.state.errorMessage
            : ''} error={this.state.errorMessage.length > 0}/>
						</form>
					</core_1.DialogContent>
					<core_1.DialogActions>
						<core_1.Button onClick={function () { return _this.closeSearchDialog(); }} color='primary'>
							Cancel
						</core_1.Button>
						<core_1.Button onClick={function () { return _this.handleSearchDialogSubmit(); }} color='primary'>
							Find
						</core_1.Button>
					</core_1.DialogActions>
				</core_1.Dialog>
			</core_1.AppBar>);
    };
    return Header;
}(react_1.Component));
exports.default = react_router_dom_1.withRouter(Header);
//# sourceMappingURL=Header.js.map