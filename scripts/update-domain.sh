#!/bin/bash
# Script to update all remaining langar.co references to laangar.com

echo "Updating domain from langar.co to laangar.com..."

# Update utils/schemaUtils.ts
sed -i 's/https:\/\/langar\.co/https:\/\/laangar.com/g' src/utils/schemaUtils.ts

# Update utils/sitemap-generator.ts  
sed -i 's/https:\/\/langar\.co/https:\/\/laangar.com/g' src/utils/sitemap-generator.ts
sed -i 's/langar\.co/laangar.com/g' src/utils/sitemap-generator.ts

# Update utils/seo-generation.ts
sed -i 's/https:\/\/langar\.co/https:\/\/laangar.com/g' src/utils/seo-generation.ts

# Update RumiSeoData.tsx
sed -i 's/https:\/\/langar\.co/https:\/\/laangar.com/g' src/components/seo/RumiSeoData.tsx

# Update index.tsx
sed -i 's/https:\/\/langar\.co/https:\/\/laangar.com/g' src/pages/index.tsx

# Update Category.tsx
sed -i 's/https:\/\/langar\.co/https:\/\/laangar.com/g' src/pages/Category.tsx

echo "Domain update complete!"
echo "Run 'grep -r \"langar\\.co\" src/' to verify all instances are updated"
