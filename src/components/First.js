import React from "react";
import { getThemeClasses } from "../utils";

const iconWrapperClasses = getThemeClasses(`
    ${2 === 2 ? 'bg-teal-light' : 'bg-teal'};
    display-flex;
    border-color-red;
    justify-content-center;
    bg-red;
    align-items-center;
`);

function First() {
    return <div className={iconWrapperClasses}>First</div>;
}

export default First;
