import * as React from "react";
import styles from "../../helloWorld/components/HelloWorld.module.scss";
import { state, country, canadaStates, usStates } from "../../../data/Address";

export interface IAddressFormRowProps {}

export const AddressFormRow: React.FC<IAddressFormRowProps> = ({}) => {
  // hooks
  const [selectedCountry, setSelectedCountry] = React.useState(0);
  const [states, setStates] = React.useState([]);
  const [countries, setCountries] = React.useState(country);
  const [zipvalidator, setZipvalidator] = React.useState(true);
  const [homequatere, setHomequatere] = React.useState(false);

  React.useEffect(() => {
    selectedCountry === 0
      ? canadaStates
      : selectedCountry === 214
      ? usStates
      : [];
  }, [selectedCountry]);

  // functions
  const selectCountry = e => {
    setSelectedCountry(e.target.selectedIndex);
  };

  const getValidator = e => {
    if (e.target.value === "") {
      setZipvalidator(true);
      return;
    }
    e.target.value = e.target.value.trim();
    switch (selectedCountry) {
      case 214:
        setZipvalidator(/^[0-9]{5}(?:-[0-9]{4})?$/.test(e.target.value));
        return;
      case 0:
        if (e.target.value.length === 4) {
          const temp = e.target.value;
          e.target.value = temp.substring(0, 3) + " " + temp.substring(3);
        }
        setZipvalidator(
          /^(([A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d))$/.test(e.target.value)
        );
        return;
      default:
        setZipvalidator(true);
        return;
    }
  };

  const changeHomeQuarter = e => {
    setHomequatere(e.target.checked);
  };

  //   component
  return (
    <div>
      <h5 className={styles.formHeading}>Address</h5>
      <div className={`${styles.row} ${styles.addressRow}`}>
        <div className={styles.flex1}>
          <div className={styles["ms-TextField"]}>
            <label
              className={styles["ms-Label"]}
              htmlFor="formGroupExampleInput"
            >
              Address
            </label>
            <textarea
              rows={5}
              className={styles["ms-TextField-field"]}
              id="formGroupExampleInput"
              placeholder=""
            />
          </div>
        </div>
        <div className={styles.flex1}>
          <div>
            <div className={`${styles["ms-TextField"]} ${styles.city}`}>
              <label
                className={styles["ms-Label"]}
                htmlFor="formGroupExampleInput"
              >
                City/Municipality
              </label>
              <input
                type="text"
                className={styles["ms-TextField-field"]}
                id="formGroupExampleInput"
                placeholder=" "
              />
            </div>
          </div>
          <div>
            <div className={`${styles["ms-TextField"]} ${styles.province}`}>
              <label
                className={styles["ms-Label"]}
                htmlFor="formGroupExampleInput"
              >
                Province/State
              </label>
              {(selectedCountry === 0 || selectedCountry === 214) && (
                <select className={styles["ms-TextField-field"]}>
                  {states.map((v, i) => {
                    return (
                      <option key={i} value="i">
                        {v}
                      </option>
                    );
                  })}
                </select>
              )}
              {selectedCountry !== 0 && selectedCountry !== 214 && (
                <input
                  type="text"
                  className={styles["ms-TextField-field"]}
                  id="formGroupExampleInput"
                  placeholder="Enter a state "
                />
              )}
            </div>
          </div>
        </div>
        <div className={styles.flex1}>
          <div>
            <div className={`${styles["ms-TextField"]} ${styles.country}`}>
              <label
                className={styles["ms-Label"]}
                htmlFor="formGroupExampleInput"
              >
                Country
              </label>
              <select
                className={styles["ms-TextField-field"]}
                defaultValue="0"
                onChange={e => selectCountry(e)}
              >
                {countries.map((v, i) => {
                  return (
                    <option key={i} value={i}>
                      {v}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div>
            <div className={`${styles["ms-TextField"]} ${styles.postalcode}`}>
              <label
                className={styles["ms-Label"]}
                htmlFor="formGroupExampleInput"
              >
                Postal/Zip Code
              </label>
              <input
                type="text"
                className={styles["ms-TextField-field"]}
                maxLength={10}
                id="formGroupExampleInput"
                placeholder=""
                onChange={e => getValidator(e)}
              />
              {!zipvalidator && "Invalid zip code entered"}
            </div>
          </div>
        </div>
      </div>
      <div className={` ${styles.row} ${styles.homeQuarterRow}`}>
        <div className={styles.flex1}>
          <div className={styles["ms-TextField"]}>
            <label
              className={styles["ms-Label"]}
              htmlFor="formGroupExampleInput"
            >
              Home Quarter
            </label>
            <input
              type="text"
              className={styles["ms-TextField-field"]}
              id="formGroupExampleInput"
              placeholder=" "
              disabled={homequatere}
            />
          </div>
        </div>
        <div className={styles.flex2}>
          <div
            className={`${styles["ms-CheckBoxField"]} ${styles.alignCheckbox} `}
          >
            <span>
              <input
                className={styles["ms-TextField"]}
                type="checkbox"
                id="gridCheck"
                onChange={e => changeHomeQuarter(e)}
              />
            </span>
            <span>Residence is the same as listed address</span>

            {/* <label className={styles.label} className="form-check-residence" htmlFor="gridCheck"> */}
          </div>
        </div>
        <div className={styles.flex1}></div>
      </div>
      <hr className={styles.horizontalSeparator} />
    </div>
  );
};
