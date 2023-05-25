import { Injectable } from "@angular/core";

export interface Menu{
    state:string;
    name:string;
    icon:string;
    role:string;
}

const MENUITEM = [
    {state:'dashboard', name:'Dashboard', icon:'dashboard', role:''},
    {state:'category',name:'Manage Category', icon:'category',role:'admin'},
    {state:'product', name:'Manage Product', icon:'inventory', role:'admin'},
    {state:'order', name:'Manage Order', icon:'list_lt', role:''},
    {state:'bill', name:'View Bill', icon:'import_contacts', role:''},
    {state:'user', name:'view-user', icon:'people', role:'admin'}
];

@Injectable()
export class MenuItems{
    getMenuitem(): Menu[]{
        return MENUITEM
    }
}