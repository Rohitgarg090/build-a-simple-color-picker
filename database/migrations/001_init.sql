CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "users" (
    "user_id" UUID NOT NULL, -- No default, expected from Supabase Auth
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

CREATE TABLE "colors" (
    "color_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "hex_code" TEXT NOT NULL,
    "r_value" INTEGER NOT NULL,
    "g_value" INTEGER NOT NULL,
    "b_value" INTEGER NOT NULL,
    "color_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "colors_pkey" PRIMARY KEY ("color_id")
);

CREATE UNIQUE INDEX "colors_hex_code_key" ON "colors"("hex_code");

CREATE TABLE "user_favorite_colors" (
    "user_id" UUID NOT NULL,
    "color_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_favorite_colors_pkey" PRIMARY KEY ("user_id", "color_id")
);

ALTER TABLE "user_favorite_colors" ADD CONSTRAINT "user_favorite_colors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "user_favorite_colors" ADD CONSTRAINT "user_favorite_colors_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "colors"("color_id") ON DELETE RESTRICT ON UPDATE CASCADE;