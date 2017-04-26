import { h } from 'preact' /** @jsx h */
import { Field } from 'redux-form'

import { Button, Section, TextField, SelectField } from './forms'
import { COUNTRIES } from '../constants'

export default ({ handleSubmit }) => (
  <form onSubmit={handleSubmit(values => console.log(values))}>
    <Section header='Sobre você'>
      <Field
        label='Nome*'
        name='firstName'
        type='text'
        component={TextField}
      />
      <Field
        label='Sobrenome*'
        name='lastName'
        type='text'
        component={TextField}
      />
      <Field
        label='E-mail*'
        name='email'
        type='email'
        component={TextField}
      />
      <Field label='País*' name='country' component={SelectField}>
        {COUNTRIES.map(c => <option key={c.code} value={c.name}>{c.name}</option>)}
      </Field>
    </Section>
    <Button type='submit'>Publique sua homenagem</Button>
  </form>
)
