import { Action } from 'redux';

import { IAppState } from './IAppState';
import * as Actions from './app.actions';
import { Photo } from '../models/photos.model';

export const INITIAL_STATE: IAppState = {
    title: '',
    photo: new Photo()
};

export function rootReduser(state: IAppState, action: Action): IAppState {
    switch (action.type) {
        case Actions.SET_DATA:
            const details = <Actions.SetDataAction> action;
            return Object.assign({}, { title: details.title, photo: details.photo });
        default:
            return state;
    }
}
