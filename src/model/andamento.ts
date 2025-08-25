import { BaseRequest, BaseResponse } from "./base";
import { ProcessoResponse } from "./processo";

export interface AndamentoResponse extends BaseResponse {
    descricao : string;
    Processo : ProcessoResponse;
}

export interface AndamentoRequest extends BaseRequest {
    descricao : string;
    processoCode:string;
}
