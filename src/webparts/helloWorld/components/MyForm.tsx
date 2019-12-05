import * as React from "react";
import styles from "./HelloWorld.module.scss";
import { IHelloWorldProps } from "./IHelloWorldProps";
import { escape } from "@microsoft/sp-lodash-subset";

const save_ico = require("../../../icons/NRD-00001_02013_ICO_Save cccccc_001.svg");
const delete_icon1 = require("../../../icons/NRD-00001_02013_ICO_Delete cccccc_001.svg");
const save_icon = require("../../../icons/NRD-00001_02013_ICO_Save ff6600_001.svg");
const delete_icon = require("../../../icons/NRD-00001_02013_ICO_Delete ff6600_001.svg");

import { ContactHeader } from "../newComponents/ContactHeader";
import { NameFormRow } from "../newComponents/NameFormRow";
import { ContactFormRow } from "../newComponents/ContactFormRow";
import { AddressFormRow } from "../newComponents/AddressFormRow";
import { TaxFormRow } from "../newComponents/TaxFormRow";
import { ParentFormRow } from "../newComponents/ParentFormRow";
import { CommentsTable } from "../newComponents/CommentsTable";
import { DocumentsTable } from "../newComponents/DocumentsTable";

export class MyForm extends React.Component<{}, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.myform}>
        <NameFormRow></NameFormRow>
        <ContactFormRow></ContactFormRow>
        <AddressFormRow></AddressFormRow>
        <TaxFormRow></TaxFormRow>
        <ParentFormRow></ParentFormRow>
        <CommentsTable></CommentsTable>
        <DocumentsTable></DocumentsTable>
      </div>
    );
  }
}

// state = {
//   states: state,
//   countries: country,
//   save: save_ico,
//   edit: edit_ico,
//   edit2: edit_ico,
//   delete: delete_ico,
//   plus: plus_ico,
//   delete1: delete_icon1,
//   delete2: delete_ico,
//   delete3: delete_ico,
//   comments: comments,
//   documents: documents,
//   selectedComment: {},
//   selectedDocument: {},
//   tDocuments: [],
//   selected: [],
//   selectedCountry: 0,
//   activeForm: 0
// };

// refe2;
// refe1;

// iconOver = type => {
//   switch (type) {
//     case "save":
//       this.setState({ save: save_icon });
//       break;
//     case "edit":
//       this.setState({ edit: edit_icon });
//       break;
//     case "edit2":
//       this.setState({ edit2: edit_icon });
//       break;
//     case "delete":
//       this.setState({ delete: delete_icon });
//       break;
//     case "plus":
//       this.setState({ plus: plus_icon });
//       break;
//     case "delete1":
//       this.setState({ delete1: delete_icon });
//       break;
//     case "delete2":
//       this.setState({ delete2: delete_icon });
//       break;
//     case "delete3":
//       this.setState({ delete3: delete_icon });
//       break;
//     default:
//       break;
//   }
// };

// iconOut = type => {
//   switch (type) {
//     case "save":
//       this.setState({ save: save_ico });
//       break;
//     case "edit":
//       this.setState({ edit: edit_ico });
//       break;
//     case "edit2":
//       this.setState({ edit2: edit_ico });
//       break;

//     case "delete":
//       this.setState({ delete: delete_ico });
//       break;
//     case "plus":
//       this.setState({ plus: plus_ico });
//       break;
//     case "delete1":
//       this.setState({ delete1: delete_icon1 });
//       break;
//     case "delete2":
//       this.setState({ delete2: delete_ico });
//       break;
//     case "delete3":
//       this.setState({ delete3: delete_ico });
//       break;

//     default:
//       break;
//   }
// };

// state = {
//   states: state,
//   countries: country,
//   save: save_ico,
//   edit: edit_ico,
//   edit2: edit_ico,
//   delete: delete_ico,
//   plus: plus_ico,
//   delete1: delete_icon1,
//   delete2: delete_ico,
//   delete3: delete_ico,
//   comments: comments,
//   documents: documents,
//   selectedComment: {},
//   selectedDocument: {},
//   tDocuments: [],
//   selected: [],
//   selectedCountry: 0,
//   activeForm: 0
// };

// refe2;
// refe1;

// iconOver = type => {
//   switch (type) {
//     case "save":
//       this.setState({ save: save_icon });
//       break;
//     case "edit":
//       this.setState({ edit: edit_icon });
//       break;
//     case "edit2":
//       this.setState({ edit2: edit_icon });
//       break;
//     case "delete":
//       this.setState({ delete: delete_icon });
//       break;
//     case "plus":
//       this.setState({ plus: plus_icon });
//       break;
//     case "delete1":
//       this.setState({ delete1: delete_icon });
//       break;
//     case "delete2":
//       this.setState({ delete2: delete_icon });
//       break;
//     case "delete3":
//       this.setState({ delete3: delete_icon });
//       break;
//     default:
//       break;
//   }
// };

// iconOut = type => {
//   switch (type) {
//     case "save":
//       this.setState({ save: save_ico });
//       break;
//     case "edit":
//       this.setState({ edit: edit_ico });
//       break;
//     case "edit2":
//       this.setState({ edit2: edit_ico });
//       break;

//     case "delete":
//       this.setState({ delete: delete_ico });
//       break;
//     case "plus":
//       this.setState({ plus: plus_ico });
//       break;
//     case "delete1":
//       this.setState({ delete1: delete_icon1 });
//       break;
//     case "delete2":
//       this.setState({ delete2: delete_ico });
//       break;
//     case "delete3":
//       this.setState({ delete3: delete_ico });
//       break;

//     default:
//       break;
//   }
// };
