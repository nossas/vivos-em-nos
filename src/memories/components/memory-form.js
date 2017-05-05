import { h, Component } from 'preact' /** @jsx h */
import { Field, FieldArray, SubmissionError } from 'redux-form'
import * as paths from '~src/paths'
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
      .then(({ memory }) => {
        this.setState({ memoryId: memory.id })
      })
  }

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
          next={() => {
            if (this.state.memoryId) {
              window.location.href = paths.memory(this.state.memoryId)
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
              contato@instintodevida.org
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
          header={<SectionHeader title="Sobre você" />}
        >
          <Field
            label="Nome*"
            name="ownerFirstName"
            type="text"
            component={TextField}
            formGroupClassName="column is-half-desktop"
          />
          <Field
            label="Sobrenome*"
            name="ownerLastName"
            type="text"
            component={TextField}
            formGroupClassName="column is-half-desktop"
          />
          <Field
            label="E-mail*"
            name="ownerEmail"
            type="email"
            component={TextField}
            formGroupClassName="column is-12"
          />
          <Field
            label="País*"
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
            formGroupClassName="column is-half-desktop"
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
            formGroupClassName="column is-12"
          />
          <Field
            label="O que aconteceu?*"
            name="victimHistory"
            maxLength={200}
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
            optionsClassName="column is-half-mobile is-half-tablet is-one-third-desktop"
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
            formGroupClassName="column is-12"
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
