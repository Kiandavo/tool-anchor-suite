import React from 'react';
import { Helmet } from 'react-helmet-async';

interface HowToStep {
  step: number;
  instruction: string;
  image?: string;
}

interface HowToSchemaProps {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string;
  image?: string;
}

export const HowToSchema: React.FC<HowToSchemaProps> = ({
  name,
  description,
  steps,
  totalTime,
  image
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "totalTime": totalTime || "PT5M",
    ...(image && { "image": image }),
    "step": steps.map(step => ({
      "@type": "HowToStep",
      "position": step.step,
      "name": `مرحله ${step.step}`,
      "text": step.instruction,
      ...(step.image && { "image": step.image })
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
