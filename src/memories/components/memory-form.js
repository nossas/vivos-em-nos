import { h, Component } from 'preact' /** @jsx h */
import { FormattedMessage } from 'react-intl'
import { Field, FieldArray } from 'redux-form'
import * as paths from '~src/paths'
import * as string from '~src/utils/string'
import { COUNTRIES } from '~src/memories/constants'
import { ButtonPrimary, SectionHeader, SectionPrimary } from '~src/views/components'
import {
  Form,
  CheckboxField,
  RadioField,
  SelectField,
  TextField,
  TextareaField,
  UploadField,
  UploadMultiplesField,
} from '~src/views/components/form'
import AlertBox from './alert-box'

class MemoryForm extends Component {

  onSubmit(values) {
    return this.props.onSave(values)
      .then(({ memory }) => this.setState({
        redirect: string.slugify(memory.victimName),
      }))
  }

  render() {
    const {
      victimName,
      handleSubmit,
      error,
      submitSucceeded,
    } = this.props

    if (submitSucceeded) {
      return (
        <AlertBox
          next={() => {
            if (this.state.redirect) {
              window.location.href = paths.memory(this.state.redirect)
            } else {
              window.location.href = paths.home()
            }
          }}
        >
          <h1>Sua página<br />foi publicada!</h1>
          <p>
            Se você quiser editá-la ou visualizá-la novamente, é só seguir as informações que
            acabamos de enviar por e-mail. Qualquer dúvida, entre em contato com a gente
            em <a
              href="mailto:contato@instintodevida.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <a href="mailto:contato@instintodevida.org">contato@instintodevida.org</a>
            </a>
          </p>
        </AlertBox>
      )
    }

    const currentYear = new Date().getFullYear()

    return (
      <Form error={error} onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <SectionPrimary
          className="section--about-you"
          articleClassName="columns is-multiline"
          header={
            <SectionHeader
              title={
                <FormattedMessage
                  id="components--memory-form.section--about-you.header"
                  defaultMessage="Sobre você"
                />
              }
            />
          }
        >
          <Field
            label={
              <FormattedMessage
                id="components--memory-form.section--about-you.owner-first-name"
                defaultMessage="Nome*"
              />
            }
            name="ownerFirstName"
            type="text"
            component={TextField}
            formGroupClassName="column is-half-desktop"
          />
          <Field
            label={
              <FormattedMessage
                id="components--memory-form.section--about-you.owner-last-name"
                defaultMessage="Sobrenome*"
              />
            }
            name="ownerLastName"
            type="text"
            component={TextField}
            formGroupClassName="column is-half-desktop"
          />
          <Field
            label={
              <FormattedMessage
                id="components--memory-form.section--about-you.owner-email"
                defaultMessage="E-mail*"
              />
            }
            name="ownerEmail"
            type="email"
            component={TextField}
            formGroupClassName="column is-12"
          />
          <Field
            label={
              <FormattedMessage
                id="components--memory-form.section--about-you.owner-country"
                defaultMessage="País*"
              />
            }
            name="ownerCountry"
            component={SelectField}
            formGroupClassName="column is-12"
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
          articleClassName="columns is-multiline"
          header={<SectionHeader title="Sobre a pessoa que você quer homenagear" />}
        >
          <Field
            label="Nome*"
            name="victimName"
            type="text"
            component={TextField}
            formGroupClassName="column is-12"
          />
          <Field
            label="Ano em que nasceu*"
            name="victimBornAt"
            component={SelectField}
            formGroupClassName="column is-half-desktop"
          >
            {Array(117).fill('').map((e, index) => {
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
            formGroupClassName="column is-half-desktop"
          >
            {Array(117).fill('').map((e, index) => {
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
            formGroupClassName="column is-12"
          />
          <Field
            label="O que aconteceu?*"
            name="victimHistory"
            maxLength={80}
            component={TextareaField}
            formGroupClassName="column is-12 is-paddingless-y"
          />
          <Field
            label={`Quando eu penso em ${victimName || ''}, eu me lembro de: *`}
            name="victimRememberText"
            maxLength={500}
            component={TextareaField}
            formGroupClassName="column is-12 is-paddingless-y"
          />
          <Field
            label={
              'Se eu pudesse escolher uma palavra para ' +
              `descrever ${victimName || ''}, eu escolheria`
            }
            name="victimGoodWords"
            type="text"
            maxLength={8}
            component={TextField}
            formGroupClassName="column is-12"
          />
          <Field
            label={`Selecione uma foto de ${victimName || ''}`}
            name="victimPhoto"
            id="victimPhoto"
            component={UploadField}
            formGroupClassName="column is-12"
          />
          <FieldArray
            withRef
            label="Crie uma galeria de imagens"
            name="memoryAssets"
            component={UploadMultiplesField}
            formGroupClassName="column is-12"
          />
          <Field
            label="Imagem"
            name="victimSilhouette"
            component={RadioField.Field}
            formGroupClassName="column is-12"
            className="columns is-multiline is-mobile"
            optionsHeight="200px"
            optionsClassName="column is-half-mobile is-half-tablet is-one-quarter-desktop"
          >
            <RadioField.Button
              src="/img/silhouette-1.svg"
              alt="Silhueta 1"
              value="1"
            />
            <RadioField.Button
              src="/img/silhouette-2.svg"
              alt="Silhueta 2"
              value="2"
            />
            <RadioField.Button
              src="/img/silhouette-3.svg"
              alt="Silhueta 3"
              value="3"
            />
            <RadioField.Button
              src="/img/silhouette-4.svg"
              alt="Silhueta 4"
              value="4"
            />
          </Field>
          <Field
            name="authorizedToSite"
            component={CheckboxField}
            formGroupClassName="column is-12"
          >
            Autorizo a divulgação dessa homenagem
            no site <span className="color--primary">#VivosEmNós</span>
          </Field>
        </SectionPrimary>

        <ButtonPrimary
          TagName="button"
          type="submit"
        >
          Publique sua homenagem
        </ButtonPrimary>
      </Form>
    )
  }
}

export default MemoryForm
