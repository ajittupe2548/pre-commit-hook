import React, { Component } from "react";
import { getThemeClasses } from "../utils";

export default class Second extends Component { 
    render() {
        return <div className={getThemeClasses(`neutral-100`)}>Second</div>;
    }
}
