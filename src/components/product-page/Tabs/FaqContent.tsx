import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = {
  question: string;
  answer: string;
};

const faqsData: FaqItem[] = [
  {
    question: "What materials are your African clothing made of?",
    answer:
      "Our garments are made from high-quality fabrics such as Ankara, Kente, Adire, cotton, and other locally sourced materials. Each piece is chosen for comfort, durability, and vibrant colors.",
  },
  {
    question: "How do I take care of my African clothes?",
    answer:
      "To preserve the colors and fabric, wash in cold water, avoid strong detergents, and iron on low to medium heat. Some delicate fabrics may require hand washing or dry cleaning.",
  },
  {
    question: "Are your designs handmade or machine-made?",
    answer:
      "Many of our designs are handcrafted by skilled artisans, including embroidery, beadwork, and hand prints. We also use durable machine techniques for consistent quality.",
  },
  {
    question: "Are your clothes suitable for men, women, or both?",
    answer:
      "We offer collections for men, women, and unisex options. Each piece is designed to celebrate African fashion while providing comfortable fits.",
  },
  {
    question: "Do you deliver across Africa and what are the shipping costs?",
    answer:
      "Yes! We deliver to most African countries. Shipping fees vary by location, and delivery times are estimated at checkout. We aim to make your shopping experience smooth and reliable.",
  },
  {
    question: "Can I return or exchange my purchase?",
    answer:
      "Absolutely. You can return or exchange items within our specified window as long as they are in original condition. Refunds or exchanges are processed promptly to ensure satisfaction.",
  },
];

const FaqContent = () => {
  return (
    <section>
      <h3 className="text-xl sm:text-2xl font-bold text-black mb-5 sm:mb-6">
        Frequently asked questions
      </h3>
      <Accordion type="single" collapsible>
        {faqsData.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx + 1}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FaqContent;
