import { Hero } from '@/components/home/hero'
import { UpNext } from '@/components/home/up-next'
import { Interests } from '@/components/home/interests'
import { FeaturedEvents } from '@/components/home/featured-events'
import { Recap } from '@/components/home/recap'

export default function HomePage() {
  return (
    <>
      <Hero />
      <UpNext />
      <Interests />
      <FeaturedEvents />
      <Recap />
    </>
  )
}
