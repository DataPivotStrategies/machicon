"use client";

import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function EventFAQ() {
  const faqs = [
    {
      question: "キャンセルポリシーについて",
      answer: "イベント開催日の3日前までは無料でキャンセル可能です。それ以降のキャンセルは参加費の50%を申し受けます。"
    },
    {
      question: "当日の持ち物は？",
      answer: "身分証明書、参加費をご持参ください。"
    },
    {
      question: "服装について",
      answer: "カジュアルな服装でお越しください。ただし、スポーツウェアやビーチウェアはご遠慮ください。"
    },
    {
      question: "途中参加・途中退出は可能ですか？",
      answer: "イベントの性質上、原則として途中参加・途中退出はご遠慮いただいております。"
    }
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">よくある質問</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}