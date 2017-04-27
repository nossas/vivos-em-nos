import { h } from 'preact' /** @jsx h */
import { Field } from 'redux-form'

import { Button, Section, TextField, SelectField } from './forms'
import { COUNTRIES } from '../constants'

export default ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Section header='Sobre você'>
      <Field
        label='Nome*'
        name='ownerFirstName'
        type='text'
        component={TextField}
      />
      <Field
        label='Sobrenome*'
        name='ownerLastName'
        type='text'
        component={TextField}
      />
      <Field
        label='E-mail*'
        name='ownerEmail'
        type='email'
        component={TextField}
      />
      <Field label='País*' name='ownerCountry' component={SelectField}>
        {COUNTRIES.map(c => <option key={c.code} value={c.name}>{c.name}</option>)}
      </Field>
    </Section>

    <Section header='Sobre a pessoa que você quer homenagear'>
      <Field
        label='Nome*'
        name='victimName'
        type='text'
        component={TextField}
      />
      <Field
        label='Ano em que nasceu*'
        name='victimBornAt'
        type='number'
        component={TextField}
      />
      <Field
        label='Ano do assassinato*'
        name='victimDeadAt'
        type='number'
        component={TextField}
      />
      <Field
        label='Cidade onde morreu*'
        name='victimCity'
        type='text'
        component={TextField}
      />
      <Field
        label='O que aconteceu?*'
        name='victimHistory'
        type='text'
        component={TextField}
        multiline={true}
      />
      <Field
        label={`Quando eu penso em [FNAME] eu me lembro de*`}
        name='victimRememberHistory'
        type='text'
        component={TextField}
        multiline={true}
      />
      <Field
        label={`Se eu pudesse escolher uma palavra para descrever [FNAME], eu escolheria`}
        name='victimGoodWords'
        type='text'
        component={TextField}
      />
    </Section>

    <Button type='submit'>Publique sua homenagem</Button>
  </form>
)
