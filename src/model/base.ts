export interface BaseResponse {
   
    code : string;

    criadoEm:string;

    atualizadoEm:string;

    apagadoEm : string;

    apagado : boolean;

}

export interface BaseRequest {

    code : string | null | undefined; 

}