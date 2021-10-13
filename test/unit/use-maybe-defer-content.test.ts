/* eslint-env jest */
import { generateMaybeDeferContent } from 'next/dist/server/use-maybe-defer-content'
import { DEFERRED_CONTENT_PLACEHOLDER } from 'next/dist/shared/lib/constants'
import React from 'react'

describe('useMaybeDeferContent', () => {
  it('returns raw content when isDeferred is false', () => {
    const useMaybeDeferContent = generateMaybeDeferContent(false)

    const rawContent = React.createElement('p', {}, 'hello world')
    const [isDeferred, content] = useMaybeDeferContent('TEST', () => rawContent)
    expect(isDeferred).toBe(false)
    expect(content).toBe(rawContent)
  })

  it('returns a placeholder when isDeferred is true', () => {
    const useMaybeDeferContent = generateMaybeDeferContent(true)

    const name = 'TEST'
    const rawContent = React.createElement('p', {}, 'hello world')
    const placeholder = React.createElement(
      React.Fragment,
      null,
      DEFERRED_CONTENT_PLACEHOLDER,
      '__',
      name
    )
    const [isDeferred, content] = useMaybeDeferContent(name, () => rawContent)

    expect(isDeferred).toBe(true)
    expect(content).toEqual(placeholder)
  })
})
