module.exports = {
  files: [
    {
      path: "./dist/index.js",
      maxSize: "5kB",
    },
    {
      path: "./dist/index.mjs",
      maxSize: "5kB",
    },
  ],
  ci: {
    trackBranches: ["main"],
  },
};
