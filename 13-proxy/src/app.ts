import { RequestBuilder } from "./api.js";


const apiProxy = new Proxy(new RequestBuilder(), {
    get(target, prop, receiver) {
        
        if (prop === "getProduct") {
            return async (id: number): Promise<any> => {
                if (id > 10) {
                    throw new Error('ID не должно быть больше 10');
                }
                return Reflect.get(target, prop, receiver).call(target, id);
            };
        }
        return Reflect.get(target, prop, receiver);
    }
});
  

(async () => {
    try {
        const product = await apiProxy
        .setURL('https://dummyjson.com/products')
        .getProduct(5); 
        console.log("Product:", product);
    } catch (err) {
        console.error("Error:", err);
    }
  
    try {
        const product = await apiProxy
        .setURL('https://dummyjson.com/products')
        .getProduct(15);
        console.log("Product:", product);
    } catch (err) {
        console.error("Error:", err);
    }
})();