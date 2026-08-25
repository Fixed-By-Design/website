CREATE TYPE "public"."external_link_kind" AS ENUM('issue', 'pull-request', 'discussion', 'release', 'other');--> statement-breakpoint
CREATE TYPE "public"."feedback_source" AS ENUM('web', 'minecraft');--> statement-breakpoint
CREATE TYPE "public"."feedback_status" AS ENUM('new', 'triaged', 'archived', 'dismissed', 'duplicate');--> statement-breakpoint
CREATE TYPE "public"."feedback_type" AS ENUM('general', 'bug', 'balance', 'suggestion');--> statement-breakpoint
CREATE TYPE "public"."linkable_entity_type" AS ENUM('problem', 'roadmap-item', 'proposal', 'design-decision');--> statement-breakpoint
CREATE TYPE "public"."problem_severity" AS ENUM('low', 'medium', 'high', 'critical');--> statement-breakpoint
CREATE TYPE "public"."problem_status" AS ENUM('investigating', 'confirmed', 'designing', 'accepted', 'rejected', 'solved');--> statement-breakpoint
CREATE TYPE "public"."proposal_status" AS ENUM('draft', 'considered', 'accepted', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."publication_status" AS ENUM('draft', 'internal', 'public');--> statement-breakpoint
CREATE TYPE "public"."roadmap_status" AS ENUM('exploring', 'accepted', 'planned', 'in-progress', 'playtesting', 'released', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('visitor', 'player', 'contributor', 'maintainer', 'admin');--> statement-breakpoint
CREATE TABLE "design_decisions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"problem_id" uuid,
	"accepted_proposal_id" uuid,
	"context" text,
	"constraints" text,
	"considered_solutions" text,
	"decision" text,
	"reasoning" text,
	"consequences" text,
	"related_features" text[] DEFAULT '{}'::text[] NOT NULL,
	"publication" "publication_status" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "external_links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"entity_type" "linkable_entity_type" NOT NULL,
	"entity_id" uuid NOT NULL,
	"kind" "external_link_kind" DEFAULT 'issue' NOT NULL,
	"repository" text,
	"number" integer,
	"url" text NOT NULL,
	"label" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "feedback" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"message" text NOT NULL,
	"type" "feedback_type" DEFAULT 'general' NOT NULL,
	"source" "feedback_source" DEFAULT 'web' NOT NULL,
	"status" "feedback_status" DEFAULT 'new' NOT NULL,
	"version" text,
	"player_name" text,
	"player_uuid" uuid,
	"server" text,
	"dimension" text,
	"x" double precision,
	"y" double precision,
	"z" double precision,
	"problem_id" uuid,
	"duplicate_of_id" uuid,
	"submitted_by_id" uuid,
	"triaged_by_id" uuid,
	"triaged_at" timestamp with time zone,
	"submitter_hash" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "feedback_tags" (
	"feedback_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL,
	CONSTRAINT "feedback_tags_feedback_id_tag_id_pk" PRIMARY KEY("feedback_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "problem_tags" (
	"problem_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL,
	CONSTRAINT "problem_tags_problem_id_tag_id_pk" PRIMARY KEY("problem_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "problems" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"public_id" integer GENERATED ALWAYS AS IDENTITY (sequence name "problems_public_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"summary" text NOT NULL,
	"context" text,
	"evidence" text,
	"status" "problem_status" DEFAULT 'investigating' NOT NULL,
	"severity" "problem_severity",
	"affected_systems" text[] DEFAULT '{}'::text[] NOT NULL,
	"author_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "proposals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"problem_id" uuid NOT NULL,
	"title" text NOT NULL,
	"summary" text NOT NULL,
	"body" text,
	"status" "proposal_status" DEFAULT 'draft' NOT NULL,
	"author_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "roadmap_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"summary" text NOT NULL,
	"status" "roadmap_status" DEFAULT 'exploring' NOT NULL,
	"domain" text NOT NULL,
	"milestone" text,
	"target_version" text,
	"problem_id" uuid,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "server_api_keys" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"key_prefix" text NOT NULL,
	"key_hash" text NOT NULL,
	"server_label" text,
	"last_used_at" timestamp with time zone,
	"revoked_at" timestamp with time zone,
	"created_by_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"label" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"github_id" integer NOT NULL,
	"login" text NOT NULL,
	"name" text,
	"avatar_url" text,
	"role" "user_role" DEFAULT 'player' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_seen_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "design_decisions" ADD CONSTRAINT "design_decisions_problem_id_problems_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."problems"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "design_decisions" ADD CONSTRAINT "design_decisions_accepted_proposal_id_proposals_id_fk" FOREIGN KEY ("accepted_proposal_id") REFERENCES "public"."proposals"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_problem_id_problems_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."problems"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_duplicate_of_id_feedback_id_fk" FOREIGN KEY ("duplicate_of_id") REFERENCES "public"."feedback"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_submitted_by_id_users_id_fk" FOREIGN KEY ("submitted_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_triaged_by_id_users_id_fk" FOREIGN KEY ("triaged_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedback_tags" ADD CONSTRAINT "feedback_tags_feedback_id_feedback_id_fk" FOREIGN KEY ("feedback_id") REFERENCES "public"."feedback"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedback_tags" ADD CONSTRAINT "feedback_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "problem_tags" ADD CONSTRAINT "problem_tags_problem_id_problems_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."problems"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "problem_tags" ADD CONSTRAINT "problem_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "problems" ADD CONSTRAINT "problems_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_problem_id_problems_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."problems"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roadmap_items" ADD CONSTRAINT "roadmap_items_problem_id_problems_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."problems"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "server_api_keys" ADD CONSTRAINT "server_api_keys_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "design_decisions_slug_idx" ON "design_decisions" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "external_links_entity_idx" ON "external_links" USING btree ("entity_type","entity_id");--> statement-breakpoint
CREATE INDEX "feedback_status_idx" ON "feedback" USING btree ("status");--> statement-breakpoint
CREATE INDEX "feedback_created_at_idx" ON "feedback" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "feedback_problem_id_idx" ON "feedback" USING btree ("problem_id");--> statement-breakpoint
CREATE UNIQUE INDEX "problems_slug_idx" ON "problems" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "problems_public_id_idx" ON "problems" USING btree ("public_id");--> statement-breakpoint
CREATE INDEX "problems_status_idx" ON "problems" USING btree ("status");--> statement-breakpoint
CREATE INDEX "proposals_problem_id_idx" ON "proposals" USING btree ("problem_id");--> statement-breakpoint
CREATE UNIQUE INDEX "roadmap_items_slug_idx" ON "roadmap_items" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "roadmap_items_status_idx" ON "roadmap_items" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "server_api_keys_prefix_idx" ON "server_api_keys" USING btree ("key_prefix");--> statement-breakpoint
CREATE UNIQUE INDEX "tags_slug_idx" ON "tags" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "users_github_id_idx" ON "users" USING btree ("github_id");--> statement-breakpoint
CREATE UNIQUE INDEX "users_login_idx" ON "users" USING btree ("login");