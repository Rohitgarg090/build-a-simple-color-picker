erDiagram
    USERS ||--o{ USER_FAVORITE_COLORS : has
    COLORS ||--o{ USER_FAVORITE_COLORS : is_favorited_by

    USERS {
        UUID user_id PK "Supabase Auth ID"
        VARCHAR email UK
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    COLORS {
        UUID color_id PK
        VARCHAR hex_code UK "e.g., #RRGGBB"
        INT r_value
        INT g_value
        INT b_value
        VARCHAR color_name "Optional, e.g., Red"
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    USER_FAVORITE_COLORS {
        UUID user_id PK,FK
        UUID color_id PK,FK
        TIMESTAMP created_at
    }