export const formErrors = {
  VALUE_MISSING: "This is required",
  PASSWORD_MISMATCH: "Passwords must match",
  NOT_PASSWORD:
    "The password must contain at least one number, a capital letter and a minimum of 6 characters",
  NOT_EMAIL: "This must be an email",
  LENGTH_BELOW_MIN: "This must be at least {{min}} characters",
  ROLE_MISSING: "A role must be selected",
  MISSING_CAPS: "Password should contain at least 1 upper letter",
  MISSING_NUMBERS: "Password should contain at least 1 number",
  WHITE_SPACES: "Password can't contain any white spaces",
  NUMERIC_SEQUENCE: "This must be a sequence of numbers",
};

export const formatError = (objOrCode: { type: string }) => {
  try {
    const { type: code, ...args } = objOrCode;
    const template = formErrors[code as keyof typeof formErrors] || code;
    return Object.entries(args).reduce((acc, [key, val]) => {
      return acc.replace(`{{${key}}}`, val);
    }, template);
  } catch (e) {
    console.error("formaError failed, args", objOrCode);
    throw e;
  }
};
