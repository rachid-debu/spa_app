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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
require("../App.css");
var core_1 = require("@material-ui/core");
var petService_1 = __importDefault(require("../services/petService"));
var Header_1 = __importDefault(require("./Header"));
var PetForm = /** @class */ (function (_super) {
    __extends(PetForm, _super);
    function PetForm(props) {
        var _this = _super.call(this, props) || this;
        // Initially pet is undefined and we determine if we're on edit or creation mode
        _this.state = {
            pet: {
                rfid: '',
                species: '',
                race: '',
                height: 0,
                weight: 0,
                description: '',
                entryDate: new Date(),
                birthDate: new Date()
            },
            rfid: props.match.params.rfid ? props.match.params.rfid : '',
            // if we have an rfid, it's edit else it's create
            edit: props.match.params.rfid !== undefined ? true : false,
            // by default no errors yet
            errors: {}
        };
        return _this;
    }
    PetForm.prototype.onSubmit = function (event) {
        var _this = this;
        // prevent default page refresh/redirect
        event.preventDefault();
        // send the form Edit or Save
        if (this.state.edit) {
            // mode is Edit
            petService_1.default.editPet(this.state.pet)
                .then(function (res) {
                // if something went wrong res.errors contains informations
                if (res.hasOwnProperty('errors') && res.errors) {
                    // we 'temp' errors so we can display them all at once
                    var errorsTemp = {};
                    for (var key in res.errors) {
                        var message = res.errors[key].message;
                        errorsTemp[key] = message;
                    }
                    // add errors to state
                    _this.setState({ errors: errorsTemp });
                }
                else {
                    // if we success we redirect to home
                    _this.props.history.push('/');
                }
            })
                .catch(function (error) {
                // UNEXPECTED ! we display an obnoxious alert
                alert('An error occured with the server, please contact customer support.');
            });
        }
        else {
            // mode is Save
            petService_1.default.addPet(this.state.pet)
                .then(function (res) {
                // if something went wrong res.errors contains informations
                if (res.hasOwnProperty('errors') && res.errors) {
                    // we 'temp' errors so we can display them all at once
                    var errorsTemp = {};
                    for (var key in res.errors) {
                        var message = res.errors[key].message;
                        errorsTemp[key] = message;
                    }
                    // add errors to state
                    _this.setState({ errors: errorsTemp });
                }
                else {
                    // if we success we redirect to home
                    _this.props.history.push('/');
                }
            })
                .catch(function (error) {
                // UNEXPECTED ! we display an obnoxious alert
                alert('An error occured with the server, please contact customer support.');
            });
        }
    };
    PetForm.prototype.onChange = function (event) {
        var target = event.target;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var name = target.name;
        // add the value to the pet state
        this.setState(function (prevState) {
            var _a;
            return ({
                pet: __assign({}, prevState.pet, (_a = {}, _a[name] = value, _a))
            });
        });
    };
    PetForm.prototype.componentDidMount = function () {
        var _this = this;
        // If it's edit mode we have an rfid
        if (this.state.edit) {
            // we fetch the pet
            petService_1.default.fetchPet(this.state.rfid)
                .then(function (data) {
                console.log('fetchPet data received from backend', data);
                _this.setState({ pet: data });
            })
                .catch(function (error) {
                console.log('fetchPet error received from backend', error);
                _this.props.history.push('/details');
            });
        }
    };
    PetForm.prototype.render = function () {
        var _this = this;
        // shorten variable names
        var rfid = this.state.rfid;
        var pet = this.state.pet;
        var edit = this.state.edit;
        // If we have an RFID but not yet fetched the PET
        if (!pet.rfid.length && rfid.length) {
            // We display a loader
            return <core_1.CircularProgress className='absolute-center'/>;
        }
        return (<react_1.default.Fragment>
				<Header_1.default isHome={false}/>
				<core_1.Grid container direction='column' spacing={0} alignItems='center'>
					<form onSubmit={function (event) { return _this.onSubmit(event); }}>
						<core_1.TextField label='RFID chip number' type='text' id='rfid' name='rfid' autoFocus margin='normal' fullWidth value={pet.rfid} onChange={function (event) { return _this.onChange(event); }} helperText={this.state.errors.rfid} error={this.state.errors.rfid !== undefined}/>
						<core_1.TextField label='Species' type='text' id='species' name='species' margin='normal' fullWidth value={pet.species} onChange={function (event) { return _this.onChange(event); }} helperText={this.state.errors.species} error={this.state.errors.species !== undefined}/>
						<core_1.TextField label='Race' type='text' id='race' name='race' margin='normal' fullWidth value={pet.race} onChange={function (event) { return _this.onChange(event); }} helperText={this.state.errors.race} error={this.state.errors.race !== undefined}/>
						<core_1.TextField multiline rowsMax='4' label='Description' id='description' name='description' margin='normal' fullWidth value={pet.description} onChange={function (event) { return _this.onChange(event); }} helperText={this.state.errors.description} error={this.state.errors.description !== undefined}/>
						<core_1.TextField label='Height' type='text' id='height' name='height' margin='normal' fullWidth value={pet.height.toString()} onChange={function (event) { return _this.onChange(event); }} helperText={this.state.errors.height} error={this.state.errors.height !== undefined}/>
						<core_1.TextField label='Weight' type='text' id='weight' name='weight' margin='normal' fullWidth value={pet.weight.toString()} onChange={function (event) { return _this.onChange(event); }} helperText={this.state.errors.weight} error={this.state.errors.weight !== undefined}/>
						<core_1.TextField label='Entry date' type='date' id='entryDate' name='entryDate' margin='normal' fullWidth defaultValue={new Date(pet.entryDate)
            .toISOString()
            .substr(0, 10)} onChange={function (event) { return _this.onChange(event); }} helperText={this.state.errors.entryDate} error={this.state.errors.entryDate !== undefined}/>
						<core_1.TextField label='Birth date' type='date' id='birthDate' name='birthDate' margin='normal' fullWidth defaultValue={new Date(pet.birthDate)
            .toISOString()
            .substr(0, 10)} onChange={function (event) { return _this.onChange(event); }} helperText={this.state.errors.birthDate} error={this.state.errors.birthDate !== undefined}/>
						<core_1.Button type='submit' color='primary' variant='contained'>
							{edit ? 'Edit' : 'Save'}
						</core_1.Button>
					</form>
				</core_1.Grid>
			</react_1.default.Fragment>);
    };
    return PetForm;
}(react_1.Component));
exports.default = PetForm;
//# sourceMappingURL=PetForm.js.map