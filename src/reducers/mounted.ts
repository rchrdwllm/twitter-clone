import { Reducer } from "react";
import { AnyAction } from "redux";

export const mounted: Reducer<Boolean, AnyAction> = (state = false, action) => {
    switch (action.type) {
        case "MOUNT_COMPONENT":
            if (!action.payload.isMounted) return false;

            return true;
        default:
            return state;
    }
};
