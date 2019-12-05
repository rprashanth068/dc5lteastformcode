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

export interface IDocumentsTableProps {}
export const DocumentsTable: React.FC<IDocumentsTableProps> = ({}) => {
  const [editt, setEditt] = React.useState(edit_ico);
  const [deletee, setDeletee] = React.useState(delete_ico);
  const [plus, setPlus] = React.useState(plus_ico);
  const [document, setDocument] = React.useState(documents);
  const [selectedDocument, setSelectedDocument] = React.useState([]);
  const [setTDocuments] = React.useState(documents);
  const [showPopup, setShowPopup] = React.useState(false);
  const [division, setDivision] = React.useState();
  const [allSelected, setAllSelected] = React.useState(false);
  const [allDefault, setAllDefault] = React.useState("");
  const [singleSelectedVal, setSingleSelectedVal] = React.useState("");
  const [dragedFiles, setDragedFiles] = React.useState([]);
  const [formData, setFormData] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [dispalyError, setDispalyError] = React.useState(false);
  const [inputMapData, setInputMapData] = React.useState([]);

  let refe1;

  const iconOver = type => {
    switch (type) {
      case "edit2":
        if (selectedDocument && selectedDocument.length === 1)
          setEditt(edit_icon);
        break;
      case "delete":
        setDeletee(delete_icon);
        break;
      case "plus":
        setPlus(plus_icon);
        break;
      default:
        break;
    }
  };

  const iconOut = type => {
    switch (type) {
      case "edit2":
        if (selectedDocument && selectedDocument.length === 1)
          setEditt(edit_ico);
        break;
      case "delete":
        setDeletee(delete_ico);
        break;
      case "plus":
        setPlus(plus_ico);
        break;
      default:
        break;
    }
  };

  const updateValue = () => {
    console.log("selected ", selectedDocument);
    const updatedVal = singleSelectedVal;
    const id = selectedDocument[0].id;
    const data = documents;
    data.map(row => {
      if (row.id === id) {
        row.docname = updatedVal;
      }
    });
    ({ documents: data });
  };

  company: HTMLSelectElement;
  division: HTMLSelectElement;
  fileType: HTMLSelectElement;
  description: HTMLInputElement;
  desc: HTMLInputElement;
  revision: HTMLInputElement;

  //this will save the document in the state
  const saveDocument = () => {
    let newDocName =
      inputMapData[0].project.value +
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
    const id = documents.length + 1;
    const doc = {
      id: id,
      docname: newDocName,
      dateuploaded: "July 25 2019",
      whouploaded: uploader
    };
    let arr = documents;
    arr.push(doc);
    setDocuments: arr;
    setShowPopup(false);
    // console.log('name is ', this.name);
  };

  // this method will select the document and save in state
  const selectDocument = (event, row) => {
    row._docname = row.docname;
    //this.setState({ selectedComment: row });
    documents.map(d => {
      if (d.id === row.id) {
        d.selected = event.target.checked;
        if (d.selected) {
          selectedDocument.push(row);
          setSelectedDocument(selectedDocument);
          if (selectedDocument.length !== 1) {
            refe1.value = "";
            setSingleSelectedVal("");
          }
        }
      } else {
        const filterDocs = selectedDocument.filter(x => x.id !== row.id);
        setSelectedDocument(filterDocs);
        if (selectedDocument.length !== 1) {
          refe1.value = "";
          setSingleSelectedVal("");
        }
      }
    });
    console.log(documents);
  };

  // this method will help us change the document
  const changeDocument = event => {
    if (selectedDocument && selectedDocument.length !== 1) {
      return;
    }
    let e = event.target.value;
    event.preventDefault();
    //let me = this;
    let _dDocument1 = documents;
    /** Mutablity isssue  */
    //_tcoment1 = Array.from(this.state.comments);
    let t = [];
    _dDocument1.forEach(d => {
      if (d.id === selectedDocument[0]["id"]) {
        d._docname = e;
        t.push(d);
      }
    });
    setSelectedDocument(t);
    setSingleSelectedVal(t[0]["_docname"]);
    setTDocuments(_dDocument1);
  };

  const selectAllDocuments = val => {
    //let allSelected = !setAllSelected;
    setAllSelected(!setAllSelected);
    let updateDocuments = documents.map(c => {
      c.selected = allSelected;
      return c;
    });
    setDocument(updateDocuments);
    updateDocuments.forEach(d => {
      d._docname = d.docname;
    });
    setSelectedDocument(updateDocuments);
    if (!allSelected) {
      setSelectedDocument([]);
      setSingleSelectedVal("");
    }
  };

  // this method will save the documents in state
  const saveDocuments = e => {
    /*this.state.tDocuments.map(d => {
      d.docname = d._docname ? d._docname : d.docname;
    });
    this.setState({ documents: this.state.tDocuments });*/
    setShowPopup(true);
    setDragedFiles(e.target.files);
    const arr = [];
    var inputMapObject = {
      project: new HTMLInputElement()
    };
    dragedFiles.forEach(item => {
      const obj = inputMapObject;
      arr.push({ obj });
    });
    setInputMapData(arr);
    console.log("inputMapData", inputMapData);
  };

  const deleteDocuments = () => {
    const documents = setTDocuments.filter(item => {
      return !item.selected;
    });
    setDocument(documents);
  };

  const handleselectedFile = e => {
    saveDocuments(e);
  };

  const closeSavePop = () => {
    setShowPopup(false);
  };

  const editDocument = () => {
    if (selectedDocument && selectedDocument.length === 1) {
      setSingleSelectedVal(selectedDocument[0]["_docname"]);
    } else {
      refe1.value = "";
      setSingleSelectedVal("");
    }
  };

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

  return (
    <div className={styles.documentsTableComponent}>
      <div>
        <h5>Documents</h5>
        <div>
          <img
            src={editt as string}
            height="18px"
            width="18px"
            className={styles.editIcons}
            alt="editicon"
            onMouseOver={() => iconOver("edit")}
            onMouseOut={() => iconOut("edit")}
            onClick={() => editDocument()}
          />
          <img
            src={deletee as string}
            height="18px"
            width="18px"
            className="deleteicons"
            alt="deleteicon"
            onMouseOver={() => iconOver("delete")}
            onMouseOut={() => iconOut("delete")}
            onClick={() => deleteDocuments()}
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
                ref={node => (refe1 = node)}
                value={singleSelectedVal.toString()}
                id="formGroupExampleInput"
                placeholder=" "
                onChange={e => changeDocument(e)}
                disabled={selectedDocument && selectedDocument.length !== 1}
              />
            </span>
            <span className={styles.iconContainer}>
              <img
                src={plus as string}
                height="18px"
                width="18px"
                className={styles.plusIcon}
                alt="plusicon"
                onMouseOver={() => iconOver("plus")}
                onMouseOut={() => iconOut("plus")}
                onClick={updateValue}
              />
              <input
                type="file"
                name=""
                id=""
                multiple
                onChange={e => {
                  setShowPopup(true);
                  let arr = [],
                    arr1 = [];
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
                    arr1.push({ obj });
                  }
                  setDragedFiles(arr);
                  setFormData(formData);
                  console.log(formData);
                  setInputMapData(arr1);
                  console.log("inputMapData", inputMapData);
                }}
              />
            </span>
          </div>
        </div>

        {showPopup ? (
          <div>
            <div className={styles.popupWrapper}>
              {/*<div className={styles.glasspane}></div>*/}
              {inputMapData.length &&
                inputMapData.map(file => {
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
                              {console.log(errors)}

                              <input
                                type="text"
                                // Tooltip settings
                                name="project"
                                onMouseEnter={() => {
                                  setDisplayDescription: true;
                                }}
                                onMouseLeave={() => {
                                  setDisplayDescription: false;
                                }}
                                onBlur={e => {
                                  let vv = validation(
                                    e.target.name,
                                    e.target.value,
                                    validationSchema
                                  );
                                  setErrors(vv);
                                  setDispalyError(false);
                                }}
                                onFocus={e => {
                                  if (errors[e.target.name]) {
                                    setDispalyError(true);
                                  }
                                }}
                                onChange={e => {
                                  let vv = validation(
                                    e.target.name,
                                    e.target.value,
                                    validationSchema
                                  );
                                  setErrors(vv);
                                  if (vv[e.target.name] !== "") {
                                    setDispalyError(true);
                                  } else {
                                    setDispalyError(false);
                                  }
                                }}
                                // ----------------
                                style={
                                  errors["project"]
                                    ? { border: "1px solid red" }
                                    : { border: "1px solid black" }
                                }
                                className={styles["ms-TextField-field"]}
                                id="formGroupExampleInput"
                                placeholder=" "
                                ref={c => (file.project = c)}
                              />
                              {/* Error Tooltip */}
                              {dispalyError && (
                                <Tooltip
                                  message={errors["project"]}
                                  title={"Error"}
                                />
                              )}
                              {/* Description Tooltip */}
                              {this.setDisplayDescription && (
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
                            ``
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
                            onClick={saveDocument}
                          >
                            Save
                          </button>

                          <button
                            className={styles["closePop"]}
                            onClick={() => {
                              closeSavePop();
                              setErrors({});
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
            setShowPopup(true);
            setDragedFiles(acceptedFiles);

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
                              defaultValue={allDefault}
                              checked={allSelected}
                              onChange={e => {
                                selectAllDocuments(allSelected);
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
                      {documents.map((row, index) => (
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
                                  selectDocument(e, row);
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
};
