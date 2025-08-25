import { advogadoResponse } from "./advogado";
import { BaseRequest, BaseResponse } from "./base";
import { ProcessoResponse } from "./processo";

export interface ParteReponse extends BaseResponse {
    nome:string;
    tipo:ParteTipoEnum;
    processo: ProcessoResponse;
    advogado : advogadoResponse;
}
export interface ParteResquest extends BaseRequest {
    nome:string;
    tipo:ParteTipoEnum;
    processoCode:string;
    advogadoCode:string;
}
export enum ParteTipoEnum {
    Autor = 1,
    Reu = 2,
}