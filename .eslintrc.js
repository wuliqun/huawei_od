module.exports = {
  root: true,
  ignorePatterns: ["node_modules"],
  rules: {
    "semi": ["warn"],
    "linebreak-style": [0, "unix"],
    "space-infix-ops": ["warn", { "int32Hint": false }],
    // 缩进一致
    "indent": ["warn", 2],
    // 键和值之间使用一致的空格
    "key-spacing": [
      "warn",
      {
        beforeColon: false,
        afterColon: true,
      },
    ],
    // 花括号中使用一致的空格
    "object-curly-spacing": ["warn", "always"],
    // 花括号中换行一致
    // "object-curly-newline": [ "warn", { multiline: true, consistent: true } ],
    "object-curly-newline": [
      "warn",
      {
        multiline: true,
        minProperties: 3,
      },
    ],
    // 对象多行属性时, 末尾加上逗号
    "comma-dangle": ["warn", "always-multiline"],
    // 逗号后使用一致空格
    "comma-spacing": ["warn", { before: false, after: true }],
    // "array-bracket-spacing": [ "warn", "always" ],
    // 结尾加上分号
    // semi: ["warn", "always"],
    // 禁止重复case
    "no-duplicate-case": "error",
    // 禁止对象定义重复属性
    "no-dupe-keys": "error",
    // 禁止对 function 声明重新赋值
    "no-func-assign": "error",
    // 禁止不规则的空白
    "no-irregular-whitespace": "warn",
    // 禁用稀疏数组
    "no-sparse-arrays": "warn",
    // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
    "no-unreachable": "error",
    "no-constant-condition": "warn",
    // 强制 typeof 表达式与有效的字符串进行比较
    "valid-typeof": "error",
    "no-useless-escape": "warn",
  },
  parser: "@typescript-eslint/parser",
};
