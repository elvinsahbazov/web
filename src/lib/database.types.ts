export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      forum_leads: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string | null;
          business_type: string | null;
          message: string | null;
          source: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          phone?: string | null;
          business_type?: string | null;
          message?: string | null;
          source?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['forum_leads']['Insert']>;
      };
      calculator_sessions: {
        Row: {
          id: string;
          user_name: string;
          user_email: string;
          preset_name: string | null;
          product_price: number;
          cogs: number;
          margin_pct: number;
          total_budget: number;
          total_revenue: number;
          net_profit: number;
          blended_roas: number;
          break_even_roas: number;
          channels_snapshot: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_name: string;
          user_email: string;
          preset_name?: string | null;
          product_price: number;
          cogs: number;
          margin_pct: number;
          total_budget: number;
          total_revenue: number;
          net_profit: number;
          blended_roas: number;
          break_even_roas: number;
          channels_snapshot: Json;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['calculator_sessions']['Insert']>;
      };
      contact_submissions: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string | null;
          subject: string | null;
          message: string;
          page_source: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          phone?: string | null;
          subject?: string | null;
          message: string;
          page_source?: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['contact_submissions']['Insert']>;
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          source: string;
          is_active: boolean;
          subscribed_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name?: string | null;
          source?: string;
          is_active?: boolean;
          subscribed_at?: string;
        };
        Update: Partial<Database['public']['Tables']['newsletter_subscribers']['Insert']>;
      };
    };
  };
}
