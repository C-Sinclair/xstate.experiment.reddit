
import { test, suite } from 'uvu';
import * as assert from 'uvu/assert';
import { interpret } from 'xstate';
import { redditMachine } from '../src/machine.js';
import fetch from 'node-fetch'

const TestSuite = suite('reddit machine')

TestSuite.before(() => {
  global.fetch = fetch
})

TestSuite('load reddit posts', () => {
  const redditService = interpret(redditMachine)
    .onTransition(state => {
      if (state.matches({ selected: 'loaded' })) {
        assert.is.not(state.context.posts, [])
      }
    })
    .start()
  redditService.send('SELECT', {
    name: 'reactjs'
  })
})

TestSuite.run()