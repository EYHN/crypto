module.exports = {
  testMatch: ["<rootDir>/**/test/*.ts"],
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsConfig: __dirname + '/test/tsconfig.json'
    }
  }
};