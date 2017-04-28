import { connect } from 'preact-redux'
import * as CarouselActions from '../../carousel/redux/action-creators'
import CarouselSelectors from '../../carousel/redux/selectors'
import FeaturedMemories from './featured-memories'

const mapStateToProps = state => {
  const carouselSelectors = CarouselSelectors(state)
  return {
    memories: [
      {
        name: 'Marina',
        birthYear: '1990',
        deathYear: '2015',
        description: 'Baleada em um assalto quando saía da faculdade.',
        url: '/memory/marina',
        image: 'https://static.quizur.com/i/b/581f5c66877f10.71342558581f5c66777f49.87913318.jpg',
        quote:
          `Minha filha sonhava em ser médica, em trabalhar com crianças. Pra gente aqui é tudo` +
          `muito difícil, mas ela trabalhava de dia e conseguia pagar a faculdade à noite. Sempre` +
          `foi muito batalhadora...`
      },
      {
        name: 'Isabela',
        birthYear: '1980',
        deathYear: '2005',
        description: 'Atropelada à caminho da academia.',
        url: '/memory/isabela',
        image: 'https://s-media-cache-ak0.pinimg.com/originals/07/57/cc/0757cc36efb16d5f459fd9538ec17132.jpg',
        quote:
          `Forgive my manners. I don't see many ladies these days. Lucky for the ladies. All men ` +
          `must die. A good act does not wash out the bad, nor a bad act the good. Each should ` +
          `have its own reward.`
      },
      {
        name: 'Flávia',
        birthYear: '1995',
        deathYear: '2016',
        description: 'Esfaqueada indo ao trabalho.',
        url: '/memory/flavia',
        image: 'https://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=108410121',
        quote:
          `The night is dark and full of terrors. What is dead may never die. A good act does ` +
          `not wash out the bad, nor a bad act the good. Each should have its own reward. The ` +
          `bear and the maiden fair.`
      }
    ],
    currentCarouselIndex: carouselSelectors.getCurrentIndex()
  }
}

const mapDispatchToProps = ({
  setListCarousel: CarouselActions.setList
})

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedMemories)
