import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const TabPage = () => {
  return (
    <Tabs
      defaultValue="detail"
      className="flex w-full flex-col items-center justify-center"
    >
      <TabsList className="flex w-full ">
        <TabsTrigger value="detail" className="w-full">
          상세 정보
        </TabsTrigger>
        <TabsTrigger value="review" className="w-full">
          구매평
        </TabsTrigger>
        <TabsTrigger value="qna" className="w-full">
          Q&A
        </TabsTrigger>
      </TabsList>
      <TabsContent value="detail" className="h-screen w-full">
        상세정보 페이지
      </TabsContent>
      <TabsContent value="review" className="h-screen w-full">
        구매평 페이지
      </TabsContent>
      <TabsContent value="qna" className="h-screen w-full">
        질문 페이지
      </TabsContent>
    </Tabs>
  );
};

export default TabPage;
