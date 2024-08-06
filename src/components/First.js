import React from "react";
import { getThemeClasses } from "../utils";

function First() {
    return <div className={getThemeClasses(`color-teal`)}>First</div>;
}

export default First;
