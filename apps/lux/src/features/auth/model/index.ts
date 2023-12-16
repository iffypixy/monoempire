import {slice} from "./slice";
import * as selectors from "./selectors";
import * as hooks from "./hooks";

export const model = {...hooks, slice, selectors};
