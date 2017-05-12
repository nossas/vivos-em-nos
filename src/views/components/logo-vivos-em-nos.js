import { h } from 'preact' /** @jsx h */
import { injectIntl, intlShape } from 'react-intl'

const LogoVivosEmNos = ({ intl, width, height }) => (
  <img
    className="components--logo"
    src={intl.formatMessage({
      id: 'components--logo.image',
      defaultMessage: '/img/logo-vivos-em-nos.svg',
    })}
    alt={intl.formatMessage({
      id: 'components--logo.alt',
      defaultMessage: 'Logo Vivos Em Nós',
    })}
    {...{ width, height }}
  />
)

LogoVivosEmNos.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(LogoVivosEmNos)
