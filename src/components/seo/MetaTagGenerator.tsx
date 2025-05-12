
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BasicMetaForm } from './forms/BasicMetaForm';
import { SocialMetaForm } from './forms/SocialMetaForm';
import { MetaPreview } from './MetaPreview';
import { generateMetaTags } from './utils/metaTagGenerator';

export function MetaTagGenerator() {
  // Basic metadata state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [author, setAuthor] = useState('');
  const [viewport, setViewport] = useState(true);
  const [robots, setRobots] = useState(true);
  const [canonical, setCanonical] = useState('');
  const [language, setLanguage] = useState('fa');
  
  // Social metadata state
  const [ogTitle, setOgTitle] = useState('');
  const [ogDescription, setOgDescription] = useState('');
  const [ogImage, setOgImage] = useState('');
  const [ogUrl, setOgUrl] = useState('');
  const [ogType, setOgType] = useState('website');
  const [twitterCard, setTwitterCard] = useState('summary');
  
  // Generate HTML meta tags
  const handleGenerateMetaTags = () => {
    return generateMetaTags({
      title,
      description,
      keywords,
      author,
      viewport,
      robots,
      canonical,
      language,
      ogTitle,
      ogDescription,
      ogImage,
      ogUrl,
      ogType,
      twitterCard
    });
  };
  
  return (
    <Card className="border rounded-lg">
      <CardContent className="p-6 space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="basic">اطلاعات اصلی</TabsTrigger>
            <TabsTrigger value="social">شبکه‌های اجتماعی</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <BasicMetaForm
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              keywords={keywords}
              setKeywords={setKeywords}
              author={author}
              setAuthor={setAuthor}
              viewport={viewport}
              setViewport={setViewport}
              robots={robots}
              setRobots={setRobots}
              canonical={canonical}
              setCanonical={setCanonical}
              language={language}
              setLanguage={setLanguage}
            />
          </TabsContent>
          
          <TabsContent value="social" className="space-y-4">
            <SocialMetaForm
              ogTitle={ogTitle}
              setOgTitle={setOgTitle}
              ogDescription={ogDescription}
              setOgDescription={setOgDescription}
              ogImage={ogImage}
              setOgImage={setOgImage}
              ogUrl={ogUrl}
              setOgUrl={setOgUrl}
              ogType={ogType}
              setOgType={setOgType}
              twitterCard={twitterCard}
              setTwitterCard={setTwitterCard}
              title={title}
              description={description}
              canonical={canonical}
            />
          </TabsContent>
        </Tabs>
        
        <MetaPreview generateMetaTags={handleGenerateMetaTags} />
      </CardContent>
    </Card>
  );
}
