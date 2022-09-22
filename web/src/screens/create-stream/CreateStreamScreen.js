import React from 'react'
import { Section, StreamForm } from '../../components'

function CreateStreamScreen() {
  return (
    <>
      <Section title="Create Stream" icon="edit">
        <StreamForm />
      </Section>
    </>
  )
}

export default CreateStreamScreen