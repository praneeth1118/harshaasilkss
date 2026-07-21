"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How long does it take to weave a Kanchipuram silk saree?",
    answer: "Our authentic Kanchipuram sarees are handwoven by master artisans. Depending on the complexity of the zari motifs, a single saree takes anywhere from 30 to 90 days to weave."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we offer insured international shipping worldwide. Delivery times vary by location, typically ranging from 7 to 14 business days."
  },
  {
    question: "How should I care for my silk saree?",
    answer: "We strongly recommend professional dry cleaning only. Store your saree wrapped in a soft cotton muslin cloth in a cool, dry place. Avoid spraying perfume directly onto the silk or zari."
  },
  {
    question: "Can I book a virtual styling consultation?",
    answer: "Absolutely. We offer exclusive virtual styling sessions for our international and out-of-town clients. Please use the WhatsApp button to schedule an appointment with our stylists."
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-10 lg:py-16 bg-[var(--color-brand-ivory)]">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-6xl font-heading text-[var(--color-brand-dark)]"
          >
            Frequent <span className="text-[var(--color-brand-gold)] italic">Inquiries</span>
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-b border-black/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full py-8 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className={`font-heading text-xl lg:text-2xl transition-colors ${isOpen ? "text-[var(--color-brand-maroon)]" : "text-[var(--color-brand-dark)] group-hover:text-[var(--color-brand-gold)]"}`}>
                    {faq.question}
                  </span>
                  <span className="ml-4 shrink-0 text-[var(--color-brand-gold)]">
                    {isOpen ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <div className="pb-8 font-body text-[var(--color-brand-charcoal)] leading-relaxed pr-12">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
