import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

interface DetailAccordionProps {
  detail: string;
}

const DetailAccordion = (props: DetailAccordionProps) => {
  const { detail } = props;
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-2xl">Description</AccordionTrigger>
        <AccordionContent>{detail}</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-2xl">Reviews</AccordionTrigger>
        <AccordionContent>
          미완성입니다. 아직 작업중인 페이지입니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-2xl">Q&A</AccordionTrigger>
        <AccordionContent>
          미완성입니다. 아직 작업중인 페이지입니다.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DetailAccordion;
