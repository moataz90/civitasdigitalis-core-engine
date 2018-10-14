import axios from "axios";


export enum APIList {
    detectName,
    detectAdress,
    getMainCategory
}


export class ApiHandler {


    public static analyseData(ApiName: APIList, payload?: string) {
        switch (ApiName) {
            case APIList.detectName: {
                return this.callWatsonAPI() ;
                break;
            }
            case APIList.detectName: {
                return this.callWatsonAPI() ;
                break;
            }
            case APIList.getMainCategory: {
                return this.callMainCategoryAPI() ;
                break;
            }
            default: {
                //statements; 
                break;
            }
        }
    }


    private static callWatsonAPI() {

        axios.post("https://gateway.watsonplatform.net/natural-language-understanding/api", { "text": "I still have a dream. It is a dream deeply rooted in the American dream. I have a dream that one day this nation will rise up and live out the true meaning of its creed: \"We hold these truths to be self-evident, that all men are created equal.\"" },
            {
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

    private static callMainCategoryAPI() {

        return {"data":["sport", "nature", "general"]};
        // axios.get("")
        //     .then(function (response) {
        //         return response;
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

    }

}