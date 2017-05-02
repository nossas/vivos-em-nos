import { h, Component } from 'preact' /** @jsx h */
import { Field, FieldArray } from 'redux-form'
import { Select } from 'preact-material-components'
import {
  Form,
  CheckboxField,
  TextField,
  SelectField,
  UploadFileField,
  UploadImagesField,
  RadioField
} from './forms'
import AlertBox from './alert-box'
import { COUNTRIES } from '../constants'
import * as paths from '../../paths'
import { ButtonPrimary, SectionHeader, SectionPrimary, Silhouette } from '../../views/components'


class MemoryForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      country: undefined,
    }
  }

  render() {
    const {
      victimName,
      authorizedToSite,
      handleSubmit,
      error,
      submitSucceeded,
      change,
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
            hintText="País*"
            name="ownerCountry"
            component={SelectField}
            reference={(selectCountry) => { this.selectCountry = selectCountry }}
            selectedIndex={this.state.country}
            onChangeCountry={() => {
              const { selectedIndex } = this.selectCountry.MDComponent
              this.setState({ country: selectedIndex })
              change('ownerCountry', COUNTRIES[selectedIndex].name)
            }}
          >
            {COUNTRIES.map(country => (
              <Select.Item key={country.code} value={country.name}>
                {country.name}
              </Select.Item>
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
            label={`Quando eu penso em ${victimName} eu me lembro de*`}
            name="victimRememberText"
            type="text"
            component={TextField}
            multiline
          />
          <Field
            label={`Se eu pudesse escolher uma palavra para descrever ${victimName}, eu escolheria`}
            name="victimGoodWords"
            type="text"
            component={TextField}
          />
          <Field
            label={`Foto de ${victimName}`}
            name="victimPhoto"
            component={UploadFileField}
          />
          <FieldArray
            withRef
            label="Galeria de imagens"
            name="memoryAssets"
            component={UploadImagesField}
          />
          <Field label='Silhueta' name='victimSilhouette' component={RadioField.Field}>
                <RadioField.Button
                  src='/img/silhouette-orange-form.svg'
                  alt='Silhueta 1'
                  value='1'
                />

                <RadioField.Button
                  src='/img/silhouette-blue-form.svg'
                  alt='Silhueta 2'
                  value='2'
                />
          </Field>
          <Field name="authorizedToSite" component={CheckboxField}>
            Autorizo a divulgação dessa homenagem no site #VivosEmNós
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
