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
var Method;
(function (Method) {
    Method["GET"] = "GET";
    Method["POST"] = "POST";
    Method["PATCH"] = "PATCH";
    Method["DELETE"] = "DELETE";
})(Method || (Method = {}));
;
class RequestBuilder {
    constructor() {
        this.method = Method.GET;
        this.url = '';
        this.headers = {};
    }
    setMethod(method) {
        this.method = method;
        return this;
    }
    setURL(url) {
        this.url = url;
        return this;
    }
    setBody(body) {
        this.body = body;
        return this;
    }
    addHeader(key, value) {
        this.headers[key] = value;
        return this;
    }
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method: this.method,
                headers: this.headers,
            };
            if (this.body && this.method !== Method.GET) {
                options.body = JSON.stringify(this.body);
                this.addHeader('Content-Type', 'application/json');
            }
            ;
            try {
                const response = yield fetch(this.url, options);
                if (!response.ok) {
                    throw Error(`Error: ${response.status}`);
                }
                return response;
            }
            catch (err) {
                console.error(err);
            }
        });
    }
}
const request = new RequestBuilder()
    .setMethod(Method.POST)
    .setURL('https://example.com/api/data')
    .setBody({ key: 'value' })
    .addHeader('Authorization', 'Bearer token')
    .exec()
    .then(response => {
    if (response) {
        return response.json();
    }
})
    .then(data => console.log('Response data:', data))
    .catch(error => console.error('Request error:', error));
