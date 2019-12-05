import * as React from "react";
import Dropzone from "react-dropzone";
import { validation } from "./validation";
import { Tooltip } from "./Tooltip";
import styles from "../../helloWorld/components/HelloWorld.module.scss";
import { render } from "react-dom";
import { documents } from "../../../data/data";
import { Input } from "./Input";
const edit_ico = require("../../../icons/NRD-00001_02013_ICO_Edit 52525b_001.svg");
const delete_ico = require("../../../icons/NRD-00001_02013_ICO_Delete 52525b_001.svg");
const delete_icon = require("../../../icons/NRD-00001_02013_ICO_Delete ff6600_001.svg");
const edit_icon = require("../../../icons/NRD-00001_02013_ICO_Edit ff6600_001 (1).svg");
const plus_ico = require("../../../icons/NRD-00001_02013_ICO_New 52525b_001.svg");
const plus_icon = require("../../../icons/NRD-00001_02013_ICO_New ff6600_001 (2).svg");

export interface INameFormRowProps {}

export class DocumentsTable extends React.Component<{}, {}> {
  constructor(props) {
    super(props);
  }

  state = {
    edit2: edit_ico,
    delete: delete_ico,
    plus: plus_ico,
    selectedDocument: [],
    documents: documents,
    tDocuments: [],
    showPopup: false,
    division: "",
    allSelected: false,
    allDefault: "false",
    singleSelectedVal: "",
    dragedFiles: [],
    formData: [],
    // validation error
    errors: {},
    // Tooltip
    dispalyError: false,
    displayDescription: false,
    inputMapData: []
  };

  refe1;

  // this is triggered when mouse is moved over an icon
  iconOver = type => {
    switch (type) {
      case "edit2":
        if (
          this.state.selectedDocument &&
          this.state.selectedDocument.length === 1
        )
          this.setState({ edit2: edit_icon });
        break;
      case "delete":
        this.setState({ delete: delete_icon });
        break;
    }
  };

  // this is triggered when mouse is moved off an icon
  iconOut = type => {
    switch (type) {
      case "edit2":
        if (
          this.state.selectedDocument &&
          this.state.selectedDocument.length === 1
        )
          this.setState({ edit2: edit_ico });
        break;
      case "delete":
        this.setState({ delete: delete_ico });
        break;
    }
  };

  updateValue = () => {
    console.log("selected ", this.state.selectedDocument);
    const updatedVal = this.state.singleSelectedVal;
    const id = this.state.selectedDocument[0].id;
    const data = this.state.documents;
    data.map(row => {
      if (row.id === id) {
        row.docname = updatedVal;
      }
    });
    this.setState({ documents: data });
  };
  
  company: HTMLSelectElement;
  division: HTMLSelectElement;
  fileType: HTMLSelectElement;
  description: HTMLInputElement;
  desc: HTMLInputElement;
  revision: HTMLInputElement;

  //this will save the document in the state
  saveDocument = () => {
    let newDocName =
      this.state.inputMapData[0].project.value +
      "_" +
      this.company.value +
      this.division.value +
      "_" +
      this.desc.value +
      "_" +
      this.revision.value +
      " " +
      this.description.value +
      "." +
      this.fileType.value;

    const cDate = new Date();
    const uploader = "dAve";
    const id = this.state.documents.length + 1;
    const doc = {
      id: id,
      docname: newDocName,
      dateuploaded: "July 25 2019",
      whouploaded: uploader
    };
    let arr = this.state.documents;
    arr.push(doc);
    this.setState({ documents: arr });
    this.setState({ showPopup: false });
    // console.log('name is ', this.name);
  };

  // this method will select the document and save in state
  selectDocument = (event, row) => {
    row._docname = row.docname;
    //this.setState({ selectedComment: row });
    this.state.documents.map(d => {
      if (d.id === row.id) {
        d.selected = event.target.checked;
        if (d.selected) {
          this.state.selectedDocument.push(row);
          this.setState(
            { selectedDocument: this.state.selectedDocument },
            () => {
              if (this.state.selectedDocument.length !== 1) {
                this.refe1.value = "";
                this.setState({ singleSelectedVal: "" });
              }
            }
          );
        } else {
          const filterDocs = this.state.selectedDocument.filter(
            x => x.id !== row.id
          );
          this.setState({ selectedDocument: filterDocs }, () => {
            if (this.state.selectedDocument.length !== 1) {
              this.refe1.value = "";
              this.setState({ singleSelectedVal: "" });
            }
          });
        }
      }
    });
    console.log(documents);
  };

  // this method will help us change the document
  changeDocument = event => {
    if (
      this.state.selectedDocument &&
      this.state.selectedDocument.length !== 1
    ) {
      return;
    }
    let e = event.target.value;
    event.preventDefault();
    //let me = this;
    let _dDoument1 = this.state.documents;
    /** Mutablity isssue  */
    //_tcoment1 = Array.from(this.state.comments);
    let t = [];
    _dDoument1.forEach(d => {
      if (d.id === this.state.selectedDocument[0]["id"]) {
        d._docname = e;
        t.push(d);
      }
    });
    this.setState({ selectedDocument: t });
    this.setState({ singleSelectedVal: t[0]["_docname"] });
    this.setState({ tDocuments: _dDoument1 });
  };

  selectAllDocuments = val => {
    let allSelected = !this.state.allSelected;
    this.setState({ allSelected });
    let updateDocuments = this.state.documents.map(c => {
      c.selected = allSelected;
      return c;
    });
    this.setState({ documents: updateDocuments });
    updateDocuments.forEach(d => {
      d._docname = d.docname;
    });
    this.setState({ selectedDocument: updateDocuments });
    if (!allSelected) {
      this.setState({ selectedDocument: [] });
      this.setState({ singleSelectedVal: "" });
    }
  };

  // this method will save the documents in state
  saveDocuments = e => {
    /*this.state.tDocuments.map(d => {
      d.docname = d._docname ? d._docname : d.docname;
    });
    this.setState({ documents: this.state.tDocuments });*/
    this.setState({ showPopup: true });
    this.setState({ dragedFiles: e.target.files });
    const arr = [];
    var inputMapObject = {
      project: new HTMLInputElement()
    };
    this.state.dragedFiles.forEach(item => {
      const obj = inputMapObject;
      arr.push({obj});
    })
    this.setState({inputMapData: arr});
    console.log('inputMapData', this.state.inputMapData); 
  };

  deleteDocuments = () => {
    const documents = this.state.documents.filter(item => {
      return !item.selected;
    });
    this.setState({ documents: documents });
  };

  handleselectedFile = e => {
    this.saveDocuments(e);
  };

  closeSavePop = () => {
    this.setState({ showPopup: false });
  };

  editDocument = () => {
    if (
      this.state.selectedDocument &&
      this.state.selectedDocument.length === 1
    ) {
      this.setState({
        singleSelectedVal: this.state.selectedDocument[0]["_docname"]
      });
    } else {
      this.refe1.value = "";
      this.setState({
        singleSelectedVal: ""
      });
    }
  };

  render() {
    // validation schema
    const validationSchema = {
      project: {
        required: true,
        type: "string",
        validator: {
          regEx: /^[A-Z]{3}-[0-9]{3}$/,
          error: "Invalid Project Format"
        }
      }
    };

    //const singleSelectedVal = this.state.selectedDocument && this.state.selectedDocument.length === 1 ? this.state.selectedDocument[0]["_docname"] : ''
    return (
      <div className={styles.documentsTableComponent}>
        <div>
          <h5>Documents</h5>
          <div>
            <img
              src={this.state.edit2 as string}
              height="18px"
              width="18px"
              className={styles.editIcons}
              alt="editicon"
              onMouseOver={() => this.iconOver("edit2")}
              onMouseOut={() => this.iconOut("edit2")}
              onClick={() => this.editDocument()}
            />

            <img
              src={this.state.delete as string}
              height="18px"
              width="18px"
              className="deleteicons"
              alt="deleteicon"
              onMouseOver={() => this.iconOver("delete")}
              onMouseOut={() => this.iconOut("delete")}
              onClick={() => this.deleteDocuments()}
            />
          </div>
          <div
            className={`${styles["ms-TextField"]} ${styles.customFormInputContainer}`}
          >
            <div className={styles.customFormInput}>
              <span className={styles.inputContainer}>
                <input
                  type="text"
                  className={`${styles["ms-TextField-field"]} ${styles["table-input"]} ${styles["inputWidth"]}`}
                  ref={node => (this.refe1 = node)}
                  value={this.state.singleSelectedVal}
                  id="formGroupExampleInput"
                  placeholder=" "
                  onChange={e => this.changeDocument(e)}
                  disabled={
                    this.state.selectedDocument &&
                    this.state.selectedDocument.length !== 1
                  }
                />
              </span>
              <span className={styles.iconContainer}>
                <img
                  src={this.state.plus as string}
                  height="18px"
                  width="18px"
                  className={styles.plusIcon}
                  alt="plusicon"
                  onMouseOver={() => this.iconOver("plus")}
                  onMouseOut={() => this.iconOut("plus")}
                  onClick={this.updateValue}
                />
                <input
                  type="file"
                  name=""
                  id=""
                  multiple
                  onChange={e => {
                    this.setState({ showPopup: true });
                    let arr = [], arr1 = [];
                    var inputMapObject = {
                      project: HTMLInputElement,
                      key: 0
                    };
                    console.log(e.target.files);
                    let frmData = new FormData();
                    for (let i = 0; i < e.target.files.length; i++) {
                      arr.push(Object["values"](e.target.files)[i]);
                      frmData.append("file", e.target.files[i]);
                      const obj = inputMapObject;
                      inputMapObject.key = i;
                      arr1.push({obj});
                    }
                    this.setState({ dragedFiles: arr });
                    this.setState({ formData: frmData });
                    console.log(this.state.formData);                    
                    this.setState({inputMapData: arr1});
                    console.log('inputMapData', this.state.inputMapData); 
                  }}
                />
              </span>
            </div>
          </div>

          {this.state.showPopup ? (
            <div>
              <div className={styles.popupWrapper}>
                {/*<div className={styles.glasspane}></div>*/}
                {this.state.inputMapData.length && this.state.inputMapData.map(file => {
                  return (
                    <div key={file.key} className={`${styles.documentPopup}`}>
                      <div style={{ padding: "10px" }}>
                        {/* <span>Client Company</span>
                 <input id="clientCompany" type="text" />
                 <span>Division</span>
                 <input type="text" /> */}
                        {/*<span>{file.name}</span>*/}
                        <div className={`${styles.row} ${styles.namesRow}`}>
                          <div
                            className={`${styles.flex2} ${styles.contactColSize}`}
                          >
                            <div
                              className={styles["ms-TextField"]}
                              style={{ position: "relative" }}
                            >
                              <label
                                className={styles["ms-Label"]}
                                htmlFor="formGroupExampleInput"
                              >
                                Project
                              </label>
                              {console.log(this.state.errors)}

                              <input
                                type="text"
                                // Tooltip settings
                                name="project"
                                onMouseEnter={() => {
                                  this.setState({ displayDescription: true });
                                }}
                                onMouseLeave={() => {
                                  this.setState({ displayDescription: false });
                                }}
                                onBlur={e => {
                                  let vv = validation(
                                    e.target.name,
                                    e.target.value,
                                    validationSchema
                                  );
                                  this.setState({ errors: vv });
                                  this.setState({ dispalyError: false });
                                }}
                                onFocus={e => {
                                  if (this.state.errors[e.target.name]) {
                                    this.setState({ dispalyError: true });
                                  }
                                }}
                                onChange={e => {
                                  let vv = validation(
                                    e.target.name,
                                    e.target.value,
                                    validationSchema
                                  );
                                  this.setState({ errors: vv });
                                  if (vv[e.target.name] !== "") {
                                    this.setState({ dispalyError: true });
                                  } else {
                                    this.setState({ dispalyError: false });
                                  }
                                }}
                                // ----------------
                                style={
                                  this.state.errors["project"]
                                    ? { border: "1px solid red" }
                                    : { border: "1px solid black" }
                                }
                                className={styles["ms-TextField-field"]}
                                id="formGroupExampleInput"
                                placeholder=" "
                                ref={c => (file.project = c)}
                              />
                              {/* Error Tooltip */}
                              {this.state.dispalyError && (
                                <Tooltip
                                  message={this.state.errors["project"]}
                                  title={"Error"}
                                />
                              )}
                              {/* Description Tooltip */}
                              {this.state.displayDescription && (
                                <Tooltip message={"description"} />
                              )}
                            </div>
                          </div>
                          <div
                            className={`${styles.flex2} ${styles.contactColSize}`}
                          >
                            <div className={styles["ms-TextField"]}>
                              <label
                                className={styles["ms-Label"]}
                                htmlFor="formGroupExampleInput"
                              >
                                Company
                              </label>
                              <select
                                className={styles["companySize"]}
                                ref={c => (this.company = c)}
                              >
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                                <option value="04">04</option>
                              </select>
                            </div>
                          </div>
                          <div
                            className={`${styles.flex2} ${styles.contactColSize}`}
                          >
                            <div className={styles["ms-TextField"]}>
                              <label
                                className={styles["ms-Label"]}
                                htmlFor="formGroupExampleInput"
                              >
                                Division
                              </label>
                              <select
                                className={styles["divSize"]}
                                ref={c => (this.division = c)}
                              >
                                <option value="01">003</option>
                                <option value="02">007</option>
                                <option value="03">008</option>
                                <option value="04">010</option>
                                <option value="04">014</option>
                              </select>
                            </div>
                          </div>

                          <div
                            className={`${styles.flex2} ${styles.contactColSize}`}
                          >
                            <div className={styles["ms-TextField"]}>
                              <label
                                className={styles["ms-Label"]}
                                htmlFor="formGroupExampleInput"
                              >
                                FileType
                              </label>
                              <select
                                className={styles["docSize"]}
                                ref={c => (this.fileType = c)}
                              >
                                <option value="PDF">pdf</option>
                                <option value="WORD">docx</option>
                                <option value="04">xlsx</option>
                                <option value="04">04</option>
                              </select>
                            </div>
                          </div>

                          <div
                            className={`${styles.flex2} ${styles.contactColSize}`}
                          >
                            <div className={styles["ms-TextField"]}>
                              <label
                                className={styles["ms-Label"]}
                                htmlFor="formGroupExampleInput"
                              >
                                Description
                              </label>
                              <input
                                type="text"
                                className={styles["ms-TextField-field"]}
                                id="formGroupExampleInput"
                                placeholder=" "
                                ref={c => (this.description = c)}
                              />
                            </div>
                          </div>

                          <div
                            className={`${styles.flex2} ${styles.contactColSize}`}
                          >
                            <div className={styles["ms-TextField"]}>
                              <label
                                className={styles["ms-Label"]}
                                htmlFor="formGroupExampleInput"
                              >
                                Revision
                              </label>
                              <input
                                type="number"
                                className={styles["ms-TextField-field"]}
                                id="formGroupExampleInput"
                                placeholder=" "
                                ref={c => (this.revision = c)}
                              />
                            </div>
                          </div>

                         
                        </div>
                        <div>
                          <button
                            className={styles["savePop"]}
                            onClick={this.saveDocument}
                          >
                            Save
                          </button>

                          <button
                            className={styles["closePop"]}
                            onClick={() => {
                              this.closeSavePop();
                              this.setState({ errors: {} });
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            ""
          )}

          <Dropzone
            onDrop={acceptedFiles => {
              this.setState({ showPopup: true });
              this.setState({ dragedFiles: acceptedFiles });

              let frmData = new FormData();
              acceptedFiles.forEach(el => {
                frmData.append(el.name, el);
              });

              for (const item in frmData) {
                if (frmData.hasOwnProperty(item)) {
                  console.log("hello");
                }
              }
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <div className={styles["document-Tabel"]}>
                    <table className={styles["table-Head"]}>
                      <thead>
                        <tr>
                          <th>
                            <div className="form-check form-check-align">
                              <input
                                className="form-check-input "
                                type="checkbox"
                                id="gridCheck"
                                name="document_chk"
                                defaultValue={this.state.allDefault}
                                checked={this.state.allSelected}
                                onChange={e => {
                                  this.selectAllDocuments(
                                    this.state.allSelected
                                  );
                                }}
                              />
                            </div>
                          </th>
                          <th>Document Name</th>
                          <th>Date</th>
                          <th>Who Uploaded</th>
                        </tr>
                      </thead>
                    </table>
                  </div>{" "}
                  <div
                    className={`${styles["document-Tabel"]} ${styles["scroll-table"]}`}
                  >
                    <table className={styles["table-Body"]}>
                      <tbody>
                        {this.state.documents.map((row, index) => (
                          <tr
                            key={index}
                            className={`${
                              row.selected ? styles.rowSelected : ""
                            } ${styles.rowHover}`}
                          >
                            <td>
                              <div className="form-check form-check-align">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="gridCheck"
                                  name="document_chk"
                                  defaultValue={row.selected}
                                  checked={row.selected}
                                  onChange={e => {
                                    this.selectDocument(e, row);
                                  }}
                                />
                              </div>
                            </td>
                            <td>{row.docname}</td>
                            <td>{row.dateuploaded}</td>
                            <td>{row.whouploaded}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <input
                    {...getInputProps()}
                    onClick={e => {
                      e.preventDefault();
                    }}
                  />
                </div>
              </section>
            )}
          </Dropzone>
        </div>

        <hr className={styles.horizontalSeparator} />
      </div>
    );
  }
}
