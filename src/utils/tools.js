const repo = exports
// Default value
repo.someOrElse = function (value, initValue) {
  if (value) {
    return value
  } else {
    return initValue
  }
}
