ALTER TABLE "project_plan" ADD COLUMN "board_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_plan" ADD CONSTRAINT "project_plan_board_id_boards_id_fk" FOREIGN KEY ("board_id") REFERENCES "public"."boards"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
