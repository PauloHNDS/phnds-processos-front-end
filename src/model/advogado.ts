import { BaseRequest, BaseResponse } from "./base";
import { ParteReponse } from "./parte";

export interface AdvogadoRequest extends BaseRequest {
    nome:string;
    oab:string;
    email:string;
    celular:string;
}
export interface advogadoResponse extends BaseResponse{
    code:string;
    nome:string;
    oab:string;
    email:string;
    celular:string;
    parte:ParteReponse;
}