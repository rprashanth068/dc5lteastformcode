import * as React from "react";
import { Typeahead } from "react-typeahead";
import styles from "./HelloWorld.module.scss";
import { render } from "react-dom";

const edit_ico = require("../../../icons/NRD-00001_02013_ICO_Edit 52525b_001.svg");
const delete_ico = require("../../../icons/NRD-00001_02013_ICO_Delete 52525b_001.svg");
const delete_icon = require("../../../icons/NRD-00001_02013_ICO_Delete ff6600_001.svg");
const edit_icon = require("../../../icons/NRD-00001_02013_ICO_Edit ff6600_001 (1).svg");

const plus_ico = require("../../../icons/NRD-00001_02013_ICO_New 52525b_001.svg");
const plus_icon = require("../../../icons/NRD-00001_02013_ICO_New ff6600_001 (2).svg");

import { comments, documents, parents, signatories } from "../../../data/data";

export interface INameFormRowProps {}

export class Esignatories extends React.Component<{}, {}> {
  constructor(props) {
    super(props);
  }

  state = {
    edit2: edit_ico,
    delete: delete_ico,
    plus: plus_ico,
    selectedDocument: {
      firstName: "",
      lastName: ""
    },
    documents: documents,
    signatories: signatories,
    tDocuments: [],
    allSelected: false,
    allDefault: "false"
  };

  refe1;

  // this is triggered when mouse is moved over an icon
  iconOver = type => {
    switch (type) {
      case "edit":
        this.setState({ edit: edit_icon });
        break;
      case "delete":
        this.setState({ delete: delete_icon });
        break;
      case "plus":
        this.setState({ plus: plus_icon });
        break;
      default:
        break;
    }
  };

  // this is triggered when mouse is moved off an icon
  iconOut = type => {
    switch (type) {
      case "edit":
        this.setState({ edit: edit_ico });
        break;
      case "delete":
        this.setState({ delete: delete_ico });
        break;
      case "plus":
        this.setState({ plus: plus_ico });
        break;
      default:
        break;
    }
  };

  // this will select the signatory and set into state
  selectDocument = (event, row) => {
    row._docname = row.docname;
    this.setState({ selectedDocument: row });
    this.state.signatories.map(d => {
      if (d.id === row.id) {
        d.selected = !d.selected;
        if (d.selected) {
          this.setState({ selectedDocument: row });
        } else {
          this.setState({ selectedDocument: {} });
          // this.refe1.value = "";
        }
      }
    });
  };

  changePreferredSignatory = row => {
    this.state.signatories.map(d => {
      if (d.id === row.id) {
        d.prefferedSignatory = !d.prefferedSignatory;
      } else {
        d.prefferedSignatory = false;
      }
    });
    this.setState({ signatories: this.state.signatories });
  };

  deleteSignatories = () => {
    const signatories = this.state.signatories.filter(item => {
      return !item.selected;
    });
    this.setState({ signatories: signatories });
  };

  // selectSignatory = (event, row) => {
  //   row._signame = row.name;
  //   this.setState({ selectedSignatory: row });
  //   this.state.signatories.map(s => {
  //     if (s.id === row.id) {
  //       s.selected = !s.selected;
  //       if (s.selected) {
  //         this.setState({ selectedDocument: row });
  //       } else {
  //         this.setState({ selectedDocument: {} });
  //         // this.refe1.value = "";
  //       }
  //     } else {
  //       s.selected = false;
  //     }
  //   });
  //   console.log(documents);
  // };

  // this will set if the name is preffered for the signatory
  selectPrefferedSignatory = (event, row) => {
    let updatedDocs = this.state.documents.map(d => {
      if (d.id === row.id) {
        d.preffered = !d.preffered;
      }
      return d;
    });

    this.setState({ documents: updatedDocs });
  };

  changeDocument = event => {
    let e = event.target.value;
    event.preventDefault();
    //let me = this;
    let _dDoument1 = this.state.documents;
    /** Mutablity isssue  */
    //_tcoment1 = Array.from(this.state.comments);
    let t = {};
    _dDoument1.forEach(d => {
      if (d.id === this.state.selectedDocument["id"]) {
        d._docname = e;
        t = d;
      }
    });
    this.setState({ selectedDocument: t });
    this.setState({ tDocuments: _dDoument1 });
  };

  // this will save the signatory in state
  saveDocuments = () => {
    this.state.tDocuments.map(d => {
      d.docname = d._docname ? d._docname : d.docname;
    });
    this.setState({ documents: this.state.tDocuments });
  };

  selectAllSignatories = val => {
    let allSelected = !this.state.allSelected;
    this.setState({ allSelected });
    let updateSignatories = this.state.documents.map(s => {
      s.selected = allSelected;
      return s;
    });
    this.setState({ signatories: updateSignatories });
  };
  /*   selectAllSignatories = (val) => {
    let allSelected = !this.state.allSelected;
    this.setState({allSelected});
    let updateSignatory = this.state.signatories.map(c => {
      c.selected = allSelected;
      return c;
    });
    this.setState({signatories: updateSignatory});
  }; */

  render() {
    return (
      <div className={styles.Esignatories}>
        <h5>Signatories</h5>
        <label className={styles.AddSignatory}>Add New Signatory</label>
        <div
          className={`${styles.row} ${styles.tableInputSignaturies} ${styles["mLeft"]}`}
        >
          <span>
            <img
              src={this.state.edit2 as string}
              height="18px"
              width="18px"
              className={styles["signatoryediticon"]}
              alt="editicon"
              onMouseOver={() => this.iconOver("edit2")}
              onMouseOut={() => this.iconOut("edit2")}
            />
          </span>

          <span>
            <img
              src={this.state.delete as string}
              height="18px"
              width="18px"
              className={styles["signotorydeleteicons"]}
              alt="deleteicon"
              onMouseOver={() => this.iconOver("delete")}
              onMouseOut={() => this.iconOut("delete")}
              onClick={() => this.deleteSignatories()}
            />
          </span>

          <div
            className={`${styles["type-Ahead"]} ${styles.flex7} ${styles.entityInput}`}
          >
            <Typeahead
              defaultValue={this.state.selectedDocument.firstName}
              options={[
                "John Curran",
                "Paul Micheal",
                "George Sang",
                "Ringo Francis",
                "PS",
                "PC",
                "PT"
              ]}
            />
          </div>

          <span>
            <i className="far fa-2x fa-plus" onClick={this.saveDocuments}></i>
          </span>

          <span className={styles["margin-icons"]}>
            <img
              src={this.state.edit2 as string}
              height="18px"
              width="18px"
              alt="editicon"
              onMouseOver={() => this.iconOver("edit2")}
              onMouseOut={() => this.iconOut("edit2")}
            />
          </span>

          <span className={styles["preffered-signatory-checkbox-container"]}>
            <div>
              <label className={styles["preffered-sign"]}>
                Preffered Signatory
              </label>
            </div>

            <div>
              <input
                className={styles["form-check-input"]}
                type="checkbox"
                name="sign"
              />
            </div>
          </span>
          <span className={styles["margin-icons"]}>
            <img
              src={this.state.plus as string}
              height="18px"
              width="18px"
              alt="editicon"
              onMouseOver={() => this.iconOver("edit2")}
              onMouseOut={() => this.iconOut("edit2")}
            />
          </span>
        </div>
        <div className={`${styles.commentsTable} ${styles.esignatoriesTable} `}>
          <table className={styles["table-Head"]}>
            <thead>
              <tr>
                <th scope="row">
                  <div className="form-check form-check-align">
                    <input
                      className="form-check-input "
                      type="checkbox"
                      id="gridCheck"
                      name="signatory_chk"
                      defaultValue={this.state.allDefault}
                      checked={this.state.allSelected}
                      onChange={e => {
                        this.selectAllSignatories(this.state.allSelected);
                      }}
                    />
                  </div>
                </th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Preffered Signatory</th>
              </tr>
            </thead>
          </table>
        </div>
        <div
          className={` ${styles["scroll-table"]} ${styles.commentsTable} ${styles.esignatoriesTable}`}
        >
          <table className={styles["table-Body"]}>
            <tbody>
              {this.state.signatories.map((row, index) => (
                <tr
                  key={index}
                  className={`${row.selected ? styles.rowSelected : ""} ${
                    styles.rowHover
                  }`}
                >
                  <td scope="row">
                    <div className="form-check form-check-align">
                      <input
                        type="checkbox"
                        id="gridCheck"
                        name="signatory_chk"
                        checked={row.selected}
                        onChange={e => {
                          this.selectDocument(e, row);
                        }}
                      />
                    </div>
                  </td>
                  <td>{row.firstName}</td>
                  <td>{row.lastName}</td>
                  <td>
                    <input
                      className={styles["ms-TextField"]}
                      type="checkbox"
                      id="gridCheck"
                      checked={row.prefferedSignatory}
                      onChange={e => this.changePreferredSignatory(row)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <hr className={styles.horizontalSeparator} />
      </div>
    );
  }
}
