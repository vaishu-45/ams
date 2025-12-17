import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import "../styles/faq.css";

const ALL_FAQS = [
  {
    q: "Is the meat fresh or frozen?",
    a: "All our meat products are freshly cut and hygienically packed. We do not sell frozen meat unless clearly mentioned."
  },
  {
    q: "How long can I store the product?",
    a: "You can store the product in a refrigerator for up to 24 hours. For best taste, we recommend cooking it the same day."
  },
  {
    q: "Is the meat cleaned and ready to cook?",
    a: "Yes, the meat is thoroughly cleaned and ready to cook. No extra cleaning is required."
  },
  {
    q: "Do you deliver on the same day?",
    a: "Yes, we offer same-day delivery for orders placed within delivery hours, depending on availability."
  },
  {
    q: "Can I cancel or return my order?",
    a: "Orders can be cancelled before dispatch. Returns are accepted only if the product is damaged or incorrect."
  },
  {
    q: "Is this product suitable for curries?",
    a: "Yes, this cut is ideal for curries, frying, and gravy-based dishes."
  },
  {
    q: "Is the meat halal?",
    a: "Yes, all our meat products are halal certified."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    // Shuffle and pick any 5 questions
    const shuffled = [...ALL_FAQS].sort(() => 0.5 - Math.random());
    setFaqs(shuffled.slice(0, 5));
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h3>Frequently Asked Questions</h3>

      {faqs.map((item, index) => (
        <div key={index} className="faq-item">
          <button className="faq-question" onClick={() => toggleFAQ(index)}>
            <span>{item.q}</span>
            {openIndex === index ? <ChevronUp /> : <ChevronDown />}
          </button>

          {openIndex === index && (
            <p className="faq-answer">{item.a}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
