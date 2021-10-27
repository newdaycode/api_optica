"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])(); //para que se quede escuchando en el puerto 3000

app.listen(4000);
console.log('server listen on port 4000');