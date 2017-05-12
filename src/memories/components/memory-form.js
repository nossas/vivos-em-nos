import { h, Component } from 'preact' /** @jsx h */
import { FormattedMessage, intlShape } from 'react-intl'
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
      intl,
    } = this.props

    const currentYear = new Date().getFullYear()

    if (submitSucceeded) {
      return (
        <AlertBox
          doneText={intl.formatMessage({
            id: 'components--memory-form.alert-box.done-text',
            defaultMessage: 'Ok, entendi!',
          })}
          next={() => {
            if (this.state.redirect) {
              window.location.href = paths.memory(this.state.redirect)
            } else {
              window.location.href = paths.home()
            }
          }}
        >
          <h1>
            <FormattedMessage
              id="components--memory-form.alert-box.header"
              defaultMessage="Sua página{breakLine}foi publicada!"
              values={{ breakLine: <br /> }}
            />
          </h1>
          <p>
            <FormattedMessage
              id="components--memory-form.alert-box.paragraph"
              defaultMessage={
                'Se você quiser editá-la ou visualizá-la novamente, é só seguir ' +
                'as informações que acabamos de enviar por e-mail. Qualquer dúvida, ' +
                'entre em contato com a gente em {link}'
              }
              values={{
                link: (
                  <a href="mailto:contato@instintodevida.org">
                    contato@instintodevida.org
                  </a>
                ),
              }}
            />
          </p>
        </AlertBox>
      )
    }

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
          header={
            <SectionHeader
              title={
                <FormattedMessage
                  id="components--memory-form.section--about-victim.header"
                  defaultMessage="Sobre a pessoa que você quer homenagear"
                />
              }
            />
          }
        >
          <Field
            label={
              <FormattedMessage
                id="components--memory-form.section--about-victim.victim-name"
                defaultMessage="Nome*"
              />
            }
            name="victimName"
            type="text"
            component={TextField}
            formGroupClassName="column is-12"
          />
          <Field
            label={
              <FormattedMessage
                id="components--memory-form.section--about-victim.victim-born-at"
                defaultMessage="Ano em que nasceu*"
              />
            }
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
            label={
              <FormattedMessage
                id="components--memory-form.section--about-victim.victim-dead-at"
                defaultMessage="Ano do assassinato*"
              />
            }
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
            label={
              <FormattedMessage
                id="components--memory-form.section--about-victim.victim-city"
                defaultMessage="Cidade onde morreu*"
              />
            }
            name="victimCity"
            type="text"
            component={TextField}
            formGroupClassName="column is-12"
          />
          <Field
            label={
              <FormattedMessage
                id="components--memory-form.section--about-victim.victim-history"
                defaultMessage="O que aconteceu?*"
              />
            }
            name="victimHistory"
            maxLength={80}
            component={TextareaField}
            formGroupClassName="column is-12 is-paddingless-y"
          />
          <Field
            label={
              <span>
                <FormattedMessage
                  id="components--memory-form.section--about-victim.victim-remember-text"
                  defaultMessage="Quando eu penso em {victimName}, eu me lembro de"
                  values={{ victimName: victimName || '' }}
                />
                : *
              </span>
            }
            name="victimRememberText"
            maxLength={500}
            component={TextareaField}
            formGroupClassName="column is-12 is-paddingless-y"
          />
          <Field
            label={
              <FormattedMessage
                id="components--memory-form.section--about-victim.victim-good-words"
                defaultMessage={
                  'Se eu pudesse escolher uma palavra para ' +
                  'descrever {victimName}, eu escolheria'
                }
                values={{ victimName: victimName || '' }}
              />
            }
            name="victimGoodWords"
            type="text"
            maxLength={8}
            component={TextField}
            formGroupClassName="column is-12"
          />
          <Field
            label={
              <FormattedMessage
                id="components--memory-form.section--about-victim.victim-photo"
                defaultMessage="Selecione uma foto de {victimName}"
                values={{ victimName: victimName || '' }}
              />
            }
            name="victimPhoto"
            id="victimPhoto"
            component={UploadField}
            formGroupClassName="column is-12"
          />
          <FieldArray
            withRef
            label={
              <FormattedMessage
                id="components--memory-form.section--about-victim.memory-assets"
                defaultMessage="Crie uma galeria de imagens"
              />
            }
            name="memoryAssets"
            component={UploadMultiplesField}
            formGroupClassName="column is-12"
          />
          <Field
            label={
              <FormattedMessage
                id="components--memory-form.section--about-victim.victim-silhouette"
                defaultMessage="Imagem"
              />
            }
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
            <FormattedMessage
              id="components--memory-form.section--about-victim.authorized-to-site"
              defaultMessage="Autorizo a divulgação dessa homenagem no site {hashtag}"
              values={{
                hashtag: (
                  <span className="color--primary">
                    <FormattedMessage
                      id="global--brand-name"
                      defaultMessage="#VivosEmNós"
                    />
                  </span>
                )
              }}
            />
          </Field>
        </SectionPrimary>

        <ButtonPrimary
          TagName="button"
          type="submit"
        >
          <FormattedMessage
            id="components--memory-form.submit-button"
            defaultMessage="Publique sua homenagem"
          />
        </ButtonPrimary>
      </Form>
    )
  }
}

MemoryForm.propTypes = {
  intl: intlShape.isRequired,
}

export default MemoryForm
