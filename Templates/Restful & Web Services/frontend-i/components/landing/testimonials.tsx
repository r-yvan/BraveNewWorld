'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { containerVariants, itemVariants } from '@/lib/animations'

const testimonials = [
  {
    quote:
      "Elite has transformed how our team ships features. It's the productivity boost we didn't know we needed.",
    author: 'Sarah Johnson',
    role: 'Engineering Lead at TechCorp',
    image: '👩‍💼',
  },
  {
    quote:
      'The reliability and performance are unmatched. Our infrastructure costs dropped by 40% after switching.',
    author: 'Marcus Chen',
    role: 'CTO at StartupAI',
    image: '👨‍💼',
  },
  {
    quote:
      'Best decision we made this year. Support is responsive, and the product keeps improving.',
    author: 'Emma Rodriguez',
    role: 'Product Manager at DataFlow',
    image: '👩‍💼',
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            Loved by Developers
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-pretty mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
          >
            See what industry leaders have to say about Elite
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full border-border/50 bg-card/50 p-6 backdrop-blur">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-lg">
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="mb-6 text-foreground italic">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
