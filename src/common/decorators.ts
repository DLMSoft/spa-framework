import { ClassType } from "react";

export function permission(perssionNodeName: string) {
    return function(target: any) {
        target.permissionNode = perssionNodeName;
    }
}