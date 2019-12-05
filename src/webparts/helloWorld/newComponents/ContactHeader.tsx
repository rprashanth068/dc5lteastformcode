import * as React from "react";
import styles from "./HelloWorld.module.scss";
const individual = require("../../../icons/NRD-00001_02013_ICO_ToggleLeft cccccc_001.svg");
const entity = require("../../../icons/NRD-00001_02013_ICO_ToggleRight cccccc_001 (2).svg");


export interface IContactHeaderProps {
    contactData: {
      save: any;
      save1: any;
      deletee: any;
      delete1: any;
      formType: string;
      formChange: (formType) => void;
    }
  };

export const ContactHeader: React.FC<IContactHeaderProps> = ({ contactData }) => {
    //hooks
    const [save, setSave] = React.useState(contactData.save);
    const [deletee, setDelete] = React.useState(contactData.deletee);
    const [formIcon, setFormIcon] = React.useState(individual);
    const [formType] = (contactData.formType);


  // this is triggered when mouse is moved over an icon
 const iconOver = type => {
    switch (type) {
      case "save":
        setSave(contactData.save1);
        break;
      case "delete":
        setDelete(contactData.delete1);
        break;
      default:
        break;
    }
  };


  // this is triggered when mouse is moved off an icon
 const iconOut = type => {
    switch (type) {
      case "save":
        setSave(contactData.save);
        break;
      case "delete":
        setDelete(contactData.deletee);
        break;
      default:
        break;
    }
  };

  const   // this method will toggle between forms
  toggleForm = form => {
    const formIcon = form === 'individual' ? entity: individual;
    const formType = form === 'individual' ? 'entity': 'individual';
    contactData.formChange(formType);
    setFormIcon(formIcon);
    contactData.formChange(formType)
  }

return (
        <div>
             <h5 className={styles.contactHeader}>Contact</h5>
        <div className={`${styles.row} ${styles.headerRow}`}>
          <div className={styles.flex3}>
            <img
              src={save as string}
              height="18px"
              width="18px"
              className={styles.saveicons}
              alt="saveicon"
              onMouseOver={() => iconOver("save")}
              onMouseOut={() => iconOut("save")}
            />
            <img
              src={deletee as string}
              height="18px"
              width="18px"
              alt="deleteicon"
              className={styles.saveicons}
              onMouseOver={() => iconOver("delete")}
              onMouseOut={() => iconOut("delete")}
            />
          </div>
          <div className={`${styles.flex3} ${styles.toggleContainer}`}>
            <span className={styles.togglespan}>Individuals</span>
            <img
              src={formIcon as string}
              height="12px"
              width="25px"
              className={styles.toggleIcon}
              alt="toggleicon"
              onClick={() => toggleForm(formType)}
            />
            <span className={styles.togglespan}>Entities</span>
          </div>
          <div className={styles.flex7}></div>
        </div>

        </div>
    );
}
