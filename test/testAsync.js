
async function sum (a, b) {
  return a + b
}

test('adds 1 + 2 to equal 3', () => {
  return sum(1, 2).then(data => {
    expect(data).toBe(3)
  })
})
