'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { containerVariants, itemVariants } from '@/lib/animations'

const tiers = [
  {
    name: 'Starter',
    price: '$29',
    description: 'Perfect for small teams',
    features: [
      'Up to 10 projects',
      '5GB storage',
      'Basic analytics',
      'Community support',
      'Monthly billing',
    ],
  },
  {
    name: 'Professional',
    price: '$79',
    description: 'For growing businesses',
    highlighted: true,
    features: [
      'Unlimited projects',
      '100GB storage',
      'Advanced analytics',
      'Priority email support',
      'Custom domains',
      'API access',
      'Monthly or annual',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: [
      'Unlimited everything',
      'Dedicated infrastructure',
      '24/7 phone support',
      'Custom integrations',
      'SLA guarantee',
      'Onboarding support',
      'Annual billing',
    ],
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="relative py-20 sm:py-32">
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
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-pretty mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
          >
            Choose the perfect plan for your needs
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-3 lg:gap-6"
        >
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                className={`relative h-full p-8 smooth-transition ${
                  tier.highlighted
                    ? 'border-primary/50 bg-card/80 ring-2 ring-primary/50'
                    : 'border-border/50 bg-card/50'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                      Most Popular
                    </div>
                  </div>
                )}

                <h3 className="text-2xl font-bold text-foreground">{tier.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {tier.description}
                </p>

                <div className="mt-6">
                  <span className="text-5xl font-bold text-foreground">
                    {tier.price}
                  </span>
                  {tier.price !== 'Custom' && (
                    <span className="text-sm text-muted-foreground">/month</span>
                  )}
                </div>

                <Button
                  className="mt-8 w-full"
                  variant={tier.highlighted ? 'default' : 'outline'}
                >
                  Get Started
                </Button>

                <ul className="mt-8 space-y-4">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <span className="text-primary">✓</span>
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
