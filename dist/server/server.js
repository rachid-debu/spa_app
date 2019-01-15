"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = __importDefault(require("body-parser"));
var config_1 = require("./config");
var PetRouter_1 = require("./routes/api/PetRouter");
// Init express app
var app = express_1.default();
// Connect to Database
mongoose_1.default
    .connect(config_1.config.databaseURI, { useNewUrlParser: true })
    .then(function () { return console.log('Connected to DB'); });
// BodyParser middleware
app.use(body_parser_1.default.json());
// Pet routes
app.use('/api/pets', PetRouter_1.PetRouter);
// Listen port
app.listen(config_1.config.expressPort, function () {
    return console.log('Application listen on port ' + config_1.config.expressPort);
});
//# sourceMappingURL=server.js.map