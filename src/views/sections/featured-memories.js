import { h } from 'preact' /** @jsx h */
import {
  ButtonPrimary,
  MemoryImage,
  MemorySummary,
  Quote,
  SectionHeader,
  SectionPrimary
} from '../components'

export default () => (
  <SectionPrimary header={
    <SectionHeader title='Veja algumas homenagens'>
      <img className='silhouette' src='/img/silhouette-02.svg' height='380' />
    </SectionHeader>
  }>
    <div className='ornament' />
    <MemoryImage
      source='http://static.quizur.com/i/b/581f5c66877f10.71342558581f5c66777f49.87913318.jpg'
      width='164px'
      height='132px'
    />
    <MemorySummary
      name='Marina'
      birthYear='1990'
      deathYear='2015'
      description='Baleada em um assalto quando saía da faculdade.'
    />
    <Quote>
      Minha filha sonhava em ser médica, em trabalhar com crianças. Pra gente aqui é tudo
      muito difícil, mas ela trabalhava de dia e conseguia pagar a faculdade à noite. Sempre
      foi muito batalhadora...
    </Quote>
    <footer>
      <div className='memory-carousel-navigator'>
        <div className='carousel-item active' />
        <div className='carousel-item' />
        <div className='carousel-item' />
        <div className='carousel-item' />
        <div className='carousel-item' />
      </div>
      <ButtonPrimary href='/homenagem'>
        Ver homenagem completa
      </ButtonPrimary>
    </footer>
  </SectionPrimary>
)
