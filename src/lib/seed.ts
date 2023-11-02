import { stripe } from '@/lib/stripe'

const games = [
  'Fortnite',
  'Grand Theft Auto V (GTA V)',
  'Counter-Strike: Global Offensive (CS:GO)',
  'Valorant',
  'League of Legends (LoL)',
  'Minecraft',
  'Call of Duty: Warzone',
  'Among Us',
  'Apex Legends',
  'The Witcher 3: Wild Hunt',
  'Red Dead Redemption 2',
  'Cyberpunk 2077',
  'Overwatch',
  'Stardew Valley',
  'Rainbow Six Siege',
  'Rocket League',
  'Fall Guys',
  'The Legend of Zelda: Breath of the Wild',
  'Dark Souls III',
  'FIFA 22',
]

function generatePriceAmount() {
  return Math.floor(Math.random() * 91) + 10
}

const seedFunction = async () => {
  const priceAmount = generatePriceAmount()
  const imageUrl =
    'https://pentagram-production.imgix.net/cc7fa9e7-bf44-4438-a132-6df2b9664660/EMO_LOL_02.jpg?rect=0%2C0%2C1440%2C1512&w=640&crop=1&fm=jpg&q=70&auto=format&fit=crop&h=672'

  for (const game of games) {
    const product = await stripe.products.create({
      name: `${game}`,
      type: 'good',
      description: `Descrição de de ${game}`,
      images: [imageUrl],
    })

    await stripe.prices.create({
      unit_amount: priceAmount * 100,
      currency: 'brl',
      product: product.id,
    })
  }
}

seedFunction()
