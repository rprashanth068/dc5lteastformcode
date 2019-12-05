export const validation = (name, value, validationSchema) => {
  let error = "";
  let errors = [];

  // Required
  if (validationSchema[name].required) {
    if (!value) {
      error = "This is required field.";
    } else {
      error = "";
    }
  }
  // Type validation
  if (validationSchema[name].type) {
    // Type String
    if (validationSchema[name].type === "string") {
      const reg = /.*/;
      if (value && !reg.test(value)) {
        error = `this is not string`;
      }
      // minlength and maxLength
      if (
        validationSchema[name].minLength &&
        !validationSchema[name].maxLength
      ) {
        if (typeof validationSchema[name].minLength === "number") {
          const a = validationSchema[name].minLength;
          if (value.length < a) {
            error = `less than ${a} charecter`;
          }
        }
      }
      if (
        validationSchema[name].maxLength &&
        !validationSchema[name].minLength
      ) {
        if (typeof validationSchema[name].maxLength === "number") {
          const a = validationSchema[name].maxLength;
          if (value.length > a) {
            error = `More than ${a} charecter`;
          }
        }
      }
      if (
        validationSchema[name].maxLength &&
        validationSchema[name].minLength
      ) {
        if (typeof validationSchema[name].maxLength === "number") {
          const a = validationSchema[name].maxLength;
          const b = validationSchema[name].minLength;
          if (value.length > a) {
            error = `More than ${a} charecter`;
          } else if (value.length < b) {
            error = `less than ${b} charecter`;
          } else {
            error = "";
          }
        }
      }
    }
    // Type Number
    else if (validationSchema[name].type === "number") {
      const reg = /^[0-9]*$/;
      if (value && !reg.test(value)) {
        error = `this is not number`;
      }
      // Min and Max
      if (value) {
        if (validationSchema[name].min && !validationSchema[name].max) {
          if (typeof validationSchema[name].min === "number") {
            const a = validationSchema[name].min;
            if (value < a) {
              error = `smaller than ${a} charecter`;
            }
          }
        }
        if (validationSchema[name].max && !validationSchema[name].min) {
          if (typeof validationSchema[name].max === "number") {
            const a = validationSchema[name].max;
            if (value > a) {
              error = `biger than ${a} charecter`;
            }
          }
        }
        if (validationSchema[name].max && validationSchema[name].min) {
          if (typeof validationSchema[name].max === "number") {
            const a = validationSchema[name].max;
            const b = validationSchema[name].min;
            if (value > a) {
              error = `bigger than ${a}`;
              errors = { ...errors, [name]: error };
            } else if (value < b) {
              error = `smaller than ${b}`;
            }
          }
        }
      }
    }
    // Type Date
    else if (validationSchema[name].type === "date") {
      const reg = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
      if (value && !reg.test(value)) {
        error = `this is not date`;
      }
    }
    // Type Email
    else if (validationSchema[name].type === "email") {
      const reg = /^(([^<>()\\]\\.,;:\s@"]+(\.[^<>()\\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (value && !reg.test(value)) {
        error = `this is not email`;
      }
    }
    // Type Phone Number
    else if (validationSchema[name].type === "phone") {
      const reg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if (value && !reg.test(value)) {
        error = `this is not phone number`;
      }
    }
  }

  // Regex validation
  if (
    validationSchema[name].validator !== null &&
    typeof validationSchema[name].validator === "object"
  ) {
    if (value && !validationSchema[name].validator.regEx.test(value)) {
      error = validationSchema[name].validator.error;
    }
  }

  errors = { ...errors, [name]: error };

  return errors;
};
