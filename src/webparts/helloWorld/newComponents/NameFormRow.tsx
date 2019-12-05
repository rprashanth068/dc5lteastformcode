import * as React from "react";

import styles from "../../helloWorld/components/HelloWorld.module.scss";

export interface INameFormRowProps {}

export const NameFormRow: React.FC<INameFormRowProps> = ({}) => {
  return (
    <div>
      <div className={styles.namemargin}></div>
      <h5 className={styles.formHeading}>Name</h5>
      <div className={styles.deceasedCheckBox}>
        <span>
          <label className={`${styles.labelposition} `} htmlFor="gridCheck">
            Deceased
          </label>
          <input
            className={styles["form-check-input"]}
            type="checkbox"
            id="gridCheck"
          />
        </span>
      </div>
      <div className={`${styles.row} ${styles.namesRow}`}>
        <div className={`${styles.flex2} ${styles.contactColSize}`}>
          <div className={styles["ms-TextField"]}>
            <label
              className={styles["ms-Label"]}
              htmlFor="formGroupExampleInput"
            >
              {" "}
              First Name <span className={styles.required}> *</span>
            </label>
            <input
              type="text"
              className={styles["ms-TextField-field"]}
              id="formGroupExampleInput"
              placeholder=" "
            />
          </div>
        </div>
        <div className={`${styles.flex2} ${styles.contactColSize}`}>
          <div className={styles["ms-TextField"]}>
            <label
              className={styles["ms-Label"]}
              htmlFor="formGroupExampleInput"
            >
              Middle Name
            </label>
            <input
              type="text"
              className={styles["ms-TextField-field"]}
              id="formGroupExampleInput"
              placeholder=" "
            />
          </div>
        </div>
        <div className={`${styles.flex2} ${styles.contactColSize}`}>
          <div className={styles["ms-TextField"]}>
            <label
              className={styles["ms-Label"]}
              htmlFor="formGroupExampleInput"
            >
              Last Name <span className={styles.required}> *</span>
            </label>
            <input
              type="text"
              className={styles["ms-TextField-field"]}
              id="formGroupExampleInput"
              placeholder=" "
            />
          </div>
        </div>
        <div className={styles.flex3}>
          <div className={styles["ms-TextField"]}>
            <label
              className={styles["ms-Label"]}
              htmlFor="formGroupExampleInput"
            >
              Preferred Name
            </label>
            <input
              type="text"
              className={styles["ms-TextField-field"]}
              id="formGroupExampleInput"
              placeholder=" "
            />
          </div>
        </div>
      </div>
      <hr className={styles.horizontalSeparator} />
    </div>
  );
};
