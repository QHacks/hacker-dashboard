module.exports = {
  env: {
    test: {
      presets: [
        [
          "@babel/preset-env",
          {
            useBuiltIns: "entry"
          }
        ],
        "@babel/preset-react"
      ],
      plugins: ["emotion"]
    }
  }
};
