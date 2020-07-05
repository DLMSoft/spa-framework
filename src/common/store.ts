import { createStore, combineReducers, applyMiddleware, Store, compose } from "redux";
import createSagaMiddleware from 'redux-saga';
import { call, put, cps, take, takeLatest, apply } from 'redux-saga/effects';
import { composeWithDevTools } from 'redux-devtools-extension';

const models = new Map<string, ReduxModel>();

export interface ReduxModel {
    namespace: string;
    reducers: Map<string, Function>;
    effects: [];
    state: any;
};

export interface BaseAction {
    type: string;
    
}

export function addModel(model: ReduxModel) {
    models[model.namespace] = model;
}

export function getStore(): Store {
    const allReducers = {};
    const allEffects = {};

    for (const namespace in models) {
        if (models.hasOwnProperty(namespace)) {
            const model:ReduxModel = models[namespace];

            const {reducers, effects, state: defaultState} = model;

            if (effects) {
                for (const efname in effects) {
                    if (effects.hasOwnProperty(efname)) {
                        const ef = effects[efname];
                        allEffects[`${namespace}/${efname}`] = ef;
                    }
                }
            }

            allReducers[namespace] = function(state = defaultState, action: BaseAction) {
                const type = action.type;

                const parts = type.split(/\//g);

                if (parts[0] != namespace)
                    return state;

                if (reducers == null)
                    return state;

                if (!reducers[parts[1]])
                    return state;

                return reducers[parts[1]](state, action);
            }
        }
    }

    const mainSaga = function*() {
        for (const pattern in allEffects) {
            if (allEffects.hasOwnProperty(pattern)) {
                const effect = allEffects[pattern];
                yield takeLatest(pattern, function*(action) {
                    yield* effect(action, { call, put, cps, take });
                });
            }
        }
    }

    const rootReducers = combineReducers(allReducers);

    const sagaMiddleware = createSagaMiddleware();

    const enchancer = composeWithDevTools(applyMiddleware(sagaMiddleware));

    const store = createStore(rootReducers, enchancer);

    sagaMiddleware.run(mainSaga);

    return store;
}