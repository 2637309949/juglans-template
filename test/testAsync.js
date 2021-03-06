// Copyright (c) 2018-2020 Double.  All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.

async function sum (a, b) {
  return a + b
}

test('adds 1 + 2 to equal 3', () => {
  return sum(1, 2).then(data => {
    expect(data).toBe(3)
  })
})
