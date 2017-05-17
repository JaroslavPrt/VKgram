import { Action, ActionCreator } from 'redux';
import { Photo } from '../models/photos.model';

export const SET_DATA = 'SET_DATA';
export interface SetDataAction extends Action {
    title: string;
    photo: Photo;
}
export const setPhotoDetails: ActionCreator<SetDataAction> = (title, photo) => ({
    type: SET_DATA,
    title: title,
    photo: photo
});
