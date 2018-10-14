"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
var APIList;
(function (APIList) {
    APIList[APIList["detectName"] = 0] = "detectName";
    APIList[APIList["detectAdress"] = 1] = "detectAdress";
    APIList[APIList["getMainCategory"] = 2] = "getMainCategory";
})(APIList = exports.APIList || (exports.APIList = {}));
class ApiHandler {
    static analyseData(ApiName, payload) {
        switch (ApiName) {
            case APIList.detectName: {
                return this.callWatsonAPI();
                break;
            }
            case APIList.detectName: {
                return this.callWatsonAPI();
                break;
            }
            case APIList.getMainCategory: {
                return this.callMainCategoryAPI();
                break;
            }
            default: {
                //statements; 
                break;
            }
        }
    }
    static callWatsonAPI() {
        axios_1.default.post("https://gateway.watsonplatform.net/natural-language-understanding/api", { "text": "I still have a dream. It is a dream deeply rooted in the American dream. I have a dream that one day this nation will rise up and live out the true meaning of its creed: \"We hold these truths to be self-evident, that all men are created equal.\"" }, {
            auth: {
                username: "0c2124e9-e57d-46b0-84a7-a66f4e8a0d08",
                password: "gpcKGnTVlv0U"
            }
        })
            .then(function (response) {
            return response;
        })
            .catch(function (error) {
            console.log(error);
        });
    }
    static callMainCategoryAPI() {
        return { "data": ["sport", "nature", "general"] };
        // axios.get("")
        //     .then(function (response) {
        //         return response;
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    }
}
exports.ApiHandler = ApiHandler;
//# sourceMappingURL=apiHandler.js.map