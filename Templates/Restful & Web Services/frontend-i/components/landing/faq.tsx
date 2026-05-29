'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { containerVariants, itemVariants } from '@/lib/animations'

const faqs = [
  {
    question: 'How do I get started with Elite?',
    answer:
      'Getting started is easy! Sign up for a free account, choose your plan, and follow our onboarding guide to deploy your first project in minutes.',
  },
  {
    question: 'What is the uptime guarantee?',
    answer:
      'We guarantee 99.99% uptime with our SLA. If we fall short, you get service credits to your account automatically.',
  },
  {
    question: 'Can I migrate my existing projects?',
    answer:
      'Yes! We provide migration tools and dedicated support to help you move your projects seamlessly. Most migrations complete within 24 hours.',
  },
  {
    question: 'Do you offer custom enterprise plans?',
    answer:
      'Absolutely. Contact our sales team to discuss your specific requirements. We offer custom plans with dedicated support and infrastructure.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards, PayPal, wire transfers, and purchase orders. Annual billing also comes with a 20% discount.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Yes! All new accounts get a 14-day free trial with full access to all features. No credit card required to sign up.',
  },
]

export function FAQ() {
  return (
    <section id="faq" className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
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
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-pretty mx-auto mt-4 text-lg text-muted-foreground"
          >
            Everything you need to know about Elite
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-border/50 bg-card/50 px-6 rounded-lg backdrop-blur"
              >
                <AccordionTrigger className="text-foreground hover:text-foreground/80 py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
