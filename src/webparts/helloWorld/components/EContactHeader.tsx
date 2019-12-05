import * as React from "react";
import styles from "./HelloWorld.module.scss";
const toggle_ico = require("../../../icons/NRD-00001_02013_ICO_ToggleRight cccccc_001 (2).svg");

export interface IEContactHeaderProps {
  contactData: {
    save: any;
    save1: any;
    delete: any;
    delete1: any;
  };
}

export class EContactHeader extends React.Component<IEContactHeaderProps, {}> {
  constructor(props) {
    super(props);
  }

  state = {
    save: this.props.contactData.save,
    delete: this.props.contactData.delete
  };

  // this is triggered when mouse is moved over an icon
  iconOver = type => {
    switch (type) {
      case "save":
        this.setState({ save: this.props.contactData.save1 });
        break;
      case "delete":
        this.setState({ delete: this.props.contactData.delete1 });
        break;
      default:
        break;
    }
  };

  // this is triggered when mouse is moved off an icon
  iconOut = type => {
    switch (type) {
      case "save":
        this.setState({ save: this.props.contactData.save });
        break;
      case "delete":
        this.setState({ delete: this.props.contactData.delete });
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <div>
        <h5 className={styles.contactHeader}>Contact</h5>
        <div className={`${styles.row} ${styles.headerRow}`}>
          <div className={styles.flex3}>
            <img
              src={this.state.save as string}
              height="18px"
              width="18px"
              className={styles.saveicons}
              alt="saveicon"
              onMouseOver={() => this.iconOver("save")}
              onMouseOut={() => this.iconOut("save")}
            />
            <img
              src={this.state.delete as string}
              height="18px"
              width="18px"
              alt="deleteicon"
              className={styles.saveicons}
              onMouseOver={() => this.iconOver("delete")}
              onMouseOut={() => this.iconOut("delete")}
            />
          </div>
          <div className={`${styles.flex3} ${styles.toggleContainer}`}>
            <span className={styles.togglespan}>Individuals</span>
            <img
              src={toggle_ico as string}
              height="12px"
              width="25px"
              className={styles.toggleIcon}
              alt="toggleicon"
              // onClick={this.toggleForms}
            />
            <span className={styles.togglespan}>Entities</span>
          </div>
          <div className={styles.flex7}></div>
        </div>
      </div>
    );
  }
}
