import * as React from "react";
import styles from "./HelloWorld.module.scss";
import { IHelloWorldProps } from "./IHelloWorldProps";
import { escape } from "@microsoft/sp-lodash-subset";

import { EContactHeader } from "./EContactHeader";
import { ENameFormRow } from "./ENameFormRow";
import { EContactFormRow } from "./EContactFormRow";
import { Esignatories } from "./Esignatories";
import { AddressFormRow } from "./AddressFormRow";
import { TaxFormRow } from "./TaxFormRow";
import { ParentFormRow } from "./ParentFormRow";
import { CommentsTable } from "./CommentsTable";
import { DocumentsTable } from "./DocumentsTable";

const save_ico = require("../../../icons/NRD-00001_02013_ICO_Save cccccc_001.svg");
const delete_icon1 = require("../../../icons/NRD-00001_02013_ICO_Delete cccccc_001.svg");
const save_icon = require("../../../icons/NRD-00001_02013_ICO_Save ff6600_001.svg");
const delete_icon = require("../../../icons/NRD-00001_02013_ICO_Delete ff6600_001.svg");

export class EntityForm extends React.Component<{}, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.myform}>
        <ENameFormRow></ENameFormRow>
        <EContactFormRow></EContactFormRow>
        <Esignatories></Esignatories>
        <AddressFormRow></AddressFormRow>
        <TaxFormRow></TaxFormRow>
        <ParentFormRow></ParentFormRow>
        <CommentsTable></CommentsTable>
        <DocumentsTable></DocumentsTable>
      </div>
    );
  }
}
