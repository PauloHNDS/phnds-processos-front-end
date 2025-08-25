import { Routes } from '@angular/router';
import { Auth } from '../components/auth/auth';
import { ListaProcesso } from '../components/lista-processo/lista-processo';
import { NovoProcesso } from '../components/novo-processo/novo-processo';

export const routes: Routes = [
    {
        path:'',
        component:ListaProcesso
    },
    {
        path:'novo',
        component:NovoProcesso
    },
    {
        path:'vizualizar/:code',
        component:NovoProcesso
    },
    {
        path:'login',
        component: Auth
    },
];
