import {
    filter,
    flatMap,
    switchMap,
    catchError,
    retry,
    takeUntil
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import {updateRecords} from '../actions/recordActions';
import { SLIDER_CHANGE, STOP_RECORDS} from '../actions/types';

const API_HOST = `/api/records?date=:date`;

export const recordsEpic = function (action$) {
    return action$.pipe(
        filter(action => action.type === SLIDER_CHANGE),
        switchMap(action => {
            const response$ = ajax.getJSON(API_HOST.replace(':date', action.payload));
            return response$.pipe(
                flatMap(response => {
                    return of(
                        updateRecords(response),
                    );
                }),
                takeUntil(action$.pipe(
                    filter(action => action.type === STOP_RECORDS)
                )),
                retry(2),
                catchError(error => {
                    return of(
                        updateRecords({})
                    );
                })
            );
        })
    );
}
