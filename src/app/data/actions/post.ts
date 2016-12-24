import { Journey } from '../models/journey.interface';
import { type } from '../util';
import { Action } from './';

export const ActionTypes = {
    ADD: type('[Post] Add')
};

export class AddAction implements Action {
    type = ActionTypes.ADD;

    constructor(public payload: Journey) { }
}

export type Actions = AddAction;
