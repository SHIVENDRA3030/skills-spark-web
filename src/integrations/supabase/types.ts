export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      about_content: {
        Row: {
          created_at: string
          description: string
          id: string
          mission: string | null
          title: string
          updated_at: string
          vision: string | null
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          mission?: string | null
          title: string
          updated_at?: string
          vision?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          mission?: string | null
          title?: string
          updated_at?: string
          vision?: string | null
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          created_at: string
          id: string
          permissions: Json | null
          role: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          permissions?: Json | null
          role?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          permissions?: Json | null
          role?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          date: string
          description: string
          featured: boolean | null
          id: string
          image_url: string | null
          location: string | null
          registration_link: string | null
          status: string | null
          time: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          description: string
          featured?: boolean | null
          id?: string
          image_url?: string | null
          location?: string | null
          registration_link?: string | null
          status?: string | null
          time?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          description?: string
          featured?: boolean | null
          id?: string
          image_url?: string | null
          location?: string | null
          registration_link?: string | null
          status?: string | null
          time?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      gallery: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          featured: boolean | null
          id: string
          image_url: string
          order_index: number | null
          title: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          image_url: string
          order_index?: number | null
          title?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string
          order_index?: number | null
          title?: string | null
        }
        Relationships: []
      }
      hero_content: {
        Row: {
          background_image_url: string | null
          created_at: string
          cta_primary_text: string | null
          cta_secondary_text: string | null
          description: string | null
          id: string
          subtitle: string
          title: string
          updated_at: string
        }
        Insert: {
          background_image_url?: string | null
          created_at?: string
          cta_primary_text?: string | null
          cta_secondary_text?: string | null
          description?: string | null
          id?: string
          subtitle: string
          title: string
          updated_at?: string
        }
        Update: {
          background_image_url?: string | null
          created_at?: string
          cta_primary_text?: string | null
          cta_secondary_text?: string | null
          description?: string | null
          id?: string
          subtitle?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio: string | null
          created_at: string
          department: string | null
          email: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          linkedin_url: string | null
          name: string
          order_index: number | null
          role: string
          twitter_url: string | null
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          department?: string | null
          email?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          linkedin_url?: string | null
          name: string
          order_index?: number | null
          role: string
          twitter_url?: string | null
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          department?: string | null
          email?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          linkedin_url?: string | null
          name?: string
          order_index?: number | null
          role?: string
          twitter_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          company: string | null
          content: string
          created_at: string
          featured: boolean | null
          id: string
          image_url: string | null
          name: string
          rating: number | null
          role: string | null
        }
        Insert: {
          company?: string | null
          content: string
          created_at?: string
          featured?: boolean | null
          id?: string
          image_url?: string | null
          name: string
          rating?: number | null
          role?: string | null
        }
        Update: {
          company?: string | null
          content?: string
          created_at?: string
          featured?: boolean | null
          id?: string
          image_url?: string | null
          name?: string
          rating?: number | null
          role?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
