import { AndamentoResponse } from "./andamento";
import { BaseRequest, BaseResponse } from "./base";
import { ParteReponse } from "./parte";

export interface ProcessoResponse extends BaseResponse {
    numeroProcesso:string;
    classe:string;
    assunto:string;
    juiz:string;
    vara:string;
    inicioProcesso:string;
    estado:string;
    andamentos:AndamentoResponse[];
    partes: ParteReponse[]
}

export interface ProcessoRequest extends BaseRequest {
    numeroProcesso:string;
    classe:string;
    assunto:string;
    juiz:string;
    vara:string;
    inicioProcesso:string;
    estado:string;
}