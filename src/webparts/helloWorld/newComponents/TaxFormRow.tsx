import * as React from "react";

import styles from "../../helloWorld/components/HelloWorld.module.scss";

export interface ITaxFormRowProps {}

export const TaxFormRow: React.FC<ITaxFormRowProps> = ({}) => {
  return (
    <div>
      <h5 className={styles.formHeading}>Tax Number </h5>
      <div className={` ${styles.row} ${styles.taxRow}`}>
        <div className={styles.flex1}>
          <div className={`${styles["ms-TextField"]}`}>
            <label
              className={styles["ms-Label"]}
              htmlFor="formGroupExampleInput"
            >
              GST#
            </label>
            <input
              type="text"
              className={styles["ms-TextField-field"]}
              id="formGroupExampleInput"
              placeholder=" "
              maxLength={17}
            />
          </div>
        </div>
        <div className={styles.flex1}>
          <div className={`${styles["ms-TextField"]}`}>
            <label
              className={styles["ms-Label"]}
              htmlFor="formGroupExampleInput"
            >
              HST#
            </label>
            <input
              type="text"
              className={styles["ms-TextField-field"]}
              id="formGroupExampleInput"
              placeholder=" "
              maxLength={17}
            />
          </div>
        </div>
        <div className={styles.flex1}>
          <div className={`${styles["ms-TextField"]}`}>
            <label
              className={styles["ms-Label"]}
              htmlFor="formGroupExampleInput"
            >
              PST#
            </label>
            <input
              type="text"
              className={styles["ms-TextField-field"]}
              id="formGroupExampleInput"
              placeholder=" "
              maxLength={8}
            />
          </div>
        </div>
        <div className={styles.flex1}>
          <div className={`${styles["ms-TextField"]}`}>
            <label
              className={styles["ms-Label"]}
              htmlFor="formGroupExampleInput"
            >
              QST#
            </label>
            <input
              type="text"
              className={styles["ms-TextField-field"]}
              id="formGroupExampleInput"
              placeholder=" "
              maxLength={15}
            />
          </div>
        </div>
        <div className={styles.flex2}></div>
      </div>
      <hr className={styles.horizontalSeparator} />
    </div>
  );
};
