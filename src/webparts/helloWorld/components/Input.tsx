import * as React from "react";
import styles from "./Tooltip.module.scss";
import { Tooltip } from "./Tooltip";
import { validation } from "./validation";

export interface IInputProps {
  title?: string;
  message?: string;
  validationSchema?: {};
  name?: string;
  type?: string;
  id?: string;
  tooltipDesc?: string;
  onblure?: Function;
  onmouseEnter?: Function;
  onmouseLeave?: Function;
  onfocus?: Function;
  onchange?: Function;
}

export class Input extends React.Component<IInputProps, {}> {
  constructor(props) {
    super(props);
  }
  project: HTMLInputElement;

  state = {
    // validation error
    errors: {},
    // Tooltip
    dispalyError: false,
    displayDescription: false
  };
  render() {
    return (
      <>
        <input
          type={this.props.type}
          // Tooltip settings
          name={this.props.name}
          onMouseEnter={() => {
            this.props.onmouseEnter();
          }}
          onMouseLeave={() => {
            this.props.onmouseLeave();
          }}
          onBlur={e => {
            this.props.onblure(e);
          }}
          onFocus={e => {
            this.props.onfocus(e);
          }}
          onChange={e => {
            this.props.onchange(e);
          }}
          // ----------------
          style={
            this.state.errors[this.props.name]
              ? { border: "1px solid red" }
              : { border: "1px solid black" }
          }
          className={styles["ms-TextField-field"]}
          id={this.props.id}
          placeholder=" "
          ref={c => (this.project = c)}
        />
        {/* Error Tooltip */}
        {this.state.dispalyError && (
          <Tooltip
            message={this.state.errors[(this, this.props.name)]}
            title={"Error"}
          />
        )}
        {/* Description Tooltip */}
        {this.state.displayDescription && (
          <Tooltip message={this.props.tooltipDesc} />
        )}
      </>
    );
  }
}
