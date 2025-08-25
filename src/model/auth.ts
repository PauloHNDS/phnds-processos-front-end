export interface AuthRequest {
    email : string
    senha : string
}
export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    usuarioCode: string;
    usuarioNome: string;
    usuarioTipo: string; 
    expiration: string;
}