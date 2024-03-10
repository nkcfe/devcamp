import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

interface PaymentProps {}

const Payment = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>결제 방법</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <RadioGroup defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one">Option One</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two">Option Two</Label>
          </div>
        </RadioGroup>
      </CardContent>
      <Button className="w-full rounded-t-none py-8 text-lg" size="lg">
        결제하기
      </Button>
    </Card>
  );
};

export default Payment;
