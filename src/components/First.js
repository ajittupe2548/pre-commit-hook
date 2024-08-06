import React from "react";
import { getThemeClasses } from "../utils";

const iconWrapperClasses = getThemeClasses(`
    neutral-200;
    display-flex;
    border-color-neutral-200;
    justify-content-center;
    bg-neutral-200;
    align-items-center;
`);

function First() {
    return <div className={iconWrapperClasses}>First</div>;
}

export default First;
