import * as React from "react";
import styles from "./Tooltip.module.scss";

export interface ITooltipProps {
  title?: string;
  message: string;
}

export const Tooltip: React.FC<ITooltipProps> = ({ title, message }) => {
  return (
    <div
      className={title === "Error" ? styles.tootltipDown : styles.tootltipUp}
    >
      {title === "Error" && <span className={styles.arrow}></span>}

      {title && (
        <div className={styles.title}>
          {title}
          <div className={styles.space}></div>
        </div>
      )}
      <p>{message}</p>
    </div>
  );
};
