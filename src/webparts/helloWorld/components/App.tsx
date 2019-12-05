import * as React from "react";
import styles from "./HelloWorld.module.scss";
import {MyForm} from "./MyForm";
import {EntityForm} from "./EntityForm";

export default class App  extends React.Component<{}, {}> {
 public render() {
     return(
     <div className={styles.myform}>
     <MyForm></MyForm>,
     <EntityForm></EntityForm>
   </div>
 );
}
}