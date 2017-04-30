import { h } from 'preact' /** @jsx h */
import { Field } from 'redux-form'
import {
  Form,
  Button,
  Section,
  CheckboxField,
  TextField,
  SelectField,
  UploadFileField,
} from './forms'
import AlertBox from './alert-box'
import { COUNTRIES } from '../constants'
import * as paths from '../../paths'


export default ({
  ownerFirstName,
  authorizedToSite,
  handleSubmit,
  error,
  submitSucceeded,
}) => submitSucceeded ? (
  <AlertBox
    done={() => {
      window.location.href = paths.home()
    }}
  >
    <h1>Sua página foi publicada!</h1>
    <p>
      Se você quiser editá-la ou visualizá-la novamente,
      é só seguir as informações que acabamos de enviar por
      e-mail. Qualquer dúvida, entre em contato com a gente
      em <a href="mailto:contato@instintodevida.org" target="_blank">contato@instintodevida.org</a>
    </p>
  </AlertBox>
) : (
  <Form error={error} handleSubmit={handleSubmit}>
    <Section header="Sobre você">
      <Field
        label="Nome*"
        name="ownerFirstName"
        type="text"
        component={TextField}
      />
      <Field
        label="Sobrenome*"
        name="ownerLastName"
        type="text"
        component={TextField}
      />
      <Field
        label="E-mail*"
        name="ownerEmail"
        type="email"
        component={TextField}
      />
      <Field
        label="País*"
        name="ownerCountry"
        hintText="Selecione o país"
        component={SelectField}
      >
        {COUNTRIES.map(c => <option key={c.code} value={c.name}>{c.name}</option>)}
      </Field>
    </Section>

    <Section header="Sobre a pessoa que você quer homenagear">
      <Field
        label="Nome*"
        name="victimName"
        type="text"
        component={TextField}
      />
      <Field
        label="Ano em que nasceu*"
        name="victimBornAt"
        type="number"
        component={TextField}
      />
      <Field
        label="Ano do assassinato*"
        name="victimDeadAt"
        type="number"
        component={TextField}
      />
      <Field
        label="Cidade onde morreu*"
        name="victimCity"
        type="text"
        component={TextField}
      />
      <Field
        label="O que aconteceu?*"
        name="victimHistory"
        type="text"
        component={TextField}
        multiline
      />
      <Field
        label={`Quando eu penso em ${ownerFirstName} eu me lembro de*`}
        name="victimRememberText"
        type="text"
        component={TextField}
        multiline
      />
      <Field
        label={`Se eu pudesse escolher uma palavra para descrever ${ownerFirstName}, eu escolheria`}
        name="victimGoodWords"
        type="text"
        component={TextField}
      />
      <Field
        label={`Foto de ${ownerFirstName}`}
        name="victimPhoto"
        component={UploadFileField}
      />
      <Field
        label="Silhueta"
        name="victimSilhouette"
        type="text"
        component={TextField}
      />
      <Field name="authorizedToSite" component={CheckboxField}>
        Autorizo a divulgação dessa homenagem no site #VivosEmNós
      </Field>
    </Section>

    <Button disabled={!authorizedToSite} type="submit">Publique sua homenagem</Button>
  </Form>
)
