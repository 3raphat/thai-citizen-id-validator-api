import { describe, expect, it } from "bun:test";
import { validateThaiCitizenId, type ValidationResult } from "../src/utils";

type TestCase = {
  id: string;
  description: string;
  expectedResult: ValidationResult;
};

describe("Thai Citizen ID Validation", () => {
  // Valid cases
  const validTestCases = ["1234567890121", "1112034563562", "1100701245678"];

  validTestCases.forEach((id) => {
    it(`should return true for a valid ID: ${id}`, () => {
      const result = validateThaiCitizenId(id);
      expect(result).toEqual({ is_valid: true });
    });
  });

  // Invalid cases
  const invalidTestCases: TestCase[] = [
    {
      id: "abcdefghijklm",
      description: "non-numeric characters",
      expectedResult: {
        is_valid: false,
        reason: "Must contain only numeric digits",
      },
    },
    {
      id: "123abc456def7",
      description: "mixed numeric and non-numeric characters",
      expectedResult: {
        is_valid: false,
        reason: "Must contain only numeric digits",
      },
    },
    {
      id: "123",
      description: "too short",
      expectedResult: {
        is_valid: false,
        reason: "Invalid length. Must be 13 digits",
      },
    },
    {
      id: "11017002070301",
      description: "too long",
      expectedResult: {
        is_valid: false,
        reason: "Invalid length. Must be 13 digits",
      },
    },
    {
      id: "1101700207031",
      description: "incorrect check digit",
      expectedResult: { is_valid: false, reason: "Invalid check digit" },
    },
  ];

  invalidTestCases.forEach(({ id, description, expectedResult }) => {
    it(`should return false for an invalid ID (${description}): ${id}`, () => {
      const result = validateThaiCitizenId(id);
      expect(result).toEqual(expectedResult);
    });
  });

  // Edge cases
  const edgeTestCases: TestCase[] = [
    {
      id: "  1100701245678  ",
      description: "whitespace around a valid ID",
      expectedResult: {
        is_valid: true,
      },
    },
    {
      id: "",
      description: "empty string",
      expectedResult: {
        is_valid: false,
        reason: "Invalid length. Must be 13 digits",
      },
    },
    {
      id: null as unknown as string,
      description: "null input",
      expectedResult: {
        is_valid: false,
        reason: "Must be a string",
      },
    },
    {
      id: undefined as unknown as string,
      description: "undefined input",
      expectedResult: {
        is_valid: false,
        reason: "Must be a string",
      },
    },
    {
      id: "!@#1234567890",
      description: "special characters in ID",
      expectedResult: {
        is_valid: false,
        reason: "Must contain only numeric digits",
      },
    },
  ];

  edgeTestCases.forEach(({ id, description, expectedResult }) => {
    it(`should handle edge cases (${description}): ${id}`, () => {
      const result = validateThaiCitizenId(id);
      expect(result).toEqual(expectedResult);
    });
  });
});
