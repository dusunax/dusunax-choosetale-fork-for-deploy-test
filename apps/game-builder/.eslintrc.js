module.exports = {
  extends: ["@repo/eslint-config/next.js"],
  settings: {
    "import/resolver": {
      typescript: {
        project: ["packages/ui"],
      },
    },
  },
};
