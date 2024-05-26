import config from "./config";

export type SupportedMethod =
  | "POST"
  | "post"
  | "GET"
  | "get"
  | "PATCH"
  | "patch";

export type Params = object;
class FetchWrapper {
  baseURL: string;
  commonHeaders?: Record<string, string> = {
    "Content-Type": "application/json",
  };

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  setCommonHeaders = (headers: Record<string, string | undefined>) => {
    const newHeaders = { ...this.commonHeaders, ...headers };
    Object.keys(newHeaders).forEach((key) => {
      if (newHeaders[key] === undefined) {
        delete newHeaders[key];
      }
    });
    this.commonHeaders = newHeaders as Record<string, string>;
  };

  request = async <ExpectedResponse, Data = never>({
    method,
    url,
    data,
    params,
  }: {
    method: SupportedMethod;
    url: string;
    data?: Data;
    params?: Params;
  }): Promise<Awaited<ExpectedResponse>> => {
    return await this._request<ExpectedResponse, Data>({
      method,
      url,
      data,
      params,
    });
  };

  _request = async <ExpectedResponse, Data>({
    method,
    url,
    data,
    params,
  }: {
    method: SupportedMethod;
    url: string;
    data?: Data;
    params?: Params;
  }): Promise<Awaited<ExpectedResponse>> => {
    const _baseURL =
      this.baseURL[this.baseURL.length - 1] === "/"
        ? this.baseURL.slice(0, -1)
        : this.baseURL;
    const _url = url[0] === "/" ? url : "/" + url;

    const _params = new URLSearchParams("");
    if (params)
      Object.entries(params).forEach(([key, value]) => {
        _params.set(key, value);
      });
    const res = await fetch(
      `${_baseURL}${_url}${params ? "?" + _params.toString() : ""}`,
      {
        method,
        body: JSON.stringify(data),
        headers: { ...this.commonHeaders },
      }
    );
    if (res.status >= 400) {
      const json = await res.json();
      throw {
        status: res.status,
        message:
          json.message ??
          (res as unknown as { message: string }).message ??
          res.statusText,
      };
    }
    if (res.headers.get("content-length") !== "0") return res.json();
    return {} as Awaited<ExpectedResponse>;
  };

  post = async <ExpectedResponse, Data>({
    url,
    data,
  }: {
    url: string;
    data?: Data;
  }) => {
    return this.request<ExpectedResponse, Data>({ method: "POST", url, data });
  };

  patch = async <ExpectedResponse, Data>({
    url,
    data,
  }: {
    url: string;
    data?: Data;
  }) => {
    return this.request<ExpectedResponse, Data>({ method: "PATCH", url, data });
  };

  get = async <ExpectedResponse>(url: string, params?: Params) => {
    return this.request<ExpectedResponse, null>({
      method: "GET",
      url,
      params,
    });
  };
}

export const Fetch = new FetchWrapper(config.BASE_URL);

export default Fetch;
