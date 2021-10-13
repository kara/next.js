import { MaybeDeferContentHook } from '../shared/lib/utils'
import { DEFERRED_CONTENT_PLACEHOLDER } from '../shared/lib/constants'
import React from 'react'

/**
 * This function generates a useMaybeDeferContent hook based on whether the
 * content should be deferred.
 */
export function generateMaybeDeferContent(
  isDeferred: boolean
): MaybeDeferContentHook {
  return isDeferred ? deferContent : renderContent
}

function deferContent(
  name: string,
  contentFn: () => JSX.Element
): [boolean, JSX.Element] {
  const placeholder = (
    <>
      {DEFERRED_CONTENT_PLACEHOLDER}__{name}
    </>
  )
  return [true, placeholder]
}

function renderContent(
  _name: string,
  contentFn: () => JSX.Element
): [boolean, JSX.Element] {
  return [false, contentFn()]
}
