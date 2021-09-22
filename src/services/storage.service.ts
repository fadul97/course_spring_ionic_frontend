import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local_user";
import { STORAGE_KEYS } from "../config/storage_keys.config";


@Injectable()
export class StorageService{

    getLocalUser() : LocalUser{
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if(usr == null){
            return null;
        } else{
            if(usr.charAt(178) == ''){
                console.log(usr);
                usr = usr.slice(0, 178) + usr.slice(179);
                console.log(usr);
            }
            return JSON.parse(usr);
        }
    }

    setLocalUser(obj : LocalUser){
        if(obj == null){
            localStorage.removeItem(STORAGE_KEYS.localUser);
        } else{
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }
}