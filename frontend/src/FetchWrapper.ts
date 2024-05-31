import config from "./config";

export type SupportedMethod =
  | "POST"
  | "post"
  | "GET"
  | "get"
  | "PATCH"
  | "patch";

export type Params = object;

export type Headers = object;

export type CommonProps = {
  method: SupportedMethod;
  url: string;
  headers?: Headers;
  params?: Params;
};

export type UpdateMethodProps<Data = object> = {
  data?: Data;
};

type AllRequestProps<Data = object> = CommonProps &
  Partial<UpdateMethodProps<Data>>;

export const CONTENT_TYPE_KEY = "Content-Type";

export const JSON_CONTENT_TYPE = "application/json";

class FetchWrapper {
  baseURL: string;
  commonHeaders?: Record<string, string> = {
    [CONTENT_TYPE_KEY]: JSON_CONTENT_TYPE,
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

  request = async <ExpectedResponse, Data = never>(
    props: AllRequestProps<Data>
  ): Promise<Awaited<ExpectedResponse>> => {
    return await this._request<ExpectedResponse, Data>(props);
  };

  _request = async <ExpectedResponse, Data>({
    method,
    url,
    data,
    params,
    headers,
  }: {
    method: SupportedMethod;
    url: string;
    data?: Data;
    params?: Params;
    headers?: object;
  }): Promise<Awaited<ExpectedResponse>> => {
    const _baseURL =
      this.baseURL[this.baseURL.length - 1] === "/"
        ? this.baseURL.slice(0, -1)
        : this.baseURL;
    const _url = url[0] === "/" ? url : "/" + url;

    const _params = new URLSearchParams("");
    if (params)
      Object.entries(params).forEach(([key, value]) => {
        if (typeof value === "string") _params.set(key, value);
        else if (value) {
          _params.set(key, JSON.stringify(value));
        }
      });
    const _headers = { ...this.commonHeaders, ...headers };

    Object.keys(_headers).forEach((key) => {
      if (_headers[key] === undefined) {
        delete _headers[key];
      }
    });

    const res = await fetch(
      `${_baseURL}${_url}${params ? "?" + _params.toString() : ""}`,
      {
        method,
        body:
          _headers[CONTENT_TYPE_KEY] === JSON_CONTENT_TYPE
            ? JSON.stringify(data)
            : (data as BodyInit),
        headers: _headers,
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

  post = async <ExpectedResponse, Data>(
    props: UpdateMethodProps<Data> & Omit<CommonProps, "method">
  ) => {
    return this.request<ExpectedResponse, Data>({
      ...props,
      method: "POST",
    });
  };

  patch = async <ExpectedResponse, Data>(
    props: UpdateMethodProps<Data> & Omit<CommonProps, "method">
  ) => {
    return this.request<ExpectedResponse, Data>({ ...props, method: "PATCH" });
  };

  get = async <ExpectedResponse>(
    url: string,
    params?: Params,
    headers?: Headers
  ) => {
    return this.request<ExpectedResponse, null>({
      method: "GET",
      url,
      params,
      headers,
    });
  };
}

export const Fetch = new FetchWrapper(config.BASE_URL);

export default Fetch;
