import React from "react";
import { getThemeClasses } from "../utils";

const iconWrapperClasses = getThemeClasses(`
    ${2 === 2 ? 'neutral-100' : 'neutral-200'};
    display-flex;
    border-color-neutral-100;
    justify-content-center;
    bg-neutral-100;
    align-items-center;
`);

function First() {
    return <div className={iconWrapperClasses}>First</div>;
}

export default First;
