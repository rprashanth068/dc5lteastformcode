
import * as React from "react";
import { Typeahead } from "react-typeahead";
import styles from "./HelloWorld.module.scss";

const edit_ico = require("../../../icons/NRD-00001_02013_ICO_Edit 52525b_001.svg");
const delete_ico = require("../../../icons/NRD-00001_02013_ICO_Delete 52525b_001.svg");
const delete_icon = require("../../../icons/NRD-00001_02013_ICO_Delete ff6600_001.svg");
const edit_icon = require("../../../icons/NRD-00001_02013_ICO_Edit ff6600_001 (1).svg");

const plus_ico = require("../../../icons/NRD-00001_02013_ICO_New 52525b_001.svg");
const plus_icon = require("../../../icons/NRD-00001_02013_ICO_New ff6600_001 (2).svg");

import { comments, documents, parents, signatories } from "../../../data/data";

export interface IEsignatoriesProps {

}

export const Esignatories: React.FC<IEsignatoriesProps> = ({ }) => {

      const [edit2,setEdit2] = React.useState(edit_ico);
      const [deletee ,setDeletee] = React.useState(delete_ico);
      const [plus, setPlus] = React.useState(plus_ico);
      const [selectedDocument, setSelectedDocument] = React.useState({
        firstName: "",
        lastName: ""
      });
      const [docs, setDocuments] = React.useState(documents);
      const [signats, setSignatories] = React.useState(signatories);
      const [tDocuments, setTDocuments] = React.useState([]);
      const [allSelected, setAllSelected] = React.useState(false);
      const [allDefault, setAllDefault] = React.useState();
      const [] = React.useState('false');
      let refe1;

      // this is triggered when mouse is moved over an icon
     const iconOver = type => {
        switch (type) {
          case "edit":
            setEdit2(edit_icon);
            break;
          case "delete":
            setDeletee(delete_icon);
            break;
          case "plus":
            setPlus( plus_icon );
            break;
          default:
            break;
        }
      };

      // this is triggered when mouse is moved off an icon
      const iconOut = type => {
        switch (type) {
          case "edit":
            setEdit2(edit_ico);
            break;
          case "delete":
            setDeletee(delete_ico);
            break;
          case "plus":
            setPlus(plus_ico );
            break;
          default:
            break;
        }
      };

      // this will select the signatory and set into state
     const selectDocument = (event, row) => {
        row._docname = row.docname;
        //const emptyDoc =
        setSelectedDocument(row);
        signatories.map(d => {
          if (d.id === row.id) {
            d.selected = !d.selected;
            if (d.selected) {
              setSelectedDocument(row);
            } else {
              setSelectedDocument({'firstName': '', 'lastName' :''});
              // this.refe1.value = "";
            }
          }
        });
      };

    const changePreferredSignatory = row => {
        signatories.map(d => {
          if (d.id === row.id) {
            d.prefferedSignatory = !d.prefferedSignatory;
          } else {
            d.prefferedSignatory = false;
          }
        });
        setSignatories(signatories);
      };

    const deleteSignatories = () => {
        const filteredsignatories = signatories.filter(item => {
          return !item.selected;
        });
        setSignatories(filteredsignatories);
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
      const selectPrefferedSignatory = (event, row) => {
        let updatedDocs = documents.map(d => {
          if (d.id === row.id) {
            d.preffered = !d.preffered;
          }
          return d;
        });

        setDocuments(updatedDocs);
      };

  const changeDocument = event => {
        let e = event.target.value;
        event.preventDefault();
        //let me = this;
        let _dDoument1 = documents;
        /** Mutablity isssue  */
        //_tcoment1 = Array.from(this.state.comments);
        let t = {};
        _dDoument1.forEach(d => {
          if (d.id === selectedDocument["id"]) {
            d._docname = e;
            t = d;
          }
        });
        setSelectedDocument({firstName: '', lastName: ''});
        setTDocuments(_dDoument1);
      };

      // this will save the signatory in state
  const saveDocuments = () => {
        tDocuments.map(d => {
          d.docname = d._docname ? d._docname : d.docname;
        });
        setDocuments(tDocuments) ;
      };

  const selectAllSignatories = val => {
    let allSelected = !setAllSelected;
    // setAllSelected;
    let updateSignatories = this.state.documents.map(s => {
      s.selected = allSelected;
      return s;
    });
    setSignatories(updateSignatories);
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
    return (
      <div>
        <div className={styles.Esignatories}>
          <h5>Signatories</h5>
          <label className={styles.AddSignatory}>Add New Signatory</label>
          <div className={`${styles.row} ${styles.tableInputSignaturies} ${styles["mLeft"]}`}>
            <span>
            <img
              src={edit2 as string}
              height="18px"
              width="18px"
              className={styles["signatoryediticon"]}
              alt="editicon"
              onMouseOver={() => iconOver("edit2")}
              onMouseOut={() => iconOut("edit2")}
            />
          </span>

            <span>
            <img
              src={deletee as string}
              height="18px"
              width="18px"
              className={styles["signotorydeleteicons"]}
              alt="deleteicon"
              onMouseOver={() => iconOver("delete")}
              onMouseOut={() => iconOut("delete")}
              onClick={() => deleteSignatories()}
            />
          </span>

            <div className={`${styles["type-Ahead"]} ${styles.flex7} ${styles.entityInput}`}>
            <Typeahead
              defaultValue={selectedDocument.firstName}
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
              <i className="far fa-2x fa-plus" onClick={saveDocuments}></i>
            </span>

            <span className={styles["margin-icons"]}>
            <img
              src={edit2 as string}
              height="18px"
              width="18px"
              alt="editicon"
              onMouseOver={() => iconOver("edit2")}
              onMouseOut={() => iconOut("edit2")}
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
            src={plus as string}
            height="18px"
            width="18px"
            alt="editicon"
            onMouseOver={() => iconOver("edit2")}
            onMouseOut={() => iconOut("edit2")}
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
                    defaultValue={allDefault}
                    checked={allSelected}
                    onChange={e => {
                      selectAllSignatories(allSelected);
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
          <div className={` ${styles["scroll-table"]} ${styles.commentsTable} ${styles.esignatoriesTable}`}>
        <table className={styles["table-Body"]}>
          <tbody>
            {signatories.map((row, index) => (
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
                        selectDocument(e, row);
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
                    onChange={e => changePreferredSignatory(row)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
          <hr className={styles.horizontalSeparator} />
        </div>
      </div>
    );
}
