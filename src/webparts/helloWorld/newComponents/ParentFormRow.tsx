import * as React from "react";
import { Typeahead } from "react-typeahead";
import styles from "../../helloWorld/components/HelloWorld.module.scss";

export interface IParentFormRowProps {}

export const ParentFormRow: React.FC<IParentFormRowProps> = ({}) => {
  return (
    <div>
      <h5 className={styles.formHeading}>Parent (Individual or Entity)</h5>
      <div className={`${styles.row} ${styles.parentRow}`}>
        <div className={styles.flex7}>
          <div
            className={`${styles["type-Ahead"]} ${styles["typeaheadwidth"]}`}
          >
            <Typeahead
              options={["John", "Paul", "George", "Ringo"]}
              maxVisible={2}
            />
          </div>
        </div>
        <div className={`${styles.flex2} ${styles["usericon-align"]}}`}>
          <i className="fas fa-user"></i>
        </div>
        <div className={styles.flex3}></div>
      </div>
      <hr className={styles.horizontalSeparator} />
    </div>
  );
};
