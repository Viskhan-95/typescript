enum Method{
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
};

export class RequestBuilder {
    private method: Method = Method.GET;
    private url: string = '';
    private body: any = null;
    private headers: Record<string, string> = {}

    public setMethod(method: Method): RequestBuilder {
        this.method = method;
        return this;
    }

    public setURL(url: string): RequestBuilder {
        this.url = url;
        return this;
    }

    public setBody(body: any): RequestBuilder {
        this.body = body;
        return this;
    }

    public addHeader(key: string, value: string): RequestBuilder {
        this.headers[key] = value;
        return this;
    }

    public async getProduct(id: number): Promise<Response | undefined> {
        const options: RequestInit = {
            method: this.method,
            headers: this.headers,
        };

        if(this.body && this.method !== Method.GET) {
            options.body = JSON.stringify(this.body);
            this.addHeader('Content-Type', 'application/json');
        };

        try {
            const response = await fetch(`${this.url}/${id}`, options);
            if(!response.ok) {
                throw Error(`Error: ${response.status}`);
            }
            return response;
        } catch (err) {
            console.error(err);
        }
    }
}