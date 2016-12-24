import { AngularFire } from 'angularfire2';
import * as post from '../actions/post';
import { Journey } from '../models/journey.interface';

/**
 * This constant is the reducer that holds the actions that can be performed on blog posts.
 */
export const reducer = {
    [post.ActionTypes.ADD]: addPlan
};

/**
 * Adds a post to the store. 
 */
function addPlan(payload: Journey, afRefs: {af: AngularFire, uid: string}) {
    // afRefs.af.database.list(`/users/${afRefs.uid}/events`).push(payload);
}
