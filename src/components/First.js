import React from "react";
import { getThemeClasses } from "../utils";

const iconWrapperClasses = getThemeClasses(`
    neutral-100;
    display-flex;
    border-color-blue;
    justify-content-center;
    bg-blue;
    align-items-center;
`);

function First() {
    return <div className={iconWrapperClasses}>First</div>;
}

export default First;
