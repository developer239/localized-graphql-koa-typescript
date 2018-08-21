import faker from 'faker'

// The idea here is to provide generated values to developers so that we can do proper expectations
// note that `words` property is more complicated because Page model is generating `slug` from Page.title (lorem.words)
// before it creates new Page in database and slug is a unique value in database so we need to introduce
// some way of differentiating between generated titles
export const mock = {
  address: {
    countryCode: 'en',
  },
  random: {
    boolean: true,
  },
  lorem: {
    words: {
      callCount: 0,
      defaultValue: 'fake lorem words',
      value: () => `${mock.lorem.words.defaultValue} ${mock.lorem.words.callCount++}`,
      getNthValue: (n: number) => `${mock.lorem.words.defaultValue} ${n}`,
      resetCallCount: () => {
        mock.lorem.words.callCount = 0
      },
    },
    paragraphs: 'fake lorem paragraphs',
  },
}

faker.address.countryCode = () => mock.address.countryCode
faker.random.boolean = () => mock.random.boolean
faker.lorem.words = () => mock.lorem.words.value()
faker.lorem.paragraphs = () => mock.lorem.paragraphs

export default faker
