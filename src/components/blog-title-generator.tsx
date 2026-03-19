
"use client"

import React, { useState } from 'react';
import { generateBlogPostTitles } from '@/ai/flows/ai-generated-blog-post-titles';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Sparkles, Loader2 } from 'lucide-react';
import { FadeIn } from './fade-in';

export const BlogTitleGenerator = () => {
  const [draft, setDraft] = useState('');
  const [keywords, setKeywords] = useState('');
  const [titles, setTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const keywordArray = keywords.split(',').map(k => k.trim()).filter(Boolean);
      const result = await generateBlogPostTitles({ draft, keywords: keywordArray });
      setTitles(result.titles);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FadeIn className="max-w-7xl mx-auto px-5 pb-24 border-t border-neutral-200 pt-16">
      <div className="max-w-3xl mx-auto">
        <Card className="rounded-none border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="bg-black text-white rounded-none">
            <CardTitle className="text-2xl font-black uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-accent" />
              Blog Title Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <p className="text-sm font-bold text-neutral-500 uppercase tracking-widest">
              Let AI craft the perfect SEO titles for your fashion blog.
            </p>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest mb-1 block">Context or Draft Summary</label>
                <textarea 
                  className="w-full h-32 p-3 border-2 border-black text-sm font-medium focus:ring-0 focus:border-accent outline-none"
                  placeholder="What is your blog post about?"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest mb-1 block">Keywords (comma separated)</label>
                <Input 
                  className="rounded-none border-2 border-black font-medium h-12"
                  placeholder="e.g. fashion, summer 2026, accessories"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleGenerate} 
                disabled={loading || !draft}
                className="w-full bg-black hover:bg-neutral-800 text-white font-black uppercase tracking-widest h-14 rounded-none"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Generate Titles"}
              </Button>
            </div>

            {titles.length > 0 && (
              <div className="mt-8 pt-8 border-t-2 border-neutral-100">
                <h4 className="text-sm font-black uppercase tracking-widest mb-4">Suggested Titles:</h4>
                <ul className="space-y-3">
                  {titles.map((title, i) => (
                    <li 
                      key={i} 
                      className="p-4 bg-neutral-50 border-l-4 border-accent text-sm font-bold leading-tight"
                    >
                      {title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </FadeIn>
  );
};
