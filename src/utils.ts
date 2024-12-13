export type ValidationResult = {
  is_valid: boolean;
  reason?:
    | "Invalid length. Must be 13 digits"
    | "Must contain only numeric digits"
    | "Invalid check digit"
    | "Must be a string";
};

export function validateThaiCitizenId(id: string): ValidationResult {
  if (id == null) {
    return { is_valid: false, reason: "Must be a string" };
  }

  id = id.trim();

  if (id.length !== 13) {
    return { is_valid: false, reason: "Invalid length. Must be 13 digits" };
  }

  if (!/^\d+$/.test(id)) {
    return { is_valid: false, reason: "Must contain only numeric digits" };
  }

  const digits = id.split("").map(Number);
  const sum = digits
    .slice(0, 12)
    .reduce((acc, digit, index) => acc + digit * (13 - index), 0);
  const checkDigit = (11 - (sum % 11)) % 10;

  if (checkDigit !== digits[12]) {
    return { is_valid: false, reason: "Invalid check digit" };
  }

  return { is_valid: true };
}
