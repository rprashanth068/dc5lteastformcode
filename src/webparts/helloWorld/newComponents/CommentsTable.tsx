import * as React from "react";

import styles from "../../helloWorld/components/HelloWorld.module.scss";

const edit_ico = require("../../../icons/NRD-00001_02013_ICO_Edit 52525b_001.svg");
const delete_ico = require("../../../icons/NRD-00001_02013_ICO_Delete 52525b_001.svg");
const delete_icon = require("../../../icons/NRD-00001_02013_ICO_Delete ff6600_001.svg");
const edit_icon = require("../../../icons/NRD-00001_02013_ICO_Edit ff6600_001 (1).svg");

const plus_ico = require("../../../icons/NRD-00001_02013_ICO_New 52525b_001.svg");
const plus_icon = require("../../../icons/NRD-00001_02013_ICO_New ff6600_001 (2).svg");

import { comments } from "../../../data/data";

export interface ICommentsTableProps {}

export const CommentsTable: React.FC<ICommentsTableProps> = ({}) => {
  const [editt, setEditt] = React.useState(edit_ico);
  const [deletee, setDeletee] = React.useState(delete_ico);
  const [plus, setPlus] = React.useState(plus_ico);

  const [selectedComment, setSelectedComment] = React.useState([
    {
      id: "",
      gcomment: "",
      date: "",
      who: ""
    }
  ]);
  const [comment, setComment] = React.useState(comments);
  const [tComments, setTComments] = React.useState([]);
  const [allSelected, setAllSelected] = React.useState(false);
  const [allDefault, setAllDefault] = React.useState(false);
  let refe2;

  React.useEffect(() => {
    if (selectedComment.length > 1) {
      refe2.value = "";
    }
  }, [selectedComment]);

  // this is triggered when mouse is moved over an icon
  const iconOver = type => {
    switch (type) {
      case "edit":
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
      case "edit":
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

  // this will save the comments in state
  const saveComments = () => {
    tComments.map(c => {
      c.gcomment = c._gcomment ? c._gcomment : c.gcomment;
    });
    setComment(tComments);
  };

  // this will change the already added comment
  const changeComment = event => {
    let e = event.target.value;
    event.preventDefault();
    //let me = this;
    let _tcoment1 = comment;
    /** Mutablity isssue  */
    //_tcoment1 = Array.from(comments);
    let t = {};
    _tcoment1.forEach(c => {
      if (c.id === selectedComment["id"]) {
        c._gcomment = e;
        t = c;
      }
    });
    setSelectedComment(tComments);
    setTComments(_tcoment1);
  };

  const selectComment = (event, row) => {
    row._gcomment = row.gcomment;
    comments.map(c => {
      if (c.id === row.id) {
        c.selected = event.target.checked;
        if (c.selected) {
          selectedComment.push(row);
          setSelectedComment(selectedComment);
        } else {
          const filterDocs = selectedComment.filter(x => x.id === row.id);
          setSelectedComment(filterDocs);
        }
      }
    });
  };

  const selectAllComments = val => {
    let _allSelected = !allSelected;
    setAllSelected(_allSelected);
    let updatedComments = comments.map(c => {
      c.selected = _allSelected;
      return c;
    });
    setComment(updatedComments);
  };

  const deleteComments = () => {
    const _comments = comments.filter(item => {
      return !item.selected;
    });
    setComment(_comments);
  };

  return (
    <div>
      <h5 className={styles.commentsLabel}>Comments</h5>
      <div>
        <img
          src={editt as string}
          height="18px"
          width="18px"
          className={styles.editIcons}
          alt="editicon"
          onMouseOver={() => iconOver("edit")}
          onMouseOut={() => iconOut("edit")}
        />

        <img
          src={deletee as string}
          height="18px"
          width="18px"
          className="deleteicons"
          alt="deleteicon"
          onMouseOver={() => iconOver("delete")}
          onMouseOut={() => iconOut("delete")}
          onClick={() => deleteComments()}
        />
      </div>
      <div
        className={`${styles["ms-TextField"]} ${styles.customFormInputContainer}`}
      >
        <div className={styles.customFormInput}>
          <span className={styles.inputContainer}>
            <input
              type="text"
              className={`${styles["ms-TextField-field"]} ${styles["table-input"]}`}
              ref={node => (refe2 = node)}
              value={selectedComment["_gcomment"]}
              id="formGroupExampleInput"
              placeholder=" "
              onChange={e => changeComment(e)}
            />
          </span>
          <span className={styles.iconContainer}>
            <img
              src={plus as string}
              height="18px"
              width="18px"
              className="plusicon"
              alt="plusicon"
              onMouseOver={() => iconOver("plus")}
              onMouseOut={() => iconOut("plus")}
              onClick={saveComments}
            />
          </span>
        </div>
      </div>

      <div className={`${styles.commentsTable}`}>
        <table className={styles["table-Head"]}>
          <thead>
            <tr>
              <th>
                <div className="form-check form-check-align">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                    name="comment_chk"
                    // defaultValue={allDefault as boolean}
                    checked={allSelected}
                    onChange={e => {
                      selectAllComments(allSelected);
                    }}
                  />
                </div>
              </th>
              <th>General comment regarding Individual</th>
              <th>Date</th>
              <th>Who</th>
            </tr>
          </thead>
        </table>
      </div>

      <div className={` ${styles["scroll-table"]} ${styles.commentsTable}`}>
        <table className={styles["table-Body"]}>
          <tbody>
            {comments.map((row, index) => (
              <tr
                key={index}
                className={`${row.selected ? styles.rowSelected : ""} ${
                  styles.rowHover
                }`}
              >
                <td>
                  <div className="form-check form-check-align">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck"
                      name="comment_chk"
                      defaultValue={row.selected}
                      checked={row.selected}
                      onChange={e => {
                        selectComment(e, row);
                      }}
                    />
                  </div>
                </td>

                <td>{row.gcomment}</td>

                <td>{row.date}</td>

                <td>{row.who}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr className={styles.horizontalSeparator} />
    </div>
  );
};
