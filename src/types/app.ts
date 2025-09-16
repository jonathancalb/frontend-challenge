import { APP_VIEWS } from '../constants';
import { IRIS_MODES } from '../sections/iris/constants';

export type AppView = typeof APP_VIEWS[keyof typeof APP_VIEWS];
export type IrisMode = typeof IRIS_MODES[keyof typeof IRIS_MODES];
