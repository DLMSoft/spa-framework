import { ClassType } from "react";

export function permission() {
    return function(target: any, perssionNodeName: string) {
        target.permissionNode = perssionNodeName;
    }
}