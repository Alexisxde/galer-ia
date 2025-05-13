CREATE TABLE `images` (
	`image_id` text PRIMARY KEY NOT NULL,
	`id_user` text NOT NULL,
	`url` text NOT NULL,
	`format` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `images_url_unique` ON `images` (`url`);