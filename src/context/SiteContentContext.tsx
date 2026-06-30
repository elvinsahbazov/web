import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export type SiteContent = {
  id: string;
  section: string;
  label: string;
  type: string;
  value: string;
};

type SiteContentContextType = {
  content: Record<string, string>;
  isLoading: boolean;
  refreshContent: () => Promise<void>;
};

const SiteContentContext = createContext<SiteContentContextType>({
  content: {},
  isLoading: true,
  refreshContent: async () => {},
});

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchContent = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from('site_content').select('*');
    if (data && !error) {
      const contentMap: Record<string, string> = {};
      data.forEach((item: SiteContent) => {
        contentMap[item.id] = item.value;
      });
      setContent(contentMap);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <SiteContentContext.Provider value={{ content, isLoading, refreshContent: fetchContent }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export const useSiteContent = () => useContext(SiteContentContext);
