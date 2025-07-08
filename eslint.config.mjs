import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "**/build/",
      "**/bundle*/",
      "**/lib/",
      "**/node_modules/**",
      "./*.conf*.js"
    ],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      "no-extra-boolean-cast": "warn",
      "prefer-const": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/member-ordering": "warn",
    },
  }
);
