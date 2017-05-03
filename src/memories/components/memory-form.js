import { h, Component } from 'preact' /** @jsx h */
import { Field, FieldArray } from 'redux-form'
import * as paths from '~src/paths'
import { COUNTRIES } from '~src/memories/constants'
import { ButtonPrimary, SectionHeader, SectionPrimary } from '~src/views/components'
import {
  Form,
  CheckboxField,
  RadioField,
  SelectField,
  TextField,
  UploadField,
  UploadMultiplesField,
} from '~src/views/components/form'
import AlertBox from './alert-box'

class MemoryForm extends Component {

  render() {
    const {
      victimName,
      authorizedToSite,
      handleSubmit,
      error,
      submitSucceeded,
    } = this.props

    if (submitSucceeded) {
      return (
        <AlertBox
          done={() => {
            window.location.href = paths.home()
          }}
        >
          <h1>Sua página foi publicada!</h1>
          <p>
            Se você quiser editá-la ou visualizá-la novamente, é só seguir as informações que
            acabamos de enviar por e-mail. Qualquer dúvida, entre em contato com a gente
            em <a
              href="mailto:contato@instintodevida.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              contato@instintodevida.org
            </a>
          </p>
        </AlertBox>
      )
    }

    const currentYear = new Date().getFullYear()

    return (
      <Form error={error} handleSubmit={handleSubmit}>
        <SectionPrimary
          className="section--about-you"
          header={<SectionHeader title="Sobre você" />}
        >
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
            component={SelectField}
          >
            {COUNTRIES.map(country => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </Field>
        </SectionPrimary>
        <SectionPrimary
          className="section--about-victim"
          header={<SectionHeader title="Sobre a pessoa que você quer homenagear" />}
        >
          <Field
            label="Nome*"
            name="victimName"
            type="text"
            component={TextField}
          />
          <Field
            label="Ano em que nasceu*"
            name="victimBornAt"
            component={SelectField}
          >
            {Array(75).fill('').map((e, index) => {
              const year = currentYear - index
              return (
                <option key={`victim-born-year-${year}`} value={year}>
                  {year}
                </option>
              )
            })}
          </Field>
          <Field
            label="Ano do assassinato*"
            name="victimDeadAt"
            component={SelectField}
          >
            {Array(75).fill('').map((e, index) => {
              const year = currentYear - index
              return (
                <option key={`victim-dead-year-${year}`} value={year}>
                  {year}
                </option>
              )
            })}
          </Field>
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
          {!victimName ? <div /> : (
            <Field
              label={`Quando eu penso em ${victimName} eu me lembro de*`}
              name="victimRememberText"
              type="text"
              component={TextField}
              multiline
            />
          )}
          {!victimName ? <div /> : (
            <Field
              label={
                'Se eu pudesse escolher uma palavra para ' +
                `descrever ${victimName}, eu escolheria`
              }
              name="victimGoodWords"
              type="text"
              component={TextField}
            />
          )}
          {!victimName ? <div /> : (
            <Field
              label={`Foto de ${victimName}`}
              name="victimPhoto"
              id="victimPhoto"
              component={UploadField}
            />
          )}
          <FieldArray
            withRef
            label="Galeria de imagens"
            name="memoryAssets"
            component={UploadMultiplesField}
          />
          <Field
            label="Silhueta"
            name="victimSilhouette"
            component={RadioField.Field}
            className="columns is-multiline is-mobile"
            optionsHeight="200px"
            optionsClassName="column is-half"
          >
            <RadioField.Button
              src="/img/silhouette-orange-form.svg"
              alt="Silhueta 1"
              value="1"
            />
            <RadioField.Button
              src="/img/silhouette-blue-form.svg"
              alt="Silhueta 2"
              value="2"
            />
          </Field>
          <Field
            name="authorizedToSite"
            component={CheckboxField}
          >
            Autorizo a divulgação dessa homenagem
            no site <span className="color--primary">#VivosEmNós</span>
          </Field>
        </SectionPrimary>

        <ButtonPrimary
          TagName="button"
          disabled={!authorizedToSite}
          type="submit"
        >
          Publique sua homenagem
        </ButtonPrimary>
      </Form>
    )
  }
}

export default MemoryForm
