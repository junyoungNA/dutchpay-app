// module.exports = {
//   // 기존 설정...

//   // TypeScript 파일 확장자를 Jest가 이해할 수 있도록 설정
//   moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
//   // ts-jest를 프리셋으로 사용하도록 설정
//   preset: 'ts-jest',
//   setupFilesAfterEnv:  ['./jest-setup.js'], //jest-dom 설정
//   testEnvironment: 'jsdom',
//   // Transform 설정: .tsx 파일을 ts-jest로 컴파일
//   transform: {
//     '^.+\\.tsx?$': 'ts-jest',
//   },
//   // TypeScript 컴파일러 설정
//   globals: {
//     'ts-jest': {
//       tsconfig: './tsconfig.json', // tsconfig.json 파일 경로
//     },
//   },
// };

module.exports = {
  preset: 'ts-jest',
  // verbose: true,
  // moduleNameMapper: {
  //   "^.+\\.(css|less|scss)$": "identity-obj-proxy",
  // },
  // moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: ["/node_modules/(?!(react-bootstrap-tagsinput))"],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
    },
  },
}

