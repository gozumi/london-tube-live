import { cucumber } from 'gherkin-jest'

cucumber.defineCreateWorld(() => {
  return {
    a: null,
    answer: null,
    b: null
  }
})

cucumber.defineRule('I have numbers {int} and {int}', (world, a, b) => {
  world.a = a
  world.b = b
})

cucumber.defineRule('I add them', (world) => {
  world.answer = world.a + world.b
})

cucumber.defineRule('I get {int}', (world, answer) => {
  expect(world.answer).toBe(answer)
})
