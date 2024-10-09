"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
var RequestStatus;
(function (RequestStatus) {
    RequestStatus["Success"] = "Success";
    RequestStatus["Error"] = "Error";
})(RequestStatus || (RequestStatus = {}));
var Gender;
(function (Gender) {
    Gender["Female"] = "female";
    Gender["Male"] = "male";
})(Gender || (Gender = {}));
var BloodGroup;
(function (BloodGroup) {
    BloodGroup["A_Positive"] = "A+";
    BloodGroup["A_Negative"] = "A-";
    BloodGroup["B_Positive"] = "B+";
    BloodGroup["B_Negative"] = "B-";
    BloodGroup["AB_Positive"] = "AB+";
    BloodGroup["AB_Negative"] = "AB-";
    BloodGroup["O_Positive"] = "O+";
    BloodGroup["O_Negative"] = "O-";
})(BloodGroup || (BloodGroup = {}));
var Role;
(function (Role) {
    Role["Admin"] = "admin";
    Role["User"] = "user";
    Role["Moderator"] = "moderator";
})(Role || (Role = {}));
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get('https://dummyjson.com/users');
            return response.data.users;
        }
        catch (error) {
            console.log(RequestStatus.Error);
            throw error;
        }
    });
}
function getUserById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`https://dummyjson.com/users/${userId}`);
            return response.data;
        }
        catch (error) {
            console.log(RequestStatus.Error);
            throw error;
        }
    });
}
getUsers().then(user => {
    console.log(RequestStatus.Success);
    console.log(user);
});
getUserById(1).then(user => {
    console.log(RequestStatus.Success);
    console.log(user);
});
