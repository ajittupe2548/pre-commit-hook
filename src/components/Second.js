import React, { Component } from "react";
import { getThemeClasses } from "../utils";

const classes = getThemeClasses(`neutral-200;`);

export default class Second extends Component {
    render() {
        return <div className={classes}>Second</div>;
    }
}
